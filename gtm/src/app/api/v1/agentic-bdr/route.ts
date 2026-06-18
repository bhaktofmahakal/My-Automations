import { NextResponse } from 'next/server';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

// Agentic BDR workflows and configurations
const agenticBdrData = {
  workflows: [
    {
      id: 'prospecting',
      name: 'Autonomous Prospecting',
      description: 'AI agent researches accounts, identifies contacts, and generates personalized outreach',
      steps: [
        { step: 1, action: 'account_research', description: 'Research target company' },
        { step: 2, action: 'contact_discovery', description: 'Find decision makers' },
        { step: 3, action: 'enrichment', description: 'Enrich contact data' },
        { step: 4, action: 'personalization', description: 'Generate personalized angles' },
        { step: 5, action: 'outreach_draft', description: 'Draft multi-channel sequence' },
      ],
      tools_required: ['web_search', 'enrichment_api', 'email_generator'],
    },
    {
      id: 'lead_qualification',
      name: 'Lead Qualification Agent',
      description: 'AI agent scores and qualifies inbound leads based on ICP fit',
      steps: [
        { step: 1, action: 'data_collection', description: 'Gather lead information' },
        { step: 2, action: 'company_analysis', description: 'Analyze company fit' },
        { step: 3, action: 'persona_matching', description: 'Match against ICP' },
        { step: 4, action: 'scoring', description: 'Generate lead score' },
        { step: 5, action: 'routing', description: 'Route to appropriate rep' },
      ],
      tools_required: ['crm_api', 'enrichment_api', 'scoring_model'],
    },
    {
      id: 'follow_up',
      name: 'Follow-Up Automation',
      description: 'AI agent manages follow-up sequences based on engagement signals',
      steps: [
        { step: 1, action: 'signal_detection', description: 'Detect engagement signals' },
        { step: 2, action: 'context_gathering', description: 'Gather conversation history' },
        { step: 3, action: 'response_generation', description: 'Generate contextual follow-up' },
        { step: 4, action: 'timing_optimization', description: 'Optimize send time' },
        { step: 5, action: 'delivery', description: 'Send via appropriate channel' },
      ],
      tools_required: ['email_tracking', 'calendar_api', 'email_sender'],
    },
    {
      id: 'meeting_prep',
      name: 'Meeting Preparation Agent',
      description: 'AI agent prepares comprehensive briefings before prospect meetings',
      steps: [
        { step: 1, action: 'company_intel', description: 'Deep company research' },
        { step: 2, action: 'contact_intel', description: 'Stakeholder research' },
        { step: 3, action: 'history_review', description: 'Review past interactions' },
        { step: 4, action: 'question_generation', description: 'Generate discovery questions' },
        { step: 5, action: 'briefing_creation', description: 'Create meeting brief' },
      ],
      tools_required: ['web_search', 'crm_api', 'calendar_api'],
    },
  ],
  agents: [
    {
      id: 'research_agent',
      name: 'Research Agent',
      description: 'Gathers intelligence on companies and contacts',
      capabilities: ['web_search', 'linkedin_scraping', 'news_monitoring', 'tech_stack_detection'],
      output: 'Structured company/contact profiles with actionable insights',
    },
    {
      id: 'enrichment_agent',
      name: 'Enrichment Agent',
      description: 'Enriches contact data from multiple sources',
      capabilities: ['email_finding', 'phone_finding', 'social_profiles', 'job_history'],
      integrations: ['Apollo', 'Clearbit', 'Clay', 'Hunter'],
      output: 'Complete contact records with verified data',
    },
    {
      id: 'outreach_agent',
      name: 'Outreach Agent',
      description: 'Generates and sends personalized multi-channel outreach',
      capabilities: ['email_generation', 'linkedin_messages', 'call_scripts', 'sequence_building'],
      integrations: ['Gmail', 'Outlook', 'LinkedIn', 'Outreach', 'Salesloft'],
      output: 'Sent messages with tracking',
    },
    {
      id: 'qualification_agent',
      name: 'Qualification Agent',
      description: 'Scores and qualifies leads against ICP',
      capabilities: ['icp_matching', 'lead_scoring', 'intent_detection', 'fit_analysis'],
      integrations: ['HubSpot', 'Salesforce', '6sense', 'Bombora'],
      output: 'Lead scores with qualification rationale',
    },
  ],
  stack: {
    required: ['LLM (Claude/GPT)', 'Enrichment API', 'CRM'],
    recommended: ['Email sender', 'Calendar', 'Meeting scheduler'],
    optional: ['Intent data', 'Conversation intelligence', 'Sales engagement platform'],
  },
};

/**
 * GET /api/v1/agentic-bdr
 *
 * Get Agentic BDR workflows and agent configurations
 */
export async function GET() {
  const response = {
    data: agenticBdrData,
    documentation: 'https://github.com/bhaktofmahakal/My-Automations/agentic-bdr',
    meta: {
      api_version: 'v1',
      workflow_count: agenticBdrData.workflows.length,
      agent_count: agenticBdrData.agents.length,
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
