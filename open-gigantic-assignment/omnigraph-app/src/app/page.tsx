'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Code,
  Network,
  Radio,
  GitPullRequest,
  BarChart3,
  Terminal,
  Users,
  Clock,
  Settings,
  ArrowRight,
  Zap,
  ShieldCheck,
  Sparkles,
  Play,
  CheckCircle2,
  Layers,
  FolderGit2,
  Check,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

const MODULE_CARDS = [
  {
    href: '/ide',
    title: 'Monaco Code IDE',
    desc: 'Full-screen VS Code Monaco subsystem with multi-tab syntax editing & live surgical diff inspection.',
    icon: Code,
    badge: 'Screen 2',
    color: '#38bdf8',
    liveKey: 'files',
  },
  {
    href: '/graph',
    title: 'ObjectGraph AST Canvas',
    desc: 'Interactive @xyflow/react dependency graph with AST progressive disclosure & token footprint inspection.',
    icon: Network,
    badge: 'Screen 3',
    color: '#3fb950',
    liveKey: 'nodes',
  },
  {
    href: '/psmas',
    title: 'PSMAS Swarm Radar & Terminal',
    desc: 'Phase-Staggered Multi-Agent circular manifold execution radar & live streaming reasoning logs.',
    icon: Radio,
    badge: 'Screen 4',
    color: '#bc8cff',
    liveKey: 'agents',
  },
  {
    href: '/diff',
    title: 'Surgical Diff Picker',
    desc: 'Unified diff chunking engine for atomic single-hunk cherry picking ([Accept], [Reject], [Cherry-pick]).',
    icon: GitPullRequest,
    badge: 'Screen 5',
    color: '#d29922',
    liveKey: 'hunks',
  },
  {
    href: '/telemetry',
    title: 'TokenFold Telemetry & Benchmarks',
    desc: 'Context compression metrics, SVG donut analytics, interactive cost slider, and SWE-bench Lite comparison.',
    icon: BarChart3,
    badge: 'Screen 6',
    color: '#f85149',
    liveKey: 'telemetry',
  },
  {
    href: '/command',
    title: 'Command Center (⌘K)',
    desc: 'Typed AST traversal matrix, keyboard shortcut command palette, and quick symbol search.',
    icon: Terminal,
    badge: 'Screen 7',
    color: '#58a6ff',
    liveKey: 'commands',
  },
  {
    href: '/multiplayer',
    title: 'Multiplayer Hub',
    desc: 'Real-time collaborator presence, cursor synchronization, node locking, and swarm ping.',
    icon: Users,
    badge: 'Screen 8',
    color: '#a371f7',
    liveKey: 'collaborators',
  },
  {
    href: '/timeline',
    title: 'Agent Execution Timeline',
    desc: '6-stage agent activity sequence strip with clickable stage inspector (reasoning, files, tokens).',
    icon: Clock,
    badge: 'Screen 9',
    color: '#39d353',
    liveKey: 'timeline',
  },
  {
    href: '/settings',
    title: 'AI Model & BYOK Settings',
    desc: 'Configure OrcaRouter/Groq API keys, model selector, and live connection testing.',
    icon: Settings,
    badge: 'Screen 13',
    color: '#8b949e',
    liveKey: 'settings',
  },
];

export default function WorkspaceHome() {
  const telemetry = useOmniStore((state) => state.telemetry);
  const activeScenario = useOmniStore((state) => state.activeScenario);
  const nodes = useOmniStore((state) => state.nodes);
  const diffHunks = useOmniStore((state) => state.diffHunks);
  const files = useOmniStore((state) => state.files);
  const agents = useOmniStore((state) => state.agents);
  const collaborators = useOmniStore((state) => state.collaborators);
  const logs = useOmniStore((state) => state.logs);
  const isAgentRunning = useOmniStore((state) => state.isAgentRunning);
  const startPSMASSweep = useOmniStore((state) => state.startPSMASSweep);
  const openApprovalModal = useOmniStore((state) => state.openApprovalModal);
  const router = useRouter();

  const pendingHunks = diffHunks.filter((h) => h.status === 'pending').length;
  const acceptedHunks = diffHunks.filter((h) => h.status === 'accepted').length;
  const appliedHunks = diffHunks.filter((h) => h.status === 'applied').length;
  const completedAgents = agents.filter((a) => a.status === 'completed').length;

  // Dynamic live badges for each module card
  const getLiveBadge = (key: string): string | null => {
    switch (key) {
      case 'files':
        return `${files.length} files`;
      case 'nodes':
        return `${nodes.length} AST nodes`;
      case 'agents':
        return `${completedAgents}/${agents.length} agents`;
      case 'hunks':
        return appliedHunks > 0 ? `${appliedHunks} applied` : `${pendingHunks} pending`;
      case 'telemetry':
        return `${telemetry.savingsPercentage}% saved`;
      case 'commands':
        return `${nodes.length} symbols`;
      case 'collaborators':
        return `${collaborators.length} online`;
      case 'timeline':
        return `${logs.length} events`;
      case 'settings':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-3 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar font-sans select-none space-y-4 sm:space-y-6 min-w-0">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1c2128] to-[#161b22] border border-[#30363d] p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2.5 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3fb950]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="truncate">Open Gigantic (Superbrain) Assignment III</span>
          </div>

          <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#e6edf3] tracking-tight">
            OmniGraph Studio — Multi-Agent Graph-Traversal Engine
          </h1>

          <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
            Operationalizing TokenFold Context Compression, ObjectGraph (.og) Typed AST Traversal, and
            Phase-Staggered Multi-Agent Swarm (PSMAS) Scheduling.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#16291e] border border-[#238636] text-[#3fb950] shrink-0">
              <Zap className="w-3.5 h-3.5" />
              <span>{telemetry.savingsPercentage}% Token Reduction</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1c2d42] border border-[#38bdf8]/40 text-[#58a6ff] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="truncate">Active Scenario: {activeScenario.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Guided 4-Step Interactive Workflow Pipeline ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#161b22] border border-[#30363d] shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-xs sm:text-sm font-bold text-[#e6edf3] font-mono">
              Complete End-to-End User Journey (Step 1 ➔ Step 4)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#8b949e]">Click any step to jump directly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {/* Step 1 */}
          <div
            onClick={() => {
              // Open import modal by simulating header button click or dispatching event
              const btn = document.querySelector('button:has(svg)') as HTMLElement;
              if (btn) btn.click();
            }}
            className="p-3.5 rounded-xl bg-[#0d1117] border border-[#38bdf8]/30 hover:border-[#38bdf8] transition-all space-y-2 group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] text-[10px] font-bold">
                STEP 1
              </span>
              <span className="text-[10px] text-[#3fb950] flex items-center gap-1">
                <Check className="w-3 h-3" /> {files.length} Files Ready
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#e6edf3] group-hover:text-[#38bdf8] transition-colors flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-[#38bdf8]" />
              Ingest Repo
            </h3>
            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed">
              Import public GitHub repo, choose SWE-bench preset, or paste raw source code.
            </p>
          </div>

          {/* Step 2 */}
          <Link
            href="/graph"
            className="p-3.5 rounded-xl bg-[#0d1117] border border-[#3fb950]/30 hover:border-[#3fb950] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#3fb950]/10 text-[#3fb950] text-[10px] font-bold">
                STEP 2
              </span>
              <span className="text-[10px] text-[#3fb950] flex items-center gap-1">
                <Check className="w-3 h-3" /> {nodes.length} Nodes
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#e6edf3] group-hover:text-[#3fb950] transition-colors flex items-center gap-1.5">
              <Network className="w-4 h-4 text-[#3fb950]" />
              Explore AST Graph
            </h3>
            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed">
              Inspect AST nodes, progressive disclosure, and TokenFold compression savings.
            </p>
          </Link>

          {/* Step 3 */}
          <Link
            href="/psmas"
            className="p-3.5 rounded-xl bg-[#0d1117] border border-[#bc8cff]/30 hover:border-[#bc8cff] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#bc8cff]/10 text-[#bc8cff] text-[10px] font-bold">
                STEP 3
              </span>
              <span className="text-[10px] text-[#bc8cff] flex items-center gap-1">
                {isAgentRunning ? '⚡ Running...' : `${completedAgents}/4 Agents Done`}
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#e6edf3] group-hover:text-[#bc8cff] transition-colors flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-[#bc8cff]" />
              Run Agent Swarm
            </h3>
            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed">
              Launch circular manifold sweep (Architect ➔ CodeWriter ➔ TestRunner ➔ Security).
            </p>
          </Link>

          {/* Step 4 */}
          <Link
            href="/diff"
            className="p-3.5 rounded-xl bg-[#0d1117] border border-[#d29922]/30 hover:border-[#d29922] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full bg-[#d29922]/10 text-[#d29922] text-[10px] font-bold">
                STEP 4
              </span>
              <span className="text-[10px] text-[#d29922]">
                {appliedHunks > 0
                  ? `✓ ${appliedHunks} Applied`
                  : pendingHunks > 0
                  ? `${pendingHunks} Pending`
                  : 'Ready'}
              </span>
            </div>
            <h3 className="font-bold text-sm text-[#e6edf3] group-hover:text-[#d29922] transition-colors flex items-center gap-1.5">
              <GitPullRequest className="w-4 h-4 text-[#d29922]" />
              Review & Merge Diffs
            </h3>
            <p className="text-[11px] text-[#8b949e] font-sans leading-relaxed">
              Cherry-pick surgical diff hunks, verify Safe Barrier hash, and merge into IDE.
            </p>
          </Link>
        </div>
      </div>

      {/* ── Quick Action Bar ── */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          onClick={() => {
            startPSMASSweep();
            router.push('/psmas');
          }}
          disabled={isAgentRunning}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] font-bold text-xs font-mono transition-all shadow-[0_0_12px_rgba(63,185,80,0.3)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[38px]"
        >
          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
          <span>{isAgentRunning ? 'Swarm In Progress...' : 'Launch PSMAS Sweep'}</span>
        </button>

        <Link
          href="/graph"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] font-mono text-xs transition-all min-h-[38px]"
        >
          <Network className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
          <span>Open ObjectGraph Canvas</span>
        </Link>

        <Link
          href="/diff"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] font-mono text-xs transition-all min-h-[38px]"
        >
          <GitPullRequest className="w-3.5 h-3.5 text-[#d29922] shrink-0" />
          <span>Review Diffs ({pendingHunks > 0 ? `${pendingHunks} Pending` : `${appliedHunks} Applied`})</span>
        </Link>

        <Link
          href="/ide"
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] border border-[#30363d] font-mono text-xs transition-all min-h-[38px]"
        >
          <Code className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
          <span>Open Monaco IDE</span>
        </Link>
      </div>

      {/* ── All Module Cards Grid ── */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#8b949e] font-mono">
          All Workspace Subsystems & Views (10 Modules)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {MODULE_CARDS.map((mod) => {
            const Icon = mod.icon;
            const liveBadge = getLiveBadge(mod.liveKey);

            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group p-4 sm:p-5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff]/60 transition-all duration-200 space-y-3 shadow-lg hover:shadow-2xl hover:shadow-[#58a6ff]/5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${mod.color}15`,
                        borderColor: `${mod.color}40`,
                      }}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: mod.color }} />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {liveBadge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0d1117] border border-[#30363d] text-[#58a6ff]">
                          {liveBadge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                        {mod.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#8b949e] leading-relaxed font-normal line-clamp-2">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-[11px] font-mono text-[#58a6ff] group-hover:translate-x-1 transition-transform">
                  <span>Enter Module</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
