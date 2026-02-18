# Master Social Scraper

## What it does
Scrape multi-platform social data and log to Sheets.

## When it runs (triggers)
Google Sheets trigger or manual run.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, OpenAI
- Secrets: see Environment Variables below

## Flow
- Trigger on sheet update
- Scrape/social fetch routines
- Enrich via OpenAI
- Persist results back to Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Enriched social profile data rows in Sheets.

## Credentials to map after import
- Google Sheets
- OpenAI

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
GOOGLE_SHEETS_TRIGGER_OAUTH_CLIENT=
GOOGLE_SHEETS_TRIGGER_OAUTH_SECRET=
OPENAI_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Trigger account missing scope
- Sheets rate limits
- Parsing failures on scraped content

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
