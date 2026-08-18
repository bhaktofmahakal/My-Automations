'use client';

import React from 'react';
import { PSMASRadar } from '@/components/psmas/PSMASRadar';
import { TerminalLogs } from '@/components/psmas/TerminalLogs';
import { Radio } from 'lucide-react';

export default function PSMASPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2 sm:p-3 font-sans select-none space-y-2 overflow-y-auto lg:overflow-hidden min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Radio className="w-4 h-4 text-[#bc8cff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            PSMAS Multi-Agent Circular Manifold & Streaming Terminal
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 4</span>
        </div>
      </div>

      {/* Split Viewport Surface */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-0 lg:overflow-hidden">
        {/* Left: Swarm Manifold Radar */}
        <div className="col-span-1 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-[420px] lg:min-h-0">
          <PSMASRadar />
        </div>

        {/* Right: Live Event Stream Terminal */}
        <div className="col-span-1 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-[420px] lg:min-h-0">
          <TerminalLogs />
        </div>
      </div>
    </div>
  );
}
