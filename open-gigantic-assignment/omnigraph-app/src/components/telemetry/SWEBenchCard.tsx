'use client';

import React, { useState } from 'react';
import { BarChart2, CheckCircle2, XCircle } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'django',
    name: 'Django 10 Bugs',
    baseline: 0.104,
    optimized: 0.065,
    tests: [
      { name: 'QuerySet filter chain fix', pass: true },
      { name: 'Template tag escaping', pass: true },
      { name: 'ORM aggregation edge case', pass: true },
      { name: 'CSRF middleware regression', pass: false },
      { name: 'Admin inline formset', pass: true },
    ],
    passRate: '8/10',
  },
  {
    id: 'react19',
    name: 'React 19 Refactor',
    baseline: 0.132,
    optimized: 0.071,
    tests: [
      { name: 'Suspense boundary migration', pass: true },
      { name: 'use() hook adoption', pass: true },
      { name: 'Server Component extraction', pass: true },
      { name: 'Concurrent rendering stability', pass: true },
      { name: 'Hydration mismatch fix', pass: false },
    ],
    passRate: '4/5',
  },
  {
    id: 'rbac',
    name: 'RBAC Migration',
    baseline: 0.089,
    optimized: 0.048,
    tests: [
      { name: 'Permission model migration', pass: true },
      { name: 'Role hierarchy traversal', pass: true },
      { name: 'JWT claims injection', pass: true },
      { name: 'Session invalidation', pass: true },
      { name: 'Rate limiter bypass guard', pass: true },
    ],
    passRate: '5/5',
  },
];

export const SWEBenchCard: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  const savingsPct = (((activeScenario.baseline - activeScenario.optimized) / activeScenario.baseline) * 100).toFixed(1);

  return (
    <div className="flex flex-col h-full w-full bg-[#161b22] text-[#e6edf3] font-sans overflow-y-auto custom-scrollbar select-none p-3 sm:p-4 justify-between space-y-3 min-w-0">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between pb-1 border-b border-[#30363d] gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#e6edf3] shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-[#e6edf3] tracking-tight">
            SWE-bench Lite
          </h2>
        </div>

        {/* Scenario Selector */}
        <div className="flex items-center gap-1 bg-[#0d1117] px-2 py-1 rounded-lg border border-[#30363d] text-[11px] font-mono shrink-0 max-w-[180px]">
          <select
            value={activeScenario.id}
            onChange={(e) => setActiveScenario(SCENARIOS.find(s => s.id === e.target.value) || SCENARIOS[0])}
            className="bg-transparent text-[#e6edf3] focus:outline-none cursor-pointer text-[11px] truncate max-w-full"
            aria-label="Select benchmark scenario"
          >
            {SCENARIOS.map(s => (
              <option key={s.id} value={s.id} className="bg-[#161b22]">{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-[11px] text-[#8b949e] shrink-0">
        Median execution cost (USD) — {activeScenario.name}
      </p>

      {/* ── Main Comparison Bars ── */}
      <div className="space-y-2.5 my-1 shrink-0">
        {/* 1. Baseline Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium truncate">Claude Code baseline</span>
            <span className="font-mono font-bold text-[#f85149] text-xs">${activeScenario.baseline.toFixed(3)}</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#f85149] rounded-full transition-all duration-700"
              style={{ width: `${(activeScenario.baseline / 0.15) * 100}%` }}
            />
          </div>
        </div>

        {/* 2. OmniGraph Studio Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#8b949e] font-medium truncate">OmniGraph Studio</span>
            <span className="font-mono font-bold text-[#3fb950] text-xs">${activeScenario.optimized.toFixed(3)}</span>
          </div>

          <div className="relative h-2.5 w-full bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#3fb950] rounded-full transition-all duration-700"
              style={{ width: `${(activeScenario.optimized / 0.15) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Test Assertion Checklist ── */}
      <div className="space-y-1 my-1 flex-1 min-h-[90px]">
        <span className="text-[10px] text-[#8b949e] font-medium uppercase tracking-wider block">
          Test Assertions ({activeScenario.passRate} Passed)
        </span>
        <div className="space-y-1 max-h-28 sm:max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {activeScenario.tests.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] p-1 rounded bg-[#0d1117]/60 border border-[#21262d]">
              {t.pass ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950] shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-[#f85149] shrink-0" />
              )}
              <span className={`truncate ${t.pass ? 'text-[#e6edf3]' : 'text-[#f85149]'}`}>
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Savings Summary Box ── */}
      <div className="pt-2 border-t border-[#30363d] flex items-center justify-between shrink-0">
        <span className="text-xs font-medium text-[#e6edf3]">
          Cost Savings
        </span>

        <div className="text-right">
          <div className="text-base sm:text-lg font-bold text-[#3fb950] font-mono leading-none">
            {savingsPct}%
          </div>
          <span className="text-[10px] text-[#8b949e]">Lower median cost</span>
        </div>
      </div>
    </div>
  );
};
