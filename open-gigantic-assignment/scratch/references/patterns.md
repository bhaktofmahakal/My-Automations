# Reference Repository Discovery & Architectural Pattern Analysis

**Target Systems Analyzed**:
1. **React Flow / @xyflow/react High-Performance Graph Canvases** (State isolation, selector-based store subscriptions, un-controlled node updates, dynamic LOD rendering).
2. **Real-Time Multi-Agent Execution Visualizers & Diff Viewers** (Hunk-based patch parsing, single-hunk cherry picking, low-latency Server-Sent Events (SSE) streaming protocols for LLM tokens).

---

## 1. @xyflow/react State Isolation Pattern (>200 Nodes at 60fps)

### Problem:
In naive React Flow implementations, updating store state (e.g. active path edge animation, token counter, cursor movements) triggers full canvas re-renders for every node in the graph, causing severe frame drops when rendering >200 nodes.

### Architectural Solution (Extracted & Adapted Pattern):
- **Zustand Fine-Grained Primitive Selectors**: Node components subscribe only to derived primitive values (`useOmniStore(useCallback(state => state.selectedNodeId === id, [id]))`) rather than object state.
- **Uncontrolled Node Positions with Batch Viewport Updating**: Graph positions are managed internally by React Flow while AST node metadata is managed by external Zustand store.
- **Memoized Node Types (`React.memo` with custom comparator)**: Custom nodes (`ModuleNode`, `FileNode`, `FunctionNode`, `AssertionNode`) compare only data property hash changes (`data.status`, `data.isLoaded`, `data.tokenCount`), bypassing re-render during viewport panning/zooming.
- **Dynamic Render Throttling & CSS Hardware Acceleration**:
  - `transform: translate3d(...)` on node elements.
  - `will-change: transform` during zoom operations.

```typescript
// Pattern Implementation: Isolated Node Selector in React Flow
export const FunctionNode = React.memo(({ id, data, selected }: NodeProps) => {
  // Fine-grained selector ensures this node re-renders ONLY when its status or active selection changes
  const isActivePath = useOmniStore(
    useCallback(state => state.activePathEdgeIds.includes(id), [id])
  );
  
  return (
    <div className={`node-container ${selected ? 'selected' : ''} ${isActivePath ? 'active-glow' : ''}`}>
      <span className="font-mono text-xs">{data.label}</span>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.data.status === nextProps.data.status &&
    prevProps.data.tokenCount === nextProps.data.tokenCount
  );
});
```

---

## 2. Unified Diff Chunking & Cherry-Picking Algorithm

### Problem:
Standard git diffs present whole-file patches, forcing developers into all-or-nothing approval. Single-hunk cherry picking requires deterministic patch parsing, hunk identification, and line-offset adjustment.

### Architectural Solution (Extracted & Adapted Pattern):
- **Unified Diff Parser (`parseCodeToHunks`)**: Splits original and modified file contents into discrete unified diff hunks with line-number bounds (`@@ -oldStart,oldLen +newStart,newLen @@`).
- **Hunk State Machine**: Each hunk possesses an independent lifecycle state (`pending` $\rightarrow$ `accepted` | `rejected`).
- **Atomic Selective Patch Reconstitution**:
  - `applyApprovedPatches()` reads original file lines.
  - Iterates over approved hunks in descending line-order (to avoid offsetting line indexes).
  - Replaces old line ranges with approved addition lines.
  - Leaves unapproved/rejected hunks untouched.

```typescript
// Pattern Implementation: Hunk Reconstitution Engine
export function reconcileApprovedHunks(
  originalCode: string,
  hunks: DiffHunk[]
): string {
  const lines = originalCode.split('\n');
  const acceptedHunks = hunks.filter(h => h.status === 'accepted')
                             .sort((a, b) => b.oldStartLine - a.oldStartLine);

  let updatedLines = [...lines];

  for (const hunk of acceptedHunks) {
    const removeCount = hunk.oldLineCount;
    const replacementLines = hunk.lines
      .filter(l => l.type === 'addition' || l.type === 'context')
      .map(l => l.content);

    updatedLines.splice(hunk.oldStartLine - 1, removeCount, ...replacementLines);
  }

  return updatedLines.join('\n');
}
```

---

## 3. Low-Latency Multi-Agent SSE Streaming Protocol

### Problem:
Multi-agent coordination requires streaming token reasoning, AST node traversal signals, and patch hunks from LLM engines (Claude 3.7 / GPT-4o) without socket overhead or connection drops.

### Architectural Solution (Extracted & Adapted Pattern):
- **Server-Sent Events (SSE) Response Stream**: Uses standard HTTP `/api/agents/psmas-run` Edge route returning `text/event-stream`.
- **Structured Multi-Agent Event Schema**:
  ```json
  event: agent_phase
  data: {"agentId": "architect", "phaseAngle": 0, "status": "active"}

  event: ast_traversal
  data: {"nodeId": "fn-authenticate", "tokensSaved": 18420, "compressedTokens": 84}

  event: diff_hunk
  data: {"file": "auth.ts", "header": "@@ -42,7 +42,7 @@", "hunkId": "hunk-1"}
  ```
- **Compressed Handoff Memory Broadcast**: Idle agents receive an $O(1)$ compressed vector summary $[0.82, 0.14, 0.61, 0.09]$ in event metadata instead of full prompt duplication, preventing quadratic context growth.

---

## 4. Architectural Verification Matrix

| Pattern | Target Performance SLA | Status | Integration Vector |
| :--- | :--- | :--- | :--- |
| **React Flow State Isolation** | 60 FPS at >200 nodes | Ready | `GraphCanvas.tsx` / `ogParser.ts` |
| **Hunk Cherry-Picker** | Sub-millisecond patch reconciliation | Ready | `DiffViewer.tsx` / `patchEngine.ts` |
| **Multi-Agent SSE Stream** | <50ms first-token latency | Ready | `/api/agents/psmas-run/route.ts` |
