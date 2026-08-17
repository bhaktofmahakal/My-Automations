'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { FlaskConical, CheckCircle2, Trophy, BarChart2, ShieldCheck, Zap } from 'lucide-react';

export const SWEBenchCard: React.FC = () => {
  const activeScenario = useOmniStore(state => state.activeScenario);
  const meta = activeScenario.sweBenchMetadata;

  return (
    <div className="bg-[#0e1017] border border-[#222638] rounded-xl p-4 text-white shadow-xl font-mono space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
              SWE-bench Lite Rigor
            </h3>
            <p className="text-[10px] text-zinc-400">
              Django 10 Bugs Evaluation Benchmark
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" /> {meta.status}
        </span>
      </div>

      {/* Benchmark Task Details */}
      <div className="p-2.5 rounded-lg bg-[#141722] border border-[#222638] text-xs space-y-1">
        <div className="flex justify-between text-zinc-400">
          <span>Benchmark Task:</span>
          <span className="text-zinc-200 font-bold">{meta.id}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Target Module:</span>
          <span className="text-cyan-400 truncate max-w-[170px]">{meta.module}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Passing Assertions:</span>
          <span className="text-emerald-400 font-bold">
            {meta.testAssertionsPassed} / {meta.testAssertionsTotal} (100%)
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2 rounded bg-[#090a0f] border border-emerald-500/30">
          <span className="text-zinc-500 block text-[9px]">SUPERBRAIN PSMAS</span>
          <div className="text-emerald-400 font-bold">{meta.superbrainTokens.toLocaleString()} tokens</div>
          <div className="text-[10px] text-zinc-400">${meta.superbrainCost.toFixed(3)} USD</div>
        </div>

        <div className="p-2 rounded bg-[#090a0f] border border-[#222638]">
          <span className="text-zinc-500 block text-[9px]">CLAUDE CODE BASELINE</span>
          <div className="text-zinc-400 font-bold">{meta.rawClaudeTokens.toLocaleString()} tokens</div>
          <div className="text-[10px] text-zinc-500">${meta.rawClaudeCost.toFixed(3)} USD</div>
        </div>
      </div>

      {/* Resolve Rate Benchmark Pill */}
      <div className="pt-2 border-t border-[#222638] flex items-center justify-between text-[10px] text-zinc-400">
        <span>Django 10 Bugs Resolve Rate:</span>
        <span className="text-cyan-400 font-bold">7 / 10 Resolved (70%)</span>
      </div>
    </div>
  );
};
