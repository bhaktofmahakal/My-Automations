'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Code,
  Network,
  Radio,
  GitPullRequest,
  BarChart3,
  Terminal,
  Users,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LayoutGrid
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Workspace Home', icon: Home, badge: 'Overview' },
  { href: '/ide', label: 'Monaco Code IDE', icon: Code, badge: 'Editor' },
  { href: '/graph', label: 'ObjectGraph Canvas', icon: Network, badge: 'AST' },
  { href: '/psmas', label: 'PSMAS Swarm Radar', icon: Radio, badge: 'Multi-Agent' },
  { href: '/diff', label: 'Surgical Diff Picker', icon: GitPullRequest, badge: 'Cherry-Pick' },
  { href: '/telemetry', label: 'Token Telemetry', icon: BarChart3, badge: 'SWE-bench' },
  { href: '/command', label: 'Command Center', icon: Terminal, badge: '⌘K' },
  { href: '/multiplayer', label: 'Multiplayer Hub', icon: Users, badge: 'Sync' },
  { href: '/timeline', label: 'Agent Timeline', icon: Clock, badge: 'Activity' },
  { href: '/settings', label: 'AI Model & BYOK', icon: Settings, badge: 'API Keys' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-[#0d1117] border-r border-[#30363d] flex flex-col transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-12 flex items-center justify-between px-3 border-b border-[#30363d]">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="font-bold text-xs tracking-tight font-mono text-[#e6edf3]">
              OMNIGRAPH
            </span>
            <span className="text-[9px] text-[#8b949e] font-mono bg-[#161b22] px-1 py-0.5 rounded border border-[#30363d]">
              v1.0
            </span>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto font-mono text-xs">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-[#1f2937] text-[#58a6ff] border border-[#38bdf8]/40 shadow-[0_0_12px_rgba(56,189,248,0.2)] font-semibold'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span className="truncate">{item.label}</span>
                  <span className="text-[9px] text-[#6e7681] bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d]">
                    {item.badge}
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer System Status */}
      {!collapsed && (
        <div className="p-3 border-t border-[#30363d] bg-[#161b22] text-[10px] font-mono text-[#8b949e] space-y-1">
          <div className="flex items-center justify-between">
            <span>Engine:</span>
            <span className="text-[#3fb950] font-bold">Superbrain v1.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Context:</span>
            <span className="text-[#58a6ff]">TokenFold Enabled</span>
          </div>
        </div>
      )}
    </aside>
  );
};
