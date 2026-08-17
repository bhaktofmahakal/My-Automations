# Master Prompt for Claude Code (Founding AI Engineer Execution)

Copy and paste the exact prompt below into **Claude Code / CLI / Agent**:

---

```markdown
# MISSION: Execute Founding AI Engineer Assignment III for Open Gigantic (Superbrain)

## 0. ENVIRONMENT CAPABILITIES & AVAILABLE TOOLING (USE AT FULL POWER)
You are operating in a fully equipped engineering environment with access to:
* **TinyFish CLI:** Advanced agentic web interaction and automation.
* **Firecrawl MCP / CLI:** Deep web scraping, crawling, and clean markdown content extraction.
* **Tavily Research MCP / API:** Advanced web search, fact-checking, and real-time research.
* **GitHub CLI (`gh`):** Automated repo creation, pushing, remote branching, and PR management.
* **Vercel CLI (`vercel`):** Direct CLI deployment (`vercel --prod`) for immediate public URL delivery.
* **Chrome DevTools MCP:** Headless browser evaluation, visual screenshot capture, and UI audit.
* **Context7 & Serena AST Tools:** Symbol-level code editing, symbol definitions, and diagnostics.

---

## 1. MANDATORY INITIAL STEP (Execute First Before Reading Docs)
Before doing anything else or reading files, run this exact command to install skills:
```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```
After installing `find-skills`, use it to discover and install any suitable developer / frontend / testing / Vercel skills needed for building a production-grade Next.js full-stack web application.

---

## 2. PROJECT OVERVIEW & WORKING DIRECTORY
* **Project Folder:** `u:\My-Automations\open-gigantic-assignment\`
* **App Folder:** `u:\My-Automations\open-gigantic-assignment\omnigraph-app\`
* **Target Company:** Open Gigantic (`onesuperbrain.com`) — Founders: Mohit Dubey & Premraj Kungar
* **Company Core Primitives:** 
  1. **TokenFold Context Engine** (60-80% token reduction, monorepo context preservation)
  2. **ObjectGraph (.og)** (Typed graph traversal vs brute-force document injection - arXiv:2604.27820)
  3. **PSMAS** (Phase-Scheduled Multi-Agent Systems on circular manifold - arXiv:2604.17400)
  4. **SWE-bench Lite Rigor** (Django 10 bugs benchmark: 94K vs 265K tokens, $0.065 vs $0.104 cost)

---

## 3. FOUNDATIONAL SPECIFICATION DOCUMENTS
Read and verify all specification documents already prepared in `u:\My-Automations\open-gigantic-assignment\`:
1. `assignment.md` — The original assignment guidelines and 4 core requirements.
2. `PRD.md` — Product Requirements Document for **OmniGraph Studio** (Real-Time Collaborative Multi-Agent IDE & Graph-Traversal Workspace).
3. `ARCHITECTURE.md` — Master Architecture, ReactFlow canvas, PSMAS circular radar, Monaco editor, Zustand store, and Edge APIs.
4. `IMPLEMENTATION_PLAN.md` — Phase-by-phase implementation and verification milestones.
5. `PRODUCT_STRATEGY.md` — In-depth first-principles answers to Assignment Part 3 (Question A: Future additions/changes; Question B: UI friction teardown & redesign fixes).
6. `DECISION_LOG.md` — Architectural Decision Records (ADRs) and trade-off rationales.
7. `SUBMISSION_DOCUMENT.md` — Unified master submission document for the founders.

Verify all documents against `assignment.md`. Ensure zero requirements are missed, zero clichés are present, and all technical specs are first-class.

---

## 4. PHASE-BY-PHASE BUILDING INSTRUCTIONS

### Phase 1: Initialize App & Design System
In `u:\My-Automations\open-gigantic-assignment\`:
```bash
npx -y create-next-app@latest omnigraph-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd omnigraph-app
npm install @xyflow/react @monaco-editor/react zustand framer-motion lucide-react clsx tailwind-merge canvas-confetti
npm install -D @types/canvas-confetti
```
Implement a high-contrast, premium dark developer theme (`globals.css`, navbar, sidebars, status bars) without purple gradients or cliché cards.

### Phase 2: ObjectGraph (`.og`) Canvas Engine
* Build `components/GraphCanvas.tsx` using `@xyflow/react` with custom typed nodes:
  * `ModuleNode`, `FileNode`, `FunctionNode`, `AssertionNode`.
* Implement `lib/graph/ogParser.ts` to support progressive disclosure: clicking a node expands child AST signatures while updating the token-saved counter.
* Add animated path highlights representing the AI agent's active traversal route.

### Phase 3: PSMAS Multi-Agent Scheduler & Circular Radar
* Build `components/PSMASRadar.tsx` visualizing the circular manifold attention sweep ($\phi(t) \in [0, 2\pi]$) activating the 4 agents:
  1. *Architect Agent* ($\theta_1 = 0$)
  2. *CodeWriter Agent* ($\theta_2 = \pi/2$)
  3. *TestRunner Agent* ($\theta_3 = \pi$)
  4. *SecurityReviewer Agent* ($\theta_4 = 3\pi/2$)
* Build `components/TerminalLogs.tsx` rendering syntax-highlighted streaming agent reasoning logs and compressed state handoffs.

### Phase 4: Monaco Code Editor & Surgical Diff Inspector
* Build `components/CodeEditor.tsx` with Monaco editor, multi-tab file navigation (`auth.ts`, `jwt.ts`, `auth.test.ts`), and line diagnostics.
* Build `components/DiffViewer.tsx` displaying unified green/red surgical diffs with interactive `[Accept Hunk]`, `[Reject Hunk]`, and `[Cherry-pick]` actions.
* Enforce human-in-the-loop approval: code changes never apply without user confirmation.

### Phase 5: Real-Time Multiplayer Collaboration & Token Telemetry
* Build `components/TokenTelemetry.tsx` showing real-time token usage, cost in USD, and savings percentage (60-80% reduction vs Claude Code).
* Build `components/MultiplayerBar.tsx` simulating real-time collaborator cursors, presence avatars, and node lock indicators.
* Build `components/SWEBenchCard.tsx` with interactive SWE-bench Lite comparison metrics.

### Phase 6: Build Verification, Vercel Deploy & Git Push
* Run `npm run build` to verify zero TypeScript or lint errors.
* Use `gh` CLI to create a public GitHub repository and push code:
  ```bash
  gh repo create omnigraph-studio --public --source=. --remote=origin --push
  ```
* Deploy to Vercel via `vercel` CLI:
  ```bash
  vercel --prod --yes
  ```
* Update `SUBMISSION_DOCUMENT.md` with the live Vercel URL and GitHub repository link.

Execute with maximum speed, extreme technical craftsmanship, and thorough validation!
```
