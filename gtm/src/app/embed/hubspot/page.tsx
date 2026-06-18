'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Search, ArrowRight, ExternalLink } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
}

// Sample prompts for demo - in production, fetch from API
const samplePrompts: Record<string, Prompt[]> = {
  discovery: [
    {
      id: '1',
      title: 'SPIN Discovery Questions',
      content: `I'm preparing for a discovery call with [PROSPECT_NAME] at [COMPANY].

Help me create SPIN-based discovery questions:

**Situation Questions** (understand current state):
1. How are you currently handling [PROBLEM_AREA]?
2. What tools/processes do you use for [FUNCTION]?
3. How many people on your team work on this?

**Problem Questions** (uncover pain):
1. What's the biggest challenge you face with [CURRENT_SOLUTION]?
2. How often does [PAIN_POINT] occur?
3. What happens when [NEGATIVE_OUTCOME]?

**Implication Questions** (expand the pain):
1. How does that impact your team's productivity?
2. What does that cost you in terms of [TIME/MONEY/RESOURCES]?
3. If this continues, what happens to [GOAL]?

**Need-Payoff Questions** (envision the solution):
1. If you could [IDEAL_OUTCOME], what would that mean for your team?
2. How would solving this help you achieve [BUSINESS_GOAL]?`,
      category: 'discovery',
      tags: ['SPIN', 'discovery', 'questions'],
    },
    {
      id: '2',
      title: 'Pain Point Deep Dive',
      content: `Help me dig deeper into [PROSPECT_NAME]'s pain points.

They mentioned: "[INITIAL_PAIN_STATEMENT]"

Follow-up questions to understand the full impact:

1. "When you say [PAIN], can you walk me through a specific example?"
2. "How long has this been a challenge?"
3. "What have you tried to solve it?"
4. "Who else on your team is affected by this?"
5. "If you had to put a number on it, what does this cost you per [MONTH/QUARTER]?"
6. "What happens if this doesn't get solved in the next [TIMEFRAME]?"

Probing questions:
- "Tell me more about that..."
- "What do you mean by...?"
- "Why is that important to you?"`,
      category: 'discovery',
      tags: ['pain', 'deep-dive', 'qualification'],
    },
  ],
  ae: [
    {
      id: '3',
      title: 'Demo Script Framework',
      content: `Demo preparation for [COMPANY]:

**Opening (2 min)**
- Reference their pain: "[PAIN_POINT they mentioned]"
- Set agenda: "I'll show you exactly how we solve [SPECIFIC_PROBLEM]"
- Confirm time: "We have [X] minutes - what's most important to cover?"

**Discovery Recap (3 min)**
- "Last time we spoke, you mentioned [KEY_CHALLENGES]"
- "Has anything changed since then?"
- "Who else should see this that isn't here today?"

**Demo Flow (15 min)**
Show, don't tell. For each feature:
1. State the problem: "You mentioned [PROBLEM]..."
2. Show the solution: "Here's how we handle that..."
3. Quantify impact: "Customers typically see [RESULT]..."

**Key Features to Demo:**
1. [FEATURE_1] - solves [PAIN_1]
2. [FEATURE_2] - solves [PAIN_2]
3. [FEATURE_3] - solves [PAIN_3]

**Close (5 min)**
- "Based on what you've seen, where do you see the biggest impact?"
- "What questions do you have?"
- "What would need to happen to move forward?"`,
      category: 'ae',
      tags: ['demo', 'presentation', 'closing'],
    },
  ],
  objections: [
    {
      id: '4',
      title: 'Common Objection Handlers',
      content: `**"The price is too high"**
- "I understand budget is a concern. Can you help me understand what you're comparing us to?"
- "What's the cost of NOT solving [PAIN_POINT]?"
- "If price weren't a factor, would this be the right solution?"

**"We need to think about it"**
- "Absolutely, this is an important decision. What specifically would you like to think through?"
- "Is there information I can provide to help with that?"
- "When would be a good time to reconnect?"

**"We're already using [COMPETITOR]"**
- "That's great that you have something in place. How's that working for you?"
- "What made you take this call if you're happy with them?"
- "If you could change one thing about your current solution, what would it be?"

**"Not a priority right now"**
- "I hear you. What IS the priority right now?"
- "When does [PROBLEM] typically become urgent?"
- "Would it make sense to circle back in [TIMEFRAME]?"

**"I need to talk to my team/boss"**
- "Of course. What do you think they'll want to know?"
- "Would it be helpful if I joined that conversation?"
- "What outcome would make this a yes for them?"`,
      category: 'objections',
      tags: ['objections', 'negotiation', 'closing'],
    },
  ],
  outreach: [
    {
      id: '5',
      title: 'Personalized Cold Email',
      content: `Subject: [PERSONALIZED_HOOK]

Hi [FIRST_NAME],

[PERSONALIZED_OPENER based on:
- Recent news about their company
- Something from their LinkedIn
- Mutual connection
- Industry trend]

I noticed [COMPANY] is [INITIATIVE/CHALLENGE]. [BRIEF_INSIGHT about their situation].

We help [SIMILAR_COMPANIES] with [SPECIFIC_PROBLEM], typically seeing [QUANTIFIED_RESULT].

Would you be open to a 15-minute call to see if we can help?

[YOUR_NAME]

P.S. [SECOND_CTA or social proof]`,
      category: 'outreach',
      tags: ['cold-email', 'prospecting', 'sdr'],
    },
  ],
};

function getPromptsForContext(objectType: string, stage: string): Prompt[] {
  // Map context to categories
  if (objectType === 'CONTACT') {
    return samplePrompts.outreach || [];
  }

  const stageLower = stage?.toLowerCase() || '';
  if (stageLower.includes('qualified') || stageLower.includes('appointment')) {
    return samplePrompts.discovery || [];
  }
  if (stageLower.includes('demo') || stageLower.includes('presentation')) {
    return samplePrompts.ae || [];
  }
  if (stageLower.includes('proposal') || stageLower.includes('negotiation')) {
    return samplePrompts.objections || [];
  }

  return samplePrompts.discovery || [];
}

function HubSpotEmbedContent() {
  const searchParams = useSearchParams();
  const objectType = searchParams.get('objectType') || 'DEAL';
  const stage = searchParams.get('stage') || '';

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPrompts(getPromptsForContext(objectType, stage));
  }, [objectType, stage]);

  const filteredPrompts = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.content);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);

    // Track copy
    fetch(`/api/v1/prompts/${prompt.id}/copy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'hubspot' }),
    }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold">GTM Skills</h1>
          <p className="text-sm text-muted-foreground">
            {objectType === 'CONTACT' ? 'Outreach' : stage || 'Discovery'} Prompts
          </p>
        </div>
        <a
          href="https://gtm-skills.com/prompts?utm_source=hubspot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="sm">
            Browse All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </a>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none text-sm"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-5 gap-4 h-[calc(100vh-160px)]">
        {/* Prompt list */}
        <div className="col-span-2 space-y-2 overflow-y-auto">
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => setSelectedPrompt(prompt)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedPrompt?.id === prompt.id
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-border hover:border-orange-500/50'
              }`}
            >
              <h3 className="font-medium text-sm mb-1">{prompt.title}</h3>
              <div className="flex gap-1 flex-wrap">
                {prompt.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Prompt preview */}
        <div className="col-span-3 border border-border rounded-lg overflow-hidden flex flex-col">
          {selectedPrompt ? (
            <>
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold">{selectedPrompt.title}</h2>
                <Button
                  size="sm"
                  onClick={() => handleCopy(selectedPrompt)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {copiedId === selectedPrompt.id ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">
                  {selectedPrompt.content}
                </pre>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a prompt to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HubSpotEmbedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <HubSpotEmbedContent />
    </Suspense>
  );
}
