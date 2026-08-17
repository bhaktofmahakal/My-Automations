'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Layers, ChevronRight, ChevronDown, Lock } from 'lucide-react';
import { OGNodeData } from '@/lib/types';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface NodeProps {
  id: string;
  data: OGNodeData;
  selected?: boolean;
}

export const ModuleNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const toggleNodeExpansion = useOmniStore(state => state.toggleNodeExpansion);
  const selectNode = useOmniStore(state => state.selectNode);

  const getStatusBorder = () => {
    if (data.status === 'scanning') return 'border-cyan-400 ring-2 ring-cyan-400/30';
    if (data.status === 'verified') return 'border-emerald-400 ring-2 ring-emerald-400/30';
    if (data.status === 'modified') return 'border-amber-400 ring-2 ring-amber-400/30';
    if (selected) return 'border-indigo-400 ring-2 ring-indigo-400/40';
    return 'border-[#222638] hover:border-[#38bdf8]/60';
  };

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative min-w-[240px] rounded-lg bg-[#0e1017] p-3 text-white transition-all duration-200 border ${getStatusBorder()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2.5 !h-2.5" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-tight text-zinc-100">
            {data.label}
          </span>
        </div>

        {data.lockedBy && (
          <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
            <Lock className="w-2.5 h-2.5" /> {data.lockedBy}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
        <div className="flex justify-between items-center font-mono">
          <span className="text-zinc-500">Path:</span>
          <span className="text-zinc-300 truncate max-w-[140px]">{data.path}</span>
        </div>
        <div className="flex justify-between items-center font-mono">
          <span className="text-zinc-500">Raw / Compressed:</span>
          <span className="text-zinc-300">
            <span className="line-through text-zinc-500">{data.tokenCount}t</span>{' '}
            <span className="text-emerald-400 font-bold">{data.compressedTokens}t</span>
          </span>
        </div>

        {data.exportSymbols && data.exportSymbols.length > 0 && (
          <div className="pt-1 flex flex-wrap gap-1">
            {data.exportSymbols.slice(0, 3).map((sym, i) => (
              <span
                key={i}
                className="font-mono text-[9px] bg-[#141722] text-cyan-300 px-1.5 py-0.5 rounded border border-[#222638]"
              >
                {sym}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expand / Progressive Disclosure Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleNodeExpansion(id);
        }}
        className="mt-2.5 w-full flex items-center justify-center gap-1 py-1 rounded bg-[#141722] hover:bg-[#1a1e2d] text-[10px] font-mono text-zinc-300 transition-colors border border-[#222638]"
      >
        {data.isExpanded ? (
          <>
            <ChevronDown className="w-3 h-3 text-cyan-400" />
            <span>Collapse AST Subgraph</span>
          </>
        ) : (
          <>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
            <span>Expand AST Subgraph ({data.childrenIds?.length || 4} nodes)</span>
          </>
        )}
      </button>

      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2.5 !h-2.5" />
    </div>
  );
};
