'use client';

import React, { useState } from 'react';
import { FileDiff, AlertTriangle, Check, X, Scissors } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import confetti from 'canvas-confetti';

export const DiffViewer: React.FC = () => {
  const [hunkStatus, setHunkStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);

  const handleAccept = () => {
    setHunkStatus('accepted');
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#3fb950', '#58a6ff', '#bc8cff'],
    });
  };

  const handleReject = () => {
    setHunkStatus('rejected');
  };

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <FileDiff className="w-4 h-4 text-[#e6edf3]" />
          <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
            Surgical Diff Picker
          </h2>
        </div>

        {/* Human Review Required Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2e2316] border border-[#9e6a03] text-[#d29922] text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-[#d29922]" />
          <span className="tracking-wide">HUMAN REVIEW REQUIRED</span>
        </div>
      </div>

      {/* ── File Subtitle ── */}
      <div className="px-5 pt-2 pb-1 text-xs font-mono text-[#8b949e]">
        src/engine/runner.ts
      </div>

      {/* ── Main Split Diff Content ── */}
      <div className="flex-1 px-5 py-2 grid grid-cols-2 gap-3 font-mono text-xs overflow-hidden relative">

        {/* ── Left Box: - REMOVED ── */}
        <div className="flex flex-col bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden">
          {/* Box Header */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#21262d] border-b border-[#30363d] text-[11px]">
            <span className="text-[#f85149] font-bold">&minus; REMOVED</span>
            <span className="text-[#8b949e]">Lines 42-48</span>
          </div>

          {/* Code lines */}
          <div className="p-3 text-[11px] leading-relaxed font-mono space-y-1 select-text">
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">42</span>
              <span className="text-[#e6edf3]">const result = await runAgent(</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">43</span>
              <span className="text-[#e6edf3] pl-4">input,</span>
            </div>
            <div className="flex gap-3 text-[#8b949e] bg-[#3c1e22]/50 rounded px-0.5">
              <span className="w-4 text-right select-none text-[#f85149]">44</span>
              <span className="text-[#f85149] pl-4 font-semibold">context</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">45</span>
              <span className="text-[#e6edf3]">);</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">46</span>
              <span className="text-[#8b949e]">&nbsp;</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">47</span>
              <span className="text-[#8b949e]">&nbsp;</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">48</span>
              <span className="text-[#e6edf3]">return result;</span>
            </div>
          </div>
        </div>

        {/* ── Right Box: + ADDED ── */}
        <div className="flex flex-col bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden">
          {/* Box Header */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#21262d] border-b border-[#30363d] text-[11px]">
            <span className="text-[#3fb950] font-bold">&#43; ADDED</span>
            <span className="text-[#8b949e]">Lines 42-48</span>
          </div>

          {/* Code lines */}
          <div className="p-3 text-[11px] leading-relaxed font-mono space-y-1 select-text">
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">42</span>
              <span className="text-[#e6edf3]">const result = await runAgent(</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">43</span>
              <span className="text-[#e6edf3] pl-4">input,</span>
            </div>
            <div className="flex gap-3 text-[#8b949e] bg-[#16291e] rounded px-0.5">
              <span className="w-4 text-right select-none text-[#3fb950]">44</span>
              <span className="text-[#3fb950] pl-4 font-semibold">compressedContext</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">45</span>
              <span className="text-[#e6edf3]">);</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">46</span>
              <span className="text-[#8b949e]">&nbsp;</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">47</span>
              <span className="text-[#8b949e]">&nbsp;</span>
            </div>
            <div className="flex gap-3 text-[#8b949e]">
              <span className="w-4 text-right select-none text-[#6e7681]">48</span>
              <span className="text-[#e6edf3]">return result;</span>
            </div>
          </div>
        </div>

        {/* ── Connecting SVG Arrow between diff markers ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path
            d="M 230 115 C 265 115, 275 115, 290 115"
            fill="none"
            stroke="#f85149"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <path
            d="M 285 115 C 290 115, 300 115, 310 115"
            fill="none"
            stroke="#3fb950"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* ── Footer / Hunk Controls ── */}
      <div className="mt-auto px-5 py-3 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between">
        {/* Left Hunk Position */}
        <div className="text-xs font-mono">
          <span className="text-[#e6edf3] font-medium block">Hunk 1 of 1</span>
          <span className="text-[#8b949e] text-[11px]">42-48 of 142 lines</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Accept Hunk (Green) */}
          <button
            onClick={handleAccept}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs transition-all ${
              hunkStatus === 'accepted'
                ? 'bg-[#238636] text-white shadow-[0_0_12px_rgba(63,185,80,0.4)]'
                : 'bg-[#1b3127] hover:bg-[#238636] text-[#3fb950] hover:text-white border border-[#238636]'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>Accept Hunk</span>
          </button>

          {/* Reject Hunk (Red) */}
          <button
            onClick={handleReject}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs transition-all ${
              hunkStatus === 'rejected'
                ? 'bg-[#da3633] text-white shadow-[0_0_12px_rgba(248,81,73,0.4)]'
                : 'bg-[#2d191e] hover:bg-[#da3633] text-[#f85149] hover:text-white border border-[#f85149]/60'
            }`}
          >
            <X className="w-4 h-4" />
            <span>Reject Hunk</span>
          </button>

          {/* Cherry-pick Button */}
          <button
            onClick={openApprovalModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#e6edf3] font-medium text-xs transition-colors"
          >
            <Scissors className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Cherry-pick</span>
          </button>
        </div>
      </div>
    </div>
  );
};
