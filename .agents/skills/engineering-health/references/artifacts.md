# Engineering Health and Productivity - Frameworks, Templates & Checklists

*32 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### Amdahl's Law Applied to AI Productivity (Varun Mohan)
Using parallel computing's Amdahl's Law to debunk the claim that 90% AI-written code means 10x engineer productivity—because engineers spend time on many tasks beyond writing code.

How it works: Even if AI writes 90% of code, engineers also: review code, test code, debug code, design code, deploy code, navigate code. If writing is 30 of 100 units of time and AI reduces it to 3, total improvement is only 27% (100→73). Real observed improvement: ~30-40%. Implication: Companies should hire MORE engineers because the ROI per engineer has increased, not because fewer are needed.

### Core 4 Framework (Introducing Core 4: The best way to measure and improve your product velocity)
A unified developer productivity framework with four dimensions designed to hold each other in tension, providing a balanced view of team performance. Co-authored by Abi Noda, Laura Tacho, Nicole Forsgren, Margaret-Anne Storey, and Michaela Greiler.

How it works: Four dimensions:

1. **Speed** - How fast work moves through the development process
   - Key metric: PR Throughput (pull/merge requests per engineer per week)
   - Supporting metrics: PR cycle time, deployment frequency
   - Note: PR throughput is controversial but used successfully at Meta, Microsoft, Uber. Must only be used as a system health metric, never for individual evaluation, and always alongside other metrics.

2. **Effectiveness** - The developer experience and how well tools/processes support developers
   - Key metric: Developer Experience Index (DXI) - measured as percent of favorable responses (Top 2 Box score)
   - Covers: cognitive load, feedback loops, flow state
   - Qualitative + quantitative: tells you WHY things are happening

3. **Quality** - The reliability and stability of the software
   - Key metric: Change failure rate
   - Supporting metrics: bug rates, incidents, rollback frequency

4. **Impact** - What the work is being spent on
   - Key metric: Percentage of time spent on new capabilities
   - Note: More is NOT always better. Too much = neglected maintenance. Too little = stifled innovation.

Design principles:
- Metrics are designed to be used TOGETHER as a system (not individually)
- Balances qualitative and quantitative measurements
- Quantitative shows WHAT is happening; qualitative shows WHY
- Four dimensions hold each other in tension (can't game one without hurting another)
- Unifies principles from DORA, SPACE, and DevEx frameworks

### DORA Metrics (The Four Keys) (Nicole Forsgren)
Four metrics to measure software delivery performance, split into speed and stability.

How it works: Speed metrics: Lead time for changes, Deployment frequency. Stability metrics: Mean time to restore (MTTR), Change fail rate. Elite benchmarks: Deploy on-demand, lead time < 1 day, MTTR < 1 hour, change fail rate 0-15%.

### DORA Metrics (as diagnostic, not evaluative) (Will Larson)
The four metrics from Accelerate (lead time, deployment frequency, incident remediation time, failure rate) positioned as diagnostic tools to find where to invest, not as evaluation tools for team performance.

How it works: Four metrics: Lead time, deployment frequency, incident remediation time, change failure rate. From Accelerate by Nicole Forsgren and Gene Kim. Will's key reframe: These are diagnosis metrics, not evaluation metrics. Slow deployments tell you where to focus improvement, not whether to fire engineers. 50+ startups sell dashboards for these. Will recommends: Start measuring something imperfect rather than measuring nothing because no measure is perfect. Use imperfect metrics as education opportunities to help executives understand the nuances underneath.

### DORA, SPACE, and DevEx Framework Comparison (Introducing Core 4: The best way to measure and improve your product velocity)
A summary comparison of the three major developer productivity frameworks that Core 4 unifies.

How it works: 1. DORA Metrics:
   - Focus: Software delivery capabilities
   - Key metrics: Deployment frequency, lead time to change, change failure rate, time to recover from failed deployment
   - Strength: Widely accepted 'starter metrics' due to popularity and focused scope
   - Weakness: Can often be misapplied

2. SPACE Framework:
   - Focus: Five dimensions of developer productivity
   - Dimensions: Satisfaction & well-being, Performance, Activity, Communication & collaboration, Efficiency & flow
   - Strength: Very thorough definition of productivity
   - Weakness: Doesn't come with a turnkey list of things to measure (by design)
   - Co-author: Margaret-Anne Storey

3. DevEx Framework:
   - Focus: Developer experience tied to productivity
   - Dimensions: Cognitive load, feedback loops, flow
   - Strength: Correlated with higher productivity
   - Weakness: Somewhat disconnected from productivity definitions used in other parts of the business
   - Co-authors: Abi Noda, Michaela Greiler

Core 4 unifies principles from all three into a single actionable set of metrics. Margaret-Anne Storey: 'The SPACE framework was never meant to provide prescriptive metrics or tell you what exactly to measure. Core 4 gives you a list of things to start with that's aligned to SPACE and DevEx, making it more practical for companies to use.'

### Engineer-cation (David Singleton)
A practice for engineering leaders to stay connected to the developer experience.

How it works: Clear calendar for 3-4 days, decline all meetings, join a team, get assigned a buddy, pick up a small feature, ship it to production, and write a friction log of the dev tools and processes.

### Four Types of Software Testing (Become a more technical product manager)
A hierarchy of testing types that PMs should understand, from lowest-level code tests to user-facing acceptance tests

How it works: Four types of testing:
1. Unit Tests - Code written to test individual functions. Example: function Double(4) should return 8. The percentage of codebase with associated unit tests is called 'coverage.'
2. Integration Tests - Tests between different components of the software. Example: testing that a new upsell feature at checkout works properly with the tax calculation service. Targeted testing between independent but closely related components.
3. End-to-End (E2E) Tests - Full walkthrough of the desired workflow interacting with all relevant systems. More time-intensive but reveals issues you might not otherwise find, especially when workflows depend on many services working together.
4. User Acceptance Tests (UAT) - Typically in the domain of product or design. Users use the current version of the feature from beginning to end with minimal intervention. Reveals if interaction design is intuitive or needs more work.

PM tip: Testing is a high-leverage area for PMs. A quick round of E2E testing with your engineering team before a major release catches issues before production.

### Goalie Rotation for Bug Triage (How Linear builds product)
A weekly engineering rotation system for handling incoming bugs and support requests without disrupting project teams.

How it works: How it works:
1. Support team, sales team, and leadership file issues into the Triage inbox (Linear's Triage feature)
2. One engineer per week is designated as the 'goalie'
3. The goalie's responsibilities:
   - Help the support team with technical issues
   - Fix bugs directly when possible
   - Route/triage incoming requests to the appropriate person
4. Rotation is weekly, so no single engineer is permanently pulled off project work
5. Project teams manage their own tasks and share weekly project updates via Linear's Project Updates feature, posted to a #product-updates Slack channel

### Quarterly Grease Week (How Duolingo builds product)
A dedicated quarterly week where a product team exclusively works on clearing bugs and technical debt

How it works: Frequency: Once per quarter. Duration: One full week. Focus: Team works only on bugs (primarily P1/P2 issues that have accumulated). Purpose: Prevents bug backlog from growing unmanageable while allowing normal sprint work to focus on features. Context: P0 bugs are triaged and addressed immediately regardless. P1/P2 bugs are worked through at team's pace normally. Grease week provides a dedicated catchup mechanism.

### ROI Framing for Engineering Efficiency Investments (Introducing Core 4: The best way to measure and improve your product velocity)
Two complementary frames for presenting the business case for developer experience improvements to leadership.

How it works: Frame 1 - Money:
- Calculate weekly salary equivalent of recovered developer time
- Example: 2 FTEs worth of time savings = $9,600/week = ~$500K/year
- Calculate cost of waiting time (e.g., 1,000 dev hours × hourly rate = $120K/week)

Frame 2 - Time:
- Express savings as capacity to bring revenue-generating features to market faster
- Example: 2 FTE developers or 1,000 hours of saved waiting time redirected to feature work

Key research correlation to use:
- 1 point DXI improvement = 13 minutes saved/week/developer = 10 hours/year/developer
- Source: Data from 40,000 developers across 800 organizations

Choose the frame that resonates most with your teams and leadership based on company size and stage.

Note: These calculations are not perfect, but they make the stakes easier to understand when comparing infrastructure projects vs. new features.

### SPACE Framework (Nicole Forsgren)
A framework for measuring complex creative work across five dimensions to ensure balanced metrics.

How it works: S: Satisfaction and wellbeing, P: Performance, A: Activity, C: Communication and collaboration, E: Efficiency and flow. Rule of thumb: Pick at least three dimensions at a time to keep metrics in balance and avoid optimizing for the wrong things.

### Technical Debt Runway (Gaurav Misra)
A mental model that treats technical debt like financial leverage, using an 'interest rate' to determine when debt becomes fatal to a startup.

How it works: Evaluate tech debt by its 'interest rate'—the percentage of daily engineering time lost to bugs, crashes, and maintenance. If you take on too much debt, you hit 80-90% interest and only 'keep the lights on.' You must deliver enough product value to hire more engineers to pay off the principal before your 'runway' (available time) runs out.

### Time to Value (TTV) Metric (Inbal S)
A metric to replace 'time saved' when evaluating developer productivity tools.

How it works: Measures the duration from putting a developer on a task until the full potential or value of that task is realized (e.g., generating revenue, user adoption, or time to market).

## Templates

### Core 4 Baseline Survey Template (Introducing Core 4: The best way to measure and improve your product velocity)
A plug-and-play survey template to send to engineering teams to collect baseline measurements across all four Core 4 dimensions. Responses must be anonymous.

How it works: Google Sheets template available at: https://docs.google.com/spreadsheets/d/1brKPLRJ9DDQAAFr1GM4hcFZg9zGUAGplQw2OkVx52Ls/edit?usp=sharing

Key design notes:
- Use any survey tool (Google Forms, Microsoft Forms, Typeform, etc.)
- Must be able to view responses in a spreadsheet to calculate averages
- Responses MUST be anonymous to preserve trust
- Designed for people who write code as part of their job
- Depending on company size, collect demographic info (team identity, tenure) for segmentation
- Contains questions covering Speed, Effectiveness, Quality, and Impact dimensions

Calculation methods:
- Speed: Average value of responses
- Quality: Average value of responses
- Impact: Average value of responses
- Effectiveness: Percent of favorable responses (Top 2 Box score) across all Effectiveness responses

Recommended cadence: Quarterly surveys after initial baseline

### Core 4 Summary Slide Deck (Introducing Core 4: The best way to measure and improve your product velocity)
A presentation deck explaining Core 4—why it was designed and how it can be used—suitable for sharing with leadership teams.

How it works: Google Slides presentation available at: https://docs.google.com/presentation/d/15RQzf8UtXjhdq9AA6dxRUk9940vQzfta7dfHs9cy9mM/edit?usp=sharing

Designed to be shared with leadership teams to get buy-in for adopting Core 4.

## Checklists

### Engineering Productivity Demonstration Approach (Will Larson)
A three-layer approach to demonstrating engineering team productivity to boards and executives, from mechanical benchmarking to meaningful impact storytelling.

How it works: Layer 1 - Benchmarking: Compare R&D spend, engineering headcount, and infrastructure costs against industry data from VC funds. Gets a defensible answer but isn't insightful. Layer 2 - Direct conversations: Talk to engineers regularly—they know if teams are effective and will tell you why not. Their diagnoses may be wrong but provide starting crumbs to trace. Layer 3 - Alignment and storytelling: Align engineering evaluation to business/product goals. Show a roadmap of valuable things delivered in last 6 months with explained impact. If you can't populate that list, you have a real problem. If you can, people will give you space.

### Fix Poor Build and Test Processes (Introducing Core 4: The best way to measure and improve your product velocity)
Success signals and specific actions to optimize build and test processes that are slowing developers down.

How it works: Success signals:
- Builds have predictable runtimes, allowing engineers to effectively manage their time around workflow pauses
- Builds are stable and rarely require manual intervention or fail due to factors outside of the contributor's code changes

What to do:
1. Implement caching for dependencies or other common build environment setup steps (immediate speed improvement by eliminating unnecessary setup time)
2. Parallelize steps when possible (e.g., frontend and backend tests running simultaneously)
3. Improve test efficiency by:
   a. Adding retries
   b. Removing dependency order
   c. Breaking larger tests into smaller ones where possible

### Improve Production Debugging Support (Introducing Core 4: The best way to measure and improve your product velocity)
Success signals and specific actions to help developers more easily investigate customer-facing issues and application performance.

How it works: Success signals:
- Developers can rapidly examine a variety of system events and metrics to diagnose and address issues quickly
- Requests can be identified, isolated, and traced through systems effectively by engineers

What to do:
1. Adopt structured logging to keep log data organized, readable, and searchable
2. Block off dedicated time for the team to add new log statements to existing code (immediate boost to tracing and diagnosing)
3. Develop a mechanism to track a user's interactions in the UI (helps pinpoint bottlenecks or failures)
4. Establish shared dashboards for system health metrics (improves transparency, benefits everyone)

Bonus - Documentation improvements:
- Standardize documentation templates
- Delete stale documentation
- Use AI to transcribe and summarize recent product demo meetings
- These small changes improve discoverability of information globally

### Signs You Need a Platform Team (Camille Fournier)
Criteria to evaluate if a company is ready to invest in a dedicated platform engineering team.

How it works: 1. Reached 50+ engineers. 2. Ad hoc coordination between teams is failing. 3. Multiple teams are solving the same infrastructure problems. 4. Hitting core scaling issues that slow down developer productivity.

### Unsexy Investment Justification Playbook (Casey Winters)
Tactics to get buy-in for tech debt, performance, and UX improvements.

How it works: 1. Align peer leaders (engineering, design) first. 2. Build custom metrics to show value. 3. Run small tests to prove worth. 4. Create team principles. 5. Frame the investment as protecting existing product-market fit from eroding.

## Examples

### Airbus A350 Production Ontology (Nabeel S. Qureshi)
A case study of mapping complex SAP database tables into human-readable concepts to 4x production speed.

How it works: Palantir embedded engineers at the Airbus factory to solve a production bottleneck. They pulled obscure SAP tables (e.g., S3_F1_Z) and mapped them to human concepts (part, work order, aircraft) to create an 'Asana for making planes', allowing workers to see exactly what work was pending at each station.

### Digg V4 Rewrite Failure (Will Larson)
The story of Digg's complete system rewrite that resulted in a month of downtime and contributed to the company's eventual failure, serving as a cautionary tale about full rewrites.

How it works: Context: Board/CEO decided Digg needed social features to compete with Twitter/Facebook. Previous version couldn't support it. Decision: Complete rewrite (2.5 years before Will joined). CEO fired 2 days before Will started. Kevin Rose returned. Pre-cloud era: wiped all existing servers to re-image with new software. Launch: Site kept crashing. Read-only back in 3 days. Full functionality broken for ~1 month. Root cause: Python default parameter initialization gotcha written by someone new to Python, not caught in review. Generated extra load on servers. Only ~5 engineers still working on it by day 30. Outcome: Company went from ~100 to 30 people in 9 months, eventually sold for parts. Lesson: Complete rewrites never work out.

### OpenAI Internal AI Adoption Metrics (Sherwin Wu V2)
Specific metrics on how OpenAI engineers use Codex internally, showing adoption rates and productivity gains

How it works: 95% of OpenAI engineers use Codex daily. 100% of PRs are reviewed by Codex. Engineers who use Codex more open 70% more PRs than those who don't, and the gap is widening. Engineering managers write 100% of their code via Codex. Code review time reduced from 10-15 minutes to 2-3 minutes per PR. Small PRs sometimes require no human review beyond Codex. CI process (lint fixes, test reruns) automated via Codex.

### Polishing Season (Annual Quality Ritual) (How Linear builds product)
An annual end-of-year ritual where Linear dedicates concentrated time to fixing bugs, paper cuts, and quality issues submitted by users.

How it works: How it works:
1. Run at the end of each year
2. Users submit bugs, paper cuts, and improvement requests
3. Team dedicates concentrated time to fixing these (in addition to weekly bug fixes throughout the year)
4. When a fix ships, notify the user who made the request
5. Make live updates to a public page showing progress
6. Example: https://linear.app/changelog/polishing/2022

Benefits: Combines quality improvement with customer engagement and public transparency.

### Stripe CI/CD at Scale (Become a more technical product manager)
Real-world example of Stripe's deployment and testing practices demonstrating CI/CD at scale

How it works: From Stripe's annual letter: More than 400 deployments per day and 1.4 million automated tests. This demonstrates how CI/CD helps teams move quickly and keep the pace of shipping code to production high.

### Stripe Incident Management Over-Analysis (Will Larson)
A cautionary tale of getting so caught up in measuring and analyzing incidents at Stripe that the team lost track of whether they were actually improving reliability.

How it works: Context: Stripe's API availability directly impacts customer revenue. Team invested heavily in incident analysis to understand failures. Problem: Got so caught up in analysis/measurement that they stopped prioritizing actual improvements. Will was personally caught in this trap. Lesson: 'Measure twice, cut once' is fine, but you can't measure infinite times and never cut. At some point you must act to create impact. The gap between your model and reality is where learning happens, but learning alone isn't the job.

### Stripe's Ruby Monolith Strategy (Will Larson)
Stripe's engineering strategy of running a single Ruby monolith, which constrained language choices but focused engineers on building features for users rather than building tooling for multiple languages.

How it works: Strategy: Everything runs in a Ruby monolith. Tradeoff: Engineers couldn't use preferred languages. Benefit: Focused engineering energy on innovative features for users rather than supporting multiple programming languages and their tooling. Evolution: More Java has crept in over time. Era: ~2012-2016. Many engineers hated it but it served the business goal.

### Three-Bucket AI Productivity Test (Chip Huyen)
A randomized trial structure used by an engineering team to measure the impact of AI coding tools.

How it works: Divide the engineering team (30-40 people) into three buckets: Highest performing, Average performing, and Lowest performing. Give half of each bucket access to an AI tool (like Cursor). Observe the productivity delta. Result: The highest performing engineers received the largest productivity boost.

### Vanta's Rotating Support On-Call Engineering Role (Prioritizing at startups)
How Vanta allocated engineering time between roadmap and support in the early days

How it works: When the team was four engineers, they had a rotating 'support on call' role: three engineers worked through the roadmap and one focused on fixing bugs/issues from support tickets. Benefits: (1) Ensured they were prioritizing small user delight-ish things. (2) Showed early users they were responsive and cared, which encouraged users to send more feedback.

### YouTube vs. Google Video Code Quality (Dhanji R. Prasanna)
A case study proving that code quality does not dictate product success.

How it works: YouTube had a 'horrible' architecture (storing videos as blobs in MySQL, slow Python stack) but won the market because it solved a specific user problem (quick 1-2 min videos), whereas Google Video had state-of-the-art C++/Java architecture and supported long formats but failed.

## Tools

### Crying Octopus Button (Paper Cuts) (David Singleton)
An internal tool embedded in developer environments to instantly report friction.

How it works: A button with a crying octopus emoji in dev tools that allows engineers to instantly type what went wrong. The developer productivity team reads these 'paper cuts' to prioritize their roadmap.

### Recommended Reading List for Engineering Leaders (Will Larson)
Curated book recommendations covering systems thinking, strategy, and engineering leadership.

How it works: Systems Thinking: Thinking in Systems by Donella Meadows. Strategy: Good Strategy Bad Strategy by Richard Rumelt, The Crux by Richard Rumelt. Engineering Strategy: Technology Strategy Patterns by Evan Hewitt, The Value Flywheel Effect by Anderson/McCann/O'Reilly, The Phoenix Project by Kim/Behr/Spafford, The Goal by Goldratt. Communication/Framing: Don't Think of an Elephant by George Lakoff. Engineering Productivity: Accelerate by Nicole Forsgren and Gene Kim. Mega Projects: How Big Things Get Done. Upcoming: Engineering Executive's Primer by Will Larson (O'Reilly, Feb 2024).

