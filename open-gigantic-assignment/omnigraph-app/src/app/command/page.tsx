'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Search, Zap, Code, ShieldCheck, Play, ArrowRight, Network, GitPullRequest, CheckCircle2, LayoutGrid, ExternalLink } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { useRouter } from 'next/navigation';

const COMMANDS = [
  { cmd: 'RUN SWEEP', desc: 'Trigger Phase-Staggered Multi-Agent Execution', category: 'PSMAS', action: 'startSweep', icon: Play, color: '#3fb950' },
  { cmd: 'ACCEPT ALL', desc: 'Accept all pending surgical diff hunks', category: 'Diff', action: 'acceptAll', icon: CheckCircle2, color: '#3fb950' },
  { cmd: 'TIDY CANVAS', desc: 'Auto-arrange graph nodes in hierarchical layout', category: 'ObjectGraph', action: 'navigateGraph', icon: LayoutGrid, color: '#58a6ff' },
  { cmd: 'OPEN IDE', desc: 'Open Monaco Code Editor workspace', category: 'IDE', action: 'navigateIDE', icon: Code, color: '#bc8cff' },
  { cmd: 'SAFE BARRIER', desc: 'Enforce human-in-the-loop validation barrier', category: 'Security', action: 'openBarrier', icon: ShieldCheck, color: '#d29922' },
  { cmd: 'VIEW DIFFS', desc: 'Open Surgical Diff Picker workspace', category: 'Diff', action: 'navigateDiff', icon: GitPullRequest, color: '#d29922' },
  { cmd: 'VIEW GRAPH', desc: 'Open ObjectGraph AST Canvas', category: 'Graph', action: 'navigateGraph', icon: Network, color: '#3fb950' },
];

export default function CommandPage() {
  const [query, setQuery] = useState('');
  const [executedCmd, setExecutedCmd] = useState<string | null>(null);
  const nodes = useOmniStore(state => state.nodes);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const acceptAllHunks = useOmniStore(state => state.acceptAllHunks);
  const openApprovalModal = useOmniStore(state => state.openApprovalModal);
  const selectNode = useOmniStore(state => state.selectNode);
  const router = useRouter();

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('command-search-input');
        input?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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

  const filteredCommands = COMMANDS.filter(c =>
    c.cmd.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNodes = nodes.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase()) ||
    n.path.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Header */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Command Center (⌘K) & AST Traversal Matrix
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 7</span>
        </div>
        <span className="text-[10px] text-[#6e7681] font-mono hidden xs:inline shrink-0">Press ⌘K to focus</span>
      </div>

      {/* Main Search Input */}
      <div className="relative shrink-0">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#8b949e]" />
        <input
          id="command-search-input"
          type="text"
          placeholder="Type a command or search .og AST symbols, functions, or files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#161b22] border-2 border-[#30363d] focus:border-[#58a6ff] rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-4 text-xs sm:text-sm font-mono text-[#e6edf3] placeholder-[#6e7681] focus:outline-none transition-colors shadow-2xl"
        />
      </div>

      {/* Commands Grid & AST Node Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 font-mono text-xs">
        {/* Left: Quick Actions */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl">
          <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider">
            System Commands & Shortcuts ({filteredCommands.length})
          </h2>
          <div className="space-y-2">
            {filteredCommands.map((c, i) => {
              const Icon = c.icon;
              const isExecuted = executedCmd === c.action;
              return (
                <div
                  key={i}
                  onClick={() => executeCommand(c.action)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all gap-2 ${
                    isExecuted
                      ? 'bg-[#16291e] border-[#238636] shadow-[0_0_12px_rgba(63,185,80,0.3)]'
                      : 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff] hover:shadow-[0_0_8px_rgba(88,166,255,0.15)]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: c.color }} />
                    <span className="px-2 py-0.5 rounded bg-[#21262d] font-bold text-[10px] shrink-0" style={{ color: c.color }}>
                      {c.cmd}
                    </span>
                    <span className="text-[#e6edf3] text-xs truncate">{c.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-[#6e7681] hidden sm:inline">{c.category}</span>
                    {isExecuted && <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AST Symbol Search Results */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl">
          <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider">
            Indexed ObjectGraph (.og) AST Nodes ({filteredNodes.length})
          </h2>
          <div className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto pr-1 custom-scrollbar">
            {filteredNodes.map(n => (
              <div
                key={n.id}
                onClick={() => handleNodeClick(n.id)}
                className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-1 cursor-pointer hover:border-[#58a6ff] hover:shadow-[0_0_8px_rgba(88,166,255,0.15)] transition-all group"
              >
                <div className="flex items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-[#58a6ff] truncate">{n.label}</span>
                    <ExternalLink className="w-3 h-3 text-[#6e7681] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <span className="text-[10px] text-[#3fb950] bg-[#16291e] px-1.5 py-0.5 rounded border border-[#238636] shrink-0">
                    {n.tokenCount} tokens
                  </span>
                </div>
                <div className="text-[10px] text-[#8b949e] font-mono truncate">{n.path}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
