'use client';

import React, { useState } from 'react';
import { BarChart3, Cpu } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const TokenTelemetry: React.FC = () => {
  const telemetry = useOmniStore(state => state.telemetry);
  const [monthlyPRs, setMonthlyPRs] = useState(100);

  // SVG circular donut constants
  const size = 120;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round(telemetry.savingsPercentage || 72);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Dynamic cost calculations based on slider
  const baselineCostPerPR = telemetry.baselineCostUSD || 0.104;
  const optimizedCostPerPR = telemetry.currentCostUSD || 0.065;
  const monthlySavings = ((baselineCostPerPR - optimizedCostPerPR) * monthlyPRs);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-y-auto custom-scrollbar select-none p-3 sm:p-4 justify-between space-y-3 min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between pb-1 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">
            Token Telemetry
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#8b949e] font-mono shrink-0">
          <Cpu className="w-3 h-3 text-[#58a6ff]" />
          <span>{telemetry.totalGraphNodes} nodes · {telemetry.traversalHops} hops</span>
        </div>
      </div>

      {/* ── Center Donut Chart ── */}
      <div className="flex-1 flex flex-col items-center justify-center py-2 min-h-[140px]">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-1">
            <span className="text-xl sm:text-2xl font-bold text-[#e6edf3] tracking-tight leading-none font-mono">
              {percentage}%
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold text-[#8b949e] tracking-wider mt-0.5">
              TOKENS SAVED
            </span>
          </div>
        </div>
      </div>

      {/* ── Comparison Cards Grid ── */}
      <div className="grid grid-cols-2 gap-2 text-[11px] shrink-0">
        {/* Baseline (Claude Code) */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[10px] text-[#8b949e] font-medium truncate">
            Claude Code Baseline
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#f85149] font-mono mt-0.5">
            ${baselineCostPerPR.toFixed(3)}
          </span>
          <span className="text-[9px] text-[#6e7681]">per task</span>
        </div>

        {/* OmniGraph Studio */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex flex-col">
          <span className="text-[10px] text-[#8b949e] font-medium truncate">
            OmniGraph Studio
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#3fb950] font-mono mt-0.5">
            ${optimizedCostPerPR.toFixed(3)}
          </span>
          <span className="text-[9px] text-[#6e7681]">per task</span>
        </div>
      </div>

      {/* ── Interactive Monthly PR Volume Slider ── */}
      <div className="space-y-1.5 pt-2 border-t border-[#30363d] shrink-0">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
          <span className="text-[#8b949e]">Monthly PR Volume</span>
          <span className="text-[#58a6ff] font-bold">{monthlyPRs} PRs/mo</span>
        </div>
        <input
          type="range"
          min={10}
          max={1000}
          step={10}
          value={monthlyPRs}
          onChange={(e) => setMonthlyPRs(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#21262d] accent-[#3fb950]"
          aria-label="Monthly PR Volume Slider"
        />
        <div className="flex justify-between text-[9px] text-[#6e7681] font-mono">
          <span>10</span>
          <span>500</span>
          <span>1,000</span>
        </div>
      </div>

      {/* ── Dynamic Savings Footer ── */}
      <div className="pt-2 border-t border-[#30363d] grid grid-cols-2 gap-2 text-xs font-mono shrink-0">
        <div className="flex flex-col">
          <span className="text-[#8b949e] text-[10px]">Monthly Savings</span>
          <span className="text-xs sm:text-sm font-bold text-[#3fb950]">
            ${monthlySavings.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[#8b949e] text-[10px]">Annual Savings</span>
          <span className="text-xs sm:text-sm font-bold text-[#3fb950]">
            ${annualSavings.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
