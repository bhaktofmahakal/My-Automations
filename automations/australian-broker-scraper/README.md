# Australian Business Broker Scraper

## What it does
Scrape broker listings and alert via Slack + Sheets.

## When it runs (triggers)
Scheduled run.

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Slack
- Secrets: see Environment Variables below

## Flow
- Scrape broker listings
- Normalize data
- Append to Google Sheets
- Notify Slack channel

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Sheet rows plus Slack summary message.

## Credentials to map after import
- Google Sheets
- Slack

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
SLACK_OAUTH_TOKEN=
SLACK_CHANNEL_ID=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Slack token revoked
- Scrape selectors change
- Sheets quota errors

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
