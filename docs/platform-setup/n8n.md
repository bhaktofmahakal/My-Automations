# n8n Setup

## Prerequisites
- n8n cloud/self-hosted instance
- Credentials for Google Sheets, Gmail/Slack/Telegram/etc. as required per automation
- Ability to create webhooks (publicly reachable) when workflows need triggers

## Importing workflows
1. In n8n, create a new workflow and choose **Import from File**.
2. Select the automation's workflow.json (do not edit the JSON).
3. After import, map each node to an existing credential or create a new credential with the same type.
4. Save the workflow but keep it **inactive** until smoke tests pass.

## Environment / secrets
- Prefer n8n Credentials over raw env vars for OAuth/API keys.
- For variables (IDs, URLs, tokens) use Workflow Settings -> Environment Variables or global env.
- Mirror the placeholders from each automation's env.example.

## Execution settings
- Set Execution Order: v1 unless otherwise specified in the workflow.
- Enable Save Data Error Execution for debugging critical flows.
- Configure retry/timeout per HTTP node if hitting flaky APIs.

## Backups & versioning
- Keep exported workflow.json under version control (unchanged).
- When updating, export a fresh JSON, bump a changelog entry, and archive the previous version in the same folder if needed.

## Security
- Never commit real credentials.
- Restrict webhook URLs with secrets/signatures where supported (Calendly/VAPI/Retell, etc.).

## Validation checklist
- All credentials resolved
- Webhooks reachable from the internet
- Sheet IDs correct and matching column headers
- Test run completes without manual edits to nodes
