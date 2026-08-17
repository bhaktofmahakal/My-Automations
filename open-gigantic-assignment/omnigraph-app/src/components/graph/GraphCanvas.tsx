'use client';

import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  Node,
  Edge,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { ModuleNode } from './ModuleNode';
import { FileNode } from './FileNode';
import { FunctionNode } from './FunctionNode';
import { AssertionNode } from './AssertionNode';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Search, Sparkles, Network, RefreshCw, ZoomIn, Info, ShieldCheck } from 'lucide-react';

const nodeTypes = {
  module: ModuleNode,
  file: FileNode,
  function: FunctionNode,
  assertion: AssertionNode,
};

// Initial layout positions for the nodes
const INITIAL_NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'mod-auth': { x: 320, y: 40 },
  'file-auth-ts': { x: 80, y: 190 },
  'file-jwt-ts': { x: 330, y: 190 },
  'file-session-ts': { x: 580, y: 190 },
  'file-auth-test-ts': { x: 830, y: 190 },
  'fn-authenticate': { x: 80, y: 360 },
  'fn-verifyjwt': { x: 330, y: 360 },
  'assert-session-bleed': { x: 830, y: 360 },
  'mod-security': { x: 320, y: 40 },
  'file-ratelimit-ts': { x: 320, y: 200 },
};

export const GraphCanvas: React.FC = () => {
  const nodesData = useOmniStore(state => state.nodes);
  const edgesData = useOmniStore(state => state.edges);
  const activePathEdgeIds = useOmniStore(state => state.activePathEdgeIds);
  const searchQuery = useOmniStore(state => state.searchQuery);
  const setSearchQuery = useOmniStore(state => state.setSearchQuery);
  const resetGraph = useOmniStore(state => state.resetGraph);
  const selectedNodeId = useOmniStore(state => state.selectedNodeId);
  const selectNode = useOmniStore(state => state.selectNode);
  const collaborators = useOmniStore(state => state.collaborators);

  // Transform store nodes to ReactFlow nodes
  const flowNodes: Node[] = useMemo(() => {
    return nodesData.map((n, idx) => {
      const defaultPos = INITIAL_NODE_POSITIONS[n.id] || {
        x: 100 + (idx % 3) * 260,
        y: 100 + Math.floor(idx / 3) * 160,
      };

      return {
        id: n.id,
        type: n.type,
        position: defaultPos,
        data: n,
        selected: selectedNodeId === n.id,
      };
    });
  }, [nodesData, selectedNodeId]);

  // Transform store edges to ReactFlow edges with dynamic active styling
  const flowEdges: Edge[] = useMemo(() => {
    return edgesData.map(e => {
      const isActive = activePathEdgeIds.includes(e.id);
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        type: 'smoothstep',
        animated: isActive || e.type === 'traversed',
        className: isActive ? 'active' : '',
        style: {
          stroke: isActive ? '#38bdf8' : '#2a2e42',
          strokeWidth: isActive ? 2.5 : 1.5,
        },
      };
    });
  }, [edgesData, activePathEdgeIds]);

  const selectedNode = useMemo(
    () => nodesData.find(n => n.id === selectedNodeId),
    [nodesData, selectedNodeId]
  );

  return (
    <div className="relative w-full h-full bg-[#08090d] border border-[#222638] rounded-xl overflow-hidden shadow-2xl">
      {/* Top Floating Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Search & Breadcrumb */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0e1017]/90 backdrop-blur-md border border-[#222638] px-3 py-1.5 rounded-lg shadow-lg">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search .og AST nodes, exports, symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-56 font-mono"
          />
        </div>

        {/* Live HUD Status Pill */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0e1017]/90 backdrop-blur-md border border-[#222638] px-3 py-1.5 rounded-lg shadow-lg">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ObjectGraph Engine</span>
            <span className="text-zinc-500">|</span>
            <span className="text-cyan-400 font-semibold">{nodesData.length} AST Nodes</span>
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

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onPaneClick={() => selectNode(null)}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#1f2438" />
        <Controls showInteractive={false} position="bottom-right" />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'module') return '#38bdf8';
            if (n.type === 'file') return '#34d399';
            if (n.type === 'assertion') return '#fbbf24';
            return '#818cf8';
          }}
          maskColor="rgba(8, 9, 13, 0.85)"
          className="!bg-[#0e1017] !border !border-[#222638] !rounded-lg"
          position="bottom-left"
        />

        {/* Multiplayer Live Collaborator Cursors Overlay */}
        <Panel position="top-left" className="!m-0 !p-0 pointer-events-none">
          {collaborators.map((collab) => (
            <div
              key={collab.id}
              className="absolute pointer-events-none transition-all duration-300 ease-out flex items-center gap-1"
              style={{
                transform: `translate(${collab.cursor.x}px, ${collab.cursor.y}px)`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M0 0L14 5.5L7.5 8L5.5 14.5L0 0Z"
                  fill={collab.color}
                  stroke="#08090d"
                  strokeWidth="1.5"
                />
              </svg>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded shadow text-white font-medium whitespace-nowrap"
                style={{ backgroundColor: collab.color }}
              >
                {collab.name}
              </span>
            </div>
          ))}
        </Panel>
      </ReactFlow>

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
              Close [ESC]
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2.5 text-[11px] font-mono text-zinc-300">
            <div className="bg-[#141722] p-2 rounded border border-[#222638]">
              <span className="text-zinc-500 block text-[9px]">RAW TOKEN FOOTPRINT</span>
              <span className="text-zinc-200 font-bold">{selectedNode.tokenCount} tokens</span>
            </div>
            <div className="bg-[#141722] p-2 rounded border border-[#222638]">
              <span className="text-zinc-500 block text-[9px]">TOKENFOLD COMPRESSED</span>
              <span className="text-emerald-400 font-bold">{selectedNode.compressedTokens} tokens</span>
            </div>
            <div className="bg-[#141722] p-2 rounded border border-[#222638]">
              <span className="text-zinc-500 block text-[9px]">EXECUTION STATUS</span>
              <span className="text-cyan-400 font-bold uppercase">{selectedNode.status}</span>
            </div>
          </div>

          {selectedNode.signatures.length > 0 && (
            <div className="mt-2 text-[10px] font-mono bg-[#141722] p-2 rounded border border-[#222638] max-h-24 overflow-y-auto">
              <span className="text-zinc-500 block mb-1">AST EXPORTS & METHODS:</span>
              {selectedNode.signatures.map((sig, i) => (
                <div key={i} className="text-zinc-300 flex justify-between py-0.5">
                  <span className="text-cyan-300 font-medium">{sig.name}</span>
                  <span className="text-zinc-500">{sig.kind} | {sig.tokenCost} tokens</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
