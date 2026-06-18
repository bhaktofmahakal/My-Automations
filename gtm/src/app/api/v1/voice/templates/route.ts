import { NextRequest, NextResponse } from 'next/server';
import { voiceTemplates, getTemplatesByCategory, getTemplatesByDifficulty, searchTemplates } from '@/lib/vapi/templates';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

/**
 * GET /api/v1/voice/templates
 *
 * List all voice templates with optional filtering
 *
 * Query params:
 * - category: cold_call | discovery | demo | follow_up | qualification
 * - difficulty: beginner | intermediate | advanced
 * - search: string
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');

    let templates = voiceTemplates;

    if (search) {
      templates = searchTemplates(search);
    } else if (category) {
      templates = getTemplatesByCategory(category as any);
    } else if (difficulty) {
      templates = getTemplatesByDifficulty(difficulty as any);
    }

    // Return summary without full prompts for listing
    const summaries = templates.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category,
      difficulty: t.difficulty,
      duration_minutes: t.duration_minutes,
      variables: t.variables,
      tags: t.tags,
    }));

    return NextResponse.json(
      {
        data: summaries,
        total: summaries.length,
      },
      {
        headers: {
          ...corsHeaders,
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Voice Templates API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
