# Setup Guide (n8n)

## Prerequisites
- n8n instance with Google Sheets, Groq credentials, and Tavily API key ready.
- Values for all environment variables in `env.example`.

## Import steps
1) In n8n, create a new workflow and choose **Import from File**.
2) Select `workflow.json` from this folder (do not modify the JSON).
3) Map credentials: Google Sheets → your Sheets OAuth, Groq → your Groq key.
4) Edit the Tavily HTTP node to use your `TAVILY_API_KEY` if not picked from env.
5) Save the workflow and keep it **inactive** until tests pass.

## Configure environment
- Copy `env.example` to `.env` (or use n8n Environment Variables) and fill every placeholder.
- Set `GOOGLE_SHEETS_DOC_ID` and `SHEET_NAME` to the target sheet.

## Smoke test
- Run manual trigger on a single sheet row.
- Confirm enrichment fields and outreach copy appear in the sheet.

## Go-live checklist
- Credentials authorized (Sheets + Groq)
- Tavily key set in HTTP node/body
- Sheet ID and tab name correct
- Schedule/webhook enabled after successful smoke test
