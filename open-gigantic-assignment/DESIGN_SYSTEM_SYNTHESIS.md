# OmniGraph Studio — Design System Synthesis & Visual Language Specification

**Version:** 1.0.0 (Master Production Spec)  
**Target Product:** OmniGraph Studio (`onesuperbrain.com`)  
**Design Influences:** Linear App (Obsidian Depth & 1px Hairlines), Cursor (AI Action Timelines & Surgical Diffs), OpenCode (Monospace Terminal HUDs & AST Density), Expo (Component Modular Spacing).

---

## 1. Core Color System (Obsidian Developer Dark)

```css
:root {
  /* Canvas & Obsidian Surfaces */
  --canvas-base: #08090d;          /* Deepest obsidian canvas */
  --surface-panel: #0e1017;        /* Panel container surface */
  --surface-card: #141722;         /* Elevated card surface */
  --surface-active: #1a1e2d;       /* Hover / active state */
  --surface-subtle: #090a0f;       /* Inset input / terminal background */

  /* Hairlines & Precision Borders */
  --hairline-subtle: rgba(255, 255, 255, 0.08); /* 1px standard panel border */
  --hairline-medium: #222638;                   /* Interactive component border */
  --hairline-strong: #333852;                   /* Active focus / hover ring */

  /* Ink & High-Contrast Typography */
  --ink-primary: #f4f4f6;          /* Headers & display text */
  --ink-secondary: #d0d6e0;        /* Body & active code */
  --ink-muted: #8a8f98;            /* Secondary labels & metadata */
  --ink-faint: #525866;            /* Line numbers & comments */

  /* Surgical Accent Voltages (Zero Generic Gradients) */
  --accent-emerald: #10b981;       /* TokenFold savings, approved patches, passing tests */
  --accent-emerald-glow: rgba(16, 185, 129, 0.25);
  --accent-cyan: #06b6d4;          /* ObjectGraph nodes & active PSMAS sweep phi(t) */
  --accent-cyan-glow: rgba(6, 182, 212, 0.25);
  --accent-iris: #6366f1;          /* Multi-agent coordination & system badges */
  --accent-amber: #f59e0b;         /* Pending surgical diffs & warnings */
  --accent-ruby: #f43f5e;          /* Deletions, test regressions, vulnerability alerts */
  --accent-ruby-glow: rgba(244, 63, 94, 0.25);
}
```

---

## 2. Typography Hierarchy

* **UI Controls & Headlines:** `Inter`, `-apple-system`, `system-ui` (font-weights: 500, 600, 700 with negative tracking `-0.02em` on titles).
* **Code, AST Signatures, Tokens & Terminal:** `JetBrains Mono`, `Berkeley Mono`, `Fira Code`, `ui-monospace` (font-weights: 400, 500, 700 with tabular numbers `font-variant-numeric: tabular-nums`).

| Token | Family | Size | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Inter | 20px | 700 | 1.2 | Main workspace headers & modal titles |
| `title-md` | Inter / Geist | 14px | 600 | 1.3 | Panel titles & agent names |
| `label-mono` | JetBrains Mono | 12px | 600 | 1.4 | ObjectGraph node labels & tab names |
| `code-body` | JetBrains Mono | 12.5px | 400 | 1.5 | Monaco Editor & Surgical Diff lines |
| `telemetry-stat` | JetBrains Mono | 16px | 700 | 1.2 | Token counters & dollar metrics |
| `badge-sm` | JetBrains Mono | 9.5px | 600 | 1.0 | Status pills (`[MUTATED]`, `[RESOLVED]`) |

---

## 3. UI Component Templates & Layout Synthesis

### 3.1 ObjectGraph (.og) Canvas HUD
* **Layout:** High-contrast dark graph canvas with subtle dot grid (`#1f2438` at 18px intervals).
* **Nodes:**
  * **ModuleNode (`#0e1017` / Cyan header):** Contains path, export symbols, and one-click AST expansion button.
  * **FileNode (`#0e1017` / Emerald header):** Displays line counts, raw vs compressed token weights (`1250t -> 140t`), and active patch status.
  * **FunctionNode (`#12141c` / Iris border):** Displays function signature, line bounds, and mutation state.
  * **AssertionNode (`#0d141f` / Amber border):** Displays SWE-bench test target and pass/fail state.
* **Progressive Disclosure Animation:** Expanding nodes seamlessly reveals child AST vertices while updating the global token reduction counter in real time.

### 3.2 PSMAS Angular Sweep Radar
* **Layout:** Precision circular manifold radar on $S^1 \cong [0, 2\pi)$.
* **Radar Geometry:** Center $(130, 130)$, radius $95\text{px}$, with concentric grid rings and crosshairs.
* **Rotating Attention Needle:** Indicates global phase $\phi(t)$ dynamically sweeping from $0 \rightarrow \pi/2 \rightarrow \pi \rightarrow 3\pi/2$.
* **Agent Nodes:**
  * $\theta_1 = 0$ (Architect / Cyan)
  * $\theta_2 = \pi/2$ (CodeWriter / Emerald)
  * $\theta_3 = \pi$ (TestRunner / Amber)
  * $\theta_4 = 3\pi/2$ (SecurityReviewer / Ruby)
* **$O(1)$ Memory Vector Cards:** Displays the compressed state summary transmitted to idle agents.

### 3.3 Monaco Split-Pane Editor & Surgical Diff Cherry-Picker
* **Editor Tab Bar:** Multi-file tab navigation (`auth.ts`, `jwt.ts`, `auth.test.ts`, `session.ts`) with live pending diff indicators.
* **Diff Viewer:** Unified green/red hunk reviewer with:
  * Exact line numbers (Old vs New)
  * First-principles rationale explanations for each hunk
  * Granular action buttons: `[Accept Hunk]`, `[Reject Hunk]`, `[Cherry-pick]`
* **Safe Approval Barrier Modal:** Requires explicit developer confirmation with cryptographic patch hash and token savings verification before merging.

### 3.4 Token Telemetry & SWE-bench Live Gauge
* **Token Reduction Meter:** Side-by-side comparison between Superbrain TokenFold (94,120 tokens / $0.065) and Linear Injection baseline (265,400 tokens / $0.104).
* **Savings Pill:** Animated `-64.5% TOKENS` badge.
* **SWE-bench Lite Card:** Real-time 14/14 test pass counter and 7/10 benchmark solve rate indicator.
* **Multiplayer Presence Bar:** Real-time collaborator avatars (Mohit, Premraj, Candidate) with cursor co-presence and sub-15ms sync latency.

---

## 4. Design Guidelines Adherence
* **Zero Clichés:** No generic bright purple gradients, no fuzzy drop shadows, no bloated card margins.
* **Developer Density:** Every pixel serves a functional purpose — AST nodes, diff lines, radar crosshairs, or token telemetry.
* **Accessibility:** High WCAG AA/AAA contrast ratios for code and text over obsidian backgrounds.
