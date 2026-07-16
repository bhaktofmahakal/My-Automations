# 🚀 My-Automations

<p align="center">
  <img src="assets/hero-banner.png" alt="My-Automations Hero" style="width: 100%; max-width: 800px; border-radius: 12px; box-shadow: 0 12px 24px rgba(0,0,0,0.3);" />
</p>

<p align="center">
  <b>The ultimate library of production-grade n8n workflows, voice agents, and browser scripts.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/bhaktofmahakal/My-Automations?style=social" alt="GitHub Stars" /> 
  <img src="https://img.shields.io/github/forks/bhaktofmahakal/My-Automations?style=social" alt="GitHub Forks" /> 
  <img src="https://img.shields.io/badge/automation%20templates-43-blue" alt="Automation Templates" /> 
  <img src="https://img.shields.io/badge/gtm%20agents-203-orange" alt="GTM Agents" /> 
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" /> 
  <img src="https://img.shields.io/github/last-commit/bhaktofmahakal/My-Automations" alt="Last Commit" /> 
</p>

<p align="center">
  <a href="README.md"><img src="https://img.shields.io/badge/English-Click-yellow" alt="English" /></a> | 
  <a href="#"><img src="https://img.shields.io/badge/हिन्दी-क्लिक-orange" alt="हिन्दी" /></a> | 
  <a href="#"><img src="https://img.shields.io/badge/Español-Clic-red" alt="Español" /></a> | 
  <a href="#"><img src="https://img.shields.io/badge/Français-Cliquer-green" alt="Français" /></a>
</p>

<p align="center">
  <a href="https://n8n.io" target="_blank">
    <img src="https://img.shields.io/badge/Try_n8n_Free-Start_Automating-orange?style=for-the-badge" alt="Try n8n Free" />
  </a>
</p>

---

## 📖 Table of Contents

- [💡 What this is](#-what-this-is)
- [🎯 Who this is for](#-who-this-is-for)
- [🏗️ Why n8n?](#️-why-n8n)
- [📊 Repository Statistics](#-repository-statistics)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Automation Catalog](#-automation-catalog)
- [⚡ Quick Start](#-quick-start)
- [🆕 Adding a New Automation](#-adding-a-new-automation)
- [📜 Conventions](#-conventions)
- [📬 Contact](#-contact)

---

## 💡 What this is

The ultimate operating system for agentic GTM, business operations, and automated workflows. It consolidates:
- 🚀 **Native Automations** — 23 modular, production-ready n8n/browser workflows and voice agent scripts.
- 🛠️ **GTM MCP Server & Chrome Extension** — Native Node.js/TypeScript MCP tools to connect HubSpot and sales intelligence straight to Claude Desktop and Cursor.
- 🤖 **GTM Agents Library** — 67 plugins, 203 agents, and 243 skills for Claude, OpenClaw, and next-gen agentic frameworks.
- 📦 **Curated Business templates** — 20 high-value, pre-audited n8n templates solving CRM sync, RAG search, document Q&A, and candidate evaluation.

---

## 🎯 Who this is for

| Persona | Benefit |
| :--- | :--- |
| **🚀 Ops & Growth Teams** | Ready-to-run lead gen, scraping, and qualification workflows. |
| **💼 Founders** | Repeatable cold-email and LinkedIn outreach playbooks. |
| **👨‍💻 Engineers** | Clean n8n JSON exports with documented credentials and edge cases. |

---

## 🏗️ Why n8n?

[n8n](https://n8n.io) is the world's most powerful low-code tool for workflow automation. It allows you to:
- **Self-host** for complete data privacy and security.
- **Connect 400+ apps** including OpenAI, Google Sheets, and Slack.
- **Write custom Code** (JS/Python) when nodes aren't enough.
- **Scale indefinitely** with its powerful visual editor.

---

## 📊 Repository Statistics

- **22+ Automation Templates** across 7 specialized categories.
- **AI Integrations**: OpenAI GPT-4o, Google Gemini, DeepSeek, LangChain.
- **Voice Capabilities**: Retell AI & VAPI for human-like phone interactions.
- **Data Stores**: Google Sheets, Airtable, PostgreSQL.
- **Communication**: Gmail, Telegram, Slack, SMTP.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white" />
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  <img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" />
</p>

---

## 📦 Automation Catalog

### 🔍 Lead Generation & Scraping
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [google-maps-lead-scraper](automations/google-maps-lead-scraper/) | Manual / scheduled | Google Maps API, Apify, Google Sheets |
| [google-maps-research-agent](automations/google-maps-research-agent/) | Chat message | Google Maps, Google Gemini, LangChain, Google Sheets |
| [australian-broker-scraper](automations/australian-broker-scraper/) | Scheduled | Google Sheets, Slack |
| [linkedin-lead-scraper](automations/linkedin-lead-scraper/) | Scheduled / manual | LinkedIn, OpenRouter, Google Sheets |
| [master-social-scraper](automations/master-social-scraper/) | Google Sheets trigger | OpenAI, Google Sheets |
| [telegram-lead-gen-apify](automations/telegram-lead-gen-apify/) | Scheduled | Apify, OpenAI, Telegram, Google Sheets |

### 📧 Cold Outreach & Email
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [human-in-the-loop-email-response](automations/human-in-the-loop-email-response/) | Email received | IMAP, SMTP, OpenAI, GPT-4o-mini |
| [cold-email-agent-v1](automations/cold-email-agent-v1/) | Scheduled | Gmail, OpenAI, Tavily, Google Sheets |
| [cold-email-agent-v2](automations/cold-email-agent-v2/) | Scheduled | Gmail, OpenAI, Google Sheets |
| [deep-multiline-icebreaker](automations/deep-multiline-icebreaker/) | Manual / scheduled | OpenAI, Google Sheets |
| [meeting-research-outreach](automations/meeting-research-outreach/) | Manual / scheduled | Groq, Tavily, Google Sheets |

### ✅ Lead Qualification & CRM
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [lead-qualification-basic](automations/lead-qualification-basic/) | Calendly webhook | VAPI, Calendly, Google Sheets |
| [lead-qualification-status-update](automations/lead-qualification-status-update/) | Calendly webhook | VAPI, Calendly, Google Sheets |
| [lead-generation-outreach](automations/lead-generation-outreach/) | Manual / scheduled | OpenAI, Google Sheets |

### 🤝 Sales & Assistants
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [sales-assistant-build](automations/sales-assistant-build/) | Manual / webhook | OpenAI, Google Sheets |

### 🗣️ Voice Agents
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [triforce-hr-voice-agent](automations/triforce-hr-voice-agent/) | Inbound / outbound call | Retell AI |
| [triforce-hr-voice-agent-v2](automations/triforce-hr-voice-agent-v2/) | Inbound / outbound call | Retell AI |
| [triforce-retell-ai-connection](automations/triforce-retell-ai-connection/) | Voice call / API event | Retell AI, Google Sheets |

### 🎨 AI Content & Ads
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [social-media-auto-poster](automations/social-media-auto-poster/) | Telegram received | Blotato, OpenAI, Google Sheets |
| [ai-avatar-trending-news](automations/ai-avatar-trending-news/) | Scheduled | OpenAI |
| [veo3-ads-making](automations/veo3-ads-making/) | Manual / scheduled | OpenAI, Telegram |

### 🕵️ Job Hunting & Browser Scripts
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [job-finder-automation](automations/job-finder-automation/) | Scheduled | OpenRouter, Google Sheets |
| [wellfound-auto-apply](automations/wellfound-auto-apply/) | Manual (browser console) | Browser JS |
| [SOP/Resume](https://github.com/bhaktofmahakal/sop-agent) | Semi (Web) | Web |

---

### 🛠️ GTM MCP Server & Chrome Extension
* **[GTM MCP Server](gtm/mcp-server/)** — TypeScript-based MCP server providing verified tools for HubSpot and lead enrichment.
* **[Chrome Extension](gtm/extension/)** — Extension for live signal detection and direct workflow triggering.
* **[GTM Agents & Plugins](gtm-agents/)** — 67 plugins and 243 skills for Claude, OpenClaw, and AgentRQ.

---

### 📦  Business n8n Templates
high-leverage n8n templates inside [n8n-templates](n8n-templates/):

| File | Category / Use Case | Key Integrations |
| :--- | :--- | :--- |
| [Human-in-the-Loop Email Response](n8n-templates/A%20Very%20Simple%20_Human%20in%20the%20Loop_%20Email%20Response%20System%20Using%20AI%20and%20IMAP.json) | Customer Support / Email | IMAP, SMTP, OpenAI |
| [Microsoft Outlook AI Email Assistant](n8n-templates/Microsoft%20Outlook%20AI%20Email%20Assistant%20with%20contact%20support%20from%20Monday%20and%20Airtable.json) | Ops / CRM Synchronization | Monday.com, Airtable, Outlook |
| [LeadPilot Lite - Cold Email Writer](n8n-templates/LeadPilot%20Lite%20-%20AI%20Cold%20Email%20Writer.json) | GTM / Outbound | Gmail, Google Sheets, OpenAI |
| [AI Agent to chat with Supabase/Postgres DB](n8n-templates/AI%20Agent%20to%20chat%20with%20Supabase_PostgreSQL%20DB.json) | Database / Data Operations | Postgres, Supabase, OpenAI |
| [AI Web Researcher for Sales](n8n-templates/AI%20web%20researcher%20for%20sales.json) | Sales Intelligence / Enrichment | Tavily, Jina, OpenAI |
| [Ask Human for Help Fallback](n8n-templates/Ask%20a%20human%20for%20help%20when%20the%20AI%20doesn_t%20know%20the%20answer.json) | Exception Handling | Slack, OpenAI |
| [Automate Support Issue Resolution](n8n-templates/Automate%20Customer%20Support%20Issue%20Resolution%20using%20AI%20Text%20Classifier.json) | Support / Ticketing | Zendesk/Linear, OpenAI |
| [DeepSeek V3 Chat & R1 Reasoning](n8n-templates/🐋DeepSeek%20V3%20Chat%20&%20R1%20Reasoning%20Quick%20Start.json) | Reasoning Agents | DeepSeek API |
| [Automate LinkedIn Outreach](n8n-templates/Automate%20LinkedIn%20Outreach%20with%20Notion%20and%20OpenAI.json) | Outbound Sales | Notion, LinkedIn |
| [WhatsApp Business RAG Chatbot](n8n-templates/Complete%20business%20WhatsApp%20AI-Powered%20RAG%20Chatbot%20using%20OpenAI.json) | Customer Support / Chat | WhatsApp, Supabase, OpenAI |
| [vAssistant for HubSpot Chat](n8n-templates/vAssistant%20for%20Hubspot%20Chat%20using%20OpenAi%20and%20Airtable.json) | CRM / Customer Service | HubSpot, Airtable, OpenAI |
| [CV Screening with OpenAI](n8n-templates/CV%20Screening%20with%20OpenAI.json) | HR / Recruitment | Google Sheets, OpenAI |


---

## ⚡ Quick Start

1. **Pick an Automation**: Browse the catalog above.
2. **Setup Credentials**: Copy `env.example` to `.env` and fill placeholders.
3. **Import JSON**: Drag `workflow.json` into your n8n canvas.
4. **Smoke Test**: Run a test execution as described in the local `setup.md`.

> ⚠️ **Pro Tip**: Never edit the `workflow.json` file manually. Import it first, then configure settings inside n8n.

---

## 📬 Contact

**Utsav Mishra** — [utsavmishraa005@gmail.com](mailto:utsavmishraa005@gmail.com)

---
<p align="center">
  Built with ❤️ for the Automation Community.
</p>
