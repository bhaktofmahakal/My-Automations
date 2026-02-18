# Google Maps Lead Scraper

## What it does
Capture leads from Google Maps search and store to Sheets.

## When it runs (triggers)
Manual or scheduled start.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Maps/Apify
- Secrets: see Environment Variables below

## Flow
- Run query against Google Maps API/Apify
- Normalize business contact fields
- Write to Google Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
New business leads appended to Sheets with location metadata.

## Credentials to map after import
- Google Sheets
- Maps/Apify

## Environment Variables
```
GOOGLE_MAPS_API_KEY=
APIFY_TOKEN=
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- API quota exceeded
- Maps query returns empty
- Sheet append failure

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
