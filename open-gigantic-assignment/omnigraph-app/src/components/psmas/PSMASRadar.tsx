'use client';

import React, { useEffect, useState } from 'react';
import { Radio, Play, Pause, RotateCcw } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const PSMASRadar: React.FC = () => {
  const [angle, setAngle] = useState<number>(1.274);
  const isAgentRunning = useOmniStore(state => state.isAgentRunning);
  const startPSMASSweep = useOmniStore(state => state.startPSMASSweep);
  const pausePSMASSweep = useOmniStore(state => state.pausePSMASSweep);
  const resetPSMASSweep = useOmniStore(state => state.resetPSMASSweep);
  const activeAgentId = useOmniStore(state => state.activeAgentId);

  // Rotational sweep animation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAgentRunning) {
      interval = setInterval(() => {
        setAngle(prev => (prev + 0.04) % (2 * Math.PI));
      }, 40);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAgentRunning]);

  const size = 240;
  const center = size / 2;
  const radius = 88;

  const needleX = center + radius * Math.cos(angle - Math.PI / 2);
  const needleY = center + radius * Math.sin(angle - Math.PI / 2);

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#58a6ff]" />
          <h2 className="text-xs font-semibold text-[#e6edf3] tracking-tight">
            PSMAS Manifold Radar
          </h2>
        </div>

        {/* Live Sweep Control Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={isAgentRunning ? pausePSMASSweep : startPSMASSweep}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              isAgentRunning
                ? 'bg-[#d29922] text-[#0d1117] shadow-[0_0_10px_rgba(210,153,34,0.3)]'
                : 'bg-[#3fb950] text-[#0d1117] hover:bg-[#2ea043] shadow-[0_0_10px_rgba(63,185,80,0.3)]'
            }`}
          >
            {isAgentRunning ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>RUN SWEEP</span>
              </>
            )}
          </button>

          <button
            onClick={resetPSMASSweep}
            title="Reset"
            className="p-1 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d]"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Main Radar + State Vector Grid ── */}
      <div className="flex-1 grid grid-cols-12 items-center p-3 gap-2 overflow-hidden">

        {/* ── Left Column: Circular Manifold (7 cols) ── */}
        <div className="col-span-7 relative flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Concentric Coordinate Rings */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#30363d" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={center} cy={center} r={radius * 0.68} fill="none" stroke="#21262d" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx={center} cy={center} r={radius * 0.36} fill="none" stroke="#21262d" strokeWidth="1" />

            {/* Radial Crosshairs */}
            <line x1={center - radius - 10} y1={center} x2={center + radius + 10} y2={center} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={center} y1={center - radius - 10} x2={center} y2={center + radius + 10} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />

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

            {/* 1. Architect Node (Top: θ₁ = 0) */}
            <g transform={`translate(${center}, ${center - radius})`}>
              <circle r="6" fill="#0d1117" stroke="#58a6ff" strokeWidth="2.5" className={activeAgentId === 'architect' ? 'animate-ping' : ''} />
              <circle r="2.5" fill="#58a6ff" />
            </g>

            {/* 2. CodeWriter Node (Right: θ₂ = π/2) */}
            <g transform={`translate(${center + radius}, ${center})`}>
              <circle r="6" fill="#0d1117" stroke="#3fb950" strokeWidth="2.5" className={activeAgentId === 'codewriter' ? 'animate-ping' : ''} />
              <circle r="2.5" fill="#3fb950" />
            </g>

            {/* 3. TestRunner Node (Bottom: θ₃ = π) */}
            <g transform={`translate(${center}, ${center + radius})`}>
              <circle r="6" fill="#0d1117" stroke="#d29922" strokeWidth="2.5" className={activeAgentId === 'testrunner' ? 'animate-ping' : ''} />
              <circle r="2.5" fill="#d29922" />
            </g>

            {/* 4. SecurityReviewer Node (Left: θ₄ = 3π/2) */}
            <g transform={`translate(${center - radius}, ${center})`}>
              <circle r="6" fill="#0d1117" stroke="#f85149" strokeWidth="2.5" className={activeAgentId === 'security' ? 'animate-ping' : ''} />
              <circle r="2.5" fill="#f85149" />
            </g>
          </svg>

          {/* Node Labels */}
          <div className="absolute top-0 text-center font-mono text-[11px]">
            <span className="text-[#58a6ff] font-semibold block">Architect</span>
            <span className="text-[#8b949e] text-[9px]">&theta;<sub>1</sub> = 0</span>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left pl-1 font-mono text-[11px]">
            <span className="text-[#3fb950] font-semibold block">CodeWriter</span>
            <span className="text-[#8b949e] text-[9px]">&theta;<sub>2</sub> = &pi;/2</span>
          </div>

          <div className="absolute bottom-0 text-center font-mono text-[11px]">
            <span className="text-[#d29922] font-semibold block">TestRunner</span>
            <span className="text-[#8b949e] text-[9px]">&theta;<sub>3</sub> = &pi;</span>
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-right pr-1 font-mono text-[11px]">
            <span className="text-[#f85149] font-semibold block">SecurityReviewer</span>
            <span className="text-[#8b949e] text-[9px]">&theta;<sub>4</sub> = 3&pi;/2</span>
          </div>
        </div>

        {/* ── Right Column: Broadcast State Vector (5 cols) ── */}
        <div className="col-span-5 flex flex-col justify-center space-y-2 font-mono text-[11px] pl-1">
          <div>
            <span className="text-[#8b949e] font-medium block text-[10px]">
              Broadcast State Vector
            </span>
            <div className="text-xs font-bold text-[#58a6ff] tracking-wider">
              [ 0.82, 0.14, 0.61, 0.09 ]
            </div>
          </div>

          <div className="space-y-1 text-[#8b949e] text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
              <span className="text-[#e6edf3] font-medium w-20">Architect</span>
              <span>0.82, 0.14, 0.61</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
              <span className="text-[#e6edf3] font-medium w-20">CodeWriter</span>
              <span>0.21, 0.91, 0.44</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d29922]" />
              <span className="text-[#e6edf3] font-medium w-20">TestRunner</span>
              <span>0.47, 0.32, 0.88</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f85149]" />
              <span className="text-[#e6edf3] font-medium w-20">Security</span>
              <span>0.11, 0.57, 0.26</span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-[#30363d] text-[10px]">
            <span className="text-[#8b949e] block">Manifold &phi;(t) &isin; [0, 2&pi;]</span>
            <span className="text-[#58a6ff] font-bold">&phi; = {angle.toFixed(3)} rad</span>
          </div>
        </div>

      </div>
    </div>
  );
};
