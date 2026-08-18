'use client';

import React from 'react';
import Link from 'next/link';
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
  Sparkles
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
  },
  {
    href: '/graph',
    title: 'ObjectGraph AST Canvas',
    desc: 'Interactive @xyflow/react dependency graph with AST progressive disclosure & token footprint inspection.',
    icon: Network,
    badge: 'Screen 3',
    color: '#3fb950',
  },
  {
    href: '/psmas',
    title: 'PSMAS Swarm Radar & Terminal',
    desc: 'Phase-Staggered Multi-Agent circular manifold execution radar & live streaming reasoning logs.',
    icon: Radio,
    badge: 'Screen 4',
    color: '#bc8cff',
  },
  {
    href: '/diff',
    title: 'Surgical Diff Picker',
    desc: 'Unified diff chunking engine for atomic single-hunk cherry picking ([Accept], [Reject], [Cherry-pick]).',
    icon: GitPullRequest,
    badge: 'Screen 5',
    color: '#d29922',
  },
  {
    href: '/telemetry',
    title: 'TokenFold Telemetry & Benchmarks',
    desc: 'Context compression metrics (72% token reduction), SVG donut analytics, and SWE-bench Lite comparison.',
    icon: BarChart3,
    badge: 'Screen 6',
    color: '#f85149',
  },
  {
    href: '/command',
    title: 'Command Center (⌘K)',
    desc: 'Typed AST traversal matrix, keyboard shortcut command palette, and quick symbol search.',
    icon: Terminal,
    badge: 'Screen 7',
    color: '#58a6ff',
  },
  {
    href: '/multiplayer',
    title: 'Multiplayer Hub',
    desc: 'Real-time collaborator presence, cursor synchronization, and AST node locking.',
    icon: Users,
    badge: 'Screen 8',
    color: '#a371f7',
  },
  {
    href: '/timeline',
    title: 'Agent Execution Timeline',
    desc: '6-stage agent activity sequence strip (Thinking → Reading → Grepping → Editing → Validating → Complete).',
    icon: Clock,
    badge: 'Screen 9',
    color: '#39d353',
  },
  {
    href: '/settings',
    title: 'AI Model & BYOK Settings',
    desc: 'Configure Claude 3.7 / GPT-4o API keys, Edge API streaming parameters, and benchmark models.',
    icon: Settings,
    badge: 'Screen 13',
    color: '#8b949e',
  },
];

export default function WorkspaceHome() {
  const telemetry = useOmniStore(state => state.telemetry);
  const activeScenario = useOmniStore(state => state.activeScenario);

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-6 overflow-y-auto font-sans select-none space-y-6">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1c2128] to-[#161b22] border border-[#30363d] p-6 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3fb950]">
            <Sparkles className="w-4 h-4" />
            <span>Open Gigantic (Superbrain) Assignment III</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[#e6edf3] tracking-tight">
            OmniGraph Studio — Multi-Agent Graph-Traversal Engine
          </h1>

          <p className="text-sm text-[#8b949e] leading-relaxed">
            Operationalizing TokenFold Context Compression, ObjectGraph (.og) Typed AST Traversal, and Phase-Staggered Multi-Agent Swarm (PSMAS) Scheduling. Select a dedicated tool view below or launch the multi-agent sweep.
          </p>

          <div className="pt-3 flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#16291e] border border-[#238636] text-[#3fb950]">
              <Zap className="w-3.5 h-3.5" />
              <span>{telemetry.savingsPercentage}% Token Reduction</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1c2d42] border border-[#38bdf8]/40 text-[#58a6ff]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Active Scenario: {activeScenario.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Dedicated Route Cards (Matching all 15 screens from Design Spec 1) */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono font-semibold uppercase text-[#8b949e] tracking-wider">
          Dedicated System Screens & Tool Workspaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULE_CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col justify-between p-5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] hover:shadow-[0_0_20px_rgba(88,166,255,0.15)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#30363d]"
                      style={{ backgroundColor: `${card.color}15`, borderColor: `${card.color}40` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>

                    <span className="text-[10px] font-mono text-[#8b949e] bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-mono font-medium text-[#58a6ff] group-hover:translate-x-1 transition-transform">
                  <span>Open Dedicated Screen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
