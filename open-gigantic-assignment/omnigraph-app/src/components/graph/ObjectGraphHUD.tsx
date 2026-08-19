'use client';

import React, { useState } from 'react';
import { Box, FileCode, Code2, ShieldCheck, ChevronDown, Crosshair, ChevronRight, Share2, ArrowDown, ArrowRight } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const ObjectGraphHUD: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('function');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const nodes = useOmniStore(state => state.nodes);
  const selectedNodeId = useOmniStore(state => state.selectedNodeId);
  const telemetry = useOmniStore(state => state.telemetry);
  const selectNode = useOmniStore(state => state.selectNode);
  const toggleNodeExpansion = useOmniStore(state => state.toggleNodeExpansion);

  const focusTarget = () => selectedNodeId ?? nodes.find(n => n.isLoaded)?.id ?? null;

  const handleExpandChildren = () => {
    const target = focusTarget() ?? nodes[0]?.id ?? null;
    if (target) {
      toggleNodeExpansion(target);
    }
  };

  const handleFocusNode = () => {
    const target = focusTarget() ?? nodes[0]?.id ?? selectedNode;
    selectNode(target);
    requestAnimationFrame(() => {
      document.getElementById(`og-node-${target}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const activeNode = nodes.find(n => n.id === selectedNodeId);
  const activePath = activeNode?.path ?? 'Repository Root';

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none min-w-0">
      {/* ── Top Header ── */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">
            Object Graph HUD
          </h2>
        </div>

        {/* Live Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b3127] border border-[#238636] text-[#3fb950] text-xs font-semibold shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
          <span>LIVE</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-[#3fb950]" />
        </div>
      </div>

      {/* ── Subtitle / Breadcrumb Row ── */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 pt-3 pb-2 gap-2 shrink-0">
        <div>
          <span className="text-[11px] sm:text-xs text-[#8b949e] font-medium block">AST Traversal</span>
          <span className="text-xs font-mono text-[#e6edf3]">{activePath}</span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16291e] border border-[#238636]/60 text-[#3fb950] text-xs font-mono font-medium shrink-0">
          <span>{telemetry.tokensSaved > 0 ? telemetry.tokensSaved.toLocaleString() : '0'} tokens saved</span>
          <span className="text-[13px] font-bold">↗</span>
        </div>
      </div>

      {/* ── Main Interactive Graph Visual ── */}
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 overflow-y-auto custom-scrollbar min-h-[220px]">
        {/* Node Chain Layout: Stack on mobile, Horizontal on SM+ */}
        <div className="relative w-full max-w-xl flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-1 my-auto">

          {/* Node 1: Module */}
          <div
            id="og-node-module"
            onClick={() => { setSelectedNode('module'); selectNode(nodes.find(n => n.type === 'module')?.id ?? 'module'); }}
            className={`cursor-pointer flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#0d1117] transition-all shrink-0 ${
              selectedNode === 'module'
                ? 'border-2 border-[#3fb950] shadow-[0_0_16px_rgba(63,185,80,0.35)]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <Box className="w-5 h-5 sm:w-6 sm:h-6 text-[#3fb950] mb-1" />
            <span className="text-xs font-semibold text-[#e6edf3]">Module</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#8b949e]">src/engine</span>
          </div>

          {/* Connector 1 */}
          <div className="flex items-center justify-center text-[#3fb950]">
            <ArrowRight className="w-4 h-4 hidden sm:block" />
            <ArrowDown className="w-4 h-4 sm:hidden" />
          </div>

          {/* Node 2: File */}
          <div
            id="og-node-file"
            onClick={() => { setSelectedNode('file'); selectNode(nodes.find(n => n.type === 'file')?.id ?? 'file'); }}
            className={`cursor-pointer flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#0d1117] transition-all shrink-0 ${
              selectedNode === 'file'
                ? 'border-2 border-[#3fb950] shadow-[0_0_16px_rgba(63,185,80,0.35)]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-[#3fb950] mb-1" />
            <span className="text-xs font-semibold text-[#e6edf3]">File</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#8b949e]">{nodes.find(n => n.type === 'file')?.label ?? 'runner.ts'}</span>
          </div>

          {/* Connector 2 */}
          <div className="flex items-center justify-center text-[#3fb950]">
            <ArrowRight className="w-4 h-4 hidden sm:block" />
            <ArrowDown className="w-4 h-4 sm:hidden" />
          </div>

          {/* Node 3: Function */}
          <div
            id="og-node-function"
            onClick={() => { setSelectedNode('function'); selectNode(nodes.find(n => n.type === 'function')?.id ?? 'function'); }}
            className={`cursor-pointer flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#0d1117] transition-all shrink-0 ${
              selectedNode === 'function'
                ? 'border-2 border-[#3fb950] shadow-[0_0_20px_rgba(63,185,80,0.4)] ring-1 ring-[#3fb950]'
                : 'border border-[#3fb950]/80 shadow-[0_0_10px_rgba(63,185,80,0.15)]'
            }`}
          >
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#3fb950] mb-1" />
            <span className="text-xs font-semibold text-[#e6edf3]">Function</span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#8b949e]">{nodes.find(n => n.type === 'function')?.label ?? 'executeTask'}</span>
          </div>

          {/* Connector 3 */}
          <div className="flex items-center justify-center text-[#8b949e]">
            <ArrowRight className="w-4 h-4 hidden sm:block" />
            <ArrowDown className="w-4 h-4 sm:hidden" />
          </div>

          {/* Node 4: Assertion */}
          <div
            id="og-node-assertion"
            onClick={() => { setSelectedNode('assertion'); selectNode(nodes.find(n => n.type === 'assertion')?.id ?? 'assertion'); }}
            className={`cursor-pointer flex flex-col items-center justify-center w-24 h-20 sm:w-28 sm:h-24 rounded-xl bg-[#0d1117] border transition-all shrink-0 ${
              selectedNode === 'assertion'
                ? 'border-2 border-[#58a6ff] shadow-[0_0_16px_rgba(88,166,255,0.3)]'
                : 'border-[#30363d] hover:border-[#8b949e]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b949e] mb-1" />
            <span className="text-xs font-semibold text-[#e6edf3]">Assertion</span>
            <span className="text-[8px] sm:text-[9px] font-mono text-[#8b949e]">{nodes.find(n => n.type === 'assertion')?.label ?? 'expect(result)'}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div className="mt-auto px-3 sm:px-5 py-2.5 sm:py-3 border-t border-[#30363d] bg-[#161b22] flex flex-wrap items-center justify-between text-xs gap-2 shrink-0">
        {/* Left: Progressive Disclosure & Legend */}
        <div className="flex flex-col gap-1">
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] cursor-pointer font-medium"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            <span>Progressive Disclosure</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-[#8b949e] pl-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
              Active Path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#484f58]" />
              Discovered
            </span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExpandChildren}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] font-medium transition-colors text-xs min-h-[32px]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Expand Children</span>
          </button>
          <button
            onClick={handleFocusNode}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] font-medium transition-colors text-xs min-h-[32px]"
          >
            <Crosshair className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Focus Node</span>
          </button>
        </div>
      </div>
    </div>
  );
};
