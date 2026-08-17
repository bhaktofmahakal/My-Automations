'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Zap, DollarSign, Cpu, TrendingDown, Layers, BarChart3 } from 'lucide-react';

export const TokenTelemetry: React.FC = () => {
  const telemetry = useOmniStore(state => state.telemetry);
  const activeScenario = useOmniStore(state => state.activeScenario);

  return (
    <div className="bg-[#0e1017] border border-[#222638] rounded-xl p-4 text-white shadow-xl font-mono space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
              TokenFold Context Telemetry
            </h3>
            <p className="text-[10px] text-zinc-400">
              60&ndash;80% Token Reduction vs Linear Injection
            </p>
          </div>
        </div>

        {/* Savings Gauge */}
        <div className="flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold shadow-[0_0_12px_rgba(52,211,153,0.2)]">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>-{telemetry.savingsPercentage}% TOKENS</span>
        </div>
      </div>

      {/* Main Metric Comparison Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Superbrain OmniGraph Usage */}
        <div className="p-3 rounded-lg bg-[#141722] border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-400 font-bold block flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SUPERBRAIN TOKENFOLD
          </span>
          <div className="text-lg font-bold text-zinc-100">
            {telemetry.totalInputTokens.toLocaleString()}{' '}
            <span className="text-[11px] font-normal text-zinc-400">tokens</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-1 border-t border-[#222638]">
            <span>Inference Cost:</span>
            <span className="text-emerald-400 font-bold">${telemetry.currentCostUSD.toFixed(3)}</span>
          </div>
        </div>

        {/* Traditional Baseline */}
        <div className="p-3 rounded-lg bg-[#090a0f] border border-[#222638] space-y-1 opacity-80">
          <span className="text-[10px] text-zinc-400 font-bold block">
            LINEAR RAG / CLAUDE CODE
          </span>
          <div className="text-lg font-bold text-zinc-400 line-through">
            {telemetry.linearBaselineTokens.toLocaleString()}{' '}
            <span className="text-[11px] font-normal text-zinc-500">tokens</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 border-t border-[#1e2233]">
            <span>Baseline Cost:</span>
            <span className="text-rose-400 font-bold">${telemetry.baselineCostUSD.toFixed(3)}</span>
          </div>
        </div>
      </div>

      {/* Granular Telemetry Progress Bar */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>Context Window Utilization:</span>
          <span className="text-cyan-400 font-bold">
            {Math.round((telemetry.totalInputTokens / telemetry.linearBaselineTokens) * 100)}% of Baseline
          </span>
        </div>
        <div className="h-2 w-full bg-[#141722] rounded-full overflow-hidden border border-[#222638]">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 rounded-full"
            style={{
              width: `${Math.min(100, Math.max(10, Math.round((telemetry.totalInputTokens / telemetry.linearBaselineTokens) * 100)))}%`,
            }}
          />
        </div>
      </div>

      {/* Subgraph Traversal Stats */}
      <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 pt-2 border-t border-[#222638]">
        <div className="p-2 rounded bg-[#141722] border border-[#222638]">
          <span className="text-zinc-500 block">AST DISCLOSED</span>
          <span className="text-zinc-200 font-bold">{telemetry.activeGraphNodes} / {telemetry.totalGraphNodes} nodes</span>
        </div>
        <div className="p-2 rounded bg-[#141722] border border-[#222638]">
          <span className="text-zinc-500 block">TRAVERSAL HOPS</span>
          <span className="text-cyan-400 font-bold">{telemetry.traversalHops} queries</span>
        </div>
        <div className="p-2 rounded bg-[#141722] border border-[#222638]">
          <span className="text-zinc-500 block">COMPRESSION</span>
          <span className="text-emerald-400 font-bold">{telemetry.compressionRatio}x speedup</span>
        </div>
      </div>
    </div>
  );
};
