'use client';

import React, { useEffect, useState } from 'react';
import { Radio, Play, Pause, RotateCcw, Send } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { AgentRoleId } from '@/lib/types';

const AGENT_DETAILS: Record<string, { color: string; model: string; systemPrompt: string }> = {
  architect: {
    color: '#58a6ff',
    model: 'openai/gpt-4o',
    systemPrompt: 'You are a senior software architect. Analyze the codebase structure, identify coupling issues, and propose modular refactoring strategies.',
  },
  codewriter: {
    color: '#3fb950',
    model: 'openai/gpt-4o-mini',
    systemPrompt: 'You are a precise code generation agent. Write clean, tested, production-quality code patches based on architectural directives.',
  },
  testrunner: {
    color: '#d29922',
    model: 'deepseek/deepseek-chat',
    systemPrompt: 'You are a QA testing agent. Execute test suites, identify failing assertions, and validate patches against regression benchmarks.',
  },
  security: {
    color: '#f85149',
    model: 'google/gemini-2.5-flash',
    systemPrompt: 'You are a security auditor. Scan for vulnerabilities, injection risks, and compliance violations in proposed code changes.',
  },
};

const PRESET_PROMPTS = [
  { label: 'Fix Failing Tests', prompt: 'Identify and fix all failing test assertions in the current scenario' },
  { label: 'Refactor JWT Auth', prompt: 'Refactor the JWT authentication module for better security and testability' },
  { label: 'Security Audit', prompt: 'Run a comprehensive security audit on all authentication-related modules' },
];

export const PSMASRadar: React.FC = () => {
  const [angle, setAngle] = useState<number>(1.274);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const activeAgentId = useOmniStore(state => state.activeAgentId);
  const playbackSpeed = useOmniStore(state => state.playbackSpeed);
  const setPlaybackSpeed = useOmniStore(state => state.setPlaybackSpeed);
  const agents = useOmniStore(state => state.agents);

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
    startPSMASSweep();
    setCustomPrompt('');
  };

  const agentDetail = selectedAgent ? AGENT_DETAILS[selectedAgent] : null;
  const selectedAgentState = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;

  const SPEEDS = [0.5, 1, 2, 5];

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h2 className="text-xs font-semibold text-[#e6edf3] tracking-tight">
            PSMAS Manifold Radar
          </h2>
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
            onClick={isAgentRunning ? pausePSMASSweep : startPSMASSweep}
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

      {/* ── Main Radar + Info Grid ── */}
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
              <line x1={center} y1={center - radius - 8} x2={center} y2={center + radius + 8} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />

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

              {/* Clickable Agent Nodes */}
              {/* 1. Architect (Top) */}
              <g
                transform={`translate(${center}, ${center - radius})`}
                onClick={() => handleAgentClick('architect')}
                className="cursor-pointer"
              >
                <circle r={selectedAgent === 'architect' ? 9 : 6} fill="#0d1117" stroke="#58a6ff" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'architect' ? 'animate-ping' : ''}`} />
                <circle r="2.5" fill="#58a6ff" />
              </g>

              {/* 2. CodeWriter (Right) */}
              <g
                transform={`translate(${center + radius}, ${center})`}
                onClick={() => handleAgentClick('codewriter')}
                className="cursor-pointer"
              >
                <circle r={selectedAgent === 'codewriter' ? 9 : 6} fill="#0d1117" stroke="#3fb950" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'codewriter' ? 'animate-ping' : ''}`} />
                <circle r="2.5" fill="#3fb950" />
              </g>

              {/* 3. TestRunner (Bottom) */}
              <g
                transform={`translate(${center}, ${center + radius})`}
                onClick={() => handleAgentClick('testrunner')}
                className="cursor-pointer"
              >
                <circle r={selectedAgent === 'testrunner' ? 9 : 6} fill="#0d1117" stroke="#d29922" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'testrunner' ? 'animate-ping' : ''}`} />
                <circle r="2.5" fill="#d29922" />
              </g>

              {/* 4. SecurityReviewer (Left) */}
              <g
                transform={`translate(${center - radius}, ${center})`}
                onClick={() => handleAgentClick('security')}
                className="cursor-pointer"
              >
                <circle r={selectedAgent === 'security' ? 9 : 6} fill="#0d1117" stroke="#f85149" strokeWidth="2.5" className={`transition-all ${activeAgentId === 'security' ? 'animate-ping' : ''}`} />
                <circle r="2.5" fill="#f85149" />
              </g>
            </svg>

            {/* Node Labels (clickable) */}
            <div className="absolute top-0 text-center font-mono text-[10px] sm:text-[11px] cursor-pointer -translate-y-2" onClick={() => handleAgentClick('architect')}>
              <span className={`font-semibold block ${selectedAgent === 'architect' ? 'text-[#58a6ff] text-xs' : 'text-[#58a6ff]'}`}>Architect</span>
              <span className="text-[#8b949e] text-[8px]">&theta;₁ = 0</span>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left pl-1 font-mono text-[10px] sm:text-[11px] cursor-pointer translate-x-4" onClick={() => handleAgentClick('codewriter')}>
              <span className={`font-semibold block ${selectedAgent === 'codewriter' ? 'text-[#3fb950] text-xs' : 'text-[#3fb950]'}`}>CodeWriter</span>
              <span className="text-[#8b949e] text-[8px]">&theta;₂ = &pi;/2</span>
            </div>

            <div className="absolute bottom-0 text-center font-mono text-[10px] sm:text-[11px] cursor-pointer translate-y-2" onClick={() => handleAgentClick('testrunner')}>
              <span className={`font-semibold block ${selectedAgent === 'testrunner' ? 'text-[#d29922] text-xs' : 'text-[#d29922]'}`}>TestRunner</span>
              <span className="text-[#8b949e] text-[8px]">&theta;₃ = &pi;</span>
            </div>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-right pr-1 font-mono text-[10px] sm:text-[11px] cursor-pointer -translate-x-4" onClick={() => handleAgentClick('security')}>
              <span className={`font-semibold block ${selectedAgent === 'security' ? 'text-[#f85149] text-xs' : 'text-[#f85149]'}`}>Security</span>
              <span className="text-[#8b949e] text-[8px]">&theta;₄ = 3&pi;/2</span>
            </div>
          </div>
        </div>

        {/* ── Right Column: Agent Detail / Prompt Input (5 cols) ── */}
        <div className="col-span-1 sm:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-2.5 font-mono text-[11px] min-w-0">
          {/* Agent Info Panel */}
          {selectedAgent && agentDetail ? (
            <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: agentDetail.color }} />
                <span className="font-bold text-xs truncate" style={{ color: agentDetail.color }}>
                  {selectedAgentState?.name || selectedAgent}
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase border shrink-0 ${
                  selectedAgentState?.status === 'active'
                    ? 'bg-[#3fb950]/10 text-[#3fb950] border-[#238636]'
                    : selectedAgentState?.status === 'completed'
                    ? 'bg-[#58a6ff]/10 text-[#58a6ff] border-[#58a6ff]/30'
                    : 'bg-[#21262d] text-[#8b949e] border-[#30363d]'
                }`}>
                  {selectedAgentState?.status || 'idle'}
                </span>
              </div>
              <div className="text-[10px] text-[#8b949e]">
                <span className="text-[#6e7681]">Model:</span> <span className="text-[#e6edf3]">{agentDetail.model}</span>
              </div>
              <div className="text-[10px] text-[#6e7681] leading-relaxed line-clamp-3">
                {agentDetail.systemPrompt}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="text-[#8b949e] font-medium block text-[10px]">
                  Broadcast State Vector
                </span>
                <div className="text-xs font-bold text-[#58a6ff] tracking-wider truncate">
                  [ {agents.map(a => a.status === 'completed' ? '1.00' : a.status === 'active' ? '0.50' : '0.00').join(', ')} ]
                </div>
              </div>

              <div className="space-y-1 text-[#8b949e] text-[10px]">
                {agents.map(a => (
                  <div key={a.id} className="flex items-center justify-between cursor-pointer hover:bg-[#21262d] rounded px-1.5 py-1 transition-colors" onClick={() => handleAgentClick(a.id as AgentRoleId)}>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: AGENT_DETAILS[a.id]?.color || '#8b949e' }} />
                      <span className="text-[#e6edf3] font-medium truncate">{a.name}</span>
                    </div>
                    <span className={`text-[9px] shrink-0 ${a.status === 'completed' ? 'text-[#3fb950]' : a.status === 'active' ? 'text-[#d29922]' : 'text-[#6e7681]'}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preset Prompt Chips */}
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
              placeholder="Custom agent directive..."
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

          {/* Phase Info */}
          <div className="pt-1.5 border-t border-[#30363d] text-[10px] flex items-center justify-between">
            <span className="text-[#8b949e]">&phi; = {angle.toFixed(2)} rad</span>
            <span className="text-[#58a6ff] font-bold">{playbackSpeed}× speed</span>
          </div>
        </div>

      </div>
    </div>
  );
};
