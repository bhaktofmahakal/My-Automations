# Telegram Lead Gen - Apify to Sheets

## What it does
Scrape leads via Apify/Google Maps and push to Telegram and Sheets.

## When it runs (triggers)
Scheduled run.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Telegram, OpenAI, Apify/Maps
- Secrets: see Environment Variables below

## Flow
- Fetch leads from Apify or Maps
- Enrich with OpenAI
- Send notifications via Telegram
- Persist to Google Sheets

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Sheet entries plus Telegram alerts with summary data.

## Credentials to map after import
- Google Sheets
- Telegram
- OpenAI
- Apify/Maps

## Environment Variables
```
APIFY_TOKEN=
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
OPENAI_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Telegram bot token invalid
- Apify task not found
- Sheet append failure

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
