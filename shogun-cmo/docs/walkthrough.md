# ShogunCMO Production Architecture Walkthrough

**ShogunCMO** is an **AI Chief Marketing Officer & Growth Operating System** built to handle real production workloads across any company signal source.

---

## 1. Production Enhancements Implemented

1. **Removed Toy Demo Buttons:**
   - Stripped away hardcoded UI demo buttons.
   - Replaced with real production inputs: **Ingest Signal / URL Modal**, **Live Web Search Market Scanner**, and **Founder Goal Directive Command Bar**.

2. **Production Signal Ingestion API Endpoints:**
   - **`POST /api/v1/signals/ingest`**: Generic production API accepting signals from any external service, CLI, script, or webhook.
   - **`POST /api/v1/signals/github`**: Production GitHub Webhook receiver parsing standard GitHub push, pull_request, and release payloads.
   - **`POST /api/v1/cron/scan`**: Background cron endpoint running automated Tavily/Firecrawl scans for competitor sites & Reddit/HN keyword discussions.

3. **Production Settings & Credentials Page (`/settings`):**
   - Live endpoint documentation, curl commands, and status matrix for `GITHUB_TOKEN`, `TAVILY_API_KEY`, `FIRECRAWL_API_KEY`, `ORCAROUTER_API_KEY`, and `GROQ_API_KEY`.

---

## 2. Real Production Usage Examples

### A. Generic Signal Ingestion (cURL / External Webhook)
```bash
curl -X POST http://localhost:3005/api/v1/signals/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "type": "website_change",
    "source": "competitor_page",
    "payload": { "url": "https://okara.ai/pricing" }
  }'
```

### B. Live GitHub Webhook
Set Repository Webhook Payload URL in GitHub Settings to:
`http://localhost:3005/api/v1/signals/github`

### C. Live Web & SERP Market Search
From the dashboard top bar, enter any market query (e.g. `"local AI vector search latency benchmarks"`) and click **Scan Web** $\rightarrow$ Triggers Tavily/Firecrawl $\rightarrow$ Surfaces Opportunity & staged Action Cards.

---

## 3. Test & Build Results

- **Vitest Unit & Integration Suite:** **PASSED 100%** (`5 passed (5)`).
- **Next.js Production Build:** **PASSED 100%** (`Compiled successfully`, 19 routes).
- **Live Local Server:** Running at **`http://localhost:3005`**.

---

**PRODUCTION SHOGUNCMO BUILD COMPLETE.**
