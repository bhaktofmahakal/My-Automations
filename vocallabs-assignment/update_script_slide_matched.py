import os

script_content = """# 5-Minute Video Submission Script & Screen Recording Guide

**Candidate**: Utsav Mishra  
**Target Duration**: 4 Minutes 30 Seconds (Max 5 Minutes)  
**Recording Mode**: Screen Share (showing `vocallabs_ops_presentation.pptx` or `.pdf`) + Face Camera Bubble in Corner (Loom / Zoom / OBS)

---

## 🎬 Slide-by-Slide Screen Recording Matrix

```text
┌───────────┬──────────────────────────────────┬────────────────────────────────────────────────────────┐
│ TIMESTAMP │ ONSCREEN SLIDE TO SHOW           │ WHAT YOU SAY (WORD-FOR-WORD SCRIPT)                    │
├───────────┼──────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 0:00-0:45 │ Slide 1: Cover Slide & KPIs      │ • Intro + Utsav's PPR Capital & Gaprio Labs AI/MCP     │
│           │ (vocallabs_ops_presentation.pptx)│   background + Mritunjoy's "Ours ship" hook.           │
├───────────┼──────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 0:45-2:00 │ Slide 2 & 3: Q1 Crisis Protocol  │ • Q1: 48h Telemetry audit (STT WER, sub-400ms latency),│
│           │ (vocallabs_ops_presentation.pptx)│   120m SLA update, 50% credit SLA, C-Suite summit.     │
├───────────┼──────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 2:00-3:15 │ Slide 4 & 5: Q2 Budget & Time    │ • Q2: INR 1 Cr Split (40% GTM, 35% Dev/MCP) &          │
│           │ (vocallabs_ops_presentation.pptx)│   40/30/20/10 weekly capacity ratio.                   │
├───────────┼──────────────────────────────────┼────────────────────────────────────────────────────────┤
│ 3:15-4:30 │ Slide 6: Q3 Candidate Pitch      │ • Q3: 10/10 Candidate Pitch & Final Founder Ask.       │
│           │ (vocallabs_ops_presentation.pptx)│   ("If you want an intern to format slides for 3 mos...")│
└───────────┴──────────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🎙️ Teleprompter Script (Word-for-Word for Utsav)

### Section 1: Intro, Past Experience & Hook (0:00 - 0:45)
*(Show **Slide 1: Cover & KPI Blocks** on screen. Face camera bubble visible in corner. Confident, energetic delivery.)*

> "Hi Mritunjoy, Rag, and Nileesh. I’m submitting this video for the Founder’s Office position at Vocallabs.
>
> **My Background**: I’m Utsav Mishra. Most recently, I operated as a **Founder’s Office Associate at PPR Capital**, where I built and managed the founder's entire outbound GTM stack across 15+ domains using Clay, n8n, and HubSpot—generating pipeline with VP-level decision-makers. Currently as an **Applied AI Engineer at Gaprio Labs**, I architect AI agent infrastructure, RAG pipelines, and toolcalling workflows—even building custom **Model Context Protocol (MCP) servers** for Claude Code and Cursor.
>
> Going into this assignment, I knew one thing for certain: Vocallabs isn't looking for generic case studies or theoretical slide decks. Mritunjoy has stated publicly that 'Founder's Office' is one of the most abused titles in Indian startups because interns spend 3 months making decks nobody reads. Your team ships. So for this assignment, I shipped.
>
> I’ve built a 48-hour client turnaround playbook, an INR 1 Crore capital deployment model, a 10/10 candidate assessment, two widescreen PPTX decks, visual telemetry charts—and I recognized that this very platform, **Hiringg**, is your own dogfooded AI hiring engine."

---

### Section 2: Q1 — 48-Hour Client Crisis Escalation (0:45 - 2:00)
*(Switch screen to **Slide 2 & Slide 3**)*

> "Let’s start with Question 1: A key enterprise BPO white-label client calls in frustrated because results fall short and they're hinting at non-renewal.
>
> **In the first 2 hours**, I don't send excuses. I pull live telemetry from VocalStack Voice. I audit Speech-to-Text Word Error Rate, LLM reasoning latency, and SIP carrier packet loss. Within 120 minutes, I send a direct SLA update to their VP of Operations promising a full root-cause breakdown by 4:00 PM.
>
> **By Hour 12**, I loop in our AI Voice Architect and Solutions team. We fine-tune our STT acoustic dictionary with 200 domain-specific keywords for regional accents, prune system prompt context windows to bring latency under 400 milliseconds, and deploy secondary SIP failovers.
>
> **By Hour 24**, I brief the co-founders and structure a **30-Day Performance Guarantee**: if their connection-to-conversion metrics don't improve by 25% within 14 days, we credit 50% of their infrastructure runtime fees.
>
> **By Hour 48**, I lead the client C-suite summit. I present transparent telemetry logs, demonstrate our optimized VocalStack pipeline running live at sub-400ms latency, and lock in a weekly joint steering committee. We turn a churn risk into a long-term enterprise renewal."

---

### Section 3: Q2 — INR 1 Crore Capital & Weekly Prioritization (2:00 - 3:15)
*(Switch screen to **Slide 4 & Slide 5**)*

> "Moving to Question 2: How I run an **INR 1 Crore budget** and structure my week.
>
> I divide the INR 1 Crore into 4 high-leverage pillars:
> 1. **40% (INR 40 Lakhs)** goes into the **Partner Acquisition Engine**—targeting BPOs and agencies across India, US, and MENA, including funding their first 10,000 call minutes to eliminate onboarding friction.
> 2. **35% (INR 35 Lakhs)** goes into our **Developer & Open-Source Moat**—funding contributor grants for VocalFlow OS and PocoDisk, and building production MCP Servers so developers using Claude and Cursor natively invoke Vocallabs.
> 3. **15% (INR 15 Lakhs)** funds **Global Telephony Infrastructure**—deploying edge relay nodes in Mumbai, US, and EU for sub-300ms voice pipelines.
> 4. **10% (INR 10 Lakhs)** is held as my **Founder's Office Reserve** for account retention and quick-strike micro-experiments.
>
> **My weekly operating prioritization ratio**:
> - **40% (~18 hrs/wk)**: Partner acquisition and closing BPO reseller deals.
> - **30% (~14 hrs/wk)**: Product and engineering syncs—including testing VocalStack releases and dogfooding internal tools like Hiringg.
> - **20% (~9 hrs/wk)**: Account health monitoring and zero-churn retention.
> - **10% (~4 hrs/wk)**: Executive metrics dashboards and co-founder alignment."

---

### Section 4: Q3 — Candidate Positioning & 10/10 Pitch (3:15 - 4:30)
*(Switch screen to **Slide 6**)*

> "Finally, Question 3: Why am I a **10/10 match** for this role?
>
> I rank myself 10/10 because I am an execution partner who ships. Having run GTM stacks at PPR Capital and built MCP agent servers at Gaprio Labs, I combine technical understanding of audio pipelines, latency, and MCP architecture with the business acumen to negotiate gross-margin arbitrage with BPO founders.
>
> I operate with zero hand-holding. While standard applicants submit short text blurbs, I delivered a complete suite of strategy playbooks, visual telemetry charts, two widescreen PPTX decks, and this video pitch.
>
> If you want an intern to format slide decks for 3 months, hire someone else. If you want an execution partner who runs beside you at 100 miles per hour from Day 1, let's get to work. Thank you."

---

## 🎥 Recording Checklist for Utsav
- [ ] **Loom Setup**: Open `vocallabs_ops_presentation.pptx` (or `.pdf`) in full screen. Set Loom to "Screen + Cam".
- [ ] **Slide Transitions**: Press right arrow key at 0:45, 2:00, and 3:15 timestamps.
- [ ] **Audio & Pace**: Speak clearly at ~140 words per minute. Target total duration: 4:30.
"""

file1 = r"u:\My-Automations\vocallabs-assignment\04_video_script\video_script_5min.md"
file2 = r"u:\My-Automations\vocallabs-assignment\Vocallabs_Founders_Office_Utsav\1_Video_Submission\Video_Script_and_Transcript.md"

with open(file1, "w", encoding="utf-8") as f:
    f.write(script_content)

with open(file2, "w", encoding="utf-8") as f:
    f.write(script_content)

print("[SCRIPT UPDATED & MATCHED PERFECTLY]")
