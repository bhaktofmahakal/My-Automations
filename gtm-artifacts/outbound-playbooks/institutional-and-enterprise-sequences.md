# Institutional & Enterprise B2B Outbound Playbook

## 🎯 Target Persona & Market
- **Target Persona:** Managing Directors, CFOs, Heads of Fund Operations, VP Operations ($2M–$10M+ ARR / AUM).
- **Target Institutions:** Investment funds, private equity portfolios, corporate advisory firms, institutional wealth managers.
- **Challenge:** High skepticism, strict corporate compliance filters, zero tolerance for pushy sales tactics.
- **Methodology:** Signal-led scraping + Multi-tier waterfall enrichment (Apollo -> Findymail -> NeverBounce) + Permission-based email architecture.

---

## 📬 Institutional Sequence: "Back-Office Operational Drag"

### Step 1: Specific Mandate Trigger
**Subject:** quick question on {{company_name}}'s allocation mandate

```text
Hey {{first_name}},

Noticed {{company_name}} recently expanded your capital allocation focus into {{market_or_sector}}.

Most managing directors I speak with mention that once transaction volume scales, back-office deal due diligence and LP reporting start getting bogged down by manual document reconciliation across spreadsheets.

We recently put together a brief operational case study showing how two similar funds automated this data ingestion layer using Python and custom webhooks—eliminating 15+ hours of weekly administrative drag without hiring extra ops headcount.

Open to a 2-minute read if I drop the breakdown over?

Best regards,
Utsav Mishra
Founder's Office, Growth & Systems
```

#### Breakdown of Why This Works:
- **Zero Pitch:** No mention of pricing, features, or scheduling a call.
- **High Operational Empathy:** Cites the exact bottleneck (reconciling documents across spreadsheets during deal due diligence).
- **The Permission Ask:** *"Open to a 2-minute read if I drop the breakdown over?"* eliminates pressure and consistently produces 12%+ reply rates.

---

### Step 2: The Value Follow-up (Day 5)
**Thread:** Re: quick question on {{company_name}}'s allocation mandate

```text
Hey {{first_name}},

Following up with a quick data point from the case study:

The main bottleneck wasn't finding target assets—it was the 48-hour lag in verifying entity compliance data across multiple regulatory databases before investment committee reviews.

By decoupling the data enrichment pipeline from manual review, the operations team cut turnaround time from 3 days to under 45 minutes.

Happy to share the architectural schematic if your ops team is currently looking at workflow automation this quarter.
```

---

### Step 3: Clean Exit / Professional Sign-Off (Day 10)
**Thread:** Re: quick question on {{company_name}}'s allocation mandate

```text
Hey {{first_name}},

Assuming back-office automation isn't on the priority radar for {{company_name}} this cycle. 

I will step back for now, but feel free to bookmark our automation blueprints here: [Resource Link]

Wishing you and the team continued success with the new fund allocations.
```

---

## 🛠️ Deliverability & Technical Setup Rules
1. **Domain Isolation:** Primary domain (`company.com`) is never used for cold outreach. Outreach runs across isolated secondary domains on Cloudflare.
2. **DNS Alignment:** Strict SPF (staying under the 10 DNS lookup limit), 2048-bit DKIM keys, and DMARC set to `p=reject`.
3. **Inbox Throttling:** Capped at 35–40 sends per inbox per day with randomized 8–15 minute intervals between dispatches.
4. **Waterfall Verification:** Apollo $\rightarrow$ Findymail $\rightarrow$ NeverBounce SMTP handshake verification to ensure bounce rates remain strictly below 1.5%.
