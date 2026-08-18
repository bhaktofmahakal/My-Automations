'use client';

import React, { useState } from 'react';
import { GraphCanvas } from '@/components/graph/GraphCanvas';
import { ObjectGraphHUD } from '@/components/graph/ObjectGraphHUD';
import { Network } from 'lucide-react';

export default function GraphPage() {
  const [viewMode, setViewMode] = useState<'canvas' | 'hud'>('canvas');

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2 sm:p-3 font-sans select-none space-y-2 overflow-hidden min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Network className="w-4 h-4 text-[#3fb950] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            ObjectGraph (.og) AST Dependency Canvas
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 3</span>
        </div>

        <div className="flex items-center gap-1 bg-[#0d1117] p-0.5 sm:p-1 rounded-lg border border-[#30363d] shrink-0">
          <button
            onClick={() => setViewMode('canvas')}
            className={`px-2.5 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-semibold transition-all ${
              viewMode === 'canvas' ? 'bg-[#30363d] text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Flow Canvas
          </button>
          <button
            onClick={() => setViewMode('hud')}
            className={`px-2.5 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-semibold transition-all ${
              viewMode === 'hud' ? 'bg-[#30363d] text-[#3fb950]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Pixel HUD Spec
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="flex-1 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl min-h-0 relative">
        {viewMode === 'canvas' ? <GraphCanvas /> : <ObjectGraphHUD />}
      </div>
    </div>
  );
}
