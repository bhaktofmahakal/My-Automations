# Triforce Retell AI Connection

## What it does
Connect Retell AI agent with Sheets + callbacks.

## When it runs (triggers)
Voice call or API event.

## Prerequisites
- Platform: voice
- Connected apps: Retell, Google Sheets
- Secrets: see Environment Variables below

## Flow
- Receive call event
- Log to Google Sheets
- Return connection response

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Synchronized call records and agent linkage.

## Credentials to map after import
- Retell
- Google Sheets

## Environment Variables
```
RETELL_API_KEY=
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
WEBHOOK_VERIFY_TOKEN=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Sheets auth failure
- Webhook signature mismatch
- Retell auth errors

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
