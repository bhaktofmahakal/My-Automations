# Corsair.dev Integration Research & Strategic Evaluation for ShogunCMO

This report provides a technical investigation into [Corsair.dev](https://corsair.dev/) as the potential integration layer for **ShogunCMO**, evaluating its architecture, capabilities, specific integration support, and deployment topology.

---

## 1. Corsair Architectural Capabilities Verification

| Feature / Trait | Verification Status & Implementation Details | Evidence URL / Reference |
| :--- | :--- | :--- |
| **Supported Integrations** | Modular plugin system shipped as `@corsair-dev/<plugin>` npm packages (e.g., Slack, GitHub, Gmail, Notion, GCal, HubSpot, Linear, PostHog, Airtable, Discord, Tavily, Resend). | https://corsair.dev/ |
| **MCP Support** | Native support via `@corsair-dev/mcp`. Exposes Corsair plugins directly as Model Context Protocol (MCP) tool definitions and server adapters for LLM agent frameworks. | https://www.npmjs.com/package/@corsair-dev/mcp |
| **Authentication & OAuth** | Managed OAuth 2.0 PKCE, API Key, and Personal Access Token handling out-of-the-box. Provides built-in permission consent pages (`/auth/connect`) and zero-trust token relay. | https://corsair.dev/docs/introduction |
| **Multi-Tenancy** | First-class multi-tenancy enabled via `multiTenancy: true` in `createCorsair()`. Tenant IDs scope all credentials, data caches, and permission rules automatically. | https://corsair.dev/ |
| **Webhooks & Events** | Inbound webhook router with automatic cryptographic signature verification (e.g., GitHub, Slack, Hubspot webhooks). Triggers internal background data synchronization. | https://corsair.dev/ |
| **API Access & SDK** | Strongly-typed TypeScript SDK (`createCorsair`). Can be called as a programmatic SDK (`corsair.slack.postMessage(...)`) or exposed to AI agents as typed tools. | https://corsair.dev/docs/plugins |
| **Database & Cache Behavior** | Pluggable SQL database layer (PostgreSQL, SQLite, MySQL via pool adapters). Stores cached third-party data per tenant to prevent API rate-limit exhaustion. | https://corsair.dev/ |
| **Read Operations** | Hitting third-party REST/GraphQL endpoints or local cached database tables. Zero key exposure to the caller or LLM prompt. | https://corsair.dev/ |
| **Write / Action Operations** | 4-tier granular permission modes per integration: `Open` (auto-run), `Cautious` (destructive actions require approval link), `Strict` (writes require approval), `Readonly` (writes blocked). | https://github.com/corsairdev/corsair |
| **Credential Management** | Zero-Knowledge Relay architecture. Credentials encrypted at rest using `CORSAIR_KEK` (Key Encryption Key). Self-hosted DB holds all credentials; cloud Hub holds none. | https://corsair.dev/ |
| **Token Refresh** | Automated background token refresh engine. Handles OAuth access token expiration and refresh token rotation transparently before API invocation. | https://corsair.dev/ |
| **Rate Limits** | Built-in backoff, retry queue, and rate-limit handling per integration provider per tenant. | https://corsair.dev/ |
| **Local Development** | 100% open-source TypeScript monorepo. Local scaffolding via `pnpm generate:plugin`. Runs locally with SQLite or local Postgres without external cloud dependencies. | https://github.com/corsairdev/corsair |
| **Deployment Requirements** | Node.js runtime (Next.js API route, Express, or Fastify server) + SQL Database (SQLite for local/prototype, Supabase Postgres for production). | https://corsair.dev/ |
| **Missing Integrations Handling**| Open plugin architecture. Custom plugins can be scaffolded in minutes via `pnpm generate:plugin` using Zod schemas and standard fetch wrappers. | https://corsair.dev/docs/build-plugin |

---

## 2. Integration-by-Integration Feasibility Analysis

Below is the verified status for the 14 requested target integrations for ShogunCMO:

| Service / Integration | Classification | Native Package / Method | Capability Scope | Evidence / Source URL |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | **SUPPORTED** | `@corsair-dev/github` | Read repos, commits, PRDs; write branches, commits, Pull Requests; receive push webhooks. | https://corsair.dev/ |
| **Slack** | **SUPPORTED** | `@corsair-dev/slack` | Send messages, read channels, listen to bot mentions, trigger interactive approval buttons. | https://corsair.dev/ |
| **Notion** | **SUPPORTED** | `@corsair-dev/notion` | Read workspace pages, query databases, append blocks for PRD and positioning ingestion. | https://corsair.dev/ |
| **Google Drive** | **SUPPORTED** | `@corsair-dev/googledrive` | Search files, read docs/sheets context, trigger upload webhooks. | https://corsair.dev/ |
| **Gmail** | **SUPPORTED** | `@corsair-dev/gmail` | Draft emails, send outreach (with permission consent link), read email threads. | https://corsair.dev/ |
| **Google Calendar** | **SUPPORTED** | `@corsair-dev/googlecalendar` | Read events, create calendar invites for launch milestones or sales calls. | https://corsair.dev/ |
| **HubSpot** | **SUPPORTED** | `@corsair-dev/hubspot` | Read/write CRM contacts, deals, company profiles for RevOps workflows. | https://corsair.dev/ |
| **LinkedIn** | **PARTIALLY SUPPORTED** | Custom OAuth / `@corsair-dev/linkedin` | Handles OAuth token exchange & user context. Direct company/profile post creation supported; analytics limited by LinkedIn API. | https://corsair.dev/docs |
| **X / Twitter** | **PARTIALLY SUPPORTED** | Custom OAuth / `@corsair-dev/twitter` | Handles OAuth 2.0 PKCE. Supports tweeting, thread drafting, and user timeline reads. Restricted by Twitter API v2 rate tiers. | https://corsair.dev/docs |
| **Reddit** | **PARTIALLY SUPPORTED** | Custom OAuth / `@corsair-dev/reddit` | OAuth & search query support. Staging reply drafts supported. Direct automated posting restricted by Reddit API anti-spam policy. | https://corsair.dev/docs |
| **Google Search Console** | **PARTIALLY SUPPORTED** | Custom OAuth / `@corsair-dev/google` | OAuth authentication supported. GSC Data API query methods require custom plugin mapping or direct fetch. | https://corsair.dev/docs |
| **Google Analytics (GA4)** | **PARTIALLY SUPPORTED** | Custom OAuth / `@corsair-dev/google` | OAuth authentication supported. GA4 Data API runReport queries require custom plugin mapping or direct fetch. | https://corsair.dev/docs |
| **Hacker News** | **NOT SUPPORTED** *(Trivial)* | N/A (Public REST API) | No official Corsair package. HN uses a free, unauthenticated Firebase REST API (`hacker-news.firebaseio.com`), making direct fetch better than Corsair. | https://news.ycombinator.com/ |
| **Product Hunt** | **NOT SUPPORTED** *(Custom)* | N/A (GraphQL API) | No official Corsair package. Product Hunt requires a custom OAuth / Developer Token GraphQL query plugin (`pnpm generate:plugin`). | https://api.producthunt.com/v2/docs |

---

## 3. Strategic Recommendations for ShogunCMO

### 3.1 Prototype Integration Matrix

1. **Use via Corsair (Native Production-Grade):**
   - **GitHub:** Ingest commit diffs, read `README.md`/specs, open technical SEO & `llms.txt` Pull Requests.
   - **Slack:** Listen for `@ShogunCMO` commands in `#marketing-cmo`, push daily digests and interactive approval buttons.
   - **Notion:** Ingest product specs and brand strategy guidelines.
   - **Tavily (Built-in Plugin):** Execute SERP searches and competitive intelligence queries.

2. **Mock for Prototype (Phase 1):**
   - **LinkedIn & X (Twitter):** Stage generated post cards in the Agents Feed with a "Copy to Clipboard" or simulated "Post" button to avoid burning API credits or hitting OAuth verification bottlenecks during initial testing.
   - **Google Search Console & GA4:** Seed prototype dashboard with mock traffic/ranking metrics to test the SEO Agent's decision logic before setting up complex GCP OAuth consent screens.

3. **Defer for Future Commercial Scope (Phase 2 / Phase 3):**
   - **HubSpot, Gmail, GCal, Google Drive:** Defer until B2B enterprise sales and outbound RevOps features are prioritized in V1/V2.
   - **Product Hunt:** Build custom GraphQL connector prior to ShogunAI's official PH launch.

### 3.2 How Corsair Fits into ShogunCMO Architecture

```mermaid
graph TD
    subgraph ShogunCMO Application (Next.js 14+)
        AgentEngine["Orchestrator Agent<br/>(Groq / OrcaRouter / GTM Skills)"]
        MemoryStore["Shogun Memory Store<br/>(Supabase pgvector / SQLite)"]
        DashboardUI["Dashboard UI<br/>(Terminal / Agents Feed / Strategy)"]
    end

    subgraph Corsair Integration Layer (Open Source SDK)
        CorsairCore["createCorsair({ multiTenancy: true, kek: ... })"]
        
        subgraph Native Plugins
            GitHubPlugin["@corsair-dev/github"]
            SlackPlugin["@corsair-dev/slack"]
            NotionPlugin["@corsair-dev/notion"]
            TavilyPlugin["@corsair-dev/tavily"]
        end

        subgraph Custom Plugins
            PHPlugin["Custom Product Hunt Plugin"]
            RedditPlugin["Custom Reddit Search Plugin"]
        end
    end

    subgraph External Platforms
        GitHubAPI["GitHub API"]
        SlackAPI["Slack API"]
        NotionAPI["Notion API"]
        WebflowAPI["CMS (Webflow/WordPress)"]
    end

    DashboardUI --> AgentEngine
    AgentEngine <--> MemoryStore
    AgentEngine -->|Typed Tool Calls / MCP| CorsairCore
    CorsairCore --> GitHubPlugin & SlackPlugin & NotionPlugin & TavilyPlugin & PHPlugin & RedditPlugin
    
    GitHubPlugin <-->|OAuth / PRs / Commits| GitHubAPI
    SlackPlugin <-->|Webhooks / Approval Buttons| SlackAPI
    NotionPlugin <-->|Read Specs| NotionAPI
```

### 3.3 Key Benefits of Using Corsair as ShogunCMO's Integration Backbone

1. **Zero Credential Exposure:** ShogunCMO's LLMs and agents never handle raw GitHub OAuth tokens or Slack API keys. Corsair resolves tokens internally at execution time, preventing prompt-injection credential leaks.
2. **Built-in Permission Guardrails:** ShogunCMO can leverage Corsair's `Cautious` permission mode out-of-the-box. Destructive actions (like merging code or deleting CMS pages) automatically generate a Corsair permission review link for the founder.
3. **MCP Native:** Because Corsair exports `@corsair-dev/mcp`, ShogunCMO's LLM agent pipeline can consume all connected workspace tools natively via the Model Context Protocol without writing custom tool schemas.
4. **Open Source & Self-Hosted:** ShogunCMO can run the full Corsair SDK locally during prototyping with zero per-seat vendor fees or external data leakage, keeping internal ShogunAI code strictly on local/private infrastructure.
