# Triforce HR Voice Agent

## What it does
Phone-screen candidates for the Business Associate role.

## When it runs (triggers)
Inbound/outbound voice session via provider.

## Prerequisites
- Platform: voice
- Connected apps: Retell voice platform
- Secrets: see Environment Variables below

## Flow
- Initiate call with candidate
- Follow scripted screening flow
- Capture responses and dispositions

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Call transcripts and qualification decision per candidate.

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
- Number provisioning missing
- Webhook unreachable
- Audio latency issues

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
