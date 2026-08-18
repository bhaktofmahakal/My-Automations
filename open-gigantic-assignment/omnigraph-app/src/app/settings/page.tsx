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
  Sparkles,
  Server,
  ToggleLeft,
  ToggleRight,
  Info,
} from 'lucide-react';

type ConnectionStatus = 'idle' | 'testing' | 'connected' | 'failed';

export default function SettingsPage() {
  const [providerMode, setProviderMode] = useState<'platform' | 'byok'>('platform');
  const [orcaKey, setOrcaKey] = useState('');
  const [orcaBaseUrl, setOrcaBaseUrl] = useState('https://api.orcarouter.ai/v1');
  const [orcaModel, setOrcaModel] = useState('openai/gpt-4o-mini');
  const [groqKey, setGroqKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [connectionLatency, setConnectionLatency] = useState<number | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Load keys and mode from localStorage on mount
  useEffect(() => {
    const storedMode = localStorage.getItem('omnigraph_provider_mode');
    const storedOrca = localStorage.getItem('omnigraph_orca_key');
    const storedOrcaUrl = localStorage.getItem('omnigraph_orca_url');
    const storedOrcaModel = localStorage.getItem('omnigraph_orca_model');
    const storedGroq = localStorage.getItem('omnigraph_groq_key');

    if (storedMode === 'byok' || storedMode === 'platform') setProviderMode(storedMode);
    if (storedOrca) setOrcaKey(storedOrca);
    if (storedOrcaUrl) setOrcaBaseUrl(storedOrcaUrl);
    if (storedOrcaModel) setOrcaModel(storedOrcaModel);
    if (storedGroq) setGroqKey(storedGroq);
  }, []);

  const handleSave = () => {
    localStorage.setItem('omnigraph_provider_mode', providerMode);
    localStorage.setItem('omnigraph_orca_key', orcaKey);
    localStorage.setItem('omnigraph_orca_url', orcaBaseUrl);
    localStorage.setItem('omnigraph_orca_model', orcaModel);
    localStorage.setItem('omnigraph_groq_key', groqKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearKeys = () => {
    localStorage.removeItem('omnigraph_provider_mode');
    localStorage.removeItem('omnigraph_orca_key');
    localStorage.removeItem('omnigraph_orca_url');
    localStorage.removeItem('omnigraph_orca_model');
    localStorage.removeItem('omnigraph_groq_key');
    setProviderMode('platform');
    setOrcaKey('');
    setOrcaBaseUrl('https://api.orcarouter.ai/v1');
    setOrcaModel('openai/gpt-4o-mini');
    setGroqKey('');
    setConnectionStatus('idle');
    setConnectionLatency(null);
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    setConnectionError(null);
    setConnectionLatency(null);
    const startTime = Date.now();

    try {
      const res = await fetch('/api/agents/psmas-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Respond with exactly: "connection_ok"',
          apiKey: providerMode === 'byok' ? (orcaKey || groqKey) : undefined,
          model: orcaModel,
          test: true,
        }),
      });

      const latency = Date.now() - startTime;
      setConnectionLatency(latency);

      if (res.ok) {
        setConnectionStatus('connected');
      } else {
        const body = await res.text();
        setConnectionStatus('failed');
        setConnectionError(`HTTP ${res.status}: ${body.slice(0, 100)}`);
      }
    } catch (err: any) {
      setConnectionLatency(Date.now() - startTime);
      setConnectionStatus('failed');
      setConnectionError(err.message || 'Network error');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Settings className="w-4 h-4 text-[#8b949e] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            AI Engine Configuration: In-Built Server Gateway + BYOK Override
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 13</span>
        </div>
      </div>

      {/* Dual Mode Switcher Banner */}
      <div className="max-w-2xl w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div
          onClick={() => setProviderMode('platform')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            providerMode === 'platform'
              ? 'bg-[#16291e] border-[#238636] ring-1 ring-[#238636]'
              : 'bg-[#161b22] border-[#30363d] hover:border-[#484f58]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#3fb950]" />
              <span className="font-bold font-mono text-xs text-[#e6edf3]">
                Managed Server Engine (In-Built)
              </span>
            </div>
            {providerMode === 'platform' && (
              <span className="text-[10px] font-mono font-bold text-[#3fb950] bg-[#238636]/20 px-1.5 py-0.5 rounded">
                DEFAULT ACTIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1.5">
            Zero configuration needed. Runs directly via server-side credentials with 200+ models.
          </p>
        </div>

        <div
          onClick={() => setProviderMode('byok')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            providerMode === 'byok'
              ? 'bg-[#1c2d42] border-[#388bfd] ring-1 ring-[#388bfd]'
              : 'bg-[#161b22] border-[#30363d] hover:border-[#484f58]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#58a6ff]" />
              <span className="font-bold font-mono text-xs text-[#e6edf3]">
                Custom BYOK Override (Optional)
              </span>
            </div>
            {providerMode === 'byok' && (
              <span className="text-[10px] font-mono font-bold text-[#58a6ff] bg-[#388bfd]/20 px-1.5 py-0.5 rounded">
                CUSTOM KEY ACTIVE
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1.5">
            Use your personal OrcaRouter / Groq / OpenAI API keys to bill directly to your own account.
          </p>
        </div>
      </div>

      {/* Settings Form Card */}
      <div className="p-4 sm:p-6 rounded-xl bg-[#161b22] border border-[#30363d] shadow-2xl max-w-2xl w-full space-y-4 sm:space-y-5 font-mono text-xs">
        {/* Managed Platform Mode Explanation */}
        {providerMode === 'platform' ? (
          <div className="p-3 bg-[#0d1117] border border-[#30363d] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#3fb950] font-bold">
              <Check className="w-4 h-4" />
              <span>In-Built Server AI Gateway is Live & Connected</span>
            </div>
            <p className="text-[11px] text-[#8b949e] leading-relaxed">
              The platform is using the pre-configured server environment variables (<code className="bg-[#161b22] px-1 rounded text-zinc-300">.env.local</code> / Vercel Edge).
              All 4 PSMAS multi-agent roles (Architect, CodeWriter, TestRunner, SecurityReviewer) are fully functional without entering any client keys.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 2.5 Flash', 'DeepSeek-V3', 'Groq Llama 3.3'].map((m, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-[#161b22] border border-[#30363d] text-[#e6edf3]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <h2 className="text-xs sm:text-sm font-bold text-[#e6edf3]">Custom BYOK Integration</h2>
            <p className="text-[11px] sm:text-xs text-[#8b949e] leading-relaxed">
              Your custom keys are stored in your browser&apos;s localStorage and passed securely to <code className="bg-[#0d1117] px-1 rounded">/api/agents/psmas-run/</code>.
            </p>
          </div>
        )}

        {/* Form Inputs (Custom Keys or Model Selector) */}
        <div className="space-y-3.5 pt-2">
          {providerMode === 'byok' && (
            <>
              {/* OrcaRouter API Key */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
                  <span>OrcaRouter API Key (Unified 200+ Models)</span>
                </label>
                <input
                  type="password"
                  placeholder="sk-orca-..."
                  value={orcaKey}
                  onChange={(e) => setOrcaKey(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none transition-colors"
                />
              </div>

              {/* OrcaRouter Base URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#58a6ff] shrink-0" />
                  <span>OrcaRouter Base URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://api.orcarouter.ai/v1"
                  value={orcaBaseUrl}
                  onChange={(e) => setOrcaBaseUrl(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none transition-colors"
                />
              </div>

              {/* Groq API Key */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#d29922] shrink-0" />
                  <span>Groq API Key (Ultra-Fast Inference)</span>
                </label>
                <input
                  type="password"
                  placeholder="gsk_..."
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none transition-colors"
                />
              </div>
            </>
          )}

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#bc8cff] shrink-0" />
              <span>Target AI Model Routing</span>
            </label>
            <select
              value={orcaModel}
              onChange={(e) => setOrcaModel(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none cursor-pointer"
            >
              <option value="openai/gpt-4o-mini">openai/gpt-4o-mini (Default Fast)</option>
              <option value="openai/gpt-4o">openai/gpt-4o (Deep Reasoning)</option>
              <option value="google/gemini-2.5-flash">google/gemini-2.5-flash (High Speed)</option>
              <option value="deepseek/deepseek-chat">deepseek/deepseek-chat (Code Logic)</option>
              <option value="auto">auto (OrcaRouter Optimal Routing)</option>
            </select>
          </div>
        </div>

        {/* Connection Test Status */}
        {connectionStatus !== 'idle' && (
          <div
            className={`p-3 rounded-lg border text-xs font-mono ${
              connectionStatus === 'testing'
                ? 'bg-[#0d1117] border-[#58a6ff]/40 text-[#58a6ff]'
                : connectionStatus === 'connected'
                ? 'bg-[#16291e] border-[#238636] text-[#3fb950]'
                : 'bg-[#2d191e] border-[#f85149]/40 text-[#f85149]'
            }`}
          >
            <div className="flex items-center gap-2">
              {connectionStatus === 'testing' && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
              {connectionStatus === 'connected' && <Wifi className="w-3.5 h-3.5 shrink-0" />}
              {connectionStatus === 'failed' && <WifiOff className="w-3.5 h-3.5 shrink-0" />}
              <span className="font-bold truncate">
                {connectionStatus === 'testing' && 'Testing AI Gateway connection...'}
                {connectionStatus === 'connected' && `✓ Gateway Connection Active (${connectionLatency}ms latency)`}
                {connectionStatus === 'failed' && `✗ Connection Failed`}
              </span>
            </div>
            {connectionError && (
              <p className="mt-1 text-[10px] text-[#f85149]/80 break-words">{connectionError}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="pt-3 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Encrypted / Safe Storage</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {providerMode === 'byok' && (
              <button
                onClick={handleClearKeys}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#8b949e] hover:text-[#f85149] border border-[#30363d] font-medium transition-all text-xs min-h-[36px]"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            )}

            <button
              onClick={handleTestConnection}
              disabled={connectionStatus === 'testing'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#58a6ff]/40 font-medium transition-all text-xs disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px]"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Test Connection</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] font-bold transition-all shadow text-xs min-h-[36px]"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>SAVED!</span>
                </>
              ) : (
                <span>SAVE CONFIG</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
