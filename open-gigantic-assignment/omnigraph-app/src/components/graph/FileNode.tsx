'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileCode, ChevronRight, ChevronDown, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';
import { OGNodeData } from '@/lib/types';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface NodeProps {
  id: string;
  data: OGNodeData;
  selected?: boolean;
}

export const FileNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const toggleNodeExpansion = useOmniStore(state => state.toggleNodeExpansion);
  const selectNode = useOmniStore(state => state.selectNode);
  const setActiveFileTab = useOmniStore(state => state.setActiveFileTab);

  const getStatusBadge = () => {
    switch (data.status) {
      case 'modified':
        return (
          <span className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
            <Edit3 className="w-2.5 h-2.5" /> Patch Buffered
          </span>
        );
      case 'verified':
        return (
          <span className="flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle2 className="w-2.5 h-2.5" /> Verified
          </span>
        );
      case 'traversed':
        return (
          <span className="flex items-center gap-1 text-[9px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">
            Disclosed
          </span>
        );
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    if (data.status === 'modified') return 'border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
    if (data.status === 'verified') return 'border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
    if (selected) return 'border-indigo-400 ring-2 ring-indigo-400/40';
    return 'border-[#222638] hover:border-zinc-500';
  };

  return (
    <div
      onClick={() => {
        selectNode(id);
        setActiveFileTab(data.label);
      }}
      className={`relative min-w-[220px] rounded-lg bg-[#0e1017] p-2.5 text-white transition-all duration-200 border cursor-pointer ${getBorderColor()}`}
    >
      <Handle type="target" position={Position.Top} className="!bg-emerald-400 !w-2 !h-2" />

      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-[#222638]">
        <div className="flex items-center gap-1.5">
          <FileCode className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono text-xs font-medium text-zinc-100">{data.label}</span>
        </div>
        {getStatusBadge()}
      </div>

      {/* AST Signatures summary */}
      <div className="py-1.5 text-[10px] font-mono text-zinc-400 space-y-0.5">
        <div className="flex justify-between">
          <span className="text-zinc-500">Signatures:</span>
          <span className="text-zinc-300">{data.signatures.length} AST Nodes</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Token Cost:</span>
          <span className="text-emerald-400 font-bold">{data.compressedTokens} tokens</span>
        </div>
      </div>

      {/* Progressive toggle */}
      {data.signatures.length > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleNodeExpansion(id);
          }}
          className="w-full flex items-center justify-center gap-1 py-0.5 rounded bg-[#141722] hover:bg-[#1a1e2d] text-[9px] font-mono text-zinc-300 transition-colors border border-[#222638]"
        >
          {data.isExpanded ? (
            <>
              <ChevronDown className="w-2.5 h-2.5 text-emerald-400" />
              <span>Hide AST Items</span>
            </>
          ) : (
            <>
              <ChevronRight className="w-2.5 h-2.5 text-emerald-400" />
              <span>Reveal {data.signatures.length} Functions</span>
            </>
          )}
        </button>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-emerald-400 !w-2 !h-2" />
    </div>
  );
};
