# Lead Generation + Outreach

## What it does
Full-cycle lead generation with outreach emails.

## When it runs (triggers)
Scheduled or manual.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, OpenAI
- Secrets: see Environment Variables below

## Flow
- Pull leads from Sheets
- Generate messaging via OpenAI
- Send outreach via configured channel
- Update statuses in Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Qualified leads with outreach status updates.

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
- Sheet column mismatch
- OpenAI errors
- Missing sender channel credentials

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
