# GTM Agent Fleet

Five AI agents. One sales team. Running 24/7.

```
┌─────────────────────────────────────────────────────────────────┐
│                      MISSION CONTROL                             │
│                    (Chief of Staff)                              │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐
     │  SCOUT   │ ───▶ │  WRITER  │ ───▶ │   REP    │ ───▶ CLOSER
     │ Research │      │   Copy   │      │ Outreach │      Deals
     └──────────┘      └──────────┘      └──────────┘
```

## The Team

| Agent | Role | Heartbeat | Email |
|-------|------|-----------|-------|
| **Mission Control** | Fleet management, security, coordination | :00, :30 | chief@github.com/bhaktofmahakal/My-Automations |
| **Scout** | Research & Intelligence | :00, :15, :30, :45 | scout@github.com/bhaktofmahakal/My-Automations |
| **Writer** | Sales Copy & Content | :02, :17, :32, :47 | writer@github.com/bhaktofmahakal/My-Automations |
| **Rep** | Outreach & Engagement | :04, :19, :34, :49 | rep@github.com/bhaktofmahakal/My-Automations |
| **Closer** | Deals & Revenue | :06, :21, :36, :51 | closer@github.com/bhaktofmahakal/My-Automations |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/bhaktofmahakal/My-Automations/tree/main/gtm
cd gtm/openclaw-skills/deployment

# 2. Deploy to your server
./setup.sh your-server-ip

# 3. Configure
# Edit ~/.clawdbot/clawdbot.json with your tokens
# Set ANTHROPIC_API_KEY and HUBSPOT_API_KEY

# 4. Start
clawdbot gateway start

# 5. Verify
clawdbot cron list
```

## Architecture

This isn't a single AI assistant. It's a **self-maintaining fleet** that:

- **Wakes on schedule** - Heartbeats every 15 minutes
- **Remembers everything** - Persistent memory in files
- **Coordinates work** - Handoffs through WORKING.md
- **Learns and adapts** - Feedback compounds over time
- **Secures itself** - Telegram lockdown, scoped permissions

**Cost: ~$15-30/month** for a 24/7 sales team.

Read the full architecture: [deployment/ARCHITECTURE.md](deployment/ARCHITECTURE.md)

## File Structure

```
openclaw-skills/
├── mission-control/
│   └── SKILL.md          # Chief of Staff personality
├── scout/
│   └── SKILL.md          # Research agent personality
├── writer/
│   └── SKILL.md          # Copy agent personality
├── rep/
│   └── SKILL.md          # Outreach agent personality
├── closer/
│   └── SKILL.md          # Deals agent personality
└── deployment/
    ├── ARCHITECTURE.md   # Full system documentation
    ├── setup.sh          # Deployment script
    ├── config.template.json  # Secure config template
    ├── MEMORY.md         # Long-term memory template
    ├── STRATEGY-*.md     # Agent playbooks
    ├── HEARTBEAT.md      # Wake checklists
    ├── WORKING.md        # Pipeline state
    └── PROGRESS.md       # Metrics tracking
```

## How It Works

### The Memory System

Files are memory. Human-readable, editable, debuggable.

| File | Purpose |
|------|---------|
| `SOUL.md` | Who am I? (personality) |
| `MEMORY.md` | What have I learned? (patterns) |
| `STRATEGY-*.md` | How do I operate? (playbooks) |
| `WORKING.md` | What's happening now? (pipeline) |
| `PROGRESS.md` | How are we doing? (metrics) |

### The Heartbeat System

Agents wake every 15 minutes, staggered:

```
:00  Mission Control + Scout
:02  Writer
:04  Rep
:06  Closer
```

Each wake: read checklist → check for work → execute or HEARTBEAT_OK → sleep.

### The Handoff System

```
Scout finds prospect → briefing in WORKING.md
Writer reads briefing → drafts email → marks ready
Rep reads copy → sends outreach → qualifies
Closer reads handoff → proposals → closes
```

All coordination through one file. No database needed.

### The Security Model

1. **Telegram lockdown** - Specific chat IDs, user allowlists, @mention only
2. **Workspace isolation** - Agents only access their workspace
3. **Scoped permissions** - No sudo, no system access
4. **Security audits** - Mission Control reviews changes

## Usage

### Talk to them like teammates

```
You: "Find me SaaS companies hiring SDRs"
Scout: "On it. What size? What stage? VP level or Director?"

You: "Series B, VP of Sales"
Scout: "Found 10. Top pick is Sarah Chen at Acme - just raised $25M.
        Want me to brief Writer?"

You → Writer: "Email Sarah"
Writer: "Got the briefing. What tone - direct or challenger?"

[Email written, sent by Rep, meeting booked]

You → Closer: "She wants a proposal"
Closer: "Great. Who else needs to approve? What's the main pain?"
```

### They're proactive

Every agent:
- Asks clarifying questions before acting
- Suggests next steps after delivering
- Flags problems before they become issues
- Never ends without a question or suggestion

## Resources

- **GTM Skills**: [github.com/bhaktofmahakal/My-Automations](https://github.com/bhaktofmahakal/My-Automations)
- **OpenClaw Docs**: [docs.openclaw.ai](https://docs.openclaw.ai)
- **Prompts Library**: [github.com/bhaktofmahakal/My-Automations/prompts](https://github.com/bhaktofmahakal/My-Automations/prompts)
- **Tonalities**: [github.com/bhaktofmahakal/My-Automations/free-tools/tonalities](https://github.com/bhaktofmahakal/My-Automations/free-tools/tonalities)

## Credits

Inspired by [@dr_cintas](https://twitter.com/dr_cintas)'s Mission Control architecture for running multiple AI agents 24/7.

Built by [Utsav Mishra](https://utsavmishra.me). Ship deals, not features.

---

**Scout** finds. **Writer** crafts. **Rep** engages. **Closer** closes. **Mission Control** coordinates.

*What are we working on today?*
