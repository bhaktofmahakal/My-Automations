# Master System Architecture Document
## Project: OmniGraph Studio — Collaborative Multi-Agent Context & Traversal Workspace
**Target Role:** Founding AI Engineer @ Open Gigantic  
**Document Version:** 1.0.0  

---

## 1. System Architecture Overview

OmniGraph Studio is built as a high-performance, modular full-stack application running on Next.js (App Router), deployed natively on Vercel with edge-compatible streaming APIs, WebSockets/SSE for real-time collaboration, and client-side reactive graph computation.

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT TIER                                       |
|                                                                                   |
|  +-------------------------------------+   +------------------------------------+  |
|  |     Interactive Canvas (ReactFlow)  |   |    Monaco / CodeMirror Editor      |  |
|  |   - ObjectGraph (.og) Node View     |   |   - Surgical Multi-File Diff View  |  |
|  |   - Progressive Disclosure Engine   |   |   - Safe Human Approval Barrier    |  |
|  +-------------------------------------+   +------------------------------------+  |
|                     ^                                         ^                   |
|                     |                                         |                   |
|  +-------------------------------------+   +------------------------------------+  |
|  |      PSMAS Circular Sweep Radar     |   |   Token & Cost Telemetry Monitor   |  |
|  |   - Angular Phase theta in [0, 2pi] |   |   - Real-time Token Savings (60-80%)| |
|  |   - Compressed Memory Broadcast     |   |   - SWE-bench Mode Comparison      |  |
|  +-------------------------------------+   +------------------------------------+  |
|                     |                                         |                   |
|                     +--------------------+--------------------+                   |
|                                          |                                        |
|                          Zustand Reactive Store & Event Bus                       |
+------------------------------------------+----------------------------------------+
                                           |
                              WebSockets / SSE / Fetch API
                                           |
+------------------------------------------v----------------------------------------+
|                          SERVER / VERCEL EDGE RUNTIME                             |
|                                                                                   |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|  | /api/graph/traverse   |  | /api/agents/psmas-run |  | /api/tokens/benchmark |  |
|  | - AST Node Resolver   |  | - LangGraph / Sweep   |  | - Pricing Calculator  |  |
|  | - .og Graph Indexer   |  | - Streaming LLM Agent |  | - SWE-bench Lite Sim  |  |
|  +-----------------------+  +-----------------------+  +-----------------------+  |
|                                          |                                        |
|                   LLM Provider Layer (Anthropic / Sarvam / OpenAI)                |
+-----------------------------------------------------------------------------------+
```

---

## 2. Core Architectural Subsystems

### 2.1 The ObjectGraph (`.og`) Engine
The ObjectGraph engine transforms a codebase into a typed directed graph:
$$G = (V, E)$$
where:
* **Vertices $V$:** $\{v_{\text{module}}, v_{\text{file}}, v_{\text{class}}, v_{\text{function}}, v_{\text{assertion}}\}$
* **Edges $E$:** $\{\text{imports}, \text{calls}, \text{inherits}, \text{modifies}, \text{tests}\}$

#### Progressive Disclosure Model:
Instead of sending 5,000 tokens of raw file text:
1. **Level 0 (Topology):** Send only the top-level module node and export signatures (~80 tokens).
2. **Level 1 (Targeted Node):** When the agent queries `auth.ts:verifyToken`, only load that function's AST node and immediate dependencies (~150 tokens).
3. **Level 2 (Assertion Check):** Load associated unit test assertion node (~60 tokens).
*Result:* **92% token reduction** on multi-file navigation.

---

### 2.2 Phase-Scheduled Multi-Agent System (PSMAS) Runtime
The PSMAS runtime schedules agent attention over a circular manifold $S^1 \cong [0, 2\pi)$.

#### Mathematical Model:
* Each agent $i \in \{1, \dots, K\}$ is assigned a fixed angular position $\theta_i \in [0, 2\pi]$.
* A global coordination phase $\phi(t) = \omega t \pmod{2\pi}$ sweeps continuously across the manifold.
* An agent $i$ is **Active** if and only if:
  $$\text{dist}_{S^1}(\theta_i, \phi(t)) \le \epsilon$$
  where $\epsilon$ is the attention activation window.
* **Idle Agents:** When $\text{dist}_{S^1}(\theta_i, \phi(t)) > \epsilon$, the agent does not receive the raw conversation transcript; it receives a compressed state vector $S_{\text{comp}}$ of size $O(1)$.

```
            [Architect Agent] (theta_1 = 0)
                   /\
                  /  \  
  [Reviewer]     /    \    [CodeWriter]
(theta_4 = 3pi/2)<----- >(theta_2 = pi/2)
                 \    /
                  \  /
                   \/
            [TestRunner Agent] (theta_3 = pi)
```

---

### 2.3 Real-Time State & Multiplayer Synchronization
* **Local State Management:** Zustand store for ultra-low latency UI state updates (active nodes, agent sweeps, terminal logs).
* **Multiplayer Presence:** WebSocket / BroadcastChannel protocol syncing human cursors, node locks, and live collaborative diffs with sub-50ms latency.
* **Optimistic UI Updates:** Changes to the canvas or code diffs apply immediately on the client with automated reconciliation.

---

### 2.4 Token & Cost Telemetry Engine
* Live token calculation using standard tiktoken / Claude tokenizers.
* Real-time benchmark comparison:
  $$\text{Cost}_{\text{Superbrain}} = (\text{Tokens}_{\text{Input}} \times P_{\text{in}} + \text{Tokens}_{\text{Output}} \times P_{\text{out}}) \times (1 - \text{Reduction}_{\text{TokenFold}})$$
* Visual display of SWE-bench Lite comparison (e.g. 94K median vs 265K median tokens).

---

## 3. Technology Stack & Key Decisions

| Layer | Selected Tech | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 14/15 (App Router, TypeScript) | Seamless Vercel deployment, React Server Components + Edge API routes. |
| **Styling** | TailwindCSS + Framer Motion | Precision typography, fluid dark/light aesthetic, responsive transitions. |
| **Canvas / Graph** | `@xyflow/react` (React Flow) | Hardware-accelerated canvas, customizable node rendering, smooth pan/zoom. |
| **Code Editor** | `@monaco-editor/react` / CodeMirror | Enterprise-grade syntax highlighting, multi-file diffing, keyboard shortcuts. |
| **State Management**| Zustand + Immer | Lightweight, zero boilerplate, reactive state across canvas and terminal. |
| **Icons & UI** | Lucide React | Clean, minimalist, modern developer aesthetic. |

---

## 4. Security, Isolation & Safe Execution Gate
* **Human-in-the-Loop Barrier:** All code modifications generate a pending surgical patch object. No write operation persists to disk/state without a client-side user approval signature.
* **Network Isolation Sandbox:** Simulated SWE-bench evaluator runs in a pure sandboxed execution loop with zero external internet dependencies during scoring.
