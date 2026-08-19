import { NextResponse } from 'next/server';
import { calculateGraphTokenMetrics, expandNodeProgressive } from '@/lib/graph/ogParser';
import { OGNodeData, OGEdgeData } from '@/lib/types';

/**
 * Stateless progressive-disclosure expansion.
 * The client sends its current graph state; the server expands the requested
 * node and returns the updated graph plus real token metrics. No server-side
 * scenario store exists — everything derives from the client's ingested state.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nodes, edges, targetNodeId } = body;

    if (!Array.isArray(nodes)) {
      return NextResponse.json(
        { status: 'error', message: 'Request body must include the current graph state (nodes array).' },
        { status: 400 }
      );
    }

    let updatedNodes: OGNodeData[] = nodes as OGNodeData[];
    let updatedEdges: OGEdgeData[] = Array.isArray(edges) ? (edges as OGEdgeData[]) : [];

    if (targetNodeId) {
      const expansion = expandNodeProgressive(targetNodeId, updatedNodes, updatedEdges);
      updatedNodes = expansion.updatedNodes;
      updatedEdges = expansion.updatedEdges;
    }

    const metrics = calculateGraphTokenMetrics(updatedNodes);

    return NextResponse.json({
      status: 'success',
      nodes: updatedNodes,
      edges: updatedEdges,
      metrics: {
        totalNodes: updatedNodes.length,
        disclosedNodes: updatedNodes.filter(n => n.isLoaded).length,
        ...metrics,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}