'use client';

import React, { useState, useMemo } from 'react';
import {
  Activity,
  Lightbulb,
  FileText,
  Search,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  X,
  Clock,
  Cpu,
  FileCode,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const AgentTimeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const currentStepIndex = useOmniStore((state) => state.currentStepIndex);
  const isAgentRunning = useOmniStore((state) => state.isAgentRunning);
  const agents = useOmniStore((state) => state.agents);
  const logs = useOmniStore((state) => state.logs);
  const activeScenario = useOmniStore((state) => state.activeScenario);
  const telemetry = useOmniStore((state) => state.telemetry);
  const files = useOmniStore((state) => state.files);
  const nodes = useOmniStore((state) => state.nodes);

  // Dynamically compute stages based on live active codebase & agents
  const stages = useMemo(() => {
    const filePaths = files.map((f) => f.path);
    const architectLogs = logs.filter((l) => l.agentId === 'architect');
    const codewriterLogs = logs.filter((l) => l.agentId === 'codewriter');
    const testLogs = logs.filter((l) => l.agentId === 'testrunner');
    const securityLogs = logs.filter((l) => l.agentId === 'security');

    return [
      {
        id: 'thinking',
        name: 'Thinking & Topology',
        agent: 'Architect Agent (θ = 0°)',
        status: agents.find((a) => a.id === 'architect')?.status || 'idle',
        duration: '1.8s',
        detail: `Decomposing ${activeScenario.title} into ${nodes.length} AST subproblem nodes.`,
        icon: Lightbulb,
        color: '#58a6ff',
        borderColor: '#58a6ff',
        tokensUsed: telemetry.totalInputTokens ? Math.ceil(telemetry.totalInputTokens * 0.25) : 0,
        filesInspected: filePaths.slice(0, 3),
        reasoning:
          architectLogs[0]?.message ||
          `Ingesting ${activeScenario.title} graph hierarchy. Analyzing call sites, class exports, and function dependencies.`,
      },
      {
        id: 'reading',
        name: 'AST Traversal',
        agent: 'Architect / Planner',
        status: agents.find((a) => a.id === 'architect')?.status === 'completed' ? 'completed' : 'idle',
        duration: '3.2s',
        detail: `Progressive AST disclosure across ${nodes.length} nodes (${telemetry.activeGraphNodes} loaded).`,
        icon: FileText,
        color: '#3fb950',
        borderColor: '#3fb950',
        tokensUsed: telemetry.totalInputTokens ? Math.ceil(telemetry.totalInputTokens * 0.35) : 0,
        filesInspected: filePaths,
        reasoning:
          architectLogs[1]?.message ||
          `Loaded ${telemetry.activeGraphNodes} disclosed subtrees into working context. Saved ${telemetry.tokensSaved.toLocaleString()} tokens via TokenFold compression.`,
      },
      {
        id: 'editing',
        name: 'Surgical Patching',
        agent: 'CodeWriter Agent (θ = 90°)',
        status: agents.find((a) => a.id === 'codewriter')?.status || 'idle',
        duration: '4.5s',
        detail: `Generating unified diff patches for target issue in ${files[0]?.path || 'source'}.`,
        icon: Edit3,
        color: '#3fb950',
        borderColor: '#3fb950',
        tokensUsed: telemetry.totalOutputTokens ? Math.ceil(telemetry.totalOutputTokens * 0.4) : 0,
        filesInspected: filePaths.slice(0, 2),
        reasoning:
          codewriterLogs[0]?.message ||
          `Synthesizing atomic AST diff hunks with strict indentation boundaries and zero context bleeding.`,
      },
      {
        id: 'grepping',
        name: 'Assertion Testing',
        agent: 'TestRunner Agent (θ = 180°)',
        status: agents.find((a) => a.id === 'testrunner')?.status || 'idle',
        duration: '2.4s',
        detail: `Validating regression assertions against active scenario specification.`,
        icon: Search,
        color: '#d29922',
        borderColor: '#d29922',
        tokensUsed: telemetry.totalOutputTokens ? Math.ceil(telemetry.totalOutputTokens * 0.3) : 0,
        filesInspected: filePaths.filter((p) => p.includes('test') || p.includes('spec')),
        reasoning:
          testLogs[0]?.message ||
          `Evaluated unit test assertion coverage. Checked boundary conditions for mutated AST nodes.`,
      },
      {
        id: 'validating',
        name: 'Security Audit',
        agent: 'SecurityReviewer (θ = 270°)',
        status: agents.find((a) => a.id === 'security')?.status || 'idle',
        duration: '2.1s',
        detail: `Scanning generated patches for RBAC leaks, injection risks, and syntax anomalies.`,
        icon: ShieldCheck,
        color: '#f85149',
        borderColor: '#f85149',
        tokensUsed: telemetry.totalOutputTokens ? Math.ceil(telemetry.totalOutputTokens * 0.3) : 0,
        filesInspected: filePaths,
        reasoning:
          securityLogs[0]?.message ||
          `Audited diff changes against OWASP standards. Verified parameter sanitization and token security.`,
      },
      {
        id: 'complete',
        name: 'Human Approval Gate',
        agent: 'PSMAS Swarm Engine',
        status: agents.every((a) => a.status === 'completed') ? 'completed' : 'idle',
        duration: '—',
        detail: `Execution sweep complete. Diffs ready for surgical hunk-by-hunk review.`,
        icon: CheckCircle2,
        color: '#3fb950',
        borderColor: '#3fb950',
        tokensUsed: telemetry.totalInputTokens + telemetry.totalOutputTokens,
        filesInspected: filePaths,
        reasoning: `Phase sweep completed across all 4 quadrants on unit circle S^1. Total token reduction: ${telemetry.savingsPercentage}%.`,
      },
    ];
  }, [activeScenario, files, nodes, agents, logs, telemetry]);

  const activeStage = stages.find((s) => s.id === selectedStage);

  return (
    <div className="w-full rounded-xl bg-[#161b22] border border-[#30363d] p-3 sm:p-4 text-[#e6edf3] font-sans select-none shadow-xl min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between pb-2 mb-2 border-b border-[#30363d] px-1 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h3 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">
            Live Execution Sequence — {activeScenario.title}
          </h3>
          {isAgentRunning && (
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#3fb950]/10 text-[#3fb950] border border-[#238636] animate-pulse font-mono shrink-0">
              SWEEP ACTIVE
            </span>
          )}
        </div>

        <span className="text-[10px] text-[#8b949e] font-mono">Click a stage to inspect reasoning</span>
      </div>

      {/* ── Horizontal Stage Cards Sequence ── */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto custom-scrollbar py-2 px-1 min-w-0">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isLast = idx === stages.length - 1;
          const isActive = isAgentRunning && idx === currentStepIndex;
          const isSelected = selectedStage === stage.id;
          const isCompleted = stage.status === 'completed';

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
                    : isCompleted
                    ? 'border-[#238636]/60'
                    : 'border-[#30363d] hover:border-[#8b949e]'
                }`}
              >
                {/* Stage Title & Icon */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'animate-pulse' : ''}`}
                      style={{ color: stage.color }}
                    />
                    <span className="text-xs font-semibold truncate" style={{ color: stage.color }}>
                      {stage.name}
                    </span>
                  </div>
                  {isCompleted && (
                    <span className="text-[9px] text-[#3fb950] font-mono font-bold">✓</span>
                  )}
                </div>

                {/* Agent & Detail */}
                <div className="text-[10px] sm:text-[11px] text-[#8b949e] font-medium truncate">
                  {stage.agent}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#6e7681] truncate mt-1">
                  {stage.detail}
                </div>
              </div>

              {/* Connecting Arrow between cards */}
              {!isLast && (
                <div className="px-1 text-[#30363d] shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Stage Detail Inspector Drawer ── */}
      {activeStage && (
        <div className="mt-3 p-3 sm:p-4 rounded-xl bg-[#0d1117] border border-[#58a6ff]/30 space-y-3 shadow-[0_0_20px_rgba(88,166,255,0.1)] animate-in fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <activeStage.icon className="w-4 h-4 shrink-0" style={{ color: activeStage.color }} />
              <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: activeStage.color }}>
                {activeStage.name}
              </h4>
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
              <span className="text-[#6e7681] text-[9px] block">Estimated Tokens</span>
              <span className="text-[#3fb950] font-bold">{activeStage.tokensUsed}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#161b22] border border-[#30363d]">
              <FileCode className="w-3 h-3 text-[#8b949e] mb-1" />
              <span className="text-[#6e7681] text-[9px] block">Files Under Scope</span>
              <span className="text-[#58a6ff] font-bold">{activeStage.filesInspected.length}</span>
            </div>
          </div>

          {/* Files List */}
          {activeStage.filesInspected.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-[#6e7681] font-medium">Target Files:</span>
              <div className="flex flex-wrap gap-1">
                {activeStage.filesInspected.map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#161b22] border border-[#30363d] text-[10px] text-[#58a6ff] font-mono truncate max-w-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reasoning Log */}
          <div className="p-2.5 rounded-lg bg-[#07080b] border border-[#222638] text-[11px] text-[#8b949e] leading-relaxed font-mono break-words">
            <span className="text-[#6e7681] text-[9px] block mb-1">Agent Stream Output / Reasoning:</span>
            {activeStage.reasoning}
          </div>
        </div>
      )}
    </div>
  );
};
