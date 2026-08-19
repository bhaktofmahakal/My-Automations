'use client';

import React, { useState, useEffect } from 'react';
import { TokenTelemetry } from '@/components/telemetry/TokenTelemetry';
import { SWEBenchCard } from '@/components/telemetry/SWEBenchCard';
import {
  BarChart3,
  Zap,
  Play,
  Loader2,
  FileCode,
  CheckCircle2,
  TrendingDown,
  DollarSign,
  Layers,
  ArrowRight,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export default function TelemetryPage() {
  const files = useOmniStore((state) => state.files);
  const activeScenario = useOmniStore((state) => state.activeScenario);
  
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);
  const [benchmarkData, setBenchmarkData] = useState<any | null>(null);
  const [monthlyPRVolume, setMonthlyPRVolume] = useState(500);

  // Auto-run benchmark on mount or when files change
  const runLiveBenchmark = async () => {
    if (files.length === 0) return;
    setIsRunningBenchmark(true);

    try {
      const res = await fetch('/api/tokens/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files }),
      });

      if (res.ok) {
        const data = await res.json();
        setBenchmarkData(data);
      }
    } catch {
      // Fallback
    } finally {
      setIsRunningBenchmark(false);
    }
  };

  useEffect(() => {
    runLiveBenchmark();
  }, [files.length]);

  const agg = benchmarkData?.aggregate;
  const monthlySavingsUSD = agg ? (agg.netSavingsPerSweep * monthlyPRVolume) : 0;
  const annualSavingsUSD = monthlySavingsUSD * 12;

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <BarChart3 className="w-4 h-4 text-[#f85149] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            TokenFold Mathematical Token Benchmark & Telemetry Engine
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 6</span>
        </div>

        <button
          onClick={runLiveBenchmark}
          disabled={isRunningBenchmark || files.length === 0}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs transition-all shadow shrink-0 disabled:opacity-40"
        >
          {isRunningBenchmark ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>TOKENIZING REPO...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              <span>Run Live Benchmark on Ingested Repo</span>
            </>
          )}
        </button>
      </div>

      {/* Real Aggregate Metric Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 shrink-0 font-mono">
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] shadow">
          <span className="text-[10px] text-[#8b949e] block font-semibold">TOTAL RAW TOKENS</span>
          <div className="text-base sm:text-lg font-bold text-[#f85149] mt-0.5">
            {agg ? agg.totalRawTokens.toLocaleString() : '—'}
          </div>
          <span className="text-[9px] text-[#6e7681]">Full AST Context ($2.50/M)</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] shadow">
          <span className="text-[10px] text-[#8b949e] block font-semibold">TOKENFOLD COMPRESSED</span>
          <div className="text-base sm:text-lg font-bold text-[#3fb950] mt-0.5">
            {agg ? agg.totalCompressedTokens.toLocaleString() : '—'}
          </div>
          <span className="text-[9px] text-[#6e7681]">Bounded Signatures ($0.70/M)</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] shadow">
          <span className="text-[10px] text-[#8b949e] block font-semibold">NET TOKEN REDUCTION</span>
          <div className="text-base sm:text-lg font-bold text-[#58a6ff] mt-0.5 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-[#58a6ff]" />
            <span>{agg ? agg.netReductionPct : '—'}%</span>
          </div>
          <span className="text-[9px] text-[#6e7681]">{agg ? `${agg.netCompressionRatio}x compression ratio` : 'Run a benchmark to measure'}</span>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] shadow">
          <span className="text-[10px] text-[#8b949e] block font-semibold">EST. MONTHLY SAVINGS</span>
          <div className="text-base sm:text-lg font-bold text-[#d2a8ff] mt-0.5 flex items-center">
            <DollarSign className="w-4 h-4 text-[#d2a8ff]" />
            <span>{monthlySavingsUSD.toFixed(2)}</span>
          </div>
          <span className="text-[9px] text-[#6e7681]">at {monthlyPRVolume} PRs/mo</span>
        </div>
      </div>

      {/* Main 2-Column Grid: Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 shrink-0">
        <div className="col-span-1 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-[380px]">
          <TokenTelemetry />
        </div>
        <div className="col-span-1 lg:col-span-6 rounded-xl overflow-hidden bg-[#161b22] border border-[#30363d] shadow-2xl flex flex-col min-h-[380px]">
          <SWEBenchCard />
        </div>
      </div>

      {/* Real Ingested Repo File-by-File Token Breakdown Table */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <FileCode className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-xs font-bold text-[#e6edf3]">
              Live Repository File Token Breakdown ({benchmarkData?.fileMetrics?.length || files.length} files analyzed)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#3fb950] bg-[#238636]/20 px-2 py-0.5 rounded font-bold">
            Real AST Mathematical Proof
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar border border-[#30363d] rounded-lg">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead className="bg-[#0d1117] text-[#8b949e] border-b border-[#30363d]">
              <tr>
                <th className="p-2.5">File Path</th>
                <th className="p-2.5">Raw Tokens</th>
                <th className="p-2.5">TokenFold Tokens</th>
                <th className="p-2.5">Reduction %</th>
                <th className="p-2.5">Compression Bar</th>
                <th className="p-2.5">Savings / Sweep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262d]">
              {(benchmarkData?.fileMetrics || []).map((fm: any, idx: number) => (
                <tr key={idx} className="hover:bg-[#0d1117]/60 transition-colors">
                  <td className="p-2.5 font-bold text-[#e6edf3] flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
                    <span className="truncate">{fm.path}</span>
                  </td>
                  <td className="p-2.5 text-[#f85149] font-bold">{fm.rawTokens?.toLocaleString() || 0}</td>
                  <td className="p-2.5 text-[#3fb950] font-bold">{fm.compressedTokens?.toLocaleString() || 0}</td>
                  <td className="p-2.5">
                    <span className="bg-[#388bfd]/20 text-[#58a6ff] px-2 py-0.5 rounded font-bold">
                      {fm.reductionPct}%
                    </span>
                  </td>
                  <td className="p-2.5 w-40">
                    <div className="w-full bg-[#0d1117] h-2 rounded-full overflow-hidden border border-[#30363d]">
                      <div
                        className="bg-[#3fb950] h-full rounded-full"
                        style={{ width: `${Math.min(100, fm.reductionPct)}%` }}
                      />
                    </div>
                  </td>
                  <td className="p-2.5 text-[#d2a8ff] font-bold">
                    +${(fm.savingsUSD || 0).toFixed(4)}
                  </td>
                </tr>
              ))}
              {(!benchmarkData?.fileMetrics || benchmarkData.fileMetrics.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-3 text-center text-[#8b949e] text-[11px]">
                    No file metrics yet — run the live benchmark on an ingested repo to see the per-file breakdown.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
