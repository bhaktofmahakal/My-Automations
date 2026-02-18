# Setup Guide (Voice platform)

## Prerequisites
- Voice/Retell account with number provisioning and webhook capability.
- Values for all environment variables in env.example.

## Import steps
1. Create a new agent/flow in the provider console.
2. Upload/import workflow.json as the conversation/agent configuration.
3. Wire webhook/Callback URL to your hosted endpoint; set secrets from env vars.
4. Assign a phone number or SIP entry to the agent.

## Configure environment
- Set env vars (RETELL_API_KEY, webhook URL, caller ID) in your hosting or provider settings.

## Smoke test
- Place a test call; confirm greeting, branching, and termination rules.

## Go-live checklist
- Numbers provisioned and verified
- Webhook reachable over HTTPS
- Logging/recordings enabled for QA
