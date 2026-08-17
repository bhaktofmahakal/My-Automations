'use client';

import React, { useState } from 'react';
import { ObjectGraphHUD } from '@/components/graph/ObjectGraphHUD';
import { PSMASRadar } from '@/components/psmas/PSMASRadar';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { TokenTelemetry } from '@/components/telemetry/TokenTelemetry';
import { SWEBenchCard } from '@/components/telemetry/SWEBenchCard';
import { SafeApprovalModal } from '@/components/editor/SafeApprovalModal';
import { AgentTimeline } from '@/components/psmas/AgentTimeline';
import { Screen15Overview } from '@/components/layout/Screen15Overview';
import { LayoutGrid, Layers, ShieldCheck } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export default function OmniGraphStudio() {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden select-none bg-[#0d1117] text-[#e6edf3]">

      {/* ── Top Bar with 15-Screen Suite Switcher ── */}
      <header className="h-10 border-b border-[#30363d] bg-[#161b22] px-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse" />
          <span className="text-xs font-bold font-mono tracking-tight text-[#e6edf3]">
            OMNIGRAPH STUDIO
          </span>
          <span className="text-[10px] text-[#6e7681] font-mono">v1.0.0-craft</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOverviewOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs text-[#8b949e] hover:text-[#e6edf3] font-medium transition-colors"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>All 15 Screens (Design Spec 1)</span>
          </button>

          <button
            onClick={openApprovalModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1b3127] hover:bg-[#238636] border border-[#238636] text-xs text-[#3fb950] hover:text-white font-medium transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safe Barrier</span>
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* Main 2x2 Grid (matches reference screen 2 pixel-perfect)  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <main className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">

        {/* ┌────────────────────────────────────────────────────┐ */}
        {/* │  TOP LEFT: Object Graph HUD                       │ */}
        {/* └────────────────────────────────────────────────────┘ */}
        <section className="rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
          <ObjectGraphHUD />
        </section>

        {/* ┌────────────────────────────────────────────────────┐ */}
        {/* │  TOP RIGHT: PSMAS Manifold Radar                  │ */}
        {/* └────────────────────────────────────────────────────┘ */}
        <section className="rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
          <PSMASRadar />
        </section>

        {/* ┌────────────────────────────────────────────────────┐ */}
        {/* │  BOTTOM LEFT: Surgical Diff Picker                │ */}
        {/* └────────────────────────────────────────────────────┘ */}
        <section className="rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
          <DiffViewer />
        </section>

        {/* ┌────────────────────────────────────────────────────┐ */}
        {/* │  BOTTOM RIGHT: Token Telemetry + SWE-bench        │ */}
        {/* └────────────────────────────────────────────────────┘ */}
        <section className="grid grid-cols-2 gap-4 overflow-hidden">
          <div className="rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
            <TokenTelemetry />
          </div>
          <div className="rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col">
            <SWEBenchCard />
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* Agent Activity Timeline (horizontal scrolling strip)      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <AgentTimeline />

      {/* Human-in-the-Loop Safe Approval Barrier Modal */}
      <SafeApprovalModal />

      {/* 15 Screens Gallery Modal */}
      <Screen15Overview
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
      />
    </div>
  );
}
