import { NextResponse } from 'next/server';
import { SCENARIOS } from '@/lib/graph/sampleCodebases';
import { calculateGraphTokenMetrics, expandNodeProgressive } from '@/lib/graph/ogParser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { scenarioId = 'django-auth-refactor', targetNodeId } = body;

    const scenario = SCENARIOS.find(s => s.id === scenarioId) || SCENARIOS[0];
    let nodes = scenario.initialNodes;
    let edges = scenario.initialEdges;

    if (targetNodeId) {
      const expansion = expandNodeProgressive(targetNodeId, nodes, edges);
      nodes = expansion.updatedNodes;
      edges = expansion.updatedEdges;
    }

    const metrics = calculateGraphTokenMetrics(nodes);

    return NextResponse.json({
      status: 'success',
      scenario: scenario.title,
      nodes,
      edges,
      metrics,
    });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
