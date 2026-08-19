'use client';

import React, { useState } from 'react';
import { DiffViewer } from '@/components/editor/DiffViewer';
import { ExportPRModal } from '@/components/diff/ExportPRModal';
import { GitPullRequest, Share2 } from 'lucide-react';

export default function DiffPage() {
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-3 font-sans select-none space-y-2 overflow-hidden min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <GitPullRequest className="w-4 h-4 text-[#d29922] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Dedicated Surgical Diff Picker & Hunk Reconstitution Engine
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 5</span>
        </div>

        <button
          onClick={() => setIsExportOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-lg text-xs transition-all shadow shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Export / Create GitHub PR</span>
        </button>
      </div>

      {/* Main Viewport Surface */}
      <div className="flex-1 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl min-h-0">
        <DiffViewer />
      </div>

      {/* Export & GitHub PR Modal */}
      <ExportPRModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
}
