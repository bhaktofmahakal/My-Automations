# Job Finder Automation

## What it does
Automate job search lead capture and enrichment.

## When it runs (triggers)
Scheduled search.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, OpenRouter
- Secrets: see Environment Variables below

## Flow
- Pull job listings
- Generate summaries via OpenRouter
- Write/update Google Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Curated job leads with AI notes in Sheets.

## Credentials to map after import
- Google Sheets
- OpenRouter

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
OPENROUTER_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- API key invalid
- Sheet headers moved
- Rate limiting

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
