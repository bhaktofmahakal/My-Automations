'use client';

import React from 'react';
import { Users, Wifi, Shield, Lock, MousePointer } from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

export default function MultiplayerPage() {
  const collaborators = useOmniStore(state => state.collaborators);

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-4 font-sans select-none space-y-4 overflow-y-auto">
      {/* Subheader */}
      <div className="h-9 flex items-center justify-between px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#a371f7]" />
          <h1 className="font-bold text-[#e6edf3]">Dedicated Real-Time Multiplayer Collaborator Hub</h1>
          <span className="text-[10px] text-[#8b949e]">Screen 8</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16291e] border border-[#238636] text-[#3fb950] text-[11px] font-mono">
          <Wifi className="w-3 h-3 text-[#3fb950] animate-pulse" />
          <span>WebSocket Mesh Sync: &lt;15ms</span>
        </div>
      </div>

      {/* Collaborators Active List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collaborators.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow"
                  style={{ backgroundColor: c.color }}
                >
                  {c.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#e6edf3]">{c.name}</h3>
                  <span className="text-xs text-[#8b949e] font-mono">{c.role}</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#0d1117] border border-[#30363d] text-[#3fb950]">
                {c.status}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#8b949e] space-y-1">
              <div className="flex justify-between">
                <span>Active AST Focus:</span>
                <span className="text-[#58a6ff] font-semibold">{c.activeNodeId || 'Canvas Workspace'}</span>
              </div>
              <div className="flex justify-between">
                <span>Cursor Coordinate:</span>
                <span className="text-[#e6edf3]">({c.cursor.x}, {c.cursor.y})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
