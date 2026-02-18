# Troubleshooting

## Import issues
- **n8n JSON fails to import**: ensure file is unmodified; check for UTF-8 without BOM; retry in a fresh workflow.
- **Credential mapping missing**: recreate credentials with same type; remap nodes.

## Google Sheets
- **Permission denied**: refresh OAuth and ensure Drive + Sheets scopes.
- **Headers mismatch**: confirm sheet columns match node mappings; avoid renamed columns.
- **Quota exceeded**: add throttling or batch writes.

## Webhooks
- **Signature invalid**: verify shared secret (Calendly/Retell/custom) matches env and node config.
- **404/timeout**: confirm public URL reachable; check firewall; use n8n tunnel if needed.

## Email/Telegram/Slack
- **Gmail send fails**: re-auth OAuth; check daily limits; verify From address.
- **Telegram/Slack token revoked**: regenerate bot token/app token and redeploy.

## Voice agents
- **Call not connecting**: verify number provisioning and webhook URL; check TLS cert if self-hosted.
- **Latency/stalling**: reduce model complexity; ensure low network RTT to voice provider.

## General
- Check platform logs for node-level errors.
- Re-run with minimal test data before full scale.
- If still stuck, contact utsav mishra (utsavmishraa005@gmail.com).
