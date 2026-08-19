'use client';

import React, { useState } from 'react';
import { GraphCanvas } from '@/components/graph/GraphCanvas';
import { ObjectGraphHUD } from '@/components/graph/ObjectGraphHUD';
import { Network, ExternalLink, AlertCircle } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export default function GraphPage() {
  const [viewMode, setViewMode] = useState<'canvas' | 'hud'>('canvas');
  const nodes = useOmniStore(state => state.nodes);
  const activeScenario = useOmniStore(state => state.activeScenario);
  const openIngestModal = useOmniStore(state => state.openIngestModal);

  const isRealRepoIngested = nodes.length > 0 || activeScenario?.id !== 'empty';

  if (!isRealRepoIngested) {
    return (
      <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-3 font-sans select-none space-y-2 overflow-y-auto min-w-0 items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-16 h-16 text-[#f85149]/50 mx-auto" />
          <h2 className="text-xl font-bold text-[#e6edf3]">No Repository Ingested</h2>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            The ObjectGraph canvas visualizes real AST dependencies from your codebase.
            Connect a GitHub repository to generate the live dependency graph.
          </p>
          <button
            onClick={openIngestModal}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#0d1117] font-bold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ingest GitHub Repository</span>
          </button>
          <p className="text-[10px] text-[#6e7681]">
            Supports any public GitHub repo — enter URL, scan tree, select files, ingest.
          </p>
        </div>
      </div>
    );
  }

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
