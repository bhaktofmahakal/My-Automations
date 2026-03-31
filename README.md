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
  <img src="https://img.shields.io/badge/templates-22-blue" alt="Templates" /> 
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" /> 
  <img src="https://img.shields.io/github/last-commit/bhaktofmahakal/My-Automations" alt="Last Commit" /> 
  <img src="https://img.shields.io/badge/maintained-yes-brightgreen" alt="Maintained" />
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

A curated, deployment-ready collection of **22 automations** covering lead generation, cold outreach, voice-based screening, AI content creation, and job hunting. Every automation is modular and ships with:

- ✅ **`workflow.json`** — Unaltered export ready for instant import.
- ✅ **`setup.md`** — Step-by-step guide for deployment and smoke-testing.
- ✅ **`env.example`** — Pre-configured environment variables and secret placeholders.
- ✅ **`README.md`** — Detailed documentation on intent, flow, and operations.

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
| [ai-avatar-trending-news](automations/ai-avatar-trending-news/) | Scheduled | OpenAI |
| [veo3-ads-making](automations/veo3-ads-making/) | Manual / scheduled | OpenAI, Telegram |

### 🕵️ Job Hunting & Browser Scripts
| Automation | Trigger | Key Integrations |
| :--- | :--- | :--- |
| [job-finder-automation](automations/job-finder-automation/) | Scheduled | OpenRouter, Google Sheets |
| [wellfound-auto-apply](automations/wellfound-auto-apply/) | Manual (browser console) | Browser JS |

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
