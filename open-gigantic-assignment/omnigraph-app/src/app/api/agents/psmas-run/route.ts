import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * PSMAS Multi-Agent Swarm Gateway.
 *
 * Streams real LLM responses from the configured provider:
 * - OrcaRouter Universal Gateway (routes Claude, GPT, DeepSeek, Qwen)
 * - Groq LPU (direct OpenAI-compatible endpoint)
 *
 * No simulated/mock output: if no provider API key is configured the route
 * returns a 400 so the client can surface the real failure.
 */

export const AGENT_SPECIFICATIONS: Record<
  string,
  {
    role: string;
    modelDefault: string;
    theta: string;
    tools: string[];
    capabilities: string[];
  }
> = {
  architect: {
    role: 'Staff Systems Architect & DAG Planner',
    modelDefault: 'deepseek/deepseek-v4-flash',
    theta: '0 rad (0°)',
    tools: ['inspect_ast_dag', 'analyze_call_graph', 'plan_manifold_trajectory', 'estimate_tokenfold_compression'],
    capabilities: ['Topological dependency ordering', 'Progressive disclosure bounds', 'Multi-file change scoping'],
  },
  codewriter: {
    role: 'Lead Compiler & Code Synthesis Engineer',
    modelDefault: 'qwen/qwen3.7-flash',
    theta: 'π/2 rad (90°)',
    tools: ['fetch_node_source', 'synthesize_surgical_diff', 'validate_ast_syntax', 'emit_unified_hunk'],
    capabilities: ['Zero-drift patch generation', 'Surgical hunk splicing', 'AST signature preservation'],
  },
  testrunner: {
    role: 'SWE-bench Verification & Test Synthesis Lead',
    modelDefault: 'deepseek/deepseek-v4-flash',
    theta: 'π rad (180°)',
    tools: ['generate_unit_assertions', 'execute_synthetic_test_suite', 'calculate_regression_coverage', 'evaluate_swebench_spec'],
    capabilities: ['Invariant boundary validation', 'Edge case fuzzing', 'Assertion-driven handoff'],
  },
  security: {
    role: 'Principal Security Architect & Safe Barrier Auditor',
    modelDefault: 'openai/gpt-4.1-nano',
    theta: '3π/2 rad (270°)',
    tools: ['scan_cwe_vulnerabilities', 'verify_context_isolation', 'audit_rbac_boundaries', 'generate_sha256_seal'],
    capabilities: ['OWASP Top 10 SAST audit', 'Memory leak detection', 'Cryptographic patch signing'],
  },
};

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    engine: 'Phase-Staggered Multi-Agent Swarm (PSMAS)',
    gateways: {
      orcarouter: {
        baseUrl: 'https://api.orcarouter.ai/v1',
        configured: Boolean(process.env.ORCAROUTER_API_KEY),
      },
      groq: {
        baseUrl: 'https://api.groq.com/openai/v1',
        configured: Boolean(process.env.GROQ_API_KEY),
      },
    },
    defaultModels: {
      architect: 'deepseek/deepseek-v4-flash',
      codewriter: 'qwen/qwen3.7-flash',
      testrunner: 'deepseek/deepseek-v4-flash',
      security: 'openai/gpt-4.1-nano',
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      prompt,
      activeAgent = 'architect',
      nodeContext,
      activeFiles = [],
      previousAgentOutput,
      apiKey,
      model,
      baseUrl,
    } = body;

    const agentRole = activeAgent.toLowerCase();
    const spec = AGENT_SPECIFICATIONS[agentRole] || AGENT_SPECIFICATIONS.architect;
    const selectedModel = model || spec.modelDefault;

    // Guard: reject known-deprecated model IDs with a clear 400 instead of a confusing 502
    const DEPRECATED_MODELS: Record<string, string> = {
      'anthropic/claude-3.5-sonnet': 'Claude 3.5 Sonnet was retired. Pick a live model from Settings (e.g. anthropic/claude-sonnet-5).',
      'deepseek/deepseek-r1': 'DeepSeek R1 was retired. Use deepseek/deepseek-v4-flash or deepseek/deepseek-v4-pro.',
      'openai/gpt-4o': 'GPT-4o was retired. Use openai/gpt-4.1-nano, openai/gpt-5.4, or openai/gpt-5.6-luna.',
      'openai/gpt-5-mini': 'GPT-5 Mini does not exist on the gateway. Use openai/gpt-5.6-luna instead.',
      'qwen/qwen-2.5-coder-32b-instruct': 'Qwen 2.5 Coder was retired. Use qwen/qwen3.7-flash or qwen/qwen3.8-max.',
      'google/gemini-2.5-flash': 'Use google/gemini-2.5-flash-lite or google/gemini-3.6-flash.',
    };
    if (DEPRECATED_MODELS[selectedModel]) {
      return NextResponse.json({ error: DEPRECATED_MODELS[selectedModel] }, { status: 400 });
    }

    // Detect if this model should route to Groq LPU or OrcaRouter
    const isGroqModel = selectedModel.startsWith('groq/');
    const isGroqKey = apiKey && apiKey.startsWith('gsk_');
    const shouldUseGroq = isGroqModel || isGroqKey || (!process.env.ORCAROUTER_API_KEY && Boolean(process.env.GROQ_API_KEY));

    const effectiveApiKey =
      apiKey ||
      (shouldUseGroq ? process.env.GROQ_API_KEY : process.env.ORCAROUTER_API_KEY) ||
      process.env.GROQ_API_KEY;

    if (!effectiveApiKey) {
      return NextResponse.json(
        {
          error:
            'No AI provider API key configured. Add GROQ_API_KEY or ORCAROUTER_API_KEY to .env.local, or bring your own key (BYOK) from the Settings page.',
        },
        { status: 400 }
      );
    }

    let endpoint = baseUrl || 'https://api.orcarouter.ai/v1/chat/completions';
    let targetModel = selectedModel;

    if (shouldUseGroq || (effectiveApiKey && effectiveApiKey.startsWith('gsk_'))) {
      endpoint = 'https://api.groq.com/openai/v1/chat/completions';
      targetModel = selectedModel.replace(/^groq\//, '') || 'llama-3.3-70b-versatile';
    }

    // Construct Agentic System Prompt with AST Grounding
    const systemPrompt = `You are the ${spec.role} (Phase angle θ = ${spec.theta}) in the OmniGraph PSMAS Multi-Agent Swarm.
Available Agent Tools: [${spec.tools.join(', ')}]
Core Capabilities: ${spec.capabilities.join('; ')}

Current Codebase Target:
- Active Node: ${nodeContext?.label || 'Repository Root'} (ID: ${nodeContext?.id || 'root'})
- Target File: ${nodeContext?.path || activeFiles[0]?.path || 'not provided'}
- Language: ${nodeContext?.language || 'typescript'}
- TokenFootprint: ${
  nodeContext
    ? `${nodeContext.tokenCount} raw tokens -> ${nodeContext.compressedTokens} compressed tokens`
    : 'not measured — run the TokenFold benchmark first'
}

${
  previousAgentOutput
    ? `Previous Agent Phase Handoff (from S^1 manifold):
"""
${previousAgentOutput.slice(0, 800)}
"""`
    : ''
}

EXECUTION PROTOCOL (2026 Autonomous Agentic Standard):
1. State your high-level intent and call relevant AST tools using \`[ToolCall: tool_name(args)]\`.
2. Analyze code invariants and compute progressive disclosure bounds.
${
  agentRole === 'codewriter'
    ? `3. You MUST output precise, valid Unified Git Diff hunks using exact headers:
\`\`\`diff
--- a/${nodeContext?.path || 'src/main.ts'}
+++ b/${nodeContext?.path || 'src/main.ts'}
@@ -line,count +line,count @@
- old code
+ new code
\`\`\`
Provide a concise 1-sentence explanation for each hunk.`
    : agentRole === 'testrunner'
    ? `3. Synthesize at least 3 formal assertion invariants (e.g. \`assert_invariant(condition)\`, \`assert_regression_safe()\`) and report pass/fail.`
    : agentRole === 'security'
    ? `3. Audit for CWE-79, CWE-89, CWE-287, and Context Isolation. Report findings honestly — if you cannot verify something, state that it was not verified.`
    : `3. Outline the surgical execution trajectory for CodeWriter, TestRunner, and SecurityReviewer agents.`
}
4. Conclude with a compressed handoff summary for the next agent along the manifold.`;

    const userMessage =
      prompt ||
      `Execute autonomous ${activeAgent.toUpperCase()} phase for task on ${
        nodeContext?.label || 'active codebase'
      }.`;

    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${effectiveApiKey}`,
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          stream: true,
          temperature: 0.2,
        }),
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: `AI provider unreachable (${endpoint}): ${err.message || 'Network failure'}` },
        { status: 502 }
      );
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return NextResponse.json(
        {
          error: `AI provider returned ${res.status} for model ${targetModel}.${errText ? ` ${errText.slice(0, 300)}` : ''}`,
        },
        { status: 502 }
      );
    }

    return new Response(res.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Multi-agent invocation failed' },
      { status: 500 }
    );
  }
}