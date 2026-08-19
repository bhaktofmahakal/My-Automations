'use client';

import React, { useState, useEffect } from 'react';
import {
  GitPullRequest,
  Download,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  X,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface ExportPRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExportResult {
  patchBundle?: string;
  prUrl?: string;
  prNumber?: number;
  branch?: string;
  error?: string;
}

export const ExportPRModal: React.FC<ExportPRModalProps> = ({ isOpen, onClose }) => {
  const files = useOmniStore((state) => state.files);
  const diffHunks = useOmniStore((state) => state.diffHunks);
  const activeScenario = useOmniStore((state) => state.activeScenario);

  const [githubToken, setGithubToken] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [branchName, setBranchName] = useState('');
  const [prTitle, setPrTitle] = useState('feat(omnigraph): apply autonomous multi-agent surgical diffs');
  const [prBody] = useState('Surgical diffs generated along S^1 manifold and verified by Witness/Refinery.');
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);
  const [copiedPatch, setCopiedPatch] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  // Dynamically derive the repository URL from the active ingested scenario or localStorage
  useEffect(() => {
    let cancelled = false;
    const derive = async () => {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('omnigraph_active_repo_url');
      let url = stored || '';
      if (!url && activeScenario?.title?.includes('/')) {
        url = `https://github.com/${activeScenario.title.trim()}`;
      }
      if (cancelled) return;
      setRepoUrl(url);
      setBranchName((prev) => prev || `omnigraph-patch-${Date.now().toString().slice(-4)}`);
    };
    derive();
    return () => {
      cancelled = true;
    };
  }, [activeScenario]);

  if (!isOpen) return null;

  const handleExport = async (mode: 'github_pr' | 'download_patch') => {
    setIsExporting(true);
    setExportResult(null);

    try {
      const res = await fetch('/api/repo/export-pr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl,
          branchName,
          prTitle,
          prBody,
          files,
          hunks: diffHunks,
          githubToken: mode === 'github_pr' ? githubToken : undefined,
        }),
      });

      const data: ExportResult = await res.json();
      setExportResult(data);

      if (mode === 'download_patch' && data.patchBundle) {
        // Trigger instant browser download of .patch file
        const blob = new Blob([data.patchBundle], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${branchName}.patch`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setExportResult({ error: err instanceof Error ? err.message : 'Export failed' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyPatch = () => {
    if (!exportResult?.patchBundle) return;
    navigator.clipboard.writeText(exportResult.patchBundle);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  const handleCopyCmd = () => {
    const cmd = `git apply --whitespace=fix ${branchName}.patch`;
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 font-sans text-[#e6edf3] max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#30363d]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#238636]/20 border border-[#238636] text-[#3fb950]">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-mono text-[#e6edf3]">
                Export & Create GitHub Pull Request
              </h2>
              <p className="text-[11px] text-[#8b949e]">
                Deploy accepted surgical diffs to your GitHub repository or local environment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Patch Summary Stats */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d] font-mono text-xs text-center">
          <div>
            <span className="text-[10px] text-[#8b949e] block">Diff Hunks</span>
            <span className="font-bold text-[#58a6ff]">{diffHunks.length} hunks</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8b949e] block">Target Files</span>
            <span className="font-bold text-[#3fb950]">{files.length} files</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8b949e] block">Safe Barrier</span>
            <span className="font-bold text-[#d2a8ff]">{diffHunks.filter(h => h.status === 'accepted').length} hunks approved</span>
          </div>
        </div>

        {/* Option 1: Direct GitHub Pull Request */}
        <div className="space-y-3 p-3 rounded-xl bg-[#0d1117] border border-[#30363d]">
          <div className="flex items-center justify-between font-mono">
            <span className="text-xs font-bold text-[#e6edf3] flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-[#3fb950]" />
              <span>Option A: Direct GitHub PR</span>
            </span>
            <span className="text-[10px] text-[#3fb950] bg-[#238636]/20 px-1.5 py-0.5 rounded">
              Recommended
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div>
              <label className="text-[11px] text-[#8b949e] block mb-1">GitHub Repository URL / owner/repo</label>
              <input
                type="text"
                placeholder="https://github.com/owner/repository or owner/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] focus:outline-none placeholder-[#484f58]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-[#8b949e] block mb-1">New Branch Name</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#8b949e] block mb-1 flex items-center justify-between">
                  <span>GitHub Token (repo scope)</span>
                  <a
                    href="https://github.com/settings/tokens/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#58a6ff] hover:underline"
                  >
                    Get Token &rarr;
                  </a>
                </label>
                <input
                  type="password"
                  placeholder="ghp_..."
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] focus:outline-none placeholder-[#484f58]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#8b949e] block mb-1">Pull Request Title</label>
              <input
                type="text"
                value={prTitle}
                onChange={(e) => setPrTitle(e.target.value)}
                className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2 text-xs text-[#e6edf3] focus:outline-none"
              />
            </div>

            <button
              onClick={() => handleExport('github_pr')}
              disabled={isExporting || !githubToken.trim() || !repoUrl.trim()}
              className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>CREATING PULL REQUEST ON GITHUB...</span>
                </>
              ) : (
                <>
                  <GitPullRequest className="w-4 h-4" />
                  <span>CREATE GITHUB PULL REQUEST</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Option 2: Download Unified .patch */}
        <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2.5 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#e6edf3] flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Option B: Download RFC Unified .patch File</span>
            </span>
            <span className="text-[10px] text-[#8b949e]">Zero Setup</span>
          </div>

          <p className="text-[11px] text-[#8b949e] leading-relaxed">
            Download a standard git diff patch bundle that can be applied locally to any clone using <code>git apply</code>.
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleExport('download_patch')}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#58a6ff]/40 text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {branchName}.patch</span>
            </button>

            <button
              onClick={handleCopyCmd}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] text-xs font-semibold transition-all"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Terminal className="w-3.5 h-3.5 text-[#d29922]" />}
              <span>{copiedCmd ? 'Command Copied!' : 'Copy git apply Command'}</span>
            </button>
          </div>
        </div>

        {/* Live Result Banner */}
        {exportResult && (
          <div className={`p-3 rounded-xl border text-xs font-mono ${
            exportResult.prUrl
              ? 'bg-[#16291e] border-[#238636] text-[#3fb950]'
              : exportResult.error
              ? 'bg-[#2d191e] border-[#f85149] text-[#f85149]'
              : 'bg-[#1c2438] border-[#58a6ff] text-[#58a6ff]'
          }`}>
            {exportResult.prUrl ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-bold">
                  <span>✓ Pull Request Created Successfully!</span>
                  <a
                    href={exportResult.prUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-[#238636] text-white px-2 py-1 rounded text-[11px] hover:bg-[#2ea043]"
                  >
                    <span>View PR #{exportResult.prNumber} on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-[11px] text-[#e6edf3]">
                  Branch <code>{exportResult.branch}</code> pushed and PR opened.
                </div>
              </div>
            ) : exportResult.error ? (
              <div>Error: {exportResult.error}</div>
            ) : (
              <div className="flex items-center justify-between">
                <span>Unified patch generated ({exportResult.patchBundle?.length || 0} bytes).</span>
                <button
                  onClick={handleCopyPatch}
                  className="flex items-center gap-1 text-[#58a6ff] hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedPatch ? 'Copied' : 'Copy Patch Text'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
