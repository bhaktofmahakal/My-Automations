import { NextRequest, NextResponse } from 'next/server';
import { getTemplateById, VoiceTemplate } from '@/lib/vapi/templates';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

/**
 * POST /api/v1/voice/deploy
 *
 * Deploy a voice template to Vapi
 *
 * Body:
 * - template_id: string (required)
 * - vapi_api_key: string (required)
 * - variables: Record<string, string> (required) - values for template variables
 * - phone_number_id: string (optional) - Vapi phone number to attach
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { template_id, vapi_api_key, variables, phone_number_id } = body;

    // Validate required fields
    if (!template_id || !vapi_api_key || !variables) {
      return NextResponse.json(
        { error: 'Missing required fields: template_id, vapi_api_key, variables' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get template
    const template = getTemplateById(template_id);
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Validate all variables are provided
    const missingVars = template.variables.filter((v) => !variables[v]);
    if (missingVars.length > 0) {
      return NextResponse.json(
        { error: `Missing variables: ${missingVars.join(', ')}` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Replace variables in prompts
    const interpolate = (text: string): string => {
      let result = text;
      for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value as string);
      }
      return result;
    };

    const systemPrompt = interpolate(template.system_prompt);
    const firstMessage = interpolate(template.first_message);

    // Build Vapi assistant configuration
    const vapiConfig = {
      name: `GTM Skills - ${template.name}`,
      model: {
        provider: 'openai',
        model: template.model,
        systemPrompt,
        temperature: 0.7,
      },
      voice: {
        provider: 'openai',
        voiceId: template.voice,
      },
      firstMessage,
      recordingEnabled: true,
      endCallFunctionEnabled: true,
      endCallMessage: "Thanks for your time. Have a great day!",
      metadata: {
        gtm_skills_template: template.id,
        deployed_at: new Date().toISOString(),
      },
    };

    // Deploy to Vapi
    const vapiResponse = await fetch('https://api.vapi.ai/assistant', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vapi_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vapiConfig),
    });

    if (!vapiResponse.ok) {
      const errorData = await vapiResponse.text();
      console.error('Vapi API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to deploy to Vapi', details: errorData },
        { status: 500, headers: corsHeaders }
      );
    }

    const vapiAssistant = await vapiResponse.json();

    // If phone number provided, attach assistant to it
    if (phone_number_id) {
      await fetch(`https://api.vapi.ai/phone-number/${phone_number_id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${vapi_api_key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: vapiAssistant.id,
        }),
      });
    }

    return NextResponse.json(
      {
        success: true,
        assistant: {
          id: vapiAssistant.id,
          name: vapiAssistant.name,
        },
        template: {
          id: template.id,
          name: template.name,
        },
        message: 'Voice template deployed successfully!',
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Voice Deploy API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
