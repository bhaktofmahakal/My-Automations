'use client';

import React, { useState } from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Terminal, Trash2, Filter, Copy, Check, Radio, Cpu, Sparkles } from 'lucide-react';
import { LogLevel } from '@/lib/types';

const LEVEL_COLORS: Record<LogLevel, { badge: string; text: string }> = {
  info: { badge: 'bg-zinc-800 text-zinc-300 border-zinc-700', text: 'text-zinc-300' },
  reasoning: { badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', text: 'text-cyan-200' },
  traversal: { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', text: 'text-indigo-200' },
  patch: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', text: 'text-emerald-200' },
  test: { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', text: 'text-amber-200' },
  security: { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', text: 'text-rose-200' },
  success: { badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold', text: 'text-emerald-300' },
  warn: { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30', text: 'text-amber-300' },
  error: { badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold', text: 'text-rose-300' },
};

export const TerminalLogs: React.FC = () => {
  const logs = useOmniStore(state => state.logs);
  const clearLogs = useOmniStore(state => state.clearLogs);
  const logFilter = useOmniStore(state => state.logFilter);
  const setLogFilter = useOmniStore(state => state.setLogFilter);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLogs = logs.filter(
    log => logFilter === 'all' || log.level === logFilter
  );

  const copyLog = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#090a0f] border border-[#222638] rounded-xl overflow-hidden shadow-2xl font-mono">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0e1017] border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-semibold text-zinc-200">
            PSMAS Reasoning & Traversal Stream
          </span>
          <span className="text-[10px] text-zinc-500 bg-[#141722] px-1.5 py-0.5 rounded border border-[#222638]">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-[#141722] px-2 py-0.5 rounded border border-[#222638]">
            <Filter className="w-3 h-3 text-zinc-500" />
            <select
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="bg-transparent text-[11px] text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="all">All Events</option>
              <option value="reasoning">Reasoning</option>
              <option value="traversal">Traversal</option>
              <option value="patch">Patches</option>
              <option value="test">Tests</option>
              <option value="security">Security</option>
            </select>
          </div>

          <button
            onClick={clearLogs}
            title="Clear Stream"
            className="p-1 rounded hover:bg-[#1a1e2d] text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs select-text">
        {filteredLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-600 space-y-2">
            <Radio className="w-6 h-6 text-zinc-700 animate-pulse" />
            <p className="text-[11px]">Stream idle. Click &quot;Run PSMAS Sweep&quot; to activate agent attention.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            const styles = LEVEL_COLORS[log.level] || LEVEL_COLORS.info;

            return (
              <div
                key={log.id}
                className="group relative p-2.5 rounded-lg bg-[#0e1017] hover:bg-[#12141e] border border-[#1e2233] transition-all"
              >
                {/* Header row */}
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-1.5 border-b border-[#1a1e2d]">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400 font-bold">{log.agentName}</span>
                    <span className="text-zinc-600">[{log.timestamp}]</span>
                    <span className="text-zinc-600">&phi; = {log.phaseAngle}&deg;</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase border ${styles.badge}`}>
                      {log.level}
                    </span>
                    {log.tokenDelta && (
                      <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded">
                        +{log.tokenDelta}t
                      </span>
                    )}
                    <button
                      onClick={() => copyLog(log.id, log.message)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-zinc-400 hover:text-zinc-200"
                    >
                      {copiedId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className={`mt-1.5 text-xs whitespace-pre-wrap leading-relaxed ${styles.text}`}>
                  {log.message}
                </div>

                {/* Subgraph Node tag if applicable */}
                {log.subgraphNodeId && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-cyan-400">
                    <Cpu className="w-3 h-3" />
                    <span>Target AST Node: <code className="bg-[#141722] px-1 py-0.5 rounded border border-[#222638] text-cyan-300">{log.subgraphNodeId}</code></span>
                  </div>
                )}

                {/* Code Snippet Box */}
                {log.codeSnippet && (
                  <pre className="mt-2 p-2 rounded bg-[#07080b] border border-[#222638] text-[11px] text-emerald-300 overflow-x-auto font-mono">
                    {log.codeSnippet}
                  </pre>
                )}

                {/* Compressed Memory Handoff Indicator */}
                {log.memoryBroadcast && (
                  <div className="mt-2 p-2 rounded bg-indigo-950/20 border border-indigo-500/30 text-[10px] text-indigo-300 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        O(1) Compressed Memory Broadcast
                      </span>
                      <span className="text-emerald-400">{log.memoryBroadcast.compressionRatio}</span>
                    </div>
                    <p className="text-zinc-300">{log.memoryBroadcast.summary}</p>
                    <div className="text-zinc-500 text-[9px]">
                      Broadcast Targets: {log.memoryBroadcast.targetAgents.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
