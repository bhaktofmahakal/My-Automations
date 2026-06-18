import { NextRequest, NextResponse } from 'next/server';
import { storeTokens } from '@/lib/hubspot';

export const runtime = 'nodejs'; // Need nodejs for Supabase

/**
 * HubSpot OAuth Callback Endpoint
 *
 * Handles the OAuth callback from HubSpot after user authorization.
 * Exchanges the authorization code for access/refresh tokens.
 */

const HUBSPOT_CLIENT_ID = process.env.HUBSPOT_CLIENT_ID || '';
const HUBSPOT_CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET || '';
const HUBSPOT_REDIRECT_URI = process.env.HUBSPOT_REDIRECT_URI || 'https://github.com/bhaktofmahakal/My-Automations/api/hubspot/callback';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error('HubSpot OAuth Error:', error, errorDescription);
    return NextResponse.redirect(
      new URL(`/integrations/hubspot?error=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  // Validate required parameters
  if (!code) {
    return NextResponse.redirect(
      new URL('/integrations/hubspot?error=missing_code', request.url)
    );
  }

  // Validate state (CSRF protection)
  const storedState = request.cookies.get('hubspot_oauth_state')?.value;
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(
      new URL('/integrations/hubspot?error=invalid_state', request.url)
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: HUBSPOT_CLIENT_ID,
        client_secret: HUBSPOT_CLIENT_SECRET,
        redirect_uri: HUBSPOT_REDIRECT_URI,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('HubSpot Token Exchange Error:', errorData);
      throw new Error('Failed to exchange authorization code');
    }

    const tokens: TokenResponse = await tokenResponse.json();

    // Get portal info to identify the HubSpot account
    const portalResponse = await fetch('https://api.hubapi.com/oauth/v1/access-tokens/' + tokens.access_token);
    const portalInfo = await portalResponse.json();

    // Store tokens in Supabase
    const stored = await storeTokens({
      portal_id: portalInfo.hub_id,
      user_id: portalInfo.user_id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    });

    console.log('HubSpot Connected:', {
      portalId: portalInfo.hub_id,
      userId: portalInfo.user_id,
      stored,
    });

    // Clear the state cookie and redirect to success
    const response = NextResponse.redirect(
      new URL('/integrations/hubspot?success=true', request.url)
    );
    response.cookies.delete('hubspot_oauth_state');

    return response;
  } catch (error) {
    console.error('HubSpot Callback Error:', error);
    return NextResponse.redirect(
      new URL('/integrations/hubspot?error=token_exchange_failed', request.url)
    );
  }
}
