'use client';

import React, { useState } from 'react';
import { Box, FileCode, Code2, ShieldCheck, ChevronDown, Crosshair, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const ObjectGraphHUD: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('function');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const telemetry = useOmniStore(state => state.telemetry);

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <div className="p-1 text-[#e6edf3]">
            <Share2 className="w-4 h-4 text-[#e6edf3]" />
          </div>
          <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
            Object Graph HUD
          </h2>
        </div>

        {/* Live Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b3127] border border-[#238636] text-[#3fb950] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
          <span>LIVE</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-[#3fb950]" />
        </div>
      </div>

      {/* ── Subtitle / Breadcrumb Row ── */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <div>
          <span className="text-xs text-[#8b949e] font-medium block">AST Traversal</span>
          <span className="text-xs font-mono text-[#e6edf3]">src/engine/runner.ts</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16291e] border border-[#238636]/60 text-[#3fb950] text-xs font-mono font-medium">
          <span>{telemetry.totalInputTokens > 0 ? (18420).toLocaleString() : '18,420'} tokens saved</span>
          <span className="text-[13px] font-bold">↗</span>
        </div>
      </div>

      {/* ── Main Interactive Graph Visual ── */}
      <div className="flex-1 relative flex items-center justify-center p-6 min-h-[220px]">
        {/* Node Chain Layout */}
        <div className="relative w-full max-w-xl flex items-center justify-between">

          {/* Node 1: Module */}
          <div
            onClick={() => setSelectedNode('module')}
            className={`cursor-pointer flex flex-col items-center justify-center w-28 h-28 rounded-xl bg-[#0d1117] transition-all ${
              selectedNode === 'module'
                ? 'border-2 border-[#3fb950] shadow-[0_0_16px_rgba(63,185,80,0.35)]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <Box className="w-6 h-6 text-[#3fb950] mb-1.5" />
            <span className="text-xs font-semibold text-[#e6edf3]">Module</span>
            <span className="text-[10px] font-mono text-[#8b949e] mt-0.5">src/engine</span>
          </div>

          {/* Connector Arrow 1 */}
          <div className="flex-1 flex items-center justify-center px-1">
            <div className="h-[2px] w-full bg-[#3fb950]" />
            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#3fb950]" />
          </div>

          {/* Node 2: File */}
          <div
            onClick={() => setSelectedNode('file')}
            className={`cursor-pointer flex flex-col items-center justify-center w-28 h-28 rounded-xl bg-[#0d1117] transition-all ${
              selectedNode === 'file'
                ? 'border-2 border-[#3fb950] shadow-[0_0_16px_rgba(63,185,80,0.35)]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <FileCode className="w-6 h-6 text-[#3fb950] mb-1.5" />
            <span className="text-xs font-semibold text-[#e6edf3]">File</span>
            <span className="text-[10px] font-mono text-[#8b949e] mt-0.5">runner.ts</span>
          </div>

          {/* Connector Arrow 2 */}
          <div className="flex-1 flex items-center justify-center px-1">
            <div className="h-[2px] w-full bg-[#3fb950]" />
            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#3fb950]" />
          </div>

          {/* Node 3: Function */}
          <div
            onClick={() => setSelectedNode('function')}
            className={`cursor-pointer flex flex-col items-center justify-center w-28 h-28 rounded-xl bg-[#0d1117] transition-all ${
              selectedNode === 'function'
                ? 'border-2 border-[#3fb950] shadow-[0_0_20px_rgba(63,185,80,0.4)] ring-1 ring-[#3fb950]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <Code2 className="w-6 h-6 text-[#3fb950] mb-1.5" />
            <span className="text-xs font-semibold text-[#e6edf3]">Function</span>
            <span className="text-[10px] font-mono text-[#8b949e] mt-0.5">executeTask</span>
          </div>

          {/* Dashed Connector down to Assertion */}
          <svg className="absolute right-14 top-1/2 w-28 h-32 pointer-events-none overflow-visible">
            <path
              d="M 0 0 C 30 0, 30 50, 45 50"
              fill="none"
              stroke="#30363d"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <polygon points="45,46 53,50 45,54" fill="#30363d" />
          </svg>

          {/* Node 4: Assertion (positioned below/right) */}
          <div
            onClick={() => setSelectedNode('assertion')}
            className={`absolute -bottom-16 right-0 cursor-pointer flex flex-col items-center justify-center w-28 h-20 rounded-xl bg-[#0d1117] border transition-all ${
              selectedNode === 'assertion'
                ? 'border-2 border-[#58a6ff] shadow-[0_0_16px_rgba(88,166,255,0.3)]'
                : 'border-[#30363d] hover:border-[#8b949e]'
            }`}
          >
            <ShieldCheck className="w-5 h-5 text-[#8b949e] mb-1" />
            <span className="text-xs font-semibold text-[#e6edf3]">Assertion</span>
            <span className="text-[9px] font-mono text-[#8b949e]">expect(result)</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="mt-auto px-5 py-3 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between text-xs">
        {/* Left: Progressive Disclosure & Legend */}
        <div className="flex flex-col gap-1">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer font-medium"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            <span>Progressive Disclosure</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#8b949e] pl-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
              Active Path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#484f58]" />
              Discovered Node
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] font-medium transition-colors text-xs">
            <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Expand Children</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] font-medium transition-colors text-xs">
            <Crosshair className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Focus Node</span>
          </button>
        </div>
      </div>
    </div>
  );
};
