'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { ShieldCheck, Cpu, Activity, Zap, Split } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const nodes = useOmniStore(state => state.nodes);
  const currentPhaseAngleDeg = useOmniStore(state => state.currentPhaseAngleDeg);
  const diffHunks = useOmniStore(state => state.diffHunks);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const telemetry = useOmniStore(state => state.telemetry);

  const pendingHunks = diffHunks.filter(h => h.status === 'pending');

  return (
    <footer className="flex flex-wrap items-center justify-between px-2.5 sm:px-3 py-1 bg-[#090a0f] border-t border-[#222638] font-mono text-[10px] sm:text-[10.5px] text-zinc-400 z-30 select-none gap-2">
      {/* Left status items */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className={`w-2 h-2 rounded-full shrink-0 ${isAgentRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className="font-semibold text-zinc-200">
            {isAgentRunning ? 'PSMAS ACTIVE' : 'READY'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-zinc-400">
          <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
          <span>AST Nodes: {nodes.length}</span>
        </div>

        <div className="flex items-center gap-1 text-zinc-400">
          <Activity className="w-3 h-3 text-indigo-400 shrink-0" />
          <span>&phi;(t): {currentPhaseAngleDeg}&deg;</span>
        </div>
      </div>

      {/* Right status items */}
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
        <div className="flex items-center gap-1 text-emerald-400">
          <Zap className="w-3 h-3 shrink-0" />
          <span>TokenFold: -{telemetry.savingsPercentage}%</span>
        </div>

        <div className="flex items-center gap-1">
          <Split className="w-3 h-3 text-amber-400 shrink-0" />
          <span>Diffs: {pendingHunks.length}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3 shrink-0" />
          <span>Safe Barrier: ENFORCED</span>
        </div>
      </div>
    </footer>
  );
};
