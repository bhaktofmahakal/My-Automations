# Lead Qualification (Basic)

## What it does
Calendly lead intake and qualification with VAPI; updates Sheets.

## When it runs (triggers)
Calendly invitee.created webhook.

## Prerequisites
- Platform: n8n
- Connected apps: Calendly, Google Sheets, VAPI API
- Secrets: see Environment Variables below

## Flow
- Receive Calendly event
- Read lead row from Google Sheets
- POST to VAPI for qualification
- Write status back to sheet

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Qualified/declined flag stored in Sheets for each booking.

## Credentials to map after import
- Calendly
- Google Sheets
- VAPI API

## Environment Variables
```
CALENDLY_SIGNING_SECRET=
GOOGLE_SHEETS_ID=
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
VAPI_API_KEY=
VAPI_API_URL=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Calendly signature mismatch
- Sheet ID placeholder not replaced
- VAPI call failure

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
