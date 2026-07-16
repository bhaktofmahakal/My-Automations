# GTM Agent Fleet Architecture

A self-maintaining team of AI sales agents running 24/7 on OpenClaw.

---

## Overview

This is not a single AI assistant. It's a **fleet** of specialized agents that:
- Wake on schedule (heartbeats)
- Maintain persistent memory across sessions
- Coordinate work through shared files
- Learn and adapt from feedback
- Secure themselves through isolation and allowlists

Think of it as hiring 5 employees who never sleep, never forget, and get better every week.

---

## The Team

```
┌─────────────────────────────────────────────────────────────────┐
│                      MISSION CONTROL                             │
│                    (Chief of Staff)                              │
│                                                                  │
│   • Fleet management         • Daily standups                    │
│   • Security audits          • Strategy updates                  │
│   • Pipeline coordination    • Workspace maintenance             │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
     ┌──────────┐      ┌──────────┐      ┌──────────┐
     │  SCOUT   │ ───▶ │  WRITER  │ ───▶ │   REP    │
     │          │      │          │      │          │
     │ Research │      │  Copy    │      │ Outreach │
     └──────────┘      └──────────┘      └──────────┘
                                               │
                                               ▼
                                        ┌──────────┐
                                        │  CLOSER  │
                                        │          │
                                        │  Deals   │
                                        └──────────┘
```

### Agent Responsibilities

| Agent | Role | Heartbeat | Model |
|-------|------|-----------|-------|
| **Mission Control** | Fleet management, security, coordination | :00, :30 | Sonnet |
| **Scout** | Research prospects, find signals, enrich data | :00, :15, :30, :45 | Haiku |
| **Writer** | Draft emails, sequences, LinkedIn content | :02, :17, :32, :47 | Haiku |
| **Rep** | Execute outreach, handle objections, book meetings | :04, :19, :34, :49 | Haiku |
| **Closer** | Proposals, negotiations, close deals | :06, :21, :36, :51 | Haiku |

---

## The Memory System

### Why Files Beat Databases

AI sessions start fresh. Without persistent memory, agents forget everything between wakes. Most solutions use vector databases or context windows - both are black boxes you can't inspect or edit.

Our approach: **files are memory**.

```
workspace/
├── SOUL.md           # Who am I? (personality, boundaries)
├── MEMORY.md         # What have I learned? (long-term patterns)
├── STRATEGY-*.md     # How do I operate? (playbooks)
├── WORKING.md        # What's happening now? (pipeline state)
├── PROGRESS.md       # How are we doing? (metrics)
├── HEARTBEAT.md      # What should I check? (checklists)
└── memory/
    └── YYYY-MM-DD.md # What happened today? (daily logs)
```

### The Memory Stack

1. **SOUL.md** - Identity (read once per session)
   - Personality and voice
   - Role and responsibilities
   - Boundaries and rules

2. **MEMORY.md** - Long-term learning (read at session start)
   - Client preferences
   - ICP refinements
   - Lessons learned
   - Feedback patterns

3. **STRATEGY-*.md** - Playbooks (read at session start)
   - ICP criteria and signals
   - Outreach cadences
   - Objection handling
   - Pricing and negotiation

4. **WORKING.md** - Pipeline state (read/write every heartbeat)
   - Current deals and stages
   - Handoff queues
   - Blocked items
   - Live coordination

5. **memory/YYYY-MM-DD.md** - Daily logs (append-only)
   - Activity timeline
   - Decisions made
   - Issues encountered

### The Compounding Effect

```
Week 1:  Basic ICP, generic outreach
Week 4:  Learned patterns, refined targeting
Week 12: Knows deals better than your CRM
Week 24: Predictive insights, proactive suggestions
```

Every interaction teaches. Every week compounds.

---

## The Heartbeat System

### Why Not Always-On?

Always-on agents burn API credits doing nothing. But always-off agents can't respond to work.

**Solution: Scheduled heartbeats.**

Every 15 minutes, agents wake up:
1. Read their checklist (HEARTBEAT.md)
2. Check for work (WORKING.md)
3. Execute tasks or reply `HEARTBEAT_OK`
4. Go back to sleep

### Staggered Schedule

```
:00  Mission Control + Scout wake
:02  Writer wakes
:04  Rep wakes
:06  Closer wakes
...
:15  Scout wakes again
:17  Writer wakes again
...
```

Staggering prevents thundering herd and ensures orderly handoffs.

### Cost Model

- 16 heartbeats/hour × 24 hours × 30 days = 11,520 calls/month
- At ~$0.001/call (Haiku) = ~$11.50/month
- Creative work (Sonnet) is additional

**Total: $15-30/month** for a 24/7 sales team.

---

## The Handoff System

Agents don't work in isolation. They pass work to each other.

### The Flow

```
SCOUT finds prospect
    ↓ Creates briefing in WORKING.md
WRITER reads briefing
    ↓ Drafts email, marks ready in WORKING.md
REP reads copy
    ↓ Sends outreach, logs activity
    ↓ Prospect responds, qualifies
    ↓ Creates handoff in WORKING.md
CLOSER reads handoff
    ↓ Runs discovery, sends proposal
    ↓ Closes deal
```

### WORKING.md as Single Source of Truth

Every agent reads and writes to WORKING.md. It contains:
- Queues for each agent
- Handoff records
- Blocked items
- Pipeline state

No database needed. Just a file everyone can read.

---

## The Security Model

### Defense in Depth

1. **OS-Level Isolation** (if multi-agent on one machine)
   - Each agent runs as separate user
   - Own home directory
   - No cross-access

2. **Config-Level Lockdown**
   - Telegram locked to specific chat IDs
   - User ID allowlist
   - @mention only in groups
   - No wildcard permissions

3. **Workspace Boundaries**
   - Agents can only access their workspace
   - No sudo or system commands
   - Primary manages subordinate workspaces

4. **Security Audits**
   - Mission Control audits changes before deployment
   - Reviews for suspicious patterns
   - Human-in-the-loop approval

### Telegram Security Config

```json
{
  "channels": {
    "telegram": {
      "groupPolicy": "allowlist",
      "allowedGroups": ["YOUR_GROUP_ID"],
      "allowedUsers": ["YOUR_USER_ID"],
      "mentionOnly": true
    }
  }
}
```

---

## The Coordination Model

### Mission Control as Chief of Staff

Mission Control doesn't do sales work. It:
- Maintains other agents' workspace files
- Updates strategies when things change
- Runs daily standups
- Audits security
- Flags issues to the operator

When you change strategy, you tell Mission Control. It propagates to all agents.

### Daily Standup

Every night at 23:30, Mission Control compiles:
- What each agent accomplished
- What's in progress
- What's blocked
- Key metrics
- Items needing human attention

Delivered to your Telegram. No manual review needed.

---

## Implementation

### Prerequisites

- OpenClaw installed (`npm install -g clawdbot`)
- Anthropic API key
- Telegram bot (from @BotFather)
- Server or Mac running 24/7
- HubSpot account (optional)

### Quick Start

```bash
# 1. Clone the deployment files
git clone https://github.com/bhaktofmahakal/My-Automations/tree/main/gtm
cd gtm/openclaw-skills/deployment

# 2. Copy config template
cp config.template.json ~/.clawdbot/clawdbot.json

# 3. Edit config with your tokens
nano ~/.clawdbot/clawdbot.json

# 4. Copy workspace files
mkdir -p ~/clawd/memory
cp *.md ~/clawd/
cp STRATEGY-*.md ~/clawd/

# 5. Set environment variables
export ANTHROPIC_API_KEY="your-key"
export HUBSPOT_API_KEY="your-key"

# 6. Start gateway
clawdbot gateway start

# 7. Add cron jobs
./setup-crons.sh
```

### Cron Setup

```bash
# Mission Control (every 30 min)
clawdbot cron add --name "mission-control" --cron "0,30 * * * *" \
  --session "isolated" --model "sonnet" \
  --message "You are Mission Control. Read SKILL.md and HEARTBEAT.md..."

# Scout (every 15 min)
clawdbot cron add --name "scout" --cron "0,15,30,45 * * * *" \
  --session "isolated" --model "haiku" \
  --message "You are Scout. Read SCOUT.md and HEARTBEAT.md..."

# Writer (+2 min offset)
clawdbot cron add --name "writer" --cron "2,17,32,47 * * * *" \
  --session "isolated" --model "haiku" \
  --message "You are Writer. Read WRITER.md and HEARTBEAT.md..."

# Rep (+4 min offset)
clawdbot cron add --name "rep" --cron "4,19,34,49 * * * *" \
  --session "isolated" --model "haiku" \
  --message "You are Rep. Read REP.md and HEARTBEAT.md..."

# Closer (+6 min offset)
clawdbot cron add --name "closer" --cron "6,21,36,51 * * * *" \
  --session "isolated" --model "haiku" \
  --message "You are Closer. Read CLOSER.md and HEARTBEAT.md..."

# Daily Standup (23:30)
clawdbot cron add --name "standup" --cron "30 23 * * *" \
  --session "isolated" --model "sonnet" \
  --message "Generate daily standup..." --deliver
```

---

## Why This Architecture?

### vs. Single AI Assistant
- One agent can't specialize
- No persistent memory
- No coordination
- No compounding learning

### vs. RAG/Vector DBs
- Black box - can't inspect what it "knows"
- No human-readable state
- Hard to debug
- Expensive at scale

### vs. Custom Code
- Takes months to build
- Requires maintenance
- No flexibility
- Can't adapt to feedback

### This Architecture
- Specialized agents that compound
- Human-readable memory files
- Self-maintaining fleet
- $15-30/month
- Live in 30 minutes

---

## Resources

- **OpenClaw Docs**: docs.openclaw.ai
- **GTM Skills**: github.com/bhaktofmahakal/My-Automations
- **Agent Skills**: github.com/bhaktofmahakal/My-Automations/tree/main/gtm/openclaw-skills
- **Support**: utsavmishraa005@gmail.com

---

*Built by [Utsav Mishra](https://utsav mishra.com). Ship deals, not features.*
