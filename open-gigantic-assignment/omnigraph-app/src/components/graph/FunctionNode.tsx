'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Code2, Zap, CornerDownRight } from 'lucide-react';
import { OGNodeData } from '@/lib/types';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface NodeProps {
  id: string;
  data: OGNodeData;
  selected?: boolean;
}

export const FunctionNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const selectNode = useOmniStore(state => state.selectNode);

  const isModified = data.status === 'modified';
  const isVerified = data.status === 'verified';

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative min-w-[200px] rounded-md bg-[#12141c] p-2 text-white transition-all duration-200 border cursor-pointer ${
        isModified
          ? 'border-amber-400/90 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
          : isVerified
          ? 'border-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.3)]'
          : selected
          ? 'border-indigo-400 ring-1 ring-indigo-400/50'
          : 'border-[#222638] hover:border-zinc-500'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-indigo-400 !w-2 !h-2" />

      <div className="flex items-center justify-between pb-1 border-b border-[#222638]">
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3 h-3 text-indigo-400" />
          <span className="font-mono text-[11px] font-semibold text-zinc-200">
            {data.signatures[0]?.name || data.label}
          </span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 rounded">
          {data.compressedTokens}t
        </span>
      </div>

      <div className="pt-1 text-[9px] font-mono text-zinc-400">
        <div className="text-zinc-500 truncate">
          {data.signatures[0]?.params?.join(', ') || '()'} &rarr; {data.signatures[0]?.returnType || 'void'}
        </div>
        <div className="flex justify-between items-center text-zinc-500 pt-0.5">
          <span>Lines: {data.signatures[0]?.lineStart}-{data.signatures[0]?.lineEnd}</span>
          {isModified && <span className="text-amber-400 font-bold">MUTATED</span>}
          {isVerified && <span className="text-emerald-400 font-bold">VERIFIED</span>}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-indigo-400 !w-2 !h-2" />
    </div>
  );
};
