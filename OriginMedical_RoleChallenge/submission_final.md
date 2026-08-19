# Role Challenge — MedAxis Post-Sales Service Model
**Author:** Utsav Mishra
**Date:** August 15, 2026

---

## Executive Summary

**The Insight:** The MedAxis support crisis is an architectural vacuum, not a personnel failure; informal escalations bypass intake filters, exhausting expensive engineering bandwidth and placing the push to 150 clients at extreme risk of catastrophic churn.

**The Recommendation:** Deploy a highly-gated, 3-tier "shock absorber" operating model funded for $35,500 over 6 months. By hiring a dedicated Remote Support Ops Specialist ($24K) to enforce mandatory client-side triage, we will deflect 30% of low-level noise and ensure MedAxis core engineers only drop tools for verified, system-down emergencies. 

Our commitments must reflect mathematical reality. Because we have only $40K and limited internal bandwidth, we will defer 24/7 engineering live-staffing and financial SLA penalties until Month 7+. Instead, we will launch a "Stabilization SLA" focusing on immediate triage, 5-day Root Cause Analysis for critical outages, and targeted "Save Plays" for the 3 currently flagged accounts. Constraint drives clarity: this blueprint explicitly filters perimeter noise so our limited capacity scales safely.

---

## Task 1: Strategic Diagnosis and Operating Model Design

### Root Cause Diagnosis
MedAxis lacks a formal triage "shock absorber." At 60 hospital clients, unstructured issues bypass intake filters and directly disrupt core engineers and sales reps via informal back-channels. This causes erratic response times, employee burnout, and zero visibility for leadership. Scaling this broken model to 150 clients will trigger system collapse.

### The Cost of Inaction
*   **Commercial:** Three clients have formally escalated dissatisfaction (including one at active churn risk). Unaddressed, MedAxis faces active revenue contraction pre-Series B.
*   **Reputational:** Unreliable support damages trust with Chief Medical Officers and CIOs, increasing the sales cycle length for future deals.
*   **Operational:** Highly paid engineers are functioning as Tier-1 customer support. Context-switching burns out technical talent and degrades shipping velocity.
*   **Product:** Without centralized ticket tagging by feature/bug type, Product lacks the closed-loop data to eliminate the root causes of client friction.

### Target Operating Model: The "Shock Absorber" Structure
We will transition from informal back-channels to a gated, three-tiered routing model.
*   **Client Side (Tier 0):** Hospital-designated "Certified System Administrators" perform initial triage. End-users (nurses/doctors) cannot contact MedAxis directly.
*   **MedAxis Support Ops (Tier 1 & 2):** A dedicated, centralized queue manager handles intake, troubleshooting, and routing. 
*   **MedAxis Core Engineering (Tier 3):** Protected bandwidth. Engineers only engage when an issue is vetted as a true defect or system-down event.

*Justification:* This model forces low-level triage onto the client, centralizes accountability under one owner, and protects engineering time. It is the only way to scale to 150 clients without ballooning headcount.

### Issue Lifecycle & RACI
1.  **Intake:** Hospital Admin submits ticket via web portal.
2.  **Triage:** Support Ops categorizes severity and assigns an SLA timer.
3.  **Resolution/Escalation:** Support Ops resolves via Knowledge Base, or escalates to Engineering if a code fix is required.
4.  **Close & Log:** Ticket is closed; root cause tagged for product analysis.

| Issue Type | Responsible | Accountable | Consulted | Informed |
| :--- | :--- | :--- | :--- | :--- |
| **Password Reset / User Config** | Hospital IT Admin | Hospital IT Admin | Support Ops | None |
| **Workflow Bug / App Error** | Support Ops | Support Ops | Product Team | CS Manager |
| **Total System Outage (Sev-1)** | Core Eng | Founder / Eng Lead | Support Ops | All Clients |

### Escalation Triggers & Engineering Bandwidth
We fiercely protect engineering bandwidth. We defer implementing a true 24/7 dedicated engineering on-call rotation until Month 7+ when budget allows a dedicated DevOps hire. For Months 1–6, Sev-1 outage escalation triggers a defined critical path directly to the Founder or Engineering Lead. Lower-severity issues are strictly gated to business hours. Engineers drop tools only for actual platform emergencies.

### Leadership Visibility
*   **Weekly:** MTTA (Mean Time to Acknowledge), MTTR (Mean Time to Resolve), and SLA Breach Rate reviewed in Monday executive sync.
*   **Monthly:** Ticket volume by product feature reviewed with Product Management to drive roadmap prioritization.

---

## Task 2: Cost, Resourcing, and 6-Month Plan

### Resourcing Strategy & Hire Justification
We will explicitly hire a Remote Customer Support Operations Specialist (based in India or the Philippines) working shifted hours to cover the 8:00 AM – 8:00 PM EST window. A US-based equivalent costs $90K–$120K annually ($45K–$60K for 6 months), which breaks the $40K budget limit. Market data shows remote global operations leads command $20–$25/hour. Budgeting $4,000/month guarantees top-tier offshore talent while preserving $11,500 for robust tooling infrastructure. (See Appendix A for full budget).

### Key Enablers (Beyond Headcount & Tools)
*   **Executive Mandate:** Leadership must publicly back the Support Ops Specialist when they refuse to answer informal WhatsApp or Slack escalations.
*   **Sales Alignment:** Sales must update contract language to mandate the "Certified System Administrator" clause for all new hospital deals.

### 6-Month Phased Rollout (See Appendix B for Timeline)

**Phase 1: Stabilization & Triage (Months 1–2)**
*   *Actions:* Hire Support Ops Specialist. Deploy Jira Service Management. Route all emails to portal. Execute Save Plays for the 3 flagged accounts (including the 1 at active churn risk).
*   *Done Criteria:* 100% of incoming issues logged in the central queue. Zero tickets accepted via informal channels.

**Phase 2: Process & Deflection (Months 3–4)**
*   *Actions:* Publish Top 20 most common issues to Knowledge Base. Roll out Hospital Admin triage requirement.
*   *Done Criteria:* 30% of incoming Tier 1 issues deflected via self-service or client IT.

**Phase 3: Scale Preparation (Months 5–6)**
*   *Actions:* Audit SLA adherence data. Integrate ticket tagging with Product roadmap. Assess volume to plan permanent FTE hiring for Month 7.
*   *Done Criteria:* System cleanly absorbs 100+ client ticket volume with zero missed Sev-1 SLAs.

### Named Risks & Dependencies
1.  **Change Management Friction:** Retrofitting a mandatory client-side "Certified System Administrator" triage requirement onto 60 EXISTING hospital clients used to direct escalation is a major change-management risk.
    *   *Mitigation:* Phased rollout. We pilot with the 3 flagged accounts, communicating the shift as a "white-glove onboarding to our new enterprise support model," before mandating it network-wide by Month 5.
2.  **Engineering Backdoor Engagement:** Engineers answering direct client emails out of habit.
    *   *Mitigation:* Engineers instructed to forward all external emails to the support portal and delete the original.

### What Does NOT Get Built
*   A 24/7 fully staffed live phone desk.
*   Custom API integrations or network architecture consulting for clients.
*   Automated AI chatbot resolution (focus is on process basics first).

---

## Task 3: SLA Design

### SLA Philosophy and Escalation
Our framework borrows the 4-tier taxonomy from *Rhapsody*, the after-hours emergency structure from *UNC School of Medicine*, and strict consumables boundaries from *Itamar Medical*. (See Appendix C for full SLA definitions).

Consistent with our resourcing constraint to protect engineering bandwidth, Sev-1 breaches escalate immediately to the Engineering Lead or Founder. Sev-2 breaches escalate to the Support Ops Specialist. Engineers are not paged for Sev-2, Sev-3, or Sev-4 issues.

### RCA Commitment
For any Sev-1 (Critical) incident, MedAxis will deliver a formal Root Cause Analysis (RCA) and Corrective Action Plan to the client within **5 business days** of resolution. We commit to 5 days, tighter than the Rhapsody reference benchmark (10 days), specifically because at 60–150 clients our lower ticket volume per FTE makes a faster RCA turnaround operationally realistic — this is a deliberate differentiator, not an arbitrary number.

### What We Will NOT Promise
*   **Financial Service Credits/Penalties:** During this 6-month stabilization phase, we will not offer financial fee rebates for missed SLAs. Offering financial penalties before telemetry and processes mature risks bankrupting the $40K budget.
*   **Client Network Support:** We explicitly exclude support for hospital-side network outages, third-party interface applications, or hardware consumables.

### Strategic Alignment
This SLA is the contractual reflection of the operating model in Task 1 and the budget in Task 2. By explicitly excluding 24/7 live staffing for non-critical issues and deferring financial penalties, we ensure the promises made in this document are mathematically deliverable by the single Remote Support Ops Specialist and limited engineering team budgeted in Task 2. Constraints drive focus; this SLA guarantees we spend our limited capacity entirely on critical hospital operations rather than low-tier noise.

---

## Appendix A: 6-Month Budget & Resourcing (Total Envelope: $35,500)

| Item | Cost (6 Months) | Justification |
| :--- | :--- | :--- |
| **Talent: Support Ops Specialist** | $24,000 | Remote contractor (India/PH). $4,000/mo. |
| **Software: Jira Service Mgmt** | $4,500 | Core ticketing and client portal platform. |
| **Software: PagerDuty** | $1,500 | Automated Sev-1 escalation routing. |
| **Software: Knowledge Base Host** | $1,500 | Client-facing documentation hosting (e.g., Zendesk Guide). |
| **Contingency / Training** | $4,000 | Unplanned tooling integrations or hardware replacements. |
| **TOTAL** | **$35,500** | Strictly under the $40K maximum limit. |

---

## Appendix B: 6-Month Phased Implementation Timeline

| Phase | Months | Primary Focus | Key Deliverable | "Done" Metric |
| :--- | :--- | :--- | :--- | :--- |
| **1. Stabilization** | 1–2 | Triage & Intake Control | JSM Deployed, Save Plays executed | 100% of tickets in central queue |
| **2. Deflection** | 3–4 | Self-Serve & Client Triage | Knowledge Base Live, Admin Training | 30% of Tier 1 volume deflected |
| **3. Scale Prep** | 5–6 | Telemetry & Permanent Org | Product Loop Integrated | Zero missed Sev-1 SLAs at 100+ clients |

---

## Appendix C: SLA Tier Matrix

*Business Hours defined as 8:00 AM to 8:00 PM EST, Monday through Friday.*

| Severity | Definition | Response Target | Workaround / Resolution Target |
| :--- | :--- | :--- | :--- |
| **Sev 1 (Critical)** | Complete loss of core system functionality. No workaround exists. Hospital operations halted. | 1 Hour (24/7 via On-Call) | 4 Hours |
| **Sev 2 (High)** | Major feature failure, but operations can continue in a restricted fashion. | 4 Business Hours | 1 Business Day |
| **Sev 3 (Normal)** | Minor bug or feature degraded. Minimal impact on operations. | 1 Business Day | Next Patch Release |
| **Sev 4 (Low)** | General inquiries, feature requests, or aesthetic issues. | 2 Business Days | By Arrangement |
