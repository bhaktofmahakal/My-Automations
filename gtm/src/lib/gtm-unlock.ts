// GTM Content Unlock State Management (localStorage)

const STORAGE_KEY = 'gtm-unlock-state';

export interface GTMUnlockState {
  email: string;
  company: string;
  unlockedAt: string;
  categories: string[];
}

export function getUnlockState(): GTMUnlockState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as GTMUnlockState;
  } catch {
    return null;
  }
}

export function setUnlockState(email: string, company: string, category: string): void {
  if (typeof window === 'undefined') return;

  const existing = getUnlockState();
  const categories = existing?.categories || [];

  if (!categories.includes(category)) {
    categories.push(category);
  }

  const state: GTMUnlockState = {
    email: email || existing?.email || '',
    company: company || existing?.company || '',
    unlockedAt: existing?.unlockedAt || new Date().toISOString(),
    categories,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function isUnlocked(category: string): boolean {
  const state = getUnlockState();
  if (!state) return false;
  return state.categories.includes(category) || state.categories.includes('all');
}

export function unlockAll(email: string, company: string): void {
  if (typeof window === 'undefined') return;

  const state: GTMUnlockState = {
    email,
    company,
    unlockedAt: new Date().toISOString(),
    categories: ['all'],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearUnlockState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// Category slugs for gating
export const GTM_CATEGORIES = {
  // Industries
  'industry-saas': 'SaaS & Tech Sales Prompts',
  'industry-finserv': 'Financial Services Sales Prompts',
  'industry-healthcare': 'Healthcare & MedTech Sales Prompts',
  'industry-manufacturing': 'Manufacturing Sales Prompts',
  'industry-professional-services': 'Professional Services Sales Prompts',
  'industry-ecommerce': 'E-commerce & Retail Sales Prompts',
  'industry-real-estate': 'Real Estate & PropTech Sales Prompts',
  'industry-education': 'Education & EdTech Sales Prompts',
  // Roles
  'role-sdr': 'SDR/BDR Playbook',
  'role-ae': 'Account Executive Playbook',
  'role-sales-manager': 'Sales Manager Playbook',
  'role-revops': 'RevOps Playbook',
  'role-csm': 'CSM/AM Playbook',
  'role-founder': 'Founder Sales Playbook',
  // Workflows
  'workflow-cold-to-close': 'Cold to Close Workflow',
  'workflow-discovery': 'Discovery Mastery Workflow',
  'workflow-demo-proposal': 'Demo to Proposal Workflow',
  'workflow-lost-deal': 'Lost Deal Resurrection Workflow',
  'workflow-expansion': 'Expansion Motion Workflow',
  'workflow-referral': 'Referral System Workflow',
  'workflow-competitive': 'Competitive Displacement Workflow',
  'workflow-qbr': 'QBR Excellence Workflow',
  'workflow-champion': 'Champion Development Workflow',
  'workflow-multi-thread': 'Multi-Threading Workflow',
  'workflow-pricing': 'Pricing Negotiation Workflow',
  'workflow-account-research': 'Account Research Workflow',
  // Other
  'projects': 'Claude Projects System Prompts',
  'methodology-all': 'Sales Methodology Guides',
  'signals': 'Signal-Based Selling Prompts',
  'templates': 'Email Template Library',
  // Tonalities
  'tonalities-premium': 'Premium Tonality Library',
} as const;

export type GTMCategory = keyof typeof GTM_CATEGORIES;
