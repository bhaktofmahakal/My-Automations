'use client';

import React from 'react';
import { useOmniStore } from '@/lib/store/useOmniStore';
import { Users, Lock, Radio, Sparkles } from 'lucide-react';

export const MultiplayerBar: React.FC = () => {
  const collaborators = useOmniStore(state => state.collaborators);

  return (
    <div className="flex items-center gap-3 bg-[#0e1017] border border-[#222638] px-3 py-1.5 rounded-xl font-mono text-xs text-zinc-300 shadow-md">
      <div className="flex items-center gap-1.5 text-zinc-400">
        <Users className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-[11px] font-semibold">Collaborators:</span>
      </div>

      {/* Collaborator Avatars */}
      <div className="flex items-center -space-x-1.5">
        {collaborators.map((collab) => (
          <div
            key={collab.id}
            title={`${collab.name} (${collab.role}) - ${collab.status}`}
            className="relative group cursor-pointer"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-zinc-950 border-2 border-[#0e1017] shadow"
              style={{ backgroundColor: collab.color }}
            >
              {collab.avatar}
            </div>

            {/* Online Pulse */}
            <span
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border border-[#0e1017]"
              style={{ backgroundColor: collab.color }}
            />

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center bg-[#141722] text-zinc-200 border border-[#222638] px-2 py-1 rounded shadow-xl whitespace-nowrap z-50 text-[10px]">
              <span className="font-bold">{collab.name}</span>
              <span className="text-zinc-500">{collab.role}</span>
              <span className="text-emerald-400 capitalize">{collab.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-3 w-px bg-[#222638]" />

      {/* Real-time sync ticker */}
      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Sync: &lt;15ms</span>
      </div>
    </div>
  );
};
