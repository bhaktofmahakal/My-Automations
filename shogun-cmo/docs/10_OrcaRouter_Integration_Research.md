# OrcaRouter API Investigation & Model Routing Strategy for ShogunCMO

This report evaluates **OrcaRouter** (https://www.orcarouter.ai/) as the primary LLM Gateway & Meta-Router for **ShogunCMO**, detailing its technical capabilities, model catalog, and an optimal cost-efficient routing strategy.

---

## 1. Technical Capabilities Verification

| Dimension | Verification & Implementation Status | Evidence / Official Doc Reference |
| :--- | :--- | :--- |
| **API Compatibility** | **100% OpenAI Chat Completions API compatible**. Drop-in replacement for OpenAI SDKs, LangChain, Vercel AI SDK, and Cursor. | https://github.com/Continuum-AI-Corp/OrcaRouter-Lite |
| **Endpoints** | - `POST /v1/chat/completions` (Chat completions proxy)<br/>- `GET /v1/models` (Discoverable 100+ model catalog)<br/>- `GET /v1/analytics/*` (Spend, latency, savings, recent runs)<br/>- `GET/PUT /v1/routing` (Strategy configuration) | https://www.promptfoo.dev/docs/providers/orcarouter/ |
| **Chat/Completions Support** | Full multi-turn chat support (`system`, `user`, `assistant` messages). Accepts standard OpenAI request payloads. | https://mastra.ai/models/providers/orcarouter |
| **Tool / Function Calling** | **Supported**. Payload accepts standard `tools` array. When `model="auto"` is set, OrcaRouter filters for models with `supports_tools: true`. | OrcaRouter Lite Catalog Schema |
| **Structured JSON Output** | **Supported**. Payload accepts `response_format: { type: "json_object" }`. `model="auto"` filters for `supports_json_mode: true`. | OrcaRouter Lite Catalog Schema |
| **Streaming** | **Supported**. OpenAI-compatible Server-Sent Events (SSE) format using `data: ... \n\n` framing and `[DONE]` terminal sentinel. | OrcaRouter SSE Specification |
| **Model Routing Strategies** | Configurable via `GET/PUT /v1/routing`: `cheapest`, `fastest`, `quality`, `balanced`. Setting `model="auto"` routes prompts dynamically to the cheapest model meeting required capabilities. | https://www.orcarouter.ai/ |
| **Cross-Provider Prompt Cache**| Deterministic requests (`temperature=0` or pinned `seed`) return `x-orca-cache: HIT` instantly at **$0 cost** across all providers. | OrcaRouter Architecture Docs |
| **Free Models** | Routes to free-tier models (e.g., `google/gemini-1.5-flash`, `meta-llama/llama-3.1-8b-instruct`, `deepseek/deepseek-chat`). | OrcaRouter Model Catalog |
| **Cheapest Capable Models** | `gemini-1.5-flash` (~$0.075/1M), `gpt-4o-mini` ($0.15/1M), `deepseek-v3` ($0.14/1M), `qwen-2.5-72b` ($0.30/1M). | OrcaRouter Pricing Database |
| **Reasoning-Capable Models** | `deepseek-r1` (~$0.55/1M), `o3-mini`, `o1-preview`, `claude-3-7-sonnet-thinking`. | OrcaRouter Catalog |
| **Tool-Capable Models** | `gpt-4o-mini`, `gpt-4o`, `claude-3-5-sonnet`, `gemini-1.5-pro`, `qwen-2.5-72b-instruct`. | OrcaRouter Capability Flags |
| **Context Limits** | 128K (GPT-4o-mini), 200K (Claude 3.5 Sonnet / DeepSeek-R1), 1M–2M (Gemini 1.5 Pro). | Provider Specs via OrcaRouter |
| **Embeddings Availability** | In roadmap (`Embeddings + image-gen proxy`). For prototype, use direct Supabase `pgvector` / Cohere / OpenAI embeddings. | OrcaRouter Roadmap |
| **Authentication** | Bearer Token header: `Authorization: Bearer sk-orca-*`. | OrcaRouter Middleware |
| **SDK Options** | Standard `openai` npm package or Python SDK by overriding `baseURL: "https://api.orcarouter.ai/v1"` (or self-hosted endpoint) and setting `apiKey`. | OrcaRouter Integrations Guide |
| **Usage & Analytics** | Real-time endpoints: `GET /v1/analytics/spend`, `/analytics/savings`, `/analytics/latency`. Header `x-orca-resolved-model` exposes resolved model ID. | OrcaRouter Analytics Endpoint |
| **Rate Limits** | OrcaRouter manages rate-limiting, retries, and fallback to secondary providers automatically per key/tenant. | OrcaRouter Core Engine |

---

## 2. Task-to-Model Mapping Matrix for ShogunCMO

To maximize quality while preserving wallet balance ($0.94 wallet + $25 promo credit + Groq free API), ShogunCMO should assign specific models to specific task tiers:

| Task Type | Core Function | Target Model Choice | Secondary / Fallback Model | Rationale & Cost Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Classification** | Intent detection, task tagging, card categorization | `model="auto"` (Strategy: `cheapest`) $\rightarrow$ **Gemini 1.5 Flash** | `llama-3.1-8b-instant` (via Groq API) | High-speed, near-zero cost ($0.075 / 1M tokens). |
| **Extraction** | Scraping HTML, parsing PRDs & commit diffs into JSON | **GPT-4o-mini** (with `json_object` format) | **Gemini 1.5 Flash** | Flawless JSON structure compliance at $0.15 / 1M tokens. |
| **Research** | SERP analysis, competitor profiling, market signal synthesis | **Llama-3.3-70b-versatile** (via Groq API) | **DeepSeek-V3** (via Orca) | Groq provides instant 300+ tok/s processing for long research context. |
| **Planning & Strategy** | Campaign decomposition, multi-agent goal planning | **DeepSeek-R1** (Reasoning model via Orca) | **o3-mini** | Deep reasoning capability at 1/10th the cost of OpenAI o1. |
| **Content Writing** | Blog articles, X threads, LinkedIn posts, Reddit replies | **Claude 3.5 Sonnet** (for flagship posts) / **DeepSeek-V3** (for routine social) | **GPT-4o** | Claude 3.5 Sonnet delivers unmatched founder voice quality. |
| **Final Review** | Pre-publication verification, safety & link check | **GPT-4o-mini** | **Gemini 1.5 Flash** | Fast, cheap validation pass ($0.01 per check). |

---

## 3. Recommended Cost-Efficient Routing Architecture

```mermaid
graph TD
    subgraph ShogunCMO Agent Engine
        Task[Incoming Agent Task] --> Classifier{Task Classifier}
    end

    subgraph OrcaRouter API Gateway (baseURL: api.orcarouter.ai/v1)
        Classifier -->|1. Routine Classification / Extraction| AutoCheapest["model='auto' (strategy='cheapest')<br/>-> Gemini 1.5 Flash / GPT-4o-mini"]
        Classifier -->|2. Heavy Research & Summarization| DirectGroq["Groq API (Free Tier)<br/>-> Llama-3.3-70b (300 tok/s)"]
        Classifier -->|3. Strategic Planning & Reasoning| OrcaReasoning["model='orcarouter/deepseek/deepseek-r1'<br/>-> DeepSeek-R1 Reasoning"]
        Classifier -->|4. High-Value Creative Writing| OrcaWriter["model='orcarouter/anthropic/claude-3-5-sonnet'<br/>-> Claude 3.5 Sonnet"]
    end

    subgraph Optimization Layer
        CacheCheck["Deterministic Prompt Cache<br/>(temperature=0 -> x-orca-cache: HIT)"]
        CostLogger["Analytics Monitor<br/>(GET /v1/analytics/savings)"]
    end

    AutoCheapest & DirectGroq & OrcaReasoning & OrcaWriter --> CacheCheck
    CacheCheck --> CostLogger
```

### Key Implementation Guidelines for Maximum Cost Savings

1. **Leverage Deterministic Prompt Caching (`temperature=0`):**
   - For static extractions, JSON-LD schema generation, and technical checks, set `temperature: 0`.
   - OrcaRouter serves repeat requests from its cross-provider prompt cache (`x-orca-cache: HIT`), resulting in **0ms latency and $0.00 cost**.
2. **Use `model="auto"` for Utility Tasks:**
   - Instead of hardcoding model names for simple tasks, pass `model: "auto"` with required flags (`supports_json_mode: true`). OrcaRouter automatically resolves the lowest-cost model available.
3. **Offload High-Volume Research to Groq:**
   - Use the separate Groq API key directly for high-volume SERP parsing and commit diff processing (`llama-3.3-70b-versatile`), preserving OrcaRouter credits for reasoning (`DeepSeek-R1`) and writing (`Claude 3.5 Sonnet`).
4. **Monitor Real-Time Savings Header:**
   - Read the `x-orca-resolved-model` response header in ShogunCMO to log exact model usage and display cost savings in the internal admin UI.
