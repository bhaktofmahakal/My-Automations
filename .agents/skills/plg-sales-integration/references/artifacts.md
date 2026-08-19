# PLG Sales Integration - Frameworks, Templates & Checklists

*34 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 4 Steps for Internal Product Spread (Claire Butler)
A go-to-market framework for turning individual usage into enterprise-wide adoption.

How it works: 1. Make it easy to try and share without gates (unlimited viewers, free starter teams). 2. Use technical advocates in the sales process (The 'Tom Factor'). 3. Find the operational unlock that allows scaling (e.g., design systems). 4. Maintain and grow connections with internal champions to help their careers.

### B2B Sales Strategy Evolution Map (How today's fastest-growing B2B startups turned their early users into paying customers)
A mapping showing how each company's initial sales strategy evolved over time, revealing common patterns of strategy shifts

How it works: Initial → Eventual strategy patterns:

Bottom-up self-service → Bottom-up alongside sales team: Segment, Figma, Slack, Canva, Twilio, Plaid, Shopify (with some founder sales), Stripe (with some founder sales), Atlassian (with some founder sales)

Bottom-up with inside sales → Bottom-up alongside sales team: Dropbox, Asana, Airtable, New Relic, Coda

Bottom-up with inside sales → Sales-driven land and expand: Box

Founder-led outbound → Bottom-up alongside sales team: Zoom, Amplitude

Founder-led outbound → Sales-driven land and expand: Carta, Okta, Intercom, Looker, Salesforce

Founder-led alongside bottom-up → Sales-driven alongside bottom-up: Square, Gusto

Key insight: Companies can shift between strategies. Sales-driven can become bottom-up (Zoom, Amplitude) and bottom-up can become sales-driven (Box, New Relic).

### B2C2B Strategy (Ivan Zhao)
A go-to-market strategy leveraging consumer adoption to drive enterprise sales.

How it works: Start with a simple, universal use case (like note-taking or document-sharing) to build a massive top-of-funnel of individual users, who then naturally bring the tool into their workplace for complex B2B use cases.

### Expansion vs. Conversion: Choosing Your Initial Sales Focus (The Transition: Layering sales onto a bottom-up self-serve product)
Decision framework for whether your first sales hire should focus on expanding existing accounts or converting new high-value signups

How it works: Choose based on what signals brought you to this point:

Focus on EXPANSION if:
- You keep seeing duplicate instances in larger organizations (e.g., Zapier)
- Multiple pods of activated users exist in the same company
- Users are asking to consolidate billing across teams
- Your product has natural multi-player/team dynamics
Example motion: Identify orgs with multiple activated pods → engage to unify into single contract → expand to more pods

Focus on CONVERSION ASSIST if:
- You see registrations from compelling logos that never activate (e.g., Datadog)
- High-value users are signing up but abandoning before 'aha' moment
- Contact Us requests come from enterprise companies
- Your product has a high enough ASP to justify human intervention
Example motion: Identify high-value abandoned signups → proactively engage to help reach activation → convert to paid

Approach as an experiment: Focus on one motion first, validate it works, then add the other.

### Four Levers to Increase Free-to-Paid Conversion (What is good free-to-paid conversion)
The four specific behaviors observed in the data that move the needle on free-to-paid conversion

How it works: Lever 1 - Sales Outreach: Have sales reach out to free accounts. 44% of free-trial companies have sales reach out to >50% of sign-ups (vs. 24% of freemium). Combine PLG and sales for efficient growth. Lever 2 - Product Onboarding: Higher product activation = higher conversion. 40-60% of new users never return after day one. Avoid: confusing product without help, blank slates, unclear value prop, no personalization. Lever 3 - Focus on Higher-Intent Sign-ups: Replace sign-ups KPI with activated sign-ups. Two paths for low-intent visitors: (a) nurture outside product via community/content, (b) redesign onboarding for low-intent users with videos/guides. Use product-led marketing (SEO + product virality). Lever 4 - Pricing and Packaging: Consider reverse trials (2x conversion vs. freemium). Don't ignore admin billing UX. Design pricing around teams, not individuals. Quantify feature value through willingness-to-pay surveys.

### Incrementality Testing for Hybrid Funnels (Archie Abrams)
A measurement approach to replace multi-touch attribution when dealing with both self-serve and sales-driven outcomes.

How it works: Instead of assigning value to touchpoints, hold out ads for a control group and measure the causal lift in outcomes across both the self-serve funnel and the sales funnel to inform bidding and budgeting.

### Lead Flow Maturity Progression (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
A progression from basic to sophisticated systems for capturing and routing inbound leads to sales.

How it works: Maturity levels: Level 1 (Basic): 'Contact Sales' button on homepage, even if it's just a mailto: link. Level 2 (Lead Form): Lead form on site that flows into a CRM (HubSpot, Salesforce). Level 3 (Self-Serve Data Sync): For self-serve products, sync signup data into CRM via data pipeline — e.g., Segment → Redshift/Snowflake → HubSpot/Salesforce using a tool like Census. Key principle: Get leads into a place where a human can prioritize, triage, and act on them. Reference: Chapter 6 of Founding Sales on Early Inbound Marketing (foundingsales.com/6-inbound-marketing).

### Lead Qualification Matrix for Self-Serve Signups (The Transition: Layering sales onto a bottom-up self-serve product)
A method for differentiating high-value 'needle' signups from low-value 'haystack' signups using observable and behavioral factors

How it works: Two dimensions for scoring signups:

1. Observable Factors (who they are):
- Title/role (e.g., 'Software Engineer' vs. 'Director of Data Infrastructure')
- Company name and size (enriched via Clearbit or signup form)
- Email domain (corporate vs. personal)
- Organization size (can sometimes be intrinsic — e.g., querying their Salesforce user count, Google Apps org size)

2. Behavioral Factors (what they did):
- Did they complete signup or abandon?
- How many features are they using?
- How frequently are they using them?
- How far through activation did they get?
- Multiple users from same domain?

Routing logic:
- High observable + Low behavioral = Conversion assist opportunity (engage proactively)
- High observable + High behavioral = Expansion opportunity (scoop up pods, consolidate billing)
- Low observable + Any behavioral = Handle via tech touch (emails, in-app messaging)

Start basic: ping an internal Slack channel with new signups for human review. Then get more advanced with programmatic sorting and routing.

### MQL Lead Scoring System (Sales-Led Reference) (Five steps to starting your product-led growth motion)
Example of how MQL point-based scoring works in a sales-led funnel, provided as contrast to PLG's PQL approach

How it works: In a sales-led funnel, leads get points added for marketing touchpoint engagement:
- 'Fill in contact sales form' → +10 points
- 'Email open' → +5 points
- 'Visit website pricing page' → +10 points

Once the lead score passes a certain threshold, leads are 'qualified' into MQLs and handed to the sales team for further screening and closing.

### Never Mistake Your Lead Gen for Your Business (Pete Kazanjy)
A principle that PLG/self-serve adoption is lead generation, not the full business model — enterprise revenue requires layering on sales.

How it works: Self-serve users at $19-29/month = lead generation. Real business = $50K-$250K enterprise contracts. The question is when to add sales, not if. Examples: Dropbox (too late), Slack (almost too late, then added Salesforce alumni), Atlassian (had sales, just didn't call it sales), Snowflake (500+ salespeople). Even developer tools (Datadog, New Relic) need sales orgs.

### PLG + Sales Flywheel (Shaun Clowes)
The model of getting PLG and enterprise sales motions to feed each other rather than treating them as separate strategies.

How it works: The magic combination: 1) PLG feeds the sales team with qualified leads and product usage data, 2) Sales motion feeds the PLG funnel when leads aren't ready yet, 3) Result: lots of customers (resilience) AND lots of revenue (sustainability). Without PLG, no structural incentive exists to care about end-user experience. Without sales, you leave enterprise money on the table. Having both makes you very hard to knock over.

### Two Reasons to Add Sales to Self-Serve (The Transition: Layering sales onto a bottom-up self-serve product)
Framework for evaluating the two primary use cases for adding salespeople to a bottom-up product

How it works: Two primary reasons to add salespeople:

1. Penetration/Expansion: Facilitate the expansion of your solution into an organization where it has an initial foothold. Example: Slack and Zoom 'Account Managers' who unify disparate pods of users into a single contract. Works well for multi-player products with team/org-level usage.

2. Conversion Assist: Help raise conversion rates of unactivated or abandoned signups that represent high-value accounts. Example: Atrium salespeople engaging abandoned users who fit ideal customer criteria. Works well when average deal value justifies human intervention.

Key economic test: Will the juice be worth the squeeze? A salesperson should deliver 4x their fully loaded cost in incremental revenue.

### Zapier's Four Product-Qualification Signals for Sales-Assist (What is good free-to-paid conversion)
The four signals Zapier uses to determine which free accounts should receive a sales-assisted experience

How it works: Signal 1 - Multi-player use: Are there multiple active users on a specific domain? Signal 2 - Usage patterns: Is the account growing its usage over time? Signal 3 - Use case: Does the customer's use case indicate that they'd benefit from assistance? Signal 4 - Role: Does the user's role align with the company's ideal customer profile? After qualifying, sales-assist reps tailor outreach based on the user's context to add value before pushing for the commercial transaction. Key finding: Sales touchpoints improved not just conversion for upmarket accounts but also post-purchase retention rates.

## Templates

### B2B Company Sales Profile Template (How today's fastest-growing B2B startups turned their early users into paying customers)
A structured format for documenting and comparing a B2B company's sales evolution, used consistently across all 25 companies in the analysis

How it works: Fields:
- Initial strategy: [Bottom-up self-service | Bottom-up with inside sales | Founder-led outbound sales] (plus any qualifiers like 'with some founder-led sales')
- Eventual strategy: [Bottom-up alongside sales team | Sales-driven land and expand]
- How they charge today: [Per-seat monthly subscription | Monthly flat-fee plus usage-based | Transaction fee | Usage-based | Monthly subscription | Monthly base + per-seat]
- Free tier: [Freemium | Trial | None]
- First customer story: [Narrative of how first 1-10 customers were acquired and converted]
- Key quote from founder/early employee

### B2B Company Sales Strategy Profile (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36)
A structured template for documenting a B2B company's early-to-mature sales strategy, used consistently across all 25+ companies in Lenny's research

How it works: Template fields for each company:
- **Initial strategy**: [Bottom-up self-service | Bottom-up with inside sales | Outbound sales] + [any modifier like 'with some founder-led sales']
- **Eventual strategy**: [How the strategy evolved, e.g., 'Bottom-up, alongside a sales team']
- **How they charge today**: [Flat monthly fee | Per-seat monthly subscription | Usage-based | Transaction fee | combination]
- **Free tier**: [Freemium | Trial | None]
- **First-person quote**: Direct quote from founder/early employee about the conversion process
- **Early pricing page screenshot**: Visual evidence of initial pricing

### Signup Form Fields for Sales Qualification (The Transition: Layering sales onto a bottom-up self-serve product)
Recommended fields to add to self-serve signup forms to enable sales prioritization

How it works: Recommended signup form fields for sales qualification:

Basic (like Snowflake):
- First Name (required)
- Last Name (required)
- Email (required — prefer corporate email; consider blocking or adding friction for personal email)
- Company (required)
- Title (required) — enables judgment about purchasing authority and account value

Alternative (like Datadog):
- First Name (required)
- Last Name (required)
- Email (required)
- Company (required)
- Phone (optional) — 'some people want you to call them!'

Enhanced (with enrichment):
- Use Clearbit or similar to auto-fill Company Size, Industry, Title from email address
- Avoids extending the form and injuring conversion rates
- Can happen behind the scenes after signup

Anti-pattern (like New Relic at time of writing):
- No Title or Company fields = no way to assess signup value

Use the captured data to:
- Ping internal Slack/email with new signups for human review
- Programmatically sort signups by observable + behavioral factors
- Route high-value signups to sales, low-value to tech-touch automation

## Checklists

### Common Pitfalls When Adding Sales to Self-Serve (The Transition: Layering sales onto a bottom-up self-serve product)
Four major mistakes to avoid when transitioning from pure self-serve to sales-assisted

How it works: 1. Having someone else do sales (instead of the founder/PM doing it first)
- They won't have the same product acumen
- They won't be good at product requirements collection
- Users WANT to talk to the founder — it's a huge advantage

2. Not starting at all
- Don't psych yourself out — selling is not magic or rocket science
- Anyone can learn to do it
- Treat it like adding new features: start with an MVP approach and iterate

3. Going top-down too early
- Your strength is users who love the product at the bottom
- Top-down means engaging decision-makers far removed from day-to-day use
- They'll have conceived requirements based on incumbent features that don't matter to users
- Top-down is for later (like Slack/Zoom enterprise AEs talking 'digital transformation' with CIOs)

4. Not allocating product/engineering resources
- Sales introduces new 'user personas' (procurement, IT, security)
- Unsexy but critical features: SSO, SOC 2, ISO 27001, account merging, invoicing
- Absence of these features will block the sales-assisted deals you're trying to close

### Five Key GTM Takeaways from 30 B2B SaaS Companies (GTM motions of 30 B2B SaaS companies)
Five patterns that emerged from analyzing 30 successful B2B SaaS companies' go-to-market strategies

How it works: 1. 100% of product-led companies end up adding a sales team, if not going sales-led completely (19 of 30 started product-led; all added sales; 4 switched entirely to sales-led; zero went from sales-led to product-led)

2. Everyone moves upmarket—few go the other direction (every company studied moved upmarket; very few moved downmarket, and those that did expanded to all stages rather than abandoning initial segment)

3. Almost everyone starts by going after VSBs or SMBs (21 of 30 went after VSBs/SMBs early on; only 3 started with Enterprise, only 2 with Mid-market)

4. Everyone targets one (and max three) personas within an organization (only Dropbox and Notion had no specific target persona)

5. Sales-led companies often add a bottom-up self-serve product, primarily to drive lead gen (HubSpot, Salesforce, Box, Databricks, Zendesk all did this)

### Setup Checklist for The Transition to Sales-Assisted (The Transition: Layering sales onto a bottom-up self-serve product)
Step-by-step operational setup needed before and during adding sales to a self-serve product

How it works: Step 1: Choose your initial focus
- Option A: 'Scooping up pods' — consolidating activated user groups in large orgs into single contracts + expanding
- Option B: 'Conversion assist' — helping high-value unactivated signups reach their aha moment
- Pick one to start, validate, then add the other

Step 2: Prototype the sales motion yourself (founder/PM)
- Have the first few dozen sales conversations personally
- You know the product and market better than any hire
- You'll discover new product requirements in these conversations
- Users are excited to talk to the founder

Step 3: Build data insights for sales
- Add enrichment fields to signup form (Title, Company name, Phone)
- Consider blocking/adding friction for personal email signups
- Use enrichment APIs (e.g., Clearbit) to augment signup data
- Build activation tracking: how far through signup, features used, frequency
- Set up basic alerting: ping Slack/email when high-value signups occur
- Eventually pipe activation data into CRM (e.g., Census → Salesforce)

Step 4: Set up alerting for key events
- 'Badass account signed up and didn't activate!'
- 'Badass account reached awesome activation threshold!'
- 'Account reached critical mass of multiple activated users!'
- Include: user name, email, company name, title, account size, activation progress

Step 5: Track and measure results
- Use a CRM (even Airtable works to start) to record all sales conversations
- Track: number of conversations, state/stage, win/loss, deal value
- Score results: Are we getting expansions done? Are we converting high-value accounts?
- Be honest with yourself about what's working

### Signals It's Time to Hire Your First Salesperson (The Transition: Layering sales onto a bottom-up self-serve product)
Observable indicators that it's time to add a dedicated sales resource to your self-serve product

How it works: Signals to watch for:

1. You have a 'Contact Us' or 'Contact Sales' CTA on your homepage and in-product
2. You're receiving 1-2 inbound commercial requests per week (e.g., 'Finance wants invoicing', 'What's your SOC 2 situation?', 'We need to consolidate billing across teams')
3. You see high-value logos (large companies) appearing in signup logs but not completing activation
4. You see duplicate/multiple instances of your product deployed in the same large organization
5. Compelling companies that submitted Contact Us requests suggest that similar companies likely started signup and abandoned
6. Users are self-upgrading or hitting usage thresholds that suggest expansion opportunity

Note: 1-2 inquiries/week isn't a full-time job, but for each user who raises their hand, there are probably 10 others with the same need. The first hire handles inbound AND uses extra bandwidth for warm outbound into the existing customer base.

## Examples

### Asana's 70/30 Self-Service to Sales Ratio (How today's fastest-growing B2B startups turned their early users into paying customers)
How Asana balanced self-service and sales-assisted conversion for first paid customers

How it works: Approach: Engaged in extensive customer development. Optimized to learn (and tweak) purchase flow while also aiming to convert. Key question: where to place 'sales' vs. where to push 'self-service.' Beta: Friendly companies that gave early product feedback received X months of premium product for free with a handshake agreement to officially convert later. Official launch: First sales hire managed all inbound interest. Result: Self-service was possible and represented approximately 70% of first few initial purchases, with 30% sales-assisted.

### Atrium's Salesforce Contact Object with Activation Data (The Transition: Layering sales onto a bottom-up self-serve product)
Real example of what a mature sales activation instrumentation setup looks like in Salesforce

How it works: Atrium's Salesforce contact page includes (after ~1 year of tuning):
- User activation status and metrics
- Product usage data piped in via Census
- Account desirability information (company size, etc.)
- User desirability information (title, role)
- Contact information
- Behavioral data (login recency, feature breadth, page views)

Email alerting on initial signup fires to a listserv and creates a Salesforce lead, including: user name, email address, company name, title, size of account (from Salesforce user table interrogation), and how far through activation they got.

Workflow rules in Salesforce trigger alerts when users pass activation thresholds: 'User hit X threshold of feature breadth use and Y threshold of page views in trailing Z period.'

Starting point: Even just last login date and total pageviews/actions in a given time interval is a great start.

### Box's Bottom-Up to Enterprise Transition (How today's fastest-growing B2B startups turned their early users into paying customers)
How Box mined individual accounts for enterprise leads and pivoted from consumer to B2B

How it works: Box had dichotomous user footprint early on: consumer and professional (later pivoted to B2B only). Strategy: Mined early individual accounts to parse for business domains (e.g., johndoe@ford.com). Engaged with these users to learn why they chose Box vs IT-sanctioned tools like FTP. Context: Circa late 2007/early 2008, alternatives were online backup tools like Carbonite and Mozy, not focused on sharing/collaboration. First 10+ customers mostly came from inbound efforts, but given aggressive growth goals and interest in going up-market early, they spent most time going outbound.

### Company Examples: Self-Serve to Sales-Assisted Transitions (The Transition: Layering sales onto a bottom-up self-serve product)
Real company examples illustrating different self-serve viability criteria and sales transition patterns

How it works: Self-serve because product is simple enough:
- Zoom: Send/join a link, you're talking. Not complicated.
- Dropbox: Download client, pick folders to sync.
- Airtable: Start simple, advance with templates/recipes.

Self-serve because audience is technical:
- Tableau: Complex but self-serviceable by data analysts (desktop download)
- Stripe, Datadog, Twilio, New Relic: Developer tools with technical audience

NOT self-serve (too complex):
- Marketo: Enterprise marketing automation
- Blend: Software for massive financial enterprises

Self-serve because truly new/differentiated:
- Yesware, Mixmax: First sales engagement email tools
- Calendly: Public calendar booking was 'crazy talk' at launch
- Sonar: Revenue stack automation monitoring never existed before
- Command E: Personal business cloud app search never existed

Self-serve because can co-exist with incumbents:
- Slack: Coexisted with GChat/Gmail
- Guru: Coexisted with Sharepoint/Confluence
- Atrium: Coexisted with Tableau/Looker for different use case

NOT self-serve (end-to-end replacement):
- Sapling: HRIS — can't have two in one org
- Iterable: Customer engagement — won't run alongside Responsys

Self-serve targeting small orgs:
- Stripe: Obvious choice for new businesses, hard to displace incumbent for mature ones
- RevOps: 10-person sales org can set up in 5 min vs. 3-month Salesforce CPQ deployment

Cautionary tale:
- Dropbox: Market position usurped by competitors who adopted sales-assisted motion and firewalled them out of enterprise

Offshore sales example:
- KeepTruckin: SMB sales team in Pakistan for mom-and-pop trucking companies (lower cost), US-based team in Nashville for larger prospects

### Databricks PLG Cautionary Tale (Hiring your early team, Scaling your B2B growth engine)
How Databricks' zero-touch PLG experiment caused revenue to flatline, serving as a warning against assuming PLG can replace sales

How it works: Timeline:
- Vision: No sales in the company, 100% product-led growth
- 2015: Doubled down on PLG, launched 'zero-touch effort' modeled after Amazon
- Goal: Completely automated, no human touches the customer, credit card swipe to start using
- Q2 2015: Told sales to stop engaging with customers
- Q2-Q3 2015: Revenue growth started flattening
- Q4 2015: Clear that PLG-only approach wasn't working

Key quote: 'For all practical purposes, PLG doesn't work. It's a don't try it at home kind of thing. Maybe it works for Atlassian. Maybe if you can swipe a credit card and use the product in five minutes, it'll work. But if you think this is how you can sell to enterprises, without a sales force, good luck.'

Lesson: PLG may work for simple tools with quick time-to-value, but enterprise products typically need sales involvement.

### GitHub Expansion Path: Individual → SMB → Enterprise (What it feels like when you've found product-market fit)
Tom Preston-Werner's account of how GitHub expanded from Ruby community enthusiasts to broader markets

How it works: During private beta (free, targeting Ruby community enthusiasts), users started writing in asking 'Can we pay for this??' — they liked it so much they wanted to pay. Critical factor: Being embedded in the Ruby community before launch was essential. Ruby was still new in 2009, and early users were people willing to operate on the cutting edge. Expansion path: Individual Ruby developers → SMBs → Enterprises. Key insight: Start with a community of early adopters who are predisposed to try new things, then expand outward.

### GitLab PLG Motion Launch (Five steps to starting your product-led growth motion)
Real-world example of how GitLab layered PLG on top of an established sales motion, including specific focus areas and results

How it works: Context: GitLab started as an open source product used by developers for personal and work purposes, selling into all segments (SMB, mid-market, enterprise). Early team established a sales motion first.

PLG Layering Strategy:
- Already had free version, free trial, and open source product with large free user base
- Growth team started by developing usage-data insights and creating PLG funnel

Focus Areas (sequenced):
1. Activation and self-service purchase — chosen first because of low-hanging fruit and immediate impact potential
2. PQLs — expanded quickly because GitLab had large free user base and developer audience didn't like marketing emails

PQL Implementation:
- Started with hand-raiser PQLs: customers submit sales contact form directly inside the product → 3x higher conversion rate than typical MQLs
- Expanded to usage-based PQLs: identified high-potential prospects via usage patterns and routed them into Salesforce
- Built PQL data pipeline in-house

Team Aha Moment Definition: '2+ users and 2+ features within the first 14 days' — pivotal moment was when a developer invited another developer to join the same project and they began collaborating on issues and workflows.

Additional outcome: New PLG motion also generated usage-based leads for enterprise sales to go after.

### GitLab Telemetry Team for PLG Data Infrastructure (Five steps to starting your product-led growth motion, part 2)
How GitLab set up a dedicated telemetry team to address the product analytics gap when transitioning to PLG

How it works: At GitLab, to address the product analytics gap for PLG, they set up a telemetry team with:
- A dedicated PM
- Dedicated engineers
- Responsibilities: Creating data collection frameworks and policies, coordinating all product teams to implement tracking, and navigating customer and community communication around data collection

This was necessary because B2B companies that sell via human touch typically lack product analytics instrumentation, which is a prerequisite for PLG.

### GitLab's Dual Funnel (PLG + SLG) (Summary: The ultimate guide to adding a PLG motion | Hila Qu (Reforge, GitLab))
Detailed example of how GitLab runs both a PLG and SLG funnel in parallel

How it works: Sales-Led Funnel: Marketing attracts visitors → sign up for free trials/accounts → lead nurturing and scoring → high-scoring leads given to sales team (segmented: SMB, mid-market, enterprise) → close deals → revenue.

Product-Led Funnel: Developer hears about GitLab → visits website → signs up for free account for personal projects (independent of company's current solution) → company signs up for free trial to test advanced features/proof of concept → If few seats needed: go to pricing page and buy directly → If large company: sales team receives usage data indicating interest → reaches out to start sales conversation → potential enterprise contract.

Key: PLG funnel is user-driven with organic growth path, starting from personal use and expanding to enterprise.

### Notion's Rule: No Salesperson Under 100 Employees (Hiring your early team)
How Notion reached $10-15M ARR without salespeople by letting product do the work for smaller companies

How it works: Akshay made a rule that no salesperson should touch companies with less than 100 employees because he felt product needed to do that work. Notion reached $10-15M ARR with just startups and SMBs. The trigger for adding sales was when early customers grew larger (e.g., a UK bank with 400 employees that had a full-time person dedicated to making Notion work). Realization: 'These kinds of companies will churn unless there's a human involved in making sure their experience is growing with Notion.' The first 6-9 months of Akshay's sales journey was spent in the support pit meeting and interviewing sales candidates alongside the CEO, building a culture where product and sales work together rather than against each other.

### Pipedrive Early Sales Comp (Jason M Lemkin)
An example of how early sales reps can be highly accretive even if they make more than the founders.

How it works: The first sales rep at Pipedrive called self-serve customers who had bought multiple seats (e.g., AOL) and upsold them to 100+ seats. He kept 20% of the deals and made hundreds of thousands of dollars while founders made $50k, but it was a massive win-win for the company's revenue.

## Tools

### Recommended B2B GTM Resources (GTM motions of 30 B2B SaaS companies)
Curated list of articles, books, and guides for deeper study on B2B SaaS go-to-market strategy

How it works: 1. 'The Transition: Layering sales onto a bottom-up self-serve product' by Pete Kazanjy (on Lenny's Newsletter)
2. 'Growth+Sales: The New Era of Enterprise Go-to-Market' by a16z
3. 'Why Most Companies Fail at Moving Up or Down Market' by Brian Balfour (Reforge)
4. 'SaaS Go-to-Upmarket' podcast by a16z (future.a16z.com)
5. 'The $20M to $500M Question: Adding Top Down Sales' by Sarah Wang and David George at a16z
6. 'Moving upmarket and the ascent of SMB SaaS' by Adam Fisher at Bessemer Venture Partners
7. 'Self-serve first' by Gokul Rajaram (Medium)
8. 'Picking a GTM Motion' by Unusual Ventures Field Guide
9. Book: 'Founding Sales' by Pete Kazanjy (foundingsales.com) — recommended if going Enterprise out of the gate

### Recommended Tools for Sales Transition Infrastructure (The Transition: Layering sales onto a bottom-up self-serve product)
Software tools mentioned for building the data and operational infrastructure needed for sales-assisted self-serve

How it works: Data enrichment:
- Clearbit: Match signup email to composite profile, enrich with title/company size without extending forms

Product analytics (for activation tracking):
- Amplitude, Pendo, Mixpanel, Heap — use existing analytics to surface activation data

Data piping (analytics → CRM):
- Census: Pipe user activation data from product database into Salesforce

CRM:
- Salesforce: Full-featured, supports workflow rules and triggers for alerting
- Airtable: Acceptable starting point for tracking early sales conversations

Alerting:
- Internal email listservs
- Slack channels
- Salesforce workflow rules and triggers

Book resource:
- Founding Sales by Pete Kazanjy (https://www.foundingsales.com/) — covers sales hiring, onboarding, early sales management, prospecting, inbound marketing, early CRM, and sales performance instrumentation

### SaaS Sales Staffing Model Spreadsheet (The Transition: Layering sales onto a bottom-up self-serve product)
A Google Sheets model for playing with sales economics scenarios

How it works: Google Sheets link: https://docs.google.com/spreadsheets/d/16NBOjE9Hpm4uexjslpYVDmidp3fIpDwmR3zRKieFgKM/edit#gid=0

Allows you to model: number of opportunities per rep, cost per rep, win rates, deal values, and resulting revenue/cost ratios to determine if adding sales is economically viable.

