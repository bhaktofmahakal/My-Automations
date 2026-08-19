'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { MultiplayerBar } from '../multiplayer/MultiplayerBar';
import {
  BrainCircuit,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  FileCode,
  Cpu,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const scenarios = useOmniStore(state => state.scenarios);
  const activeScenarioId = useOmniStore(state => state.activeScenarioId);
  const setScenario = useOmniStore(state => state.setScenario);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const telemetry = useOmniStore(state => state.telemetry);

  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0c] border-b border-white/[0.08] font-mono z-30 sticky top-0">
      {/* Brand & Wordmark */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#141722] border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#f4f4f6] tracking-tight">OMNIGRAPH</span>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.2 rounded border border-cyan-500/20 font-bold">
                STUDIO
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 block leading-tight">
              Open Gigantic &bull; Superbrain TokenFold Engine
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-white/[0.08]" />

        {/* Scenario Switcher Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#121216] border border-white/[0.08] px-2.5 py-1 rounded-lg text-xs">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-zinc-400 text-[11px]">Benchmark:</span>
          <select
            value={activeScenarioId}
            onChange={(e) => setScenario(e.target.value)}
            className="bg-transparent text-xs text-[#f4f4f6] focus:outline-none cursor-pointer font-medium"
          >
            {scenarios.map((sc) => (
              <option key={sc.id} value={sc.id} className="bg-[#121216] text-[#f4f4f6]">
                {sc.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center Primary Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => (isAgentRunning ? pausePSMASSweep() : startPSMASSweep())}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isAgentRunning
              ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
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

        {/* Live Token Savings Pill */}
        <div className="flex items-center gap-1.5 bg-[#121216] border border-emerald-500/40 px-3 py-1 rounded-lg text-xs text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          <Zap className="w-3.5 h-3.5" />
          <span className="font-bold">{telemetry.savingsPercentage}% Token Reduction</span>
          <span className="text-[10px] text-zinc-400">(${telemetry.currentCostUSD} vs ${telemetry.baselineCostUSD})</span>
        </div>
      </div>

      {/* Right Controls: Multiplayer & Links */}
      <div className="flex items-center gap-3">
        <MultiplayerBar />

        <div className="h-5 w-px bg-white/[0.08]" />

        <a
          href="https://github.com/bhaktofmahakal/omnigraph-studio"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 bg-[#121216] hover:bg-[#1a1a22] p-1.5 rounded-lg border border-white/[0.08] transition-colors"
          title="View GitHub Repository"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>
    </header>
  );
};
