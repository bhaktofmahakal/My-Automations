'use client';

import React, { useState, useEffect } from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { computePatchHash } from '@/lib/diff/patchEngine';
import { ShieldCheck, X, FileCode, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SafeApprovalModal: React.FC = () => {
  const isApprovalModalOpen = useOmniStore(state => state.isApprovalModalOpen);
  const closeApprovalModal = useOmniStore(state => state.closeApprovalModal);
  const diffHunks = useOmniStore(state => state.diffHunks);
  const applyApprovedPatches = useOmniStore(state => state.applyApprovedPatches);
  const telemetry = useOmniStore(state => state.telemetry);

  const [patchHash, setPatchHash] = useState('—');
  useEffect(() => {
    let cancelled = false;
    const deriveHash = async () => {
      if (diffHunks.length > 0) {
        const h = await computePatchHash(diffHunks);
        if (!cancelled) setPatchHash(h);
      } else {
        if (!cancelled) setPatchHash('—');
      }
    };
    deriveHash();
    return () => {
      cancelled = true;
    };
  }, [diffHunks]);

  if (!isApprovalModalOpen) return null;

  const acceptedHunks = diffHunks.filter(h => h.status === 'accepted');
  const pendingHunks = diffHunks.filter(h => h.status === 'pending');

  const handleConfirmAndApply = () => {
    applyApprovedPatches();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#38bdf8', '#6366f1'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto custom-scrollbar bg-[#0e1017] border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl font-mono text-zinc-100 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#222638] gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-zinc-100 truncate">
                Safe Execution Gate: Apply Patch
              </h2>
              <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                Human Approval Barrier (Zero Unapproved Mutations)
              </p>
            </div>
          </div>

          <button
            onClick={closeApprovalModal}
            className="p-1.5 rounded-lg hover:bg-[#1a1e2d] text-zinc-400 hover:text-zinc-200 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Patch Hash & Security Metadata */}
        <div className="p-3 bg-[#141722] rounded-xl border border-[#222638] space-y-1.5 text-xs">
          <div className="flex flex-wrap justify-between items-center text-zinc-400 gap-1">
            <span className="text-[11px]">Patch Hash:</span>
            <span className="text-cyan-400 font-bold font-mono text-[10px] sm:text-xs break-all">{patchHash}</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400 text-[11px]">
            <span>Accepted Hunks to Apply:</span>
            <span className="text-emerald-400 font-bold">{acceptedHunks.length} of {diffHunks.length}</span>
          </div>
          <div className="flex justify-between items-center text-zinc-400 text-[11px]">
            <span>TokenFold Efficiency:</span>
            <span className="text-emerald-400 font-bold">
              {telemetry.savingsPercentage}% Token Savings
            </span>
          </div>
        </div>

        {/* Pending Warning if any */}
        {pendingHunks.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] leading-relaxed">
              {pendingHunks.length} hunks are currently marked <code>PENDING</code> and will be omitted unless accepted.
            </span>
          </div>
        )}

        {/* Summary of affected files */}
        <div className="space-y-1.5 text-xs">
          <span className="text-zinc-500 text-[10px] uppercase font-bold">Files Receiving AST Patches:</span>
          <div className="space-y-1 max-h-36 overflow-y-auto custom-scrollbar">
            {Array.from(new Set(diffHunks.map(h => h.file))).map((filename) => {
              const fileAccepted = acceptedHunks.filter(h => h.file === filename).length;
              return (
                <div
                  key={filename}
                  className="flex items-center justify-between p-2 rounded bg-[#090a0f] border border-[#222638] text-xs gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-zinc-200 truncate">{filename}</span>
                  </div>
                  <span className="text-emerald-400 text-[11px] font-bold shrink-0">
                    {fileAccepted} hunks
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#222638] flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3">
          <button
            onClick={closeApprovalModal}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#141722] hover:bg-[#1a1e2d] text-zinc-300 text-xs transition-colors border border-[#222638] min-h-[38px]"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmAndApply}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold text-xs shadow-lg transition-all min-h-[38px]"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Sign & Apply Patches</span>
          </button>
        </div>
      </div>
    </div>
  );
};
