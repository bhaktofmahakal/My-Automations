# Product Requirements Document (PRD)
## Project: OmniGraph Studio — Collaborative Multi-Agent Context & Traversal Workspace
**Target Role:** Founding AI Engineer @ Open Gigantic  
**Document Version:** 1.0.0 (Master Spec)  
**Author:** Candidate (Founding AI Engineer Track)  

---

## 1. Executive Summary & Problem Statement

### 1.1 The Fundamental Problem
Modern AI coding assistants (e.g., Cursor, Copilot, Claude Code) operate predominantly on **brute-force document injection**:
1. When navigating multi-file repositories or monorepos, agents dump entire raw source files into the context window.
2. This creates rapid **context window bloat**, severe latency degradation, and token cost explosions ($0.40+ per non-trivial bug).
3. Furthermore, multi-agent coordination architectures suffer from **unstructured parallel execution** and **unrestricted context broadcast**, where every agent receives the full accumulated context regardless of its active dependency requirements.

### 1.2 The First-Principles Solution: OmniGraph Studio
**OmniGraph Studio** is an AI-native, real-time collaborative workspace that operationalizes Open Gigantic’s core research primitives:
* **ObjectGraph (`.og`) Knowledge Traversal:** Instead of treating codebases as linear strings to inject, OmniGraph models repositories as typed, directed AST and dependency graphs. Agents traverse nodes via progressive disclosure rather than context flooding.
* **Phase-Scheduled Multi-Agent Coordination (PSMAS):** Implements angular sweep attention scheduling ($\theta_i \in [0, 2\pi]$) across specialized agent roles (Architect, CodeWriter, TestRunner, SecurityAuditor), activating only agents within the current execution window while broadcasting compressed state summaries to idle agents.
* **Real-Time Multiplayer Collaboration:** Enables human engineers and autonomous agents to co-navigate, co-edit, inspect surgical diffs, and benchmark token efficiency live.

---

## 2. Target Personas & Core Use Cases

### 2.1 Target Personas
* **Founding / Lead AI Engineers:** Building and debugging multi-agent coding workflows, evaluating token budgeting, and optimizing repository traversal.
* **Staff Software Engineers / Monorepo Maintainers:** Refactoring cross-module dependencies across hundreds of files without losing context or blowing up inference budgets.
* **Engineering Leadership / CTOs:** Managing team-wide AI inference costs and requiring safe, reviewable execution before applying automated changes.

### 2.2 Core User Loops
1. **Repository Ingestion & Graph Visualization:** User loads a project/repository; the system generates an interactive `.og` knowledge graph showing modules, classes, and cross-file dependencies.
2. **Multi-Agent Task Orchestration (PSMAS Sweep):** User prompts an engineering task (e.g., "Refactor Auth Middleware to use JWT with RBAC & update tests"). The PSMAS scheduler visualizes the angular phase sweep, activating agents sequentially with minimal token footprint.
3. **Live Token-Budget & Efficiency Audit:** Real-time metrics dashboard displays exact token consumption and cost comparison against traditional linear injection (demonstrating 60–80% token reduction).
4. **Surgical Diff Inspection & Safe Execution:** Human-in-the-loop review interface displays multi-file diffs with rollback capabilities before committing.

---

## 3. Key Functional Requirements

### 3.1 Module 1: Interactive Knowledge Graph Canvas (`.og` Traversal Engine)
* **Graph Rendering:** High-performance canvas (powered by React Flow / WebGL) visualizing repository topology (files, exports, dependencies, callers/callees).
* **Node Types:** Module nodes, File nodes, Function/Class nodes, and Assertion nodes.
* **Progressive Disclosure:** Clicking or querying a node expands child AST nodes on demand without loading entire file bodies into the LLM context.
* **Traversal Trace:** Visual highlight of the path the AI agent took during reasoning.

### 3.2 Module 2: Phase-Scheduled Multi-Agent System (PSMAS Engine)
* **Agent Roles:**
  * $\theta_1 = 0$: *Architect Agent* (High-level design & dependency discovery)
  * $\theta_2 = \frac{\pi}{2}$: *CodeWriter Agent* (Surgical multi-file implementation)
  * $\theta_3 = \pi$: *TestRunner Agent* (Test generation & failure validation)
  * $\theta_4 = \frac{3\pi}{2}$: *Security/Review Agent* (Vulnerability & syntax grading)
* **Visual Manifold Sweep:** A rotating circular radar UI displaying the phase angle $\phi(t)$ activating agents dynamically.
* **Context Compression:** Idle agents receive $O(\log N)$ summaries instead of $O(N)$ full context.

### 3.3 Module 3: Code Editor & Surgical Diff Patching
* **Monaco / CodeMirror Integration:** Split-pane editor with syntax highlighting, line numbers, and inline diagnostic markers.
* **Surgical Diffs:** Git-style green/red line diffs with single-click "Accept", "Reject", or "Regenerate".
* **Safe Approval Gate:** No code modification executes without explicit developer confirmation.

### 3.4 Module 4: Real-Time Live Collaboration & WebSocket Presence
* **Multi-User Presence:** Live avatar indicators, remote cursor tracking, and collaborative state synchronization.
* **Multiplayer Chat & Event Feed:** Real-time log of human and agent actions.

### 3.5 Module 5: Token Efficiency & SWE-bench Live Grader
* **Token Reduction Meter:** Dynamic counter tracking Input/Output tokens, Context Window utilization, and Cost in USD.
* **Comparative Leaderboard / Benchmark Mode:** Side-by-side run against simulated baseline (Claude Code / Linear Injection vs Superbrain TokenFold/OmniGraph).

---

## 4. Technical Constraints & Non-Functional Requirements

| Metric | Target | Rationale |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | $< 1.2\text{s}$ | Fast developer workflow on Vercel Edge. |
| **Graph Interaction Frame Rate** | $60\text{ fps}$ | Smooth pan/zoom across $>500$ nodes. |
| **Real-time Event Latency** | $< 50\text{ms}$ | Responsive multiplayer cursor and state sync. |
| **Deployment Platform** | Vercel | Seamless edge deployment with Next.js App Router. |
| **Browser Compatibility** | Chrome, Edge, Safari, Firefox | Modern Web standards, responsive desktop/tablet UI. |

---

## 5. Non-Goals (Scope Boundaries)
* **Not a generic chat assistant:** We are not building a generic OpenAI wrapper. Every interaction is tied to graph traversal, code diffs, or agent coordination.
* **Not a full cloud IDE compiler:** Code execution and test runs are simulated or executed via client-side sandboxes / WebContainers rather than spinning up heavy remote VMs.
