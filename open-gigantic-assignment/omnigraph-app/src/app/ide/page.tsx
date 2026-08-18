'use client';

import React from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Code, Split } from 'lucide-react';

export default function IDEPage() {
  const activeViewMode = useOmniStore(state => state.activeViewMode);
  const setActiveViewMode = useOmniStore(state => state.setActiveViewMode);

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2 sm:p-3 font-sans select-none space-y-2 overflow-hidden min-w-0">
      {/* Top Controls Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Code className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Monaco IDE & Surgical Diff Workspace
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 2</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#0d1117] p-0.5 sm:p-1 rounded-lg border border-[#30363d] shrink-0">
          <button
            onClick={() => setActiveViewMode('editor')}
            className={`px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-semibold transition-all ${
              activeViewMode === 'editor' ? 'bg-[#30363d] text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveViewMode('diff')}
            className={`px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-semibold transition-all ${
              activeViewMode === 'diff' ? 'bg-[#30363d] text-[#3fb950]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Diff
          </button>
          <button
            onClick={() => setActiveViewMode('split')}
            className={`px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-semibold transition-all ${
              activeViewMode === 'split' ? 'bg-[#30363d] text-[#bc8cff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Split
          </button>
        </div>
      </div>

      {/* Main Viewport Surface */}
      <div className="flex-1 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl min-h-0 relative">
        {activeViewMode === 'editor' && <CodeEditor />}
        {activeViewMode === 'diff' && <DiffViewer />}
        {activeViewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full divide-y lg:divide-y-0 lg:divide-x divide-[#30363d] overflow-y-auto lg:overflow-hidden">
            <div className="h-[50vh] lg:h-full min-h-[300px]">
              <CodeEditor />
            </div>
            <div className="h-[50vh] lg:h-full min-h-[300px]">
              <DiffViewer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
