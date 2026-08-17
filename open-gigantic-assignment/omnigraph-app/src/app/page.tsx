'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { StatusBar } from '@/components/layout/StatusBar';
import { GraphCanvas } from '@/components/graph/GraphCanvas';
import { PSMASRadar } from '@/components/psmas/PSMASRadar';
import { TerminalLogs } from '@/components/psmas/TerminalLogs';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { TokenTelemetry } from '@/components/telemetry/TokenTelemetry';
import { SWEBenchCard } from '@/components/telemetry/SWEBenchCard';
import { SafeApprovalModal } from '@/components/editor/SafeApprovalModal';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Network, Split, Activity, Terminal, Zap, Trophy, ShieldCheck } from 'lucide-react';

export default function OmniGraphStudio() {
  const activeViewMode = useOmniStore(state => state.activeViewMode);
  const [leftTab, setLeftTab] = useState<'canvas' | 'radar'>('canvas');
  const [bottomTab, setBottomTab] = useState<'logs' | 'telemetry' | 'swebench'>('logs');

  return (
    <div className="flex flex-col h-screen w-screen bg-[#08090d] text-white overflow-hidden select-none font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Multi-Pane Workspace */}
      <main className="flex-1 grid grid-cols-12 gap-2 p-2 overflow-hidden bg-[#08090d]">
        {/* Left Column (Canvas & PSMAS Runtime) - 6 cols */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-2 h-full overflow-hidden">
          {/* Upper Left: ObjectGraph Canvas or PSMAS Radar */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#0e1017] rounded-xl border border-[#222638] overflow-hidden shadow-xl">
            {/* Tab switch header */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#090a0f] border-b border-[#222638] font-mono text-xs">
              <div className="flex items-center gap-1 bg-[#141722] p-0.5 rounded-lg border border-[#222638]">
                <button
                  onClick={() => setLeftTab('canvas')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors text-xs font-semibold ${
                    leftTab === 'canvas'
                      ? 'bg-[#222638] text-cyan-300 shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>ObjectGraph (.og) Canvas</span>
                </button>

                <button
                  onClick={() => setLeftTab('radar')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors text-xs font-semibold ${
                    leftTab === 'radar'
                      ? 'bg-[#222638] text-indigo-300 shadow'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>PSMAS Radar Sweep</span>
                </button>
              </div>

              <span className="text-[10px] text-zinc-500 hidden sm:inline">
                Click nodes for progressive AST disclosure
              </span>
            </div>

            {/* Content view */}
            <div className="flex-1 relative overflow-hidden">
              {leftTab === 'canvas' ? <GraphCanvas /> : <PSMASRadar />}
            </div>
          </div>

          {/* Lower Left: Streaming Terminal Logs & Radar Split */}
          <div className="h-[280px] flex gap-2 overflow-hidden">
            {/* PSMAS Mini-Radar if in canvas mode */}
            {leftTab === 'canvas' && (
              <div className="w-[300px] hidden xl:block shrink-0 h-full overflow-hidden">
                <PSMASRadar />
              </div>
            )}

            {/* Terminal Stream */}
            <div className="flex-1 h-full overflow-hidden">
              <TerminalLogs />
            </div>
          </div>
        </section>

        {/* Right Column (Monaco Code Editor & Telemetry / Diffs) - 6 cols */}
        <section className="col-span-12 lg:col-span-6 flex flex-col gap-2 h-full overflow-hidden">
          {/* Upper Right: Code Editor or Surgical Diff Viewer */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#0e1017] rounded-xl border border-[#222638] overflow-hidden shadow-xl">
            {activeViewMode === 'editor' && <CodeEditor />}
            {activeViewMode === 'diff' && <DiffViewer />}
            {activeViewMode === 'split' && (
              <div className="grid grid-cols-2 h-full divide-x divide-[#222638] overflow-hidden">
                <CodeEditor />
                <DiffViewer />
              </div>
            )}
          </div>

          {/* Lower Right: Telemetry, SWE-bench Card & Metrics */}
          <div className="h-[280px] grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-hidden">
            <TokenTelemetry />
            <SWEBenchCard />
          </div>
        </section>
      </main>

      {/* Bottom Status Bar */}
      <StatusBar />

      {/* Human-in-the-Loop Safe Approval Barrier Modal */}
      <SafeApprovalModal />
    </div>
  );
}
