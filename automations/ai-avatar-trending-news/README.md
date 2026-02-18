# AI Avatar for Trending News

## What it does
Auto-generate avatar-friendly news scripts from trending topics.

## When it runs (triggers)
Scheduled poll of trending news feed.

## Prerequisites
- Platform: n8n
- Connected apps: OpenAI
- Secrets: see Environment Variables below

## Flow
- Fetch trending topics
- Generate avatar script via OpenAI
- Optionally post/render content

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Scripts/captions ready for avatar rendering or posting.

## Credentials to map after import
- OpenAI

## Environment Variables
```
OPENAI_API_KEY=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Upstream news API empty
- OpenAI rate limits
- Misformatted content payload

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
