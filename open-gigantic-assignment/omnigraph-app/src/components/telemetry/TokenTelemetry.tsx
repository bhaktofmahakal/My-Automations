'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const TokenTelemetry: React.FC = () => {
  const telemetry = useOmniStore(state => state.telemetry);

  // SVG circular donut constants
  const size = 150;
  const strokeWidth = 14;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = 72; // 72% tokens saved
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-4 h-4 text-[#e6edf3]" />
          <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
            Token Telemetry
          </h2>
        </div>
      </div>

      {/* ── Center Donut Chart ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-3">
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Track Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#21262d"
              strokeWidth={strokeWidth}
            />
            {/* Emerald Value Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#3fb950"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out filter drop-shadow-[0_0_8px_rgba(63,185,80,0.4)]"
            />
          </svg>

          {/* Center Text inside Donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-[#e6edf3] tracking-tight leading-none">
              72%
            </span>
            <span className="text-[10px] font-semibold text-[#8b949e] tracking-wider mt-1">
              TOKENS SAVED
            </span>
          </div>
        </div>
      </div>

      {/* ── Comparison Cards Grid ── */}
      <div className="px-5 py-2 grid grid-cols-2 gap-3 text-xs">
        {/* Baseline (Claude Code) */}
        <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[11px] text-[#8b949e] font-medium truncate">
            Baseline (Claude Code)
          </span>
          <span className="text-lg font-bold text-[#f85149] font-mono mt-0.5">
            $0.104
          </span>
          <span className="text-[10px] text-[#6e7681]">per task</span>
        </div>

        {/* OmniGraph Studio */}
        <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[11px] text-[#8b949e] font-medium truncate">
            OmniGraph Studio
          </span>
          <span className="text-lg font-bold text-[#3fb950] font-mono mt-0.5">
            $0.065
          </span>
          <span className="text-[10px] text-[#6e7681]">per task</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-5 py-2.5 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between text-xs font-mono">
        <span className="text-[#8b949e]">Est. monthly savings</span>
        <span className="text-sm font-bold text-[#3fb950]">$1,248.60</span>
      </div>
    </div>
  );
};
