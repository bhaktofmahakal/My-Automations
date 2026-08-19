import { db, ensureWorkspace, json, logActivity, now, uid } from "./db";
import { createCampaign, ingestSignal, row, rows, transitionAction } from "./engine";
import { connectorRegistry } from "./connectors";
import { researchRouter } from "./research";
import { llmGateway } from "./llm";

export function overview() {
  const workspaceId = ensureWorkspace();
  return {
    workspace: row("SELECT id,name,domain,created_at as createdAt FROM workspaces WHERE id=?", [workspaceId]),
    opportunities: rows("SELECT id,title,description,why_now as whyNow,impact_score as impactScore,effort_score as effortScore,confidence_score as confidenceScore,relevance_score as relevanceScore,composite_score as compositeScore,recommended_action_types as recommendedActionTypes,status,created_at as createdAt FROM opportunities WHERE workspace_id=? AND status='prioritized' ORDER BY composite_score DESC LIMIT 8", [workspaceId]).map(decodeOpportunity),
    approvals: rows("SELECT id,channel,approval_state as approvalState,original_payload as originalPayload,created_at as createdAt FROM actions WHERE workspace_id=? AND approval_state IN ('PENDING','EDITED','FAILED') ORDER BY created_at DESC LIMIT 8", [workspaceId]).map(decodeAction),
    campaigns: rows("SELECT id,title,goal,status,created_at as createdAt FROM campaigns WHERE workspace_id=? AND status != 'archived' ORDER BY created_at DESC LIMIT 5", [workspaceId]),
    activity: rows("SELECT id,stage,message,metadata,timestamp FROM activity_logs WHERE workspace_id=? ORDER BY timestamp DESC LIMIT 20", [workspaceId]).map(decodeActivity),
    integrations: integrationStatus(),
  };
}

export function integrationStatus() {
  const providerLabels: Record<string, string> = { tavily: "Tavily", firecrawl: "Firecrawl", tinyfish: "TinyFish", groq: "Groq", orcarouter: "OrcaRouter" };
  const connectors = connectorRegistry.list().filter(item => item.category !== "research" && item.category !== "llm").map(item => ({ name: item.provider, category: item.category, kind: item.category.toUpperCase(), configured: item.configured, connected: item.connected, status: item.status, description: item.description, capabilities: item.capabilities.map(capability => capability.id), lastSync: item.lastSync }));
  const research = researchRouter.providers().map(item => ({ name: providerLabels[item.id] ?? item.id, category: "research", kind: "RESEARCH", configured: item.configured, connected: false, status: item.configured ? "CONFIGURED" : "AUTH_REQUIRED", description: `Research provider for ${item.mode}.`, capabilities: [], lastSync: null }));
  const llm = llmGateway.providers().map(item => ({ name: providerLabels[item.id] ?? item.id, category: "llm", kind: "LLM", configured: item.configured, connected: false, status: item.configured ? "CONFIGURED" : "AUTH_REQUIRED", description: item.required ? "Required MVP model provider." : "Optional routing provider.", capabilities: [], lastSync: null }));
  const corsair = { name: "Corsair Hub", category: "boundary", kind: "BOUNDARY", configured: Boolean(process.env.CORSAIR_DEV_API_KEY && process.env.CORSAIR_DEV_SIGNING_SECRET), connected: false, status: process.env.CORSAIR_DEV_API_KEY && process.env.CORSAIR_DEV_SIGNING_SECRET ? "CONFIGURED" : "AUTH_REQUIRED", description: "Credential and connector boundary. Provider connections are reported separately.", capabilities: ["connect", "health", "execute"], lastSync: null };
  return [corsair, ...connectors, ...research, ...llm];
}

export function listBrain() { const workspaceId = ensureWorkspace(); return rows("SELECT id,type,title,content,version,updated_at as updatedAt FROM strategy_modules WHERE workspace_id=? ORDER BY type", [workspaceId]); }
export function updateBrain(id: string, content: string) { const workspaceId = ensureWorkspace(); const result = db.prepare("UPDATE strategy_modules SET content=?, version=version+1, updated_at=? WHERE id=? AND workspace_id=?").run(content, now(), id, workspaceId); if (!result.changes) throw new Error("Strategy module not found"); logActivity(workspaceId, "BRAIN_UPDATED", "Company Brain strategy module updated by founder.", { moduleId: id }); return row("SELECT id,type,title,content,version,updated_at as updatedAt FROM strategy_modules WHERE id=?", [id]); }
export function listSignals() { const workspaceId = ensureWorkspace(); return rows("SELECT id,type,source,idempotency_key as idempotencyKey,payload,status,created_at as createdAt FROM signals WHERE workspace_id=? ORDER BY created_at DESC LIMIT 100", [workspaceId]).map(decodeSignal); }
export function listOpportunities() { const workspaceId = ensureWorkspace(); return rows("SELECT * FROM opportunities WHERE workspace_id=? ORDER BY composite_score DESC,created_at DESC", [workspaceId]).map(decodeOpportunity); }
export function opportunityDetail(id: string) {
  const workspaceId = ensureWorkspace();
  const opportunity = row("SELECT id,title,description,why_now as whyNow,impact_score as impactScore,effort_score as effortScore,confidence_score as confidenceScore,relevance_score as relevanceScore,freshness_score as freshnessScore,evidence_quality as evidenceQuality,composite_score as compositeScore,recommended_action_types as recommendedActionTypes,evidence_bundle_id as evidenceBundleId,status,created_at as createdAt,expires_at as expiresAt FROM opportunities WHERE id=? AND workspace_id=?", [id, workspaceId]);
  if (!opportunity) return null;
  const evidence = opportunity.evidenceBundleId ? row("SELECT id,signal_id as signalId,external_sources as externalSources,confidence_score as confidenceScore,assumptions,created_at as createdAt FROM evidence_bundles WHERE id=? AND workspace_id=?", [opportunity.evidenceBundleId, workspaceId]) : null;
  const actions = rows("SELECT id,opportunity_id as opportunityId,channel,approval_state as approvalState,original_payload as originalPayload,edited_payload as editedPayload,created_at as createdAt FROM actions WHERE workspace_id=? AND opportunity_id=? ORDER BY created_at DESC", [workspaceId, id]).map(decodeAction);
  return { opportunity: decodeOpportunity(opportunity as Record<string, unknown>), evidence: evidence ? { ...evidence, externalSources: JSON.parse(String((evidence as Record<string, unknown>).externalSources ?? "[]")), assumptions: JSON.parse(String((evidence as Record<string, unknown>).assumptions ?? "[]")) } : null, actions };
}
export function listCampaigns() { const workspaceId = ensureWorkspace(); return rows("SELECT * FROM campaigns WHERE workspace_id=? ORDER BY created_at DESC", [workspaceId]); }
export function campaignDetail(id: string) { const campaign = row("SELECT id,title,goal,target_date as targetDate,status,created_at as createdAt FROM campaigns WHERE id=?", [id]); if (!campaign) return null; return { campaign, tasks: rows("SELECT id,skill_type as skillType,title,description,depends_on_task_ids as dependsOnTaskIds,status,asset_id as assetId,created_at as createdAt FROM campaign_tasks WHERE campaign_id=? ORDER BY created_at", [id]).map((t: Record<string, unknown>) => ({ ...t, dependsOnTaskIds: JSON.parse(String(t.dependsOnTaskIds)) })) }; }
export function listApprovals() { const workspaceId = ensureWorkspace(); return rows("SELECT * FROM actions WHERE workspace_id=? ORDER BY created_at DESC", [workspaceId]).map(decodeAction); }
export function listActivity() { const workspaceId = ensureWorkspace(); return rows("SELECT id,stage,message,metadata,timestamp FROM activity_logs WHERE workspace_id=? ORDER BY timestamp DESC LIMIT 200", [workspaceId]).map(decodeActivity); }
export function createManualSignal(body: { type?: string; source?: string; title?: string; message?: string; description?: string }) { return ingestSignal({ type: body.type ?? "founder_input", source: body.source ?? "founder", payload: { title: body.title, message: body.message, description: body.description } }); }
export function createGoal(goal: string) { if (!goal.trim()) throw new Error("Goal is required"); return { campaignId: createCampaign(goal.trim()) }; }
export function actOnApproval(actionId: string, action: "approve" | "reject" | "retry", editedPayload?: string, reason?: string) { return { state: transitionAction(actionId, action, editedPayload, reason) }; }
export function seedActionForOpportunity(opportunityId: string, channel = "community") { const workspaceId = ensureWorkspace(); const opp = row<{ title: string }>("SELECT title FROM opportunities WHERE id=? AND workspace_id=?", [opportunityId, workspaceId]); if (!opp) throw new Error("Opportunity not found"); const id = uid("act"); const created = now(); const payload = `Draft action for: ${opp.title}`; db.prepare("INSERT INTO actions (id,workspace_id,opportunity_id,channel,idempotency_key,approval_state,original_payload,created_at) VALUES (?,?,?,?,?,?,?,?)").run(id, workspaceId, opportunityId, channel, uid("idem"), "PENDING", payload, created); logActivity(workspaceId, "ACTION_STAGED", `Staged a ${channel} action for founder approval.`, { actionId: id, opportunityId }); return id; }

function decodeSignal<T extends Record<string, unknown>>(item: T) { return { ...item, payload: JSON.parse(String(item.payload)) }; }
function decodeOpportunity<T extends Record<string, unknown>>(item: T) { return { ...item, recommendedActionTypes: JSON.parse(String(item.recommendedActionTypes ?? item.recommended_action_types ?? "[]")) }; }
function decodeAction<T extends Record<string, unknown>>(item: T) { return { ...item, approvalState: item.approvalState ?? item.approval_state ?? "PENDING", originalPayload: String(item.originalPayload ?? item.original_payload ?? ""), editedPayload: item.editedPayload ?? item.edited_payload ?? null }; }
function decodeActivity<T extends Record<string, unknown>>(item: T) { return { ...item, metadata: JSON.parse(String(item.metadata ?? "{}")) }; }
