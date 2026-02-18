# Triforce HR Voice Agent (V2)

## What it does
Updated voice flow for screening candidates; conversation-flow JSON.

## When it runs (triggers)
Inbound/outbound voice session via provider.

## Prerequisites
- Platform: voice
- Connected apps: Retell voice platform
- Secrets: see Environment Variables below

## Flow
- Start call and identify
- Run scripted eligibility checks
- Handle FAQs and objections
- Schedule or decline

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Voice call handled with decision on candidate fit.

## Credentials to map after import
- Retell voice platform

## Environment Variables
```
RETELL_API_KEY=
VOICE_WEBHOOK_URL=
CALLER_ID_NUMBER=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Webhook unreachable
- Number not provisioned
- Latency causing call drops

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
