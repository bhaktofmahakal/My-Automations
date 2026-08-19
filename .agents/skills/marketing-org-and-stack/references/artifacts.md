# Marketing Org and Stack - Frameworks, Templates & Checklists

*21 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### Fuel vs. Engine Framework (Emily Kramer)
A mental model for diagnosing marketing needs. Fuel is what you create (content, copy, design, positioning). Engine is how you distribute it (email ops, SEO technicals, paid ads).

How it works: Used to determine the first marketing hire. Ask: 'What are your top performing pieces of content?' (Fuel check) and 'How are you distributing it?' (Engine check).

### GACCS Framework (Goals, Audience, Creative, Channels, Stakeholders) (How to get your marketing team to drive more impact)
A 5-part marketing brief framework that replaces complex processes with a simple one-pager to align teams before any marketing work begins. Created by Emily Kramer across Asana, Carta, Ticketfly, and Astro.

How it works: GACCS stands for:

1. **Goals** — Why should I do this now?
   - Must ladder up to a higher-level goal or OKR
   - Include clear success metrics
   - Define non-goals to prevent scope creep
   - Examples: 'Support OKR: Increase free-to-paid conversion from x% to y%'; 'Demo product to 100 leads at event and drive 20% to schedule a meeting'; 'Support our overall story that we have the best benchmarks for people teams'

2. **Audience** — Who is it for?
   - Must be specific (not 'users' — that's four levels too high)
   - Reference ideal customer personas
   - Examples: 'Heads of people teams at 50+-person venture-backed startups'; 'attendees of Shop Til You Drop conference'; 'active free-product users'

3. **Creative** — How will it stand out?
   - Define unique point of view, message, or 'so what'
   - Define creative requirements for contributors/stakeholders
   - Rule of thumb: If you can't make something better than what already exists, don't make it
   - Examples: 'Loom video that shows how our feature is 10x faster than the alternative'; 'reuse Pop-A-Shot branded game, and add a discount as a prize'; 'showcase the level of specificity in our benchmarks with a designed report'

4. **Channels** — How will you distribute this?
   - Distribution plan is as important as (or more important than) creation
   - Plan for 'mileage' — repurposing one idea across formats
   - If no distribution plan, don't create the asset
   - Examples: 'Webinar a week after launch of blog post with guest Lenny Rachitsky'; 'email sequence to our existing list of general managers'; 'rank for SEO keywords work better with marketing'

5. **Stakeholders** — Who needs to be involved?
   - DRI (Directly Responsible Individual) — writes the GACCS
   - Reviewers and contributors
   - Share GACCS before work begins for early alignment
   - Example: 'DRI: Emily; reviewers: Lenny, Kathleen; contributors: Nico (design), Keenan (web)'

### MarTech Org Design Matrix (Austin Hay)
A 2x2 matrix for determining where MarTech should live in an organization based on two dimensions: B2C vs B2B, and Centralized vs Decentralized.

How it works: B2C Centralized: Reports to Growth/Marketing. B2C Decentralized: Ops person in every org (not recommended for startups). B2B: Highly variable, often sits in RevOps or is split between top-of-funnel marketing and bottom-of-funnel CRM management.

### Pie-shaped Marketer (Emily Kramer)
A hiring profile for early-stage marketers. Like a T-shaped marketer, but with two deep spikes (the Pi symbol) instead of one.

How it works: The marketer should be an expert in one of the three main areas (Product Marketing, Content, Growth), proficient in a second, and able to set strategy/hire contractors for the third.

### The Chameleon CMO (Comb-shaped Marketer) (Krithika Shankarraman)
A mental model for modern marketing leaders to diversify their skills across multiple disciplines rather than just one.

How it works: Move from T-shaped (deep in one area) to comb-shaped (deep in several areas like data, creative, product marketing), using AI to augment weaker areas.

### The Modern Growth Stack (Naomi Ionita)
A conceptual architecture for growth tooling focused on data, workflow, and impact.

How it works: Built on three pillars: 1. Data (smart integrations/reverse ETL to break silos), 2. Workflow (enabling cross-functional teams to self-serve without engineers), 3. Impact (driving hard ROI via cost reduction and revenue generation).

### Three Methods of Marketing Measurement (How today’s top consumer brands measure marketing’s impact)
Overview framework categorizing the three main approaches to measuring marketing effectiveness with their strengths, weaknesses, and use cases

How it works: Method 1: MTA (Multi-Touch Attribution / Digital Tracking)
- What: Browser cookies/identifiers track marketing source of customers via UTM codes and tracking pixels
- Strengths: Ubiquitous, easy to implement, provides daily/tactical data, works at campaign/creative level
- Weaknesses: Last-touch biases toward lower-funnel channels; affected by iOS 14 privacy changes; can't track offline; shows correlation not causation
- Adoption: 100% of online brands use some form; 40% of database brands have interesting MTA case studies

Method 2: MMM (Marketing Mix Modeling)
- What: Statistical model correlating marketing spend with sales using aggregate data
- Strengths: No privacy concerns (aggregate data only); measures offline channels (TV, billboards, radio); independent of platform reporting
- Weaknesses: Struggles with campaign/creative-level granularity; sensitive to model sophistication; easy to get incorrect results; traditionally slow/expensive
- Adoption: 82% of database brands discuss MMM

Method 3: CLS (Conversion Lift Studies)
- What: Randomized experiments turning off ads to measure incremental impact
- Strengths: Gold standard for proving causation; definitively measures incrementality; works independently of platforms
- Weaknesses: Expensive and complicated to set up; can't run too frequently; only a snapshot in time; not feasible for all channels
- Adoption: 38% of database brands discuss CLS

Key trend: 40%+ of top brands use at least 2 methods; ~20% use all 3 (triangulation).

## Checklists

### 20/80 Marketing Review Checkpoints (Krithika Shankarraman)
A two-step review process for marketing assets to ensure alignment without bottlenecking execution.

How it works: 20% review focuses on strategy (goals, audience, rough approach). 80% review focuses on execution and artifacts while there is still time to make substantive changes before launch.

### First three performance marketing hires (Timothy Davis)
The recommended sequence and profile for building an initial performance marketing team

How it works: Hire 1: Data-driven growth marketing generalist. Title: Growth Marketing Specialist/Manager. Skills: Data analysis (signal vs noise), platform-teachable, will wear multiple hats. Trigger: ~$50K/month ad spend. Hire 2: Creative person (graphic design/branding). Skills: Brand creative + conversion-focused design, collaborative on copy, video capability preferred. Trigger: Need for creative flywheel, testing more visual platforms. Hire 3: Dedicated data scientist. Skills: Incrementality testing, custom report building, advanced analysis. Trigger: Scale requires sophisticated measurement beyond generalist capabilities.

### How to Build a Marketing Mix Model (How today’s top consumer brands measure marketing’s impact)
End-to-end project plan for building your first MMM, including timeline, tools, and build-vs-buy considerations

How it works: Timeline: 3-6 months for complex marketing activities (can be reduced to ~2 weeks with vendor automation).

Phase 1: Data Collection and Formatting (40-60% of total time)
- Tech startups with data warehouses accelerate through this
- Legacy businesses in silos take significantly longer
- May spawn side projects to clean up or collect more data
- Lower end: Supermetrics or Funnel.io dumping data into Google Sheets
- Higher end: Vendor with built data warehouse and connectors to marketing channels and analytics platforms

Phase 2: Choose Your Approach
Option A - Open source base (recommended starting point):
- Meta's Robyn - good solid base, first port of call for smaller companies
- Google's LightweightMMM - good solid base
- Uber's Orbit - uses time-varying coefficients (performance of marketing can change over time)

Option B - Completely custom build:
- Plan additional 3 months to 2 years
- MMM is 'unusually unsuitable for solving through modern machine learning techniques'
- Must be both accurate AND explainable

Option C - Vendor (e.g., Recast, Nielsen):
- Traditional vendors (Nielsen): slow, expensive, run 1-2x/year
- Modern vendors (Recast): automated, updated 2-4x/month

Key recommendation: If paying for a vendor or building custom, test head-to-head against Robyn to establish a baseline for accuracy and performance.

Critical model feature: Time-varying coefficients (most MMMs incorrectly assume marketing never changes in performance, even around seasonal trends or economic events).

### Marketing Foundation Checklist (Prerequisites for GACCS) (How to get your marketing team to drive more impact)
Five foundational elements that need to be in place before GACCS can work effectively, each mapping to one letter of the GACCS framework.

How it works: 1. **Goals foundation:** Set OKRs, define KPIs, and map your funnel to be able to set goals faster.
2. **Audience foundation:** Do audience analysis through customer and prospect interviews, define your ideal customer personas (ICPs), and do competitive analysis to know who to target.
3. **Creative foundation:** Write your brand story, define your brand attributes or values, and define content pillars so you know the story you are trying to tell and what you want to be known for.
4. **Channels foundation:** Make a checklist of all your distribution channels so you have a clear inventory to reference and don't have to start from scratch every time.
5. **Stakeholders foundation:** Make an Areas of Responsibility list (AORs) for marketing and marketing collaborators.

### Six Reasons Marketing Work Misses the Mark (How to get your marketing team to drive more impact)
A diagnostic checklist of six root causes of ineffective marketing work, useful for auditing why marketing output isn't having impact.

How it works: 1. **No goal** — Work was created without a good 'why' behind it and to check a box that didn't need checking.
2. **No prioritization** — Everyone thinks they're a marketer, so marketing gets overwhelmed with asks and ideas without clear goals to filter them.
3. **Created for no one** — Work was created without a specific enough audience in mind, so it doesn't add value for anyone.
4. **The work doesn't stand out** — The same thing already exists in the world and is better. The work adds no new value.
5. **No distribution** — The project was a great idea and even well-executed, but it never reaches the right audience.
6. **Experts were excluded** — The work took a long time to create but could have been faster and higher-quality if the right people were looped in at the right time.

### Tactical GACCS Implementation Steps (How to get your marketing team to drive more impact)
Step-by-step instructions for how to operationally embed GACCS into your team's workflow.

How it works: 1. Add the GACCS into your working doc and/or task — put it at the top of every working doc (Notion, Google Docs, Asana, or any working tool). Can be pinned to a Slack channel.
2. Share it early — share the GACCS with relevant stakeholders before you start doing any work. Get alignment and have stakeholders poke holes. Sharing too late means you're too deep on wrong work.
3. Share it with contractors too — one of the easiest ways to get on the same page with contractors and agencies is to agree on the GACCS before anything else.
4. Ask stakeholders (nicely) to get out of your way — after buy-in on the GACCS, you should be left to do the work. Some stakeholders loop in at end to review, but most should feel confident.
5. Use it to give feedback — feedback becomes less subjective when responding to the GACCS. Example: 'Given my recent customer interviews, I don't think this will resonate with the stated audience' is better than 'This content is bad.'

## Examples

### Ahrefs' Content Team and Approach (Content-driven growth)
How Ahrefs gradually built a small but effective content team focused on blog and video

How it works: Team structure:
- Josh Hardwick: Head of blog content
- SQ and Michal: Two in-house marketers creating content with Josh
- Patrick Stox: Technical content (part-time, also on product team)
- Sam Oh: Head of video content
- 3 people helping with video production
- 1 graphic designer for all marketing team needs

Total: ~8 people

Approach: Very gradual ramp-up, no single big decision to invest. Tim inherited the blog in 2015 (already had outsourced writers) and incrementally improved things.

Results: 300+ posts, 1.5M visits/month

Top posts: Top 100 Most Visited Websites, Affiliate Marketing for Beginners, Top Google Searches

Key advice: 'Contemplate the difference between viral content and SEO content. SEO content is a lot easier because you find topics via keyword research.'

### Anti-patterns GACCS Replaces (How to get your marketing team to drive more impact)
Three common but ineffective approaches teams use when marketing isn't driving impact, which GACCS is designed to replace.

How it works: When marketing work is not moving the needle, these complicated fixes are often tried (and never work):
1. Someone adds another status meeting across teams to try to get aligned more regularly.
2. Biz ops or a chief of staff puts in place an arduous OKR process — resulting in 17 layers of OKRs that are supposed to ladder up to each other but no one looks at.
3. Other teams stop relying on marketing and work in silos, causing the entire customer experience to suffer.

GACCS replaces all three with a simple pre-work habit.

### Booking.com's Minimal Performance Marketing Team Structure (Top 5 most interesting things about Booking.com's early growth strategy – Issue 46)
How Booking.com managed $100M+ in annual ad spend with just two people

How it works: Team composition (2004-2010):
- Person 1 ('Peter' - the banker): Extremely competitive, managed almost half the spend personally. Simple success criteria: win the auction for all important words, and make money on it.
- Person 2 (the coder): Very experienced, entrepreneurial, creative, data geek. Built tools for supply team to align with paid search team.

Key insight: The magic was the combination of Peter's competitive instinct with the coder's excellent data skills. With a different coder, it wouldn't have worked.

Evolution:
- 2004-2010: Two-person team, deliberately not heavily automated
- ~2006: New people joined, built screens and dashboards to help Peter spend time more efficiently and inform supply team
- Past $100M spend: Still this small team running the program
- Eventually split into: (1) Peter's team for top/mid-tier markets, (2) High-tech product team for long-tail markets

Google's reaction: Google rep was shocked at the one-person operation. A PhD engineer at Google tried to replicate Peter's decision-making brain algorithmically but couldn't.

### GACCS Scaling Guide (by project complexity) (How to get your marketing team to drive more impact)
A visual guide showing when to use GACCS based on complexity — from a one-off deliverable (brief GACCS) to a complex campaign (detailed GACCS). Demonstrates flexibility of the framework.

How it works: GACCS scales based on project size:
- **One-off deliverable** (e.g., single blog post): Brief GACCS, ~10 minutes to write
- **Multi-component project** (e.g., product launch with multiple assets): More detailed GACCS with fuller distribution and stakeholder plans
- **Complex campaign** (e.g., major campaign with events, content, ads): Comprehensive GACCS that may reference sub-GACCS for individual components

Key principle: If you're creating anything longer than a tweet, you probably need a GACCS.

### Intercom's Content Team Structure (3-Pillar Model) (Content-driven growth)
How Intercom organizes a 10-person content team into three pillars: Audiences, Enablement, and Channels

How it works: Team size: 10 people based in Dublin, Ireland (3 additional positions opening)

Three pillars/sub-teams:

1. Audiences Pillar:
- Focus: Understanding and attracting target audience (customer support and success leaders)
- Creates top-of-funnel content
- Researches where audience gets information, conferences they attend, who influences them

2. Enablement Pillar:
- Focus: Reworking content for sales and other marketing teams
- Example: Turning research reports into slides for account exec pitch decks
- Manages all customer evidence (full customer stories, logo usage permissions)

3. Channels Pillar:
- Specialist functions working across Audiences and Enablement
- Currently: SEO and podcast

Origin: Co-founders blogged as part of their DNA. Des Traynor wrote the first ~100 posts. Content team formalized ~2.5 years after founding.

Approach: Initially focused on high-quality editorial content to stand out from SEO-driven norm. Customers from blog/podcast spent more and stayed longer.

Content creation incentive: Added content creation to personal and team goals company-wide (not paid extra)

Results: 870 posts, 262 podcasts, 100K+ visits/month, 75K+ listeners/month

Key quote: 'Content is a supertanker, not a speedboat.'

## Tools

### Marketing Measurement Case Study Database (How today’s top consumer brands measure marketing’s impact)
An Airtable database of 42 top consumer brands (Uber, Amazon, Airbnb, etc.) documenting their marketing measurement methods, with links to case studies and notes on their approaches. Covers MTA, MMM, and CLS methods.

How it works: Airtable database at https://airtable.com/shrzPkZvLTZtcsnbI containing 42+ consumer brands. Statistics from the database: 17 instances (40%) of brands using MTA, 35 instances (82%) using MMM, 16 instances (38%) using CLS. Over 40% use at least two methods together, ~20% use all three. Brands include Uber, Amazon, Airbnb, DoorDash, Netflix, HelloFresh, McDonald's, Resident/Nectar. Users can also submit new case studies via https://airtable.com/shrFVy4pMcAxjltBe.

### Marketing Measurement Tool Stack (How today’s top consumer brands measure marketing’s impact)
Comprehensive list of tools mentioned for implementing each measurement method

How it works: MTA / Digital Tracking:
- Analytics: Google Analytics 4 (free, default for web)
- Tag Managers: Google Tag Manager (free), Segment (paid, better collaboration/monitoring)
- Mobile Attribution: AppsFlyer, Branch
- MTA Vendors: Rockerbox, Northbeam, Triple Whale
- UTM Tracking: Manual or via Vexpower training
- Data Pipelines: Supermetrics, Funnel.io (pull ad spend data into warehouse)
- Data Visualization: Looker, Tableau
- Event Tracking: Avo (dynamic event tracking system)

MMM (Marketing Mix Modeling):
- Open Source: Meta's Robyn (R-based, most accessible), Google's LightweightMMM, Uber's Orbit (time-varying coefficients)
- Traditional Vendors: Nielsen
- Modern Vendors: Recast (co-author's company)

CLS (Conversion Lift Studies):
- In-Platform: Meta native CLS, Google equivalent
- Open Source: Meta's GeoLift library (calculations + synthetic control estimation)

Data Infrastructure:
- Data Warehouse (needed for advanced MTA and MMM)
- Supermetrics or Funnel.io for data collection/pipeline

### The Golden MarTech Stack (Austin Hay)
Austin's recommended baseline tool stack for modern B2C and B2B companies.

How it works: B2C Stack: Amplitude (CDP/Analytics), Customer.io or Braze (Email), Snowflake (Data Warehouse), Hightouch (Reverse ETL), AppsFlyer (Mobile Attribution). B2B Stack: Amplitude (Analytics), Salesforce (CRM), Hightouch (Reverse ETL), Branch (Web Attribution), Braze (Email).

