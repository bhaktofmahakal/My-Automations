import { NextResponse } from 'next/server';
import { DJANGO_SCENARIO_STEPS, INITIAL_AGENTS } from '@/lib/agents/psmasEngine';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    manifold: {
      domain: 'S^1 (0 to 2pi)',
      epsilonAttentionWindow: 0.785, // pi/4
      agents: INITIAL_AGENTS,
    },
    steps: DJANGO_SCENARIO_STEPS,
  });
}
