'use client';

import React, { useState } from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Play, Pause, ShieldCheck, Zap, Layers, LayoutGrid, RotateCcw } from 'lucide-react';

export const AppHeader: React.FC = () => {
  const scenarios = useOmniStore(state => state.scenarios);
  const activeScenarioId = useOmniStore(state => state.activeScenarioId);
  const setScenario = useOmniStore(state => state.setScenario);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);
  const telemetry = useOmniStore(state => state.telemetry);
  const collaborators = useOmniStore(state => state.collaborators);

  return (
    <header className="h-12 bg-[#161b22] border-b border-[#30363d] px-4 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Scenario Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#0d1117] px-2.5 py-1 rounded-lg border border-[#30363d] font-mono text-xs">
          <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
          <span className="text-[#8b949e] font-medium hidden sm:inline">Scenario:</span>
          <select
            value={activeScenarioId}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-transparent text-[#e6edf3] font-semibold focus:outline-none cursor-pointer text-xs"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#161b22] text-[#e6edf3]">
                {s.title} ({s.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: Global RUN PSMAS SWEEP Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={isAgentRunning ? pausePSMASSweep : startPSMASSweep}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
            isAgentRunning
              ? 'bg-[#d29922] text-[#0d1117] shadow-[0_0_12px_rgba(210,153,34,0.4)]'
              : 'bg-[#3fb950] text-[#0d1117] hover:bg-[#2ea043] shadow-[0_0_12px_rgba(63,185,80,0.4)]'
          }`}
        >
          {isAgentRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE SWEEP</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RUN PSMAS SWEEP</span>
            </>
          )}
        </button>

        <button
          onClick={resetPSMASSweep}
          title="Reset Agent State"
          className="p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Telemetry & Safety Actions */}
      <div className="flex items-center gap-3">
        {/* Token Savings Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16291e] border border-[#238636]/60 text-[#3fb950] text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-[#3fb950]" />
          <span>{telemetry.savingsPercentage}% Token Reduction</span>
        </div>

        {/* Collaborators Avatars */}
        <div className="hidden sm:flex items-center -space-x-1.5">
          {collaborators.map((c) => (
            <div
              key={c.id}
              title={`${c.name} (${c.role}) - ${c.status}`}
              className="w-6 h-6 rounded-full border border-[#0d1117] flex items-center justify-center text-[10px] font-bold text-white shadow"
              style={{ backgroundColor: c.color }}
            >
              {c.avatar}
            </div>
          ))}
        </div>

        {/* Safe Barrier Trigger Button */}
        <button
          onClick={openApprovalModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1b3127] hover:bg-[#238636] border border-[#238636] text-xs text-[#3fb950] hover:text-white font-mono font-medium transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Safe Barrier</span>
        </button>
      </div>
    </header>
  );
};
