'use client';

import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
  useNodesState,
  useEdgesState,
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
  Move,
} from 'lucide-react';

const nodeTypes = {
  module: ModuleNode,
  file: FileNode,
  function: FunctionNode,
  assertion: AssertionNode,
};

const INITIAL_NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'mod-auth': { x: 380, y: 50 },
  'file-auth-ts': { x: 100, y: 220 },
  'file-jwt-ts': { x: 380, y: 220 },
  'file-session-ts': { x: 660, y: 220 },
  'file-auth-test-ts': { x: 940, y: 220 },
  'fn-authenticate': { x: 100, y: 400 },
  'fn-verifyjwt': { x: 380, y: 400 },
  'assert-session-bleed': { x: 940, y: 400 },
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

  // Create initial flow nodes with dragging coordinates
  const initialFlowNodes: Node[] = useMemo(() => {
    return nodesData.map((n, idx) => ({
      id: n.id,
      type: n.type,
      position: INITIAL_NODE_POSITIONS[n.id] || {
        x: 100 + (idx % 3) * 280,
        y: 100 + Math.floor(idx / 3) * 180,
      },
      data: n,
      selected: selectedNodeId === n.id,
      draggable: true,
    }));
  }, [nodesData, selectedNodeId]);

  const initialFlowEdges: Edge[] = useMemo(() => {
    return edgesData.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'smoothstep',
      animated: activePathEdgeIds.includes(e.id),
      style: {
        stroke: activePathEdgeIds.includes(e.id) ? '#38bdf8' : '#30363d',
        strokeWidth: activePathEdgeIds.includes(e.id) ? 2.5 : 1.5,
      },
    }));
  }, [edgesData, activePathEdgeIds]);

  // React Flow state hooks for interactive node movement
  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialFlowEdges);

  // Sync internal flow nodes whenever store nodesData updates
  useEffect(() => {
    setNodes((prevNodes) => {
      return nodesData.map((n, idx) => {
        const existing = prevNodes.find((pn) => pn.id === n.id);
        return {
          id: n.id,
          type: n.type,
          position: existing?.position || INITIAL_NODE_POSITIONS[n.id] || {
            x: 100 + (idx % 3) * 280,
            y: 100 + Math.floor(idx / 3) * 180,
          },
          data: n,
          selected: selectedNodeId === n.id,
          draggable: true,
        };
      });
    });
  }, [nodesData, selectedNodeId, setNodes]);

  // Sync edges whenever store edgesData updates
  useEffect(() => {
    setEdges(
      edgesData.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: activePathEdgeIds.includes(e.id),
        style: {
          stroke: activePathEdgeIds.includes(e.id) ? '#38bdf8' : '#30363d',
          strokeWidth: activePathEdgeIds.includes(e.id) ? 2.5 : 1.5,
        },
      }))
    );
  }, [edgesData, activePathEdgeIds, setEdges]);

  // Automatic fitView on window resize
  useEffect(() => {
    const handleResize = () => {
      fitView({ duration: 300, padding: 0.2 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
    setContextMenu(null);
  }, [selectNode]);

  // Drag-and-Drop handler from NodePaletteDrawer
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

      const newNodeId = `node-${Date.now()}`;
      const newNodeData: any = {
        id: newNodeId,
        label: item.label,
        type: item.type as any,
        path: `src/custom/${item.type}.ts`,
        language: 'typescript',
        linesCount: 45,
        tokenCount: 450,
        compressedTokens: 90,
        status: 'discovered' as const,
        signatures: [],
        exportSymbols: ['defaultExport', 'handler'],
      };

      addNode(newNodeData);

      const newFlowNode: Node = {
        id: newNodeId,
        type: item.type,
        position,
        data: newNodeData,
        draggable: true,
      };

      setNodes((nds) => [...nds, newFlowNode]);
      selectNode(newNodeId);
    },
    [screenToFlowPosition, addNode, selectNode, setNodes]
  );

  // Auto Tidy Layout Algorithm
  const handleTidyLayout = useCallback(() => {
    const layouted = computeTidyLayout(nodes, edges);
    setNodes(layouted);
    setTimeout(() => fitView({ duration: 400, padding: 0.2 }), 50);
  }, [nodes, edges, setNodes, fitView]);

  // Context Menu handlers
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
      className="relative w-full h-full bg-[#08090d] border border-[#222638] rounded-xl overflow-hidden shadow-2xl min-w-0"
      onContextMenu={onContextMenu}
      onClick={closeContextMenu}
    >
      {/* Top Floating Action & Search Bar */}
      <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 bg-[#0e1017]/95 backdrop-blur-md border border-[#222638] px-2.5 sm:px-3 py-1.5 rounded-lg shadow-lg">
          <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search AST nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-28 xs:w-40 sm:w-56 font-mono"
          />
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0e1017]/95 backdrop-blur-md border border-[#222638] p-1 rounded-lg shadow-lg flex-wrap">
          <button
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
              isPaletteOpen
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-[#161b22] text-zinc-300 hover:bg-[#1c2128] border border-[#30363d]'
            }`}
            title="Open Node Palette"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Add Node</span>
          </button>

          <button
            onClick={handleTidyLayout}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[#161b22] text-zinc-300 hover:bg-[#1c2128] border border-[#30363d] transition-all"
            title="Auto-arrange graph layout"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Auto Tidy</span>
          </button>

          <button
            onClick={resetGraph}
            className="p-1.5 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-zinc-200 transition-all"
            title="Reset Graph"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Node Palette Side Drawer */}
      <NodePaletteDrawer
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      {/* React Flow Viewport Canvas */}
      <div className="w-full h-full" onDragOver={onDragOver} onDrop={onDrop}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[15, 15]}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.2}
          maxZoom={2.4}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#212638" />

          {/* Floating Zoom & Control Panel */}
          <Panel position="bottom-left" className="!m-3 sm:!m-4">
            <div className="flex flex-col gap-1 bg-[#0e1017]/95 backdrop-blur-md p-1 rounded-lg border border-[#30363d] shadow-xl">
              <button
                onClick={() => zoomIn()}
                className="p-1.5 sm:p-2 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-1.5 sm:p-2 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => fitView({ duration: 300, padding: 0.2 })}
                className="p-1.5 sm:p-2 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] rounded text-zinc-400 hover:text-cyan-300 transition-all"
                title="Fit View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </Panel>

          {/* MiniMap (Visible on MD and larger screens) */}
          <div className="hidden md:block">
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
              zoomable
              pannable
            />
          </div>
        </ReactFlow>
      </div>

      {/* Context Menu (Right Click on Canvas) */}
      {contextMenu && (
        <div
          className="fixed z-50 w-44 sm:w-48 bg-[#0e1017] border border-[#30363d] rounded-lg shadow-2xl p-1 font-mono text-xs text-zinc-200"
          style={{ top: contextMenu.y, left: Math.min(contextMenu.x, window.innerWidth - 180) }}
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
        <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] sm:w-[90%] max-w-xl bg-[#0e1017]/95 backdrop-blur-md border border-cyan-500/40 rounded-xl p-3 sm:p-3.5 shadow-2xl transition-all">
          <div className="flex items-center justify-between pb-2 border-b border-[#222638]">
            <div className="flex items-center gap-2 truncate">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-mono text-xs font-semibold text-zinc-100 truncate">
                {selectedNode.label} ({selectedNode.path})
              </span>
            </div>
            <button
              onClick={() => selectNode(null)}
              className="text-xs text-zinc-500 hover:text-zinc-300 font-mono p-1"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2.5 font-mono text-[10px] sm:text-[11px]">
            <div className="bg-[#161b22] p-1.5 sm:p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block text-[9px]">Type</span>
              <span className="text-cyan-400 font-bold capitalize truncate">{selectedNode.type}</span>
            </div>
            <div className="bg-[#161b22] p-1.5 sm:p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block text-[9px]">Raw Tokens</span>
              <span className="text-emerald-400 font-bold">{selectedNode.tokenCount}</span>
            </div>
            <div className="bg-[#161b22] p-1.5 sm:p-2 rounded border border-[#30363d]">
              <span className="text-zinc-500 block text-[9px]">TokenFold</span>
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
