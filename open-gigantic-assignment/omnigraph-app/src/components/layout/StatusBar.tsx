'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { ShieldCheck, Cpu, Activity, Zap, CheckCircle2, Split } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const activeScenario = useOmniStore(state => state.activeScenario);
  const nodes = useOmniStore(state => state.nodes);
  const currentPhaseAngleDeg = useOmniStore(state => state.currentPhaseAngleDeg);
  const diffHunks = useOmniStore(state => state.diffHunks);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const telemetry = useOmniStore(state => state.telemetry);

  const pendingHunks = diffHunks.filter(h => h.status === 'pending');

  return (
    <footer className="flex items-center justify-between px-3 py-1 bg-[#090a0f] border-t border-[#222638] font-mono text-[10.5px] text-zinc-400 z-30 select-none">
      {/* Left status items */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className={`w-2 h-2 rounded-full ${isAgentRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className="font-semibold text-zinc-200">
            {isAgentRunning ? 'PSMAS AGENT ACTIVE' : 'SYSTEM READY'}
          </span>
        </div>

        <div className="flex items-center gap-1 text-zinc-400">
          <Cpu className="w-3 h-3 text-cyan-400" />
          <span>ObjectGraph: {nodes.filter(n => n.isLoaded).length}/{nodes.length} AST Nodes Disclosed</span>
        </div>

        <div className="flex items-center gap-1 text-zinc-400">
          <Activity className="w-3 h-3 text-indigo-400" />
          <span>&phi;(t): {currentPhaseAngleDeg}&deg;</span>
        </div>
      </div>

      {/* Right status items */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-emerald-400">
          <Zap className="w-3 h-3" />
          <span>TokenFold: -{telemetry.savingsPercentage}% ($0.065/bug)</span>
        </div>

        <div className="flex items-center gap-1">
          <Split className="w-3 h-3 text-amber-400" />
          <span>Pending Diffs: {pendingHunks.length}</span>
        </div>

        <div className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" />
          <span>Human-in-the-Loop Barrier: ENFORCED</span>
        </div>
      </div>
    </footer>
  );
};
