# OmniGraph Studio

**Real-time multi-agent developer environment** — ingest any GitHub repository, analyze it with a real multi-language AST parser, run a 4-agent PSMAS swarm against live LLM providers, review surgical diffs behind a Safe Approval Barrier, and export them as a `.patch` bundle or a real GitHub Pull Request.

Built for **Open Gigantic (Superbrain)**. Next.js 16, React 19, Turbopack.

---

## Core Capabilities

| Capability | How it works |
|---|---|
| **Repo Ingestion** | Scan any public GitHub repo via the GitHub API (`/api/repo/fetch`), or self-ingest the app's own source tree (`/api/repo/self`) — no hardcoded sample codebases. |
| **Real AST Parsing** | `src/lib/graph/ogParser.ts` parses TypeScript, JavaScript, Python, Go, Rust, Java, C/C++ into module → file → function graphs with signature-based progressive disclosure. |
| **Live AI Swarm (PSMAS)** | 4 specialized agents — Architect (θ=0), CodeWriter (θ=π/2), TestRunner (θ=π), Security (θ=3π/2) — rotate attention along a circular manifold and stream **real** LLM responses from OrcaRouter or Groq (`/api/agents/psmas-run`). No simulated output: no key → honest 400. |
| **TokenFold Compression** | AST-signature skeletonization compresses raw source before it hits the LLM context; token metrics and cost are measured live per run (`/api/tokens/benchmark`). |
| **Surgical Diff Engine** | Unified-diff parsing, hunk-level acceptance, SHA-256 patch hashing, and exact code reconstitution (`src/lib/diff/patchEngine.ts`). |
| **Safe Approval Barrier** | Human gatekeeper modal — no patch is applied until every hunk is explicitly approved. |
| **GitHub PR Export** | With a token (`repo` scope), creates a branch + commits + PR against the target repo and returns the PR URL. Without one, downloads a `git apply`-ready `.patch` file (`/api/repo/export-pr`). |
| **Distributed Memory** | Upstash Redis + Vector layer: node locks, Beads task-DAG persistence, team broadcast events, and semantic AST node search (`/api/memory`). Falls back to in-memory when unconfigured. |
| **Honest Telemetry** | Every dashboard number is derived from real run data — zero-filled until a live run produces measurements. No fake traces, no canned benchmarks. |

## Agent Swarm (PSMAS)

```
User prompt → /api/agents/psmas-run → PSMAS attention rotation (S¹ manifold)
  1. Architect     θ = 0     deepseek/deepseek-v4-flash   (DAG planning)
  2. CodeWriter    θ = π/2   qwen/qwen3.7-flash          (surgical diff synthesis)
  3. TestRunner    θ = π     deepseek/deepseek-v4-flash   (invariant verification)
  4. Security      θ = 3π/2  openai/gpt-4.1-nano         (vulnerability audit)
                              ↓
        SSE stream → Monaco diff view → Safe Approval Barrier → export
```

Model defaults and full model catalogs are configurable in **Settings** (OrcaRouter + Groq gateways, BYOK supported).

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  UI (Next.js App Router)                                    │
│  /graph /diff /ide /psmas /settings /telemetry /multiplayer │
└──────────────┬──────────────────────────────────────────────┘
               │ fetch / SSE
┌──────────────▼──────────────────────────────────────────────┐
│  Edge / Node API Routes                                     │
│  /api/repo/{fetch,self,export-pr}   GitHub ingestion + PR    │
│  /api/graph/traverse                stateless DAG expansion  │
│  /api/agents/psmas-run              live LLM swarm gateway   │
│  /api/tokens/benchmark              TokenFold measurement    │
│  /api/memory                        Upstash Redis + Vector   │
└──────────────┬──────────────────────────────────────────────┘
               │
   ┌───────────┼───────────────┐
   ▼           ▼               ▼
 GitHub API  OrcaRouter/Groq  Upstash Redis + Vector
 (public     (OpenAI-         (locks, beads DAG, events,
  repos)      compatible)      vector search)
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment Variables (all optional)

| Variable | Purpose |
|---|---|
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Distributed lock / beads / event persistence. Without them the app uses an in-memory fallback. |
| `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN` | Semantic AST node search. |
| `ORCAROUTER_API_KEY` | Live PSMAS runs through the OrcaRouter gateway (default base URL `https://api.orcarouter.ai/v1`). |
| `GROQ_API_KEY` | Live PSMAS runs through Groq LPU. |

Provider keys can also be entered per-session in the **Settings** page (stored in `localStorage`).

## Scripts

```bash
npm run lint          # ESLint
npm run build         # Production build
npx tsx scripts/test_core_engines.ts    # 33 deep-engine tests (AST/patch/TokenFold/beads DAG, offline)
npx tsx scripts/test_local_e2e.ts       # 43 endpoint tests against a running dev server
npx tsx scripts/test_live_prod_endpoints.ts  # Smoke suite against the deployed URL
```

## Deployment

Deploys as a standard Vercel Next.js project (Node.js runtime for API routes):

```bash
npx vercel --prod --yes
```