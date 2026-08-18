'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Play, Pause, ShieldCheck, Zap, Layers, RotateCcw, Menu, FolderGit2, Plus } from 'lucide-react';
import { RepoIngestModal } from './RepoIngestModal';

export const AppHeader: React.FC = () => {
  const scenarios = useOmniStore(state => state.scenarios);
  const activeScenarioId = useOmniStore(state => state.activeScenarioId);
  const setScenario = useOmniStore(state => state.setScenario);
  const openIngestModal = useOmniStore(state => state.openIngestModal);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);
  const toggleMobileSidebar = useOmniStore(state => state.toggleMobileSidebar);
  const telemetry = useOmniStore(state => state.telemetry);
  const collaborators = useOmniStore(state => state.collaborators);

  return (
    <>
      <RepoIngestModal />
      <header className="h-12 sm:h-13 bg-[#161b22] border-b border-[#30363d] px-2.5 sm:px-4 flex items-center justify-between shrink-0 select-none z-20 gap-2 min-w-0">
        {/* Left: Mobile Hamburger, Scenario Switcher & Import Repo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
          {/* Hamburger Trigger for Mobile Drawer */}
          <button
            onClick={toggleMobileSidebar}
            className="p-1.5 rounded-lg bg-[#0d1117] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] md:hidden shrink-0 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Scenario Switcher Dropdown */}
          <div className="flex items-center gap-1 sm:gap-2 bg-[#0d1117] px-2 sm:px-2.5 py-1 rounded-lg border border-[#30363d] font-mono text-xs max-w-[130px] xs:max-w-[180px] sm:max-w-[240px] md:max-w-none truncate">
            <Layers className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
            <span className="text-[#8b949e] font-medium hidden md:inline shrink-0">Codebase:</span>
            <select
              value={activeScenarioId}
              onChange={(e) => setScenario(e.target.value)}
              className="bg-transparent text-[#e6edf3] font-semibold focus:outline-none cursor-pointer text-xs truncate max-w-full"
              aria-label="Select active scenario"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#161b22] text-[#e6edf3]">
                  {s.title} ({s.category})
                </option>
              ))}
            </select>
          </div>

          {/* Ingest Any Codebase Button */}
          <button
            onClick={openIngestModal}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-[#1f242c] hover:bg-[#282e38] text-[#58a6ff] hover:text-[#79c0ff] border border-[#388bfd]/30 font-mono text-xs font-semibold transition-colors shrink-0"
            title="Ingest any custom codebase or GitHub repo"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden sm:inline">Import Repo</span>
            <span className="sm:hidden">Import</span>
          </button>
        </div>

      {/* Center: Global RUN PSMAS SWEEP Action Button */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          onClick={isAgentRunning ? pausePSMASSweep : startPSMASSweep}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all min-h-[34px] sm:min-h-[36px] shadow-md ${
            isAgentRunning
              ? 'bg-[#d29922] text-[#0d1117] shadow-[0_0_12px_rgba(210,153,34,0.4)]'
              : 'bg-[#3fb950] text-[#0d1117] hover:bg-[#2ea043] shadow-[0_0_12px_rgba(63,185,80,0.4)]'
          }`}
          title={isAgentRunning ? 'Pause agent execution' : 'Start multi-agent sweep'}
        >
          {isAgentRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="hidden xs:inline">PAUSE</span>
              <span className="xs:hidden">PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="hidden sm:inline">RUN PSMAS SWEEP</span>
              <span className="sm:hidden">SWEEP</span>
            </>
          )}
        </button>

        <button
          onClick={resetPSMASSweep}
          title="Reset Agent State"
          className="p-1.5 sm:p-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] min-h-[34px] sm:min-h-[36px] min-w-[34px] flex items-center justify-center transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Telemetry & Safety Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Token Savings Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16291e] border border-[#238636]/60 text-[#3fb950] text-xs font-mono">
          <Zap className="w-3.5 h-3.5 text-[#3fb950]" />
          <span>{telemetry.savingsPercentage}% Saved</span>
        </div>

        {/* Collaborators Avatars */}
        <div className="hidden lg:flex items-center -space-x-1.5">
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
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#1b3127] hover:bg-[#238636] border border-[#238636] text-xs text-[#3fb950] hover:text-white font-mono font-medium transition-colors min-h-[34px] sm:min-h-[36px]"
          title="Open Human Approval Barrier"
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Safe Barrier</span>
          <span className="sm:hidden">Barrier</span>
        </button>
      </div>
    </header>
  </>
);
};
