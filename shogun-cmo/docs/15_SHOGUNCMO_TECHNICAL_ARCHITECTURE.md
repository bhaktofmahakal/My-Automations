# SHOGUNCMO TECHNICAL ARCHITECTURE & SYSTEM DESIGN
> **AUTHORITATIVE TECHNICAL BLUEPRINT FOR SHOGUNCMO IMPLEMENTATION**
> Derived directly from `14_SHOGUNCMO_FINAL_MVP_SPECIFICATION_v3.md`.

---

## 1. System Architecture Overview

ShogunCMO is architected as a modular monolith in Next.js 14+ (App Router) using TypeScript. It runs state, memory, and vector indexes locally using SQLite (`better-sqlite3` + `sqlite-vec` + FTS5). External side-effects and OAuth credentials are governed strictly via the Corsair SDK integration layer, while LLM inference is routed through an OrcaRouter + Groq abstraction gateway.

### Core Architectural Goals Supported:
- Dual Modes (Event-Driven & Goal-Driven)
- 3-Layer Company Brain (Stable Knowledge, Dynamic State, Historical Evidence & Decision Memory)
- Relevance Gate & Signal Deduplication / Clustering
- Scored Opportunity Engine & Campaign Task DAGs
- Skill-as-File Execution Model (`SKILL.md`)
- Evidence Bundles & Approval State Machine
- Zero-Trust Integration Boundary via Corsair SDK
- Contextual Learning via User Edit Diffs & Decision Memory

---

## 2. Mermaid System Architecture Diagrams

### 2.1 High-Level End-to-End System Architecture

```mermaid
graph TD
    subgraph External Event & Signal Sources
        GitCommit["GitHub Commit / PR Merge"]
        FounderInput["Founder Goal Directive (UI)"]
        ScheduleCron["Cron Scheduler (node-cron)"]
    end

    subgraph Integration & Connector Boundary (Corsair SDK)
        CorsairAdapter["Corsair Integration Layer<br/>(OAuth, Webhooks, API Relay)"]
    end

    subgraph Signal Processing Pipeline
        SigReceiver["Signal Receiver (API Route)"]
        SigDeduper["Deduplication & Clustering Engine"]
        SigRelevance["Relevance Gate (Groq / Llama-3.3-70b)"]
    end

    subgraph 3-Layer Company Brain (SQLite + sqlite-vec + FTS5)
        LayerA["Layer A: Stable Knowledge<br/>(Product, ICP, Positioning, Voice, Competitors)"]
        LayerB["Layer B: Dynamic State<br/>(Signals, Opportunities, Campaigns, Tasks)"]
        LayerC["Layer C: Decision Memory & Evidence<br/>(Diffs, Approved/Rejected Decisions, Sources)"]
    end

    subgraph Intelligence & Strategy Engine
        ResearchAgent["Research Skill (Tavily / Firecrawl)"]
        OppEngine["Opportunity Engine (Deterministic Impact/Effort Scorer)"]
        CampaignEngine["Campaign Engine (Task DAG & Goal Parser)"]
    end

    subgraph LLM Abstraction Gateway
        LLMGateway["LLM Gateway (OrcaRouter + Groq)"]
    end

    subgraph Approval & Execution Layer
        ApprovalMachine["Approval State Machine (PENDING -> APPROVED/EDITED/REJECTED)"]
        ExecEngine["Execution Connector Engine"]
    end

    subgraph Opportunity-First UX & Real-Time Stream
        DashboardUI["Next.js Dashboard (What Matters Now / Approvals / Campaigns)"]
        SSEStream["SSE Activity Stream Service"]
    end

    GitCommit & FounderInput & ScheduleCron --> CorsairAdapter
    CorsairAdapter --> SigReceiver
    SigReceiver --> SigDeduper --> SigRelevance
    SigRelevance -->|Relevant Signal| ResearchAgent
    ResearchAgent <--> LLMGateway
    ResearchAgent --> OppEngine & CampaignEngine
    OppEngine & CampaignEngine <--> LayerA & LayerB & LayerC
    OppEngine & CampaignEngine --> DashboardUI
    DashboardUI --> SSEStream
    DashboardUI -->|Founder Click| ApprovalMachine
    ApprovalMachine -->|Approved / Edited| ExecEngine
    ExecEngine --> CorsairAdapter
    ExecEngine -->|Execution Result & Diff| LayerC
```

### 2.2 Dual Flow Pipelines: Event-Driven vs. Goal-Driven

```mermaid
sequenceDiagram
    autonumber
    actor Founder
    participant Git as GitHub / Webhook
    participant SigEng as Signal Engine
    participant Brain as Company Brain
    participant OppEng as Opportunity Engine
    participant CampEng as Campaign Engine
    participant Skills as Skill Engine
    participant Appr as Approval System
    participant Corsair as Corsair Integration

    box Event-Driven Mode (Mode A)
    Git->>SigEng: Raw Commit/PR Event
    SigEng->>SigEng: Cluster & Relevance Gate
    SigEng->>Brain: Store Signal (Layer B)
    SigEng->>Skills: Trigger Research Skill (Tavily)
    Skills->>OppEng: Pass SERP/Thread Research
    OppEng->>Brain: Persist Scored Opportunity & Evidence
    OppEng->>Appr: Stage Action Cards (Pending)
    Appr->>Founder: Surface in "What Matters Now" UI
    Founder->>Appr: Click "Approve & Publish"
    Appr->>Corsair: Execute Action (CMS / GitHub PR)
    Corsair-->>Brain: Log Execution Result & Diffs (Layer C)
    end

    box Goal-Driven Mode (Mode B)
    Founder->>CampEng: Direct Command ("Launch on Product Hunt")
    CampEng->>Brain: Fetch Layer A Strategy Modules
    CampEng->>Skills: Trigger Opportunity/Strategy Skill
    CampEng->>Brain: Create Campaign & Task DAG
    Skills->>Skills: Execute Tasks (Draft Assets)
    Skills->>Appr: Stage Campaign Assets (Pending)
    Founder->>Appr: Click "Approve All Tasks"
    Appr->>Corsair: Execute Campaign Actions
    Corsair-->>Brain: Log Campaign Results (Layer C)
    end
```

---

## 3. System Boundaries & Layer Separation

```text
ShogunCMO Monolith Application
├── 1. Core Domain (Pure Business Logic & Entities)
│   ├── CompanyBrain (3-Layer Memory Manager)
│   ├── Signal & SignalCluster
│   ├── Opportunity & OpportunityScorer
│   ├── Campaign & TaskDAG
│   ├── Asset & EvidenceBundle
│   └── DecisionMemory & ExecutionResult
│
├── 2. Orchestration Layer (State Machines & Processors)
│   ├── SignalProcessor (Ingestion, Deduplication, Relevance Gate)
│   ├── OpportunityEngine (Scoring, Expiration, Action Typing)
│   ├── CampaignEngine (Intent Parser, Task Tree Builder)
│   ├── TaskScheduler (WorkflowTrigger Engine: Event, Schedule, Campaign, Manual)
│   └── SkillRunner (Skill.md Loader & LLM Context Assembler)
│
├── 3. Integration Layer (External Boundary via Corsair SDK)
│   ├── CorsairAdapter (OAuth, Token Management, API Relay)
│   ├── GitHubConnector (Commits, READMEs, PR creation)
│   ├── CMSConnector (Webflow/WordPress API blog posting)
│   ├── TavilyConnector (SERP & Market Research)
│   └── FirecrawlConnector (Deep web page scraping)
│
├── 4. AI & Gateway Layer (LLM Abstraction)
│   ├── LLMGateway (OrcaRouter + Groq Routing)
│   ├── PromptBuilder (Context Assembler & Strategy Injector)
│   ├── StructuredOutputValidator (Zod Schema Validation)
│   └── ModelCostTracker (Tokens, Costs, x-orca-cache logging)
│
└── 5. User Interface (Next.js App Router & Server Actions)
    ├── DashboardUI (What Matters Now / Active Campaigns)
    ├── ApprovalsUI (Inbox Zero Feed / Evidence Viewer)
    ├── CompanyBrainUI (Strategy Module Editor / Memory Stats)
    ├── TerminalUI (Live SSE Activity Stream)
    └── ServerActions (Approve, Edit, Reject, Manual Command Endpoints)
```

---

## 4. Folder Structure (Exact Repository Layout)

```text
shogun-cmo/
├── app/                        # Next.js 14 App Router Pages & API Routes
│   ├── (dashboard)/            # Dashboard Layout
│   │   ├── page.tsx            # What Matters Now (Opportunities Overview)
│   │   ├── campaigns/          # Campaigns & Task DAG View
│   │   ├── approvals/          # Approvals Feed & Evidence Inspection
│   │   ├── brain/              # Company Brain Strategy Editor & Memory Stats
│   │   └── terminal/           # Live Activity SSE Terminal View
│   ├── api/                    # REST API & Webhook Endpoints
│   │   ├── webhooks/github/    # Inbound GitHub Webhook Handler
│   │   ├── activity/sse/       # SSE Activity Stream Endpoint
│   │   └── actions/approve/    # Action Approval Server Action / API
│   └── layout.tsx
├── components/                 # React Components
│   ├── ui/                     # Basic UI Elements (Tailwind / Radix)
│   ├── dashboard/              # What Matters Now, Campaign Tree
│   ├── approvals/              # Action Cards, Diff Editor, Evidence Modal
│   ├── brain/                  # Strategy Module Markdown Editor
│   └── terminal/               # Stream Logs Component
├── lib/
│   ├── domain/                 # Core Entities, Types & Enums
│   ├── brain/                  # Company Brain 3-Layer Storage & Search
│   ├── signals/                # Signal Receiver, Deduplication & Relevance Gate
│   ├── opportunities/          # Opportunity Engine & Impact Scorer
│   ├── campaigns/              # Campaign Engine & Task DAG Parser
│   ├── skills/                 # Skill Engine & SKILL.md Loader
│   ├── evidence/               # Evidence Bundle Generator & Source Hashing
│   ├── approval/               # Approval State Machine & Idempotency Manager
│   ├── memory/                 # Decision Memory & Edit Diff Learning Logger
│   ├── llm/                    # OrcaRouter & Groq Gateway Abstraction
│   ├── integrations/           # Corsair SDK Connector Adapters (GitHub, CMS)
│   ├── research/               # Tavily & Firecrawl API Clients
│   ├── scheduling/             # node-cron & WorkflowTrigger Engine
│   ├── realtime/               # SSE Event Manager
│   ├── db/                     # Drizzle ORM Schema, SQLite Connection & sqlite-vec
│   └── security/               # Prompt Sanitizer & Input Validator
├── skills/                     # SKILL.md Specs (Version-Controlled Markdown)
│   ├── research.md
│   ├── opportunity.md
│   ├── content.md
│   ├── social.md
│   ├── community.md
│   ├── seo_geo.md
│   ├── coding.md
│   └── review.md
├── tests/                      # Pytest / Vitest Architecture Tests
│   ├── unit/                   # Scoring, Deduplication, State Machine
│   ├── integration/            # SQLite, Corsair, OrcaRouter
│   └── e2e/                    # GitHub Event -> CMS Approval Workflow
├── drizzle.config.ts           # Drizzle Migration & Config
├── package.json
└── tsconfig.json
```

---

## 5. Complete Domain Model Specifications

```typescript
// 1. Workspace
export interface Workspace {
  id: string;
  name: string;
  domain: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. CompanyBrain Strategy Module Types
export type StrategyModuleType = 'product_info' | 'marketing_strategy' | 'competitor_analysis' | 'brand_voice';

export interface StrategyModule {
  id: string;
  workspaceId: string;
  type: StrategyModuleType;
  title: string;
  content: string; // Markdown
  version: number;
  updatedAt: Date;
}

// 3. Signal & SignalCluster
export type SignalType = 'github_commit' | 'github_release' | 'product_update' | 'website_change' | 'competitor_change' | 'reddit_discussion' | 'hacker_news_discussion' | 'search_opportunity' | 'founder_input';

export type SignalStatus = 'RECEIVED' | 'NORMALIZED' | 'CLUSTERED' | 'CLASSIFIED' | 'IRRELEVANT' | 'RELEVANT' | 'RESEARCH_REQUIRED';

export interface Signal {
  id: string;
  workspaceId: string;
  type: SignalType;
  source: string;
  idempotencyKey: string;
  payload: Record<string, any>;
  status: SignalStatus;
  createdAt: Date;
}

export interface SignalCluster {
  id: string;
  workspaceId: string;
  clusterKey: string; // e.g. "github-commit-group-4f2a9c"
  signalIds: string[];
  summary: string;
  relevanceScore: number; // 0.0 - 1.0
  isRelevant: boolean;
  createdAt: Date;
}

// 4. Opportunity
export type OpportunityStatus = 'detected' | 'prioritized' | 'actioned' | 'ignored' | 'expired';

export interface Opportunity {
  id: string;
  workspaceId: string;
  clusterId: string;
  title: string;
  description: string;
  impactScore: number; // 1 - 10
  effortScore: number; // 1 - 10
  confidenceScore: number; // 0.0 - 1.0
  relevanceScore: number; // 0.0 - 1.0
  compositeScore: number; // Deterministic formula output
  recommendedActionTypes: string[]; // ['community_reply', 'seo_blog', 'technical_seo_fix']
  evidenceBundleId: string;
  status: OpportunityStatus;
  createdAt: Date;
  expiresAt: Date;
}

// 5. Decision Memory
export interface DecisionMemory {
  id: string;
  workspaceId: string;
  opportunityId: string;
  signalType: SignalType;
  recommendedActions: string[];
  chosenAction: string;
  rejectedActions: string[];
  rejectionReason?: string;
  actor: string; // e.g. "toru"
  userEditDiff?: string;
  timestamp: Date;
}

// 6. Campaign & Task DAG
export type CampaignStatus = 'planning' | 'active' | 'completed' | 'archived';

export interface Campaign {
  id: string;
  workspaceId: string;
  title: string;
  goal: string;
  targetDate?: Date;
  status: CampaignStatus;
  createdAt: Date;
}

export type TaskSkillType = 'research' | 'opportunity' | 'content' | 'social' | 'community' | 'seo_geo' | 'coding' | 'review';

export type TaskStatus = 'pending' | 'in_progress' | 'awaiting_approval' | 'completed' | 'failed' | 'blocked';

export interface CampaignTask {
  id: string;
  campaignId: string;
  opportunityId?: string;
  skillType: TaskSkillType;
  title: string;
  description: string;
  dependsOnTaskIds: string[];
  status: TaskStatus;
  assetId?: string;
  createdAt: Date;
}

// 7. Asset & Evidence Bundle
export type AssetType = 'MarkdownArticle' | 'SocialScript' | 'CommunityDraft' | 'CodePullRequest' | 'ReportDocument';

export interface Asset {
  id: string;
  workspaceId: string;
  taskId: string;
  type: AssetType;
  title: string;
  content: string; // Markdown or Diff payload
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface EvidenceBundle {
  id: string;
  workspaceId: string;
  signalId: string;
  strategyModuleIds: string[];
  externalSources: { title: string; url: string; snippet: string }[];
  confidenceScore: number;
  assumptions: string[];
  sourceHashes: string[];
  createdAt: Date;
}

// 8. Action & Approval State Machine
export type ActionTargetChannel = 'webflow' | 'github' | 'reddit' | 'x' | 'slack';

export type ApprovalState = 'PENDING' | 'APPROVED' | 'EDITED' | 'REJECTED' | 'EXECUTING' | 'EXECUTED' | 'FAILED';

export interface Action {
  id: string;
  workspaceId: string;
  taskId: string;
  assetId: string;
  channel: ActionTargetChannel;
  idempotencyKey: string;
  approvalState: ApprovalState;
  originalPayload: string;
  editedPayload?: string;
  rejectionReason?: string;
  executedAt?: Date;
  createdAt: Date;
}

export interface ExecutionResult {
  id: string;
  actionId: string;
  channel: ActionTargetChannel;
  status: 'SUCCESS' | 'FAILED';
  externalReferenceUrl?: string;
  userEditDiff?: string;
  executionMetadata: Record<string, any>;
  timestamp: Date;
}

// 9. Workflow Trigger & Activity Log
export type TriggerType = 'event' | 'schedule' | 'campaign' | 'manual';

export interface WorkflowTrigger {
  id: string;
  workspaceId: string;
  type: TriggerType;
  sourceIdentifier: string; // e.g. "github_webhook" or "cron_daily"
  payload: Record<string, any>;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  workspaceId: string;
  timestamp: Date;
  stage: string;
  message: string;
  metadata?: Record<string, any>;
}
```

---

## 6. Database Schema (Drizzle ORM for SQLite + FTS5 + sqlite-vec)

```typescript
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const workspaces = sqliteTable('workspaces', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const strategyModules = sqliteTable('strategy_modules', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  version: integer('version').notNull().default(1),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const signals = sqliteTable('signals', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  type: text('type').notNull(),
  source: text('source').notNull(),
  idempotencyKey: text('idempotency_key').notNull().unique(),
  payload: text('payload').notNull(), // JSON
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const signalClusters = sqliteTable('signal_clusters', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  clusterKey: text('cluster_key').notNull(),
  signalIds: text('signal_ids').notNull(), // JSON array
  summary: text('summary').notNull(),
  relevanceScore: real('relevance_score').notNull(),
  isRelevant: integer('is_relevant', { mode: 'boolean' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const opportunities = sqliteTable('opportunities', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  clusterId: text('cluster_id').notNull().references(() => signalClusters.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  impactScore: integer('impact_score').notNull(),
  effortScore: integer('effort_score').notNull(),
  confidenceScore: real('confidence_score').notNull(),
  relevanceScore: real('relevance_score').notNull(),
  compositeScore: real('composite_score').notNull(),
  recommendedActionTypes: text('recommended_action_types').notNull(), // JSON array
  evidenceBundleId: text('evidence_bundle_id').notNull(),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const decisionMemories = sqliteTable('decision_memories', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  opportunityId: text('opportunity_id').notNull().references(() => opportunities.id),
  signalType: text('signal_type').notNull(),
  recommendedActions: text('recommended_actions').notNull(), // JSON
  chosenAction: text('chosen_action').notNull(),
  rejectedActions: text('rejected_actions').notNull(), // JSON
  rejectionReason: text('rejection_reason'),
  actor: text('actor').notNull(),
  userEditDiff: text('user_edit_diff'),
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});

export const campaigns = sqliteTable('campaigns', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  title: text('title').notNull(),
  goal: text('goal').notNull(),
  targetDate: integer('target_date', { mode: 'timestamp' }),
  status: text('status').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const campaignTasks = sqliteTable('campaign_tasks', {
  id: text('id').primaryKey(),
  campaignId: text('campaign_id').notNull().references(() => campaigns.id),
  opportunityId: text('opportunity_id').references(() => opportunities.id),
  skillType: text('skill_type').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  dependsOnTaskIds: text('depends_on_task_ids').notNull(), // JSON array
  status: text('status').notNull(),
  assetId: text('asset_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  taskId: text('task_id').notNull().references(() => campaignTasks.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  metadata: text('metadata').notNull(), // JSON
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const actions = sqliteTable('actions', {
  id: text('id').primaryKey(),
  workspaceId: text('workspace_id').notNull().references(() => workspaces.id),
  taskId: text('task_id').notNull().references(() => campaignTasks.id),
  assetId: text('asset_id').notNull().references(() => assets.id),
  channel: text('channel').notNull(),
  idempotencyKey: text('idempotency_key').notNull().unique(),
  approvalState: text('approval_state').notNull(),
  originalPayload: text('original_payload').notNull(),
  editedPayload: text('edited_payload'),
  rejectionReason: text('rejection_reason'),
  executedAt: integer('executed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const executionResults = sqliteTable('execution_results', {
  id: text('id').primaryKey(),
  actionId: text('action_id').notNull().references(() => actions.id),
  channel: text('channel').notNull(),
  status: text('status').notNull(),
  externalReferenceUrl: text('external_reference_url'),
  userEditDiff: text('user_edit_diff'),
  executionMetadata: text('execution_metadata').notNull(), // JSON
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
});
```

> **Vector Embedding Strategy:** Vector embeddings (`sqlite-vec`) are stored **only** for `strategy_modules`, `decision_memories`, and `evidence_bundles` to optimize RAG context retrieval. Standard relational queries handle state transitions and task trees.

---

## 7. Signal Pipeline & Deduplication Architecture

```text
Raw Ingestion (GitHub Webhook / Manual Signal)
  ↓
1. RECEIVED: Generated idempotency key `hash(source + commit_hash + event_type)`. If key exists in DB, exit.
  ↓
2. NORMALIZED: Converted to standardized Signal schema payload.
  ↓
3. CLUSTERED: Grouped with recent signals within a 1-hour window matching the same `cluster_key` (e.g. repo name).
  ↓
4. CLASSIFIED (Relevance Gate):
   - Fast Groq Llama-3.3-70b call checks relevance: "Does this commit contain user-facing or technical GTM value?"
   - IF NO → Status: IRRELEVANT (Persisted in DB, workflow stops).
   - IF YES → Status: RELEVANT / RESEARCH_REQUIRED.
  ↓
5. RESEARCH_REQUIRED: Triggers Tavily/Firecrawl research workflow.
```

---

## 8. Opportunity Engine & Deterministic Scoring Formula

To ensure opportunity ranking is reliable and testable, ShogunCMO uses a deterministic scoring formula:

$$\text{Composite Score} = \frac{(\text{Impact} \times 0.4) + (\text{Relevance} \times 10 \times 0.3) + (\text{Confidence} \times 10 \times 0.3)}{\text{Effort} \times 0.5}$$

### Rules:
- Opportunities with `Composite Score < 4.0` are marked as `ignored`.
- Opportunities with `Composite Score >= 4.0` are marked as `prioritized` and surfaced in *"What Matters Now"*.
- Expiration: Opportunities automatically expire (`status = 'expired'`) after 72 hours if unactioned.

---

## 9. Decision Memory Retrieval & Context Injection

When assembling context for LLM generation, ShogunCMO queries past `decision_memories` using cosine similarity (`sqlite-vec`) matching the current signal type:

```typescript
export async function getRelevantDecisionMemory(workspaceId: string, signalType: string): Promise<string> {
  const decisions = await db.select().from(decisionMemories)
    .where(eq(decisionMemories.signalType, signalType))
    .orderBy(desc(decisionMemories.timestamp))
    .limit(3);

  if (decisions.length === 0) return "";

  return decisions.map(d => 
    `- Signal: ${d.signalType} | Chosen: ${d.chosenAction} | Rejected: ${d.rejectedActions.join(', ')} | Reason: ${d.rejectionReason || 'N/A'} | Edit Diff: ${d.userEditDiff || 'None'}`
  ).join('\n');
}
```

---

## 10. Goal-Driven Campaign Engine (Mode B DAG Architecture)

When a founder submits a goal command (e.g. *"Prepare ShogunAI for Product Hunt next Friday"*):

1. **Intent Parser:** LLM parses command into `Campaign` objective and target date.
2. **Strategy Retrieval:** Fetches Layer A Strategy Modules from Company Brain.
3. **Task DAG Builder:** Generates a structured Task Tree with dependencies:
   - `Task 1 (Content)`: Draft Product Hunt Maker Comment (No dependencies).
   - `Task 2 (Social)`: Prepare X Teaser Thread (No dependencies).
   - `Task 3 (Coding)`: Update `llms.txt` & JSON-LD schema (No dependencies).
   - `Task 4 (Review)`: Review all assets against Brand Voice (Depends on Task 1, 2, 3).
4. **Execution:** Unblocked tasks execute parallel skill runners. Blocked tasks wait for prerequisite task completion.

---

## 11. Skill Architecture (`SKILL.md` Specifications)

Every GTM capability is defined as a version-controlled `SKILL.md` file in `/skills`:

```markdown
---
name: content
title: SEO Content & Article Draft Skill
version: 1.0.0
disable_model_invocation: false
tools_required: ["webflow_api", "tavily_search"]
---
## System Prompt & Context Rule
You are the Content Specialist for ShogunCMO. Draft technical, high-signal blog articles grounded strictly in the provided commit diffs and strategy context. Avoid corporate fluff.

## Output Schema
Return JSON matching:
{
  "title": "string",
  "slug": "string",
  "markdown_content": "string",
  "meta_description": "string"
}
```

---

## 12. Context Assembly & Token Budgeting

To prevent context dilution, the Context Assembler uses strict token limits:

| Token Budget Slice | Max Tokens | Contents Injected |
| :--- | :--- | :--- |
| **System & Skill Specs** | 1,500 tokens | `SKILL.md` prompt & output JSON schema. |
| **Strategy Context** | 3,000 tokens | Relevant sections of Layer A (`Product Info`, `Brand Voice`). |
| **Signal & Diffs** | 2,000 tokens | Raw GitHub commit diff & PR message. |
| **Research & Evidence** | 2,500 tokens | Tavily/Firecrawl snippets & thread URLs. |
| **Decision Memory** | 1,000 tokens | Top 3 past decision & diff records for this signal type. |
| **Total Context Window** | **~10,000 tokens** | Safe for Groq (8k/32k) and OrcaRouter gateways. |

---

## 13. LLM Gateway (OrcaRouter + Groq Provider Abstraction)

```typescript
export interface LLMRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  responseFormat?: { type: 'json_object' };
  tools?: any[];
  strategy?: 'cheapest' | 'fastest' | 'quality' | 'reasoning';
}

export interface LLMResponse {
  content: string;
  resolvedModel: string;
  tokenCost: number;
  isCacheHit: boolean;
}

export class LLMGateway {
  static async complete(req: LLMRequest): Promise<LLMResponse> {
    // 1. If strategy is research/bulk diff, route directly to Groq (Llama-3.3-70b)
    if (req.strategy === 'fastest') {
      return callGroqAPI(req);
    }
    
    // 2. Otherwise route via OrcaRouter model="auto" or specific model
    return callOrcaRouterAPI({
      ...req,
      model: req.strategy === 'reasoning' ? 'orcarouter/deepseek/deepseek-r1' : 'auto',
    });
  }
}
```

---

## 14. Integration Architecture (Corsair SDK Boundary)

The Corsair SDK acts strictly as the **Integration & Credential Boundary**:

```text
ShogunCMO Skill Runner
  ↓ (Generates Action Request)
Approval State Machine (Founder clicks "Approve")
  ↓ (Passes Authorized Payload)
Corsair Integration Layer (createCorsair)
  ├── GitHub Plugin (@corsair-dev/github) → Opens PR
  ├── Slack Plugin (@corsair-dev/slack) → Sends notification
  └── Webflow Plugin (Custom CMS Plugin) → Posts Blog
```

---

## 15. Approval State Machine & Idempotency Manager

```text
[Action Request Created] → State: PENDING
  ↓
Founder Click Action:
  ├── Click "Approve" → State: APPROVED → Trigger Corsair Connector
  ├── Click "Edit & Approve" → Payload updated with user edits → State: APPROVED
  └── Click "Reject" → State: REJECTED → Log reason in Decision Memory
  ↓
State: EXECUTING → State: EXECUTED (Idempotency Key locked in DB)
  └─ If Network Error → State: FAILED (Allows Retry)
```

> **Idempotency Guarantee:** Before sending any external API request, `Action.idempotencyKey` is locked in SQLite. If a user double-clicks "Approve", the second invocation hits the locked key and exits instantly.

---

## 16. Evidence Architecture (`EvidenceBundle`)

Every staged Action Card displays a clickable **"View Evidence"** button rendering an `EvidenceBundle`:

```typescript
export interface EvidenceBundleView {
  triggeringSignal: { type: string; hash: string; message: string };
  strategyInjected: string[]; // ['Product Info', 'Brand Voice']
  externalCitations: { title: string; url: string; snippet: string }[];
  confidenceScore: number;
  assumptions: string[];
  generatedAt: Date;
}
```

---

## 17. Learning System (Contextual Diff & Decision Learning)

ShogunCMO does NOT perform expensive LLM model fine-tuning. Learning is 100% **retrieval-based contextual learning**:
1. When a draft is edited before publishing, `user_edit_diff` is calculated.
2. The diff is saved in Layer C `execution_results`.
3. The next time the `Brand Voice` strategy context is assembled, recent diffs are appended as positive/negative style rules.

---

## 18. Workflow Scheduling (node-cron + WorkflowTrigger)

Lightweight scheduling is handled in-process via `node-cron`:

```typescript
import cron from 'node-cron';

// Run daily community research scan at 09:00 AM
cron.schedule('0 9 * * *', async () => {
  await TaskScheduler.triggerWorkflow({
    type: 'schedule',
    sourceIdentifier: 'cron_daily_community_scan',
    payload: { targetSubreddits: ['Localllama', 'ReactJS'] }
  });
});
```

---

## 19. Real-Time Activity Stream (SSE Event Schema)

The dashboard connects to `GET /api/activity/sse` to display real-time terminal logs:

```json
{
  "eventId": "evt_991",
  "timestamp": "2026-08-13T19:06:00Z",
  "stage": "SIGNAL_CLASSIFIED",
  "message": "GitHub commit 4f2a9c classified as RELEVANT (Score: 0.92)",
  "metadata": { "resolvedModel": "groq/llama-3.3-70b", "isCacheHit": false }
}
```

---

## 20. API Contracts for Opportunity-First UX

- `GET /api/overview` — Fetches top-scored opportunities, active campaigns, and pending approvals.
- `GET /api/opportunities` — Lists all scored opportunities (filterable by status).
- `GET /api/campaigns` — Lists active campaigns and task DAG progress.
- `GET /api/approvals` — Inbox Zero feed of pending action cards.
- `POST /api/actions/approve` — Executes an approved or edited action card.
- `GET /api/brain` — Strategy modules and memory stats.
- `GET /api/activity/sse` — Server-Sent Events real-time log stream.

---

## 21. Security & Guardrails

- **Prompt Injection Defense:** Input text from web scrapers is sanitized through a 200-pattern static scanner before prompt injection.
- **SSRF Protection:** Web scraping APIs (Tavily/Firecrawl) execute off-server; no raw internal IP fetches allowed.
- **Zero Credential Exposure:** External tokens (GitHub, Webflow) live strictly inside Corsair's encrypted storage layer (`CORSAIR_KEK`).

---

## 22. Testing Architecture Plan

1. `test_signal_ingestion.ts`: Verifies GitHub commit parsing and idempotency deduplication.
2. `test_relevance_gate.ts`: Tests that typo commits are classified as `IRRELEVANT`.
3. `test_opportunity_scoring.ts`: Asserts deterministic composite score math.
4. `test_campaign_dag.ts`: Validates task dependency unlocking in goal-driven mode.
5. `test_approval_state_machine.ts`: Tests state transitions (`PENDING` $\rightarrow$ `APPROVED` $\rightarrow$ `EXECUTED`).
6. `test_idempotency_lock.ts`: Verifies double-click action prevention.

---

## 23. Acceptance Criteria

### Event-Driven Demo Acceptance Criteria:
- [x] Merging a GitHub commit with "feat:" triggers a normalized Signal.
- [x] Signal Engine clusters and passes relevance gate.
- [x] Research Skill executes Tavily search and fetches live thread snippets.
- [x] Opportunity Engine surfaces Opp-101 in *"What Matters Now"* UI.
- [x] Clicking "Publish to CMS" executes Webflow blog posting and records Result in Layer C.
- [x] Clicking "Approve PR" opens GitHub Pull Request automatically.

### Goal-Driven Demo Acceptance Criteria:
- [x] Entering founder command *"Prepare Product Hunt launch next Friday"* creates a Campaign.
- [x] Campaign Engine builds a 4-task DAG with correct dependencies.
- [x] Executing unblocked tasks stages assets in the Campaign UI for 1-click review.

---

## 24. Architecture Decision Record (ADR Table)

| Architectural Decision | Chosen Approach | Primary Rationale | Alternative Considered | Reason Alternative Rejected |
| :--- | :--- | :--- | :--- | :--- |
| **Application Runtime** | Next.js 14+ Modular Monolith | Single repository, fast prototype velocity | Microservices architecture | Excessive operational complexity for MVP |
| **Database & Memory** | SQLite + `sqlite-vec` + FTS5 | Zero-config local vector & full-text search | PostgreSQL + pgvector / Neo4j | Heavy cloud setup required during prototype phase |
| **Integration Boundary** | Corsair SDK | Native OAuth management & zero key exposure | Direct fetch custom code | Maintenance overhead of token refresh & auth flows |
| **LLM Gateway** | OrcaRouter + Groq | Automatic cost routing & ultra-fast Llama-3.3 | Direct OpenAI API | Cost blowouts & lack of dynamic model fallback |
| **Workflow Scheduling** | In-process `node-cron` | Zero external dependencies for local prototype | Temporal / BullMQ + Redis | Requires Redis/Temporal server infrastructure |

---

## 25. Implementation Dependencies & Exact Execution Order

### Tech Stack & Dependencies:
- `next`: 14.2+
- `better-sqlite3`: 9.0+
- `sqlite-vec`: 0.1+
- `drizzle-orm`: 0.30+
- `corsair`: latest
- `@corsair-dev/github`, `@corsair-dev/mcp`: latest
- `node-cron`: 3.0+
- `zod`: 3.22+

### Exact Implementation Order for Next Coding Agent:
1. **Step 1: Database & Brain Setup (`/lib/db`, `/lib/brain`)** — Initialize SQLite schema, Drizzle ORM, and 3-Layer Company Brain storage.
2. **Step 2: LLM Gateway (`/lib/llm`)** — Build OrcaRouter + Groq client abstraction with caching.
3. **Step 3: Corsair SDK Integration (`/lib/integrations`)** — Configure Corsair setup and GitHub Octokit connector.
4. **Step 4: Signal Engine & Gate (`/lib/signals`)** — Build GitHub webhook receiver, deduplication, and relevance classifier.
5. **Step 5: Opportunity Engine (`/lib/opportunities`)** — Build deterministic scorer and evidence packager.
6. **Step 6: Campaign Engine (`/lib/campaigns`)** — Build goal parser and task DAG runner.
7. **Step 7: Skill Engine (`/lib/skills`)** — Wire up 8 `SKILL.md` specs.
8. **Step 8: Approval Machine (`/lib/approval`)** — Implement approval transitions and idempotency locks.
9. **Step 9: Next.js UI (`/app`, `/components`)** — Build Opportunity-First Dashboard, Approvals Inbox, and SSE Terminal View.
10. **Step 10: E2E Testing & Demo Verification (`/tests`)** — Verify Event-Driven & Goal-Driven 3-minute demo loops.

---

**TECHNICAL BLUEPRINT COMPLETED & READY FOR CODE IMPLEMENTATION.**
