'use client';

import React, { useState } from 'react';
import { Activity, Lightbulb, FileText, Search, Edit3, ShieldCheck, CheckCircle2, ArrowRight, X, Clock, Cpu, FileCode } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

const TIMELINE_STAGES = [
  {
    id: 'thinking',
    name: 'Thinking',
    agent: 'Architect',
    time: '12:01:32',
    duration: '2.1s',
    detail: 'Analyzing objective, decomposing task into subproblems, identifying AST dependency boundaries.',
    icon: Lightbulb,
    color: '#58a6ff',
    borderColor: '#58a6ff',
    tokensUsed: 420,
    filesInspected: ['src/auth/auth.ts', 'src/auth/jwt.ts'],
    reasoning: 'The auth module has high cyclomatic complexity. Breaking it into JWT verification, session management, and middleware layers will reduce token cost per traversal by ~40%.',
  },
  {
    id: 'reading',
    name: 'Reading',
    agent: 'CodeWriter',
    time: '12:01:34',
    duration: '6.8s',
    detail: 'Scanning 18 source files via progressive AST disclosure. Loading only modified subtrees.',
    icon: FileText,
    color: '#3fb950',
    borderColor: '#3fb950',
    tokensUsed: 1240,
    filesInspected: ['src/auth/auth.ts', 'src/auth/jwt.ts', 'src/auth/session.ts', 'src/middleware/cors.ts'],
    reasoning: 'Using TokenFold progressive disclosure to load only auth.ts and jwt.ts initially. Session module loaded lazily when JWT dependency detected.',
  },
  {
    id: 'grepping',
    name: 'Grepping',
    agent: 'TestRunner',
    time: '12:01:41',
    duration: '8.2s',
    detail: 'Found 142 pattern matches across 18 files. Filtering to 12 relevant assertion points.',
    icon: Search,
    color: '#d29922',
    borderColor: '#d29922',
    tokensUsed: 380,
    filesInspected: ['src/auth/auth.test.ts', 'src/auth/__tests__/jwt.spec.ts'],
    reasoning: 'Grep pattern: /verify|sign|decode|expire/. 142 raw matches reduced to 12 assertion-relevant locations via AST scope filtering.',
  },
  {
    id: 'editing',
    name: 'Editing',
    agent: 'CodeWriter',
    time: '12:01:49',
    duration: '14.3s',
    detail: 'Generating 3 surgical diff hunks. Applying atomic patches to auth.ts and jwt.ts.',
    icon: Edit3,
    color: '#3fb950',
    borderColor: '#3fb950',
    tokensUsed: 890,
    filesInspected: ['src/auth/auth.ts', 'src/auth/jwt.ts'],
    reasoning: 'Generated 3 hunks: (1) Replace raw context with compressedContext in runAgent call, (2) Add JWT expiry validation guard, (3) Extract session token refresh into standalone function.',
  },
  {
    id: 'validating',
    name: 'Validating',
    agent: 'SecurityReviewer',
    time: '12:02:03',
    duration: '15.1s',
    detail: 'Running security checks, validating JWT token handling, checking for injection vulnerabilities.',
    icon: ShieldCheck,
    color: '#f85149',
    borderColor: '#f85149',
    tokensUsed: 560,
    filesInspected: ['src/auth/auth.ts', 'src/auth/jwt.ts', 'src/middleware/rateLimit.ts'],
    reasoning: 'PASS: No SQL injection vectors detected. PASS: JWT secret not hardcoded. WARNING: Rate limiter threshold set to 1000/min may be too high for auth endpoints.',
  },
  {
    id: 'complete',
    name: 'Complete',
    agent: 'All Agents',
    time: '12:02:18',
    duration: '—',
    detail: 'Task completed. 3 hunks pending human review. Total token reduction: 72%.',
    icon: CheckCircle2,
    color: '#3fb950',
    borderColor: '#3fb950',
    tokensUsed: 0,
    filesInspected: [],
    reasoning: 'All 4 agents completed their phases. 3 surgical diff hunks awaiting human approval in the Safe Barrier modal. Estimated savings: $0.039 per task.',
  },
];

export const AgentTimeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const currentStepIndex = useOmniStore(state => state.currentStepIndex);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);

  const activeStage = TIMELINE_STAGES.find(s => s.id === selectedStage);

  return (
    <div className="w-full rounded-xl bg-[#161b22] border border-[#30363d] p-3 sm:p-4 text-[#e6edf3] font-sans select-none shadow-xl min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-[#30363d] px-1 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">
            Agent Activity Timeline
          </h3>
          {isAgentRunning && (
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#3fb950]/10 text-[#3fb950] border border-[#238636] animate-pulse font-mono shrink-0">
              LIVE
            </span>
          )}
        </div>

        <span className="text-[10px] text-[#8b949e] font-mono">Click a stage to inspect</span>
      </div>

      {/* ── Horizontal Stage Cards Sequence ── */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto custom-scrollbar py-2 px-1 min-w-0">
        {TIMELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isLast = idx === TIMELINE_STAGES.length - 1;
          const isActive = isAgentRunning && idx === currentStepIndex;
          const isSelected = selectedStage === stage.id;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Card */}
              <div
                onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                className={`flex-1 min-w-[130px] sm:min-w-[145px] p-2 sm:p-2.5 rounded-xl bg-[#0d1117] border transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'border-[#58a6ff] shadow-[0_0_16px_rgba(88,166,255,0.3)] scale-[1.02]'
                    : isActive
                    ? 'border-[#58a6ff] shadow-[0_0_12px_rgba(88,166,255,0.25)]'
                    : 'border-[#30363d] hover:border-[#8b949e]'
                }`}
                style={{ borderColor: isSelected ? '#58a6ff' : isActive ? stage.borderColor : undefined }}
              >
                {/* Stage Title & Icon */}
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'animate-pulse' : ''}`} style={{ color: stage.color }} />
                  <span className="text-xs font-semibold truncate" style={{ color: stage.color }}>
                    {stage.name}
                  </span>
                </div>

                {/* Agent & Timestamp */}
                <div className="text-[10px] sm:text-[11px] text-[#8b949e] font-medium truncate">
                  {stage.agent}
                </div>
                <div className="text-[9px] sm:text-[10px] font-mono text-[#6e7681] mt-0.5">
                  {stage.time}
                </div>

                {/* Detail string */}
                <div className="text-[9px] sm:text-[10px] text-[#8b949e] truncate mt-1">
                  {stage.detail}
                </div>
              </div>

              {/* Connecting Arrow between cards */}
              {!isLast && (
                <div className="px-1 text-[#3fb950] shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Stage Detail Inspector (Modal-like Drawer) ── */}
      {activeStage && (
        <div className="mt-3 p-3 sm:p-4 rounded-xl bg-[#0d1117] border border-[#58a6ff]/30 space-y-3 shadow-[0_0_20px_rgba(88,166,255,0.1)] animate-in fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <activeStage.icon className="w-4 h-4 shrink-0" style={{ color: activeStage.color }} />
              <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: activeStage.color }}>{activeStage.name}</h4>
              <span className="text-[10px] text-[#8b949e] font-mono shrink-0">({activeStage.agent})</span>
            </div>
            <button
              onClick={() => setSelectedStage(null)}
              className="p-1 rounded hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] transition-colors shrink-0"
              aria-label="Close inspector"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Detail */}
          <p className="text-xs text-[#e6edf3] leading-relaxed">{activeStage.detail}</p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Clock className="w-3 h-3 text-[#8b949e] mb-1" />
              <span className="text-[#6e7681] text-[9px] block">Duration</span>
              <span className="text-[#e6edf3] font-bold">{activeStage.duration}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <Cpu className="w-3 h-3 text-[#8b949e] mb-1" />
              <span className="text-[#6e7681] text-[9px] block">Tokens Used</span>
              <span className="text-[#3fb950] font-bold">{activeStage.tokensUsed}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <FileCode className="w-3 h-3 text-[#8b949e] mb-1" />
              <span className="text-[#6e7681] text-[9px] block">Files Inspected</span>
              <span className="text-[#58a6ff] font-bold">{activeStage.filesInspected.length}</span>
            </div>
          </div>

          {/* Files List */}
          {activeStage.filesInspected.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-[#6e7681] font-medium">Files:</span>
              <div className="flex flex-wrap gap-1">
                {activeStage.filesInspected.map((f, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[10px] text-[#58a6ff] font-mono truncate max-w-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reasoning Log */}
          <div className="p-2.5 rounded-lg bg-[#07080b] border border-[#222638] text-[11px] text-[#8b949e] leading-relaxed font-mono break-words">
            <span className="text-[#6e7681] text-[9px] block mb-1">Agent Reasoning:</span>
            {activeStage.reasoning}
          </div>
        </div>
      )}
    </div>
  );
};
