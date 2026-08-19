# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: Small focused team

This is a single self-contained project; build an internal AI marketing engine ("ShogunCMO") for ShogunAI based on the master specifications created from our deep research.

Working directory: ~/teamwork_projects/shogun_cmo
Integrity mode: benchmark

## Master Documentation References
All developers and agents MUST strictly follow the specifications defined in:
1. [01_PRD_ShogunCMO.md](file:///C:/Users/movie/.gemini/antigravity/brain/7cc6c0d6-4987-4a01-a273-8d83e876d53c/01_PRD_ShogunCMO.md)
2. [02_Architecture_ShogunCMO.md](file:///C:/Users/movie/.gemini/antigravity/brain/7cc6c0d6-4987-4a01-a273-8d83e876d53c/02_Architecture_ShogunCMO.md)
3. [03_Competitive_Intelligence_Brief.md](file:///C:/Users/movie/.gemini/antigravity/brain/7cc6c0d6-4987-4a01-a273-8d83e876d53c/03_Competitive_Intelligence_Brief.md)
4. [04_Product_Marketing_Context.md](file:///C:/Users/movie/.gemini/antigravity/brain/7cc6c0d6-4987-4a01-a273-8d83e876d53c/04_Product_Marketing_Context.md)

## Requirements

### R1. Continuous Context Engine & Schema
Build `src/lib/context_engine.js` that ingests passive memory logs (e.g. `memory.md`) and produces `src/data/brand_context.json` adhering to the schema in [02_Architecture_ShogunCMO.md](file:///C:/Users/movie/.gemini/antigravity/brain/7cc6c0d6-4987-4a01-a273-8d83e876d53c/02_Architecture_ShogunCMO.md).

### R2. Autonomous Agents (Reddit & X/Twitter)
Build `src/lib/agents/reddit_agent.js` and `src/lib/agents/x_agent.js` that consume `brand_context.json`, execute search/scraping routines (via Tavily/Tinyfish or mock fallbacks), and generate high-signal, contextual drafts into `src/data/drafts.json`.

### R3. ShogunCMO Next.js Dashboard UI
Build a Next.js 14 App Router application with TailwindCSS (dark mode, YC/macOS aesthetic) featuring:
- Live Context Status
- Reddit & Social Opportunities Feed
- One-Click Review & Approve Drafts Interface
- Product Hunt Launch Checklist widget

## Acceptance Criteria

### Context Engine Verification
- [ ] Running `node src/lib/context_engine.js` generates a valid `src/data/brand_context.json`.

### Agent Execution Verification
- [ ] Running `node src/lib/agents/reddit_agent.js` populates `src/data/drafts.json` with structured Reddit draft responses.
- [ ] Running `node src/lib/agents/x_agent.js` populates `src/data/drafts.json` with tweet/thread drafts.

### Dashboard Verification
- [ ] `npm run build` completes with 0 errors.
- [ ] Next.js app renders all pages cleanly and displays live data from the JSON stores.

---
*Next: when approved → delegate via invoke_subagent (see Delegation Protocol)*
