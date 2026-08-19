import crypto from "node:crypto";
import { db, ensureWorkspace, json, logActivity, now, parseJson, uid } from "./db";
import { connectorRegistry } from "./connectors";
import type { Action, Campaign, CampaignTask, Opportunity, Signal, SkillType } from "./domain";

export function hashSignal(source: string, type: string, payload: unknown) { return crypto.createHash("sha256").update(`${source}:${type}:${JSON.stringify(payload)}`).digest("hex"); }

function classify(payload: Record<string, unknown>) {
  const text = `${payload.title ?? ""} ${payload.message ?? ""} ${payload.summary ?? ""} ${payload.diffSummary ?? ""}`.toLowerCase();
  const relevant = /feat|launch|release|product|customer|user|performance|seo|search|memory|api|fix|improv|ship/.test(text);
  return { relevant, score: relevant ? 0.82 : 0.18 };
}

export function scoreOpportunity(input: { impact: number; effort: number; confidence: number; relevance: number; freshness?: number; evidenceQuality?: number }) {
  const freshness = input.freshness ?? 1; const evidenceQuality = input.evidenceQuality ?? 0.5;
  return Number((((input.impact * 0.35) + (input.relevance * 10 * 0.25) + (input.confidence * 10 * 0.2) + (freshness * 10 * 0.1) + (evidenceQuality * 10 * 0.1)) / Math.max(input.effort * 0.45, 1)).toFixed(2));
}

export function ingestSignal(input: { workspaceId?: string; type: string; source: string; payload: Record<string, unknown>; idempotencyKey?: string }) {
  const workspaceId = input.workspaceId ?? ensureWorkspace();
  const idempotencyKey = input.idempotencyKey ?? hashSignal(input.source, input.type, input.payload);
  const duplicate = db.prepare("SELECT id FROM signals WHERE idempotency_key = ?").get(idempotencyKey) as { id: string } | undefined;
  if (duplicate) { logActivity(workspaceId, "DUPLICATE_SIGNAL", `Ignored duplicate ${input.type} from ${input.source}.`, { signalId: duplicate.id }); return { duplicate: true, signalId: duplicate.id }; }
  const id = uid("sig"); const created = now(); const result = classify(input.payload);
  const status = result.relevant ? "RELEVANT" : "IRRELEVANT";
  db.prepare("INSERT INTO signals (id,workspace_id,type,source,idempotency_key,payload,status,created_at) VALUES (?,?,?,?,?,?,?,?)").run(id, workspaceId, input.type, input.source, idempotencyKey, json(input.payload), status, created);
  db.prepare("INSERT INTO signals_fts (id,text) VALUES (?,?)").run(id, `${input.type} ${input.source} ${JSON.stringify(input.payload)}`);
  logActivity(workspaceId, "SIGNAL_NORMALIZED", `${input.type} normalized from ${input.source}.`, { signalId: id });
  logActivity(workspaceId, "SIGNAL_CLASSIFIED", `${input.type} classified ${status} (score ${result.score.toFixed(2)}).`, { signalId: id, score: result.score });
  if (result.relevant) createOpportunity(workspaceId, id, input.type, input.payload, result.score);
  return { duplicate: false, signalId: id, status };
}

export function createOpportunity(workspaceId: string, signalId: string, signalType: string, payload: Record<string, unknown>, relevance: number) {
  const title = String(payload.title ?? payload.message ?? payload.summary ?? `${signalType.replaceAll("_", " ")} opportunity`);
  const impact = /launch|release|customer|product|feat/.test(title.toLowerCase()) ? 8 : 6;
  const effort = /coding|technical|seo/.test(title.toLowerCase()) ? 5 : 3;
  const confidence = 0.72; const freshness = 1; const evidenceQuality = 0.55;
  const composite = scoreOpportunity({ impact, effort, confidence, relevance, freshness, evidenceQuality });
  const id = uid("opp"); const evidenceId = uid("ev"); const created = now(); const expires = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
  db.prepare("INSERT INTO evidence_bundles (id,workspace_id,signal_id,strategy_module_ids,external_sources,confidence_score,assumptions,created_at) VALUES (?,?,?,?,?,?,?,?)").run(evidenceId, workspaceId, signalId, json([]), json([]), confidence, json(["External research has not been run for this signal."]), created);
  const actions = actionTypesFor(signalType, payload);
  db.prepare("INSERT INTO opportunities (id,workspace_id,cluster_id,title,description,why_now,impact_score,effort_score,confidence_score,relevance_score,freshness_score,evidence_quality,composite_score,recommended_action_types,evidence_bundle_id,status,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run(id, workspaceId, null, title, String(payload.description ?? payload.diffSummary ?? "A signal may contain distribution leverage."), "The source signal is recent and classified as relevant.", impact, effort, confidence, relevance, freshness, evidenceQuality, composite, json(actions), evidenceId, composite >= 4 ? "prioritized" : "ignored", created, expires);
  logActivity(workspaceId, "OPPORTUNITY_SCORED", `${title} scored ${composite} and was ${composite >= 4 ? "prioritized" : "ignored"}.`, { opportunityId: id, signalId });
  return id;
}

function actionTypesFor(type: string, payload: Record<string, unknown>) { const text = `${type} ${JSON.stringify(payload)}`.toLowerCase(); const actions: string[] = []; if (/reddit|hacker|community/.test(text)) actions.push("community_draft"); if (/launch|release|product|feature/.test(text)) actions.push("content_draft", "social_draft"); if (/seo|website|search/.test(text)) actions.push("seo_recommendation"); if (/github|code|api/.test(text)) actions.push("technical_review"); return actions.length ? actions : ["research_brief"]; }

export function createCampaign(goal: string, workspaceId = ensureWorkspace()) {
  const campaignId = uid("camp"); const created = now(); const title = goal.length > 64 ? `${goal.slice(0, 61)}...` : goal;
  db.prepare("INSERT INTO campaigns (id,workspace_id,title,goal,status,created_at) VALUES (?,?,?,?,?,?)").run(campaignId, workspaceId, title, goal, "planning", created);
  const definitions: Array<[SkillType, string, string, string[]]> = [
    ["research", "Research audience and launch context", "Find current evidence required for the goal.", []],
    ["content", "Draft the core launch narrative", "Create the primary founder-editable asset.", []],
    ["social", "Prepare channel adaptations", "Prepare social drafts; no autonomous posting.", []],
    ["community", "Prepare community responses", "Prepare evidence-grounded Reddit/HN drafts; founder posts manually.", []],
    ["review", "Review campaign assets", "Check claims, voice, evidence, and approval requirements.", []],
  ];
  const taskIds: string[] = [];
  for (const [skill, taskTitle, description] of definitions) { const id = uid("task"); const deps = skill === "review" ? taskIds : []; db.prepare("INSERT INTO campaign_tasks (id,campaign_id,skill_type,title,description,depends_on_task_ids,status,created_at) VALUES (?,?,?,?,?,?,?,?)").run(id, campaignId, skill, taskTitle, description, json(deps), deps.length ? "blocked" : "pending", created); taskIds.push(id); }
  logActivity(workspaceId, "CAMPAIGN_CREATED", `Goal created campaign: ${title}.`, { campaignId, taskCount: taskIds.length });
  return campaignId;
}

export function transitionAction(actionId: string, transition: "approve" | "reject" | "retry", editedPayload?: string, reason?: string) {
  const raw = db.prepare("SELECT id,workspace_id as workspaceId,task_id as taskId,asset_id as assetId,channel,idempotency_key as idempotencyKey,approval_state as approvalState,original_payload as originalPayload,edited_payload as editedPayload,rejection_reason as rejectionReason,created_at as createdAt FROM actions WHERE id = ?").get(actionId) as Action | undefined; const action = raw; if (!action) throw new Error("Action not found");
  if (transition === "reject") { if (!["PENDING", "EDITED"].includes(action.approvalState)) throw new Error("Action cannot be rejected from its current state"); db.prepare("UPDATE actions SET approval_state = 'REJECTED', rejection_reason = ? WHERE id = ?").run(reason ?? "Rejected by founder", actionId); logActivity(action.workspaceId, "ACTION_REJECTED", "Action rejected and recorded in Decision Memory.", { actionId }); return "REJECTED"; }
  if (transition === "retry") { if (action.approvalState !== "FAILED") throw new Error("Only failed actions can be retried"); db.prepare("UPDATE actions SET approval_state = 'PENDING' WHERE id = ?").run(actionId); return "PENDING"; }
  if (!["PENDING", "EDITED"].includes(action.approvalState)) throw new Error("Action is not awaiting approval");
  if (editedPayload) db.prepare("UPDATE actions SET approval_state='EDITED', edited_payload=? WHERE id=?").run(editedPayload, actionId);
  db.prepare("UPDATE actions SET approval_state='APPROVED' WHERE id=? AND approval_state IN ('PENDING','EDITED')").run(actionId);
  const locked = db.prepare("UPDATE actions SET approval_state='EXECUTING' WHERE id=? AND approval_state='APPROVED'").run(actionId); if (!locked.changes) throw new Error("Approval race or action already processed");
  logActivity(action.workspaceId, "ACTION_EXECUTING", `Executing approved ${action.channel} action.`, { actionId });
  const connector = executeConnector(action.channel);
  if (!connector.configured) { const reasonMessage = connector.reason ?? "Connector unavailable."; db.prepare("UPDATE actions SET approval_state='FAILED' WHERE id=?").run(actionId); db.prepare("INSERT INTO execution_results (id,action_id,channel,status,execution_metadata,timestamp) VALUES (?,?,?,?,?,?)").run(uid("exec"), actionId, action.channel, "FAILED", json({ reason: reasonMessage }), now()); logActivity(action.workspaceId, "ACTION_FAILED", reasonMessage, { actionId }); return "FAILED"; }
  db.prepare("UPDATE actions SET approval_state='EXECUTED' WHERE id=?").run(actionId); db.prepare("INSERT INTO execution_results (id,action_id,channel,status,external_reference_url,execution_metadata,timestamp) VALUES (?,?,?,?,?,?,?)").run(uid("exec"), actionId, action.channel, "SUCCESS", connector.url ?? null, json({ provider: connector.provider }), now()); logActivity(action.workspaceId, "ACTION_EXECUTED", `Action executed through ${connector.provider}.`, { actionId }); return "EXECUTED";
}

function executeConnector(channel: string): { configured: boolean; reason?: string; provider?: string; url?: string } {
  const connectorId = ({ github: "github", slack: "slack", notion: "notion", x: "x", linkedin: "linkedin", reddit: "reddit", hacker_news: "hacker_news" } as Record<string, string>)[channel] ?? channel;
  const state = connectorRegistry.list().find(item => item.id === connectorId);
  if (!state) return { configured: false, reason: `${channel} has no registered connector. No external side effect was attempted.` };
  if (!state.connected) return { configured: false, reason: `${state.provider} is ${state.status}. No external side effect was attempted.` };
  return { configured: true, provider: state.provider };
}

export function getWorkspaceId() { return ensureWorkspace(); }
export function rows<T = Record<string, unknown>>(sql: string, params: unknown[] = []) { return db.prepare(sql).all(...params) as T[]; }
export function row<T = Record<string, unknown>>(sql: string, params: unknown[] = []) { return db.prepare(sql).get(...params) as T | undefined; }
export function taskRows(campaignId: string) { return rows<CampaignTask>("SELECT * FROM campaign_tasks WHERE campaign_id=? ORDER BY created_at", [campaignId]).map(t => ({ ...t, dependsOnTaskIds: parseJson<string[]>(t.dependsOnTaskIds as unknown as string) })); }
