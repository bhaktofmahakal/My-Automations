# ShogunCMO — Product Requirements Document

## Problem Statement
The ShogunAI founding team is executing at an incredible pace on engineering, having recently won the YC "c0mpiled" hackathon. However, as an early-stage startup, they are constrained on marketing bandwidth. To hit their upcoming milestones—most notably a massive Product Hunt launch and waitlist expansion—they need to execute high-quality, founder-led, and technical GTM motions at scale. They do not have the time to manually manage SEO, content atomization, community engagement (Reddit/Hacker News), and cold outreach while building a Personal AGI. The problem is scaling high-signal marketing output without hiring a bloated marketing department or losing their authentic technical voice.

## Context & Background
ShogunAI is building an action-oriented, privacy-first "Personal AGI" on macOS that leverages live memory of a user's workday. They are currently in waitlist mode, backed by the NVIDIA Inception program, and highly regarded in the YC ecosystem. 

In the broader market, products like Okara.ai have validated the "AI CMO" concept—a suite of autonomous agents running 24/7 to manage SEO, content creation, social media, and technical code fixes. ShogunCMO will adapt the Okara blueprint but tailor it specifically to the highly technical, YC/Silicon Valley ecosystem where ShogunAI operates. This ensures the output avoids "corporate fluff" and instead focuses on high-signal content, product growth loops, and Product Hunt playbooks.

## Product Vision
ShogunCMO is an internal, multi-agent marketing orchestrator that acts as the growth engine for ShogunAI. By pulling context directly from ShogunAI’s own memory layer, it autonomously generates high-signal content, executes hyper-specific outreach, and manages technical SEO, ensuring the product's organic growth loop matches the velocity of its engineering. 

## Target User
- **Primary:** ShogunAI internal founding team (using it to automate their own GTM).
- **Secondary:** Early-stage technical founders (future potential customers if ShogunCMO is productized).

## Core User Stories
- **As a founder**, I want to provide a quick bulleted update on our latest feature, so that the Writer and Social Agents can automatically draft a cohesive blog post and X (Twitter) thread in our technical voice.
- **As a technical marketer**, I want the SEO Agent to autonomously identify missing schema or `llms.txt` gaps and submit a GitHub Pull Request via the Coding Agent, so that I don't have to manually edit the codebase.
- **As a growth lead**, I want the Demand Gen Agent to monitor Hacker News and Reddit for relevant discussions, so that I can quickly review and post authentic, value-add replies to drive waitlist signups.
- **As a product builder**, I want ShogunCMO to ingest my YC hackathon pitch and product specs, so that all generated copy aligns perfectly with our core positioning and ICP.

## Feature Requirements (P0, P1, P2)

### P0 — Must Have (MVP)
- **Context Ingestion Engine:** Ability to ingest core brand documents (ICP, Positioning, Product Specs) to act as a single source of truth for all agents.
- **Writer Agent:** Drafts SEO-optimized technical blog posts and launch announcements (specifically for the upcoming Product Hunt launch).
- **Social Agent (X/Twitter):** Atomizes long-form content into high-signal threads and posts.
- **Community Agent (Hacker News & Reddit):** Monitors keywords and drafts authentic, non-spammy replies for founder review.
- **Product Hunt Launch Playbook:** Automated orchestration of launch assets, waitlist email sequences, and social teasers.

### P1 — Should Have (V1.1)
- **SEO & Coding Agents:** Continuous background auditing of technical SEO and GEO (Generative Engine Optimization), automatically creating GitHub PRs for fixes (e.g., meta tags, `llms.txt`).
- **Deepline GTM Integration:** Automated prospecting and enrichment to build hyper-specific contact lists for beta testing and outreach.
- **Onboarding & CRO Agent:** Analyzes the shogunaios.com landing page and waitlist flow, suggesting A/B tests and copy improvements.

### P2 — Nice to Have (Future)
- **UGC Video Agent:** Generates multi-aspect AI clips for social media based on brief inputs.
- **Influencer/Creator Outreach Agent:** Automates discovery and communication with tech creators for partnerships.
- **Full RevOps Orchestration:** Dynamic lead scoring and automated pipeline routing.

## Agent Architecture Overview
ShogunCMO utilizes a multi-agent architecture (derived from best-in-class GTM frameworks) to mimic a high-functioning marketing department:
1. **Director/Strategy Agent:** The orchestrator. Maintains the core ICP, Positioning, and brand voice. Delegates tasks to execution agents.
2. **Growth/Demand Gen Agent:** Executes outbound strategies (Deepline GTM) and handles programmatic SEO/GEO optimizations.
3. **Content & Brand Agent:** Manages the Writer, Social, and Community agents to produce searchable and shareable content.
4. **Product Marketing/Insights Agent:** Runs competitor profiling, monitors PMF signals, and tracks CRO/Onboarding metrics.
5. **Coding Agent (The Engineer):** Implements technical fixes (GitHub PRs) requested by the Growth Agent.

## Data Flow & Memory Model
1. **Memory Layer:** The Director Agent continuously syncs with ShogunAI's own local memory (product specs, founder Slack chats, coding velocity) to keep the marketing context live and accurate.
2. **Task Delegation:** The Director Agent breaks down a milestone (e.g., "Launch V1 on Product Hunt") into parallel tasks for the Content and Growth agents.
3. **Drafting & Enrichment:** Execution agents query external tools (Ahrefs, DataForSEO, LinkedIn) and draft content using the unified memory.
4. **Human-in-the-Loop:** For high-stakes channels (Hacker News, Reddit, GitHub PRs), agents stage the output for human review rather than auto-publishing.

## Integrations Required
- **Publishing/CMS:** Webflow or Custom React Frontend.
- **Social:** X (Twitter), LinkedIn.
- **Code/Tech:** GitHub (for Coding Agent PRs).
- **Community:** Reddit API, Hacker News (monitoring only).
- **Data/Growth:** Deepline API, Google Search Console.

## Non-Goals (What We Are NOT Building)
- **Fully Autonomous Forum Posting:** We will not auto-post to Reddit or Hacker News. Output will be staged for manual human review to prevent bans and maintain authenticity.
- **A General-Purpose B2C Marketing Tool:** The system is explicitly tailored for B2B/prosumer technical products. We are not building ecommerce or generic retail marketing features.
- **Complex Paid Ads Manager:** V1 will focus entirely on organic growth, SEO, and community engagement, explicitly avoiding paid spend management.

## Success Metrics
- **Time to Publish:** Reduce the time it takes the founding team to draft and publish a technical blog post from days to < 1 hour.
- **Waitlist Velocity:** Increase weekly waitlist signups by 200% through consistent community engagement (Reddit/HN) and social atomization.
- **Product Hunt Performance:** Achieve #1 Product of the Day on the upcoming launch.
- **Technical SEO Coverage:** 100% automated resolution of basic SEO/GEO errors via the Coding Agent.

## Timeline & Milestones
- **Week 1-2:** MVP Development. Core Context Ingestion Engine, Writer Agent, and Social Agent built.
- **Week 3:** Product Hunt Launch Playbook execution. Community Agent deployed for pre-launch hype.
- **Week 4:** V1.1 capabilities enabled (SEO & Coding Agents).

## Open Questions
- How deeply can we integrate ShogunCMO directly into ShogunAI's local macOS memory layer without violating privacy principles?
- Should the Coding Agent be granted direct push access, or strictly limited to opening Pull Requests? (Recommendation: PRs only for V1).

## Appendix: Okara Feature Parity Checklist
| Okara Feature | Our Equivalent | Improvement / Differentiation |
| --- | --- | --- |
| Writer Agent | Writer Agent | Tailored for highly technical, low-fluff YC audience. |
| SEO Agent | Growth Agent | Stronger focus on GEO (Generative Engine Optimization) and `llms.txt`. |
| Reddit/HN Agents | Community Agent | Tighter integration with ShogunAI's core product specs for more accurate technical replies. |
| Coding Agent | Coding Agent | Same approach (GitHub PRs), but specialized for macOS/React architectures. |
| X/LinkedIn Agents | Social Agent | Atomizes long-form technical content natively. |
| Influencer Agent | N/A (P2) | Deprioritized in favor of Product Hunt launch prep. |
| UGC Video Agent | N/A (P2) | Deprioritized for MVP. |
