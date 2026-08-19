'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { FileCode, FileCode2, Split, Code, CheckCircle2, ShieldAlert } from 'lucide-react';

// Dynamically import Monaco Editor to prevent SSR window issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#090a0f] text-zinc-500 font-mono text-xs p-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#58a6ff] animate-ping" />
        <span>Loading Monaco Subsystem...</span>
      </div>
    </div>
  ),
});

export const CodeEditor: React.FC = () => {
  const files = useOmniStore(state => state.files);
  const activeFileTab = useOmniStore(state => state.activeFileTab);
  const setActiveFileTab = useOmniStore(state => state.setActiveFileTab);
  const updateFileCode = useOmniStore(state => state.updateFileCode);
  const activeViewMode = useOmniStore(state => state.activeViewMode);
  const setActiveViewMode = useOmniStore(state => state.setActiveViewMode);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);
  const diffHunks = useOmniStore(state => state.diffHunks);

  const activeFile = files.find(f => f.path.endsWith(activeFileTab)) || files[0];
  const pendingHunksCount = diffHunks.filter(h => h.status === 'pending').length;

  return (
    <div className="flex flex-col h-full w-full bg-[#090a0f] border border-[#222638] rounded-xl overflow-hidden shadow-2xl min-w-0">
      {/* File Tabs & Mode Controls */}
      <div className="flex items-center justify-between px-2 pt-2 bg-[#0e1017] border-b border-[#222638] gap-2 min-w-0">
        {/* Tab List */}
        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar min-w-0 flex-1 py-0.5">
          {files.map((file) => {
            const fileName = file.path.split('/').pop() || file.path;
            const isActive = fileName === activeFileTab;
            const fileHunks = diffHunks.filter(h => h.file === fileName);
            const hasPending = fileHunks.some(h => h.status === 'pending');

            return (
              <button
                key={file.path}
                onClick={() => setActiveFileTab(fileName)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-t-lg text-xs font-mono transition-all border-t border-x shrink-0 min-h-[32px] ${
                  isActive
                    ? 'bg-[#090a0f] text-zinc-100 border-[#222638] border-b-transparent shadow-sm'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-[#141722]'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span className="truncate max-w-[120px] sm:max-w-[180px]">{fileName}</span>

                {hasPending && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" title="Pending Surgical Diff" />
                )}
              </button>
            );
          })}
        </div>

        {/* View Mode Buttons & Review Actions */}
        <div className="flex items-center gap-1.5 pb-1 shrink-0">
          <div className="flex bg-[#141722] p-0.5 rounded-lg border border-[#222638] text-xs font-mono">
            <button
              onClick={() => setActiveViewMode('editor')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                activeViewMode === 'editor' ? 'bg-[#222638] text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Editor View"
            >
              <Code className="w-3 h-3" />
              <span className="hidden sm:inline">Editor</span>
            </button>
            <button
              onClick={() => setActiveViewMode('diff')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                activeViewMode === 'diff' ? 'bg-[#222638] text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Diff View"
            >
              <Split className="w-3 h-3" />
              <span className="hidden sm:inline">Diff</span>
            </button>
            <button
              onClick={() => setActiveViewMode('split')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                activeViewMode === 'split' ? 'bg-[#222638] text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title="Split View"
            >
              <Split className="w-3 h-3 rotate-90" />
              <span className="hidden sm:inline">Split</span>
            </button>
          </div>

          {/* Pending Diff Review Button */}
          {pendingHunksCount > 0 && (
            <button
              onClick={openApprovalModal}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">Review ({pendingHunksCount})</span>
              <span className="md:hidden">({pendingHunksCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 w-full h-full min-h-[220px] relative">
        {activeFile ? (
          <MonacoEditor
            height="100%"
            language={activeFile.language}
            value={activeFile.currentCode}
            theme="vs-dark"
            onChange={(val) => updateFileCode(activeFileTab, val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 12,
              lineNumbers: 'on',
              roundedSelection: true,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              fontFamily: 'JetBrains Mono, Menlo, Monaco, Courier New, monospace',
              tabSize: 2,
              padding: { top: 8, bottom: 8 },
              renderLineHighlight: 'all',
              cursorBlinking: 'smooth',
              wordWrap: 'on',
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-center gap-2 select-none">
            <FileCode2 className="w-8 h-8 text-zinc-600" />
            <p className="text-xs font-mono text-zinc-500">No file selected</p>
            <p className="text-[10px] text-zinc-600 font-mono max-w-xs">
              Ingest a repository (or open a file from the explorer) to start editing.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Editor Status Bar */}
      <div className="flex flex-wrap items-center justify-between px-3 py-1 bg-[#0e1017] border-t border-[#222638] font-mono text-[10px] text-zinc-500 gap-2 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 truncate min-w-0">
          <span className="truncate">PATH: {activeFile?.path || '—'}</span>
          <span className="shrink-0">LANG: {activeFile?.language.toUpperCase() || '—'}</span>
          <span className="hidden sm:inline shrink-0">LINES: {activeFile?.currentCode ? activeFile.currentCode.split('\n').length : 0}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`flex items-center gap-1 ${activeFile ? 'text-emerald-400' : 'text-zinc-600'}`}>
            <CheckCircle2 className="w-2.5 h-2.5" /> {activeFile ? 'AST Synced' : 'Idle'}
          </span>
          <span className="text-zinc-600 hidden xs:inline">UTF-8</span>
        </div>
      </div>
    </div>
  );
};
