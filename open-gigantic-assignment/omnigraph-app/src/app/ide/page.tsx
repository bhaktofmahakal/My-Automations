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
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-3 font-sans select-none space-y-2 overflow-hidden">
      {/* Top Controls Subheader */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-[#58a6ff]" />
          <h1 className="font-bold text-[#e6edf3]">Dedicated Monaco IDE & Surgical Diff Workspace</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 2</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
          <button
            onClick={() => setActiveViewMode('editor')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeViewMode === 'editor' ? 'bg-[#30363d] text-[#58a6ff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Monaco Editor
          </button>
          <button
            onClick={() => setActiveViewMode('diff')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeViewMode === 'diff' ? 'bg-[#30363d] text-[#3fb950]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Surgical Diff
          </button>
          <button
            onClick={() => setActiveViewMode('split')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              activeViewMode === 'split' ? 'bg-[#30363d] text-[#bc8cff]' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Split View
          </button>
        </div>
      </div>

      {/* Main Viewport Surface */}
      <div className="flex-1 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl min-h-0">
        {activeViewMode === 'editor' && <CodeEditor />}
        {activeViewMode === 'diff' && <DiffViewer />}
        {activeViewMode === 'split' && (
          <div className="grid grid-cols-2 h-full divide-x divide-[#30363d] overflow-hidden">
            <CodeEditor />
            <DiffViewer />
          </div>
        )}
      </div>
    </div>
  );
}
