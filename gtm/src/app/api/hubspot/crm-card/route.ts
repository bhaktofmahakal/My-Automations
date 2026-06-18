import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * HubSpot CRM Card Endpoint
 *
 * Shows GTM Skills agent recommendations in HubSpot deal/contact sidebar.
 * Routes to Scout, Writer, Rep, or Closer based on context.
 */

interface HubSpotCardRequest {
  userId: number;
  userEmail: string;
  associatedObjectId: number;
  associatedObjectType: string;
  portalId: number;
  dealStage?: string;
  dealAmount?: number;
  dealName?: string;
  contactEmail?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactCompany?: string;
  contactJobTitle?: string;
}

// Agent definitions
const agents = {
  scout: {
    name: 'Scout',
    color: '#3b82f6', // blue
    description: 'Research & Intelligence',
    icon: '🔍',
  },
  writer: {
    name: 'Writer',
    color: '#eab308', // yellow
    description: 'Sales Copy & Content',
    icon: '✍️',
  },
  rep: {
    name: 'Rep',
    color: '#22c55e', // green
    description: 'Outreach & Engagement',
    icon: '📧',
  },
  closer: {
    name: 'Closer',
    color: '#a855f7', // purple
    description: 'Deals & Revenue',
    icon: '🎯',
  },
};

// Map deal stages to recommended agents and actions
function getAgentRecommendations(
  objectType: string,
  dealStage?: string,
  jobTitle?: string
): { agent: keyof typeof agents; action: string; description: string; url: string }[] {
  const isContact = objectType === 'CONTACT';
  const stageLower = (dealStage || '').toLowerCase();

  // Role detection for contacts
  const isExecutive = jobTitle?.toLowerCase().match(/ceo|cto|cfo|coo|vp|director|head|chief/);
  const isTechnical = jobTitle?.toLowerCase().match(/engineer|developer|architect|tech/);

  if (isContact) {
    // Contact-focused recommendations
    const recommendations = [
      {
        agent: 'scout' as const,
        action: 'Research Contact',
        description: 'Deep dive on this contact and their company',
        url: '/agents?agent=scout&action=research',
      },
      {
        agent: 'writer' as const,
        action: 'Write Cold Email',
        description: 'Personalized outreach email',
        url: '/agents?agent=writer&action=cold-email',
      },
      {
        agent: 'rep' as const,
        action: 'Create Sequence',
        description: 'Multi-touch outreach sequence',
        url: '/agents?agent=rep&action=sequence',
      },
    ];

    if (isExecutive) {
      recommendations.unshift({
        agent: 'writer' as const,
        action: 'Executive Email',
        description: 'C-suite appropriate messaging',
        url: '/free-tools/tonalities/executive-briefing',
      });
    }

    return recommendations.slice(0, 4);
  }

  // Deal stage-based recommendations
  if (stageLower.includes('appointment') || stageLower.includes('scheduled') || stageLower.includes('qualified')) {
    // Early stage - Discovery
    return [
      {
        agent: 'scout',
        action: 'Account Research',
        description: 'Company intel and buying signals',
        url: '/agents?agent=scout',
      },
      {
        agent: 'writer',
        action: 'Discovery Questions',
        description: 'SPIN-based discovery framework',
        url: '/methodology/spin-selling',
      },
      {
        agent: 'rep',
        action: 'Meeting Prep Email',
        description: 'Confirm and set agenda',
        url: '/agents?agent=rep&action=meeting-prep',
      },
    ];
  }

  if (stageLower.includes('presentation') || stageLower.includes('demo') || stageLower.includes('decision')) {
    // Mid stage - Evaluation
    return [
      {
        agent: 'writer',
        action: 'Demo Follow-up',
        description: 'Post-demo email with next steps',
        url: '/agents?agent=writer&action=followup',
      },
      {
        agent: 'closer',
        action: 'MEDDPICC Check',
        description: 'Qualification assessment',
        url: '/methodology/meddic',
      },
      {
        agent: 'writer',
        action: 'ROI Business Case',
        description: 'Build value justification',
        url: '/agents?agent=writer&action=business-case',
      },
    ];
  }

  if (stageLower.includes('proposal') || stageLower.includes('contract') || stageLower.includes('negotiation')) {
    // Late stage - Closing
    return [
      {
        agent: 'closer',
        action: 'Write Proposal',
        description: 'Generate deal proposal',
        url: '/agents?agent=closer&action=proposal',
      },
      {
        agent: 'closer',
        action: 'Handle Objections',
        description: 'Price and competitor responses',
        url: '/free-tools/tonalities/chris-voss',
      },
      {
        agent: 'writer',
        action: 'Urgency Email',
        description: 'Create timeline pressure',
        url: '/agents?agent=writer&action=urgency',
      },
    ];
  }

  if (stageLower.includes('closed') || stageLower.includes('won')) {
    // Post-close
    return [
      {
        agent: 'rep',
        action: 'Onboarding Kickoff',
        description: 'Welcome and next steps email',
        url: '/agents?agent=rep&action=onboarding',
      },
      {
        agent: 'scout',
        action: 'Expansion Research',
        description: 'Find upsell opportunities',
        url: '/agents?agent=scout&action=expansion',
      },
    ];
  }

  // Default recommendations
  return [
    {
      agent: 'scout',
      action: 'Research Account',
      description: 'Get intel on this deal',
      url: '/agents?agent=scout',
    },
    {
      agent: 'writer',
      action: 'Write Follow-up',
      description: 'Re-engage the prospect',
      url: '/agents?agent=writer&action=followup',
    },
    {
      agent: 'closer',
      action: 'Deal Strategy',
      description: 'Plan your close approach',
      url: '/agents?agent=closer',
    },
  ];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const context: HubSpotCardRequest = {
      userId: parseInt(searchParams.get('userId') || '0'),
      userEmail: searchParams.get('userEmail') || '',
      associatedObjectId: parseInt(searchParams.get('associatedObjectId') || '0'),
      associatedObjectType: searchParams.get('associatedObjectType') || 'DEAL',
      portalId: parseInt(searchParams.get('portalId') || '0'),
      dealStage: searchParams.get('dealStage') || undefined,
      dealAmount: searchParams.get('dealAmount') ? parseFloat(searchParams.get('dealAmount')!) : undefined,
      dealName: searchParams.get('dealName') || undefined,
      contactEmail: searchParams.get('email') || undefined,
      contactFirstName: searchParams.get('firstname') || undefined,
      contactLastName: searchParams.get('lastname') || undefined,
      contactCompany: searchParams.get('company') || undefined,
      contactJobTitle: searchParams.get('jobtitle') || undefined,
    };

    // Get agent recommendations
    const recommendations = getAgentRecommendations(
      context.associatedObjectType,
      context.dealStage,
      context.contactJobTitle
    );

    // Build card rows with agent branding
    const agentRows = recommendations.map((rec) => {
      const agent = agents[rec.agent];
      return {
        type: 'LINK' as const,
        text: `${agent.icon} ${rec.action}`,
        linkUrl: `https://github.com/bhaktofmahakal/My-Automations${rec.url}&utm_source=hubspot&utm_medium=crm-card&portal=${context.portalId}`,
      };
    });

    // Build the CRM card response
    const cardResponse = {
      results: [
        {
          objectId: context.associatedObjectId,
          title: 'GTM Skills',
          link: 'https://github.com/bhaktofmahakal/My-Automations/agents?utm_source=hubspot',
          sections: [
            {
              id: 'agents',
              title: context.associatedObjectType === 'CONTACT'
                ? '📧 Outreach Actions'
                : `🎯 ${context.dealStage || 'Deal'} Actions`,
              rows: agentRows,
            },
            {
              id: 'team',
              title: '👥 Your Sales Team',
              rows: [
                {
                  type: 'LINK',
                  text: '🔍 Scout - Research',
                  linkUrl: 'https://github.com/bhaktofmahakal/My-Automations/api/v1/agents/scout/skill?utm_source=hubspot',
                },
                {
                  type: 'LINK',
                  text: '✍️ Writer - Copy',
                  linkUrl: 'https://github.com/bhaktofmahakal/My-Automations/api/v1/agents/writer/skill?utm_source=hubspot',
                },
                {
                  type: 'LINK',
                  text: '📧 Rep - Outreach',
                  linkUrl: 'https://github.com/bhaktofmahakal/My-Automations/api/v1/agents/rep/skill?utm_source=hubspot',
                },
                {
                  type: 'LINK',
                  text: '🎯 Closer - Deals',
                  linkUrl: 'https://github.com/bhaktofmahakal/My-Automations/api/v1/agents/closer/skill?utm_source=hubspot',
                },
              ],
            },
          ],
        },
      ],
      primaryAction: {
        type: 'IFRAME',
        width: 890,
        height: 748,
        uri: `https://github.com/bhaktofmahakal/My-Automations/embed/hubspot?objectType=${context.associatedObjectType}&objectId=${context.associatedObjectId}&stage=${context.dealStage || ''}&portalId=${context.portalId}`,
        label: 'Open GTM Skills',
      },
    };

    return NextResponse.json(cardResponse, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    console.error('HubSpot CRM Card Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate card' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
