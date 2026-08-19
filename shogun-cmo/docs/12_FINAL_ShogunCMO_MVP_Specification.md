# ShogunCMO — Final Frozen MVP Specification

> **THIS MVP SPECIFICATION IS FROZEN. NO SCOPE CREEP IS PERMITTED BEYOND THIS SPEC.**

---

## 1. One-Sentence Product Definition
**ShogunCMO** is a continuous, memory-first AI growth engine for technical startups that converts real-time codebase commits, internal specs, and market signals into high-converting GTM campaigns across community, SEO, social, and developer launch channels.

---

## 2. Primary User
**The Technical Founder / Core Engineering Lead at ShogunAI** (specifically Toru Tano and early startup teams) who ships code quickly but lacks dedicated marketing bandwidth.

---

## 3. Primary Problem
Technical founders lose distribution momentum because traditional AI writers have "amnesia" (only reading static landing pages), creating generic marketing fluff that requires heavy manual editing and causes context drift as new features ship.

---

## 4. Primary Workflow
```text
1. Founder merges a PR on GitHub (e.g. "feat: instant local vector indexing").
2. ShogunCMO ingests the commit diff & spec into its persistent Memory Store.
3. Market Research Agent scans Reddit/SERPs via Tavily/Firecrawl for matching developer questions.
4. Orchestrator generates 3 actionable cards in the Agents Feed:
   - Community Card: Technical Reddit reply ("Copy to Clipboard").
   - Content Card: SEO Blog post ("Publish to CMS").
   - Coding Card: GitHub PR updating llms.txt & schema.
5. Founder clicks "Publish to CMS" or "Copy to Clipboard" in under 10 seconds.
```

---

## 5. MVP Capabilities
- **Continuous Memory Store:** SQLite + `sqlite-vec` + FTS5 vector store ingesting GitHub commits, READMEs, and `brand-context.json`.
- **High-Magic Domain Onboarding:** Auto-crawls initial URL to build `product-information.md` and `brand-voice.md`.
- **Tinder-Style Agents Feed UI:** Staged card queue with 1-click action buttons (`Publish`, `Copy to Clipboard`, `Archive`).
- **Live Terminal View:** Real-time log stream showing active agent background jobs (`x-orca-resolved-model`, scrapers, PR generation).
- **GitHub PR Generation (Coding Agent):** Pushes branches and opens PRs for `llms.txt` and JSON-LD schema updates.
- **CMS Auto-Publishing (Writer Agent):** 1-click publishing of blog drafts to Webflow/WordPress via REST API.
- **Ban-Safe Community Staging (Community Agent):** Formats Reddit/HN replies with 1-click copy buttons and direct thread links.

---

## 6. Explicit Non-MVP Capabilities (Excluded from MVP)
- ❌ **No Automated Forum Posting:** Reddit/HN will *never* auto-post via API to avoid account bans.
- ❌ **No Paid Ad Campaign Management:** Excludes Google/Meta ad spend management.
- ❌ **No UGC Video Generation Pipeline:** Excludes rendering MP4 video clips.
- ❌ **No Influencer Creator Outreach:** Excludes creator payment flows.
- ❌ **No Complex RBAC Multi-Tenancy:** Single-workspace deployment for MVP prototype.

---

## 7. P0 Features (Must Have for MVP Demo)

| Feature Name | Why It Exists | User Value | Dependency | Complexity | Priority | Required for Demo? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **GitHub Commit Signal Listener** | Detects code releases in real-time | Eliminates manual context setting | GitHub API | Medium | P0 | **YES** |
| **Memory Node Storage (AOM)** | Stores codebase diffs & strategy docs | Eliminates AI amnesia & context drift | SQLite / `sqlite-vec` | Medium | P0 | **YES** |
| **Tavily/Firecrawl Market Search** | Finds active discussions on Reddit/SERP | Discovers real audience demand | Tavily/Firecrawl APIs | Low | P0 | **YES** |
| **Agents Feed Inbox Zero UI** | Stages actionable cards for 1-click review | Reduces review time to <10 seconds | Next.js / Tailwind | Medium | P0 | **YES** |
| **AI CMO Live Terminal** | Shows live activity logs & resolved LLMs | Builds trust by showing background work | SSE / WebSockets | Low | P0 | **YES** |
| **Blog Writer & CMS Publisher** | Drafts SEO blogs & publishes to CMS | Instant distribution without writing | OrcaRouter / Webflow API | Medium | P0 | **YES** |
| **GitHub PR Coding Agent** | Creates `llms.txt` & schema PRs | Automates technical SEO fixes | GitHub API / Octokit | Medium | P0 | **YES** |
| **Ban-Safe Community Stager** | Drafts technical Reddit/HN replies | Generates authentic community leads | Tavily / Groq API | Low | P0 | **YES** |

---

## 8. P1 Features (Fast Follow V1.1)
- **Slack Notification Bot:** Push daily digest & interactive approval buttons directly to `#marketing-cmo`.
- **Implicit Voice Feedback Logger:** Diff-logging user edits on draft cards to refine `brand-voice.md` automatically.
- **GEO AI Citation Tracker:** Auditing brand visibility in ChatGPT/Perplexity.

---

## 9. Deferred Features (Phase 2 & Commercial SaaS Scope)
- Multi-tenant team roles & RBAC permissions.
- Native Stripe billing & credit usage tracker.
- Full UGC video shorts rendering pipeline.
- End-to-end Creator / Influencer marketplace.

---

## 10. Demo Scenario for Toru (The 3-Minute Proof)
1. **Trigger:** Toru merges a PR in ShogunAI's GitHub repo: `"feat: added instant local vector search indexer"`.
2. **Terminal Ingestion:** Open ShogunCMO Terminal. Show live SSE logs: `Ingesting commit 4f2a9 ... Updating Memory ... Triggering Research Agent`.
3. **Signal Discovery:** Research Agent queries Tavily/Firecrawl, finding an r/Localllama thread posted 15 minutes ago: *"How do you index local memory for AI desktop agents?"*
4. **Feed Staging:** Agents Feed populates with 3 cards:
   - **Card 1 (Community):** Authentic Reddit reply mentioning ShogunAI's vector indexing (`Copy to Clipboard`).
   - **Card 2 (Content):** SEO Blog Post ("Why Local Vector Indexing Matters for Desktop AI") (`Publish to CMS`).
   - **Card 3 (Coding):** GitHub PR updating `llms.txt` with the new API endpoint (`View PR on GitHub`).
5. **Execution:** Click "Publish to CMS" $\rightarrow$ Article renders live on the blog. Click "View PR on GitHub" $\rightarrow$ Clean, open PR shown on GitHub.

---

## 11. User Journey
`Domain Onboarding` $\rightarrow$ `Strategy Docs Auto-Generated` $\rightarrow$ `GitHub Repo Linked` $\rightarrow$ `Code Commit Merged` $\rightarrow$ `Background Signal Discovery` $\rightarrow$ `Agents Feed Notification` $\rightarrow$ `1-Click Approval/Publish` $\rightarrow$ `Live Organic Distribution`.

---

## 12. Core Entities
- **Workspace:** Project configuration & brand credentials.
- **MemoryNode:** Vector & text embeddings of commits, PRDs, and diffs.
- **MarketingSignal:** Trigger event (Commit, SERP rank drop, Reddit thread).
- **ActionCard:** Staged feed item awaiting founder approval.
- **TerminalLog:** Timestamped activity log.

---

## 13. Core Agents
- **CMO Orchestrator Agent:** Oversees campaign strategy and task decomposition.
- **Research & Signal Agent:** Powered by Tavily, Firecrawl, and Tinyfish.
- **Content & Copywriter Agent:** Powered by OrcaRouter (`Claude 3.5 Sonnet` / `GPT-4o-mini`).
- **Growth Engineering Agent:** Powered by GitHub API / Octokit for PR generation.

---

## 14. Required Integrations
- **GitHub:** Ingest commits, read specs, open PRs.
- **Corsair SDK:** Integration bridge for GitHub, Slack, Notion.
- **Webflow / WordPress:** CMS blog publishing via REST API.

---

## 15. Mock Integrations (For MVP Demo)
- **LinkedIn & X (Twitter):** Staged in feed cards with "Copy to Clipboard" / simulated "Post" action to avoid API verification delays.
- **Google Search Console / GA4:** Seeded with sample analytics data for the prototype UI.

---

## 16. Required External APIs
- **OrcaRouter API:** LLM Gateway (`model="auto"`, `Claude 3.5 Sonnet`, `DeepSeek-R1`, `GPT-4o-mini`).
- **Groq API:** Fast Llama-3.3-70b inference for bulk SERP & commit diff parsing.
- **Tavily API:** Real-time web & SERP search.
- **Firecrawl API:** Deep web page markdown scraping.

---

## 17. Optional APIs
- **Tinyfish CLI / API:** Headless browser automation fallback.

---

## 18. What Can Run Fully Locally
- Next.js Web Dashboard & API Routes.
- SQLite + `sqlite-vec` + FTS5 Memory Database.
- Corsair SDK runtime engine.
- R1-R5 Deterministic Context Compressor.

---

## 19. What Requires Network Access
- OrcaRouter & Groq API LLM inference calls.
- Tavily & Firecrawl web search requests.
- GitHub API commit reading & Pull Request creation.
- Webflow/WordPress CMS publishing endpoints.

---

## The Smallest Version That Beats Okara

> **Answer:**
> The smallest version that convincingly beats Okara requires exactly **ONE continuous loop**:
> 1. Ingest **ONE real GitHub commit diff** (Code signal) into persistent memory.
> 2. Find **ONE live Reddit thread** discussing that topic via Tavily/Firecrawl.
> 3. Generate **THREE staged action cards** (Reddit Reply, Blog Post, GitHub PR for `llms.txt`).
> 4. Execute **ONE 1-click publish action** to CMS and **ONE open PR on GitHub**.
>
> **Why this beats Okara:** Okara requires manual data entry or static 24-hour website rescans. ShogunCMO proves that **shipping code automatically triggers distribution**, eliminating context drift entirely.

---

### MVP SCOPE IS NOW FROZEN. NO FURTHER EXPANSION PERMITTED.
