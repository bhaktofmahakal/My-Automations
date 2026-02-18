# Setup Guide (n8n)

## Prerequisites
- n8n instance with access to required credentials.
- Values for all environment variables in env.example.

## Import steps
1. In n8n, create a new workflow and choose **Import from File**.
2. Select workflow.json from this folder (do not modify the JSON).
3. Map each node to the correct credential (Google Sheets, Gmail/Slack/Telegram/etc.).
4. Save the workflow and keep it **inactive** until tests pass.

## Configure environment
- Copy env.example to .env (or use n8n Environment Variables) and fill every placeholder.
- Align credential names used in nodes with the credentials you map in n8n.

## Smoke test
- Run once with a single sample record.
- Confirm sheet writes/notifications/webhooks behave as expected.

## Go-live checklist
- Credentials authorized
- Webhook URL reachable (if applicable)
- Sheet IDs/column headers correct
- Schedule enabled at intended frequency
