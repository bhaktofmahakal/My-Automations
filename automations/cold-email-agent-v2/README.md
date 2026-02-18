# Cold Email Agent (V2)

## What it does
Variant of cold email sender with branching logic by sender inbox.

## When it runs (triggers)
Schedule trigger with Google Sheets leads.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Gmail, OpenAI
- Secrets: see Environment Variables below

## Flow
- Load leads
- Switch by sender email buckets
- Send email waves with waits
- Update sheet and loop for follow-ups

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Automated multi-wave outreach with branch-based sender routing.

## Credentials to map after import
- Google Sheets
- Gmail
- OpenAI

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
OPENAI_API_KEY=
GMAIL_OAUTH_CLIENT=
GMAIL_OAUTH_SECRET=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Missing sender mailbox mapping
- Follow-up wait timers mis-set
- Sheet matching columns missing

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
