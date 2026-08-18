'use client';

import React from 'react';
import { 
  Home, 
  Terminal, 
  Network, 
  Code2, 
  GitBranch, 
  Radio, 
  FileDiff, 
  Command, 
  Brain, 
  Users, 
  BarChart3, 
  Settings, 
  History, 
  PlaySquare, 
  X
} from 'lucide-react';

interface Screen15OverviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen?: (id: number) => void;
}

const SCREENS = [
  { id: 1, title: '1. Workspace / Project Home', desc: 'Resume sessions, active runs, token cost telemetry, recent traversals', icon: Home },
  { id: 2, title: '2. Main Agent Workspace (IDE)', desc: 'Split-pane tree, Monaco editor, agent context, timeline action stages', icon: Terminal },
  { id: 3, title: '3. Agent Orchestration', desc: 'PSMAS circular manifold radar, live broadcast state vectors, handoff queues', icon: Radio },
  { id: 4, title: '4. Knowledge Graph Explorer', desc: 'Interactive AST dependency & impact graph, active path filtering', icon: Network },
  { id: 5, title: '5. Code Editor (File Workspace)', desc: 'Monaco editor tabs, problems panel, terminal output, AST jump links', icon: Code2 },
  { id: 6, title: '6. Task / Run Detail', desc: 'Run timeline, stage breakdown (Thinking/Reading/Grepping/Editing), metrics', icon: PlaySquare },
  { id: 7, title: '7. Diff Review Center', desc: 'Side-by-side surgical hunks, agent rationale, risk score, accept/reject', icon: FileDiff },
  { id: 8, title: '8. Terminal / Execution Console', desc: 'Jest test suites, build outputs, real-time node process telemetry', icon: Terminal },
  { id: 9, title: '9. Command Center (⌘K)', desc: 'Keyboard-centric quick actions, graph traversal, search symbols, agent control', icon: Command },
  { id: 10, title: '10. Agent Memory / Context', desc: 'TokenFold compression knowledge, retrieved rules, context utilization gauge', icon: Brain },
  { id: 11, title: '11. Collaboration / Presence', desc: 'Live multiplayer cursors, shared focus AST paths, team agent presence', icon: Users },
  { id: 12, title: '12. Git / Change Management', desc: 'Pending diffs, commit creator, branch ahead/behind telemetry', icon: GitBranch },
  { id: 13, title: '13. Benchmarks / Evaluation', desc: 'SWE-bench Lite pass rates, median cost per task, model comparison', icon: BarChart3 },
  { id: 14, title: '14. Settings / System Configuration', desc: 'Claude 3.5 Sonnet / Haiku / Embedding model providers, API usage quota', icon: Settings },
  { id: 15, title: '15. Run History / Observability', desc: 'Filterable run executions, agent tags, duration, cost, status logs', icon: History },
];

export const Screen15Overview: React.FC<Screen15OverviewProps> = ({ isOpen, onClose, onSelectScreen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0d1117]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#30363d] bg-[#0d1117] gap-2">
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-[#e6edf3] flex items-center gap-2 truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] shrink-0" />
              <span className="truncate">OmniGraph Studio &mdash; 15 Core System Screens</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-[#8b949e] mt-0.5 truncate">
              Reference architecture synthesized from Linear, Cursor, OpenCode &amp; Expo design systems
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] transition-colors shrink-0"
            aria-label="Close overview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 15 Screens Grid */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {SCREENS.map(screen => {
            const Icon = screen.icon;
            return (
              <div
                key={screen.id}
                onClick={() => {
                  if (onSelectScreen) onSelectScreen(screen.id);
                  onClose();
                }}
                className="group cursor-pointer p-3.5 sm:p-4 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] transition-all flex flex-col justify-between hover:shadow-[0_0_16px_rgba(88,166,255,0.2)]"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#161b22] border border-[#30363d] group-hover:border-[#58a6ff] flex items-center justify-center text-[#58a6ff] mb-2 sm:mb-3 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">
                    {screen.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#8b949e] mt-1 line-clamp-3 leading-relaxed">
                    {screen.desc}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2 border-t border-[#21262d] flex items-center justify-between text-[10px] text-[#6e7681]">
                  <span className="font-mono">SCREEN #{screen.id}</span>
                  <span className="text-[#3fb950] font-medium">VIEW &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#30363d] bg-[#0d1117] flex flex-wrap items-center justify-between text-xs text-[#8b949e] gap-2">
          <span className="text-[11px] truncate">Full fidelity suite conforming strictly to pixel specifications</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium transition-colors text-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
