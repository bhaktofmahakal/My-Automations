'use client';

import React from 'react';
import { BarChart2 } from 'lucide-react';

export const SWEBenchCard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none p-3 justify-between">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#e6edf3]" />
          <h2 className="text-xs font-semibold text-[#e6edf3] tracking-tight">
            SWE-bench Lite
          </h2>
        </div>
        <p className="text-[11px] text-[#8b949e] mt-0.5">
          Median execution cost (USD)
        </p>
      </div>

      {/* ── Main Comparison Bars ── */}
      <div className="space-y-2.5 my-1">
        {/* 1. Claude Code baseline Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium">Claude Code baseline</span>
            <span className="font-mono font-bold text-[#f85149] text-xs">$0.104</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#f85149] rounded-full transition-all duration-700"
              style={{ width: `${(0.104 / 0.12) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] text-[#6e7681] font-mono">
            <span>0</span>
            <span>0.12</span>
          </div>
        </div>

        {/* 2. OmniGraph Studio Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium">OmniGraph Studio</span>
            <span className="font-mono font-bold text-[#3fb950] text-xs">$0.065</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#3fb950] rounded-full transition-all duration-700"
              style={{ width: `${(0.065 / 0.12) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] text-[#6e7681] font-mono">
            <span>0</span>
            <span>0.12</span>
          </div>
        </div>
      </div>

      {/* ── Savings Summary Box ── */}
      <div className="pt-2 border-t border-[#30363d] flex items-center justify-between">
        <span className="text-xs font-medium text-[#e6edf3]">
          Savings
        </span>

        <div className="text-right">
          <div className="text-base font-bold text-[#3fb950] font-mono leading-none">
            37.5%
          </div>
          <span className="text-[10px] text-[#8b949e]">Lower median cost</span>
        </div>
      </div>
    </div>
  );
};
