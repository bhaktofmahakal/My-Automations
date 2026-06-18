// Leaderboard types and utilities

import { supabase, createServerClient } from './supabase';

// Types
export interface LeaderboardPrompt {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  author_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  copy_count: number;
  view_count: number;
  upvotes: number;
  downvotes: number;
  hot_score: number;
  effectiveness_score: number;
  variables: string[];
  tags: string[];
  use_cases: string[];
}

export interface PromptSubmission {
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  author_name?: string;
  author_email?: string;
  tags?: string[];
  use_cases?: string[];
}

export interface VoteResult {
  success: boolean;
  newUpvotes?: number;
  newDownvotes?: number;
  userVote?: 'up' | 'down' | null;
  error?: string;
}

export interface OutcomeSubmission {
  prompt_id: string;
  outcome_type: 'meeting_booked' | 'reply_received' | 'demo_completed' | 'proposal_sent' | 'deal_won';
  outcome_value?: number;
  testimonial?: string;
  user_email?: string;
  is_public?: boolean;
}

export type SortOption = 'hot' | 'top' | 'new' | 'copies';
export type TimeFrame = 'all' | 'year' | 'month' | 'week' | 'day';

// Generate a fingerprint for anonymous voting
export function generateFingerprint(): string {
  // Simple fingerprint based on available browser data
  if (typeof window === 'undefined') {
    return `server-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];

  // Simple hash
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return `fp-${Math.abs(hash).toString(36)}`;
}

// Extract variables from prompt content
export function extractVariables(content: string): string[] {
  const matches = content.match(/\[([A-Z_\s]+)\]/g);
  if (!matches) return [];

  return [...new Set(matches.map(m => m.slice(1, -1)))];
}

// Get leaderboard prompts
export async function getLeaderboardPrompts(options: {
  sort?: SortOption;
  timeframe?: TimeFrame;
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<{ prompts: LeaderboardPrompt[]; total: number }> {
  const client = supabase;
  if (!client) {
    return { prompts: [], total: 0 };
  }

  const {
    sort = 'hot',
    timeframe = 'all',
    category,
    limit = 20,
    offset = 0,
  } = options;

  let query = client
    .from('leaderboard_prompts')
    .select('*', { count: 'exact' })
    .eq('status', 'approved');

  // Filter by category
  if (category) {
    query = query.eq('category', category);
  }

  // Filter by timeframe
  if (timeframe !== 'all') {
    const now = new Date();
    let startDate: Date;

    switch (timeframe) {
      case 'day':
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(0);
    }

    query = query.gte('created_at', startDate.toISOString());
  }

  // Sort
  switch (sort) {
    case 'hot':
      query = query.order('hot_score', { ascending: false });
      break;
    case 'top':
      query = query.order('upvotes', { ascending: false });
      break;
    case 'new':
      query = query.order('created_at', { ascending: false });
      break;
    case 'copies':
      query = query.order('copy_count', { ascending: false });
      break;
  }

  // Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return { prompts: [], total: 0 };
  }

  return {
    prompts: data as LeaderboardPrompt[],
    total: count || 0,
  };
}

// Submit a new prompt
export async function submitPrompt(submission: PromptSubmission): Promise<{ success: boolean; id?: string; error?: string }> {
  const client = supabase;
  if (!client) {
    return { success: false, error: 'Database not available' };
  }

  // Extract variables from content
  const variables = extractVariables(submission.content);

  const { data, error } = await client
    .from('leaderboard_prompts')
    .insert({
      title: submission.title,
      content: submission.content,
      category: submission.category,
      subcategory: submission.subcategory,
      author_name: submission.author_name,
      author_email: submission.author_email,
      tags: submission.tags || [],
      use_cases: submission.use_cases || [],
      variables,
      status: 'pending', // Goes to moderation
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error submitting prompt:', error);
    return { success: false, error: error.message };
  }

  return { success: true, id: data.id };
}

// Vote on a prompt
export async function voteOnPrompt(
  promptId: string,
  voteType: 'up' | 'down',
  fingerprint: string
): Promise<VoteResult> {
  const client = supabase;
  if (!client) {
    return { success: false, error: 'Database not available' };
  }

  // Check for existing vote
  const { data: existingVote } = await client
    .from('prompt_votes')
    .select('*')
    .eq('prompt_id', promptId)
    .eq('voter_fingerprint', fingerprint)
    .single();

  if (existingVote) {
    // If same vote type, remove the vote (toggle off)
    if (existingVote.vote_type === voteType) {
      await client
        .from('prompt_votes')
        .delete()
        .eq('id', existingVote.id);

      // Get updated counts
      const { data: prompt } = await client
        .from('leaderboard_prompts')
        .select('upvotes, downvotes')
        .eq('id', promptId)
        .single();

      return {
        success: true,
        newUpvotes: prompt?.upvotes || 0,
        newDownvotes: prompt?.downvotes || 0,
        userVote: null,
      };
    }

    // Different vote type - update the vote
    await client
      .from('prompt_votes')
      .delete()
      .eq('id', existingVote.id);
  }

  // Insert new vote
  const { error } = await client
    .from('prompt_votes')
    .insert({
      prompt_id: promptId,
      voter_fingerprint: fingerprint,
      vote_type: voteType,
    });

  if (error) {
    console.error('Error voting:', error);
    return { success: false, error: error.message };
  }

  // Get updated counts
  const { data: prompt } = await client
    .from('leaderboard_prompts')
    .select('upvotes, downvotes')
    .eq('id', promptId)
    .single();

  return {
    success: true,
    newUpvotes: prompt?.upvotes || 0,
    newDownvotes: prompt?.downvotes || 0,
    userVote: voteType,
  };
}

// Get user's vote for a prompt
export async function getUserVote(promptId: string, fingerprint: string): Promise<'up' | 'down' | null> {
  const client = supabase;
  if (!client) return null;

  const { data } = await client
    .from('prompt_votes')
    .select('vote_type')
    .eq('prompt_id', promptId)
    .eq('voter_fingerprint', fingerprint)
    .single();

  return data?.vote_type || null;
}

// Track a copy event
export async function trackCopy(promptId: string, source: string): Promise<void> {
  const client = supabase;
  if (!client) return;

  await client
    .from('prompt_copies')
    .insert({
      prompt_id: promptId,
      source,
    });
}

// Submit an outcome
export async function submitOutcome(outcome: OutcomeSubmission): Promise<{ success: boolean; error?: string }> {
  const client = supabase;
  if (!client) {
    return { success: false, error: 'Database not available' };
  }

  const { error } = await client
    .from('prompt_outcomes')
    .insert({
      prompt_id: outcome.prompt_id,
      outcome_type: outcome.outcome_type,
      outcome_value: outcome.outcome_value,
      testimonial: outcome.testimonial,
      user_email: outcome.user_email,
      is_public: outcome.is_public || false,
      verification_status: 'self_reported',
    });

  if (error) {
    console.error('Error submitting outcome:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Get leaderboard stats
export async function getLeaderboardStats(): Promise<{
  totalPrompts: number;
  totalVotes: number;
  totalCopies: number;
  totalOutcomes: number;
  totalPipelineValue: number;
}> {
  const client = supabase;
  if (!client) {
    return {
      totalPrompts: 0,
      totalVotes: 0,
      totalCopies: 0,
      totalOutcomes: 0,
      totalPipelineValue: 0,
    };
  }

  const [promptsResult, votesResult, copiesResult, outcomesResult] = await Promise.all([
    client.from('leaderboard_prompts').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    client.from('prompt_votes').select('*', { count: 'exact', head: true }),
    client.from('prompt_copies').select('*', { count: 'exact', head: true }),
    client.from('prompt_outcomes').select('outcome_value'),
  ]);

  const totalPipelineValue = outcomesResult.data?.reduce((sum, o) => sum + (o.outcome_value || 0), 0) || 0;

  return {
    totalPrompts: promptsResult.count || 0,
    totalVotes: votesResult.count || 0,
    totalCopies: copiesResult.count || 0,
    totalOutcomes: outcomesResult.data?.length || 0,
    totalPipelineValue,
  };
}

// Get categories with counts
export async function getCategoryCounts(): Promise<{ category: string; count: number }[]> {
  const client = supabase;
  if (!client) return [];

  const { data } = await client
    .from('leaderboard_prompts')
    .select('category')
    .eq('status', 'approved');

  if (!data) return [];

  // Count by category
  const counts: Record<string, number> = {};
  data.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
