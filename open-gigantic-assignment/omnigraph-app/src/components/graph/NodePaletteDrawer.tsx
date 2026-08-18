'use client';

import React from 'react';
import { Box, FileCode, Code, CheckSquare, Bot, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export interface DragNodeItem {
  type: string;
  label: string;
  category: 'ast' | 'agent' | 'security';
  description: string;
  icon: React.ReactNode;
}

export const DRAGGABLE_NODES: DragNodeItem[] = [
  {
    type: 'module',
    label: 'Module Node',
    category: 'ast',
    description: 'High-level package boundary (.og namespace)',
    icon: <Box className="w-4 h-4 text-cyan-400" />,
  },
  {
    type: 'file',
    label: 'File AST Node',
    category: 'ast',
    description: 'Source code file unit with TokenFold footprint',
    icon: <FileCode className="w-4 h-4 text-emerald-400" />,
  },
  {
    type: 'function',
    label: 'Function Symbol',
    category: 'ast',
    description: 'Callable AST function / method definition',
    icon: <Code className="w-4 h-4 text-purple-400" />,
  },
  {
    type: 'assertion',
    label: 'Test Assertion',
    category: 'ast',
    description: 'SWE-bench test spec & regression assertion',
    icon: <CheckSquare className="w-4 h-4 text-amber-400" />,
  },
  {
    type: 'agent',
    label: 'PSMAS Agent Swarm',
    category: 'agent',
    description: 'Circular manifold LLM agent observer',
    icon: <Bot className="w-4 h-4 text-sky-400" />,
  },
  {
    type: 'security',
    label: 'Security Barrier',
    category: 'security',
    description: 'Invariant safety guardrail & audit filter',
    icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
  },
];

interface NodePaletteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NodePaletteDrawer: React.FC<NodePaletteDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const onDragStart = (event: React.DragEvent, nodeItem: DragNodeItem) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeItem));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="absolute top-14 left-4 z-30 w-72 bg-[#0e1017]/95 backdrop-blur-xl border border-[#30363d] rounded-xl p-3.5 shadow-2xl space-y-3 font-sans animate-slide-in">
      <div className="flex items-center justify-between pb-2 border-b border-[#21262d]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="font-mono text-xs font-bold text-zinc-100">Node Palette</h3>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
        >
          ✕
        </button>
      </div>

      <p className="text-[11px] text-zinc-400 font-mono">
        Drag & drop nodes directly onto the canvas to construct `.og` AST graphs.
      </p>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {DRAGGABLE_NODES.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item)}
            className="p-2.5 bg-[#161b22] hover:bg-[#1c2128] border border-[#30363d] hover:border-cyan-500/50 rounded-lg cursor-grab active:cursor-grabbing transition-all group flex items-start gap-2.5 select-none"
          >
            <div className="p-1.5 bg-[#0d1117] rounded border border-[#30363d] group-hover:border-cyan-500/40">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-zinc-200 group-hover:text-cyan-300">
                  {item.label}
                </span>
                <span className="text-[9px] font-mono uppercase px-1 py-0.2 bg-[#0d1117] text-zinc-500 rounded border border-[#30363d]">
                  {item.category}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 truncate">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
