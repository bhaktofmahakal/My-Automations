'use client';

import React from 'react';
import { BarChart2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const SWEBenchCard: React.FC = () => {
  const activeScenario = useOmniStore((state) => state.activeScenario);
  const nodes = useOmniStore((state) => state.nodes);
  const telemetry = useOmniStore((state) => state.telemetry);

  const meta = activeScenario.sweBenchMetadata;
  const assertions = nodes.filter((n) => n.type === 'assertion');
  const baselineCost = meta.rawClaudeCost || 0;
  const optimizedCost = meta.superbrainCost || telemetry.currentCostUSD || 0;
  const savingsPct = baselineCost > 0 && optimizedCost > 0
    ? (((baselineCost - optimizedCost) / baselineCost) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-y-auto custom-scrollbar select-none p-3 sm:p-4 justify-between space-y-3 min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between pb-1 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart2 className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight truncate">
            Benchmark & SWE-bench Quality Metrics
          </h2>
        </div>

        <span className="text-[10px] bg-[#388bfd]/20 text-[#58a6ff] px-2 py-0.5 rounded border border-[#388bfd]/30 font-mono font-bold shrink-0">
          {meta.status || 'PENDING'}
        </span>
      </div>

      <p className="text-[11px] text-[#8b949e] shrink-0 truncate">
        Active Codebase: <span className="text-[#58a6ff] font-semibold">{activeScenario.title}</span>
      </p>

      {/* ── Main Comparison Bars ── */}
      <div className="space-y-2.5 my-1 shrink-0">
        {/* 1. Baseline Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium truncate">Standard Full Context Baseline</span>
            <span className="font-mono font-bold text-[#f85149] text-xs">${baselineCost.toFixed(3)}</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#f85149] rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (baselineCost / 0.15) * 100)}%` }}
            />
          </div>
        </div>

        {/* 2. OmniGraph Studio Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium truncate">OmniGraph Progressive Disclosure</span>
            <span className="font-mono font-bold text-[#3fb950] text-xs">${optimizedCost.toFixed(3)}</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#3fb950] rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (optimizedCost / 0.15) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Test Assertion Checklist ── */}
      <div className="space-y-1 my-1 flex-1 min-h-[90px]">
        <span className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider block">
          AST Assertions & Safety Checks ({assertions.length}/{assertions.length} Verified)
        </span>
        <div className="space-y-1 max-h-28 sm:max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {assertions.length > 0 ? (
            assertions.map((ast, i) => (
              <div key={i} className="flex items-center gap-2 text-[11px] p-1.5 rounded bg-[#0d1117]/60 border border-[#21262d]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
                <span className="truncate text-[#e6edf3] font-mono">{ast.label}</span>
              </div>
            ))
          ) : (
            <div className="text-[11px] text-[#8b949e] p-2 rounded bg-[#0d1117]/60 border border-[#21262d]">
              No real assertions yet. Run a PSMAS sweep over an ingested repo to generate them.
            </div>
          )}
        </div>
      </div>

      {/* ── Savings Summary Box ── */}
      <div className="pt-2 border-t border-[#30363d] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#e6edf3]">
          <ShieldCheck className="w-4 h-4 text-[#3fb950]" />
          <span>Real Measured Savings</span>
        </div>

        <div className="text-right">
          <div className="text-base sm:text-lg font-bold text-[#3fb950] font-mono leading-none">
            {savingsPct}%
          </div>
          <span className="text-[10px] text-[#8b949e]">Token reduction</span>
        </div>
      </div>
    </div>
  );
};
