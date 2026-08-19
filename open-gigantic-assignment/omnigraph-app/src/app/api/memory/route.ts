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

  if (!redis && !vector) {
    return NextResponse.json(
      { error: 'No Upstash Redis or Vector configured. Set UPSTASH_REDIS_REST_URL/TOKEN and UPSTASH_VECTOR_REST_URL/TOKEN.' },
      { status: 503 }
    );
  }

  let redisPing = 'unconfigured';
  let vectorPing = 'unconfigured';

  if (redis) {
    try {
      await redis.ping();
      redisPing = 'Connected';
    } catch (e: any) {
      redisPing = `Error: ${e.message}`;
    }
  }

  if (vector) {
    try {
      await vector.info();
      vectorPing = 'Connected';
    } catch (e: any) {
      vectorPing = `Error: ${e.message}`;
    }
  }

  const redisOk = redis && redisPing === 'Connected';
  const vectorOk = vector && vectorPing === 'Connected';

  if (!redisOk && !vectorOk) {
    return NextResponse.json(
      { error: `Upstash unavailable: Redis=${redisPing}, Vector=${vectorPing}` },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: 'success',
    layer: 'Upstash Serverless Memory & Vector Layer v1.0',
    redis: redis ? { status: redisOk ? 'online' : 'error', ping: redisPing } : null,
    vector: vector ? { status: vectorOk ? 'online' : 'error', ping: vectorPing } : null,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, scope, nodeId, holderId, sessionId, beads, query, nodes, ttlSec = 30, event, credentials } = body;

    switch (action) {
      case 'acquire_lock': {
        const res = await acquireNodeLock(scope, nodeId, holderId, ttlSec, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'release_lock': {
        const res = await releaseNodeLock(scope, nodeId, holderId, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'get_locks':
      case 'get_locks_with_ttl': {
        const res = await getAllNodeLocksWithTTL(scope, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'persist_beads': {
        const res = await persistBeadsTaskGraph(scope, sessionId || 'default', beads || [], credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'fetch_beads': {
        const res = await fetchBeadsTaskGraph(scope, sessionId || 'default', credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'vector_search': {
        const res = await searchSemanticAstNodes(scope, query || '', nodes || [], 3, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'post_team_event': {
        const res = await pushTeamBroadcastEvent(scope, event, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      case 'get_team_events': {
        const res = await fetchTeamBroadcastEvents(scope, credentials);
        return NextResponse.json({ status: 'success', ...res });
      }
      default:
        return NextResponse.json({ error: `Unknown memory action: ${action}` }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Memory action failed' }, { status: 500 });
  }
}
