# My-Automations

> Import-ready n8n workflows, voice agents, and browser scripts — built and maintained by [Utsav Mishra](mailto:utsavmishraa005@gmail.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Automations](https://img.shields.io/badge/automations-21-blue)](#automation-catalog)
[![Platform](https://img.shields.io/badge/platform-n8n%20%7C%20Retell%20AI%20%7C%20Browser-orange)](#tech-stack)
[![Maintained](https://img.shields.io/badge/maintained-yes-brightgreen)](#contact)

---

## Table of Contents

- [What this is](#what-this-is)
- [Who this is for](#who-this-is-for)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Automation catalog](#automation-catalog)
- [Quick start](#quick-start)
- [Adding a new automation](#adding-a-new-automation)
- [Conventions](#conventions)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

---

## What this is

A curated, deployment-ready collection of 21 automations covering lead generation, cold outreach, voice-based screening, AI content creation, and job hunting. Every automation ships with:

- `workflow.json` — unaltered export ready to import
- `setup.md` — step-by-step import and smoke-test guide
- `env.example` — all required secrets listed with placeholders
- `README.md` — intent, flow, credentials, failure modes, and ops runbook

---

## Who this is for

| Persona | What you get |
|---|---|
| **Ops & growth teams** | Ready-to-run lead gen, scraping, and qualification workflows |
| **Founders** | Repeatable cold-email and LinkedIn outreach playbooks |
| **Engineers** | Clean n8n JSON exports with documented credentials and edge cases |

---

## Tech stack

| Category | Tools |
|---|---|
| **Automation platform** | [n8n](https://n8n.io) |
| **AI / LLMs** | OpenAI, Google Gemini, Groq, OpenRouter, Tavily |
| **CRM / data** | Google Sheets |
| **Outreach** | Gmail, Telegram, Slack |
| **Scraping** | Apify, Google Maps API |
| **Lead enrichment** | LinkedIn, OpenRouter |
| **Voice agents** | Retell AI, VAPI |
| **Scheduling** | Calendly |
| **Browser scripts** | Vanilla JS |

---

## Repository layout

```
My-Automations/
├── automations/<slug>/         # one folder per automation
│   ├── workflow.json           # unaltered n8n/platform export
│   ├── README.md               # intent, flow, credentials, runbook
│   ├── setup.md                # import + smoke-test steps
│   ├── env.example             # placeholder secrets
│   └── assets/                 # screenshots, PDFs
├── docs/
│   ├── conventions.md          # naming, versioning, secret management
│   ├── troubleshooting.md      # common fixes across all automations
│   ├── platform-setup/         # platform-specific setup guides (n8n)
│   └── guides/                 # additional how-to guides
├── templates/                  # reusable README and checklist templates
└── tools/maintenance/          # utility scripts
```

---

## Automation catalog

### Lead Generation & Scraping

| Automation | Trigger | Key integrations |
|---|---|---|
| [google-maps-lead-scraper](automations/google-maps-lead-scraper/) | Manual / scheduled | Google Maps API, Apify, Google Sheets |
| [google-maps-research-agent](automations/google-maps-research-agent/) | Chat message | Google Maps, Google Gemini, LangChain, Google Sheets |
| [australian-broker-scraper](automations/australian-broker-scraper/) | Scheduled | Google Sheets, Slack |
| [linkedin-lead-scraper](automations/linkedin-lead-scraper/) | Scheduled / manual | LinkedIn, OpenRouter, Google Sheets |
| [master-social-scraper](automations/master-social-scraper/) | Google Sheets trigger | OpenAI, Google Sheets |
| [telegram-lead-gen-apify](automations/telegram-lead-gen-apify/) | Scheduled | Apify, OpenAI, Telegram, Google Sheets |

### Cold Outreach & Email

| Automation | Trigger | Key integrations |
|---|---|---|
| [cold-email-agent-v1](automations/cold-email-agent-v1/) | Scheduled | Gmail, OpenAI, Tavily, Google Sheets |
| [cold-email-agent-v2](automations/cold-email-agent-v2/) | Scheduled | Gmail, OpenAI, Google Sheets |
| [deep-multiline-icebreaker](automations/deep-multiline-icebreaker/) | Manual / scheduled | OpenAI, Google Sheets |
| [meeting-research-outreach](automations/meeting-research-outreach/) | Manual / scheduled | Groq, Tavily, Google Sheets |

### Lead Qualification & CRM

| Automation | Trigger | Key integrations |
|---|---|---|
| [lead-qualification-basic](automations/lead-qualification-basic/) | Calendly webhook | VAPI, Calendly, Google Sheets |
| [lead-qualification-status-update](automations/lead-qualification-status-update/) | Calendly webhook | VAPI, Calendly, Google Sheets |
| [lead-generation-outreach](automations/lead-generation-outreach/) | Manual / scheduled | OpenAI, Google Sheets |

### Sales & Assistants

| Automation | Trigger | Key integrations |
|---|---|---|
| [sales-assistant-build](automations/sales-assistant-build/) | Manual / webhook | OpenAI, Google Sheets |

### Voice Agents

| Automation | Trigger | Key integrations |
|---|---|---|
| [triforce-hr-voice-agent](automations/triforce-hr-voice-agent/) | Inbound / outbound call | Retell AI |
| [triforce-hr-voice-agent-v2](automations/triforce-hr-voice-agent-v2/) | Inbound / outbound call | Retell AI |
| [triforce-retell-ai-connection](automations/triforce-retell-ai-connection/) | Voice call / API event | Retell AI, Google Sheets |

### AI Content & Ads

| Automation | Trigger | Key integrations |
|---|---|---|
| [ai-avatar-trending-news](automations/ai-avatar-trending-news/) | Scheduled | OpenAI |
| [veo3-ads-making](automations/veo3-ads-making/) | Manual / scheduled | OpenAI, Telegram |

### Job Hunting & Browser Scripts

| Automation | Trigger | Key integrations |
|---|---|---|
| [job-finder-automation](automations/job-finder-automation/) | Scheduled | OpenRouter, Google Sheets |
| [wellfound-auto-apply](automations/wellfound-auto-apply/) | Manual (browser console) | Browser JS |

---

## Quick start

```bash
# 1. Pick an automation
cd automations/google-maps-lead-scraper

# 2. Read the intent and setup guide
cat README.md
cat setup.md

# 3. Copy and fill in secrets (never commit real values)
cp env.example .env

# 4. Import workflow.json into n8n — do not edit the file before importing

# 5. Map credentials in n8n, then run the smoke test described in setup.md
```

> **Important:** Never edit `workflow.json` before import. Map all credentials inside the platform after import.

---

## Adding a new automation

1. Create `automations/<new-slug>/` containing:
   - `workflow.json` — unaltered platform export
   - `README.md` — use [`templates/automation-readme.md`](templates/automation-readme.md)
   - `setup.md` — use [`templates/setup-checklist.md`](templates/setup-checklist.md)
   - `env.example` — placeholder secrets only, no real values
   - `assets/` — screenshots or supporting files
2. Follow [`docs/conventions.md`](docs/conventions.md) for naming and versioning rules.
3. Add a row to the appropriate catalog table in this README.

---

## Conventions

See [`docs/conventions.md`](docs/conventions.md) for:

- Folder and file naming rules (kebab-case slugs)
- Secret management — never commit real secrets; use `env.example` placeholders
- Versioning and archiving workflow exports
- Contribution checklist before opening a PR

---

## Troubleshooting

Common fixes for import errors, credential issues, webhook signature failures, and voice agent problems are documented in [`docs/troubleshooting.md`](docs/troubleshooting.md).

---

## Contact

**Utsav Mishra** — [utsavmishraa005@gmail.com](mailto:utsavmishraa005@gmail.com)
