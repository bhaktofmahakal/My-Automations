# Cold Email Agent (V1)

## What it does
Send multi-step cold email sequences with unsubscribe handling.

## When it runs (triggers)
Schedule trigger with Google Sheets leads.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, OpenAI, Tavily, Gmail
- Secrets: see Environment Variables below

## Flow
- Load lead rows from Google Sheets
- Generate personalized email bodies via OpenAI/Tavily context
- Send via Gmail with unsubscribe token
- Update sheet with send + message IDs

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Sequenced emails sent and logged with opt-out tracking.

## Credentials to map after import
- Google Sheets
- OpenAI
- Tavily
- Gmail

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
OPENAI_API_KEY=
TAVILY_API_KEY=
GMAIL_OAUTH_CLIENT=
GMAIL_OAUTH_SECRET=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Gmail OAuth expired
- Sheet schema mismatch
- Webhook unsubscribe URL misconfigured

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
