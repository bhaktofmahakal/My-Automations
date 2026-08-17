'use client';

import React, { useEffect, useState } from 'react';
import { Radio, Activity } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export const PSMASRadar: React.FC = () => {
  const [angle, setAngle] = useState<number>(1.274);
  const currentPhaseAngle = useOmniStore(state => state.currentPhaseAngle);

  // Smooth rotational sweep animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(prev => (prev + 0.02) % (2 * Math.PI));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const size = 260;
  const center = size / 2;
  const radius = 95;

  const needleX = center + radius * Math.cos(angle - Math.PI / 2);
  const needleY = center + radius * Math.sin(angle - Math.PI / 2);

  return (
    <div className="flex flex-col h-full bg-[#161b22] text-[#e6edf3] font-sans overflow-hidden select-none">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d]">
        <div className="flex items-center gap-2.5">
          <Radio className="w-4 h-4 text-[#58a6ff]" />
          <h2 className="text-sm font-semibold text-[#e6edf3] tracking-tight">
            PSMAS Manifold Radar
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#58a6ff]">
          <span className="flex items-center gap-0.5">
            <span className="w-0.5 h-2 bg-[#58a6ff] rounded-full animate-pulse" />
            <span className="w-0.5 h-3.5 bg-[#58a6ff] rounded-full animate-pulse delay-75" />
            <span className="w-0.5 h-2.5 bg-[#58a6ff] rounded-full animate-pulse delay-150" />
          </span>
          <span className="font-semibold tracking-wide">LIVE SWEEP</span>
        </div>
      </div>

      {/* ── Main Radar + State Vector Grid ── */}
      <div className="flex-1 grid grid-cols-12 items-center p-4 gap-2">

        {/* ── Left Column: Circular Manifold (7 cols) ── */}
        <div className="col-span-7 relative flex items-center justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Concentric Coordinate Rings */}
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#30363d" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={center} cy={center} r={radius * 0.68} fill="none" stroke="#21262d" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx={center} cy={center} r={radius * 0.36} fill="none" stroke="#21262d" strokeWidth="1" />

            {/* Radial Crosshairs */}
            <line x1={center - radius - 15} y1={center} x2={center + radius + 15} y2={center} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={center} y1={center - radius - 15} x2={center} y2={center + radius + 15} stroke="#30363d" strokeWidth="1" strokeDasharray="2 2" />

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
            <circle cx={center} cy={center} r="6" fill="#58a6ff" className="shadow-lg" />
            <circle cx={center} cy={center} r="12" fill="none" stroke="#58a6ff" strokeWidth="1" opacity="0.4" />

            {/* 1. Architect Node (Top: θ₁ = 0) */}
            <g transform={`translate(${center}, ${center - radius})`}>
              <circle r="6" fill="#0d1117" stroke="#58a6ff" strokeWidth="2.5" className="filter drop-shadow-[0_0_6px_rgba(88,166,255,0.8)]" />
              <circle r="2.5" fill="#58a6ff" />
            </g>

            {/* 2. CodeWriter Node (Right: θ₂ = π/2) */}
            <g transform={`translate(${center + radius}, ${center})`}>
              <circle r="6" fill="#0d1117" stroke="#3fb950" strokeWidth="2.5" className="filter drop-shadow-[0_0_6px_rgba(63,185,80,0.8)]" />
              <circle r="2.5" fill="#3fb950" />
            </g>

            {/* 3. TestRunner Node (Bottom: θ₃ = π) */}
            <g transform={`translate(${center}, ${center + radius})`}>
              <circle r="6" fill="#0d1117" stroke="#d29922" strokeWidth="2.5" className="filter drop-shadow-[0_0_6px_rgba(210,153,34,0.8)]" />
              <circle r="2.5" fill="#d29922" />
            </g>

            {/* 4. SecurityReviewer Node (Left: θ₄ = 3π/2) */}
            <g transform={`translate(${center - radius}, ${center})`}>
              <circle r="6" fill="#0d1117" stroke="#f85149" strokeWidth="2.5" className="filter drop-shadow-[0_0_6px_rgba(248,81,73,0.8)]" />
              <circle r="2.5" fill="#f85149" />
            </g>
          </svg>

          {/* Node Labels positioned around circle */}
          {/* Top Label: Architect */}
          <div className="absolute top-0 text-center font-mono text-xs">
            <span className="text-[#58a6ff] font-semibold block text-xs">Architect</span>
            <span className="text-[#8b949e] text-[11px]">&theta;<sub>1</sub> = 0</span>
          </div>

          {/* Right Label: CodeWriter */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left pl-1 font-mono text-xs">
            <span className="text-[#3fb950] font-semibold block text-xs">CodeWriter</span>
            <span className="text-[#8b949e] text-[11px]">&theta;<sub>2</sub> = &pi;/2</span>
          </div>

          {/* Bottom Label: TestRunner */}
          <div className="absolute bottom-0 text-center font-mono text-xs">
            <span className="text-[#d29922] font-semibold block text-xs">TestRunner</span>
            <span className="text-[#8b949e] text-[11px]">&theta;<sub>3</sub> = &pi;</span>
          </div>

          {/* Left Label: SecurityReviewer */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-right pr-1 font-mono text-xs">
            <span className="text-[#f85149] font-semibold block text-xs">SecurityReviewer</span>
            <span className="text-[#8b949e] text-[11px]">&theta;<sub>4</sub> = 3&pi;/2</span>
          </div>
        </div>

        {/* ── Right Column: Broadcast State Vector (5 cols) ── */}
        <div className="col-span-5 flex flex-col justify-center space-y-3 font-mono text-xs pl-2">
          {/* Vector Title */}
          <div>
            <span className="text-xs text-[#8b949e] font-medium block mb-1">
              Broadcast State Vector
            </span>
            <div className="text-sm font-bold text-[#58a6ff] tracking-wider">
              [ 0.82, 0.14, 0.61, 0.09 ]
            </div>
          </div>

          {/* Agent Vector Breakdown */}
          <div className="space-y-1.5 text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#58a6ff]" />
              <span className="text-[#e6edf3] font-medium w-24">Architect</span>
              <span className="text-[#8b949e]">0.82, 0.14, 0.61, 0.09</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
              <span className="text-[#e6edf3] font-medium w-24">CodeWriter</span>
              <span className="text-[#8b949e]">0.21, 0.91, 0.44, 0.63</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d29922]" />
              <span className="text-[#e6edf3] font-medium w-24">TestRunner</span>
              <span className="text-[#8b949e]">0.47, 0.32, 0.88, 0.18</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f85149]" />
              <span className="text-[#e6edf3] font-medium w-24">SecurityReviewer</span>
              <span className="text-[#8b949e]">0.11, 0.57, 0.26, 0.94</span>
            </div>
          </div>

          {/* Manifold Equation at Bottom */}
          <div className="pt-2 border-t border-[#30363d] text-xs">
            <span className="text-[#8b949e] block text-[11px]">Manifold &phi;(t) &isin; [0, 2&pi;]</span>
            <span className="text-[#58a6ff] font-bold">&phi; = {angle.toFixed(3)} rad</span>
          </div>
        </div>

      </div>
    </div>
  );
};
