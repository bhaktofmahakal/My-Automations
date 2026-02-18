# Sales Assistant Build

## What it does
Generate AI sales briefs/responses from lead records stored in Sheets.

## When it runs (triggers)
Manual or webhook ingestion of new lead rows.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, OpenAI
- Secrets: see Environment Variables below

## Flow
- Receive new lead payload or sheet row
- Enrich/prepare prompt inputs
- Call OpenAI for sales response
- Write response/status back to Google Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Updated sheet rows with AI-crafted outreach copy and qualification status.

## Credentials to map after import
- Google Sheets
- OpenAI

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
OPENAI_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Invalid Sheets credentials
- OpenAI quota errors
- Sheet headers changed

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
