/**
 * Leaderboard Preview Component
 * Two-column layout with stats and terminal mockup showing top 3 prompts
 */

import Link from 'next/link';
import { ArrowRight, Trophy, ThumbsUp, Copy, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Static preview data - in production, this would fetch from API
const topPrompts = [
  { rank: 1, title: 'MEDDPICC Discovery Framework', votes: 847, copies: 2341 },
  { rank: 2, title: 'Executive Cold Email (Series B)', votes: 692, copies: 1876 },
  { rank: 3, title: 'Objection Handler: No Budget', votes: 584, copies: 1543 },
];

const stats = [
  { label: 'Total Votes', value: '12.4K', icon: ThumbsUp },
  { label: 'Prompts Shared', value: '2,500+', icon: Copy },
  { label: 'Outcomes Reported', value: '847', icon: Target },
];

export function LeaderboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Description + Stats */}
          <div>
            <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-400">
              <Trophy className="h-3 w-3 mr-1" />
              Community Leaderboard
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See What's Working
            </h2>
            <p className="text-muted-foreground mb-8">
              The community votes on the most effective prompts. Track outcomes,
              see real results, and contribute your own winning strategies.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center"
                >
                  <stat.icon className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href="/leaderboard">
                <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-black">
                  View Leaderboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/leaderboard/submit">
                <Button variant="outline" className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                  Submit a Prompt
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Terminal Mockup */}
          <div className="relative">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-zinc-500 ml-2">gtm-skills leaderboard</span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm">
                <div className="text-zinc-500 mb-3">$ top prompts --week</div>
                <div className="space-y-3">
                  {topPrompts.map((prompt) => (
                    <div
                      key={prompt.rank}
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          prompt.rank === 1
                            ? 'bg-amber-500 text-black'
                            : prompt.rank === 2
                            ? 'bg-zinc-400 text-black'
                            : 'bg-amber-700 text-white'
                        }`}
                      >
                        {prompt.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white truncate">{prompt.title}</div>
                        <div className="text-xs text-zinc-500">
                          {prompt.votes} votes · {prompt.copies} copies
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-xl blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
