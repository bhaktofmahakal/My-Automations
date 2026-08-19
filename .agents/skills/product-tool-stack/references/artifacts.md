# Product Stack Strategy - Frameworks, Templates & Checklists

*40 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### All-in-One Product Platform Workflow (Holy Grail Flow) (A year free of PostHog ($16,500 value): The all-in-one analytics, experimentation, feature flag, surveys, session replay, error tracking, data warehouse, LLM analytics platform)
Lenny's description of the ideal end-to-end product debugging and improvement workflow enabled by an all-in-one platform like PostHog.

How it works: The 'holy grail' workflow for product teams using an all-in-one platform:
1. Discover an issue via session recording
2. Assess its impact in analytics
3. Ship a fix using a feature flag
4. Test a variant through experimentation
5. Collect feedback with surveys

This workflow demonstrates why an integrated platform can be more powerful than stitching together point solutions — the data flows seamlessly between steps.

### Lenny's Modern PM Tool Stack (Part 1) (How to get the most out of your product pass, part 1)
A curated toolkit of 8 AI-native tools organized by PM workflow need, covering app building, terminal tasks, project tracking, communication, presentations, prototyping, video creation, and design research.

How it works: Tool Stack Map:
1. Replit — Vibe-coding & app building (full-stack, hosted, with DB, auth, security)
2. Warp — AI-powered terminal (troubleshooting, automation, data analysis, package management)
3. Linear — Project tracking & roadmap (tasks, projects, roadmap, agent delegation)
4. Wispr Flow — Voice dictation (cross-platform, context-aware, learns your terms)
5. Gamma — AI presentations & docs (decks, landing pages, documents from prompts or data)
6. Magic Patterns — AI prototyping (frontend-only, uses your component library, rapid iteration)
7. Descript — Video/audio editing (text-based editing, agentic editor 'Underlord')
8. Mobbin — UX design reference library (mobile/web patterns, competitor benchmarking)

Part 2 (upcoming): Lovable, Bolt, n8n, Granola, Superhuman, Raycast, Perplexity, ChatPRD

### Product Builder's Starter Pack (Lenny's Product Pass Stack) (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
A curated stack of 7+ tools that together form a complete toolkit for product builders, covering ideation, prototyping, documentation, communication, productivity, research, and incorporation

How it works: The stack consists of: 1) Lovable — AI vibe-coding for prototypes and apps from sketches/screenshots/ideas; 2) Bolt — Enterprise-grade AI vibe-coding with frontier agent integration (Claude Code, OpenAI Codex, Gemini CLI); 3) Granola — AI meeting notepad that transcribes silently, enhances notes, enables search across all meetings; 4) ChatPRD — AI platform for writing PRDs, standardizing specs, integrating with Linear/Lovable/Bolt; 5) Superhuman — Email productivity tool for inbox zero, AI replies, team snippets, smart filtering; 6) Raycast — Mac launcher replacing Spotlight with app launching, window management, snippets, timers, AI chat; 7) Perplexity/Comet — AI answer engine with citations and AI-powered browser; 8) Stripe Atlas — Startup incorporation automation (EIN, founder stock, 83(b) elections). Additional tools mentioned as integrations: Gamma, Magic Patterns, Linear.

### Product Builder's Toolkit Categories (Lenny's Product Pass: 20+ free premium products, available exclusively for paid annual subscribers)
A categorization framework for the essential tool stack a product builder needs, organized by workflow stage.

How it works: Seven categories: 1) Research — tools for deep research and AI-powered search (Manus, Perplexity). 2) Design — tools for visual design, prototyping, presentations, and design inspiration (Canva Business, Framer, Gamma, Mobbin). 3) Build — tools for AI-assisted coding, app building, workflow automation, and voice/audio (Lovable, Replit, Bolt, n8n, Amp, Factory, Devin, Warp, Magic Patterns, ElevenLabs). 4) Scale — infrastructure and deployment (Railway). 5) Track — analytics and product tracking (PostHog). 6) Collaborate — project management, voice dictation, meeting notes, and AI product management (Linear, Wispr Flow, Granola, ChatPRD). 7) Incorporating your startup — legal and financial setup (Stripe Atlas).

### Ramp's Product Tool Stack Principles (How Ramp builds product)
Four principles for selecting and using tools that maximize productivity without creating process overhead

How it works: 1. Let teams decide for themselves what tools to use that maximize productivity. Some use notepads, some GitHub tasks, some Linear. Don't track tasks — track whether you shipped what you said you would. No burndown, velocity, story points.

2. Enforce a high bar for communication standards. Everything is publicly available. Teams publish openly with high clarity and succinctness: goals, progress, and targets.

3. Invite anyone to give opinions on UX improvements. #UX-input Slack channel where anyone can post improvements. Triage using emoji which auto-creates Linear tickets. GPT summarizes issues. Teams burn down a fixed percentage of improvements every sprint.

4. Get the important things done today. Don't maintain a backlog. Bugs: fix them (on-call engineers). If not fixed, it escalates again if important. Backlog grooming is low-leverage in high-velocity environments because context changes too quickly.

### Safe Bet vs. Early-Adopter Bet Framework (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A simple evaluation lens for choosing software tools: identify the 'safe bet' (most commonly used, established product) and the 'early-adopter bet' (emerging up-and-comer worth trying) in each category

How it works: For each software category, evaluate tools along two dimensions: (1) Safe Bet — the go-to product that most teams are already using, lowest risk choice; (2) Early-Adopter Bet — emerging tools that are gaining traction but not yet dominant, higher potential upside. Apply this across every functional area of your stack.

### Tool Selection Criteria for PM Stack (How to get the most out of your product pass, part 1)
Implicit criteria Lenny uses to evaluate and recommend tools for the modern PM toolkit.

How it works: Criteria observable from Lenny's evaluations:
1. Speed of output — How quickly can you go from idea to result? (e.g., Gamma: 'clicked a few buttons and...magic')
2. Quality of output — Does it produce professional, polished results? (e.g., Magic Patterns: 'highest-quality, most useful, most correct results')
3. Accessibility to non-engineers — Can PMs/designers use it without technical expertise? (e.g., Warp: 'originally built for engineers but increasingly used by PMs')
4. AI-native design — Is it built around AI from the start? (e.g., Gamma: 'AI-native from day one')
5. Focus/specificity — Does it solve a specific problem well vs. trying to do everything? (e.g., Magic Patterns: 'not trying to be everything to everyone')
6. Daily usability — Is it something you actually reach for regularly? (e.g., Descript: 'I use it basically every day')
7. Integration with existing workflows — Does it work with your current tools? (e.g., Wispr Flow: 'works with every vibe-coding tool and IDE')

## Templates

### Tool Comparison Prompt Template (How to use Perplexity in your PM work)
A reusable prompt structure for comparing software tools using Perplexity or other AI chatbots

How it works: Template: 'Compare and contrast [Tool A], [Tool B], and [Tool C]. Include key features, existing customers, differentiation points, and user reviews.'

Example: 'Compare and contrast product analytics tools: Amplitude, Mixpanel, and Posthog. Include key features, existing customers, differentiation points, and user reviews.'

Dimensions to include in comparison:
- Key features
- Existing customers
- Differentiation points
- User reviews

### Typical Analytics Stack (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A reference architecture for a startup analytics stack based on crowdsourced data

How it works: Typical analytics stack: Segment (data collection/routing) + Google Analytics OR Amplitude OR Mixpanel (product analytics) + BigQuery OR Snowflake (data warehouse) + dbt (data transformation) + Fivetran (data ingestion). Most common individual tools: Google Analytics, Segment, Amplitude, Mixpanel, BigQuery. Up-and-comers: Avo, Plausible.

### Typical Data Science Stack (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A reference list of the most common data science tools based on crowdsourced data

How it works: Most common data science tools: Jupyter (notebooks), Pandas (data manipulation), Google Cloud (cloud platform), Python (programming language), Rstudio (statistical computing), Visual Studio Code (code editor). No clear up-and-comers identified.

### Typical Design Stack (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A reference architecture for a design tool stack based on crowdsourced data

How it works: Typical design stack: Figma OR Sketch OR Adobe XD (design tool) + Notion (documentation/specs) + Whimsical OR Miro (whiteboarding/wireframing). Most common: Figma, Notion, Sketch, Adobe XD, Webflow, Whimsical. Up-and-comers: Miro, Origami, Excalidraw. Key insight: Figma is far ahead of competitors.

### Typical Product Management Stack (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A reference architecture for a PM tool stack based on crowdsourced data

How it works: Typical PM stack: Slack OR Teams (communication) + Jira OR Trello OR Productboard OR Asana (project management) + Notion OR Google Docs (documentation) + Google Sheets (analysis/tracking) + Figma (design collaboration). Most common: Slack, Jira, Notion, Figma, Google Docs/Sheets, Miro, Confluence. Up-and-comers: Productboard, Whimsical, Roam, Linear, ClickUp.

### Typical User Research Stack (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
A comprehensive reference architecture for a user research tool stack covering the full research workflow

How it works: Typical user research stack: Zoom (interviews) + Calendly (scheduling) + Airtable (participant tracking/data management) + Typeform OR SurveyMonkey OR Qualtrics (surveys) + Notion (documentation/synthesis) + Dovetail OR EnjoyHQ (research repository/analysis) + Google Analytics OR Fullstory OR Hotjar (behavioral analytics) + Lookback OR UserTesting (usability testing). Most common: Zoom, Calendly, Miro, G-Suite, Typeform. Up-and-comers: Dovetail, EnjoyHQ.

## Checklists

### Day-One Startup Software Checklist (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
The most commonly purchased or set up software in the first couple of months of starting a company, ranked by frequency of mention

How it works: Software to set up in first months of a startup (ranked by frequency): 1. Slack (communication — far ahead as #1), 2. G-Suite (email, docs, sheets), 3. GitHub (code repository), 4. Notion (documentation/wiki), 5. Figma (design), 6. Zapier (automation), 7. Quickbooks (accounting). Also frequently mentioned: Webflow (website), Calendly (scheduling), Airtable (flexible database), Heroku (hosting), Canva (quick design).

### Highest Monthly Software Spend Ranking (What's in your software stack — Product, Design, Analytics, DS, Research, and more)
Software products that startups spend the most money on each month, useful for budgeting and cost planning

How it works: Top monthly software expenses for startups (ranked by frequency of mention): 1. Intercom (far ahead — customer communication), 2. AWS (cloud infrastructure), 3. G-Suite (productivity), 4. Slack (communication), 5. Zapier (automation). Also frequently mentioned: Heroku (hosting). Key insight: Intercom was surprisingly the #1 most expensive monthly software spend.

### Lenny's Product Pass Tool Collection (A free year of Devin: the world’s most advanced autonomous AI software engineer)
The full list of premium tools available free for one year to Lenny's Newsletter subscribers, with a total stated value over $10,000.

How it works: Tools included (free year each):
1. Devin (Insider only) - $1,350 value
2. Lovable
3. Replit
4. Bolt
5. n8n
6. Wispr Flow
7. Descript
8. Linear
9. Gamma
10. Superhuman
11. Granola
12. Warp
13. Perplexity
14. Raycast
15. Magic Patterns
16. Mobbin
17. ChatPRD

Total stated value: Over $10,000
Subscription cost: $350/year (Insider tier)
Redemption: lennysproductpass.com
Additional benefits: Newsletter access, private Slack community

### PM Use Cases for Each Tool (How to get the most out of your product pass, part 1)
Specific actionable use cases for how PMs, founders, and product teams can use each tool in the stack.

How it works: Replit PM Use Cases:
- Build product pass / internal workflows
- Prototype startup ideas
- Build automations
- Create fully featured websites
- Take on freelance development projects

Warp PM Use Cases:
- Download and convert media files
- Analyze local data (e.g., transcripts, logs)
- Install packages with complex dependencies
- Build clones/prototypes
- Teach others basic technical tasks

Linear PM Use Cases:
- Track team tasks and projects
- Build and share roadmaps
- Manage customer feedback
- Delegate tickets to AI agents
- Monitor team progress with dashboards

Wispr Flow PM Use Cases:
- Dictate long messages instead of typing
- Talk to chatbots and AI tools
- Vibe code by voice
- Transcribe professional notes (e.g., doctors)
- Speed up any text-heavy workflow

Gamma PM Use Cases:
- Generate custom sales decks per outreach
- Create landing pages in 5 minutes
- Turn meeting notes into decks + follow-up emails
- Create unique resumes
- Turn PRDs into presentation decks
- Create shareable content summaries

Magic Patterns PM Use Cases:
- Paste PRD → create prototype → share with engineering
- Create personalized customer demos
- Skip Figma for rapid prototyping
- Use your own component library for on-brand prototypes
- Build internal tools

Descript PM Use Cases:
- Create product launch videos
- Make design walk-through videos
- Create LinkedIn video posts
- Create YouTube shorts/clips
- Build avatar-based product demos
- Create ads

Mobbin PM Use Cases:
- Get design inspiration for new features
- Copy best-in-class flows into Figma
- Benchmark your product against competitors
- Elevate your design taste
- Study UX patterns of top apps

### Perplexity's Product Toolstack (How Perplexity builds product)
The specific tools Perplexity uses for task management, documentation, and feedback, with notes on how they use each

How it works: 1) Linear — Task management and bug tracking. Key features used: Leads, Triage, Sizing, auto-archiving (if a task hasn't been mentioned in a while, it's probably not important). Also used for collecting follow-up ideas from brainstorms. 2) Notion — Source of truth for roadmaps and milestone planning. Used during development for design docs and RFCs. Used afterward for documentation, postmortems, and historical records. Philosophy: 'Putting thoughts on paper (documenting chain-of-thought) leads to much clearer decision-making, and makes it easier to align async and avoid meetings.' 3) Unwrap.ai — Consolidates, documents, and quantifies qualitative feedback. Groups individual feedback into concrete themes and areas of improvement. Especially useful for AI products where issues aren't always deterministic enough to classify as bugs. 4) Slack — Used for brainstorm channel, async feedback sharing, and general communication.

### Raycast power-user features list (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
A list of specific Raycast capabilities beyond basic app launching

How it works: 1) Quickly launch and switch between apps; 2) Do math calculations; 3) Find random system settings; 4) Position windows on screen; 5) Set timers; 6) Create snippets of frequently used text; 7) Extract colors from any image; 8) Talk to ChatGPT; 9) Smartly search emojis; 10) Standardized email reply snippets; 11) Powerful file search; 12) Launch most-used apps via hotkeys; 13) Custom shortcuts for window management commands; 14) Auto-join meetings without clicking links.

## Examples

### Carta's Standard Kit Strategy (Will Larson)
Carta's engineering strategy document defining the standard set of approved tools, written by engineer Eric Vogel, constraining technology choices to focus energy on business problems.

How it works: Strategy: Only use the standard kit of tools already in use today. Written by engineer Eric Vogel. Prevents introduction of new programming languages, databases, cloud providers without explicit exception. Some engineers frustrated by loss of control, but focuses energy on problems the company values.

### Lenny's Curated Product Stack (2025 Edition) (Lenny's Product Pass: 20+ free premium products, available exclusively for paid annual subscribers)
The specific 20+ products Lenny recommends as the best-in-class tools for product builders, organized by category with tier availability noted.

How it works: Research: Manus (Annual+), Perplexity Pro (Annual+). Design: Canva Business (Insider only), Framer (Annual+), Gamma (Insider only), Mobbin (Annual+). Build: Lovable (Insider only), Replit (Insider only), Bolt (Insider only), n8n (Annual+), Amp (Annual+), Factory (Annual+), Devin (Insider only), Warp (Annual+), Magic Patterns (Annual+), ElevenLabs (Insider only). Scale: Railway (Annual+). Track: PostHog (Annual+). Collaborate: Linear (Annual+), Wispr Flow (Annual+), Granola (Annual+), ChatPRD (Annual+). Incorporating: Stripe Atlas (Insider only). Products marked with * are Insider-tier exclusive.

### Uber's No-Cloud Strategy (Will Larson)
Uber's engineering strategy of running only in their own data centers, which constrained technology choices but enabled rapid geographic expansion independent of cloud provider presence.

How it works: Strategy: No cloud, own data centers only. Tradeoff: Had to build/run everything themselves. Benefit: Could spin up in China in 3 months (racks didn't fit, had to remove data center roof and crane them in). Companies relying on cloud were fully constrained by AWS/GCP/Azure presence. Engineers hated it but it enabled competitive advantage. Era: ~2014.

## Tools

### AI Text-to-SQL Slack Bot (Albert Cheng)
An internal tool that allows team members to ask ad-hoc data questions in plain English.

How it works: Integrates with Slack to provide first-pass data analysis, reducing the bottleneck on data analysts and encouraging a higher volume of data inquiries from the team.

### Amplitude + Segment + Hotjar Stack (Laura Schaffer)
A specific integration stack used to diagnose anomalous quantitative data with qualitative video.

How it works: 1) Spot an anomaly in an Amplitude report. 2) Use Segment to identify the specific event name. 3) Plug that event into Hotjar to watch actual screencasts of users performing the behavior to form a hypothesis.

### Ask Data AI (Jess Lachs)
An internal AI chatbot used to empower non-technical users.

How it works: A tool that helps employees edit and adjust SQL queries on their own (e.g., filtering for a specific business unit) without needing to take up data team bandwidth.

### Calendly Product Team Tech Stack (Annie Pearl)
The suite of tools used by Calendly's product team for planning, tracking, and communication.

How it works: Google Docs/Slides (strategy/planning), Mural (brainstorming), Aha! & Airtable (roadmap tracking), Slack & Loom (communication), Jira (bug management), Confluence (documentation), Pendo (in-product education).

### ChatGPT Mac App (How to use ChatGPT in your PM work)
A native Mac application for ChatGPT that Lenny finds handy for quick access

How it works: GitHub repository: https://github.com/vincelwt/chatgpt-mac — A native Mac app for ChatGPT that provides quick desktop access without needing a browser tab.

### Duolingo Product Team Tool Stack (How Duolingo builds product)
The complete set of tools used by Duolingo's product teams for day-to-day work

How it works: Task management and bugs: Jira (for everything). Internal communication: Slack + email (written communication), Zoom (meetings). Collaboration: Google Docs (official documents like product specs), Figma (product designs), Confluence (storing companywide information). Brainstorming: Figma, Google Docs, or old-school whiteboard (Cem still finds in-person brainstorming with whiteboard very powerful). Emerging: GPT-4 — generating draft content for feature ideas (e.g., new story types), summarizing long documents, writing presentations that rhyme for fun.

### Figma's Product Tool Stack (How Figma builds product)
The combination of tools Figma uses for different parts of the product execution process.

How it works: Asana: Primary tool for project management and bug tracking. FigJam: Used for planning, visualizing Gantt charts, design crits, product reviews, and OKR/commitment tracking. Coda: Used to flow Asana data into different views for different stakeholder types. Slack: Used for automated crit sign-up reminders. Philosophy: Use different tools for different parts of the process rather than forcing everything into one tool.

### Gong Product Team Tool Stack (How Gong builds product)
The complete set of tools used by Gong's product and engineering teams for different workflows

How it works: Jira: Engineering development lifecycle and bug tracking. Used to formalize CI/CD process. PMs do not 'live' in Jira — some create Jira cases for features, some don't.
Productboard: Customer request collection by PM and UX teams. Multiple entry points: direct customer requests, requests captured in calls, requests from online reviews. Dedicated person filters and routes features so PMs focus on substance.
Airtable: High-level feature release plan and tracker. PMs input all planned features at beginning of each quarterly cycle. Tracks full feature lifecycle 'soup to nuts.' Contains: short business rationale, links to longer documents, status, impact. Single source of truth for anyone at Gong wanting to know where a feature is in its lifecycle.

### Growth Team SaaS Stack (Ben Williams)
The core software tools recommended for running a modern growth and product organization.

How it works: Amplitude (product analytics), Segment (CDP/data routing), FullStory (session replays), UserInterviews.com (research recruiting), Sprig (in-app surveys and UX testing), Airtable (experiment plans and knowledge base).

### Lenny's Recommended Product Stack (2025 Bundle) (Announcing the greatest product bundle ever: Get a year free of Granola, Notion, Superhuman, Linear, and Perplexity with an annual subscription)
A curated set of five productivity tools selected from Lenny's community survey as the most beloved products for PMs, founders, and teams.

How it works: 1. Granola (granola.ai) — AI meeting notes, Business plan, up to 100 seats. Category: Meeting productivity.
2. Notion Plus (notion.com) — Docs, wikis, and project management with unlimited AI, up to 10 seats. Category: Documentation & collaboration.
3. Linear (linear.app) — Issue tracking and project management, Business plan, 2 seats. Category: Engineering/product project management.
4. Superhuman (superhuman.com) — Fast email client, Starter plan. Category: Email productivity.
5. Perplexity Pro (perplexity.ai) — AI-powered search and research tool, Pro plan. Category: AI research & search.

Selection criteria: Ranked among most beloved products in Lenny's 'What's in your stack' survey. Attributes: beautiful, fast, and make your life better.

### Miro Product Tool Stack (Varun Parmar)
The complete set of tools used by Miro's product org across the development lifecycle

How it works: Jira: Ticket management, roadmap views, sprint management. Confluence: Specs and documentation. Google Docs: Additional documentation. Coda: KR tracking. Miro: Insights hub (user research recordings on boards), brainstorming/ideation, presentations (Showtime feature), async reviews (Talktrack), dashboards (embedded Looker visualizations), roadmap enablement for field teams. Google Looker: Analytics dashboards (embedded into Miro boards). Slack: Communication, async product review channels (anyone can subscribe). Roadmapping is not fully solved—some teams use Miro Kanban, but no universal roadmapping solution.

### Miro's Product Development Tool Stack (How Miro builds product)
The full set of tools used by Miro's product organization across the product development lifecycle

How it works: Task management and bugs: Jira. Async messaging: Slack. Documentation: Coda, Confluence, Google Docs, Miro boards. Product development lifecycle: Miro (design sprints, product reviews, retros, mapping user flows). Async presentations: Miro Talktracks (board recordings). Product roadmapping: Still exploring - noted as the one area where they haven't found the ideal tool. Miro templates referenced: Design Sprint (Jake Knapp template), Product Alignment Document Template, Sailboat Retro.

### Notion's Product Team Tool Stack (How Notion builds product)
The complete set of tools used by Notion's product team

How it works: - **Notion**: Hub for writing, project management, presentations, and all knowledge work. Everything embeds into Notion.
- **Figma**: Design tool
- **Statsig**: Experiment setup and analysis (A/B testing)
- **Hex**: Data analysis
- **Email**: Used for async product review check-ins (engineer/designer/PM/EM sends status at each review stage)

### OpenAI Developer Platform Stack (Sherwin Wu V2)
Layered API platform from low-level model access to full agent deployment toolkit

How it works: Layer 1 - Responses API: Lowest-level primitive, send text to model, get response back, optimized for long-running agents, super unopinionated. Layer 2 - Agents SDK: Framework for building agent loops with sub-agents, guardrails, task delegation, swarm orchestration. Layer 3 - AgentKit & Widgets: Pre-built UI components for agent interfaces. Layer 4 - Evals API: Quantitative testing and evaluation of agent/workflow performance. Philosophy: Use the full stack for speed or go as low as Responses API for full control.

### Remote PM Tech Stack (Nickey Skarstad)
Specific software tools recommended for managing product teams asynchronously.

How it works: Loom (for quick async video updates to the team), Slack Huddles (for 30-second audio-only syncs to replace water cooler chats), Miro/FigJam (for remote whiteboarding), Superhuman (for email productivity).

### Shopify Product Team Tool Stack (How Shopify builds product)
The minimal set of tools used by Shopify's product teams

How it works: Core tools: 1. GSD (Get Shit Done) - Homegrown project tracking and stakeholder review tool. Every project must be registered here. 2. Google Docs - For documentation and writing. 3. GitHub Issues - For sprint-level task tracking, tickets, and day-to-day management. 4. Descript - For sending async review videos around. Notably NOT used: Jira, Asana. Philosophy: Keep it simple. Consolidate to prevent tooling chaos where every team picks their own tools.

### Snowflake Product Team Tool Stack (How Snowflake builds product)
The complete set of tools used by Snowflake's product teams for different workflows

How it works: - Google Docs: Primary tool for product documents, reviews, discussions. Most time spent here. Makes learnings shareable and discoverable.
- Notion: Complementary tool for customer conversations, hypotheses and research, product updates. Organized hierarchy. Spread from Streamlit team after acquisition.
- Figma: UI design, user journey design, commenting
- Slack: Team communications. Public channels for each feature and workload where marketing, sales, support, and product collaborate.
- Snowflake: All data and data analysis (Snowflake worksheets for SQL queries and Python code)
- Whiteboards: In-person brainstorming in conference rooms

### Startup Analytics Stack Progression (Crystal W)
Recommended data tools based on company stage.

How it works: Early/Free: Google Data Studio or Metabase. Mobile CRM: CleverTap. Scale/Routing: Segment and Amplitude. Experimentation: Eppo.

