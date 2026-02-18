# Generate Leads with Claude + Apify (X)

Source: Converted from "Generate leads using Claude and X .pdf". Cleaned and formatted for quick use.

## Prerequisites
- Claude Desktop app installed.
- Apify account (no coding needed).

## Setup (≈2 minutes)
1) Open Claude Desktop → Settings → Connectors / Extensions.
2) Click **Add Custom Connector** and fill:
   - **Name:** Apify
   - **Server URL:** `https://mcp.apify.com/mcp`
3) Save. No API keys required.

## How to use
Ask Claude prompts like:
- "Find 15 qualified leads for my AI recruitment tool in California."
- "Scrape founders in NYC fintech with emails and company size."
- "Pull 50 e-commerce brands in EU using Shopify, include LinkedIn URLs."

Claude will call Apify via the connector, run the actor, and return structured leads.

## Tips
- Be specific on industry, geo, fields required (email/phone/site/LinkedIn).
- Set quantity limits to avoid long runs.
- If the actor needs credentials (e.g., LinkedIn), configure them in Apify first.
- If you hit rate limits, reduce concurrency in the actor settings.

## Troubleshooting
- **Connector not visible:** restart Claude Desktop after adding.
- **Actor fails:** check Apify run log; ensure required actor input fields are provided.
- **Empty results:** broaden keywords or geography; verify the chosen actor supports the site.

## Contacts
Maintainer: utsav mishra (utsavmishraa005@gmail.com)
