# Wellfound Auto Apply Script

## What it does
Auto-apply to jobs on Wellfound with personalized blurb.

## When it runs (triggers)
Manual run in browser console.

## Prerequisites
- Platform: browser
- Connected apps: Browser JS
- Secrets: see Environment Variables below

## Flow
- Load Wellfound job listings
- Auto-fill application text
- Handle relocation question
- Track applied/skipped counts

## Inputs
- Source data: Google Sheets / webhook payloads as implied by flow
- Config: environment variables in this folder

## Outputs
Automatic applications submitted with consistent cover text.

## Credentials to map after import
- Browser JS

## Environment Variables
```
APPLICANT_NAME=
APPLICANT_EMAIL=
APPLICANT_LOCATION=
TARGET_ROLE=
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in the platform.
- Run a single test item (one lead/event/message) and verify expected sheet updates/notifications.

## Common failure modes
- Selectors change on site
- Rate limits/captcha
- Uncaught DOM errors

## Ops runbook
- Keep workflow disabled until smoke test passes.
- Monitor first runs for auth errors and sheet writes.
- Re-auth expiring OAuth tokens proactively.
- If something breaks, pause schedules/webhooks, fix credentials, re-test, then re-enable.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
