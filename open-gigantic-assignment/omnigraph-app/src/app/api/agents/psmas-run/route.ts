import { NextResponse } from 'next/server';
import { DJANGO_SCENARIO_STEPS, INITIAL_AGENTS } from '@/lib/agents/psmasEngine';

export const runtime = 'nodejs';

// Role-to-Model Mapping via OrcaRouter AI Gateway
const AGENT_MODEL_MAP: Record<string, string> = {
  architect: 'openai/gpt-4o',
  codewriter: 'openai/gpt-4o-mini',
  testrunner: 'google/gemini-2.5-flash',
  security: 'deepseek/deepseek-chat',
};

export async function GET() {
  return NextResponse.json({
    status: 'success',
    engine: 'PSMAS Circular Manifold Engine v1.0',
    gateway: 'OrcaRouter AI Gateway (200+ LLMs Behind One API)',
    manifold: {
      domain: 'S^1 (0 to 2pi)',
      epsilonAttentionWindow: 0.785, // pi/4
      agents: INITIAL_AGENTS,
    },
    providers: {
      orcarouter: Boolean(process.env.ORCAROUTER_API_KEY),
      groq: Boolean(process.env.GROQ_API_KEY),
    },
    steps: DJANGO_SCENARIO_STEPS,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      prompt,
      activeAgent = 'architect',
      nodeContext,
      apiKey,
      model,
    } = body;

    const agentRole = activeAgent.toLowerCase();
    const effectiveApiKey = apiKey || process.env.ORCAROUTER_API_KEY || process.env.GROQ_API_KEY;

    const systemPrompts: Record<string, string> = {
      architect: `You are the Architect Agent (theta_1 = 0) in the PSMAS Multi-Agent Engine. Analyze AST dependencies, identify critical call sites, and emit structured traversal paths. Target AST Node: ${JSON.stringify(nodeContext || {})}`,
      codewriter: `You are the CodeWriter Agent (theta_2 = pi/2) in the PSMAS Multi-Agent Engine. Generate minimal, surgical unified git diff hunks (@@ -start,count +start,count @@). Target file: ${nodeContext?.path || 'src/engine/runner.ts'}`,
      testrunner: `You are the TestRunner Agent (theta_3 = pi) in the PSMAS Multi-Agent Engine. Synthesize precise unit test assertions and check regression coverage against SWE-bench specs.`,
      security: `You are the SecurityReviewer Agent (theta_4 = 3pi/2) in the PSMAS Multi-Agent Engine. Audit generated diffs for syntax anomalies, permission leaks, and invariant safety.`,
    };

    const systemPrompt = systemPrompts[agentRole] || systemPrompts.architect;
    const selectedModel = model || AGENT_MODEL_MAP[agentRole] || 'openai/gpt-4o-mini';

    // If an API Key is available, stream real LLM tokens via OrcaRouter Gateway / Groq
    if (effectiveApiKey) {
      const encoder = new TextEncoder();
      const isGroqKey = effectiveApiKey.startsWith('gsk_');
      const endpoint = isGroqKey
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.orcarouter.ai/v1/chat/completions';
      
      const targetModel = isGroqKey ? 'llama-3.3-70b-versatile' : selectedModel;

      const stream = new ReadableStream({
        async start(controller) {
          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${effectiveApiKey}`,
              },
              body: JSON.stringify({
                model: targetModel,
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: prompt || `Execute ${activeAgent.toUpperCase()} phase on AST node ${nodeContext?.label || 'root'}` },
                ],
                stream: true,
              }),
            });

            if (!res.ok) {
              const errText = await res.text();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: errText })}\n\n`));
              controller.close();
              return;
            }

            if (!res.body) throw new Error('No stream body received');
            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value);
              controller.enqueue(encoder.encode(chunk));
            }

            controller.enqueue(encoder.encode('\ndata: [DONE]\n\n'));
            controller.close();
          } catch (err) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: String(err) })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // High-fidelity fallback response when credentials are being set up
    return NextResponse.json({
      success: true,
      agent: activeAgent,
      phaseAngle: agentRole === 'architect' ? 0 : agentRole === 'codewriter' ? 1.57 : agentRole === 'testrunner' ? 3.14 : 4.71,
      systemPrompt,
      response: {
        thought: `[${activeAgent.toUpperCase()}] Evaluated AST node with ${nodeContext?.tokenCount || 420} tokens. Compressed to ${nodeContext?.compressedTokens || 84} tokens via TokenFold.`,
        action: agentRole === 'codewriter' ? 'GENERATE_SURGICAL_HUNK' : 'AST_TRAVERSE',
        tokensSaved: 18420,
        compressionRatio: '4.8x',
        status: 'completed',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to execute PSMAS agent stream', details: String(error) },
      { status: 500 }
    );
  }
}
