'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Search,
  Zap,
  Code,
  ShieldCheck,
  Play,
  ArrowRight,
  Network,
  GitPullRequest,
  CheckCircle2,
  LayoutGrid,
  ExternalLink,
  Sparkles,
  Cpu,
  Database,
  Check,
  Copy,
  Layers,
  Send,
  Loader2,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { useRouter } from 'next/navigation';
import { MarkdownRenderer } from '@/components/common/MarkdownRenderer';

const PRESET_DIRECTIVES = [
  {
    title: 'Surgical Auth Refactor',
    prompt: 'Refactor authentication controller to validate JWT bearer tokens and reject expired sessions.',
    icon: ShieldCheck,
    color: '#3fb950',
  },
  {
    title: 'Semantic Code Retrieval',
    prompt: 'Perform 1536d semantic vector query across AST graph to locate token optimization hotspots.',
    icon: Database,
    color: '#58a6ff',
  },
  {
    title: 'SWE-bench Invariant Synthesis',
    prompt: 'Synthesize invariant regression assertions and calculate zero-drift coverage for core AST modules.',
    icon: Zap,
    color: '#bc8cff',
  },
  {
    title: 'TokenFold Signature Compression',
    prompt: 'Compress AST call graph signatures and bound progressive disclosure footprint along S^1 manifold.',
    icon: Layers,
    color: '#d29922',
  },
];

const QUICK_ACTIONS = [
  { cmd: 'RUN SWEEP', desc: 'Trigger PSMAS Multi-Agent Execution', action: 'startSweep', icon: Play, color: '#3fb950' },
  { cmd: 'ACCEPT ALL', desc: 'Accept all pending surgical diff hunks', action: 'acceptAll', icon: CheckCircle2, color: '#3fb950' },
  { cmd: 'OPEN IDE', desc: 'Open Monaco Code Editor workspace', action: 'navigateIDE', icon: Code, color: '#bc8cff' },
  { cmd: 'VIEW DIFFS', desc: 'Open Surgical Diff Picker workspace', action: 'navigateDiff', icon: GitPullRequest, color: '#d29922' },
  { cmd: 'VIEW GRAPH', desc: 'Open ObjectGraph AST Canvas', action: 'navigateGraph', icon: Network, color: '#3fb950' },
];

export default function CommandPage() {
  const [promptInput, setPromptInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executedCmd, setExecutedCmd] = useState<string | null>(null);

  const nodes = useOmniStore(state => state.nodes);
  const logs = useOmniStore(state => state.logs);
  const activeScenario = useOmniStore(state => state.activeScenario);
  const files = useOmniStore(state => state.files);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const acceptAllHunks = useOmniStore(state => state.acceptAllHunks);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);
  const selectNode = useOmniStore(state => state.selectNode);
  const openIngestModal = useOmniStore(state => state.openIngestModal);
  const router = useRouter();
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  const isRealRepoIngested = files.length > 0 || nodes.length > 0 || activeScenario?.id !== 'empty';

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('command-prompt-input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!isRealRepoIngested) {
    return (
      <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0 items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <Terminal className="w-16 h-16 text-[#f85149]/50 mx-auto" />
          <h2 className="text-xl font-bold text-[#e6edf3]">No Repository Ingested</h2>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            The Multi-Agent Command Terminal orchestrates real sweeps on your codebase.
            Connect a GitHub repository to dispatch the Mayor→Polecat→Witness→Refinery swarm.
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

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('command-prompt-input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDispatchSwarm = async (customPrompt?: string) => {
    const effectivePrompt = customPrompt || promptInput;
    if (!effectivePrompt.trim() || isExecuting) return;

    setIsExecuting(true);
    await startPSMASSweep(effectivePrompt);
    setIsExecuting(false);
  };

  const executeCommand = (action: string) => {
    setExecutedCmd(action);
    setTimeout(() => setExecutedCmd(null), 1500);

    switch (action) {
      case 'startSweep':
        startPSMASSweep();
        router.push('/psmas');
        break;
      case 'acceptAll':
        acceptAllHunks();
        break;
      case 'navigateGraph':
        router.push('/graph');
        break;
      case 'navigateIDE':
        router.push('/ide');
        break;
      case 'navigateDiff':
        router.push('/diff');
        break;
      case 'openBarrier':
        openApprovalModal();
        break;
    }
  };

  const handleNodeClick = (nodeId: string) => {
    selectNode(nodeId);
    router.push('/graph');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Header */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Autonomous Multi-Agent Command Terminal & Swarm Orchestrator
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 7</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#3fb950] bg-[#238636]/20 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse"></span>
            Memory & Vector Index Connected
          </span>
        </div>
      </div>

      {/* Main Interactive Prompt Bar */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl shrink-0">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase text-[#8b949e] tracking-wider flex items-center gap-2 font-mono">
            <Sparkles className="w-4 h-4 text-[#d29922]" />
            <span>Multi-Agent Swarm Directive (Mayor &rarr; Polecat &rarr; Witness &rarr; Refinery)</span>
          </label>
          <span className="text-[10px] text-[#6e7681] font-mono hidden xs:inline">Press ⌘K to focus</span>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Terminal className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#58a6ff]" />
            <input
              id="command-prompt-input"
              type="text"
              placeholder="Enter engineering task (e.g. 'Refactor JWT auth claims and generate SWE-bench test assertions')..."
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleDispatchSwarm();
                }
              }}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#e6edf3] placeholder-[#6e7681] focus:outline-none transition-colors font-mono"
            />
          </div>

          <button
            onClick={() => handleDispatchSwarm()}
            disabled={isExecuting || !promptInput.trim()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-[#ffffff] font-bold text-xs font-mono transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow"
          >
            {isExecuting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ORCHESTRATING...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>DISPATCH SWARM</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Directives */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-1">
          <span className="text-[10px] font-mono text-[#8b949e] shrink-0">Presets:</span>
          {PRESET_DIRECTIVES.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  setPromptInput(p.prompt);
                  handleDispatchSwarm(p.prompt);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-[11px] font-mono text-[#e6edf3] hover:text-[#58a6ff] transition-all shrink-0"
              >
                <Icon className="w-3 h-3 text-[#58a6ff]" />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Execution & Traversal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 flex-1 min-h-0">
        {/* Left: Live Multi-Agent Output Terminal with MarkdownRenderer */}
        <div className="lg:col-span-2 flex flex-col p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] min-h-[350px] shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#30363d] shrink-0 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#3fb950]" />
              <span className="font-bold text-[#e6edf3]">Live Multi-Agent Reasoning & Synthesis Stream</span>
            </div>
            <button
              onClick={() => router.push('/diff')}
              className="text-[10px] text-[#58a6ff] hover:underline flex items-center gap-1"
            >
              <span>View Diff Picker</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3 font-sans">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#8b949e] space-y-2 p-6 text-center">
                <Terminal className="w-8 h-8 text-[#30363d] animate-pulse" />
                <p className="text-xs font-mono">Agent swarm idle. Type a directive above or click a preset to orchestrate Mayor, Polecat, Witness, and Refinery.</p>
              </div>
            ) : (
              logs.slice(0, 15).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5 shadow"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8b949e] border-b border-[#21262d] pb-1">
                    <span className="font-bold text-[#58a6ff]">{log.agentName}</span>
                    <div className="flex items-center gap-2">
                      <span>[{log.timestamp}]</span>
                      <span className="text-[#3fb950] font-bold">+{log.tokenDelta || 12}t</span>
                    </div>
                  </div>
                  <MarkdownRenderer content={log.message} />
                </div>
              ))
            )}
            <div ref={terminalBottomRef} />
          </div>
        </div>

        {/* Right: Quick Actions & AST Symbols */}
        <div className="space-y-3 flex flex-col min-h-0">
          {/* Quick Actions */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2.5 shadow-xl shrink-0">
            <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider flex items-center gap-2 font-mono">
              <Zap className="w-4 h-4 text-[#3fb950]" />
              <span>Workspace Actions</span>
            </h2>

            <div className="space-y-1.5 font-mono">
              {QUICK_ACTIONS.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => executeCommand(q.action)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff]/40 text-xs text-[#e6edf3] transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: q.color }} />
                      <span className="font-bold">{q.cmd}</span>
                    </div>
                    <span className="text-[10px] text-[#8b949e]">{q.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active AST Symbols Matrix */}
          <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2.5 shadow-xl flex-1 flex flex-col min-h-0">
            <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider flex items-center gap-2 font-mono">
              <Layers className="w-4 h-4 text-[#bc8cff]" />
              <span>AST Symbol Matrix ({nodes.length})</span>
            </h2>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 font-mono pr-1">
              {nodes.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNodeClick(n.id)}
                  className="p-2 rounded-lg bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] hover:border-[#bc8cff]/40 cursor-pointer transition-all flex items-center justify-between text-xs"
                >
                  <div className="truncate">
                    <div className="font-bold text-[#e6edf3] truncate">{n.label}</div>
                    <div className="text-[10px] text-[#8b949e] truncate">{n.path}</div>
                  </div>
                  <span className="text-[10px] bg-[#21262d] text-[#79c0ff] px-1.5 py-0.5 rounded shrink-0">
                    {n.tokenCount}t &rarr; {n.compressedTokens}t
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
