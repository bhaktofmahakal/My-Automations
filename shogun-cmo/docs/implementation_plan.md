# Implementation Plan — ShogunCMO Full Prototype

Building **ShogunCMO**: A memory-first AI Chief Marketing Officer for ShogunAI operating in both Event-Driven and Goal-Driven modes.

---

## User Review Required

> [!IMPORTANT]
> - **Primary Workspace:** Project will be created in `u:\My-Automations\shogun-cmo`.
> - **Local First:** SQLite + `sqlite-vec` + FTS5 with Drizzle ORM will run fully locally.
> - **Mock & Credential Guard:** External services (OrcaRouter, Groq, Tavily, Firecrawl, GitHub, Webflow) will have clean interface adapters with deterministic mock providers so development and testing can proceed cleanly even if keys are missing.
> - **Required Environment Variables:** When an unconfigured API key is reached, the build will issue a standard notification block with `SERVICE`, `ENV VARIABLE`, `WHY IT IS NEEDED`, and `HOW TO TEST IT`.

---

## Proposed Implementation Phases

### Phase 1: Application Foundation & Database Infrastructure
- Create Next.js 14+ App Router project with TypeScript and TailwindCSS in `u:\My-Automations\shogun-cmo`.
- Configure Drizzle ORM with SQLite (`better-sqlite3` + `sqlite-vec` + FTS5).
- Implement Drizzle schema in `lib/db/schema.ts` for all core entities:
  - `workspaces`, `strategy_modules`, `signals`, `signal_clusters`, `opportunities`, `decision_memories`, `campaigns`, `campaign_tasks`, `assets`, `evidence_bundles`, `actions`, `execution_results`, `activity_logs`.
- Create vector store abstraction (`VectorStore` interface & `SqliteVecStore` implementation).
- Seed Company Brain with initial ShogunAI Strategy Context (Product Info, ICP, Positioning, Brand Voice, Competitors).

### Phase 2: 3-Layer Company Brain & Context Assembler
- Implement Layer A (Stable Knowledge), Layer B (Dynamic State), Layer C (Decision Memory & Diffs).
- Build `ContextAssembler` service with dynamic model-aware token budgeting (`ContextBudgeter`).
- Build hybrid 2-stage KNN + Recency decision memory retriever.

### Phase 3: LLM Gateway Abstraction
- Implement `LLMProvider` interface with `OrcaRouterProvider`, `GroqProvider`, and `MockLLMProvider`.
- Configure abstract model aliases (`MODEL_FAST`, `MODEL_REASONING`, `MODEL_WRITER`, `MODEL_REVIEWER`).
- Support structured JSON validation via Zod, retries, timeout, and cost/token logging.

### Phase 4: Signal Engine & Relevance Classifier Gate
- Build GitHub Webhook and API receiver (`/api/webhooks/github`).
- Implement SHA-256 idempotency key check and 1-hour window event clustering.
- Build fast Groq/Llama-3.3 Relevance Classifier (`IRRELEVANT` vs `RELEVANT / RESEARCH_REQUIRED`).

### Phase 5: Research Engine & Adapters
- Implement `ResearchAdapter` interface with `TavilyAdapter`, `FirecrawlAdapter`, and `MockResearchAdapter`.
- Store evidence citations (title, URL, snippet, source type, confidence).

### Phase 6: Deterministic Opportunity Scorer
- Implement composite impact/effort scoring formula.
- Build expiration engine and dynamic action type recommender (`community_reply`, `seo_blog`, `technical_seo_fix`).

### Phase 7: Goal-Driven Campaign Engine (Mode B Task DAG)
- Implement goal intent parser for founder commands (e.g., *"Prepare ShogunAI for Product Hunt launch next Friday"*).
- Build acyclic Task DAG generator and parallel execution dependency runner.

### Phase 8: Skill Execution Engine
- Implement 8 version-controlled `SKILL.md` specs (`skills/research.md`, `skills/opportunity.md`, `skills/content.md`, `skills/social.md`, `skills/community.md`, `skills/seo_geo.md`, `skills/coding.md`, `skills/review.md`).
- Implement `SkillRunner` with structured Zod schema output validation.

### Phase 9: Evidence Architecture & Inspector
- Build `EvidenceBundle` generator binding triggering signal, strategy context, SERP citations, and confidence scores.

### Phase 10: Approval System & Idempotency Lock
- Implement explicit state machine (`PENDING` $\rightarrow$ `APPROVED` / `EDITED` / `REJECTED` $\rightarrow$ `EXECUTING` $\rightarrow$ `EXECUTED`).
- Implement DB-level idempotency lock preventing duplicate external side-effects.

### Phase 11: Integration Boundary (Corsair Adapter)
- Implement `CorsairAdapter` and connectors for GitHub Octokit, Webflow CMS API, and Slack.
- Implement mock connectors for offline/uncredentialed testing.

### Phase 12: Opportunity-First UX & Dashboard
- Build Next.js Dashboard (`app/(dashboard)/page.tsx`):
  - **What Matters Now** (Top-scored opportunities)
  - **Active Campaigns** (Task DAG progress)
  - **Approvals Inbox Feed** (Action cards with Evidence Inspector & Edit-and-Approve modal)
  - **Company Brain Strategy Editor**
  - **Live Terminal Log View**

### Phase 13: Activity Persistence & Real-Time SSE Stream
- Implement `ActivityLog` DB writer and `/api/activity/sse` endpoint for live streaming.

### Phase 14: Learning Engine & E2E Demo Verification
- Log `user_edit_diff` records and decision choices to Layer C.
- Implement Vitest/Pytest suite for unit, integration, and E2E demo verification:
  - **Demo A (Event-Driven):** GitHub commit merge $\rightarrow$ Signal Gate $\rightarrow$ Research $\rightarrow$ Opportunity $\rightarrow$ Staged Cards $\rightarrow$ CMS publish + GitHub PR.
  - **Demo B (Goal-Driven):** Manual command *"Prepare ShogunAI for Product Hunt"* $\rightarrow$ Campaign Task DAG $\rightarrow$ Staged assets $\rightarrow$ Execution.

---

## Verification Plan

### Automated Tests
- Unit tests: Deduplication, Relevance Gate, Scorer Math, Task DAG, Approval Machine.
- Integration tests: SQLite + Drizzle, LLM Gateway, Skill Runner.
- E2E tests: Full execution of Demo A and Demo B.

### Manual Verification
- Launch local Next.js server (`npm run dev`).
- Verify Dashboard UI, Approvals Inbox, Evidence Modal, Company Brain Editor, and Live Terminal.
- Trigger test webhook payload for GitHub commit and test goal command.
```
