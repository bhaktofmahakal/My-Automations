'use client';

import React from 'react';
import { AgentTimeline } from '@/components/psmas/AgentTimeline';
import { Clock } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="w-4 h-4 text-[#39d353] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Dedicated Agent Activity Execution Timeline
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 9</span>
        </div>
      </div>

      {/* Main Timeline Viewport */}
      <div className="p-3 sm:p-6 rounded-xl bg-[#161b22] border border-[#30363d] shadow-2xl space-y-4">
        <h2 className="text-xs font-mono font-bold uppercase text-[#8b949e] tracking-wider">
          Multi-Agent Phase Rotation & Activity Log (6 Stages)
        </h2>
        <AgentTimeline />
      </div>
    </div>
  );
}
