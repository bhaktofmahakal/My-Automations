# My-Automations

Production-grade library of n8n-first automations, voice agents, and browser scripts maintained by utsav mishra (utsavmishraa005@gmail.com).

## Who this is for
- Builders and ops teams shipping internal automation fast
- Founders needing repeatable lead-gen and outreach playbooks
- Engineers who want ready-to-import n8n workflows and setup notes

## Repository layout
- `automations/<slug>/` — one folder per automation (workflow.json + docs + env.example + assets)
- `docs/platform-setup/` — platform-specific setup guides (n8n)
- `docs/conventions.md` — naming, versioning, secrets, change control
- `docs/troubleshooting.md` — common fixes
- `docs/guides/` — extra how-to guides converted from PDFs
- `templates/` — reusable doc templates
- `tools/maintenance/` — utility scripts (legacy fix helpers)

## Automation catalog
- ai-avatar-trending-news
- australian-broker-scraper
- cold-email-agent-v1
- cold-email-agent-v2
- deep-multiline-icebreaker
- google-maps-lead-scraper
- meeting-research-outreach
- google-maps-research-agent
- job-finder-automation
- lead-generation-outreach
- lead-qualification-basic
- lead-qualification-status-update
- linkedin-lead-scraper
- master-social-scraper
- sales-assistant-build
- telegram-lead-gen-apify
- triforce-hr-voice-agent
- triforce-hr-voice-agent-v2
- triforce-retell-ai-connection
- veo3-ads-making
- wellfound-auto-apply

## How to use an automation
1. Pick a folder under `automations/`.
2. Read `README.md` for intent and flow.
3. Copy `env.example` → `.env` (or map secrets in platform credentials).
4. Follow `setup.md` to import `workflow.json` **without editing it**.
5. Run the smoke test before enabling schedules/webhooks.

## Adding a new automation
- Create `automations/<new-slug>/` with:
  - `workflow.json` (unaltered export)
  - `README.md`, `setup.md`, `env.example`, `assets/`
- Follow `templates/automation-readme.md` and `templates/setup-checklist.md`
- Update cross-links in this README if needed

## Conventions
See `docs/conventions.md` for naming, secret management, and versioning rules.

## Troubleshooting
Common issues and fixes live in `docs/troubleshooting.md`. If stuck, contact utsav mishra (utsavmishraa005@gmail.com).
