'use client';

import React, { useMemo, useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  MiniMap,
  Panel,
  Node,
  Edge,
  BackgroundVariant,
  Connection,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import { ModuleNode } from './ModuleNode';
import { FileNode } from './FileNode';
import { FunctionNode } from './FunctionNode';
import { AssertionNode } from './AssertionNode';
import { NodePaletteDrawer, DragNodeItem } from './NodePaletteDrawer';
import { computeTidyLayout } from '@/lib/workflow/tidyLayout';
import { useOmniStore } from '@/lib/store/useOmniStore';
import {
  Search,
  Sparkles,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  LayoutGrid,
  PlusCircle,
  Layers,
  Info,
  Play,
  Trash2,
} from 'lucide-react';

const nodeTypes = {
  module: ModuleNode,
  file: FileNode,
  function: FunctionNode,
  assertion: AssertionNode,
};

const INITIAL_NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'mod-auth': { x: 320, y: 40 },
  'file-auth-ts': { x: 80, y: 190 },
  'file-jwt-ts': { x: 330, y: 190 },
  'file-session-ts': { x: 580, y: 190 },
  'file-auth-test-ts': { x: 830, y: 190 },
  'fn-authenticate': { x: 80, y: 360 },
  'fn-verifyjwt': { x: 330, y: 360 },
  'assert-session-bleed': { x: 830, y: 360 },
};

function GraphCanvasInner() {
  const nodesData = useOmniStore((state) => state.nodes);
  const edgesData = useOmniStore((state) => state.edges);
  const activePathEdgeIds = useOmniStore((state) => state.activePathEdgeIds);
  const searchQuery = useOmniStore((state) => state.searchQuery);
  const setSearchQuery = useOmniStore((state) => state.setSearchQuery);
  const resetGraph = useOmniStore((state) => state.resetGraph);
  const selectedNodeId = useOmniStore((state) => state.selectedNodeId);
  const selectNode = useOmniStore((state) => state.selectNode);
  const addNode = useOmniStore((state) => state.addNode);
  const collaborators = useOmniStore((state) => state.collaborators);
  const startPSMASSweep = useOmniStore((state) => state.startPSMASSweep);

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const { zoomIn, zoomOut, fitView, screenToFlowPosition } = useReactFlow();

  // Transform store nodes to ReactFlow nodes
  const [nodes, setNodes] = useState<Node[]>(() =>
    nodesData.map((n, idx) => ({
      id: n.id,
      type: n.type,
      position: INITIAL_NODE_POSITIONS[n.id] || {
        x: 100 + (idx % 3) * 260,
        y: 100 + Math.floor(idx / 3) * 160,
      },
      data: n,
    }))
  );

  const [edges, setEdges] = useState<Edge[]>(() =>
    edgesData.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'smoothstep',
      animated: activePathEdgeIds.includes(e.id),
      style: { stroke: '#38bdf8', strokeWidth: 1.5 },
    }))
  );

  // Sync with store on updates
  React.useEffect(() => {
    setNodes((prevNodes) =>
      nodesData.map((n, idx) => {
        const existing = prevNodes.find((pn) => pn.id === n.id);
        return {
          id: n.id,
          type: n.type,
          position: existing
            ? existing.position
            : INITIAL_NODE_POSITIONS[n.id] || {
                x: 100 + (idx % 3) * 260,
                y: 100 + Math.floor(idx / 3) * 160,
              },
          data: n,
          selected: selectedNodeId === n.id,
        };
      })
    );
  }, [nodesData, selectedNodeId]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'smoothstep', animated: true }, eds));
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const rawData = event.dataTransfer.getData('application/reactflow');
      if (!rawData) return;

      const item: DragNodeItem = JSON.parse(rawData);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNodeId = `custom-${item.type}-${Date.now()}`;
      const newNodeData = {
        id: newNodeId,
        label: `${item.label}`,
        type: item.type as any,
        path: `src/custom/${item.type}.ts`,
        language: 'typescript',
        linesCount: 42,
        signatures: [],
        tokenCount: 240,
        compressedTokens: 48,
        status: 'idle' as const,
      };

      addNode(newNodeData);

      const newFlowNode: Node = {
        id: newNodeId,
        type: item.type,
        position,
        data: newNodeData,
      };

      setNodes((nds) => [...nds, newFlowNode]);
      selectNode(newNodeId);
    },
    [screenToFlowPosition, addNode, selectNode]
  );

  const handleTidyLayout = useCallback(() => {
    const layouted = computeTidyLayout(nodes, edges);
    setNodes(layouted);
    setTimeout(() => fitView({ duration: 400, padding: 0.2 }), 50);
  }, [nodes, edges, fitView]);

  const onContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  const selectedNode = useMemo(
    () => nodesData.find((n) => n.id === selectedNodeId),
    [nodesData, selectedNodeId]
  );

  return (
    <div
      className="relative w-full h-full bg-[#08090d] border border-[#222638] rounded-xl overflow-hidden shadow-2xl"
      onContextMenu={onContextMenu}
      onClick={closeContextMenu}
    >
      {/* Top Floating Action & Search Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0e1017]/95 backdrop-blur-md border border-[#222638] px-3 py-1.5 rounded-lg shadow-lg">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search .og AST nodes, exports, symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-56 font-mono"
          />
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-[#0e1017]/95 backdrop-blur-md border border-[#222638] px-3 py-1.5 rounded-lg shadow-lg">
          <button
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
              isPaletteOpen
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-[#161b22] text-zinc-300 hover:bg-[#1c2128] border border-[#30363d]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Node Palette</span>
          </button>

          <button
            onClick={handleTidyLayout}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] text-zinc-300 rounded text-xs font-mono font-semibold transition-all"
            title="Auto-Tidy Layout"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span>Auto Tidy</span>
          </button>

          <span className="text-zinc-700">|</span>

          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-cyan-400 font-semibold">{nodes.length} Nodes</span>
          </div>

          <button
            onClick={resetGraph}
            title="Reset Canvas Layout"
            className="p-1 rounded hover:bg-[#1a1e2d] text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Drag & Drop Node Drawer */}
      <NodePaletteDrawer isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />

      {/* ReactFlow Canvas */}
      <div className="w-full h-full" onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onPaneClick={() => selectNode(null)}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2.0}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#1f2438" />

          {/* Floating Zoom & Control Panel (Inspired by fynt) */}
          <Panel position="bottom-left" className="!m-4">
            <div className="flex flex-col gap-1.5 bg-[#0e1017]/95 backdrop-blur-md p-1.5 rounded-lg border border-[#30363d] shadow-xl">
              <button
                onClick={() => zoomIn()}
                className="p-1.5 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-1.5 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => fitView({ duration: 300, padding: 0.2 })}
                className="p-1.5 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Fit View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </Panel>

          <MiniMap
            nodeColor={(n) => {
              if (n.type === 'module') return '#38bdf8';
              if (n.type === 'file') return '#34d399';
              if (n.type === 'assertion') return '#fbbf24';
              return '#818cf8';
            }}
            maskColor="rgba(8, 9, 13, 0.85)"
            className="!bg-[#0e1017] !border !border-[#222638] !rounded-lg"
            position="bottom-right"
          />
        </ReactFlow>
      </div>

      {/* Context Menu (Right Click on Canvas) */}
      {contextMenu && (
        <div
          className="fixed z-50 w-48 bg-[#0e1017] border border-[#30363d] rounded-lg shadow-2xl p-1 font-mono text-xs text-zinc-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => {
              setIsPaletteOpen(true);
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-[#161b22] rounded flex items-center gap-2 text-cyan-300"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Node...</span>
          </button>
          <button
            onClick={() => {
              handleTidyLayout();
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-[#161b22] rounded flex items-center gap-2"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span>Auto-Tidy Layout</span>
          </button>
          <button
            onClick={() => {
              fitView({ duration: 300 });
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-[#161b22] rounded flex items-center gap-2"
          >
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fit Canvas View</span>
          </button>
          <div className="my-1 border-t border-[#21262d]" />
          <button
            onClick={() => {
              startPSMASSweep();
              closeContextMenu();
            }}
            className="w-full text-left px-3 py-1.5 hover:bg-[#161b22] rounded flex items-center gap-2 text-emerald-400 font-bold"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run PSMAS Sweep</span>
          </button>
        </div>
      )}

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-xl bg-[#0e1017]/95 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3.5 shadow-2xl transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-[#222638]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-zinc-100">
                {selectedNode.label} ({selectedNode.path})
              </span>
            </div>
            <button
              onClick={() => selectNode(null)}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-mono"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2.5 font-mono text-[11px]">
            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block">AST Node Type</span>
              <span className="text-cyan-400 font-bold capitalize">{selectedNode.type}</span>
            </div>
            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block">Raw Tokens</span>
              <span className="text-emerald-400 font-bold">{selectedNode.tokenCount}</span>
            </div>
            <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block">TokenFold Comp</span>
              <span className="text-purple-400 font-bold">{selectedNode.compressedTokens} (5x)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const GraphCanvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <GraphCanvasInner />
    </ReactFlowProvider>
  );
};
