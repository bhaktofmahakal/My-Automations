# Open-Source AI Marketing Agents: Technical Investigation & Pattern Analysis for ShogunCMO

This report performs a deep, codebase-level inspection of 4 prominent open-source AI marketing projects to evaluate their architecture, reusable components, and technical flaws for **ShogunCMO**.

---

## Target Repositories Evaluated

1. **OpenCMO** (`Lling0000/OpenCMO`) — Apache 2.0
2. **AdClaw** (`citedy/adclaw`) — Apache 2.0 (based on CoPaw by AgentScope)
3. **Digital Marketing Pro** (`indranilbanerjee/digital-marketing-pro`) — MIT
4. **Orallexa Marketing Agent** (`alex-jb/orallexa-marketing-agent`) — MIT

---

## 1. Deep 25-Dimension Repository Teardown

### 1.1 OpenCMO (`Lling0000/OpenCMO`)
- **1. License:** Apache 2.0 (Safe for commercial adaptation).
- **2. Structure:** Monorepo with Python backend (`src/opencmo/`) and React SPA (`frontend/`).
- **3. Stack:** Python 3.10+, FastAPI, Crawl4AI, OpenAI Agents SDK, React, Tailwind, Vite, SQLite.
- **4. Agent Architecture:** 6-stage pipeline (Context Build $\rightarrow$ Signal Collect $\rightarrow$ Signal Normalize $\rightarrow$ Domain Review $\rightarrow$ Strategy Synthesis $\rightarrow$ Persist & Publish).
- **5. Agent Definitions:** 7 specialized agents: Product Analyst, SEO Strategist, Community Strategist, SEO Analyst, GEO Analyst, Community Analyst, Competitor Analyst.
- **6. Prompt/Skill Architecture:** Embedded Jinja2 templates for multi-round strategy debate and domain reviews.
- **7. Orchestration:** Linear 6-phase async execution pipeline managed by worker tasks.
- **8. Memory/Context Architecture:** Single SQLite database; stores project snapshots and versioned reports (Human Readout vs Agent Brief).
- **9. Tool Architecture:** Crawl4AI browser automation for scraping, Tavily for fallback web search.
- **10. MCP Usage:** Minimal/Stubbed (Planned MCP connectors for XiaoHongShu/WeChat).
- **11. Integration Architecture:** Native SMTP for reports, Crawl4AI for web, Tavily API.
- **12. Database Model:** SQLite tables: `projects`, `scans`, `reports`, `competitors`, `competitor_keywords`, `waitlist`.
- **13. UI Architecture:** Glassmorphic React SPA with `react-force-graph-2d` for interactive 3D Knowledge Graph visualization of competitor keywords.
- **14. Approval Workflow:** Staged approval queue for social drafts and reports.
- **15. Scheduling:** Async cron background worker (Daily/Weekly/Monthly rescan triggers).
- **16. Observability/Logging:** Basic Python `logging` module + stdout.
- **17. Evaluation:** 3-round AI debate protocol during context build to evaluate brand consensus.
- **18. Configuration:** Environment variables (`.env`) + web UI settings dialog stored in SQLite.
- **19. Deployment:** Dockerfile (multi-stage Node + Python runtime) & `docker-compose.yml`.
- **20. Multi-Tenancy:** Project-based isolation; single-user deployment by default.
- **21. Security:** Static analysis fixes, SQLite parameter sanitization, rate-limiting on waitlist endpoints.
- **22. Code Quality:** High; well-tested (`pytest`), clean async worker architecture.
- **23. Reusable Components:** 6-stage scan pipeline, 3D Knowledge Graph visualization (`react-force-graph-2d`), Crawl4AI integration wrappers.
- **24. Demo-Only Components:** Live demo fixtures (`Coze` and `DigiGrow` mock datasets).
- **25. Technical Weaknesses:** Concurrent Playwright scans can cause OOM errors; limited multi-tenant auth.

### 1.2 AdClaw (`citedy/adclaw`)
- **1. License:** Apache 2.0 (Derivative of AgentScope's CoPaw).
- **2. Structure:** Python package (`src/adclaw/`), Web console (`console/`), deployment configs (`deploy/`).
- **3. Stack:** Python 3.10+, FastAPI, AgentScope framework, React + Ant Design, SQLite + `sqlite-vec` + `FTS5`, Docker.
- **4. Agent Architecture:** Multi-agent team with `@tag` routing, persona templates (`SOUL.md`), and a Coordinator agent for task delegation.
- **5. Agent Definitions:** Unlimited personas (Researcher, Content Writer, SEO Specialist, Ads Manager, Social Media).
- **6. Prompt/Skill Architecture:** 122 built-in skills defined in YAML/Markdown with 208-pattern security scanning and auto-healing prompts.
- **7. Orchestration:** Coordinator delegation pipeline + DAG-based task execution via Clawsy integration.
- **8. Memory Architecture:** Dual Memory System: **ReMe** (per-agent file memory) + **AOM (Always-On Memory)** with vector search, hybrid Jaccard near-dedup, and 5-layer R1-R5 compression.
- **9. Tool Architecture:** 25 built-in MCP servers + 52 marketing tools via Citedy MCP server.
- **10. MCP Usage:** **Heavy & Masterful**. Uses Model Context Protocol for browser automation, disposable email inboxes, AI search, and media generation.
- **11. Integration Architecture:** Multi-channel messaging (Telegram, Discord, DingTalk, Feishu, QQ, Console) + `here.now` static publishing.
- **12. Database Model:** SQLite with `sqlite-vec` extension for vector embeddings + FTS5 full-text search.
- **13. UI Architecture:** Ant Design React console featuring per-persona chat tabs, skill hubs, and memory stats.
- **14. Approval Workflow:** Multi-channel bot interaction (@tag commands in Telegram/Discord) + web UI approval queue.
- **15. Scheduling:** Built-in cron scheduler per persona agent.
- **16. Observability/Logging:** Detailed log streams, security audit scores (0-100), and R1-R5 memory compression metrics.
- **17. Evaluation:** `SkillValidator` for analysis-first LLM security audits and memory contradiction detection.
- **18. Configuration:** `.env` + `settings.json` + BYOK provider keys (14 LLM providers supported).
- **19. Deployment:** 1-click Docker installs for DigitalOcean & Railway (`curl -fsSL https://get.adclaw.app | bash`).
- **20. Multi-Tenancy:** Multi-persona isolation per workspace; single-owner server model.
- **21. Security:** 208-pattern static skill scanner, 33-pattern memory threat sanitizer, AES-256-GCM secret encryption.
- **22. Code Quality:** Exceptional production quality; test-driven (`test_memory_live.py`).
- **23. Reusable Components:** **Always-On Memory (AOM) architecture**, R1-R5 memory compression pipeline, prompt caching builder, 25 MCP server configs.
- **24. Demo-Only Components:** Clawsy karma points network.
- **25. Technical Weaknesses:** Heavy reliance on Citedy paid credits for certain built-in skills; complex multi-agent overhead.

### 1.3 Digital Marketing Pro (`indranilbanerjee/digital-marketing-pro`)
- **1. License:** MIT (Fully open and commercially unrestricted).
- **2. Structure:** Pure Markdown/Python CLI plugin (`skills/`, `agents/`, `commands/`, `scripts/`).
- **3. Stack:** Python 3.10+, Markdown SKILL.md specs, Claude Code / Cursor / Copilot CLI plugin architecture.
- **4. Agent Architecture:** 24 specialist role definitions configured via Markdown system prompts.
- **5. Agent Definitions:** SEO Analyst, Content Strategist, Timing Ladder Specialist, Positioning Coach, CRO Auditor, etc.
- **6. Prompt/Skill Architecture:** 163 modular Markdown skills using standardized frontmatter and execution gates.
- **7. Orchestration:** Command-driven slash execution (`/seo-audit`, `/video-packaging`) executed inside the user's IDE/CLI agent.
- **8. Memory Architecture:** File-based context store (`profile.json`, `brand-context.md`).
- **9. Tool Architecture:** Python helper scripts (`scripts/`) wrapped by CLI commands.
- **10. MCP Usage:** Native integration with user's local `.mcp.json` connectors (Slack, Notion, GitHub MCP).
- **11. Integration Architecture:** Leverages external host CLI (Claude Code/Cursor) integrations.
- **12. Database Model:** No heavy DB; pure JSON/Markdown file state.
- **13. UI Architecture:** Terminal / CLI Markdown outputs; no web GUI.
- **14. Approval Workflow:** CLI prompt confirmations (`disable-model-invocation: false`).
- **15. Scheduling:** Manual invocation via CLI commands.
- **16. Observability/Logging:** Test suite (`pytest`) verifying doc-to-argparse contract compliance (`check_skill_contracts.py`).
- **17. Evaluation:** Self-aging release gates and statistical sample-size calculators for A/B tests.
- **18. Configuration:** `profile.json` workspace config.
- **19. Deployment:** Installed as a local plugin (`.claude-plugin`, `.cursor-plugin`).
- **20. Multi-Tenancy:** Single local workspace.
- **21. Security:** Input sanitization in Python scripts; no server-side attack surface.
- **22. Code Quality:** Extremely high Markdown & Python standards; 280+ passing unit tests.
- **23. Reusable Components:** 163 high-signal GTM skill prompts, timing ladder algorithms, content repurposing filters.
- **24. Demo-Only Components:** None.
- **25. Technical Weaknesses:** No standalone web UI; requires a developer CLI environment to run.

### 1.4 Orallexa Marketing Agent (`alex-jb/orallexa-marketing-agent`)
- **1. License:** MIT.
- **2. Structure:** Python package (`orallexa/`) with CLI entry point.
- **3. Stack:** Python, OpenAI API, Click CLI, Markdown parsing.
- **4. Agent Architecture:** Single-agent script executing sequential channel formatting.
- **5. Agent Definitions:** Content Generator agent.
- **6. Prompt/Skill Architecture:** System prompts for X, Reddit, LinkedIn, and Hacker News formatting.
- **7. Orchestration:** Procedural Python function calls.
- **8. Memory Architecture:** None (Stateless per CLI run).
- **9. Tool Architecture:** Web scraping via `requests` + BeautifulSoup.
- **10. MCP Usage:** None.
- **11. Integration Architecture:** CLI output to local Markdown files.
- **12. Database Model:** None.
- **13. UI Architecture:** Terminal CLI.
- **14. Approval Workflow:** User manually reviews output Markdown files.
- **15. Scheduling:** None.
- **16. Observability/Logging:** Basic print statements.
- **17. Evaluation:** None.
- **18. Configuration:** CLI arguments.
- **19. Deployment:** `pip install orallexa`.
- **20. Multi-Tenancy:** None.
- **21. Security:** Basic.
- **22. Code Quality:** Minimal prototype script.
- **23. Reusable Components:** Channel-specific prompt templates for Show HN and Reddit.
- **24. Demo-Only Components:** Basic scraper.
- **25. Technical Weaknesses:** Lacks persistence, multi-agent coordination, and UI.

---

## 2. Classification of Reusable Components for ShogunCMO

| Component | Source Repo | Classification | Implementation / Adaptation Note for ShogunCMO |
| :--- | :--- | :--- | :--- |
| **Always-On Memory (AOM)** | `citedy/adclaw` | **ADAPT** | Adapt the dual-layer memory pattern (SQLite + `sqlite-vec` + FTS5) for ShogunCMO's persistent memory store. |
| **R1-R5 Memory Optimization** | `citedy/adclaw` | **REUSE DIRECTLY** | Reuse the deterministic pre-compression rules (lossless N-gram cleanup) to compress prompt context before LLM calls. |
| **6-Stage Growth Pipeline** | `Lling0000/OpenCMO` | **ADAPT** | Adapt the 6-phase scan architecture (Context Build $\rightarrow$ Collect $\rightarrow$ Normalize $\rightarrow$ Review $\rightarrow$ Synthesize $\rightarrow$ Persist) for ShogunCMO's signal processing. |
| **3D Knowledge Graph UI** | `Lling0000/OpenCMO` | **REFERENCE ONLY** | Reference the `react-force-graph-2d` implementation for visualizing competitor keyword overlaps in ShogunCMO's UI. |
| **25 MCP Server Configs** | `citedy/adclaw` | **ADAPT** | Adapt the MCP client registration logic for integrating browser, search, and social tools in ShogunCMO. |
| **163 GTM Skill Prompts** | `digital-marketing-pro` | **REUSE DIRECTLY** | Directly ingest and adapt the high-signal Markdown skills for SEO, video packaging, and positioning. |
| **Channel Copy Templates** | `orallexa-marketing-agent` | **REFERENCE ONLY** | Reference the concise Show HN and Reddit formatting prompts. |
| **Clawsy Task Network** | `citedy/adclaw` | **DO NOT USE** | Over-engineered karma network; unnecessary for ShogunCMO's internal and B2B core. |

---

## 3. Synthesis & Architectural Takeaways for ShogunCMO

### A. Best Architecture Ideas from Each Repo
1. **From AdClaw:** The **Always-On Memory (AOM)** architecture using SQLite + `sqlite-vec` + FTS5 combined with **R1-R5 deterministic compression**, which cuts LLM token overhead by 15-20% before prompt assembly.
2. **From OpenCMO:** The **6-Stage Execution Pipeline** (Context Build $\rightarrow$ Signal Collect $\rightarrow$ Normalize $\rightarrow$ Domain Review $\rightarrow$ Strategy Synthesis $\rightarrow$ Persist), ensuring multi-agent consensus rather than single-prompt halluncinations.
3. **From Digital Marketing Pro:** The **Skill-as-File pattern**—defining GTM capabilities as modular, version-controlled Markdown files (`SKILL.md`) with explicit execution gates and contract testing.

### B. Best Reusable Implementation Patterns
- **Prompt Caching Builder:** Separating static brand identity (`SOUL.md`/`brand-context.json`) from dynamic per-turn context to maximize LLM prompt cache hits.
- **Analysis-First Security Verification:** Running 200+ pattern static scans on incoming skills and user input to prevent prompt injection and credential leakage.
- **Dual-Output Reporting:** Generating every strategy analysis in two formats simultaneously—a **Human Readout** (rendered in the UI) and an **Agent Brief** (stored in memory for downstream LLM execution).

### C. What NOT to Copy
- **Do NOT copy bloated multi-agent frameworks** that spawn 10+ independent Python processes for simple tasks, causing severe memory overhead and OOM crashes.
- **Do NOT copy complex token/karma gamification networks** (like Clawsy).
- **Do NOT copy hardcoded Chinese social media platform integrations** (V2EX, Bilibili, Weibo) unless specifically targeting those markets.

### D. Recommended ShogunCMO Architecture

```mermaid
graph TD
    subgraph Frontend Layer (Next.js 14+ / React)
        DashboardUI["Dashboard (Terminal / Agents Feed / Strategy)"]
        GraphViz["Knowledge Graph Component (react-force-graph-2d)"]
    end

    subgraph Memory & State Layer (Adapted from AdClaw AOM)
        AOM["Always-On Memory Engine<br/>(SQLite + sqlite-vec + FTS5)"]
        Compressor["R1-R5 Deterministic Context Compressor"]
    end

    subgraph Multi-Agent Pipeline (Adapted from OpenCMO 6-Stage Loop)
        Orchestrator["Orchestrator Agent"]
        Stage1["1. Signal Ingestion (GitHub / Tavily)"]
        Stage2["2. Signal Normalization"]
        Stage3["3. Strategy Synthesis"]
        Stage4["4. Action Card Generation"]
    end

    subgraph Integration & Skill Layer (Adapted from Digital Marketing Pro & Corsair)
        SkillsRepo["163 GTM Skills (.md Specs)"]
        CorsairSDK["Corsair Integration Layer (GitHub/Slack/Notion)"]
    end

    DashboardUI --> Orchestrator
    Orchestrator <--> Compressor <--> AOM
    Orchestrator --> Stage1 --> Stage2 --> Stage3 --> Stage4
    Stage3 <--> SkillsRepo
    Stage4 --> CorsairSDK
```

### E. Licensing & Commercialization Concerns
- **OpenCMO & AdClaw:** Both licensed under **Apache 2.0**. We can freely adapt their architecture, memory pipeline, and UI patterns for both internal ShogunAI use and future commercial SaaS products, provided we maintain proper attribution notices for derived code.
- **Digital Marketing Pro & Orallexa:** Licensed under **MIT**. Fully open with zero commercial restrictions. We can directly ingest their prompt skills into ShogunCMO's skill registry.
