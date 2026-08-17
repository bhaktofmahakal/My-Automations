'use client';

import React from 'react';
import { BarChart2 } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const SWEBenchCard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Header ── */}
      <div className="px-5 py-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <BarChart2 className="w-4 h-4 text-[#e6edf3]" />
          <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
            SWE-bench Lite
          </h2>
        </div>
        <p className="text-xs text-[#8b949e] mt-0.5">
          Median execution cost (USD)
        </p>
      </div>

      {/* ── Main Comparison Bars ── */}
      <div className="flex-1 flex flex-col justify-center px-5 py-3 space-y-4">

        {/* 1. Claude Code baseline Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b949e] font-medium">Claude Code baseline</span>
            <span className="text-xs font-mono font-bold text-[#f85149]">$0.104</span>
          </div>

          <div className="relative h-3 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#f85149] rounded-full transition-all duration-700"
              style={{ width: `${(0.104 / 0.12) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#6e7681] font-mono px-0.5">
            <span>0</span>
            <span>0.12</span>
          </div>
        </div>

        {/* 2. OmniGraph Studio Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8b949e] font-medium">OmniGraph Studio</span>
            <span className="text-xs font-mono font-bold text-[#3fb950]">$0.065</span>
          </div>

          <div className="relative h-3 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#3fb950] rounded-full transition-all duration-700"
              style={{ width: `${(0.065 / 0.12) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#6e7681] font-mono px-0.5">
            <span>0</span>
            <span>0.12</span>
          </div>
        </div>
      </div>

      {/* ── Savings Summary Box ── */}
      <div className="mt-auto px-5 py-3 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between">
        <div className="text-xs font-medium text-[#e6edf3]">
          Savings
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-[#3fb950] font-mono leading-none">
            37.5%
          </div>
          <span className="text-[10px] text-[#8b949e]">Lower median cost</span>
        </div>
      </div>
    </div>
  );
};
