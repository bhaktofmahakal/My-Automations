'use client';

import React, { useEffect, useState } from 'react';
import {
  Radio,
  Play,
  Pause,
  RotateCcw,
  Send,
  Layers,
  Network,
  CheckCircle2,
  Clock,
  AlertCircle,
  Cpu,
  ChevronRight,
  ShieldCheck,
  Code2,
  Compass,
  FlaskConical,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { AgentRoleId, BeadTask } from '@/lib/types';

const OPERATIONAL_ROLES: Record<
  string,
  {
    name: string;
    opTitle: string;
    color: string;
    model: string;
    theta: string;
    icon: any;
    description: string;
  }
> = {
  architect: {
    name: 'Mayor',
    opTitle: 'AST DAG Orchestrator & Task Planner',
    color: '#58a6ff',
    model: 'groq/llama-3.3-70b-versatile',
    theta: '0 rad (0°)',
    icon: Compass,
    description:
      'Mayor continuously scans the repository AST, identifies dependency bottlenecks, and emits external Beads task DAGs.',
  },
  codewriter: {
    name: 'Polecat-1',
    opTitle: 'Surgical AST Code Synthesizer',
    color: '#3fb950',
    model: 'groq/llama-3.3-70b-versatile',
    theta: 'π/2 rad (90°)',
    icon: Code2,
    description:
      'Polecat executes bounded sub-tasks on isolated AST subgraphs, calling deterministic tools to generate zero-drift unified diffs.',
  },
  testrunner: {
    name: 'Witness',
    opTitle: 'SWE-bench Invariant & Sandbox Verifier',
    color: '#d29922',
    model: 'deepseek/deepseek-chat',
    theta: 'π rad (180°)',
    icon: FlaskConical,
    description:
      'Witness synthesizes runtime invariant assertions and validates patches in an isolated sandbox, driving Reflexion self-correction loops.',
  },
  security: {
    name: 'Refinery',
    opTitle: 'Safe Barrier Reconciler & SHA-256 Gate',
    color: '#f85149',
    model: 'google/gemini-2.5-flash',
    theta: '3π/2 rad (270°)',
    icon: ShieldCheck,
    description:
      'Refinery checks semantic conflicts across parallel diffs, verifies OWASP/CWE safety, and signs cryptographic SHA-256 seals for Monaco IDE merge.',
  },
};

const PRESET_PROMPTS = [
  { label: 'Audit JWT Expiration', prompt: 'Audit AST call graph for JWT session expiration and synthesize safe patch' },
  { label: 'Fix Failing Assertions', prompt: 'Identify failing SWE-bench invariant assertions and execute Reflexion repair' },
  { label: 'CWE-287 RBAC Scan', prompt: 'Perform static security analysis on authorization middleware and sign SHA-256 barrier' },
];

export const PSMASRadar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'radar' | 'beads'>('radar');
  const [angle, setAngle] = useState<number>(1.274);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const activeAgentId = useOmniStore(state => state.activeAgentId);
  const playbackSpeed = useOmniStore(state => state.playbackSpeed);
  const setPlaybackSpeed = useOmniStore(state => state.setPlaybackSpeed);
  const agents = useOmniStore(state => state.agents);
  const beads = useOmniStore(state => state.beads);
  const selectedBeadId = useOmniStore(state => state.selectedBeadId);
  const selectBead = useOmniStore(state => state.selectBead);

  const [selectedAgent, setSelectedAgent] = useState<AgentRoleId | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  // Rotational sweep animation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAgentRunning) {
      interval = setInterval(() => {
        setAngle(prev => (prev + 0.04 * playbackSpeed) % (2 * Math.PI));
      }, 40);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAgentRunning, playbackSpeed]);

  const size = 220;
  const center = size / 2;
  const radius = 82;

  const needleX = center + radius * Math.cos(angle - Math.PI / 2);
  const needleY = center + radius * Math.sin(angle - Math.PI / 2);

  const handleAgentClick = (agentId: AgentRoleId) => {
    setSelectedAgent(selectedAgent === agentId ? null : agentId);
  };

  const handlePresetClick = (prompt: string) => {
    setCustomPrompt(prompt);
  };

  const handleSubmitPrompt = () => {
    if (!customPrompt.trim()) return;
    startPSMASSweep(customPrompt.trim());
    setCustomPrompt('');
  };

  const roleDetail = selectedAgent ? OPERATIONAL_ROLES[selectedAgent] : null;
  const selectedAgentState = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;
  const selectedBead = beads.find(b => b.id === selectedBeadId) || beads[0];

  const SPEEDS = [0.5, 1, 2, 5];

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none min-w-0">
      {/* ── Header with View Switcher ── */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <div className="flex items-center bg-[#0d1117] p-0.5 rounded-lg border border-[#30363d]">
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                activeTab === 'radar'
                  ? 'bg-[#30363d] text-[#58a6ff]'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              PSMAS Manifold
            </button>
            <button
              onClick={() => setActiveTab('beads')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'beads'
                  ? 'bg-[#30363d] text-[#3fb950]'
                  : 'text-[#8b949e] hover:text-[#e6edf3]'
              }`}
            >
              <Network className="w-3 h-3 text-[#3fb950]" />
              <span>Beads Task DAG</span>
              <span className="text-[9px] px-1 py-0.2 bg-[#238636]/20 text-[#3fb950] rounded-full">
                {beads.length}
              </span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Speed Control */}
          <div className="flex items-center gap-0.5 bg-[#0d1117] p-0.5 rounded-lg border border-[#30363d]">
            {SPEEDS.map(s => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  playbackSpeed === s
                    ? 'bg-[#30363d] text-[#58a6ff]'
                    : 'text-[#6e7681] hover:text-[#e6edf3]'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>

          <button
            onClick={() => (isAgentRunning ? pausePSMASSweep() : startPSMASSweep())}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all min-h-[32px] ${
              isAgentRunning
                ? 'bg-[#d29922] text-[#0d1117] shadow-[0_0_10px_rgba(210,153,34,0.3)]'
                : 'bg-[#3fb950] text-[#0d1117] hover:bg-[#2ea043] shadow-[0_0_10px_rgba(63,185,80,0.3)]'
            }`}
          >
            {isAgentRunning ? (
              <>
                <Pause className="w-3 h-3 fill-current shrink-0" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current shrink-0" />
                <span>SWEEP</span>
              </>
            )}
          </button>

          <button
            onClick={resetPSMASSweep}
            title="Reset State"
            className="p-1 sm:p-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] min-h-[32px] min-w-[32px] flex items-center justify-center transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Main View Body ── */}
      {activeTab === 'radar' ? (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 items-stretch p-3 gap-3 overflow-y-auto custom-scrollbar min-h-0">
          {/* ── Left Column: Circular Manifold (7 cols) ── */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-7 relative flex items-center justify-center py-4 sm:py-0 min-h-[220px]">
            <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center">
              <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
                {/* Concentric Coordinate Rings */}
                <circle cx={center} cy={center} r={radius} fill="none" stroke="#30363d" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx={center} cy={center} r={radius * 0.68} fill="none" stroke="#21262d" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx={center} cy={center} r={radius * 0.36} fill="none" stroke="#21262d" strokeWidth="1" />

                {/* Radial Crosshairs */}
                <line x1={center - radius - 8} y1={center} x2={center + radius + 8} y2={center} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />
                <line x1={center - radius - 8} y1={center} x2={center + radius + 8} y2={center} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />

                {/* Rotating Cyan Needle */}
                <line
                  x1={center}
                  y1={center}
                  x2={needleX}
                  y2={needleY}
                  stroke="#58a6ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(88,166,255,0.7)]"
                />

                {/* Center Core */}
                <circle cx={center} cy={center} r="5" fill="#58a6ff" className="shadow-lg" />
                <circle cx={center} cy={center} r="10" fill="none" stroke="#58a6ff" strokeWidth="1" opacity="0.4" />

                {/* Clickable Operational Agent Nodes */}
                {/* 1. Mayor / Architect (Top) */}
                <g
                  transform={`translate(${center}, ${center - radius})`}
                  onClick={() => handleAgentClick('architect')}
                  className="cursor-pointer"
                >
                  <circle r={selectedAgent === 'architect' ? 9 : 6} fill="#0d1117" stroke="#58a6ff" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'architect' ? 'animate-ping' : ''}`} />
                  <circle r="2.5" fill="#58a6ff" />
                </g>

                {/* 2. Polecat / CodeWriter (Right) */}
                <g
                  transform={`translate(${center + radius}, ${center})`}
                  onClick={() => handleAgentClick('codewriter')}
                  className="cursor-pointer"
                >
                  <circle r={selectedAgent === 'codewriter' ? 9 : 6} fill="#0d1117" stroke="#3fb950" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'codewriter' ? 'animate-ping' : ''}`} />
                  <circle r="2.5" fill="#3fb950" />
                </g>

                {/* 3. Witness / TestRunner (Bottom) */}
                <g
                  transform={`translate(${center}, ${center + radius})`}
                  onClick={() => handleAgentClick('testrunner')}
                  className="cursor-pointer"
                >
                  <circle r={selectedAgent === 'testrunner' ? 9 : 6} fill="#0d1117" stroke="#d29922" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'testrunner' ? 'animate-ping' : ''}`} />
                  <circle r="2.5" fill="#d29922" />
                </g>

                {/* 4. Refinery / Security (Left) */}
                <g
                  transform={`translate(${center - radius}, ${center})`}
                  onClick={() => handleAgentClick('security')}
                  className="cursor-pointer"
                >
                  <circle r={selectedAgent === 'security' ? 9 : 6} fill="#0d1117" stroke="#f85149" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'security' ? 'animate-ping' : ''}`} />
                  <circle r="2.5" fill="#f85149" />
                </g>
              </svg>

              {/* Node Labels */}
              <div className="absolute top-0 text-center font-mono text-[10px] sm:text-[11px] cursor-pointer -translate-y-2" onClick={() => handleAgentClick('architect')}>
                <span className={`font-semibold block ${selectedAgent === 'architect' ? 'text-[#58a6ff] text-xs' : 'text-[#58a6ff]'}`}>Mayor</span>
                <span className="text-[#8b949e] text-[8px]">&theta;₁ = 0</span>
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left pl-1 font-mono text-[10px] sm:text-[11px] cursor-pointer translate-x-4" onClick={() => handleAgentClick('codewriter')}>
                <span className={`font-semibold block ${selectedAgent === 'codewriter' ? 'text-[#3fb950] text-xs' : 'text-[#3fb950]'}`}>Polecat-1</span>
                <span className="text-[#8b949e] text-[8px]">&theta;₂ = &pi;/2</span>
              </div>

              <div className="absolute bottom-0 text-center font-mono text-[10px] sm:text-[11px] cursor-pointer translate-y-2" onClick={() => handleAgentClick('testrunner')}>
                <span className={`font-semibold block ${selectedAgent === 'testrunner' ? 'text-[#d29922] text-xs' : 'text-[#d29922]'}`}>Witness</span>
                <span className="text-[#8b949e] text-[8px]">&theta;₃ = &pi;</span>
              </div>

              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-right pr-1 font-mono text-[10px] sm:text-[11px] cursor-pointer -translate-x-4" onClick={() => handleAgentClick('security')}>
                <span className={`font-semibold block ${selectedAgent === 'security' ? 'text-[#f85149] text-xs' : 'text-[#f85149]'}`}>Refinery</span>
                <span className="text-[#8b949e] text-[8px]">&theta;₄ = 3&pi;/2</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Role Detail / Prompt Input (5 cols) ── */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-2.5 font-mono text-[11px] min-w-0">
            {selectedAgent && roleDetail ? (
              <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: roleDetail.color }} />
                  <span className="font-bold text-xs truncate" style={{ color: roleDetail.color }}>
                    {roleDetail.name} ({roleDetail.opTitle})
                  </span>
                </div>
                <div className="text-[10px] text-[#8b949e]">
                  <span className="text-[#6e7681]">Model:</span> <span className="text-[#e6edf3]">{roleDetail.model}</span>
                </div>
                <div className="text-[10px] text-[#8b949e] leading-relaxed">
                  {roleDetail.description}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <span className="text-[#8b949e] font-medium block text-[10px]">
                    Swarm Operational Status
                  </span>
                  <div className="text-xs font-bold text-[#58a6ff] tracking-wider truncate">
                    [ {agents.map(a => a.status === 'completed' ? '1.00' : a.status === 'active' ? '0.50' : '0.00').join(', ')} ]
                  </div>
                </div>

                <div className="space-y-1 text-[#8b949e] text-[10px]">
                  {agents.map(a => {
                    const op = OPERATIONAL_ROLES[a.id];
                    return (
                      <div
                        key={a.id}
                        className="flex items-center justify-between cursor-pointer hover:bg-[#21262d] rounded px-1.5 py-1 transition-colors"
                        onClick={() => handleAgentClick(a.id as AgentRoleId)}
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: op?.color || '#8b949e' }} />
                          <span className="text-[#e6edf3] font-medium truncate">{op?.name || a.name}</span>
                          <span className="text-[#6e7681] text-[9px] hidden sm:inline truncate">({op?.opTitle?.split(' ')[0]})</span>
                        </div>
                        <span className={`text-[9px] font-bold shrink-0 ${a.status === 'completed' ? 'text-[#3fb950]' : a.status === 'active' ? 'text-[#d29922]' : 'text-[#6e7681]'}`}>
                          {a.status.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Directive Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#6e7681] font-medium">Quick Directives</span>
              <div className="flex flex-wrap gap-1">
                {PRESET_PROMPTS.map(p => (
                  <button
                    key={p.label}
                    onClick={() => handlePresetClick(p.prompt)}
                    className="px-2 py-0.5 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] text-[10px] text-[#8b949e] hover:text-[#58a6ff] transition-all truncate max-w-full"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Custom swarm directive..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitPrompt()}
                className="flex-1 bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg px-2.5 py-1.5 text-[11px] text-[#e6edf3] placeholder-[#6e7681] focus:outline-none transition-colors min-w-0"
              />
              <button
                onClick={handleSubmitPrompt}
                disabled={!customPrompt.trim() || isAgentRunning}
                className="p-1.5 rounded-lg bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                aria-label="Submit directive"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Phase Angle Info */}
            <div className="pt-1.5 border-t border-[#30363d] text-[10px] flex items-center justify-between">
              <span className="text-[#8b949e]">&phi; = {angle.toFixed(2)} rad</span>
              <span className="text-[#58a6ff] font-bold">{playbackSpeed}× speed</span>
            </div>
          </div>
        </div>
      ) : (
        /* ── Beads External Task DAG Tab ── */
        <div className="flex-1 p-3 flex flex-col font-mono text-xs overflow-hidden min-h-0 space-y-3">
          <div className="flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#3fb950]" />
              <span className="font-bold text-[#e6edf3] text-xs">
                External Memory & Task Graph (Beads Model)
              </span>
            </div>
            <span className="text-[10px] text-[#8b949e]">
              Total Tasks: {beads.length} · Completed: {beads.filter(b => b.status === 'completed').length}
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden min-h-0">
            {/* Task List */}
            <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-2 space-y-2 overflow-y-auto custom-scrollbar">
              {beads.map((bead) => {
                const isSelected = selectedBead?.id === bead.id;
                const statusColor =
                  bead.status === 'completed'
                    ? 'text-[#3fb950] bg-[#238636]/15 border-[#238636]/40'
                    : bead.status === 'in_progress'
                    ? 'text-[#58a6ff] bg-[#58a6ff]/15 border-[#58a6ff]/40 animate-pulse'
                    : 'text-[#8b949e] bg-[#21262d] border-[#30363d]';

                return (
                  <div
                    key={bead.id}
                    onClick={() => selectBead(bead.id)}
                    className={`p-2 rounded-lg border cursor-pointer transition-all space-y-1 ${
                      isSelected
                        ? 'bg-[#161b22] border-[#58a6ff] shadow-[0_0_10px_rgba(88,166,255,0.15)]'
                        : 'bg-[#161b22]/60 border-[#30363d] hover:border-[#484f58]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-[#58a6ff] bg-[#21262d] px-1.5 py-0.5 rounded border border-[#30363d]">
                          {bead.id}
                        </span>
                        <span className="text-[11px] font-semibold text-[#e6edf3] truncate">
                          {bead.title}
                        </span>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${statusColor}`}>
                        {bead.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-[10px] text-[#8b949e] line-clamp-2">
                      {bead.description}
                    </p>

                    <div className="flex items-center justify-between text-[9px] text-[#6e7681] pt-1">
                      <span>Worker: <strong className="text-[#e6edf3] uppercase">{bead.assignedRole}</strong></span>
                      <span>Dep: <strong className="text-[#e6edf3]">{bead.dependencyType}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Bead Details */}
            <div className="bg-[#0d1117] rounded-xl border border-[#30363d] p-3 flex flex-col justify-between overflow-y-auto custom-scrollbar space-y-2.5">
              {selectedBead ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
                    <div>
                      <span className="text-[10px] font-bold text-[#58a6ff]">{selectedBead.id}</span>
                      <h3 className="text-xs font-bold text-[#e6edf3]">{selectedBead.title}</h3>
                    </div>
                    <span className="text-[9px] font-bold text-[#3fb950] bg-[#238636]/20 px-2 py-0.5 rounded border border-[#238636]/40 uppercase">
                      {selectedBead.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="text-[#8b949e]">
                      <strong className="text-[#6e7681]">Target File:</strong> {selectedBead.targetFile || 'N/A'}
                    </div>
                    <div className="text-[#8b949e]">
                      <strong className="text-[#6e7681]">Assigned Role:</strong> {selectedBead.assignedRole.toUpperCase()}
                    </div>
                    <div className="text-[#8b949e]">
                      <strong className="text-[#6e7681]">Dependencies:</strong> {selectedBead.dependencies.join(', ') || 'None (Root)'}
                    </div>
                    <div className="text-[#8b949e]">
                      <strong className="text-[#6e7681]">Token Cost:</strong> {selectedBead.tokenCost} tokens
                    </div>
                  </div>

                  {/* Executed Tool Calls */}
                  <div className="space-y-1.5 pt-2 border-t border-[#30363d]">
                    <span className="text-[10px] font-bold text-[#e6edf3] block">
                      Deterministic Tool Calls ({selectedBead.toolCallsExecuted.length})
                    </span>
                    {selectedBead.toolCallsExecuted.length > 0 ? (
                      selectedBead.toolCallsExecuted.map((tc, idx) => (
                        <div key={idx} className="p-2 rounded bg-[#161b22] border border-[#30363d] space-y-1 text-[10px]">
                          <div className="flex items-center justify-between text-[#58a6ff]">
                            <code>[ToolCall: {tc.tool}]</code>
                            <span className="text-[#6e7681]">{tc.timestamp}</span>
                          </div>
                          <div className="text-[#8b949e]">
                            <code>{JSON.stringify(tc.params)}</code>
                          </div>
                          <div className="text-[#3fb950] text-[9px]">
                            &rarr; {tc.resultSummary}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px] text-[#6e7681] italic">
                        No tool calls executed yet. Awaiting scheduling in active swarm.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-[#6e7681] py-8">Select a task Bead to inspect</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
