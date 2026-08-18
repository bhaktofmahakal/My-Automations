'use client';

import React from 'react';
import { TokenTelemetry } from '@/components/telemetry/TokenTelemetry';
import { SWEBenchCard } from '@/components/telemetry/SWEBenchCard';
import { BarChart3 } from 'lucide-react';

export default function TelemetryPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-3 font-sans select-none space-y-2 overflow-hidden">
      {/* Subheader */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#f85149]" />
          <h1 className="font-bold text-[#e6edf3]">Dedicated TokenFold Context Telemetry & SWE-bench Benchmarks</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 6</span>
        </div>
      </div>

      {/* Main Viewport Surface */}
      <div className="flex-1 grid grid-cols-12 gap-3 min-h-0 overflow-hidden">
        <div className="col-span-12 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-0">
          <TokenTelemetry />
        </div>
        <div className="col-span-12 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-0">
          <SWEBenchCard />
        </div>
      </div>
    </div>
  );
}
