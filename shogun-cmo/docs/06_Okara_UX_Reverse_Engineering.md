# Okara.ai UX & Information Architecture Analysis
*(Revised based on deep scraping of official Okara documentation)*

This document provides a rigorous reverse-engineering of the Okara.ai user experience, based on the platform's official documentation and product guides. 

---

## 1. Screen & Interface Reconstructions

### 1.1 The AI CMO Terminal
* **Screen/page name:** AI CMO Terminal
* **Purpose:** A real-time, read-only log of everything the AI agent is doing in the background.
* **Main components:** 
  - Project switcher (Header)
  - Stream of timestamped activity entries (e.g., "Found a Reddit thread", "Drafted a new article").
* **Primary user action:** Passive viewing/monitoring.
* **Secondary actions:** Switching projects via the header.
* **Information shown:** System logs, scraping progress, cron job executions.
* **Inputs:** None (read-only).
* **Outputs:** Status updates on agent health and activity.
* **Navigation relationship:** Found on the main Dashboard sidebar. It is the first screen that populates during initial onboarding (taking 2-5 minutes).
* **Important UX patterns:** Builds trust by "showing the work." It acts like a developer terminal to prove the AI is grinding 24/7 without requiring the user to take action.
* **Evidence URL:** https://okara.ai/docs/dashboard/terminal

### 1.2 The Company Panel (The "Brain")
* **Screen/page name:** Company Panel
* **Purpose:** To manage the foundational product context and strategy documents that govern all agents.
* **Main components:** 
  1. **Your Profile Section:** Core details (Company name, URL, description, audience, competitors).
  2. **Strategy Documents List:** Markdown documents (Product Information, Marketing Strategy, Competitor Analysis, Brand Voice).
* **Primary user action:** Reviewing the AI-generated context.
* **Secondary actions:** Clicking "Edit" to manually override or correct the AI's understanding; running "Website Refresh" to rebuild from scratch.
* **Information shown:** Target audience, competitor lists, brand tone rules, messaging strategies.
* **Inputs:** Text edits to the profile fields and markdown documents.
* **Outputs:** Updated context injected into the next agent execution cycle.
* **Navigation relationship:** Found on the main Dashboard sidebar.
* **Important UX patterns:** "Editable AI Context." The UX treats the AI's prompt as an editable config file, giving users deterministic control over outputs.
* **Evidence URL:** https://okara.ai/docs/dashboard/company

### 1.3 The Agents Feed (The Task Queue)
* **Screen/page name:** Agents Feed
* **Purpose:** A live queue of everything the agents have found, written, or recommended that requires user review.
* **Main components:** 
  - Tabs: "Current" vs "Archived".
  - Feed of expandable Cards (Types: SEO Recommendation, Reddit Thread, X Post, LinkedIn Post, Article, Hacker News Pitch, GEO Recommendation, UGC Video, Influencer Campaign).
  - Settings Icon (Header) for "Writing Instructions".
* **Primary user action:** Reviewing a card and taking an action (Post, Copy, Publish, Mark as done, Archive).
* **Secondary actions:** Clicking the settings icon to adjust "Writing instructions" (e.g., tone, priority subreddits).
* **Information shown:** Context of the opportunity (e.g., the Reddit thread URL) and the AI's drafted response.
* **Inputs:** Approvals, edits to drafts, archiving clicks.
* **Outputs:** Published content via API integrations, or copied text to clipboard.
* **Navigation relationship:** The central hub of user action on the Dashboard.
* **Important UX patterns:** Inbox Zero / Swipe-to-approve mechanics. The user only logs in to say "Yes" or "No".
* **Evidence URL:** https://okara.ai/docs/dashboard/agents-feed

### 1.4 The Analytics Hub
* **Screen/page name:** Analytics Panel
* **Purpose:** To measure the impact of the AI CMO's work.
* **Main components:** Five dedicated tabs:
  1. **SEO:** Overall search health, Core Web Vitals, top issues.
  2. **Links:** Backlink profile, referring domains, link health.
  3. **GEO:** Brand visibility in ChatGPT, Perplexity, AI Overviews.
  4. **Technical:** Page timing, render-blocking resources.
  5. **Traffic:** GA4 and Search Console data (sessions, clicks, impressions).
* **Primary user action:** Reviewing metrics.
* **Information shown:** ROI data, charts, and health scores.
* **Inputs:** OAuth connections to Google Analytics / Search Console.
* **Outputs:** Data visualizations.
* **Navigation relationship:** Dashboard sidebar.
* **Evidence URL:** https://okara.ai/docs/dashboard/analytics/overview

### 1.5 Talk to AI CMO
* **Screen/page name:** Talk to AI CMO
* **Purpose:** A chat interface for direct Q&A with the agent.
* **Main components:** Chat window.
* **Primary user action:** Asking questions or requesting a daily rundown.
* **Information shown:** Chat history, conversational summaries.
* **Inputs:** Text queries.
* **Outputs:** AI responses based on the Company Panel context and Analytics data.
* **Navigation relationship:** Dashboard sidebar.
* **Important UX patterns:** Natural language interface for querying complex analytics or strategy questions.
* **Evidence URL:** https://okara.ai/docs/dashboard/talk-to-ai-cmo

### 1.6 External Integrations (Headless UX)
* **Screen/page name:** WhatsApp / Telegram / Slack integrations
* **Purpose:** Zero-friction approvals without logging into the dashboard.
* **Main components:** Push notifications within standard messaging apps.
* **Primary user action:** Read the draft in chat, reply to approve.
* **Important UX patterns:** Push-based UX. The product comes to the user.
* **Evidence URL:** https://okara.ai/docs/integrations/whatsapp.md

---

## 2. Reconstructed Information Architecture (IA)

Based on the actual documentation, the precise logical site map for the Okara logged-in experience is:

```text
Dashboard
├── 💻 AI CMO Terminal
│   └── Live Activity Feed (System Logs)
│
├── 🏢 Company
│   ├── Your Profile (Company name, URL, description, audience, competitors)
│   └── Strategy Documents
│       ├── Product Information
│       ├── Marketing Strategy
│       ├── Competitor Analysis
│       └── Brand Voice
│
├── 📊 Analytics
│   ├── SEO (Health, Core Web Vitals, Issues)
│   ├── Links (Backlinks, Referring Domains)
│   ├── GEO (Visibility in ChatGPT/Perplexity)
│   ├── Technical (Page timing, errors)
│   └── Traffic (GA4 & GSC Metrics)
│
├── ✅ Agents Feed
│   ├── Tabs: Current / Archived
│   ├── Action Cards (Publish, Copy, Mark Done)
│   └── ⚙️ Writing Instructions
│       ├── Reddit (Tone, Priority Subreddits, Search Keywords)
│       ├── X (Tone, Topics)
│       ├── LinkedIn (Tone, Format)
│       └── Articles (Audience, Depth, Internal Linking)
│
└── 💬 Talk to AI CMO
    └── Chat Interface

Settings & Features
├── Integrations (CMS, Social, Analytics, Messaging)
├── Multiple Projects (Project Switcher)
├── Team Sharing (Invites)
└── Localization (UI Language settings)
```
