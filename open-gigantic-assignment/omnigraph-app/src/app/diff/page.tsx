'use client';

import React from 'react';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { GitPullRequest } from 'lucide-react';

export default function DiffPage() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-3 font-sans select-none space-y-2 overflow-hidden">
      {/* Subheader */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-[#d29922]" />
          <h1 className="font-bold text-[#e6edf3]">Dedicated Surgical Diff Picker & Hunk Reconstitution Engine</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 5</span>
        </div>
      </div>

      {/* Main Viewport Surface */}
      <div className="flex-1 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl min-h-0">
        <DiffViewer />
      </div>
    </div>
  );
}
