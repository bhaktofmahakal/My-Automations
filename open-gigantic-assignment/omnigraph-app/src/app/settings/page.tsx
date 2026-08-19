'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  Cpu,
  ShieldCheck,
  Check,
  Wifi,
  WifiOff,
  Loader2,
  Trash2,
  Globe,
  Zap,
  Server,
  Database,
  Layers,
  Activity,
  Sparkles,
  Bot,
  Brain,
  Code,
  Lock,
} from 'lucide-react';

type ConnectionStatus = 'idle' | 'testing' | 'connected' | 'failed';

const ORCA_MODEL_OPTIONS = [
  { value: 'deepseek/deepseek-v4-flash', label: 'DeepSeek V4 Flash (OrcaRouter - Reasoning, $0.147/M)' },
  { value: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro (OrcaRouter - Reasoning, $0.442/M)' },
  { value: 'qwen/qwen3.7-flash', label: 'Qwen3.7 Flash (OrcaRouter - Vision/Code, $0.03/M)' },
  { value: 'qwen/qwen3.8-max', label: 'Qwen3.8 Max (OrcaRouter - Frontier, $2/M)' },
  { value: 'openai/gpt-4.1-nano', label: 'GPT-4.1 Nano (OrcaRouter - Fast, $0.10/M)' },
  { value: 'openai/gpt-5-mini', label: 'GPT-5 Mini (OrcaRouter - Frontier Mini)' },
  { value: 'openai/gpt-5.4', label: 'GPT-5.4 (OrcaRouter - Frontier, $5/M)' },
  { value: 'google/gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite (OrcaRouter - $0.10/M)' },
  { value: 'google/gemini-3.6-flash', label: 'Gemini 3.6 Flash (OrcaRouter - Vision, $1.50/M)' },
  { value: 'z-ai/glm-5.3', label: 'GLM 5.3 (OrcaRouter - Reasoning, $1.26/M)' },
  { value: 'anthropic/claude-sonnet-5', label: 'Claude Sonnet 5 (OrcaRouter - $2/M)' },
  { value: 'orcarouter/fusion', label: 'OrcaRouter Fusion (Multi-Model Router)' },
  { value: 'orcarouter/fusion-mini', label: 'OrcaRouter Fusion Mini (Multi-Model Router)' },
];

const GROQ_MODEL_OPTIONS = [
  { value: 'groq/qwen3.6-27b', label: 'Qwen3.6 27B (Groq - fast inference)' },
  { value: 'groq/openai/gpt-oss-120b', label: 'GPT-OSS 120B (Groq - open frontier)' },
  { value: 'groq/groq/compound', label: 'Compound (Groq - reasoning)' },
  { value: 'groq/groq/compound-mini', label: 'Compound Mini (Groq - fast reasoning)' },
];

const AVAILABLE_MODELS = [
  ...ORCA_MODEL_OPTIONS,
  ...GROQ_MODEL_OPTIONS,
];

const PRESETS = [
  {
    id: 'frontier-balanced',
    name: '⚖️ Frontier Balanced Swarm (Recommended)',
    desc: 'DeepSeek V4 Pro (Architect) + Qwen3.8 Max (CodeWriter) + DeepSeek V4 Pro (Witness) + GPT-5 Mini (Security)',
    models: {
      architect: 'deepseek/deepseek-v4-pro',
      codewriter: 'qwen/qwen3.8-max',
      testrunner: 'deepseek/deepseek-v4-pro',
      security: 'openai/gpt-5-mini',
    },
  },
  {
    id: 'ultra-economy',
    name: '⚡ Ultra-Fast Economy Swarm',
    desc: 'DeepSeek V4 Flash (Architect) + Qwen3.7 Flash (CodeWriter) + DeepSeek V4 Flash (Witness) + GPT-4.1 Nano (Security)',
    models: {
      architect: 'deepseek/deepseek-v4-flash',
      codewriter: 'qwen/qwen3.7-flash',
      testrunner: 'deepseek/deepseek-v4-flash',
      security: 'openai/gpt-4.1-nano',
    },
  },
  {
    id: 'deep-reasoning',
    name: '🧠 Deep Reasoning & Verification Swarm',
    desc: 'GLM 5.3 (Architect) + Claude Sonnet 5 (CodeWriter) + DeepSeek V4 Pro (Witness) + GPT-5 Mini (Security)',
    models: {
      architect: 'z-ai/glm-5.3',
      codewriter: 'anthropic/claude-sonnet-5',
      testrunner: 'deepseek/deepseek-v4-pro',
      security: 'openai/gpt-5-mini',
    },
  },
];

export default function SettingsPage() {
  const [providerMode, setProviderMode] = useState<'platform' | 'byok'>('platform');
  
  // OrcaRouter & Groq Unified Gateway Keys
  const [orcaKey, setOrcaKey] = useState('');
  const [orcaBaseUrl, setOrcaBaseUrl] = useState('https://api.orcarouter.ai/v1');
  const [groqKey, setGroqKey] = useState('');

  // Per-Agent Role Model Selection through Orca & Groq
  const [agentModels, setAgentModels] = useState({
    architect: 'deepseek/deepseek-v4-flash',
    codewriter: 'qwen/qwen3.7-flash',
    testrunner: 'deepseek/deepseek-v4-flash',
    security: 'openai/gpt-4.1-nano',
  });

  const [saved, setSaved] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // System Infrastructure Health Status
  const [infraStatus, setInfraStatus] = useState<{
    redis: string;
    vector: string;
  }>({
    redis: 'Checking...',
    vector: 'Checking...',
  });

  // Load keys on mount
  useEffect(() => {
    const storedMode = localStorage.getItem('omnigraph_provider_mode');
    const storedOrca = localStorage.getItem('omnigraph_orca_key');
    const storedOrcaUrl = localStorage.getItem('omnigraph_orca_url');
    const storedGroq = localStorage.getItem('omnigraph_groq_key');
    const storedAgentModels = localStorage.getItem('omnigraph_agent_models');

    if (storedMode === 'byok' || storedMode === 'platform') setProviderMode(storedMode);
    if (storedOrca) setOrcaKey(storedOrca);
    if (storedOrcaUrl) setOrcaBaseUrl(storedOrcaUrl);
    if (storedGroq) setGroqKey(storedGroq);
    if (storedAgentModels) {
      try {
        setAgentModels(JSON.parse(storedAgentModels));
      } catch {}
    }

    // Check built-in memory & vector status (sanitized — no hostnames, latency, or raw errors)
    fetch('/api/memory')
      .then((res) => res.json())
      .then((data) => {
        setInfraStatus({
          redis: data.redis?.status === 'online' ? 'Online' : 'Not configured',
          vector: data.vector?.status === 'online' ? 'Online' : 'Not configured',
        });
      })
      .catch(() => {
        setInfraStatus({ redis: 'Unknown', vector: 'Unknown' });
      });
  }, []);

  const handleSave = () => {
    localStorage.setItem('omnigraph_provider_mode', providerMode);
    localStorage.setItem('omnigraph_orca_key', orcaKey);
    localStorage.setItem('omnigraph_orca_url', orcaBaseUrl);
    localStorage.setItem('omnigraph_groq_key', groqKey);
    localStorage.setItem('omnigraph_agent_models', JSON.stringify(agentModels));

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearKeys = () => {
    localStorage.removeItem('omnigraph_provider_mode');
    localStorage.removeItem('omnigraph_orca_key');
    localStorage.removeItem('omnigraph_orca_url');
    localStorage.removeItem('omnigraph_groq_key');
    localStorage.removeItem('omnigraph_agent_models');

    setProviderMode('platform');
    setOrcaKey('');
    setOrcaBaseUrl('https://api.orcarouter.ai/v1');
    setGroqKey('');
    setAgentModels({
      architect: 'deepseek/deepseek-v4-flash',
      codewriter: 'qwen/qwen3.7-flash',
      testrunner: 'deepseek/deepseek-v4-flash',
      security: 'openai/gpt-4.1-nano',
    });
    setConnectionStatus('idle');
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setAgentModels(preset.models);
    localStorage.setItem('omnigraph_agent_models', JSON.stringify(preset.models));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    setConnectionError(null);

    try {
      const res = await fetch('/api/agents/psmas-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Respond with exactly: "connection_ok"',
          apiKey: providerMode === 'byok' ? (orcaKey || groqKey) : undefined,
          model: agentModels.architect,
          baseUrl: orcaBaseUrl,
        }),
      });

      if (res.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('failed');
        setConnectionError('Gateway rejected the request. Verify your API key, model, and endpoint are valid.');
      }
    } catch {
      setConnectionStatus('failed');
      setConnectionError('Could not reach the AI gateway. Check your network connection and endpoint.');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Settings className="w-4 h-4 text-[#8b949e] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            AI Gateway & Platform Infrastructure
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 13</span>
        </div>
      </div>

      {/* Built-in Infrastructure Status Cards */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <Server className="w-4 h-4 text-[#3fb950]" />
            <h2 className="text-xs font-bold text-[#e6edf3]">
              Active Built-In Serverless Infrastructure
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#3fb950] bg-[#238636]/20 px-2 py-0.5 rounded font-bold">
            Built-In Zero Setup
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#3fb950]/10 border border-[#3fb950]/30 flex items-center justify-center text-[#3fb950]">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#e6edf3] block">Memory Layer</span>
                <span className="text-[10px] text-[#8b949e]">Distributed AST Locks & Beads DAG</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3fb950]">
                <Check className="w-3 h-3" /> {infraStatus.redis}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d2a8ff]/10 border border-[#d2a8ff]/30 flex items-center justify-center text-[#d2a8ff]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#e6edf3] block">Vector Index</span>
                <span className="text-[10px] text-[#8b949e]">Semantic AST Node Retrieval</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3fb950]">
                <Check className="w-3 h-3" /> {infraStatus.vector}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* One-Click Presets */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d29922]" />
          <h2 className="text-xs font-bold text-[#e6edf3]">
            One-Click Tiered Swarm Presets (via OrcaRouter & Groq)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-3 rounded-xl bg-[#0d1117] hover:bg-[#1c2438] border border-[#30363d] hover:border-[#58a6ff] text-left space-y-1.5 transition-all shadow"
            >
              <div className="text-xs font-bold text-[#e6edf3]">{preset.name}</div>
              <p className="text-[10px] text-[#8b949e] leading-relaxed">{preset.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Per-Agent Heterogeneous Model Selector */}
      <div className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-xs font-bold text-[#e6edf3]">
              Per-Agent Heterogeneous Model Assignment (Routed via Orca & Groq)
            </h2>
          </div>
          <span className="text-[10px] text-[#8b949e]">S^1 Phase-Staggered Swarm</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          {/* Mayor / Architect */}
          <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <span className="text-[11px] font-bold text-[#38bdf8] flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" />
              <span>Mayor (Architect)</span>
            </span>
            <span className="text-[9px] text-[#8b949e] block">θ = 0 rad · DAG Planning & Traversal</span>
            <select
              value={agentModels.architect}
              onChange={(e) => setAgentModels((prev) => ({ ...prev, architect: e.target.value }))}
              className="w-full bg-[#161b22] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
            >
              {AVAILABLE_MODELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Polecat / CodeWriter */}
          <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <span className="text-[11px] font-bold text-[#34d399] flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              <span>Polecat (CodeWriter)</span>
            </span>
            <span className="text-[9px] text-[#8b949e] block">θ = π/2 rad · Surgical Diff Synthesis</span>
            <select
              value={agentModels.codewriter}
              onChange={(e) => setAgentModels((prev) => ({ ...prev, codewriter: e.target.value }))}
              className="w-full bg-[#161b22] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
            >
              {AVAILABLE_MODELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Witness / TestRunner */}
          <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <span className="text-[11px] font-bold text-[#fbbf24] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Witness (TestRunner)</span>
            </span>
            <span className="text-[9px] text-[#8b949e] block">θ = π rad · Invariant Assertion Verification</span>
            <select
              value={agentModels.testrunner}
              onChange={(e) => setAgentModels((prev) => ({ ...prev, testrunner: e.target.value }))}
              className="w-full bg-[#161b22] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
            >
              {AVAILABLE_MODELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Refinery / Security */}
          <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1.5">
            <span className="text-[11px] font-bold text-[#f87171] flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Refinery (Security)</span>
            </span>
            <span className="text-[9px] text-[#8b949e] block">θ = 3π/2 rad · SAST & Safe Barrier</span>
            <select
              value={agentModels.security}
              onChange={(e) => setAgentModels((prev) => ({ ...prev, security: e.target.value }))}
              className="w-full bg-[#161b22] border border-[#30363d] rounded p-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
            >
              {AVAILABLE_MODELS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BYOK Gateway Key Configuration */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="p-3 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3.5 shadow-xl font-mono text-xs"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#d2a8ff]" />
            <h2 className="text-xs font-bold text-[#e6edf3]">
              OrcaRouter & Groq Unified Gateway Keys
            </h2>
          </div>
          <span className="text-[10px] text-[#8b949e]">Universal Model Routing</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-[#8b949e] block mb-1">
              OrcaRouter API Key (Routes Claude, GPT, DeepSeek, Qwen)
            </label>
            <input
              type="password"
              autoComplete="off"
              placeholder="orca_..."
              value={orcaKey}
              onChange={(e) => setOrcaKey(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded p-2 text-[#e6edf3] focus:outline-none placeholder-[#484f58]"
            />
          </div>

          <div>
            <label className="text-[11px] text-[#8b949e] block mb-1">OrcaRouter Base URL</label>
            <input
              type="text"
              value={orcaBaseUrl}
              onChange={(e) => setOrcaBaseUrl(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded p-2 text-[#e6edf3] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] text-[#8b949e] block mb-1">
              Groq LPU API Key (Direct Ultra-Low Latency Inference)
            </label>
            <input
              type="password"
              autoComplete="off"
              placeholder="gsk_..."
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded p-2 text-[#e6edf3] focus:outline-none placeholder-[#484f58]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#30363d] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-lg transition-all shadow"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Configuration</span>
            </button>

            <button
              onClick={handleTestConnection}
              disabled={connectionStatus === 'testing'}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#30363d] rounded-lg font-semibold transition-all"
            >
              {connectionStatus === 'testing' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Testing...</span>
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5" />
                  <span>Test Gateway Connection</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleClearKeys}
            className="flex items-center gap-1 px-3 py-2 text-[#8b949e] hover:text-[#f85149] rounded-lg hover:bg-[#21262d] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Keys</span>
          </button>
        </div>

        {saved && (
          <div className="p-2.5 rounded-lg bg-[#238636]/20 border border-[#238636] text-[#3fb950] font-bold">
            ✓ Settings and heterogeneous agent models saved successfully!
          </div>
        )}

        {connectionStatus === 'connected' && (
          <div className="p-2.5 rounded-lg bg-[#238636]/20 border border-[#238636] text-[#3fb950] flex items-center justify-between font-bold">
            <span>✓ Multi-agent gateway is live and responding!</span>
          </div>
        )}

        {connectionStatus === 'failed' && (
          <div className="p-2.5 rounded-lg bg-[#f85149]/20 border border-[#f85149] text-[#f85149] font-bold">
            ✗ Connection test failed: {connectionError}
          </div>
        )}
      </form>
    </div>
  );
}
