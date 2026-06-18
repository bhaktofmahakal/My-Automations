'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Check,
  ExternalLink,
  MessageSquare,
  Target,
  Zap,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Stage-Based Recommendations',
    description: 'Get relevant prompts based on deal stage - discovery questions for new deals, objection handlers for negotiations.',
  },
  {
    icon: MessageSquare,
    title: 'Contact Context',
    description: 'See outreach prompts tailored to job title and seniority. Executive briefings for C-suite, technical deep-dives for engineers.',
  },
  {
    icon: Zap,
    title: 'One-Click Copy',
    description: 'Copy prompts directly to your clipboard from the HubSpot sidebar. No tab switching required.',
  },
];

const dealStages = [
  { stage: 'Qualified', prompts: ['Discovery Questions', 'Pain Point Deep Dive', 'MEDDPICC Qualification'] },
  { stage: 'Demo Scheduled', prompts: ['Demo Script', 'ROI Calculator', 'Stakeholder Map'] },
  { stage: 'Proposal Sent', prompts: ['Objection Handlers', 'Negotiation Prep', 'Proposal Template'] },
  { stage: 'Closed Won', prompts: ['Onboarding Email', 'Upsell Opportunity', 'Reference Request'] },
];

export default function HubSpotIntegrationPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setStatus('success');
    } else if (params.get('error')) {
      setStatus('error');
      setErrorMessage(params.get('error') || 'Installation failed');
    }
  }, []);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Status Banner */}
        {status === 'success' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-green-400">HubSpot Connected!</h3>
              <p className="text-sm text-muted-foreground">
                GTM Skills is now available in your HubSpot CRM sidebar.
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
            <h3 className="font-semibold text-red-400">Installation Failed</h3>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>
        )}

        {/* Hero */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            HubSpot Integration
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            GTM Skills in Your CRM
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Access 500+ battle-tested GTM prompts directly in HubSpot. Get AI recommendations
            based on deal stage, contact role, and company context.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/api/hubspot/install">
              <Button size="lg" className="bg-[#ff7a59] hover:bg-[#ff5c35]">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984 2.21 2.21 0 00-4.42 0c0 .873.515 1.622 1.252 1.984V7.93a6.27 6.27 0 00-3.036 1.369l-8.073-6.283a2.21 2.21 0 10-.646.93l7.879 6.13a6.266 6.266 0 00-1.022 3.435c0 3.464 2.808 6.272 6.272 6.272s6.272-2.808 6.272-6.272a6.263 6.263 0 00-5.745-6.581zm-.44 10.404a3.823 3.823 0 110-7.646 3.823 3.823 0 010 7.646z" />
                </svg>
                Install on HubSpot
              </Button>
            </Link>
            <Link href="/prompts">
              <Button variant="outline" size="lg">
                Browse Prompts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-secondary/50 border border-border rounded-xl p-6"
            >
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Deal Stage Demo */}
        <div className="bg-secondary/30 border border-border rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Prompts Adapt to Your Deal Stage
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {dealStages.map((stage, i) => (
              <div key={i} className="bg-background rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="font-medium text-sm">{stage.stage}</span>
                </div>
                <ul className="space-y-2">
                  {stage.prompts.map((prompt, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-3 h-3 text-orange-400" />
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Install the App</h3>
              <p className="text-sm text-muted-foreground">
                Click the button above to connect GTM Skills to your HubSpot account.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Open Any Record</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to a deal, contact, or company in HubSpot.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Use the Prompts</h3>
              <p className="text-sm text-muted-foreground">
                See relevant prompts in the sidebar and copy them with one click.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Close More Deals?</h2>
          <p className="text-muted-foreground mb-6">
            Join hundreds of sales teams using GTM Skills in HubSpot.
          </p>
          <Link href="/api/hubspot/install">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Install Free
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
