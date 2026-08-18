'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const TokenTelemetry: React.FC = () => {
  const telemetry = useOmniStore(state => state.telemetry);

  // SVG circular donut constants
  const size = 120;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round(telemetry.savingsPercentage || 72);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none p-3 justify-between">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#e6edf3]" />
          <h2 className="text-xs font-semibold text-[#e6edf3] tracking-tight">
            Token Telemetry
          </h2>
        </div>
      </div>

      {/* ── Center Donut Chart ── */}
      <div className="flex-1 flex flex-col items-center justify-center py-1">
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
            <span className="text-2xl font-bold text-[#e6edf3] tracking-tight leading-none">
              {percentage}%
            </span>
            <span className="text-[9px] font-semibold text-[#8b949e] tracking-wider mt-0.5">
              TOKENS SAVED
            </span>
          </div>
        </div>
      </div>

      {/* ── Comparison Cards Grid ── */}
      <div className="grid grid-cols-2 gap-2 text-[11px] my-1">
        {/* Baseline (Claude Code) */}
        <div className="p-2 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[10px] text-[#8b949e] font-medium truncate">
            Baseline (Claude Code)
          </span>
          <span className="text-xs font-bold text-[#f85149] font-mono mt-0.5">
            ${telemetry.baselineCostUSD ? telemetry.baselineCostUSD.toFixed(3) : '0.104'}
          </span>
          <span className="text-[9px] text-[#6e7681]">per task</span>
        </div>

        {/* OmniGraph Studio */}
        <div className="p-2 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[10px] text-[#8b949e] font-medium truncate">
            OmniGraph Studio
          </span>
          <span className="text-xs font-bold text-[#3fb950] font-mono mt-0.5">
            ${telemetry.currentCostUSD ? telemetry.currentCostUSD.toFixed(3) : '0.065'}
          </span>
          <span className="text-[9px] text-[#6e7681]">per task</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="pt-2 border-t border-[#30363d] flex items-center justify-between text-xs font-mono">
        <span className="text-[#8b949e] text-[11px]">Est. monthly savings</span>
        <span className="text-xs font-bold text-[#3fb950]">$1,248.60</span>
      </div>
    </div>
  );
};
