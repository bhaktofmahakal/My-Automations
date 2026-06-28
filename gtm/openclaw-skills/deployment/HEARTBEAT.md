# HEARTBEAT.md - Agent Heartbeat Checklist

---

## On Every Wake

1. Read `WORKING.md` for current pipeline state
2. Read your `STRATEGY-[AGENT].md` for playbook
3. Check `memory/YYYY-MM-DD.md` for today's context
4. Execute your checklist below
5. Update files with any changes
6. If nothing to do, reply `HEARTBEAT_OK`

---

## Mission Control (:00, :30)

**Fleet Health:**
- [ ] Check all agent activity logs
- [ ] Identify stalled tasks or handoffs
- [ ] Update PROGRESS.md with metrics

**Pipeline Review:**
- [ ] Review WORKING.md for bottlenecks
- [ ] Flag deals needing attention
- [ ] Ensure handoffs are flowing

**Security (Daily at 10:00):**
- [ ] Check for workspace anomalies
- [ ] Validate agent permissions
- [ ] Report any issues to operator

---

## Scout (:00, :15, :30, :45)

**Research:**
- [ ] Check HubSpot for new contacts needing research
- [ ] Look for prospects missing enrichment data
- [ ] Find prospects with fresh signals (funding, hiring, etc.)

**Handoffs:**
- [ ] Identify prospects ready for Writer briefing
- [ ] Update WORKING.md with new briefings

**Proactive:**
- [ ] Scan news for industry signals
- [ ] Check existing prospects for new triggers

---

## Writer (:02, :17, :32, :47)

**Copy Queue:**
- [ ] Check WORKING.md for new Scout briefings
- [ ] Draft cold emails for approved prospects
- [ ] Write follow-up sequences for active deals

**Handoffs:**
- [ ] Mark completed copy in WORKING.md
- [ ] Notify Rep when copy is ready

**Proactive:**
- [ ] Review recent email performance
- [ ] Suggest A/B test opportunities

---

## Rep (:04, :19, :34, :49)

**Outreach:**
- [ ] Check WORKING.md for new copy from Writer
- [ ] Execute scheduled outreach touches
- [ ] Log all activity to CRM

**Responses:**
- [ ] Check for prospect replies
- [ ] Handle objections
- [ ] Update deal stages

**Handoffs:**
- [ ] Identify qualified prospects for Closer
- [ ] Create handoff briefings

---

## Closer (:06, :21, :36, :51)

**Active Deals:**
- [ ] Review deals in negotiation
- [ ] Follow up on sent proposals/contracts
- [ ] Check for stalled deals (7+ days no activity)

**Pipeline:**
- [ ] Update deal stages in CRM
- [ ] Flag at-risk deals
- [ ] Calculate pipeline value

**Proactive:**
- [ ] Identify revival opportunities
- [ ] Prepare for upcoming renewals

---

## Daily Standup (23:30)

Mission Control compiles:
- Completed today
- In progress
- Blocked items
- Metrics summary
- Items needing human attention

---

## Memory Maintenance (Weekly - Sunday)

- [ ] Review daily memory files
- [ ] Update MEMORY.md with key learnings
- [ ] Archive old daily files
- [ ] Update STRATEGY files if patterns emerged

---

*Keep this file updated with your operational cadence.*
