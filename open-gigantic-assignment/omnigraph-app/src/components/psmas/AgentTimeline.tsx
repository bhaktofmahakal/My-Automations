'use client';

import React from 'react';
import { Activity, Lightbulb, FileText, Search, Edit3, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

const TIMELINE_STAGES = [
  {
    id: 'thinking',
    name: 'Thinking',
    agent: 'Architect',
    time: '12:01:32',
    detail: 'Analyzing objective...',
    icon: Lightbulb,
    color: '#58a6ff',
    borderColor: '#58a6ff',
    glow: true,
  },
  {
    id: 'reading',
    name: 'Reading',
    agent: 'CodeWriter',
    time: '12:01:34',
    detail: 'Scanning 18 files...',
    icon: FileText,
    color: '#3fb950',
    borderColor: '#3fb950',
    glow: false,
  },
  {
    id: 'grepping',
    name: 'Grepping',
    agent: 'TestRunner',
    time: '12:01:41',
    detail: 'Found 142 matches...',
    icon: Search,
    color: '#d29922',
    borderColor: '#d29922',
    glow: false,
  },
  {
    id: 'editing',
    name: 'Editing',
    agent: 'CodeWriter',
    time: '12:01:49',
    detail: 'Applying patch...',
    icon: Edit3,
    color: '#3fb950',
    borderColor: '#3fb950',
    glow: false,
  },
  {
    id: 'validating',
    name: 'Validating',
    agent: 'SecurityReviewer',
    time: '12:02:03',
    detail: 'Running checks...',
    icon: ShieldCheck,
    color: '#58a6ff',
    borderColor: '#58a6ff',
    glow: false,
  },
  {
    id: 'complete',
    name: 'Complete',
    agent: 'All Agents',
    time: '12:02:18',
    detail: 'Task completed',
    icon: CheckCircle2,
    color: '#3fb950',
    borderColor: '#3fb950',
    glow: false,
  },
];

export const AgentTimeline: React.FC = () => {
  return (
    <div className="mx-4 mb-4 rounded-xl bg-[#161b22] border border-[#30363d] p-3 text-[#e6edf3] font-sans select-none shadow-xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#30363d] px-1">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#e6edf3]" />
          <h3 className="text-xs font-semibold text-[#e6edf3] tracking-tight">
            Agent Activity Timeline
          </h3>
        </div>

        <button className="flex items-center gap-1 text-xs text-[#8b949e] hover:text-[#e6edf3] font-medium transition-colors">
          <span>View Full Timeline</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* ── Horizontal Stage Cards Sequence ── */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
        {TIMELINE_STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isLast = idx === TIMELINE_STAGES.length - 1;

          return (
            <React.Fragment key={stage.id}>
              {/* Stage Card */}
              <div
                className={`flex-1 min-w-[145px] p-2.5 rounded-xl bg-[#0d1117] border transition-all ${
                  stage.glow
                    ? 'border-[#58a6ff] shadow-[0_0_12px_rgba(88,166,255,0.25)]'
                    : 'border-[#30363d] hover:border-[#8b949e]'
                }`}
                style={{ borderColor: stage.borderColor }}
              >
                {/* Stage Title & Icon */}
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3.5 h-3.5" style={{ color: stage.color }} />
                  <span className="text-xs font-semibold" style={{ color: stage.color }}>
                    {stage.name}
                  </span>
                </div>

                {/* Agent & Timestamp */}
                <div className="text-[11px] text-[#8b949e] font-medium truncate">
                  {stage.agent}
                </div>
                <div className="text-[10px] font-mono text-[#6e7681] mt-0.5">
                  {stage.time}
                </div>

                {/* Detail string */}
                <div className="text-[10px] text-[#8b949e] truncate mt-1">
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
    </div>
  );
};
