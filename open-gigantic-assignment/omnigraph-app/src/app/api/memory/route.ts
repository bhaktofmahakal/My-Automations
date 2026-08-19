import { NextResponse } from 'next/server';
import {
  acquireNodeLock,
  releaseNodeLock,
  getAllNodeLocksWithTTL,
  persistBeadsTaskGraph,
  fetchBeadsTaskGraph,
  searchSemanticAstNodes,
  pushTeamBroadcastEvent,
  fetchTeamBroadcastEvents,
  getUpstashRedis,
  getUpstashVector,
} from '@/lib/memory/upstashMemory';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customRedisUrl = searchParams.get('redisUrl') || undefined;
  const customRedisToken = searchParams.get('redisToken') || undefined;
  const customVectorUrl = searchParams.get('vectorUrl') || undefined;
  const customVectorToken = searchParams.get('vectorToken') || undefined;

  const redis = getUpstashRedis(customRedisUrl, customRedisToken);
  const vector = getUpstashVector(customVectorUrl, customVectorToken);

  let redisPing = 'unconfigured';
  let vectorPing = 'unconfigured';

  if (redis) {
    try {
      await redis.ping();
      redisPing = 'Connected';
    } catch {
      redisPing = 'Error';
    }
  }

  if (vector) {
    try {
      await vector.info();
      vectorPing = 'Connected';
    } catch {
      vectorPing = 'Error';
    }
  }

  return NextResponse.json({
    status: 'success',
    layer: 'Upstash Serverless Memory & Vector Layer v1.0',
    redis: {
      status: redis ? (redisPing.includes('Connected') ? 'online' : 'error') : 'fallback_in_memory',
      ping: redisPing,
    },
    vector: {
      status: vector ? (vectorPing.includes('Connected') ? 'online' : 'error') : 'fallback_ast_index',
      ping: vectorPing,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, nodeId, holderId, sessionId, beads, query, nodes, ttlSec = 30, event, credentials } = body;

    switch (action) {
      case 'acquire_lock': {
        const res = await acquireNodeLock(nodeId, holderId, ttlSec, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'release_lock': {
        const res = await releaseNodeLock(nodeId, holderId, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'get_locks':
      case 'get_locks_with_ttl': {
        const res = await getAllNodeLocksWithTTL(credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'persist_beads': {
        const res = await persistBeadsTaskGraph(sessionId || 'default', beads || [], credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'fetch_beads': {
        const res = await fetchBeadsTaskGraph(sessionId || 'default', credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'vector_search': {
        const res = await searchSemanticAstNodes(query || '', nodes || [], 3, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'post_team_event': {
        const res = await pushTeamBroadcastEvent(event, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'get_team_events': {
        const res = await fetchTeamBroadcastEvents(credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      default:
        return NextResponse.json({ error: `Unknown memory action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Memory action failed' }, { status: 500 });
  }
}
