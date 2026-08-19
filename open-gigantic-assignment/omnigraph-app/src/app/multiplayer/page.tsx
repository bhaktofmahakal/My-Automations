'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Wifi,
  Lock,
  Unlock,
  Radio,
  Send,
  Edit2,
  Database,
  Clock,
  Activity,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { useOmniStore } from '@/lib/store/useOmniStore';

interface LiveLockData {
  nodeId: string;
  holderId: string;
  ttlSec: number;
}

export default function MultiplayerPage() {
  const collaborators = useOmniStore((state) => state.collaborators);
  const updateUserProfile = useOmniStore((state) => state.updateUserProfile);
  const addLog = useOmniStore((state) => state.addLog);
  const nodes = useOmniStore((state) => state.nodes);
  const activeScenario = useOmniStore(state => state.activeScenario);
  const openIngestModal = useOmniStore(state => state.openIngestModal);

  const isRealRepoIngested = nodes.length > 0 || activeScenario?.id !== 'empty';

  if (!isRealRepoIngested) {
    return (
      <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0 items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <Users className="w-16 h-16 text-[#f85149]/50 mx-auto" />
          <h2 className="text-xl font-bold text-[#e6edf3]">No Repository Ingested</h2>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            Multiplayer collaboration syncs real-time on shared AST nodes.
            Connect a GitHub repository to enable distributed locks and team events.
          </p>
          <button
            onClick={openIngestModal}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#0d1117] font-bold rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ingest GitHub Repository</span>
          </button>
          <p className="text-[10px] text-[#6e7681]">
            Supports any public GitHub repo — enter URL, scan tree, select files, ingest.
          </p>
        </div>
      </div>
    );
  }

  const [activeLocks, setActiveLocks] = useState<LiveLockData[]>([]);
  const [redisStatus, setRedisStatus] = useState<'online' | 'fallback' | 'checking'>('checking');
  const [teamEvents, setTeamEvents] = useState<any[]>([]);
  const [pingMessage, setPingMessage] = useState('');
  const [pingSent, setPingSent] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // User profile state
  const currentUser = collaborators.find((c) => c.id === 'you') || collaborators[0];
  const [profileName, setProfileName] = useState(currentUser?.name || 'You (Lead Engineer)');
  const [profileRole, setProfileRole] = useState(currentUser?.role || 'Lead AI Engineer');

  const lockPollRef = useRef<NodeJS.Timeout | null>(null);

  // Poll Upstash Redis for active distributed locks and team events
  const syncWithRedis = async () => {
    try {
      const [locksRes, eventsRes] = await Promise.all([
        fetch('/api/memory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_locks_with_ttl' }),
        }),
        fetch('/api/memory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_team_events' }),
        }),
      ]);

      if (locksRes.ok) {
        const data = await locksRes.json();
        setActiveLocks(data.locks || []);
        setRedisStatus(data.provider === 'upstash_redis' ? 'online' : 'fallback');
      }

      if (eventsRes.ok) {
        const data = await eventsRes.json();
        setTeamEvents(data.events || []);
      }
    } catch {
      setRedisStatus('fallback');
    }
  };

  useEffect(() => {
    syncWithRedis();
    lockPollRef.current = setInterval(syncWithRedis, 2500);
    return () => {
      if (lockPollRef.current) clearInterval(lockPollRef.current);
    };
  }, []);

  const toggleNodeLock = async (nodeId: string, collaboratorId: string) => {
    const existingLock = activeLocks.find((l) => l.nodeId === nodeId);
    const isCurrentlyLocked = existingLock?.holderId === collaboratorId;

    if (isCurrentlyLocked) {
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'release_lock', nodeId, holderId: collaboratorId }),
      });

      // Post release event
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post_team_event',
          event: {
            id: `evt-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            user: currentUser?.name || 'Engineer',
            role: currentUser?.role || 'Lead',
            action: 'lock_released',
            nodeId,
            message: `Released lock on AST Node ${nodeId}`,
          },
        }),
      });

      syncWithRedis();
    } else {
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'acquire_lock', nodeId, holderId: collaboratorId, ttlSec: 45 }),
      });

      // Post acquire event
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'post_team_event',
          event: {
            id: `evt-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            user: currentUser?.name || 'Engineer',
            role: currentUser?.role || 'Lead',
            action: 'lock_acquired',
            nodeId,
            message: `Acquired distributed 45s atomic lock on AST Node ${nodeId}`,
          },
        }),
      });

      syncWithRedis();
    }
  };

  const sendSwarmPing = async () => {
    if (!pingMessage.trim()) return;

    const event = {
      id: `ping-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      user: currentUser?.name || 'Lead Engineer',
      role: currentUser?.role || 'Architecture',
      action: 'ping_sent',
      message: pingMessage.trim(),
    };

    await fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'post_team_event', event }),
    });

    addLog({
      id: `ping-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'architect',
      agentName: 'Multiplayer Hub',
      phaseAngle: 0,
      level: 'info',
      message: `🔔 Swarm Broadcast from ${currentUser?.name || 'User'}: ${pingMessage}`,
    });

    setPingSent(true);
    setPingMessage('');
    syncWithRedis();
    setTimeout(() => setPingSent(false), 2000);
  };

  const handleSaveProfile = () => {
    if (!profileName.trim()) return;
    updateUserProfile(profileName.trim(), profileRole.trim());
    setIsProfileModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0d1117] text-[#e6edf3] p-2.5 sm:p-4 font-sans select-none space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar min-w-0">
      {/* Subheader */}
      <div className="min-h-9 py-1.5 sm:py-0 flex flex-wrap items-center justify-between px-2.5 sm:px-3 bg-[#161b22] border border-[#30363d] rounded-xl font-mono text-xs shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Users className="w-4 h-4 text-[#58a6ff] shrink-0" />
          <h1 className="font-bold text-[#e6edf3] truncate text-xs sm:text-xs">
            Live Multiplayer Mesh & Distributed Node Lock Hub
          </h1>
          <span className="text-[10px] text-[#8b949e] hidden sm:inline shrink-0">Screen 7</span>
        </div>

        {/* Redis Cloud Status Badge */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
            redisStatus === 'online'
              ? 'bg-[#238636]/20 border-[#238636] text-[#3fb950]'
              : 'bg-[#388bfd]/20 border-[#388bfd] text-[#58a6ff]'
          }`}>
            <Database className="w-3.5 h-3.5" />
            <span>{redisStatus === 'online' ? 'Distributed Lock Sync Active' : 'Local Memory Synced'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 shrink-0">
        {/* Left Column: Collaborator Mesh Cards */}
        <div className="col-span-1 lg:col-span-4 space-y-3">
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#e6edf3] flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-[#3fb950]" />
                <span>Active Collaborators ({collaborators.length})</span>
              </span>
            </div>

            <div className="space-y-2">
              {collaborators.map((c) => {
                const isYou = c.id === currentUser?.id;
                const heldLocks = activeLocks.filter((l) => l.holderId === c.id);

                return (
                  <div
                    key={c.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isYou ? 'bg-[#1c2438] border-[#58a6ff]' : 'bg-[#0d1117] border-[#30363d]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 text-white shadow"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#e6edf3] truncate">{c.name}</span>
                          {isYou && (
                            <span className="text-[9px] bg-[#58a6ff]/20 text-[#58a6ff] px-1 py-0.2 rounded font-mono font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#8b949e] block truncate font-mono">{c.role}</span>
                        {heldLocks.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-[9px] text-[#d2a8ff] font-mono font-bold">
                            <Lock className="w-2.5 h-2.5" />
                            <span>Holds {heldLocks.length} AST locks</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isYou && (
                        <button
                          onClick={() => setIsProfileModalOpen(true)}
                          className="p-1 text-[#8b949e] hover:text-[#e6edf3] rounded hover:bg-[#30363d]"
                          title="Edit Your Profile"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Swarm Broadcast Input */}
          <div className="p-3.5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2.5 shadow-xl font-mono">
            <span className="text-xs font-bold text-[#e6edf3] flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#d29922]" />
              <span>Broadcast to Team Mesh</span>
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send swarm alert or lock request..."
                value={pingMessage}
                onChange={(e) => setPingMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendSwarmPing()}
                className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs text-[#e6edf3] focus:outline-none focus:border-[#58a6ff]"
              />
              <button
                onClick={sendSwarmPing}
                disabled={!pingMessage.trim()}
                className="px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-bold transition-all disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {pingSent && (
              <span className="text-[10px] text-[#3fb950] block font-bold">✓ Broadcasted to Team Feed!</span>
            )}
          </div>
        </div>

        {/* Right Column: Distributed AST Node Locks & Live Redis Stream */}
        <div className="col-span-1 lg:col-span-8 space-y-3 sm:space-y-4">
          {/* AST Distributed Lock Matrix */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 shadow-xl font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#d2a8ff]" />
                <h2 className="text-xs font-bold text-[#e6edf3]">
                  Distributed AST Node Lock Matrix ({nodes.length} nodes registered)
                </h2>
              </div>
              <span className="text-[10px] text-[#8b949e]">
                Atomic TTL: 45s per lock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
              {nodes.map((node) => {
                const lockInfo = activeLocks.find((l) => l.nodeId === node.id);
                const isLocked = !!lockInfo;
                const holder = collaborators.find((c) => c.id === lockInfo?.holderId);
                const isHeldByYou = lockInfo?.holderId === currentUser?.id;

                return (
                  <div
                    key={node.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                      isLocked
                        ? isHeldByYou
                          ? 'bg-[#1c2438] border-[#58a6ff]'
                          : 'bg-[#2d191e] border-[#f85149]'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff]/40'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#e6edf3] truncate">{node.label}</span>
                        <span className="text-[9px] text-[#8b949e] uppercase">({node.type})</span>
                      </div>
                      <span className="text-[10px] text-[#6e7681] block truncate">{node.path}</span>
                      {isLocked && (
                        <div className="flex items-center gap-1 mt-1 text-[9px] font-bold">
                          <Clock className="w-2.5 h-2.5 text-[#d2a8ff]" />
                          <span className={isHeldByYou ? 'text-[#58a6ff]' : 'text-[#f85149]'}>
                            Locked by {holder?.name || lockInfo.holderId} ({lockInfo.ttlSec}s left)
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleNodeLock(node.id, currentUser.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shrink-0 ${
                        isLocked
                          ? isHeldByYou
                            ? 'bg-[#f85149]/20 text-[#f85149] border border-[#f85149] hover:bg-[#f85149]/30'
                            : 'bg-[#30363d] text-[#8b949e] cursor-not-allowed opacity-60'
                          : 'bg-[#238636] hover:bg-[#2ea043] text-white shadow'
                      }`}
                      disabled={isLocked && !isHeldByYou}
                    >
                      {isLocked ? (
                        <>
                          <Unlock className="w-3 h-3" />
                          <span>Release</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>Lock AST</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Multiplayer Event Feed (Upstash Redis Synced) */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2.5 shadow-xl font-mono">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#3fb950]" />
                <h2 className="text-xs font-bold text-[#e6edf3]">
                  Live Team Event Stream
                </h2>
              </div>
              <span className="text-[10px] text-[#3fb950] bg-[#238636]/20 px-2 py-0.5 rounded font-bold">
                Synced in Real Time
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1 text-xs">
              {teamEvents.length > 0 ? (
                teamEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#0d1117] border border-[#21262d] flex items-center justify-between text-[11px]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[#8b949e] text-[10px] shrink-0">{evt.timestamp}</span>
                      <span className="font-bold text-[#58a6ff] shrink-0">{evt.user}:</span>
                      <span className="text-[#e6edf3] truncate">{evt.message}</span>
                    </div>
                    <span className="text-[9px] text-[#d2a8ff] bg-[#d2a8ff]/10 px-1.5 py-0.5 rounded shrink-0 uppercase font-bold">
                      {evt.action}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-[#8b949e] text-[11px]">
                  No broadcast events recorded yet. Send a swarm ping or acquire an AST lock!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#161b22] border border-[#30363d] rounded-2xl p-4 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#30363d]">
              <span className="font-bold text-[#e6edf3]">Edit Your Profile</span>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-[#8b949e] hover:text-[#e6edf3]">
                ✕
              </button>
            </div>
            <div>
              <label className="text-[11px] text-[#8b949e] block mb-1">Display Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-[#e6edf3] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8b949e] block mb-1">Role</label>
              <input
                type="text"
                value={profileRole}
                onChange={(e) => setProfileRole(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-[#e6edf3] focus:outline-none"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={!profileName.trim()}
              className="w-full py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-bold rounded-lg transition-all"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
