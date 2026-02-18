# Google Maps Research Agent

## What it does
Chat-style agent to research businesses on Google Maps and save to Sheets.

## When it runs (triggers)
Chat message trigger.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Google Gemini, LangChain Agent
- Secrets: see Environment Variables below

## Flow
- Receive chat message trigger
- Iterate map searches via AI agent
- Append each page of results to Google Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Structured business rows (name, address, phone, website, rating, hours, email) saved to Sheets.

## Credentials to map after import
- Google Sheets
- Google Gemini
- LangChain Agent

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
GOOGLE_SHEETS_TRIGGER_OAUTH_CLIENT=
GOOGLE_SHEETS_TRIGGER_OAUTH_SECRET=
GEMINI_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Sheets trigger auth missing scope
- Gemini token invalid
- Agent exceeds iteration limits

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
