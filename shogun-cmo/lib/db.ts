import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config";

const dbPath = path.isAbsolute(config.SHOGUNCMO_DB_PATH) ? config.SHOGUNCMO_DB_PATH : path.join(process.cwd(), config.SHOGUNCMO_DB_PATH);
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const globalForDb = globalThis as unknown as { shogunDb?: Database.Database };
export const db = globalForDb.shogunDb ?? new Database(dbPath);
if (process.env.NODE_ENV !== "production") globalForDb.shogunDb = db;
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 10000");

db.exec(`
CREATE TABLE IF NOT EXISTS workspaces (id TEXT PRIMARY KEY, name TEXT NOT NULL, domain TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS strategy_modules (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), type TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, version INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL, UNIQUE(workspace_id, type));
CREATE TABLE IF NOT EXISTS signals (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), type TEXT NOT NULL, source TEXT NOT NULL, idempotency_key TEXT NOT NULL UNIQUE, payload TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE VIRTUAL TABLE IF NOT EXISTS signals_fts USING fts5(id UNINDEXED, text, content='');
CREATE TABLE IF NOT EXISTS signal_clusters (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), cluster_key TEXT NOT NULL, signal_ids TEXT NOT NULL, summary TEXT NOT NULL, relevance_score REAL NOT NULL, is_relevant INTEGER NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS evidence_bundles (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), signal_id TEXT, strategy_module_ids TEXT NOT NULL, external_sources TEXT NOT NULL, confidence_score REAL NOT NULL, assumptions TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS opportunities (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), cluster_id TEXT, title TEXT NOT NULL, description TEXT NOT NULL, why_now TEXT NOT NULL, impact_score REAL NOT NULL, effort_score REAL NOT NULL, confidence_score REAL NOT NULL, relevance_score REAL NOT NULL, freshness_score REAL NOT NULL, evidence_quality REAL NOT NULL, composite_score REAL NOT NULL, recommended_action_types TEXT NOT NULL, evidence_bundle_id TEXT, status TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS campaigns (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), title TEXT NOT NULL, goal TEXT NOT NULL, target_date TEXT, status TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS campaign_tasks (id TEXT PRIMARY KEY, campaign_id TEXT NOT NULL REFERENCES campaigns(id), skill_type TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, depends_on_task_ids TEXT NOT NULL, status TEXT NOT NULL, asset_id TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS assets (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), task_id TEXT, type TEXT NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, metadata TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS actions (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), opportunity_id TEXT, task_id TEXT, asset_id TEXT, channel TEXT NOT NULL, idempotency_key TEXT NOT NULL UNIQUE, approval_state TEXT NOT NULL, original_payload TEXT NOT NULL, edited_payload TEXT, rejection_reason TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS execution_results (id TEXT PRIMARY KEY, action_id TEXT NOT NULL REFERENCES actions(id), channel TEXT NOT NULL, status TEXT NOT NULL, external_reference_url TEXT, execution_metadata TEXT NOT NULL, timestamp TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS decision_memories (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), opportunity_id TEXT, signal_type TEXT NOT NULL, recommended_actions TEXT NOT NULL, chosen_action TEXT NOT NULL, rejected_actions TEXT NOT NULL, rejection_reason TEXT, actor TEXT NOT NULL, user_edit_diff TEXT, timestamp TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS activity_logs (id TEXT PRIMARY KEY, workspace_id TEXT NOT NULL REFERENCES workspaces(id), stage TEXT NOT NULL, message TEXT NOT NULL, metadata TEXT NOT NULL, timestamp TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS corsair_integrations (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, name TEXT NOT NULL, config TEXT NOT NULL DEFAULT '{}', dek TEXT NULL);
CREATE TABLE IF NOT EXISTS corsair_accounts (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, tenant_id TEXT NOT NULL, integration_id TEXT NOT NULL, config TEXT NOT NULL DEFAULT '{}', dek TEXT NULL, FOREIGN KEY (integration_id) REFERENCES corsair_integrations(id));
CREATE TABLE IF NOT EXISTS corsair_entities (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, account_id TEXT NOT NULL, entity_id TEXT NOT NULL, entity_type TEXT NOT NULL, version TEXT NOT NULL, data TEXT NOT NULL DEFAULT '{}', FOREIGN KEY (account_id) REFERENCES corsair_accounts(id));
CREATE TABLE IF NOT EXISTS corsair_events (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, account_id TEXT NOT NULL, event_type TEXT NOT NULL, payload TEXT NOT NULL DEFAULT '{}', status TEXT, FOREIGN KEY (account_id) REFERENCES corsair_accounts(id));
CREATE TABLE IF NOT EXISTS corsair_permissions (id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL, tenant_id TEXT, plugin TEXT NOT NULL, endpoint TEXT NOT NULL, args TEXT NOT NULL DEFAULT '{}', status TEXT NOT NULL, token TEXT, expires_at TEXT, error TEXT);
CREATE INDEX IF NOT EXISTS idx_signals_workspace_created ON signals(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_workspace_score ON opportunities(workspace_id, composite_score DESC);
CREATE INDEX IF NOT EXISTS idx_actions_workspace_state ON actions(workspace_id, approval_state);
CREATE INDEX IF NOT EXISTS idx_activity_workspace_time ON activity_logs(workspace_id, timestamp DESC);
`);
try { db.exec("ALTER TABLE actions ADD COLUMN opportunity_id TEXT"); } catch { /* Existing databases already have the column. */ }

export function uid(prefix: string) { return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`; }
export function now() { return new Date().toISOString(); }
export function json(value: unknown) { return JSON.stringify(value ?? null); }
export function parseJson<T>(value: string): T { return JSON.parse(value) as T; }

export function ensureWorkspace() {
  const existing = db.prepare("SELECT * FROM workspaces ORDER BY created_at LIMIT 1").get() as { id: string } | undefined;
  if (existing) return existing.id;
  const id = uid("ws"); const created = now();
  db.prepare("INSERT INTO workspaces (id,name,domain,created_at) VALUES (?,?,?,?)").run(id, config.SHOGUNCMO_WORKSPACE_NAME, config.SHOGUNCMO_WORKSPACE_DOMAIN, created);
  const modules = [
    ["product_info", "Product Information", "ShogunAI is a technical product. Add verified capabilities, architecture, and release context here."],
    ["marketing_strategy", "Marketing Strategy", "Add active goals, channel priorities, launch plans, and constraints here."],
    ["competitor_analysis", "Competitor Analysis", "Add competitor evidence and positioning distinctions here."],
    ["brand_voice", "Brand Voice & Tone", "Technical, concise, specific, evidence-led. Avoid generic AI marketing language."],
  ];
  const stmt = db.prepare("INSERT INTO strategy_modules (id,workspace_id,type,title,content,version,updated_at) VALUES (?,?,?,?,?,?,?)");
  for (const [type, title, content] of modules) stmt.run(uid("mod"), id, type, title, content, 1, created);
  logActivity(id, "WORKSPACE_READY", "Workspace initialized with editable Company Brain modules.", { source: "system" });
  return id;
}

export function logActivity(workspaceId: string, stage: string, message: string, metadata: Record<string, unknown> = {}) {
  db.prepare("INSERT INTO activity_logs (id,workspace_id,stage,message,metadata,timestamp) VALUES (?,?,?,?,?,?)").run(uid("log"), workspaceId, stage, message, json(metadata), now());
}
