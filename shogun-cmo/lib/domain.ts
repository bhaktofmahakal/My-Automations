export const signalTypes = [
  "github_commit", "github_release", "slack_message", "notion_change", "product_update",
  "website_change", "competitor_change", "reddit_discussion", "hacker_news_discussion",
  "search_opportunity", "founder_input", "scheduled_event",
] as const;
export type SignalType = (typeof signalTypes)[number];

export const signalStatuses = ["RECEIVED", "NORMALIZED", "DEDUPLICATED", "CLUSTERED", "CLASSIFIED", "RELEVANT", "IRRELEVANT", "RESEARCH_REQUIRED"] as const;
export type SignalStatus = (typeof signalStatuses)[number];

export const skillTypes = ["research", "opportunity", "content", "social", "community", "seo_geo", "coding", "review", "product_hunt"] as const;
export type SkillType = (typeof skillTypes)[number];

export const actionStates = ["PENDING", "EDITED", "APPROVED", "REJECTED", "EXECUTING", "EXECUTED", "FAILED"] as const;
export type ActionState = (typeof actionStates)[number];

export type Json = Record<string, unknown> | unknown[];

export interface Workspace { id: string; name: string; domain: string; createdAt: string; }
export interface StrategyModule { id: string; workspaceId: string; type: string; title: string; content: string; version: number; updatedAt: string; }
export interface Signal { id: string; workspaceId: string; type: SignalType; source: string; idempotencyKey: string; payload: Json; status: SignalStatus; createdAt: string; }
export interface EvidenceBundle { id: string; workspaceId: string; signalId?: string; strategyModuleIds: string[]; externalSources: Array<{ title: string; url: string; snippet: string }>; confidenceScore: number; assumptions: string[]; createdAt: string; }
export interface Opportunity { id: string; workspaceId: string; clusterId?: string; title: string; description: string; whyNow: string; impactScore: number; effortScore: number; confidenceScore: number; relevanceScore: number; freshnessScore: number; evidenceQuality: number; compositeScore: number; recommendedActionTypes: string[]; evidenceBundleId?: string; status: string; createdAt: string; expiresAt: string; }
export interface Campaign { id: string; workspaceId: string; title: string; goal: string; targetDate?: string; status: string; createdAt: string; }
export interface CampaignTask { id: string; campaignId: string; skillType: SkillType; title: string; description: string; dependsOnTaskIds: string[]; status: string; assetId?: string; createdAt: string; }
export interface Asset { id: string; workspaceId: string; taskId?: string; type: string; title: string; content: string; metadata: Json; createdAt: string; }
export interface Action { id: string; workspaceId: string; opportunityId?: string; taskId?: string; assetId?: string; channel: string; idempotencyKey: string; approvalState: ActionState; originalPayload: string; editedPayload?: string; rejectionReason?: string; createdAt: string; }
export interface ActivityLog { id: string; workspaceId: string; stage: string; message: string; metadata: Json; timestamp: string; }
