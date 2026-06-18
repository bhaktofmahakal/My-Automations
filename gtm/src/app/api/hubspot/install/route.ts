import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * HubSpot OAuth Install Endpoint
 *
 * Redirects users to HubSpot's authorization page to install the app.
 * After authorization, HubSpot redirects back to /api/hubspot/callback
 */

const HUBSPOT_CLIENT_ID = process.env.HUBSPOT_CLIENT_ID || '';
const HUBSPOT_REDIRECT_URI = process.env.HUBSPOT_REDIRECT_URI || 'https://github.com/bhaktofmahakal/My-Automations/api/hubspot/callback';

// Scopes needed for CRM card functionality
const SCOPES = [
  'crm.objects.deals.read',
  'crm.objects.contacts.read',
  'crm.objects.companies.read',
].join(' ');

export async function GET(request: NextRequest) {
  if (!HUBSPOT_CLIENT_ID) {
    return NextResponse.json(
      { error: 'HubSpot integration not configured' },
      { status: 500 }
    );
  }

  // Generate state for CSRF protection
  const state = crypto.randomUUID();

  // Build the authorization URL
  const authUrl = new URL('https://app.hubspot.com/oauth/authorize');
  authUrl.searchParams.set('client_id', HUBSPOT_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', HUBSPOT_REDIRECT_URI);
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('state', state);

  // Set state cookie for validation on callback
  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set('hubspot_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 600, // 10 minutes
  });

  return response;
}
