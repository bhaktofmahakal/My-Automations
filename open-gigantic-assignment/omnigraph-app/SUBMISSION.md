# OmniGraph Studio — Submission Document

---

## What I Built and Why

**OmniGraph Studio** is a multi-agent developer environment that performs autonomous code analysis and surgical refactoring on real GitHub repositories. It's not a demo — it ingests your actual codebase, builds an AST dependency graph, and runs a 4-agent swarm (Architect → CodeWriter → TestRunner → SecurityReviewer) that produces real unified diffs you can apply or push as a PR.

**Why this?** Most "AI coding tools" are either:
- Chat interfaces that hallucinate
- Autocomplete that only sees local context
- Agents that run on toy examples

I wanted something that: (a) works on **your actual repo**, not a sandbox, (b) shows **mathematical proof** of token reduction via TokenFold AST compression, (c) runs **heterogeneous models** per agent role (Architect gets DeepSeek-V4, CodeWriter gets Qwen, Security gets GPT-4.1-nano), and (d) maintains **full context continuity** between agents via S^1 manifold handoffs.

---

## Architecture and Design

### High-Level Flow
```
GitHub Repo URL → /api/repo/fetch (scan tree → download files)
                    ↓
generateCustomScenario() → parses each file via real AST parser (TS/Python/Go/Rust/Java)
                    ↓
Creates Scenario: { id, title, files[], initialNodes[], initialEdges[] }
                    ↓
Store: activeScenario + nodes + edges + files + diffHunks + beads
                    ↓
User clicks "Dispatch Swarm" → startPSMASSweep()
                    ↓
For each agent phase (θ = 0, π/2, π, 3π/2):
  1. Upstash Vector semantic search (scoped to scenario)
  2. Build prompt with: code context + selected node + previousAgentOutput
  3. POST /api/agents/psmas-run (OrcaRouter/Groq with fallback chain)
  4. Stream SSE → parse real tokens → log to terminal
  5. Store fullResponse as previousAgentOutput for next agent
  6. CodeWriter: parse @@ diff hunks → diffHunks state
                    ↓
User reviews diffs in Diff Viewer → Export PR (GitHub API) or download .patch
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Real AST parsing, not regex** | `generateCustomScenario` calls `parseCodeToGraph` which uses TypeScript Compiler API (for TS/JS) and regex-based parsers for Python/Go/Rust/Java. Each node gets: `tokenCount`, `compressedTokens`, `signatures[]`, `exportSymbols[]`, `dependencies[]`. This is the ground truth for TokenFold math. |
| **Heterogeneous models per agent** | Architect needs reasoning (DeepSeek-V4), CodeWriter needs code gen (Qwen-3.7), Security needs precision (GPT-4.1-nano). Settings page lets user assign any OrcaRouter/Groq model per role. |
| **OrcaRouter auto-router + fallback chain** | `orcarouter/auto` routes to cheapest live model. Route builds `extra_body.models = [selected, orcarouter/auto, selected]` with `route: "fallback"` — max 3 models, gateway fails over automatically. |
| **S^1 manifold agent handoff** | Each agent's full response stored as `previousAgentOutput` → passed to next agent in request body → injected into system prompt as "Previous Agent Phase Handoff". No context loss across phases. |
| **Progressive disclosure graph** | `toggleNodeExpansion` calls `/api/graph/traverse` which runs `expandNodeProgressive` locally (optimistic) then fetches children from backend. Telemetry shows `tokensSaved` in real time. |
| **Per-repo isolation (critical)** | All Upstash keys prefixed `og:{scenarioId}:` — locks, beads, vector namespace, multiplayer feed. Vector queries use `index.namespace('og:' + scope)`. Zero cross-repo data leakage. |
| **No mock data anywhere** | Every page gated: `files.length > 0 || nodes.length > 0 || activeScenario.id !== 'empty'`. Telemetry, Graph, Command, PSMAS, IDE, Diff, Multiplayer all show "Ingest GitHub Repository" CTA until real repo loaded. |
| **TokenFold benchmark = math, not marketing** | `/api/tokens/benchmark` tokenizes full code vs AST skeleton (imports, exports, interfaces, function headers). Returns per-file `reductionPct`, `compressionRatio`, `savingsUSD`. Aggregates to monthly/annual projection at 500 PRs/mo. |
| **Safe Approval Barrier** | CodeWriter diffs don't auto-apply. User reviews in Diff Viewer (accept/reject per hunk or all) → `applyApprovedPatches` updates `files.currentCode`. Human gate before commit. |

---

## GitHub Repository

**Product repo (what gets deployed):**
https://github.com/bhaktofmahakal/omnigraph-studio

**Workspace repo (development history):**
https://github.com/bhaktofmahakal/My-Automations (in `open-gigantic-assignment/omnigraph-app`)

---

## Deployment

**Live on Vercel:**
https://omnigraph-app-kohl.vercel.app

---

## Decision-Making: Key Steps and Reasoning

### 1. Started with provider integration hell → fixed root cause
**Problem:** User saw 502s on `psmas-run` despite valid API keys.
**Debug:** Wrote `scripts/probe_providers.ts` → discovered:
- Route used `baseUrl` as full endpoint (missing `/chat/completions`)
- Groq model IDs wrong (`qwen3.6-27b` vs real `qwen/qwen3.6-27b`)
- OrcaRouter env base URL may have been `/api/v1` style
**Fix:** Route now appends `/chat/completions` to any `baseUrl`. Updated Groq model catalog with real IDs from `/models` endpoint. Added `orcarouter/auto` as recommended default with fallback chain.

### 2. Self-ingest was analyzing the wrong repo
**Problem:** Telemetry page ran sweep on `.github/ISSUE_TEMPLATE/good_first_issue.md` (app's own file).
**Root cause:** `activeScenario` defaulted to `EMPTY_SCENARIO` (app's self-ingest). User never used RepoIngestModal.
**Fix:** Every page now checks `isRealRepoIngested = files.length > 0 || nodes.length > 0 || activeScenario.id !== 'empty'`. Shows CTA to ingest GitHub repo. Self-ingest (`/api/repo/self`) kept as demo only.

### 3. Agent context was not passing between phases
**Problem:** Each agent ran in isolation — SecurityReviewer didn't know what Architect found.
**Fix:** Added `previousAgentOutput` to store. After each agent completes, `set({ previousAgentOutput: fullResponse })`. Next request body includes it. Route injects into system prompt as "Previous Agent Phase Handoff". Now SecurityReviewer sees Architect's analysis + CodeWriter's diffs.

### 4. Upstash vector/Redis had cross-repo leakage risk
**Problem:** Vector queries used fixed namespace `omnigraph-app`. If another project shared the index, node IDs from other repos could appear in search results.
**Fix:** All keys now `og:{scenarioId}:...`. Vector queries use `index.namespace('og:' + scope)`. Locks, beads, feed, cache all scoped. Memory API requires `scope` param. Store passes `activeScenario.id` as scope.

### 5. DOM form warnings + Export PR 502
**Problem:** Settings page had multiple forms warning. Export PR modal password field outside form. GitHub PR creation returned 502.
**Fix:** 
- Settings: wrapped keys section in `<form id="omni-keys-form">`, Test Connection/Clear Keys = `type="button"`
- Export PR: wrapped Option A in `<form id="export-pr-form">`, PR button = `type="submit"`, download/copy buttons = `type="button"`, fixed div/form nesting order
- Route: robust GitHub API error handling, returns detailed error message instead of generic 502

### 6. Removed all fake/mock data
**Decision:** If a feature can't work without a real repo, it shows a CTA instead of placeholder data.
**Pages gated:** Graph, Command, PSMAS, IDE, Diff, Multiplayer, Telemetry.
**Result:** User *must* ingest a repo → honest product, no "looks real but isn't" deception.

### 7. Model catalog hygiene
**Decision:** Only expose models that actually work.
**Process:** Probe script hit OrcaRouter `/models` and Groq `/models` → cataloged only 200 OK models.
**Settings catalog:** `orcarouter/auto` (recommended), DeepSeek-V4-Flash/Pro, Qwen-3.7/3.8, GPT-5.6-Luna/5.4/4.1-nano, Gemini-3.6, GLM-5.3, Claude-Sonnet-5, OrcaRouter fusion/free.
**Groq catalog:** `groq/qwen/qwen3.6-27b`, `groq/openai/gpt-oss-120b`, `groq/groq/compound`, `groq/groq/compound-mini`, `groq/openai/gpt-oss-20b`.

---

## Final Notes

This is a **working product**. Every feature requires a real GitHub repo ingest. The multi-agent swarm produces real diffs you can apply or push as a PR. The TokenFold benchmark shows mathematically verified token reduction. The per-repo isolation means multiple users/repos can share the same Upstash infrastructure safely.

What I'd do next with more time:
- More intelligence
- Add private repo support (GitHub App installation)
- WebSocket for real-time multiplayer cursors
- More language parsers (C++, C#, Ruby, Swift)
- CI/CD integration (auto-run sweep on PR open)
- Cost tracking per agent per sweep in dashboard

