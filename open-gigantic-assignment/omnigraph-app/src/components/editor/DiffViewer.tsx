'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { DiffHunk } from '@/lib/types';
import { Check, X, GitCommit, Split, ArrowRight, ShieldCheck, Cpu, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DiffViewer: React.FC = () => {
  const diffHunks = useOmniStore(state => state.diffHunks);
  const activeFileTab = useOmniStore(state => state.activeFileTab);
  const acceptHunk = useOmniStore(state => state.acceptHunk);
  const rejectHunk = useOmniStore(state => state.rejectHunk);
  const acceptAllHunks = useOmniStore(state => state.acceptAllHunks);
  const rejectAllHunks = useOmniStore(state => state.rejectAllHunks);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);

  // Filter hunks for the active tab, or show all
  const visibleHunks = diffHunks.filter(h => h.file === activeFileTab);
  const pendingCount = visibleHunks.filter(h => h.status === 'pending').length;
  const acceptedCount = visibleHunks.filter(h => h.status === 'accepted').length;

  const handleAcceptWithFx = (id: string) => {
    acceptHunk(id);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#34d399', '#38bdf8', '#818cf8'],
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#090a0f] border border-[#222638] rounded-xl overflow-hidden shadow-2xl font-mono">
      {/* Diff Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0e1017] border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <Split className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-zinc-200">
            Surgical Hunk Cherry-Picker ({activeFileTab})
          </span>
          <span className="text-[10px] text-zinc-500 bg-[#141722] px-1.5 py-0.5 rounded border border-[#222638]">
            {visibleHunks.length} hunks ({acceptedCount} accepted)
          </span>
        </div>

        {/* Global Batch Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={acceptAllHunks}
            className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors text-[11px]"
          >
            <Check className="w-3 h-3" />
            <span>Accept All</span>
          </button>
          <button
            onClick={rejectAllHunks}
            className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors text-[11px]"
          >
            <X className="w-3 h-3" />
            <span>Reject All</span>
          </button>
          <button
            onClick={openApprovalModal}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold hover:brightness-110 shadow-lg text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Apply Approved</span>
          </button>
        </div>
      </div>

      {/* Hunks Container */}
      <div className="flex-1 p-3 overflow-y-auto space-y-4 text-xs select-text">
        {visibleHunks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600 space-y-2">
            <Check className="w-8 h-8 text-emerald-500/40" />
            <p>No surgical diffs pending for {activeFileTab}. Working tree is clean.</p>
          </div>
        ) : (
          visibleHunks.map((hunk, index) => {
            const isAccepted = hunk.status === 'accepted';
            const isRejected = hunk.status === 'rejected';

            return (
              <div
                key={hunk.id}
                className={`rounded-lg border transition-all ${
                  isAccepted
                    ? 'border-emerald-500/60 bg-[#0b1411]'
                    : isRejected
                    ? 'border-rose-500/40 bg-[#140b0d] opacity-60'
                    : 'border-[#222638] bg-[#0e1017]'
                }`}
              >
                {/* Hunk Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#222638] bg-[#12141e]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400 font-bold bg-[#1a1e2d] px-1.5 py-0.5 rounded">
                      Hunk #{index + 1}
                    </span>
                    <span className="text-cyan-400 font-semibold">{hunk.header}</span>
                    {hunk.astNodeId && (
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-zinc-500" />
                        {hunk.astNodeId}
                      </span>
                    )}
                  </div>

                  {/* Status & Hunk Action Buttons */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                        isAccepted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isRejected
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {hunk.status}
                    </span>

                    <button
                      onClick={() => handleAcceptWithFx(hunk.id)}
                      className={`p-1 rounded transition-colors ${
                        isAccepted
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-[#1a1e2d] hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30'
                      }`}
                      title="Accept this Hunk"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => rejectHunk(hunk.id)}
                      className={`p-1 rounded transition-colors ${
                        isRejected
                          ? 'bg-rose-500 text-zinc-950'
                          : 'bg-[#1a1e2d] hover:bg-rose-500/30 text-rose-400 border border-rose-500/30'
                      }`}
                      title="Reject this Hunk"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Hunk Rationale / First-Principles Explanation */}
                <div className="px-3 py-1.5 bg-[#141724] border-b border-[#222638] text-[11px] text-zinc-300 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 font-semibold">RATIONALE: </span>
                    <span>{hunk.explanation}</span>
                  </div>
                </div>

                {/* Diff Lines Rendering */}
                <div className="p-2 space-y-0.5 overflow-x-auto text-[11.5px] leading-snug">
                  {hunk.lines.map((line, lIdx) => {
                    const isAddition = line.type === 'addition';
                    const isDeletion = line.type === 'deletion';

                    return (
                      <div
                        key={lIdx}
                        className={`flex items-center font-mono rounded px-1.5 py-0.5 ${
                          isAddition
                            ? 'bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-400'
                            : isDeletion
                            ? 'bg-rose-950/40 text-rose-300 border-l-2 border-rose-500'
                            : 'text-zinc-400'
                        }`}
                      >
                        <span className="w-8 text-[10px] text-zinc-600 select-none text-right pr-2">
                          {line.oldLineNo || ''}
                        </span>
                        <span className="w-8 text-[10px] text-zinc-600 select-none text-right pr-2">
                          {line.newLineNo || ''}
                        </span>
                        <span className="w-4 select-none text-zinc-500">
                          {isAddition ? '+' : isDeletion ? '-' : ' '}
                        </span>
                        <span className="flex-1 whitespace-pre">{line.content.replace(/^[+-]/, '')}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
