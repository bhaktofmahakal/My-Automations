import { createServerClient } from './supabase';

/**
 * HubSpot Integration Library
 *
 * Handles token storage, refresh, and API calls
 */

export interface HubSpotTokens {
  portal_id: number;
  user_id: number;
  access_token: string;
  refresh_token: string;
  expires_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface HubSpotConnection {
  portal_id: number;
  portal_name?: string;
  user_email?: string;
  is_active: boolean;
  connected_at: string;
}

const HUBSPOT_CLIENT_ID = process.env.HUBSPOT_CLIENT_ID || '';
const HUBSPOT_CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET || '';

/**
 * Store HubSpot tokens in Supabase
 */
export async function storeTokens(tokens: HubSpotTokens): Promise<boolean> {
  const supabase = createServerClient();
  if (!supabase) {
    console.error('Supabase not configured');
    return false;
  }

  const { error } = await supabase
    .from('hubspot_connections')
    .upsert({
      portal_id: tokens.portal_id,
      user_id: tokens.user_id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at,
      is_active: true,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'portal_id',
    });

  if (error) {
    console.error('Error storing HubSpot tokens:', error);
    return false;
  }

  return true;
}

/**
 * Get stored tokens for a portal
 */
export async function getTokens(portalId: number): Promise<HubSpotTokens | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('hubspot_connections')
    .select('*')
    .eq('portal_id', portalId)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  return data as HubSpotTokens;
}

/**
 * Refresh expired tokens
 */
export async function refreshTokens(portalId: number): Promise<HubSpotTokens | null> {
  const currentTokens = await getTokens(portalId);
  if (!currentTokens) return null;

  try {
    const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: HUBSPOT_CLIENT_ID,
        client_secret: HUBSPOT_CLIENT_SECRET,
        refresh_token: currentTokens.refresh_token,
      }),
    });

    if (!response.ok) {
      console.error('Failed to refresh HubSpot tokens');
      return null;
    }

    const newTokens = await response.json();

    const updatedTokens: HubSpotTokens = {
      ...currentTokens,
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      expires_at: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
    };

    await storeTokens(updatedTokens);
    return updatedTokens;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
}

/**
 * Get a valid access token (refreshes if needed)
 */
export async function getValidAccessToken(portalId: number): Promise<string | null> {
  const tokens = await getTokens(portalId);
  if (!tokens) return null;

  // Check if token is expired (with 5 min buffer)
  const expiresAt = new Date(tokens.expires_at);
  const now = new Date(Date.now() + 5 * 60 * 1000);

  if (expiresAt <= now) {
    const refreshed = await refreshTokens(portalId);
    return refreshed?.access_token || null;
  }

  return tokens.access_token;
}

/**
 * Disconnect a HubSpot portal
 */
export async function disconnectPortal(portalId: number): Promise<boolean> {
  const supabase = createServerClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('hubspot_connections')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('portal_id', portalId);

  return !error;
}

/**
 * List all connected portals
 */
export async function listConnectedPortals(): Promise<HubSpotConnection[]> {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('hubspot_connections')
    .select('portal_id, portal_name, user_email, is_active, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map(d => ({
    portal_id: d.portal_id,
    portal_name: d.portal_name,
    user_email: d.user_email,
    is_active: d.is_active,
    connected_at: d.created_at,
  }));
}

/**
 * Make an authenticated HubSpot API call
 */
export async function hubspotApiCall<T>(
  portalId: number,
  endpoint: string,
  options: RequestInit = {}
): Promise<T | null> {
  const accessToken = await getValidAccessToken(portalId);
  if (!accessToken) return null;

  try {
    const response = await fetch(`https://api.hubapi.com${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`HubSpot API error: ${response.status}`);
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('HubSpot API call failed:', error);
    return null;
  }
}
