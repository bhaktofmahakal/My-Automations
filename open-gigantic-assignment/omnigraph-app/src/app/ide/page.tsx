'use client';

import React, { useState } from 'react';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { ExportPRModal } from '@/components/diff/ExportPRModal';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Code, Split, Share2, ExternalLink, AlertCircle } from 'lucide-react';

export default function IDEPage() {
  const activeViewMode = useOmniStore(state => state.activeViewMode);
  const setActiveViewMode = useOmniStore(state => state.setActiveViewMode);
  const files = useOmniStore(state => state.files);
  const activeScenario = useOmniStore(state => state.activeScenario);
  const openIngestModal = useOmniStore(state => state.openIngestModal);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const isRealRepoIngested = files.length > 0 || activeScenario?.id !== 'empty';

  if (!isRealRepoIngested) {
    return (
      <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-3 font-sans select-none space-y-2 overflow-hidden min-w-0 items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <Code className="w-16 h-16 text-[#f85149]/50 mx-auto" />
          <h2 className="text-xl font-bold text-[#e6edf3]">No Repository Ingested</h2>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            The Monaco IDE workspace edits real source files from your codebase.
            Connect a GitHub repository to load files into the editor and diff viewer.
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
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-3 font-sans select-none space-y-2 overflow-hidden min-w-0">
      {/* Top Controls Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Code className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Monaco IDE & Surgical Diff Workspace
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 2</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-lg text-xs transition-all shadow shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export PR</span>
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

      {/* Export PR Modal */}
      <ExportPRModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
