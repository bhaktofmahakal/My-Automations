'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileDiff,
  Check,
  X,
  CheckCircle2,
  XCircle,
  FileCode,
  Sparkles,
  Scissors,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import confetti from 'canvas-confetti';

export const DiffViewer: React.FC = () => {
  const router = useRouter();
  const diffHunks = useOmniStore((state) => state.diffHunks);
  const acceptHunk = useOmniStore((state) => state.acceptHunk);
  const rejectHunk = useOmniStore((state) => state.rejectHunk);
  const acceptAllHunks = useOmniStore((state) => state.acceptAllHunks);
  const rejectAllHunks = useOmniStore((state) => state.rejectAllHunks);
  const openApprovalModal = useOmniStore((state) => state.openApprovalModal);
  const applyApprovedPatches = useOmniStore((state) => state.applyApprovedPatches);

  const [selectedFile, setSelectedFile] = useState<string>('all');
  const [cherryPickId, setCherryPickId] = useState<string | null>(null);

  const uniqueFiles = Array.from(new Set(diffHunks.map((h) => h.file)));
  const filteredHunks = selectedFile === 'all' ? diffHunks : diffHunks.filter((h) => h.file === selectedFile);

  const totalHunks = diffHunks.length;
  const acceptedCount = diffHunks.filter((h) => h.status === 'accepted').length;
  const appliedCount = diffHunks.filter((h) => h.status === 'applied').length;
  const rejectedCount = diffHunks.filter((h) => h.status === 'rejected').length;
  const pendingCount = diffHunks.filter((h) => h.status === 'pending').length;
  const progressPct =
    totalHunks > 0 ? Math.round(((acceptedCount + appliedCount + rejectedCount) / totalHunks) * 100) : 0;

  const handleAccept = (hunkId: string) => {
    acceptHunk(hunkId);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#3fb950', '#58a6ff', '#bc8cff'],
    });
  };

  const handleReject = (hunkId: string) => {
    rejectHunk(hunkId);
  };

  const handleAcceptAll = () => {
    acceptAllHunks();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3fb950', '#58a6ff', '#bc8cff', '#d29922'],
    });
  };

  const handleApplyPatches = () => {
    openApprovalModal();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <FileDiff className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">Surgical Diff Picker</h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* File Selector Dropdown */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono max-w-[180px] sm:max-w-[240px]">
            <FileCode className="w-3 h-3 text-[#58a6ff] shrink-0" />
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="bg-transparent text-[#e6edf3] text-[11px] focus:outline-none cursor-pointer truncate max-w-full"
            >
              <option value="all" className="bg-[#161b22]">
                All Files ({totalHunks} hunks)
              </option>
              {uniqueFiles.map((f) => (
                <option key={f} value={f} className="bg-[#161b22]">
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e] shrink-0">
            <span className="hidden sm:inline text-[11px]">Reviewed:</span>
            <div className="w-16 sm:w-24 h-2 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]">
              <div
                className="h-full bg-gradient-to-r from-[#3fb950] via-[#58a6ff] to-[#bc8cff] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-[11px] text-[#e6edf3] font-bold">{progressPct}%</span>
          </div>
        </div>
      </div>

      {/* Applied Banner if hunks have been applied */}
      {appliedCount > 0 && (
        <div className="mx-3 sm:mx-5 mt-3 p-3 rounded-xl bg-[#16291e] border border-[#238636] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#3fb950]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              <strong>{appliedCount}</strong> Hunks Applied & Spliced into Active Codebase Buffer!
            </span>
          </div>
          <button
            onClick={() => router.push('/ide')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs transition-all shrink-0"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Open Monaco IDE</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* ── Hunks List ── */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 custom-scrollbar min-h-0">
        {filteredHunks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#8b949e] font-mono text-xs space-y-2 py-12">
            <FileDiff className="w-8 h-8 opacity-40" />
            <span>No diff hunks pending review for this selection.</span>
          </div>
        ) : (
          filteredHunks.map((hunk, idx) => {
            const additions = hunk.lines.filter((l) => l.type === 'addition');
            const deletions = hunk.lines.filter((l) => l.type === 'deletion');
            const isCherryPick = cherryPickId === hunk.id;

            return (
              <div
                key={hunk.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-lg ${
                  isCherryPick
                    ? 'border-[#d29922] bg-[#0d1117] shadow-[0_0_12px_rgba(210,153,34,0.2)]'
                    : hunk.status === 'applied'
                    ? 'border-[#238636]/40 bg-[#0d1117]'
                    : 'border-[#30363d] bg-[#0d1117]'
                }`}
              >
                {/* Hunk Header */}
                <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-[#21262d] border-b border-[#30363d] text-[11px] gap-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-[#8b949e] font-medium truncate max-w-[160px] sm:max-w-[240px]">
                      {hunk.file}
                    </span>
                    <span className="text-[#6e7681]">Hunk {idx + 1}</span>
                    <span className="text-[#f85149] text-[10px]">−{deletions.length}</span>
                    <span className="text-[#3fb950] text-[10px]">+{additions.length}</span>

                    {/* Status Badge */}
                    {hunk.status === 'applied' ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-[#16291e] text-[#3fb950] border border-[#238636]">
                        ✓ Applied to Code
                      </span>
                    ) : hunk.status === 'accepted' ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
                        ✓ Accepted (Pending Apply)
                      </span>
                    ) : hunk.status === 'rejected' ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-[#f85149]/20 text-[#f85149] border border-[#f85149]/40">
                        ✗ Rejected
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[#6e7681] font-mono text-[10px] truncate">{hunk.header}</span>
                </div>

                {/* Unified Diff Lines */}
                <div className="p-2 sm:p-2.5 text-[11px] leading-relaxed space-y-0.5 select-text overflow-x-auto custom-scrollbar">
                  {hunk.lines.map((line, li) => {
                    const lineNo =
                      line.type === 'deletion'
                        ? line.oldLineNo
                        : line.type === 'addition'
                        ? line.newLineNo
                        : line.oldLineNo || line.newLineNo;

                    return (
                      <div
                        key={li}
                        className={`flex gap-2 px-1 rounded-sm min-w-max ${
                          line.type === 'deletion'
                            ? 'bg-[#3c1e22]/40 text-[#f85149]'
                            : line.type === 'addition'
                            ? 'bg-[#16291e]/50 text-[#3fb950]'
                            : 'text-[#8b949e]'
                        }`}
                      >
                        <span className="w-7 text-right select-none text-[#6e7681] shrink-0 font-mono text-[10px]">
                          {lineNo ?? ''}
                        </span>
                        <span className="w-3 text-center select-none shrink-0 font-bold">
                          {line.type === 'deletion' ? '−' : line.type === 'addition' ? '+' : ' '}
                        </span>
                        <span className="whitespace-pre font-mono">{line.content || '\u00A0'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {hunk.explanation && (
                  <div className="px-3 py-1.5 bg-[#21262d]/50 border-t border-[#30363d] text-[10px] text-[#8b949e]">
                    💡 {hunk.explanation}
                  </div>
                )}

                {/* Hunk Action Buttons */}
                {hunk.status === 'pending' && (
                  <div className="flex flex-wrap items-center justify-end gap-2 px-3 py-2 bg-[#21262d] border-t border-[#30363d]">
                    <button
                      onClick={() => handleAccept(hunk.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b3127] hover:bg-[#238636] text-[#3fb950] hover:text-white border border-[#238636] font-medium text-[11px] transition-all min-h-[32px]"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>

                    <button
                      onClick={() => handleReject(hunk.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2d191e] hover:bg-[#da3633] text-[#f85149] hover:text-white border border-[#f85149]/60 font-medium text-[11px] transition-all min-h-[32px]"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => setCherryPickId(isCherryPick ? null : hunk.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium text-[11px] transition-all min-h-[32px] ${
                        isCherryPick
                          ? 'bg-[#d29922]/20 text-[#d29922] border-[#d29922] shadow-[0_0_8px_rgba(210,153,34,0.3)]'
                          : 'bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-[#e6edf3]'
                      }`}
                    >
                      <Scissors className="w-3 h-3" />
                      <span>{isCherryPick ? 'Focused' : 'Cherry-pick'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Footer / Bulk Actions ── */}
      <div className="mt-auto px-3 sm:px-5 py-2.5 sm:py-3 border-t border-[#30363d] bg-[#161b22] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="text-[11px] sm:text-xs font-mono">
          <span className="text-[#e6edf3] font-medium block">
            {totalHunks} Hunks · {acceptedCount} Accepted · {appliedCount} Applied · {rejectedCount} Rejected
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {pendingCount > 0 && (
            <>
              <button
                onClick={handleAcceptAll}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#1b3127] hover:bg-[#238636] text-[#3fb950] hover:text-white border border-[#238636] font-medium text-[11px] sm:text-xs transition-all min-h-[34px]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept All</span>
              </button>

              <button
                onClick={rejectAllHunks}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#2d191e] hover:bg-[#da3633] text-[#f85149] hover:text-white border border-[#f85149]/60 font-medium text-[11px] sm:text-xs transition-all min-h-[34px]"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject All</span>
              </button>
            </>
          )}

          {/* Apply Patches Button only shown when there are accepted un-applied hunks */}
          {acceptedCount > 0 && (
            <button
              onClick={handleApplyPatches}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-[#58a6ff] hover:bg-[#79c0ff] text-[#0d1117] font-bold text-[11px] sm:text-xs transition-all shadow-[0_0_12px_rgba(88,166,255,0.4)] min-h-[34px]"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply {acceptedCount} Patches (Safe Barrier)</span>
            </button>
          )}

          {/* When all accepted hunks are applied and none pending */}
          {appliedCount > 0 && acceptedCount === 0 && pendingCount === 0 && (
            <button
              onClick={() => router.push('/ide')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-[11px] sm:text-xs transition-all shadow-[0_0_12px_rgba(35,134,54,0.4)] min-h-[34px]"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>All Patches Applied · Open IDE →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
