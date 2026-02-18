# Meeting Research & Outreach

## What it does
Uses meeting attendee rows from Google Sheets, researches each company with Tavily + Groq, and writes structured insights plus sales-ready messaging back to the sheet.

## When it runs (triggers)
Manual/test trigger (enable a schedule or webhook in n8n after import).

## Prerequisites
- Platform: n8n
- Connected apps: Google Sheets, Groq (LLM), Tavily (HTTP search API)
- Secrets: see Environment Variables below

## Flow
- Read attendee/company rows from Google Sheets
- Research company via Tavily search
- Generate structured outputs (company overview, tech stack, updates, solutions) with Groq
- Write insights back to Google Sheets
- Produce email/SMS drafts for outreach

## Inputs
- Source data: Google Sheets row fields (Name, Email, Company Name, Website, Business Type, Project)
- Config: environment variables in this folder

## Outputs
- Enriched sheet columns with research fields and outreach copy

## Credentials to map after import
- Google Sheets
- Groq API
- (Tavily uses HTTP node; supply API key via env/body)

## Environment Variables
```
GOOGLE_SHEETS_OAUTH_CLIENT=
GOOGLE_SHEETS_OAUTH_SECRET=
GROQ_API_KEY=
TAVILY_API_KEY=
GOOGLE_SHEETS_DOC_ID=
SHEET_NAME=Meeting Data
```

## Testing
- Import workflow.json without editing it.
- Fill env.example values and map credentials in n8n.
- Run manual trigger on a single row; confirm research fields and email/SMS text are written back.

## Common failure modes
- Google Sheets credentials expired or sheet ID/name mismatch
- Groq API key missing/invalid
- Tavily API key missing or rate-limited

## Ops runbook
- Keep workflow disabled until smoke test passes.
- If sheet writes fail, verify headers and permissions.
- Rotate API keys periodically; re-auth Sheets on expiry.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
