/**
 * Contributors Spotlight Component
 * Show top 3 contributors with stats, link to /contributors
 */

import Link from 'next/link';
import { ArrowRight, Users, ThumbsUp, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Static preview data - in production, this would fetch from API
const topContributors = [
  {
    name: 'Sarah Chen',
    avatar: 'SC',
    prompts: 47,
    votes: 1240,
    copies: 3420,
    badge: 'top10',
  },
  {
    name: 'Marcus Williams',
    avatar: 'MW',
    prompts: 38,
    votes: 980,
    copies: 2890,
    badge: 'top10',
  },
  {
    name: 'Elena Rodriguez',
    avatar: 'ER',
    prompts: 31,
    votes: 756,
    copies: 2100,
    badge: 'top50',
  },
];

function getBadgeColor(badge: string) {
  switch (badge) {
    case 'top10':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'top50':
      return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30';
    default:
      return 'bg-zinc-800 text-zinc-400 border-zinc-700';
  }
}

export function ContributorsSpotlight() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-pink-500/30 text-pink-400">
            <Users className="h-3 w-3 mr-1" />
            Community Contributors
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built by Sales Pros Like You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GTM Skills is community-driven. Top contributors earn recognition,
            badges, and help shape the future of agentic sales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {topContributors.map((contributor, index) => (
            <div
              key={contributor.name}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors text-center"
            >
              {/* Rank indicator */}
              <div className="text-xs text-zinc-500 mb-3">#{index + 1} Contributor</div>

              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">{contributor.avatar}</span>
              </div>

              {/* Name + Badge */}
              <div className="font-semibold text-white mb-1">{contributor.name}</div>
              <Badge className={`text-[10px] mb-4 ${getBadgeColor(contributor.badge)}`}>
                {contributor.badge === 'top10' ? 'Top 10' : 'Top 50'}
              </Badge>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <FileText className="h-4 w-4 text-zinc-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{contributor.prompts}</div>
                  <div className="text-[10px] text-zinc-500">prompts</div>
                </div>
                <div>
                  <ThumbsUp className="h-4 w-4 text-zinc-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{contributor.votes}</div>
                  <div className="text-[10px] text-zinc-500">votes</div>
                </div>
                <div>
                  <Copy className="h-4 w-4 text-zinc-500 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-white">{contributor.copies.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500">copies</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contributors">
              <Button variant="outline" className="gap-2 border-pink-500/30 text-pink-400 hover:bg-pink-500/10">
                View All Contributors
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/leaderboard/submit">
              <Button className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                Become a Contributor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
