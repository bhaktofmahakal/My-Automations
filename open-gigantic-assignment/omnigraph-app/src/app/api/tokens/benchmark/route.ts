import { NextResponse } from 'next/server';
import { SCENARIOS } from '@/lib/graph/sampleCodebases';

export async function GET() {
  const benchmarks = SCENARIOS.map(s => s.sweBenchMetadata);
  return NextResponse.json({
    status: 'success',
    benchmarks,
    aggregate: {
      medianRawTokens: 242150,
      medianSuperbrainTokens: 85310,
      averageTokenReductionPct: 64.75,
      rawAverageCost: 0.098,
      superbrainAverageCost: 0.056,
      overallSolveRate: '70%',
    },
  });
}
