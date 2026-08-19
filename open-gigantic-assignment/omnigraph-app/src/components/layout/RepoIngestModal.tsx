'use client';

import React, { useState, useMemo } from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { generateCustomScenario } from '@/lib/graph/ogParser';
import {
  X,
  GitBranch,
  Code2,
  Cpu,
  Sparkles,
  Layers,
  CheckCircle2,
  FolderGit2,
  FileCode,
  Terminal,
  Loader2,
  AlertTriangle,
  Search,
  Folder,
  FolderOpen,
  FileText,
  CheckSquare,
  Square,
  Eye,
  ArrowRight,
  Star,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScannedFile {
  path: string;
  size: number;
  isEntry: boolean;
}

export const RepoIngestModal: React.FC = () => {
  const isIngestModalOpen = useOmniStore((state) => state.isIngestModalOpen);
  const closeIngestModal = useOmniStore((state) => state.closeIngestModal);
  const addScenario = useOmniStore((state) => state.addScenario);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'github' | 'paste' | 'preset'>('github');
  const [repoName, setRepoName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [language, setLanguage] = useState<'typescript' | 'python' | 'go' | 'rust' | 'java'>('typescript');
  const [issueDescription, setIssueDescription] = useState('');
  const [customCode, setCustomCode] = useState('');

  // Scanned Tree & Multi-Select State
  const [isScanningTree, setIsScanningTree] = useState(false);
  const [scannedFiles, setScannedFiles] = useState<ScannedFile[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [previewFilePath, setPreviewFilePath] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [repoStars, setRepoStars] = useState(0);

  // Ingestion Execution State
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Filter scanned files by search query
  const filteredFiles = useMemo(() => {
    if (!fileSearchQuery.trim()) return scannedFiles;
    const q = fileSearchQuery.toLowerCase();
    return scannedFiles.filter((f) => f.path.toLowerCase().includes(q));
  }, [scannedFiles, fileSearchQuery]);

  // Total selected tokens estimate
  const estimatedRawTokens = useMemo(() => {
    const totalBytes = scannedFiles
      .filter((f) => selectedPaths.has(f.path))
      .reduce((acc, f) => acc + f.size, 0);
    return Math.round(totalBytes / 3.8); // ~3.8 bytes per token
  }, [scannedFiles, selectedPaths]);

  const estimatedCompressedTokens = Math.round(estimatedRawTokens * 0.28); // 72% TokenFold reduction

  // 1. Scan Repository Tree
  const handleScanTree = async () => {
    if (!repoUrl.trim()) {
      setErrorMessage('Please provide a valid GitHub repository URL.');
      return;
    }

    setIsScanningTree(true);
    setErrorMessage('');
    setScannedFiles([]);
    setSelectedPaths(new Set());
    setPreviewFilePath(null);
    setPreviewContent(null);

    try {
      const res = await fetch('/api/repo/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
          action: 'scan',
          branchOverride: branch !== 'main' ? branch : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `Failed to scan repo tree (HTTP ${res.status})`);
      }

      const tree: ScannedFile[] = data.tree || [];
      setScannedFiles(tree);
      setRepoStars(data.stars || 0);

      // Auto-select entry points & top 20 files
      const defaultSelected = new Set<string>();
      tree.slice(0, 25).forEach((f) => defaultSelected.add(f.path));
      tree.filter((f) => f.isEntry).forEach((f) => defaultSelected.add(f.path));
      setSelectedPaths(defaultSelected);

      if (data.language) setLanguage(data.language as any);
      if (!repoName.trim() && data.repo) {
        setRepoName(data.repo.split('/')[1] || data.repo);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not scan repository tree.');
    } finally {
      setIsScanningTree(false);
    }
  };

  // 2. Fetch Single File Preview
  const handlePreviewFile = async (path: string) => {
    setPreviewFilePath(path);
    setIsLoadingPreview(true);
    setPreviewContent(null);

    try {
      const res = await fetch('/api/repo/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
          action: 'preview',
          previewPath: path,
        }),
      });

      const data = await res.json();
      if (res.ok && data.content) {
        setPreviewContent(data.content);
      } else {
        setPreviewContent('// Preview unavailable for binary or empty file');
      }
    } catch {
      setPreviewContent('// Failed to load preview');
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Toggle single file checkbox
  const togglePathSelection = (path: string) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  // Select all / deselect all
  const toggleSelectAll = () => {
    if (selectedPaths.size === filteredFiles.length) {
      setSelectedPaths(new Set());
    } else {
      const next = new Set(selectedPaths);
      filteredFiles.forEach((f) => next.add(f.path));
      setSelectedPaths(next);
    }
  };

  // Preset Selection
  const handlePresetSelect = (
    name: string,
    url: string,
    lang: 'typescript' | 'python' | 'go' | 'rust' | 'java',
    desc: string
  ) => {
    setRepoName(name);
    setRepoUrl(url);
    setLanguage(lang);
    setIssueDescription(desc);
  };

  // 3. Final Ingest and Parse
  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');
    setProgressMessage('Downloading selected source code files...');

    try {
      let files: { name: string; path: string; content: string }[] = [];

      if (activeTab === 'github' && repoUrl.trim()) {
        const res = await fetch('/api/repo/fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            repoUrl: repoUrl.trim(),
            action: 'fetch',
            selectedPaths: Array.from(selectedPaths),
          }),
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || `GitHub fetch failed (HTTP ${res.status})`);
        }

        files = data.files || [];
        setProgressMessage(`Downloaded ${files.length} source files. Compiling AST graph...`);
      }

      if (activeTab === 'paste' && customCode.trim()) {
        const ext =
          language === 'python'
            ? 'py'
            : language === 'go'
            ? 'go'
            : language === 'rust'
            ? 'rs'
            : language === 'java'
            ? 'java'
            : 'ts';
        files = [{ name: `main.${ext}`, path: `src/main.${ext}`, content: customCode.trim() }];
      }

      if (activeTab === 'preset') {
        const res = await fetch('/api/repo/fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            repoUrl: repoUrl.trim() || 'https://github.com/expressjs/express',
            action: 'fetch',
          }),
        });
        const data = await res.json();
        files = data.files || [];
      }

      if (files.length === 0) {
        throw new Error('No source code files available for AST parsing.');
      }

      // Generate AST scenario
      const scenarioTitle = repoName.trim() || repoUrl.split('/').pop() || 'Imported Repository';
      const newScenario = generateCustomScenario({
        repoName: scenarioTitle,
        repoUrl: repoUrl.trim() || undefined,
        language,
        issueDescription: issueDescription.trim(),
        files,
      });

      if (typeof window !== 'undefined' && repoUrl) {
        localStorage.setItem('omnigraph_active_repo_url', repoUrl);
      }

      addScenario(newScenario);
      closeIngestModal();
      router.push('/graph');
    } catch (err: any) {
      setErrorMessage(err.message || 'Ingestion failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isIngestModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#30363d] bg-[#0d1117]/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#e6edf3] font-mono">Enterprise Repository Ingestion Studio</h2>
              <p className="text-[11px] text-[#8b949e]">
                Recursive Git Tree Scanner, Antigravity File Explorer & Multi-Language AST Compiler
              </p>
            </div>
          </div>

          <button
            onClick={closeIngestModal}
            className="p-1.5 rounded-lg hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#30363d] bg-[#0d1117] px-4 sm:px-6 shrink-0 gap-2">
          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium border-b-2 transition-all ${
              activeTab === 'github'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>GitHub Repository Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('preset')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium border-b-2 transition-all ${
              activeTab === 'preset'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Benchmarks</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono font-medium border-b-2 transition-all ${
              activeTab === 'paste'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Paste Source Code</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleIngest} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#3c1e22] border border-[#f85149]/50 flex items-start gap-2.5 text-xs text-[#f85149] font-mono animate-in fade-in">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: GITHUB URL & FILE TREE */}
          {activeTab === 'github' && (
            <div className="space-y-4 font-mono text-xs">
              {/* URL Input & Scan Action */}
              <div className="space-y-1.5">
                <label className="text-[#8b949e] font-semibold flex items-center justify-between">
                  <span>Public GitHub Repository URL:</span>
                  <span className="text-[10px] text-[#6e7681]">Supports any public GitHub repo</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://github.com/expressjs/express or gin-gonic/gin"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-1 bg-[#0d1117] border border-[#30363d] focus:border-[#38bdf8] rounded-xl px-3 py-2 text-[#e6edf3] placeholder-[#6e7681] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleScanTree}
                    disabled={isScanningTree || !repoUrl.trim()}
                    className="px-4 py-2 bg-[#38bdf8] hover:bg-[#0284c7] text-[#0d1117] font-bold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 min-h-[38px]"
                  >
                    {isScanningTree ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>{isScanningTree ? 'Scanning Tree...' : 'Scan Repository Tree'}</span>
                  </button>
                </div>
              </div>

              {/* Antigravity File Tree Explorer (Shown after scan) */}
              {scannedFiles.length > 0 && (
                <div className="border border-[#30363d] rounded-2xl bg-[#0d1117] overflow-hidden space-y-0 shadow-xl">
                  {/* Tree Controls Header */}
                  <div className="p-3 bg-[#161b22] border-b border-[#30363d] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#58a6ff]" />
                      <span className="font-bold text-[#e6edf3]">
                        Repository File Explorer ({scannedFiles.length} files discovered)
                      </span>
                      {repoStars > 0 && (
                        <span className="text-[10px] text-[#d29922] flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> {repoStars.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] text-[10px] font-mono transition-colors"
                      >
                        {selectedPaths.size === filteredFiles.length ? 'Deselect All' : 'Select All'}
                      </button>
                      <span className="text-[11px] text-[#3fb950] font-bold">
                        {selectedPaths.size} Selected
                      </span>
                    </div>
                  </div>

                  {/* Search filter in tree */}
                  <div className="p-2 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-[#8b949e]" />
                    <input
                      type="text"
                      placeholder="Filter files by path (e.g. auth, api, controller)..."
                      value={fileSearchQuery}
                      onChange={(e) => setFileSearchQuery(e.target.value)}
                      className="bg-transparent text-xs text-[#e6edf3] focus:outline-none flex-1 placeholder-[#6e7681]"
                    />
                  </div>

                  {/* Two-Column Explorer Layout (File List + Preview Panel) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#30363d] h-60">
                    {/* Left: Scrollable File List with Checkboxes */}
                    <div className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
                      {filteredFiles.map((file) => {
                        const isSelected = selectedPaths.has(file.path);
                        const isPreviewActive = previewFilePath === file.path;

                        return (
                          <div
                            key={file.path}
                            className={`flex items-center justify-between p-1.5 rounded-lg text-[11px] transition-colors cursor-pointer ${
                              isPreviewActive
                                ? 'bg-[#38bdf8]/10 border border-[#38bdf8]/40'
                                : 'hover:bg-[#161b22]'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <button
                                type="button"
                                onClick={() => togglePathSelection(file.path)}
                                className="text-[#8b949e] hover:text-[#e6edf3] shrink-0"
                              >
                                {isSelected ? (
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3fb950]" />
                                ) : (
                                  <Square className="w-3.5 h-3.5 text-[#6e7681]" />
                                )}
                              </button>

                              <span
                                onClick={() => handlePreviewFile(file.path)}
                                className={`truncate font-mono ${
                                  isSelected ? 'text-[#e6edf3] font-medium' : 'text-[#8b949e]'
                                }`}
                                title={file.path}
                              >
                                {file.path}
                              </span>

                              {file.isEntry && (
                                <span className="px-1 py-0.2 rounded text-[8px] uppercase font-bold bg-[#d29922]/20 text-[#d29922] border border-[#d29922]/40 shrink-0">
                                  ENTRY
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <span className="text-[10px] text-[#6e7681]">
                                {(file.size / 1024).toFixed(1)}k
                              </span>
                              <button
                                type="button"
                                onClick={() => handlePreviewFile(file.path)}
                                className="p-1 text-[#8b949e] hover:text-[#58a6ff] rounded"
                                title="Preview file"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right: Real-Time File Preview Panel */}
                    <div className="p-3 bg-[#0a0d12] overflow-y-auto custom-scrollbar font-mono text-[11px]">
                      {isLoadingPreview ? (
                        <div className="flex items-center justify-center h-full text-[#8b949e] gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#58a6ff]" />
                          <span>Loading preview...</span>
                        </div>
                      ) : previewFilePath ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[#8b949e] border-b border-[#30363d] pb-1">
                            <span className="text-[#58a6ff] font-bold truncate">{previewFilePath}</span>
                            <span className="text-[10px] text-[#3fb950]">Preview Mode</span>
                          </div>
                          <pre className="text-[#e6edf3] text-[10px] leading-relaxed select-text whitespace-pre-wrap">
                            {previewContent || '// Empty file'}
                          </pre>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-[#6e7681] text-center space-y-1">
                          <FileText className="w-6 h-6 opacity-40" />
                          <span>Click the eye icon on any file to inspect code preview.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estimated Token Footprint Footer */}
                  <div className="p-2.5 bg-[#161b22] border-t border-[#30363d] flex flex-wrap items-center justify-between text-[11px] text-[#8b949e] font-mono">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#3fb950]" />
                      <span>
                        Estimated Raw Tokens: <strong className="text-[#e6edf3]">{estimatedRawTokens.toLocaleString()}</strong>
                      </span>
                    </div>
                    <div className="text-[#3fb950]">
                      TokenFold Projected: <strong>{estimatedCompressedTokens.toLocaleString()}</strong> (72% Savings)
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESETS */}
          {activeTab === 'preset' && (
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[#8b949e] block">Select a verified real benchmark repository:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: 'Express.js Framework Core',
                    url: 'https://github.com/expressjs/express',
                    lang: 'typescript' as const,
                    desc: 'SWE-bench: Fix router async error middleware propagation and memory leaks.',
                    tag: 'Node.js / Express',
                  },
                  {
                    name: 'Go Distributed Microservice',
                    url: 'https://github.com/gin-gonic/gin',
                    lang: 'go' as const,
                    desc: 'Goroutine race condition & channel deadlock resolution under 50k QPS.',
                    tag: 'Golang / Gin',
                  },
                  {
                    name: 'FastAPI High-Speed Backend',
                    url: 'https://github.com/tiangolo/fastapi',
                    lang: 'python' as const,
                    desc: 'Pydantic v2 schema validator deprecation & async connection pool starvation.',
                    tag: 'Python / FastAPI',
                  },
                  {
                    name: 'Axios HTTP Universal Client',
                    url: 'https://github.com/axios/axios',
                    lang: 'typescript' as const,
                    desc: 'Fix interceptor stack trace truncation on network timeout errors.',
                    tag: 'TypeScript / Web',
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handlePresetSelect(item.name, item.url, item.lang, item.desc)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                      repoUrl === item.url
                        ? 'border-[#38bdf8] bg-[#38bdf8]/10'
                        : 'border-[#30363d] bg-[#0d1117] hover:border-[#8b949e]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#21262d] text-[#38bdf8]">
                        {item.tag}
                      </span>
                      <span className="text-[10px] text-[#8b949e]">{item.lang.toUpperCase()}</span>
                    </div>
                    <h4 className="font-bold text-[#e6edf3]">{item.name}</h4>
                    <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PASTE SOURCE CODE */}
          {activeTab === 'paste' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <label className="text-[#8b949e]">Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="bg-[#0d1117] border border-[#30363d] rounded-lg px-2 py-1 text-[#e6edf3]"
                >
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <textarea
                placeholder="Paste complete source code here (AST compiler will parse functions, classes, imports)..."
                rows={10}
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#38bdf8] rounded-xl p-3 text-[#e6edf3] font-mono text-xs focus:outline-none"
              />
            </div>
          )}

          {/* Task / Prompt Objective Input */}
          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#8b949e]">Task / Agent Directive Objective:</label>
            <input
              type="text"
              placeholder="e.g. Audit JWT signature validation, fix async race condition, or resolve memory leak"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#38bdf8] rounded-xl p-2.5 text-[#e6edf3] placeholder-[#6e7681] focus:outline-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
            <span className="text-[11px] font-mono text-[#8b949e] truncate max-w-xs">
              {progressMessage || 'Ready to compile AST graph.'}
            </span>

            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={closeIngestModal}
                className="px-4 py-2 rounded-xl bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] text-xs font-mono transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 rounded-xl bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] font-bold text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(63,185,80,0.4)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling AST...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Parse & Build Graph</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
