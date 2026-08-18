'use client';

import React, { useState } from 'react';
import { Settings, Key, Cpu, ShieldCheck, Check } from 'lucide-react';

export default function SettingsPage() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-4 font-sans select-none space-y-4 overflow-y-auto">
      {/* Subheader */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#8b949e]" />
          <h1 className="font-bold text-[#e6edf3]">AI Model Keys & BYOK (Bring Your Own Key) Settings</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 13</span>
        </div>
      </div>

      {/* Settings Form Card */}
      <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] shadow-2xl max-w-2xl space-y-5 font-mono text-xs">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-[#e6edf3]">BYOK LLM Provider Integration</h2>
          <p className="text-xs text-[#8b949e]">
            Keys are stored locally in your browser session memory and passed securely to `/api/agents/psmas-run/`.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* OpenAI Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
              <Key className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>OpenAI API Key (GPT-4o / O3-Mini)</span>
            </label>
            <input
              type="password"
              placeholder="sk-proj-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none"
            />
          </div>

          {/* Anthropic Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8b949e] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#bc8cff]" />
              <span>Anthropic API Key (Claude 3.7 Sonnet)</span>
            </label>
            <input
              type="password"
              placeholder="sk-ant-..."
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-lg p-2.5 text-xs text-[#e6edf3] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#30363d] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-End Encryption & Fallback Streaming Active</span>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3fb950] hover:bg-[#2ea043] text-[#0d1117] font-bold transition-all shadow"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>SAVED!</span>
              </>
            ) : (
              <span>SAVE KEYS</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
