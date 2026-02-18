# VEO3 Ads Making

## What it does
Generate ad creatives and deliver via Telegram.

## When it runs (triggers)
Manual or schedule.

## Prerequisites
- Platform: n8n
- Connected apps: OpenAI, Telegram, Custom HTTP header auth
- Secrets: see Environment Variables below

## Flow
- Receive brief
- Call OpenAI for scripts/assets
- Push results to Telegram channel

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Ad copy/storyboards delivered to Telegram.

## Credentials to map after import
- OpenAI
- Telegram
- Custom HTTP header auth

## Environment Variables
```
OPENAI_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
CUSTOM_HEADER_AUTH_TOKEN=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Telegram send failure
- Auth header missing
- Model rate limits

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
