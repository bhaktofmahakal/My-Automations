'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle, FlaskConical, ShieldAlert } from 'lucide-react';
import { OGNodeData } from '@/lib/types';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface NodeProps {
  id: string;
  data: OGNodeData;
  selected?: boolean;
}

export const AssertionNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const selectNode = useOmniStore(state => state.selectNode);

  const isPassing = data.status === 'verified' || data.status === 'tested';

  return (
    <div
      onClick={() => selectNode(id)}
      className={`relative min-w-[200px] rounded-md bg-[#0d141f] p-2 text-white transition-all duration-200 border cursor-pointer ${
        isPassing
          ? 'border-emerald-500/80 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
          : selected
          ? 'border-amber-400 ring-1 ring-amber-400/50'
          : 'border-[#222638] hover:border-zinc-500'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-2 !h-2" />

      <div className="flex items-center justify-between pb-1 border-b border-[#222638]">
        <div className="flex items-center gap-1.5">
          <FlaskConical className="w-3 h-3 text-amber-400" />
          <span className="font-mono text-[11px] font-semibold text-amber-200 truncate max-w-[130px]">
            {data.label}
          </span>
        </div>
        {isPassing ? (
          <CheckCircle className="w-3 h-3 text-emerald-400" />
        ) : (
          <span className="text-[9px] font-mono text-amber-400">SWE-bench</span>
        )}
      </div>

      <div className="pt-1 text-[9px] font-mono text-zinc-400">
        <div className="text-zinc-500 truncate">{data.description || 'Automated assertion fixture'}</div>
        <div className="flex justify-between items-center text-zinc-500 pt-0.5">
          <span>Target: {data.signatures[0]?.returnType || 'void'}</span>
          <span className="text-emerald-400">{data.compressedTokens}t</span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-2 !h-2" />
    </div>
  );
};
