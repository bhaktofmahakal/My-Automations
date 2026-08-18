'use client';

import React, { useState } from 'react';
import { Terminal, Search, Zap, Code, ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

const COMMANDS = [
  { cmd: '⌘ + K', desc: 'Open Command Palette & AST Search', category: 'Global' },
  { cmd: 'RUN SWEEP', desc: 'Trigger Phase-Staggered Multi-Agent Execution', category: 'PSMAS' },
  { cmd: 'ACCEPT HUNK', desc: 'Reconstitute approved AST diff hunk into source code', category: 'Diff' },
  { cmd: 'DISCLOSE AST', desc: 'Progressively un-fold signature token footprint', category: 'ObjectGraph' },
  { cmd: 'SAFE BARRIER', desc: 'Enforce human-in-the-loop validation barrier', category: 'Security' },
];

export default function CommandPage() {
  const [query, setQuery] = useState('');
  const nodes = useOmniStore(state => state.nodes);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);

  const filteredNodes = nodes.filter(n =>
    n.label.toLowerCase().includes(query.toLowerCase()) ||
    n.path.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-4 font-sans select-none space-y-4 overflow-y-auto">
      {/* Header */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#58a6ff]" />
          <h1 className="font-bold text-[#e6edf3]">Command Center (⌘K) & AST Traversal Matrix</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 7</span>
        </div>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8b949e]" />
        <input
          type="text"
          placeholder="Type a command or search .og AST symbols, functions, or files..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#161b22] border-2 border-[#30363d] focus:border-[#58a6ff] rounded-xl py-3 pl-12 pr-4 text-sm font-mono text-[#e6edf3] placeholder-[#6e7681] focus:outline-none transition-colors shadow-2xl"
        />
      </div>

      {/* Commands Grid & AST Node Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {/* Left: Quick Actions */}
        <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
          <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider">
            System Commands & Shortcuts
          </h2>
          <div className="space-y-2">
            {COMMANDS.map((c, i) => (
              <div
                key={i}
                onClick={c.cmd === 'RUN SWEEP' ? startPSMASSweep : undefined}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#58a6ff] font-bold text-[10px]">
                    {c.cmd}
                  </span>
                  <span className="text-[#e6edf3] text-xs">{c.desc}</span>
                </div>
                <span className="text-[10px] text-[#6e7681]">{c.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AST Symbol Search Results */}
        <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
          <h2 className="text-xs font-bold uppercase text-[#8b949e] tracking-wider">
            Indexed ObjectGraph (.og) AST Nodes ({filteredNodes.length})
          </h2>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredNodes.map(n => (
              <div key={n.id} className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#58a6ff]">{n.label}</span>
                  <span className="text-[10px] text-[#3fb950] bg-[#16291e] px-1.5 py-0.5 rounded border border-[#238636]">
                    {n.tokenCount} tokens
                  </span>
                </div>
                <div className="text-[10px] text-[#8b949e] font-mono">{n.path}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
