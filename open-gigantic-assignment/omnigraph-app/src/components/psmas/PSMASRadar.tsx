'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Play, Pause, RotateCcw, Compass, Code2, FlaskConical, ShieldCheck, Zap, Activity } from 'lucide-react';

const AGENT_ICONS = {
  architect: Compass,
  codewriter: Code2,
  testrunner: FlaskConical,
  security: ShieldCheck,
};

export const PSMASRadar: React.FC = () => {
  const agents = useOmniStore(state => state.agents);
  const currentPhaseAngle = useOmniStore(state => state.currentPhaseAngle);
  const currentPhaseAngleDeg = useOmniStore(state => state.currentPhaseAngleDeg);
  const activeAgentId = useOmniStore(state => state.activeAgentId);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const playbackSpeed = useOmniStore(state => state.playbackSpeed);
  const setPlaybackSpeed = useOmniStore(state => state.setPlaybackSpeed);

  // Radar geometry
  const size = 260;
  const center = size / 2;
  const radius = 95;

  // Calculate needle coordinate
  const needleX = center + radius * Math.cos(currentPhaseAngle);
  const needleY = center + radius * Math.sin(currentPhaseAngle);

  return (
    <div className="flex flex-col h-full bg-[#0e1017] border border-[#222638] rounded-xl p-4 text-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#222638]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-xs font-bold text-zinc-100 uppercase tracking-wider">
              PSMAS Circular Manifold
            </h3>
            <p className="text-[10px] text-zinc-400 font-mono">
              arXiv:2604.17400 | Phase-Scheduled Attention
            </p>
          </div>
        </div>

        {/* Phase angle indicator */}
        <div className="flex items-center gap-1.5 bg-[#141722] px-2.5 py-1 rounded-md border border-[#222638] font-mono text-xs">
          <span className="text-zinc-500">&phi;(t):</span>
          <span className="text-cyan-400 font-bold">{currentPhaseAngleDeg}&deg;</span>
          <span className="text-zinc-500 text-[10px]">({(currentPhaseAngle / Math.PI).toFixed(2)}&pi;)</span>
        </div>
      </div>

      {/* Circular Radar Visualizer */}
      <div className="relative flex items-center justify-center my-3">
        <svg width={size} height={size} className="overflow-visible">
          {/* Radial Grid Circles */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#222638" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={center} cy={center} r={radius * 0.65} fill="none" stroke="#1a1e2d" strokeWidth="1" />
          <circle cx={center} cy={center} r={radius * 0.3} fill="none" stroke="#1a1e2d" strokeWidth="1" />

          {/* Crosshairs */}
          <line x1={center - radius - 15} y1={center} x2={center + radius + 15} y2={center} stroke="#1f2438" strokeWidth="1" />
          <line x1={center} y1={center - radius - 15} x2={center} y2={center + radius + 15} stroke="#1f2438" strokeWidth="1" />

          {/* Attention Sweep Cone */}
          <defs>
            <radialGradient id="sweepGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </radialGradient>
          </defs>

          {/* Rotating Attention Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleX}
            y2={needleY}
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />

          {/* Center Hub */}
          <circle cx={center} cy={center} r="6" fill="#38bdf8" className="shadow-lg" />
          <circle cx={center} cy={center} r="12" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />

          {/* Agent Positions on Circular Manifold */}
          {agents.map((agent) => {
            const agentX = center + radius * Math.cos(agent.theta);
            const agentY = center + radius * Math.sin(agent.theta);
            const isActive = agent.id === activeAgentId;
            const isCompleted = agent.status === 'completed';

            return (
              <g key={agent.id} className="transition-all duration-300">
                {/* Active Agent Pulse Ring */}
                {isActive && (
                  <circle
                    cx={agentX}
                    cy={agentY}
                    r="20"
                    fill="none"
                    stroke={agent.color}
                    strokeWidth="2"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Node Body */}
                <circle
                  cx={agentX}
                  cy={agentY}
                  r="14"
                  fill={isActive ? agent.color : '#0e1017'}
                  stroke={agent.color}
                  strokeWidth="2"
                  className="cursor-pointer transition-colors"
                />

                {/* Node Status Indicator Dot */}
                <circle
                  cx={agentX + 10}
                  cy={agentY - 10}
                  r="4"
                  fill={isCompleted ? '#34d399' : isActive ? '#38bdf8' : '#64748b'}
                  stroke="#0e1017"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Agent Badges */}
        <div className="absolute top-1 right-2 text-[9px] font-mono text-zinc-400">
          &theta;<sub>1</sub> = 0 (Architect)
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-zinc-400">
          &theta;<sub>2</sub> = &pi;/2 (CodeWriter)
        </div>
        <div className="absolute bottom-1 left-2 text-[9px] font-mono text-zinc-400">
          &theta;<sub>3</sub> = &pi; (TestRunner)
        </div>
        <div className="absolute top-1 left-2 text-[9px] font-mono text-zinc-400">
          &theta;<sub>4</sub> = 3&pi;/2 (Security)
        </div>
      </div>

      {/* Active Agent Role Cards */}
      <div className="grid grid-cols-2 gap-2 my-2">
        {agents.map((agent) => {
          const Icon = AGENT_ICONS[agent.id] || Compass;
          const isActive = agent.id === activeAgentId;
          const isCompleted = agent.status === 'completed';

          return (
            <div
              key={agent.id}
              className={`p-2 rounded-lg border transition-all duration-200 font-mono text-[11px] ${
                isActive
                  ? 'bg-[#141722] border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : isCompleted
                  ? 'bg-[#0e1017] border-emerald-500/40 text-zinc-300'
                  : 'bg-[#0e1017] border-[#222638] text-zinc-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                  <span className="font-semibold text-zinc-200 truncate">{agent.name.split(' ')[0]}</span>
                </div>
                <span
                  className="text-[9px] px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: isActive ? `${agent.color}20` : '#1a1e2d',
                    color: isActive ? agent.color : '#94a3b8',
                  }}
                >
                  {agent.status}
                </span>
              </div>
              <div className="mt-1 text-[9px] text-zinc-400 flex justify-between">
                <span>Vector: {agent.compressedMemorySize}t</span>
                {isActive && <span className="text-cyan-400 animate-pulse">ACTIVE &phi;(t)</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="mt-auto pt-3 border-t border-[#222638] flex items-center justify-between gap-2">
        <button
          onClick={isAgentRunning ? pausePSMASSweep : startPSMASSweep}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-all ${
            isAgentRunning
              ? 'bg-amber-500 hover:bg-amber-600 text-zinc-900 shadow-lg'
              : 'bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-zinc-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
          }`}
        >
          {isAgentRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Sweep</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run PSMAS Sweep</span>
            </>
          )}
        </button>

        <button
          onClick={resetPSMASSweep}
          title="Reset Coordination State"
          className="p-2 rounded-lg bg-[#141722] hover:bg-[#1a1e2d] text-zinc-400 hover:text-zinc-200 border border-[#222638] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Speed Toggle */}
        <div className="flex bg-[#141722] p-0.5 rounded-lg border border-[#222638] font-mono text-[10px]">
          {[1, 2, 4].map((spd) => (
            <button
              key={spd}
              onClick={() => setPlaybackSpeed(spd)}
              className={`px-2 py-1 rounded transition-colors ${
                playbackSpeed === spd
                  ? 'bg-cyan-500 text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
