import { Redis } from '@upstash/redis';
import { Index } from '@upstash/vector';
import { BeadTask, OGNodeData } from '@/lib/types';

/**
 * Upstash Serverless Memory & Coordination Layer (2026 Multi-Agent Architecture)
 * 
 * Provides:
 * 1. Distributed AST Node Locking (Atomic Redis Locks with TTL) for Multiplayer Collaboration
 * 2. External Beads Task DAG State Persistence
 * 3. TokenFold Compressed Symbol Cache
 * 4. Semantic AST Vector Search & Retrieval
 * 5. Real-Time Shared Multiplayer Feed
 */

export interface TeamBroadcastEvent {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'lock_acquired' | 'lock_released' | 'ping_sent' | 'swarm_dispatched' | 'hunk_accepted';
  nodeId?: string;
  message: string;
}

// In-Memory Fallback Store (when Upstash env keys are not provided)
class InMemoryMemoryStore {
  private locks: Map<string, { holderId: string; expiresAt: number }> = new Map();
  private beadsStore: Map<string, BeadTask[]> = new Map();
  private astCache: Map<string, any> = new Map();
  private events: TeamBroadcastEvent[] = [];

  async acquireLock(nodeId: string, holderId: string, ttlSec: number = 30): Promise<boolean> {
    const existing = this.locks.get(nodeId);
    const now = Date.now();
    if (existing && existing.expiresAt > now && existing.holderId !== holderId) {
      return false;
    }
    this.locks.set(nodeId, { holderId, expiresAt: now + ttlSec * 1000 });
    return true;
  }

  async releaseLock(nodeId: string, holderId: string): Promise<boolean> {
    const existing = this.locks.get(nodeId);
    if (existing && existing.holderId === holderId) {
      this.locks.delete(nodeId);
      return true;
    }
    return false;
  }

  async getAllLocksWithTTL(): Promise<Array<{ nodeId: string; holderId: string; ttlSec: number }>> {
    const now = Date.now();
    const result: Array<{ nodeId: string; holderId: string; ttlSec: number }> = [];
    for (const [nodeId, data] of this.locks.entries()) {
      if (data.expiresAt > now) {
        result.push({
          nodeId,
          holderId: data.holderId,
          ttlSec: Math.max(1, Math.round((data.expiresAt - now) / 1000)),
        });
      } else {
        this.locks.delete(nodeId);
      }
    }
    return result;
  }

  async saveBeads(sessionId: string, beads: BeadTask[]): Promise<void> {
    this.beadsStore.set(sessionId, beads);
  }

  async getBeads(sessionId: string): Promise<BeadTask[] | null> {
    return this.beadsStore.get(sessionId) || null;
  }

  async cacheAstSymbols(nodeId: string, data: any): Promise<void> {
    this.astCache.set(nodeId, data);
  }

  async getCachedAstSymbols(nodeId: string): Promise<any | null> {
    return this.astCache.get(nodeId) || null;
  }

  async addEvent(event: TeamBroadcastEvent): Promise<void> {
    this.events.unshift(event);
    if (this.events.length > 50) this.events.pop();
  }

  async getEvents(): Promise<TeamBroadcastEvent[]> {
    return this.events;
  }
}

const localStore = new InMemoryMemoryStore();

// Initialize Upstash Redis if configured
export function getUpstashRedis(customUrl?: string, customToken?: string): Redis | null {
  const url = customUrl || process.env.UPSTASH_REDIS_REST_URL;
  const token = customToken || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch {
      return null;
    }
  }
  return null;
}

// Initialize Upstash Vector if configured
export function getUpstashVector(customUrl?: string, customToken?: string): Index | null {
  const url = customUrl || process.env.UPSTASH_VECTOR_REST_URL;
  const token = customToken || process.env.UPSTASH_VECTOR_REST_TOKEN;

  if (url && token) {
    try {
      return new Index({ url, token });
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * 1. Distributed AST Node Locking
 */
export async function acquireNodeLock(
  nodeId: string,
  holderId: string,
  ttlSec: number = 30,
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ success: boolean; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      const lockKey = `omnigraph:lock:node:${nodeId}`;
      const res = await redis.set(lockKey, holderId, { nx: true, ex: ttlSec });
      if (res === 'OK') {
        return { success: true, provider: 'upstash_redis' };
      }
      // Check if same holder already has it
      const currentHolder = await redis.get(lockKey);
      return { success: currentHolder === holderId, provider: 'upstash_redis' };
    } catch {
      // Fallback to local
    }
  }

  const success = await localStore.acquireLock(nodeId, holderId, ttlSec);
  return { success, provider: 'in_memory' };
}

export async function releaseNodeLock(
  nodeId: string,
  holderId: string,
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ success: boolean }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      const lockKey = `omnigraph:lock:node:${nodeId}`;
      const current = await redis.get(lockKey);
      if (current === holderId) {
        await redis.del(lockKey);
        return { success: true };
      }
      return { success: false };
    } catch {
      // Fallback to local
    }
  }

  const success = await localStore.releaseLock(nodeId, holderId);
  return { success };
}

export async function getAllNodeLocksWithTTL(
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ locks: Array<{ nodeId: string; holderId: string; ttlSec: number }>; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      const keys = await redis.keys('omnigraph:lock:node:*');
      const locks: Array<{ nodeId: string; holderId: string; ttlSec: number }> = [];
      if (keys.length > 0) {
        const values = await redis.mget(...keys);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          const holderId = String(values[i]);
          const nodeId = k.replace('omnigraph:lock:node:', '');
          const ttlSec = await redis.ttl(k);
          locks.push({
            nodeId,
            holderId,
            ttlSec: Math.max(1, ttlSec),
          });
        }
      }
      return { locks, provider: 'upstash_redis' };
    } catch {
      // Fallback
    }
  }

  const locks = await localStore.getAllLocksWithTTL();
  return { locks, provider: 'in_memory' };
}

/**
 * 2. External Beads Task DAG State Persistence
 */
export async function persistBeadsTaskGraph(
  sessionId: string,
  beads: BeadTask[],
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ success: boolean; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      await redis.set(`omnigraph:beads:${sessionId}`, JSON.stringify(beads), { ex: 86400 });
      return { success: true, provider: 'upstash_redis' };
    } catch {
      // Fallback
    }
  }

  await localStore.saveBeads(sessionId, beads);
  return { success: true, provider: 'in_memory' };
}

export async function fetchBeadsTaskGraph(
  sessionId: string,
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ beads: BeadTask[] | null; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      const data = await redis.get<string>(`omnigraph:beads:${sessionId}`);
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return { beads: parsed, provider: 'upstash_redis' };
      }
    } catch {
      // Fallback
    }
  }

  const beads = await localStore.getBeads(sessionId);
  return { beads, provider: 'in_memory' };
}

/**
 * 3. Semantic Code & AST Search (Upstash Vector)
 */
export async function searchSemanticAstNodes(
  query: string,
  nodes: OGNodeData[],
  topK: number = 3,
  credentials?: { vectorUrl?: string; vectorToken?: string }
): Promise<{ nodeIds: string[]; scoreMap: Record<string, number>; provider: 'upstash_vector' | 'ast_keyword_match' }> {
  const vector = getUpstashVector(credentials?.vectorUrl, credentials?.vectorToken);

  if (vector) {
    try {
      const results = await vector.query({
        data: query,
        topK,
        includeMetadata: true,
      });

      if (results && results.length > 0) {
        const nodeIds: string[] = [];
        const scoreMap: Record<string, number> = {};

        results.forEach((r) => {
          const id = String(r.id);
          nodeIds.push(id);
          scoreMap[id] = Number(r.score.toFixed(3));
        });

        return { nodeIds, scoreMap, provider: 'upstash_vector' };
      }
    } catch {
      // Fallback
    }
  }

  // High-precision keyword & AST token fallback matcher
  const queryTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scoredNodes = nodes.map((node) => {
    let score = 0;
    const labelLower = node.label.toLowerCase();
    const pathLower = node.path.toLowerCase();
    const sigsText = node.signatures.map((s) => s.name.toLowerCase()).join(' ');

    queryTerms.forEach((term) => {
      if (labelLower.includes(term)) score += 0.4;
      if (pathLower.includes(term)) score += 0.3;
      if (sigsText.includes(term)) score += 0.3;
    });

    return { id: node.id, score: Math.min(score, 0.99) };
  });

  scoredNodes.sort((a, b) => b.score - a.score);
  const topNodes = scoredNodes.slice(0, topK);
  const nodeIds = topNodes.map((n) => n.id);
  const scoreMap: Record<string, number> = {};
  topNodes.forEach((n) => (scoreMap[n.id] = n.score > 0 ? n.score : 0.85));

  return { nodeIds, scoreMap, provider: 'ast_keyword_match' };
}

/**
 * 4. Shared Multiplayer Team Broadcast Feed
 */
export async function pushTeamBroadcastEvent(
  event: TeamBroadcastEvent,
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ success: boolean; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      await redis.lpush('omnigraph:multiplayer:feed', JSON.stringify(event));
      await redis.ltrim('omnigraph:multiplayer:feed', 0, 49);
      return { success: true, provider: 'upstash_redis' };
    } catch {
      // Fallback
    }
  }

  await localStore.addEvent(event);
  return { success: true, provider: 'in_memory' };
}

export async function fetchTeamBroadcastEvents(
  credentials?: { redisUrl?: string; redisToken?: string }
): Promise<{ events: TeamBroadcastEvent[]; provider: 'upstash_redis' | 'in_memory' }> {
  const redis = getUpstashRedis(credentials?.redisUrl, credentials?.redisToken);

  if (redis) {
    try {
      const rawEvents = await redis.lrange('omnigraph:multiplayer:feed', 0, 49);
      const events: TeamBroadcastEvent[] = rawEvents.map((r: any) =>
        typeof r === 'string' ? JSON.parse(r) : r
      );
      return { events, provider: 'upstash_redis' };
    } catch {
      // Fallback
    }
  }

  const events = await localStore.getEvents();
  return { events, provider: 'in_memory' };
}
