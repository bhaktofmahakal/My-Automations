# Roadmap Prioritization - Frameworks, Templates & Checklists

*115 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 60/20/20 Resource Allocation Rule (How Miro builds product)
A general rule of thumb for balancing resources between product innovation, running the business, and tech innovation

How it works: Default allocation: 60% product innovation (new product work), 20% running the business (RTB, maintenance, and bugs), 20% tech innovation (reducing tech debt). This flexes based on product maturity: If there are many legacy issues, tech debt may need more than 20%. If shipping a new capability, product innovation may go up to ~80%. The balance is a guideline, not a rigid rule.

### 70/20/10 Product Investment Split (Eeke de Milliano)
A portfolio approach to allocating product and engineering resources.

How it works: 70% to core product (including tech debt and maintenance), 20% to strategic non-core initiatives, 10% to ambitious bets.

### 70/30 Time Allocation (Alex Komoroske)
A resource allocation strategy for teams to balance core execution with emergent innovation.

How it works: Spend 70% of effort on clearly legible, value-adding work to prevent leadership from questioning the team's purpose. Use the remaining 30% to plant seeds and let team members explore high-upside, emergent ideas.

### A+ on One Class (Startup Prioritization) (Varun Mohan)
Unlike school where you optimize total GPA, startups win by getting an A+ on the one thing that matters and accepting F's on everything else. F doesn't mean doing illegal things—it means consciously deprioritizing things that don't matter.

How it works: Mental model: In school, optimize total GPA across all classes. In startups, identify the ONE class (priority) that matters, get an A+, and accept F's on everything else. F = conscious deprioritization, not negligence. Combined with understaffing, this creates a forcing function where teams must choose the highest-impact work.

### Add One, Remove One Product Rule (Dharmesh Shah)
A constraint to fight dimensional complexity in software products.

How it works: Every time you add a new 'knob or dial' (feature, radio button, drop-down) to the product, you must remove one from somewhere else. This forces teams to consider the long-term maintenance and dimensional complexity costs of new features.

### Alternative Usage Signal: Breakage Complaints (When to sunset a feature)
A way to measure true feature importance by tracking complaints when a feature breaks rather than active usage metrics

How it works: Usage metrics can be deceiving — a customer may use a feature passively but be totally OK with it going away. An alternative way to track real usage/importance is to measure how many people complain about a feature when it isn't working. If no one notices or complains when it breaks, it's a strong signal the feature can be safely sunset.

### Appetite Over Estimates (Vijay)
Instead of asking teams to estimate how long something will take, set a time appetite as input and explore what you'd build at different time horizons to find the efficient frontier

How it works: Steps: 1) Pick a reasonable-sounding time appetite (e.g., 6 weeks). 2) Explore 2-3 options: What would we do in 4 weeks? 6 weeks? 8 weeks? 3) Find the efficient frontier of cost and impact. 4) Check in after the time period: Is there new information? Did we uncover biggest risks? Are we on the long tail? 5) Be honest about whether to continue or stop. Inspired by Shape Up by Basecamp.

### Appetites (replacing estimates) (Ryan Singer)
Instead of estimating how long a project will take and then committing to that estimate, start with the maximum time the business is willing to spend (the appetite) and shape the scope to fit within it. Works like a budget for a car — you make trade-offs to fit within it.

How it works: Steps: 1) Determine the maximum time willing to spend (e.g., 2 weeks, 4 weeks, 6 weeks max). 2) Use that as a constraint to shape what version of the solution is buildable in that time. 3) Vary the scope, not the time. 4) If the project isn't on track at the end of the appetite, bring it back to shaping mode rather than extending or cutting essential scope.

### Big Company vs. Startup Prioritization Trade-offs (Sachin Monga)
Mental model for understanding how prioritization fundamentally differs between large companies and startups

How it works: Big company (Facebook): Doing A may make B permanently harder or impossible. Trade-offs are about managing permanent conflicts between features competing for the same surface area (e.g., Watch tab vs. Marketplace tab). Startup (Substack): Trade-offs are primarily about time and sequencing. Doing A now means B waits. Additionally, order of operations matters — doing A now may unlock the ability to do B later. Key insight: startups have more reversible decisions but sequencing has compounding effects.

### Cover Fire Strategy (80/20 Big Bet Defense) (Defending your big bets)
A framework for maintaining organizational support for long-term big bet projects by allocating 80% of team capacity to short-term incremental wins that move KPIs and 20% to high-risk long-term bets. The steady wins provide 'cover fire' that prevents leadership from pulling resources.

How it works: Core principle: Spend 80% of team time on short-term, low-risk incremental wins and 20% on high-risk, long-term bets.

Why it works — showing steady success:
1. Doesn't give anyone a reason to mess with your team
2. Builds trust in your team's ability to execute
3. Earns the right to take bigger bets

Implementation:
- Share this strategy transparently with your manager
- Structure your roadmap so every quarter/period includes visible KPI-moving projects alongside big bet milestones
- Never go long periods without showing direct business impact

When to use: Mostly at larger companies, on average teams. Less applicable to teams top-down designated for long-term high-risk projects or early-stage startups where everything is a big bet.

Roadmap visualization: A timeline showing multiple small incremental projects (Project 1, 2, 3, 4, 5) running in sequence alongside a single long 'Big Bet' project running in parallel underneath.

### DRICE (Detailed RICE) Prioritization Framework (Introducing DRICE: a modern prioritization framework)
A higher-fidelity evaluation method that converts T-shirt-sized RICE scores into dollar-denominated ROI estimates through a ~30-minute investigation per shortlisted idea

How it works: Apply to ~2x as many ideas as you can build (the shortlist from RICE). Spend ~30 minutes per idea.

Four components:

1. **Hypothesis**: A clear, brief explanation of the idea that anybody without context can understand, plus a short justification for why you believe the idea will be effective.

2. **Impact Estimate**: A bottom-up financial model estimating the dollar impact. Do research, speak with peers, check existing analytics. Build a table showing:
   - Number of users/visitors affected (e.g., 20,000 checkout visitors/month)
   - Baseline conversion rate
   - Expected conversion lift (with supporting evidence)
   - Revenue per conversion
   - Annualized revenue impact
   Example: 20,000 visitors × 2.7% lift × $100 average = $540k/year

3. **Engineering Estimate**: Break down into day-level tasks. Kick the tires on assumptions—projects may be simpler or harder than expected. Include buffer time. Example:
   - [1 day] Front-end integration
   - [1 day] Update receipt emails
   - [1 day] Back-end migration
   - [2 days] Integration tests
   - [2 days] Buffer time
   Total: 7 days (~1.5 weeks)

4. **Non-engineering efforts**: Design finalization, legal sign-off, support training, FAQ updates. Use engineering effort as proxy for total effort unless another role bears an unusually large lift.

**ROI Calculation**: Annualized revenue impact / Engineering weeks = $/eng-week
Example: $540k / 1.5 weeks = $360k/eng-week

Transition from DRICE:
- Go from 30-second estimate → 30-minute estimate
- Go from relative scoring (S/M/L) → $X of expected annualized revenue
- Go from 'Wouldn't it be cool if' → 'We are shovel-ready'

### DRICE Prioritization Framework (The Best of Lenny’s Newsletter—2024 Edition, The Best of Lenny’s Newsletter 2023)
A modern prioritization framework for product teams

How it works: DRICE is positioned as a modern update to prioritization frameworks. It is covered alongside a broader post on prioritization methods. The name suggests it builds on RICE (Reach, Impact, Confidence, Effort) with an additional 'D' dimension. Full details in the linked post.

### Differentiation vs. Table Stakes (Paul Adams)
A simplified Kano model used to evaluate roadmap priorities by categorizing features as either attractive differentiators or necessary entry requirements.

How it works: Map features into two buckets: Differentiation (new/better solutions people care about that attract users) and Table Stakes (basic requirements needed to play the game and allow users to switch). Use this to balance roadmap investment based on company maturity.

### Engineering-Owned Bug Prioritization (How Gong builds product)
A controversial approach where engineers, not PMs, own the prioritization and fixing of bugs

How it works: Core assumptions:
1. Engineers have enough business context to assess the severity and priority of each bug.
2. Most bugs take less time to fix than to prioritize (through a formal PM process).

Process:
- Engineering teams (often the engineering team manager) prioritize and fix bugs.
- If a bug requires a disproportionate amount of time to fix, it gets flagged to the product manager.
- PM and engineering make a joint decision on disproportionately large bugs.

Benefit: Frees PMs from bug triage to focus on product strategy and customer work.

### Experiment, Feature, or Infrastructure Bucket (Farhan Thawar)
A mental model for categorizing engineering work to determine the right approach and timeline.

How it works: Experiment = trying something to learn. Feature = taking advantage of existing infra. Infrastructure = building the foundational layer so future features can be built in an hour.

### Explore and Exploit Framework (Albert Cheng)
A mental model for balancing divergent brainstorming with doubling down on winning insights.

How it works: Explore: Find the right mountain to climb by testing divergent ideas. Exploit: Focus resources on climbing it by applying a winning insight to adjacent product areas. Oscillate between the two based on the statistical significance of recent tests.

### Five Benefits of a Roadmap (One team, one roadmap - Issue 30)
A framework for understanding the purpose and value of having a single roadmap, useful for making the case to your team about why consolidation matters.

How it works: The five main benefits of a roadmap doc:
1. **Prioritization**: It's a great forcing function to prioritize all of your team's great ideas
2. **Alignment**: Everyone on the team can always see *what* those priorities are
3. **Transparency**: Everyone on the team can always see who's working on what
4. **Accountability**: Visible dates and deadlines for each project and person
5. **Dependencies**: Highlight which tracks of work are dependent on others

Key insight: If your team is using multiple roadmaps for a single team/project, you substantially reduce each of these benefits.

### Forward Thinking, Backwards Planning (Timothy Davis)
A strategic planning approach where you define the desired end state first, then map backwards through milestones to determine current actions

How it works: Macro example: Goal = be on all platforms. Step back: Start with search (keywords only, no creative needed). Then add Meta (need creative). Then YouTube (need video). Set milestones for each. Micro example (emerging channel to BAU): Define graduation criteria (e.g., 1000 conversions/month at X spend with Y lift). Start with one ad creative on one ad unit. Test additional ad units (feed, conversation, video, carousel). Meet criteria → graduate to always-on performing channel.

### Four BB Framework (Anuj Rathi)
A strategic portfolio allocation model for product roadmaps.

How it works: 1. Brilliant Basics (tech debt/core platforms), 2. Bread and Butter (feature enhancements/bug fixes), 3. Big Bets (large cross-team initiatives), 4. Breaking Bad (existential pivots or category expansions).

### Frequency vs. Severity Problem Prioritization Matrix (The definitive guide to mastering product sense interviews)
A 2x2 framework for prioritizing user problems based on how often they occur and how painful they are

How it works: 2x2 matrix with axes: X-axis = Frequency (Low to High), Y-axis = Severity (Low to High). Identify 3 problems from the user journey and rate each on both dimensions. Prioritize the problem with both high frequency and high severity. Example: For Claude Projects knowledge specialist, 'Context Fragmentation' (high frequency, high severity) prioritized over 'Knowledge Validation' (moderate frequency, high severity) and 'Collaboration Barriers' (moderate frequency, moderate severity).

### GEM/JAM Prioritization Model (Gibson Biddle)
A forced-ranking exercise to align leadership on the company's primary focus.

How it works: Force leaders to rank: 1) Growth (YoY customer growth), 2) Engagement (Product quality/retention), 3) Monetization (Building the business model). Start with a SWAG (Stupid Wild-Ass Guess) to anchor the conversation.

### GIST Model (Itamar Gilad)
A meta-framework for evidence-guided development broken into four layers: Goals, Ideas, Steps, and Tasks.

How it works: Goals (what to achieve), Ideas (hypothetical ways to achieve goals), Steps (ways to implement and validate ideas), Tasks (Agile/Kanban work for the team).

### Gibson Biddle's Product Pruning Principle (When to sunset a feature)
A guiding philosophy for why regular feature pruning is essential in consumer software

How it works: "Folks love to build stuff. From time to time, though, you need to prune your product. Get rid of stuff that is no longer relevant. If you don't, your product will quickly get filled with bloated complexity. In consumer software, keeping things simple is almost always better than solving everyone's problems, for both the consumer and business."

### HIPPO Anti-Pattern (Introducing DRICE: a modern prioritization framework)
The Highest-Paid Person's Opinion as the default mode of planning—what RICE/DRICE is designed to replace

How it works: HIPPO = Highest-Paid Person's Opinion. The default mode of planning for many teams where the most senior person's preferences drive prioritization. It's better than random—there's a reason the PM is in their position—but it's far from optimal. The antidote is implementing a transparent, rules-based prioritization framework (RICE/DRICE) that anyone on the team can see and contribute to.

### Half-Half Rule (Reductionist Product Development) (Scott Belsky)
Do half the features you plan, offer half the options you want, focus on half the market. Make the whole product about one thing so the core crank operates at 10X velocity.

How it works: Principle: When adding features, consider what you can replace or remove. When updating a feature, ask 'what would happen if we just took this away?' The 24-hour rule from Behance: after removing portfolio color customization, complaints lasted exactly 24 hours, then portfolios looked cleaner and the core metric increased. Implementation: Go on a 'killing spree' — systematically remove features and measure whether the core metric improves.

### ICE Scoring (Itamar Gilad)
A prioritization formula to evaluate ideas based on Impact, Confidence, and Ease.

How it works: Impact (effect on goals), Ease (opposite of effort), and Confidence (how sure you are about the impact and ease estimates based on evidence).

### Idea Evaluation Spectrum (Saying no)
A five-point spectrum for categorizing where you land on any proposed idea

How it works: 1. Yes, this is an amazing idea and should happen ASAP.
2. Yes, this is a great idea and should definitely happen, but not right now.
3. Yes, this is an interesting idea and we should explore it further.
4. No, this is a bad idea, but we can achieve similar results with a variation of it.
5. No, this is just a bad idea and we shouldn't do it.

### Impact vs. Effort Solution Prioritization Matrix (The definitive guide to mastering product sense interviews)
A 2x2 framework for evaluating and prioritizing potential solutions based on user impact and implementation effort

How it works: 2x2 matrix with axes: X-axis = Effort (Low to High), Y-axis = Impact (Low to High). Brainstorm 3 meaningfully different solutions and place each on the grid. Prioritize high-impact, moderate-or-low-effort solutions. Example for Claude Projects: 'Smart Document Synthesis' (high impact, moderate effort) prioritized over 'Interactive Knowledge Graph' (high impact, high effort) and 'Guided Project Templates' (moderate impact, low effort).

### Investment Portfolio Model for Resource Allocation (How Duolingo builds product)
A framework for balancing new product work vs. incremental improvements based on product maturity stage

How it works: Philosophy: Treat resource allocation between new work vs. incremental work as an investment portfolio. Portfolio allocation varies by team maturity: MATURE TEAMS (established features, many users): ~50/50 split between big new features vs. incremental improvements. Rationale: Incremental changes compound over time and drive significant growth for mature products (e.g., improving onboarding). But you never want to get stuck at a local maximum — keep trying big bets for step-function improvements. EARLY-STAGE TEAMS (pre-product-market-fit): ~90/10 split between new features vs. incremental improvements. Rationale: Incremental changes won't drive returns without strong adoption and large user base. Focus on building new features until product-market fit is established. Example: Duolingo Math app team uses 90/10 portfolio. Bug triage: P0 issues (significant user experience impact) → Triage and address immediately. P1/P2 issues → Teams work through at their own pace as part of portfolio. Quarterly 'Grease Week' → Dedicated week where product team works only on bugs to clear P1/P2 backlog.

### Lenny's Simple Prioritization Framework (Impact vs. Cost) (Prioritizing)
A 3-step prioritization process that avoids over-complicated scoring systems and relies on T-shirt sizing and manual sorting

How it works: Step 1: Make a single list of all your team's ideas. Step 2: T-shirt-size (XS, S, M, L, XL) each idea on two dimensions — estimated impact and estimated cost. Step 3: Sort the list based on the highest ratio of impact-to-cost. Example table columns: Feature | Impact | Cost | Priority. Example rows: 'Feature D | XL | S | 1', 'Feature A | L | S | 2', 'Feature C | L | M | 3', 'Feature B | M | M | 4', 'Feature E | S | L | 5'. After sorting, expect to adjust 10-20% based on dependencies, hard-to-quantify opinions, and strategic priorities. Use T-shirt sizes (not 1-5 ratings) to force manual sorting and avoid relying on math formulas.

### Linear's Backlog + Cycles Framework (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
Linear's approach to backlog management: dump everything in, don't over-groom, select work per cycle, and auto-close stale issues.

How it works: Principles: 1) Add all new work to the backlog — it's just an idea, not committed work. 2) Optionally categorize with priorities or buckets: Icebox, Backlog, Next — to indicate general relevance. 3) For each cycle (sprint), select work from the backlog to be worked on next. 4) Don't worry about or groom the backlog too much — most of it doesn't ever get done. 5) Backlog = dump of all possible work; Cycles = what you actually do. 6) Use auto-close feature: issues that aren't done in ~6 months get automatically closed. If important, they'll resurface. This saves time on organizing work that will never happen.

### Linear's Roadmap Workstream Structure (How Linear builds product)
How Linear organizes their quarterly roadmap into four types of workstreams.

How it works: Four workstream types:
1. Strategic workstream A (e.g., 'Planning and Roadmapping') — aligned to company strategy
2. Strategic workstream B (e.g., 'Issue Discovery') — aligned to company strategy
3. High-priority user asks — dedicated to responding quickly to customer needs
4. Other (keep-the-lights-on projects)

Each workstream contains a mix of new features/functionality and improvements to existing features. Workstream roadmaps get more detailed as work is broken into projects.

### Main Quest vs. Side Quest (Karri Saarinen)
A mental model for prioritizing startup tasks and avoiding distractions.

How it works: Categorize tasks as either 'main quests' (building product, talking to customers) or 'side quests' (making t-shirts, getting early SOC 2 compliance). Aggressively decline side quests.

### Modified RICE Prioritization (Drop C and E temporarily) (Vijay)
A variation on RICE where you deliberately ignore Confidence and Effort for high Reach/Impact ideas, spend a week exploring them with cross-functional teams, then add C and E back in to get a balanced portfolio of innovative, incremental, and debt bets

How it works: Steps: 1) RICE all ideas. 2) Notice that high R/I ideas sank to bottom due to murky C/E. 3) Pull those high R/I ideas out and spend 1 week with engineers and designers exploring them. 4) Find higher-confidence, lower-effort ways to execute. 5) Add C and E back in and re-RICE. 6) Goal: end with a mix of innovative bets, incremental bets, and tech/product debt work.

### Now, Next, Later Roadmap (Janna Bastow)
A three-column roadmap format that removes the timeline X-axis, categorizing work by immediate, near-term, and future horizons to reflect the cone of uncertainty.

How it works: Three columns: Now (currently working on, high certainty), Next (coming up soon, moderate certainty), Later (future problems to solve, low certainty). Dates are optional and only used when strictly necessary (e.g., regulatory deadlines).

### Opportunity Cost vs. ROI Prioritization (Shreyas Doshi)
A mental model for shifting from 'Is this a good use of time?' (ROI) to 'Is this the BEST use of time?' (opportunity cost), because ROI optimization leads to filling plates with quick wins while missing transformative opportunities

How it works: ROI formula: (Value created - Cost of time) / Cost of time. Problem: Time in denominator incentivizes picking quick, low-effort tasks. Opportunity Cost formula: Value of optimal option - Value of chosen option. Shift: From 'positive ROI' to 'minimizing opportunity cost.' Practical implementation: Don't try to quantify opportunity cost. Instead, give teams explicit allocation guidance, e.g., 60% incrementals, 30% big new initiatives, 10% stability/infrastructure. Inspired by Google's 70-20-10 model.

### Opportunity Scoring Criteria (Chandra Janakiraman)
A 4-dimension rubric for ranking opportunity clusters to select strategic pillars.

How it works: 1. Expected impact. 2. Certainty of impact (confidence/evidence). 3. Clarity of levers (do we know how to solve it?). 4. Unique/differentiated levers (can we do it better than others?).

### Opportunity Scoring Matrix (4 Dimensions) (Strategy Blocks: An operator’s guide to product strategy)
A scoring system used during the strategy sprint to evaluate and rank 10-15 opportunity areas and select the top 3 as strategic pillars.

How it works: Score each opportunity area along four key dimensions:
1. Expected Impact: Number of people impacted, frequency of impact, relative pain experienced in that area.
2. Certainty of Impact: Is the need well-proven or more speculative?
3. Clarity of Levers: Does the team have a rough sense of the levers that could be deployed to improve the situation?
4. Uniqueness of Levers: Can the levers result in a unique, differentiated experience? Relates to pre-existing advantages: brand advantage, network advantage, skill advantage, technical advantage, process advantage—'secret sauce' that has helped the company differentiate.

Scoring approach: When hard data isn't available, qualitative scores based on team debate are a reasonable fallback. Sum scores across all 4 dimensions for each opportunity area, sort by totals. The top 3 automatically become the strategic pillars. For each pillar, generate about 3 'how might we' statements to spark ideation.

### Principle-Driven Prioritization (Sachin Monga)
Using core principles (writer control, reader control) as a tiebreaker and filter for product decisions at Substack

How it works: Process: (1) Start from principle — why does the company exist? (For Substack: people should control their destiny on the internet), (2) When evaluating multiple approaches to a feature, ask: which version provides more control to the writer or reader?, (3) All things equal, choose the approach that maximizes user control, even if it seems harder, (4) Example: Recommendations feature chose writer-curated over algorithmic suggestions despite seeming harder to pull off.

### Prioritization Pushback Threshold (Five habits of highly annoying product managers)
A simple heuristic for knowing when your prioritization approach is failing based on the rate of team pushback.

How it works: 10-20% pushback on priorities: Normal and healthy.
>50% pushback on priorities: You are probably annoying and losing the trust of your team. Time to revisit how you communicate and justify prioritization decisions.

### Product Complexity Tipping Point Signs (When to sunset a feature)
Three warning signs that your product has crossed from 'robust' to 'complicated,' signaling it's time to prune features

How it works: Signs your product might be too complicated:
1. You've launched a bunch of features and haven't killed any of them.
2. You're running out of literal surface area to put new features.
3. Users aren't clear about what to do with the product.

Context: 'The first version of your product is usually simple. As you keep building, the product becomes more robust in quality, utility, and experience. But there's a tipping point after which robust can sneakily switch to complicated.'

### Public vs. Secret Roadmap (Gaurav Misra)
A two-tiered product planning structure that separates table-stakes user requests from highly confidential, paradigm-shifting innovations.

How it works: Public Roadmap: Features users explicitly ask for (e.g., undo/redo, background removal). Competitors know about these; they are prioritized by volume but won't win the market. Secret Roadmap: Features nobody asked for, generated via company-wide brainstorming, kept strictly confidential, and designed to fundamentally change user behavior (e.g., AI Eye Contact).

### RICE Prioritization Framework (Introducing DRICE: a modern prioritization framework, Preparing for a PM interview)
The industry-standard framework for T-shirt sizing and scoring project ideas across four dimensions to create a ranked backlog

How it works: Score each idea on four dimensions using T-shirt sizes (S/M/L or more granular):

1. **Reach**: How many of your customers would experience the change (percentage of users)
2. **Impact**: If the idea pans out, how much it would affect conversion (S/M/L)
3. **Confidence**: How likely is it to work (likelihood percentage)
4. **Effort**: How much engineering time to validate (in weeks)

**Scoring formula**: Score = (Reach % × Impact % × Confidence likelihood %) / Weeks of effort

Sort all ideas by score. Take ~2x as many ideas as you'd have time for in the planning period as your preliminary shortlist.

**Impact heuristics** - score higher if:
- Addresses a sensitive-to-change portion of the customer journey (above the fold, pricing, etc.)
- The change is particularly significant—a 'big swing'

**Confidence heuristics** - score higher if:
- Same concept already worked elsewhere in your product
- One or more competitors already employ this tactic
- Customers are explicitly and repeatedly complaining about it

**Effort heuristic**: Always ask 'What is the least amount of engineering work required to test this idea?'

PM fills in Reach, Impact, Confidence. Tech lead (or experienced PM) fills in Effort.

Collect at least 5x as many ideas as you could reasonably build before starting to prioritize.

### Reach vs. Underserved Degree Segmentation Matrix (The definitive guide to mastering product sense interviews)
A 2x2 prioritization framework for evaluating user segments based on market reach and how underserved they are by existing solutions

How it works: 2x2 matrix with axes: X-axis = Reach (Low to High), Y-axis = Underserved Degree (Low to High). Place each of your 3 segments on the grid. Prioritize the segment that is both high-reach and highly underserved. Example from Claude Projects: Knowledge Specialists (high underserved, moderate reach) prioritized over Workflow Automators (moderate/moderate) and Casual Learners (high reach, low underserved). Example from Meta Gardening: Novice Urban Gardeners (high reach, high underserved) prioritized over Dedicated Hobbyists and Social Garden Enthusiasts.

### Risk/Reward 2x2 Matrix (Camille Hearst)
A prioritization matrix mapping opportunities based on their potential impact versus the risk or effort involved.

How it works: Map ideas on a 2x2 grid. Counterintuitively, take the items in the top quadrant (biggest swings/highest risk) and prioritize them first for product discovery to force innovation, rather than defaulting to safe, low-risk bets.

### Roadmap Idea Generation Framework (Effective vs. Ineffective Sources) (Where Great Product Roadmap Ideas Come From)
A mental model that separates high-signal idea sources (15 effective) from low-signal anti-patterns (3 ineffective), helping PMs audit where they're spending their idea-generation effort

How it works: Effective sources cluster into several categories:
- Customer proximity: Talking to customers, talking to customer-facing employees, observing customers through data/research, reviewing past research, analyzing churn
- Internal reflection: Using the product yourself, thinking in a quiet place, small teammate discussions, working backwards from long-term vision
- External inspiration: Looking at competitors, adjacent markets, analogous businesses in different markets, catching technology shifts
- Creative exercises: Creating user journey storyboards, running hackathons and watching demos

Ineffective sources (anti-patterns):
- Large brainstorms (good for inclusion, bad for breakthrough ideas)
- Staying heads down too long (need space for big/wide thinking)
- Copying competitors (they may not know what they're doing either)

### S-Curve Investment Allocation (Robby Stein)
Track growth curves of features/products and shift resources when diminishing marginal returns signal it's time for the next growth driver

How it works: Process: 1) Break out product suite into individual features/product lines. 2) Map each on its growth curve — some growing fast, some mature, some declining. 3) Monitor expected value of incremental investment — when 50 people can't dramatically move the needle, you've hit diminishing marginal returns. 4) At that inflection, go first-principles to find next growth drivers. 5) When new growth engine is found, optimize it (each change yields 10-20% wins) until it too matures. 6) New formats tend to be complementary not replacement (Stories expanded Instagram, AI expands Search).

### Sales Feature Budgeting Framework (Jason M Lemkin)
A system for product teams to manage ad-hoc feature requests from the sales team.

How it works: Allocate a fixed budget (e.g., 10% of total story points) per quarter specifically for sales requests. Hold a weekly meeting where the VP of Sales must force-rank their requests within this fixed budget so product isn't constantly disrupted.

### Shape Up (Jason Fried)
A product development methodology focused on fixed time budgets and flexible scope.

How it works: Uses 6-week maximum 'appetites' instead of estimates. Teams consist of 2 people (1 designer, 1 programmer). No specs or tickets; teams figure out the tasks. Projects that don't finish in 6 weeks are killed, not extended.

### Shape Up Process (three core elements) (Ryan Singer)
The overall Shape Up method consists of three interconnected practices: (1) Fixed time, variable scope via appetites, (2) Shaping — collaborative sessions to define a buildable solution, (3) Giving the whole shaped idea to a team who owns the implementation.

How it works: Element 1 - Appetite: Set a time budget (max 6 weeks) before defining scope. Element 2 - Shaping: Product + design + senior engineer collaborate to define a solution describable in <10 moving pieces, at breadboard/fat-marker level (not Figma, not PRD). Element 3 - Team autonomy: Give the whole shaped idea to builders, they create their own tasks and figure out implementation.

### Shopify's Recursive Priority Mantra (How Shopify builds product)
A three-part internal mantra that establishes an unbreakable hierarchy of priorities

How it works: 1. The number-one priority is to make the best product in the world for our merchants. 2. Our second priority is to make some money so we can do more of number one. 3. The third priority is never to reverse priorities one and two. The recursive nature of priority three is the key insight—it creates a self-reinforcing loop that prevents revenue pressure from ever overriding product quality and merchant value.

### Solution Deepening vs Market Widening (Rahul Vohra)
A classification for all company work: solution deepening makes the product better for existing users, market widening makes the product available to more users but doesn't improve it

How it works: Solution deepening: making the product better for existing users (drives perceived velocity and user love). Market widening: making the product available to new segments/platforms (necessary for growth but feels like a slowdown to existing users). Early startups should pour energy into solution deepening. At a certain scale, market widening becomes necessary but explains perceived slowdowns.

### Strategic Pillars Resource Allocation with 80/20 Rule (Prioritizing)
Framework for allocating resources across strategic bets and balancing incremental vs. ambitious work within each

How it works: Step 1: Identify 2-5 strategic bets (pillars/swimlanes) from your product strategy. Step 2: Decide roughly what percent of available resources go into each pillar. Example: Go mobile-first (50%), Expand into Japan (30%), Revamp onboarding (20%). Step 3: Within each pillar, apply the 80/20 rule — roughly 80% of resources go to incremental low-risk projects, and 20% go to longer-term higher-risk bets. Rationale: Low-risk incremental bets create 'cover fire' for big bets by moving KPIs and showing success. Too many big bets → leaders wonder why metrics aren't moving and may pull resources. Too much incremental work → you never break out of a local maximum.

### The Adjacent Possible + North Star (Alex Komoroske)
A strategy framework for navigating product roadmaps in uncertain environments.

How it works: 1. Define a low-resolution, plausible North Star 3-5 years out. 2. Identify the 'adjacent possible' (safe, immediate actions within arm's reach). 3. Choose the adjacent action that has the steepest gradient pulling toward the North Star.

### The Two-Percenter Rule (Gibson Biddle)
A heuristic for killing features that don't have enough reach to impact the business.

How it works: If a feature is only used by 2% of customers, it creates technical and user complexity without driving enough delight to improve margin or retention. 'Scrape the barnacles' and kill it.

### Three Horizons Resource Allocation (Ryan J. Salva)
A portfolio allocation framework for splitting team capacity across bold bets, operations, and incremental improvements

How it works: 5-10% of capacity on bold, audacious experimental research projects (horizon 3, uncertain bets); 25-30% on operations (keeping in-market products meeting customer expectations); ~60% on incremental progress for in-market products (iterative improvements realizing payoff from past bets). At startups, percentages shift dramatically—you're all-in on one big bet. Horizons defined as: H1 = next year, H2 = next 3 years, H3 = next 5 years, but better thought of as measures of ambiguity and confidence level rather than calendar dates.

### Three Horizons Resource Allocation (70/20/10) (Varun Parmar)
Resource allocation framework across three time horizons for balancing current business with future bets

How it works: Horizon 1 (Core business, delivering today): ~70% of resources. Horizon 2 (Adjacent, material in 12-36 months): ~20% of resources. Horizon 3 (Future, 3-5 years out): ~10% of resources. Additionally, within any team: 60-80% goes to innovation/features, 20-40% goes to tech debt/infrastructure/maintenance. The exact split varies by team state—teams with more tech debt or platform scalability responsibility may allocate up to 40-50% to infrastructure.

### Three-Bucket Backlog Organization Model (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
A mental model for organizing a product backlog into three distinct categories to reduce noise and improve focus.

How it works: Bucket 1: Development-ready work — Items that are in a workable stage, i.e., can be picked up and run with by a developer based on the information in the ticket. These live in the active backlog. Bucket 2: Icebox — Dev work that is NOT ready to be worked on. Set up a separate Icebox so the team can ignore it but you don't lose it. Bucket 3: Ideas/Feature Requests — Not dev work. Should live somewhere other than your backlog (e.g., a Confluence doc, product management tool, or idea repository). Grooming cadence: Schedule 30 minutes every 2 weeks where PM, tech leads, and QA sort the backlog by last activity and work through closing, updating, and prioritizing old tickets. Infrequent and short enough to not be painful but enough to slowly chip away at noise.

### Trade-offs Method for Saying No (Wes Kao)
Instead of saying no directly, present the trade-offs of taking on a new request by showing what would be deprioritized, turning it into a collaborative prioritization discussion

How it works: Formula: 'Yes, I can do [new request]. That means [current priority] will have to wait until [new timeline]. Does that sound good, or do you want me to prioritize [original project]?' Benefits: 1) Person asking feels in control and able to help prioritize, 2) Conversation shifts from 'are you a team player?' to 'what should we prioritize?', 3) You protect your bandwidth without using the word 'no', 4) You appear thoughtful about prioritization rather than uncooperative.

## Templates

### Annual Crazy Ideas Doc (Eeke de Milliano)
A blank document sent to the entire org at the start of the year to source massive, unconventional ideas.

How it works: Prompt: 'Crazy ideas are ideas that we shouldn't obviously do. There's a 90% chance they make no sense. But in the 10% chance they do, they will make a 10x to 100x difference for the business.'

### Big Bet Roadmap Layout (Defending your big bets)
A visual roadmap template showing how to interleave short-term incremental projects with a long-running big bet project on the same timeline

How it works: Structure:
- Top row: Sequential short-term projects (Project 1 → Project 2 → Project 3 → Project 4 → Project 5)
- Bottom row: One continuous 'Big Bet' bar running the full length of the timeline
- The short-term projects represent ~80% of team capacity
- The big bet represents ~20% of team capacity
- Each short-term project should have clear KPI impact
- The big bet runs continuously in the background across multiple quarters

### DRICE Estimate Template (Google Doc) (Introducing DRICE: a modern prioritization framework)
A fill-in-the-blank Google Doc template for writing a detailed DRICE estimate for a single project idea

How it works: Google Doc template with sections for:
1. **Hypothesis**: [Describe the idea and why it will work]
2. **Impact Estimate**: [Bottom-up financial model table with visitors, conversion rates, lift, revenue]
3. **Engineering Estimate**: [Day-level task breakdown with buffer]
4. **Return on Eng Investment**: [Annualized revenue / eng weeks = $/eng-week]

URL: https://docs.google.com/document/d/1J5j2g6ACKxDFjALPR1DgQIn7tABAycOFQDW8beQIfh0/copy

### Feature ROI Estimation Prompt with Fermi Estimation (Meta Jobs Example) (How close is AI to replacing product managers?)
Full prompt used to estimate feature impact with quantitative Fermi estimations for short-term and long-term metrics

How it works: As a product manager for a major tech company similar to Google, Amazon, Microsoft, or Facebook, you are tasked with estimating business impact/value of a new feature.

Start by listing assumptions and planning out your answer in a separate bullet point section labeled "Thinking". Then follow the instructions:

## Instructions
- Identify key metrics for short-term and long-term impacts, broken down by user types
- Short-term: metrics reflecting initial user awareness and adoption (straightforward, measurable)
- Include a guardrail metric for potential negative effects or user feedback problems
- Long-term: metrics evaluating sustained engagement, user referrals, direct feature outcomes
- Set long-term guardrail for critical undesirable outcomes (why users might stop using feature)
- Organize into clear format distinguishing user types and metric nature
- Use Fermi estimations throughout to calculate potential impact

Follow the structure in the example exactly:

## Example
Success Metrics: immediate goals center on Visibility and Engagement:

Educators:
- Total number who incorporated feature into lessons – 10%
- Total who utilized progress tracking – 25%
10 million educators x 10% x 25% = 250,000 educators utilizing progress tracking

Guardrail Metric:
- User Complaints – grievances regarding functionality/content quality – 5%

Long-term Focus: Sustained Use, Advocacy, Educational Outcomes:

Students:
- Average sessions completed per student – 10
- Average feature interactions per student – 15
300M students x 10% = 30M students
30M x 10 sessions = 300M sessions
30M x 15 interactions = 450M interactions

Educators:
- Average frequency of feature usage – 15 times per month
- Number of positive impacts reported – 60%
1M educators x 60% = 600,000 positive impact reports

Guardrail:
- Attrition Rate – users discontinuing due to dissatisfaction – 20%

### GIST Board (Itamar Gilad)
A dynamic project management board replacing traditional feature roadmaps with learning milestones.

How it works: Columns include: Goals (max 4 Key Results), Ideas (with ICE scores), and Steps (next validation actions like usability tests or AB tests). Reviewed bi-weekly by the development team.

### Gina's Sample Prioritization Template (Prioritizing)
A more detailed prioritization spreadsheet template

How it works: Google Sheets link: https://docs.google.com/spreadsheets/d/1PLxx5lWSoJDk6fuBRxMAKKhYQJpnITdDcbRD9gjhpPg/edit#gid=0

### Lenny's Favorite Roadmap Template (Prioritizing)
Lenny's preferred roadmap template spreadsheet

How it works: Google Sheets link: https://docs.google.com/spreadsheets/d/1zlx3RuidNOW40Zf7gh07p2SqoR53Ungv9JFT-PhHwxI/edit#gid=184965050

### Lenny's Roadmap Template (Google Sheets) (One team, one roadmap - Issue 30)
Lenny's personal roadmap template that includes both a flat prioritized list of projects and a visual timeline. Built in Google Sheets.

How it works: Google Sheets roadmap template with two views:
1. **Flat prioritized list**: A ranked list of all projects with details
2. **Visual timeline**: A Gantt-chart-style view showing project timelines, ownership, and dependencies

Link: https://docs.google.com/spreadsheets/d/1zlx3RuidNOW40Zf7gh07p2SqoR53Ungv9JFT-PhHwxI/edit#gid=814160004

The screenshot shows columns for projects mapped against weekly time periods, with colored bars indicating duration and likely columns for owners/status.

### Lightweight Idea Repository Structure (SEO keywords, career ladders, backlog tools, copywriting, OnlyFans, AMA with Pete Kazanjy and much more)
A simple structure for capturing and maturing product ideas from cross-functional teams.

How it works: Structure: Create a list (in Jira, Google Sheets, Notion, etc.) that anyone can add to. Each idea has two fields: 1) Quick description — one-liner of the idea. 2) Link to doc with more context (optional) — use Lenny's favorite templates (lennyrachitsky.com/p/my-favorite-templates-issue-37) to flesh out the idea over time. Process: Anytime someone brings up an idea, ask them to add it to the list. Ideas mature over time — by the time it makes sense to prioritize, much of the product thinking and interesting decisions have already been done. Key principle: Integrate idea-collection into an existing workflow rather than creating a separate system. For brainstorming sessions: Use the diverge/converge framework from design sprints.

### Narrative-Driven Roadmap Doc (Jiaona Zhang)
A document structure for roadmapping that replaces the traditional spreadsheet to provide better context to the team.

How it works: Written in prose. Structure: 1. What we are trying to achieve. 2. Big areas to invest in (Themes). 3. Big projects within themes. 4. Links out to live execution systems (e.g., Jira) for the granular 'how' so the doc doesn't get outdated.

### Ongoing Stack Rank (OSR) Spreadsheet Template (How to communicate tradeoffs so leaders will listen)
A public, living spreadsheet that sequences every discrete project by priority, resourcing, and expected outcomes, with a clear 'resourcing cutline' showing what's funded and what's not. Complementary to OKRs but more granular.

How it works: Google Sheets template at https://docs.google.com/spreadsheets/d/1E_K0CIuREcBmKPHZbZ9-YKGOnVmurDdGC7NZv3bsCd0/edit?gid=1930726146#gid=1930726146. Columns include: Project name, Priority rank, Resourcing status, Expected outcomes. A horizontal cutline separates funded projects from unfunded ones. Every project is listed regardless of size. The document should be shared widely: presented at fortnightly GTM catch-ups, embedded as a slide in exec presentations (right up front), and summarized in weekly team progress update emails.

### Optimizely's Prioritization Framework (Prioritizing)
Optimizely's internal prioritization spreadsheet template

How it works: Google Sheets link: https://docs.google.com/spreadsheets/d/17IpyLuyGyaqnS7tSx_9gVfhCvDfpwUl8TYWRomS2isQ/edit#gid=1687325850

### Product Roadmap Google Sheets Template (This Week #8: Splitting equity with late-joining co-founders, favorite roadmap templates, and small changes that improve your org)
A Google Sheets-based roadmap template from Airbnb PM Andrew Chen, with three organizational views

How it works: Google Sheets template with three tabs/options:

1. **Option 1: Organized by Lever (Lenny's preference)** — Rows organized by business lever or goal, with columns showing timeline/quarters and project details

2. **Option 2: Organized by Product** — Rows organized by product area, with similar timeline columns

3. **Bonus: Timeline per Team Member** — A view showing what each individual team member is working on across time

Template link: https://docs.google.com/spreadsheets/d/1zlx3RuidNOW40Zf7gh07p2SqoR53Ungv9JFT-PhHwxI/edit

Lenny's preference is Option 1 (organized by lever). He notes he's tried many roadmap tools but always comes back to Google Sheets.

### Product Roadmap Spreadsheet Template (Mission → Vision → Strategy → Goals → Roadmap → Task)
A Google Sheets template for building and prioritizing a product roadmap

How it works: Google Sheets template available at: https://docs.google.com/spreadsheets/d/1zlx3RuidNOW40Zf7gh07p2SqoR53Ungv9JFT-PhHwxI/edit#gid=184965050. Used to align around and prioritize roadmap items based on effort vs. impact on goals (ROI).

### RICE Scoring Spreadsheet (Minimalistic) (Introducing DRICE: a modern prioritization framework)
A minimalistic Google Sheets template for scoring and ranking ideas using the RICE framework

How it works: Google Sheets template with columns for each idea: Idea Name, Reach (T-shirt size), Impact (T-shirt size), Confidence (T-shirt size), Effort (T-shirt size), and a calculated Score column using the formula: Score = (Reach % × Impact % × Confidence %) / Weeks of effort. T-shirt sizes are converted to numeric values. URL: https://docs.google.com/spreadsheets/d/1trzJaf37kh6C5Cprcnmj20LX0RKxeZ1CVuuwNCZCAYE/edit?usp=sharing

### Roadmap Template (My favorite product management templates)
A spreadsheet-based product roadmap template

How it works: Google Sheets roadmap template. Linked at: https://docs.google.com/spreadsheets/d/1zlx3RuidNOW40Zf7gh07p2SqoR53Ungv9JFT-PhHwxI/edit

### SPACES Objective Scoring Exercise (A founder’s guide to community)
A scoring rubric to prioritize which SPACES objectives to focus on by rating each across three criteria

How it works: Create a table with rows for each SPACES objective (Support, Product, Acquisition, Contribution, Engagement, Success) and columns for:
1. **Business Impact** (rate 1-5): How important is this objective to your business in the next 6-12 months? If you work under a specific department, how important is this objective to your department?
2. **Measurability** (rate 1-5): How easy will it be for you to access the data you need to measure this objective?
3. **Member Motivation** (rate 1-5): To what extent do you believe your members will be motivated to participate in a program built for this specific objective?
4. **Total Rating**: Sum of the three scores.

Rank objectives by total rating. Focus on the top 1-3 objectives (no more than 3 recommended).

### Simplest Possible Prioritization Framework Spreadsheet (Prioritizing)
Google Sheets template for the simplest version of impact-vs-cost prioritization

How it works: Google Sheets link: https://docs.google.com/spreadsheets/d/1dezLP0MAXTZ3_JbbB2OEP1yCLBYPkbTOXLEI-G6ELN4/edit#gid=0. Contains columns for features, impact T-shirt size, cost T-shirt size, and priority ranking.

### Team Feedback Email for Draft Roadmap (Prioritizing)
A short email script for sharing your first-pass prioritized roadmap with the team to solicit feedback

How it works: Hey team,

Here's my first pass at our prioritized roadmap for next quarter. Take a look, and let me know if you see anything missing or misprioritized. Ideally by the end of the week 🙏

Go team!

### Top 10 Things You Should Know (Ebi Atawodi)
A living document tracking the most critical problems (user, quant, qual, tech debt) a product faces.

How it works: A continuously updated Google Doc listing exactly 10 prioritized problems. Can be used as a template for stakeholders to submit their requests during strategy planning.

## Checklists

### 15 Sources of Great Product Roadmap Ideas (Where Great Product Roadmap Ideas Come From)
A prioritized checklist of 15 proven sources product managers and founders can use to generate high-quality roadmap ideas

How it works: 1. Talking to customers
2. Talking to employees who talk to customers (e.g. sales, customer support, marketing)
3. Observing your customers, through data and user research
4. Spending quality time with previous data dives and user research
5. Using the product yourself
6. Thinking in a quiet place
7. Having small discussions with teammates
8. Working backwards from your long-term vision
9. Looking into what caused users to churn
10. Looking at competitors
11. Looking at adjacent markets
12. Looking at analogous businesses in completely different markets
13. Creating user journey storyboards
14. Having hackathons and watching the demos
15. Catching technology shifts

### 15 Sources of Great Roadmap Ideas (Prioritizing)
Comprehensive list of where good product roadmap ideas come from, plus anti-patterns

How it works: Good sources: 1. Talking to customers. 2. Talking to employees who talk to customers (sales, support, marketing). 3. Observing customers through data and user research. 4. Spending quality time with previous data dives and user research. 5. Using the product yourself. 6. Thinking in a quiet place. 7. Having small discussions with teammates. 8. Working backward from your long-term vision. 9. Looking into what caused users to churn. 10. Looking at competitors. 11. Looking at adjacent markets. 12. Looking at analogous businesses in completely different markets. 13. Creating user journey storyboards. 14. Having hackathons and watching demos. 15. Catching technology shifts. Where great ideas RARELY come from: 1. Large brainstorms (okay for involvement, bad for big new ideas). 2. Staying heads-down for too long (give yourself space to go big and wide). 3. Copying competition (don't assume they know what they're doing).

### 3 Anti-Patterns: Where Great Ideas Rarely Come From (Where Great Product Roadmap Ideas Come From)
A short list of commonly relied-upon but ineffective sources for big new product ideas, with nuance on when they might still be useful

How it works: 1. Large brainstorms — bad source for big new ideas, but has other benefits such as getting everyone on the team involved in the process
2. Staying heads down for too long — give yourself space to go big and wide on occasion
3. Copying what your competition is doing — don't assume they actually know what they are doing

### Feature Prioritization Survey Questions (Naomi Ionita)
A method to determine which features drive conversion.

How it works: 1. Ask users to rank features as must-have, nice-to-have, or not necessary. 2. Use a 100-point question where users distribute 100 points across features to reveal relative value.

### Feature Sunset Decision Checklist (3 of 5 Rule) (When to sunset a feature)
A five-criteria checklist for deciding whether to sunset a feature. If a feature checks 3 or more of the 5 boxes, it's probably time to shut it down.

How it works: If the product or feature checks 3 of these 5 boxes, it's probably time to shut it down:

1. **Low usage:** Less than 5% of your active users are engaging with it.
   - Key question: What features are used by less than 5% of your users?
   - Alternative signal: How many people complain about it when it isn't working?
   - Benchmark: If you were to launch a new product/feature, what percentage of adoption would you consider success? Any feature with lower adoption than that baseline is worth paying attention to.

2. **High cost to maintain:** Takes more than 10% of your team's resources just to maintain it.
   - Key question: What legacy feature or product (that isn't contributing to your team's goals) is sucking up 10% or more of your team's resources?

3. **Degrades the user experience:** Gets in the way of users completing important tasks or adding important new features.
   - Key question: What feature is making it harder for your users, or your designers, to accomplish more important work?

4. **Misalignment with strategy:** Does not support your strategy, and is very unlikely to align with your strategy a year from now.
   - Key question: What's a legacy product you're currently maintaining that no longer aligns with your company strategy?

5. **Very few vocal or important users:** You aren't worried about an outcry or a big revenue hit.
   - Action: Talk to users who are still using it to see if you're missing something, but generally index on the side of pushing through the blowback.

### Five Reasons an Idea Could Be Bad (Saying no)
Quick diagnostic for why an idea should be killed

How it works: 1. Low ROI: The workload will be very high, and the impact will not be as high as one thinks.
2. Strategically misaligned: This idea doesn't support the broader strategy and is a distraction.
3. Too high-risk: This has too high a chance of failing and/or hurting the business.
4. Bad product experience: This will hurt the product experience, without enough benefit.
5. High cost: The cost to design, build, launch, and maintain it will simply be too high for this to be feasible.

### Four Prioritization Pitfalls for Pre-PMF Startups (Prioritizing at startups)
Four common mistakes early-stage startups make when prioritizing what to build

How it works: 1. SOLVING NICE-TO-HAVE PROBLEMS: Building 'vitamins' instead of 'painkillers.' In B2B, you're unlikely to build a big business if you aren't solving significant pain. Examples of painkillers: Salesforce, Datadog, Stripe, Workday, Gusto—you basically can't do your job well without them.

2. TRYING TO BE DATA-DRIVEN: You simply don't have enough data as an early-stage startup. Example: to detect a 10% increase in a 20% conversion rate, you need over 5,000 users. Use Optimizely's sample size calculator to check.

3. TOO MUCH THEORY, NOT ENOUGH BUILDING: Incredibly detailed strategy docs and nice decks but not shipping often enough, ending up building something no one needed. If you're holding back because you aren't sure which direction to go, just ship something.

4. DOING EVERYTHING YOUR USERS ASK: Users will unknowingly deceive you. Focus on their pain points instead. Then think deeply about the best way to make that pain go away. Sometimes the solution is what a user suggested; oftentimes you'll discover something simpler, smarter, and useful to many other users.

### Impact Estimation Checklist (Prioritizing)
Three lenses to evaluate estimated impact of a roadmap item

How it works: When estimating Impact, look at: 1. How similar projects performed in the past. 2. How many users per day will see the feature (often overlooked). 3. How much of an impact this will likely have on a user. Based on these, come up with the expected range of impact. You'll often be wrong, but you'll get better over time.

### Impact and Confidence Scoring Heuristics (Introducing DRICE: a modern prioritization framework)
Quick heuristics for evaluating whether an idea should score high or low on Impact and Confidence during RICE scoring

How it works: **Impact - Score higher if:**
- It addresses a sensitive-to-change portion of the customer journey (above the fold on landing page, pricing page, checkout flow)
- The change is particularly significant—a 'big swing'

**Confidence - Score higher if:**
- You've already had the same concept work elsewhere in your product ('Emphasizing the money-back guarantee was a winner on the homepage; let's try it during checkout')
- One or more of your competitors already employ this tactic (they've likely tested into it): 'Our competitors offer a monthly pricing plan; we should try the same'
- Your customers are explicitly and repeatedly complaining about it: 'Why do I have to create a new account? I wish I could log in with Google'

**General guidance**: At the RICE stage, estimates are meant to be low-fidelity and directional SWAGs. Rather than nailing the categories, compare between items—do all the M's truly feel smaller than the L's?

### Miro's Eight Product Principles (How Miro builds product)
Codified prioritization principles used to make choices about what to prioritize and which design options to choose, formatted as prioritized pairs

How it works: 1. Best-in-class collaboration BEFORE solo scenarios. 2. End-user adoption BEFORE top-down decision makers. 3. Holistic product experience OVER local optimizations. 4. Intuitive patterns BEFORE reinventing UX. 5. Measurable outcomes OVER deliverables. 6. Evidence OVER opinions. 7. Fast learning to get product-market fit BEFORE scaling. 8. Always customer value ALONG WITH tech initiatives. These are used to ensure decisions are calibrated and the product remains in line with the team's core DNA. They became especially essential at Miro's scale and pace of growth.

### New Product vs. Existing Product Ideation Sources (How Gong builds product)
How to determine where ideas should come from based on the type of initiative

How it works: New products:
- Decision and initiation is mostly top-down
- Executive team identifies adjacent use cases or markets
- Work with teams to ensure resources are available
- Pods may be reallocated from existing areas

New capabilities within existing products:
- Collaborative effort between PMs, Group PMs, and leadership
- Rarely does leadership come up with a need in a vacuum
- Customers typically bring it up first
- PMs and Group PMs understand the need and initiate discussion
- Gets prioritized in annual or quarterly process
- Specifics led by product teams
- CPO gets involved in the 'how' when team lacks experience in the specific capability area

### Prioritization Accountability Standard (This Week #10: Keeping designers and engineers excited about metrics + Transitioning from DS to PM 🕺)
A set of questions everyone on the team (including PMs) should answer when advocating for a priority

How it works: When anyone wants to prioritize something, they should be able to answer:
1. How is the current state performing today? (e.g. 'how is the navigation doing today?')
2. How would you measure success for the business or the user?
3. What evidence do you have for the expected impact?
4. How should success be evaluated?

Key principle: Hold everyone to the same standard — including PMs. If someone really cares about something and it takes only a couple of hours, let them do it. Respect what teammates value and they will respect what you value.

### Priority-Resourcing Alignment Check (Tomer Cohen)
A diagnostic for ensuring stated priorities match actual execution and talent allocation

How it works: Ask: 1) What is your stated #1 priority? 2) Where are most of your engineers actually working? (If it's a migration, then the migration is your real #1 priority) 3) Where is your top talent deployed? (If not on the #1 priority, why?) 4) Does your resourcing actually reflect the priorities you communicate?

### RICE + DRICE Prioritization Process Steps (Introducing DRICE: a modern prioritization framework)
End-to-end process for running a quarterly prioritization cycle using RICE and DRICE

How it works: **Preparation:**
1. Collect potential ideas through brainstorming, data analysis, sales/CX calls, past backlogs, etc.
2. Ensure you have at least 5x as many ideas as you could reasonably build in the planning period (typically a quarter)

**Phase 1: RICE Scoring**
3. T-shirt score each idea on Reach, Impact, Confidence, and Effort
4. PM fills in Reach, Impact, Confidence; Tech Lead fills in Effort
5. Convert T-shirt sizes to numeric values
6. Calculate score: (Reach % × Impact % × Confidence %) / Weeks of effort
7. Sort all ideas by score
8. Take ~2x as many ideas as you'd have time for as your preliminary shortlist

**Phase 2: Validate Shortlist**
9. Double-check surprising scores—RICE isn't gospel
10. Loop in your team for adjustments
11. Accept that some 'clunkers' will rank above your favorites (this is the process working)

**Phase 3: DRICE (Detailed RICE)**
12. For each shortlisted idea, spend ~30 minutes creating:
    a. A clear hypothesis
    b. A bottom-up impact estimate in dollars
    c. A day-level engineering estimate
    d. Note non-engineering efforts if unusually large
13. Calculate ROI per engineering week (annualized revenue / eng weeks)
14. Re-rank based on $/eng-week
15. Select final projects for the quarter

**When to start DRICE-ing:**
- If win rate is above 70%, you can postpone
- Once obvious wins dry up (typically after 1-2 quarters), invest in DRICE
- Run this process every planning cycle

### Seven Types of Evidence for Building a Case Against (or For) an Idea (Saying no)
Evidence categories to use when constructing an unbiased argument about an idea's merit

How it works: 1. Data: What evidence do we have (either quantitative or qualitative) that this is a good idea? Is there evidence telling us it's a bad idea?
2. Working backward: If we work backward from our ideal product experience (i.e. our vision), does this play an important role in that future?
3. Strategy: How closely does this align with our product strategy?
4. Opportunity cost: How much work is this expected to take, and what work would be deprioritized in order to make this happen?
5. History: Is there anything we've done in the past that's similar to this idea that has worked out, or failed, that informs this idea's chances of success?
6. Authority: Do smart people with experience with the problem space tell us there's something great here?
7. A quick test: What's the quickest test we can run (either in product or in user research) to give us evidence this will work?

### Single Source of Truth Roadmap Rule (One team, one roadmap - Issue 30)
A rule for when it's OK to have separate docs vs. when you must consolidate into one roadmap.

How it works: Rule:
- It IS fine for individual functions (e.g., the research team) to keep their own internal roadmap to track internal sub-tasks (e.g., schedule a focus group)
- It is NOT fine for cross-functional teams to have separate roadmaps
- You MUST always have a single source-of-truth roadmap with each team member's projects and timelines for the cross-functional team

### Techniques for Defending Current Roadmap (Path 2) (Saying no)
Five ways to remind your manager why current work should remain the priority

How it works: 1. Bring up the roadmap and review it together—point out what impact each of the major tracks of work aims to have
2. Bring up slides/memos from your last planning session—review the high-level strategy
3. Discuss the broader strategy—and how this project does or doesn't fit
4. Bring up some of the pain that would be involved in making a change
5. Discuss how urgently this needs to happen, vs. waiting until the next planning cycle

### Tips for Staying Open-Minded When Evaluating Ideas (Saying no)
Five criteria for objectively evaluating an idea before deciding yes or no

How it works: 1. Take your team's feelings out of the equation. If you didn't have to deal with any drama, is this an objectively good idea?
2. Is it perishable? Does it need to happen now?
3. What's the potential downside if it fails? What's the potential upside if it succeeds?
4. Does it align with your business and/or product strategy? Or is it orthogonal and a distraction?
5. Is it likely your business will be better off if it happened?

## Examples

### Airbnb Milestones - Feature Sunset Case Study (When to sunset a feature)
A detailed real-world example of building, measuring, and ultimately sunsetting a feature at Airbnb

How it works: Product: Milestones - in-product messages celebrating host milestones (e.g. hitting 100th review, having a guest from a faraway country, hitting a perfect response rate).

Timeline & outcome:
- ~5 months to build
- High internal confidence it would impact host engagement, retention, and satisfaction
- Result: Zero measurable impact on any target metric
- After a reorg, another team inherited the product
- Maintenance began consuming a large chunk of team resources (even just fielding bugs took significant PM time)
- PM proposed sunset in the next planning cycle
- After much debate, leadership agreed
- Team was freed to move on to much more important work
- Retrospective assessment: Great decision

Why it qualified for sunset:
- Low/no measurable usage impact
- High maintenance cost (10%+ of team resources)
- No longer aligned with strategy (company moved on from 'host satisfaction' pillar)

Contrast with Superhost program: Also saw little measurable impact initially and took a lot to maintain, but was squarely aligned with long-term strategy (treating hosts like partners, helping guests find amazing places). Superhost survived and became core to Airbnb's DNA.

### Airbnb Neighborhoods - UX Degradation Sunset Case Study (When to sunset a feature)
Example of a beloved feature that was sunset because it degraded the core user experience

How it works: Product: Airbnb Neighborhoods - giving users insight into the character of each neighborhood when picking a location to stay.

Expectation: Incredibly helpful for travel planning.

Reality: People got distracted reading about all of the interesting neighborhoods and ended up not booking an Airbnb at all. Though the product and content was beloved, it increased friction for the most important user flow (booking).

Sunset reason: Degraded user experience by adding friction to core conversion flow.

### Ashby's Blockers-First Prioritization (Prioritizing at startups)
How Ashby prioritizes blockers in existing features over new feature development

How it works: Philosophy: Generally prioritize any serious 'blockers' with existing features over new feature development. Beyond that, take a portfolio approach of allocating a certain percentage of the team to building new features (making the product stickier) over optimizing existing features.

### Behance Feature Killing Spree (Scott Belsky)
Case study of how Behance launched with too many features (groups, Tip Exchange, portfolios, work-in-progress sharing) and systematically killed them to increase the core metric of project publishing

How it works: 2008 launch: Behance launched with groups, Tip Exchange, portfolio builder, work-in-progress sharing. Problem: Most complicated version was at launch. Solution: Killed Tip Exchange → project publishing went up. Killed groups → more projects published. Removed portfolio color customization → 24 hours of complaints, then never heard about it again, cleaner portfolios, core metric increased. Result: Making the product about one thing made the core crank operate at 10X velocity.

### DAO Governance Impact on Product Roadmap (A product manager’s guide to web3)
Two real examples showing how community governance directly affects product decisions and PM autonomy

How it works: Example 1 - Uniswap/Polygon: Uniswap needed a community vote to deploy its protocol to Polygon. Polygon submitted the proposal in November 2021 via governance forum, and this affected Uniswap's product roadmap.

Example 2 - ENS Domain Pricing: ENS core team discovered bots were snapping up three-letter domain names because the bid threshold was too low at $2K. They proposed raising it to $100K to prevent squatting. Proposal submitted January 2022 on Snapshot, approved by community, implemented via ENS oracle change.

### DRICE Worked Example: Adding PayPal (Introducing DRICE: a modern prioritization framework)
A complete DRICE estimate for adding PayPal checkout, showing hypothesis, impact model, engineering breakdown, and ROI calculation

How it works: **Hypothesis**: A potential customer segment prefers to pay with PayPal instead of credit cards and has been emailing to let us know. By adding PayPal as an option in the checkout flow, we will improve conversion by 2.7%, or an incremental $540k/year.

**Impact Estimate**: Bottom-up model showing 20,000 checkout visitors/month, baseline conversion, 2.7% lift based on customer complaints and competitor analysis, yielding $540k annualized.

**Engineering Estimate**: 7 days total
- [1 day] Integrate PayPal button on front end according to designs
- [1 day] Update receipt emails to support PayPal
- [1 day] Migrate e-commerce back end to support new payment type from Stripe
- [2 days] Integration tests for key flows (purchase, refund, cancellation, chargeback)
- [2 days] Buffer time

Key insight: Originally expected Braintree API integration, but discovered PayPal can be integrated directly from Stripe, significantly reducing effort.

**ROI**: $540k / 1.5 eng-weeks = $360k/eng-week

**Result**: Went from marginal RICE score to 'let's definitely do it this quarter.'

### Dropbox Business Migration Tool Case Study (Introducing DRICE: a modern prioritization framework)
Real case study showing how DRICE uncovered a hidden high-ROI project at Dropbox that became the biggest activation win of the quarter

How it works: Context: Team focused on activating new Dropbox Business users. One proposed idea was a migration tool for Basic users to streamline getting started with a Business account.

Initial assessment: Didn't think it would be a huge win since target users were only a subset of all sign-ups.

DRICE investigation revealed:
- A large percentage of Business team creators were previously Basic users
- A good chunk of teams had multiple users
- Many teams had private files but not team files
- A 'choose folders to share with your team' modal could boost sharing significantly

Result: DRICE significantly bumped the idea's expected ROI. They built it. The Dropbox Business Migration Tool became the biggest activation win of the quarter. Without DRICE, it was unlikely to have been prioritized at all.

Broader finding: Dropbox teams that adopted DRICE moved their key metric by twice as much as teams that stuck to simpler prioritization.

### Etsy Resource Misallocation: Search vs. Low-Traffic Pages (What They'd Do Differently 🔮 Kickstarting and Scaling a Marketplace Business)
A stark example of how Etsy misallocated engineering resources, with hundreds of people working on pages selling 700 items/day while only 3-4 worked on search selling 100,000 items/day

How it works: In 2012 at Etsy: Hundreds of people across the company worked on pages that collectively sold 700 items per day. 3-4 people worked on search, which sold 100,000 items per day. This misallocation pattern repeated every year with different details, increasing in scale. Nearly everyone eventually worked on a ground-up infrastructure rewrite that was later completely defunct. Multiple CEO changes were missed opportunities to acknowledge that product activity of almost the entire team had nothing to do with growth. Lesson: Audit where your engineering resources are allocated vs. where actual revenue and growth comes from.

### Mage's Dogfooding-Driven Roadmap (Prioritizing at startups)
How Mage built their initial roadmap by building features they wished they had as ML practitioners

How it works: Approach: Prioritize features they wished they had when using existing ML tools. That was the base roadmap—build features that could've made their jobs easier back then. Until they got the product in the hands of real paying customers, they kept building things they needed as users of their own product.

### RICE Comparison: Checkout with PayPal vs. Free-Trial Promo Codes (Introducing DRICE: a modern prioritization framework)
A worked example comparing two growth ideas using RICE scoring to illustrate how the framework produces a clear winner

How it works: **Checkout with PayPal:**
- Reach: All (customers must go through checkout)
- Impact: Small (most customers comfortable with credit cards)
- Confidence: Likely (competitors offer it, customers asked for it)
- Effort: Medium (Braintree API integration)

**Free-Trial Promo Code:**
- Reach: Low (only ~15% of customers come through podcasts)
- Impact: High (free trials have converted well in past tests)
- Confidence: Medium (common but not ubiquitous)
- Effort: High (free-trial code is messy, needs a month to clean up)

**Result**: PayPal wins—higher reach, higher confidence, lower effort, despite lower potential impact.

### Stytch's Root-Cause Problem Analysis Approach (Prioritizing at startups)
How Stytch digs deeper than surface-level feature requests to find optimal solutions

How it works: Philosophy: Don't just build what competitors are doing or take at face value what customers are asking for. Instead: (1) Dig deeper to understand the problem they're trying to solve. (2) Understand what the optimal solution could be. (3) If someone thinks X is a solution to problem Y, don't just build X without understanding problem Y. (4) Look for a more elegant or better solution that you'll only find if you understand the root issue. (5) Sometimes discover the product already supports what someone is trying to do. Result: Build more universally applicable products vs. one-off solutions.

## Tools

### $100 Voting Table (Lane Shackleton)
A prioritization exercise used during planning to surface misalignments.

How it works: A table listing problems, solutions, or themes. Each participant gets $100 to allocate across the items based on their perceived importance.

### Early Product Planning Spreadsheet (Gokul Rajaram)
A simple spreadsheet used instead of complex tools like Jira for early-stage product planning.

How it works: Keep it simple: list things to do and the people who are going to do it. Update it weekly. Avoid forcing product managers to use complex engineering tools.

### Eisenhower Matrix Miro Template (My favorite decision-making frameworks)
Miro board template for the Eisenhower Matrix prioritization framework

How it works: Template URL: https://miro.com/templates/eisenhower-matrix/
Instructions URL: https://jamesclear.com/eisenhower-box

### Further Reading Resources on Feature Sunsetting (When to sunset a feature)
Three recommended articles for deeper study on how to execute feature and product sunsets

How it works: 1. 'How to sunset a feature' by Intercom - https://www.intercom.com/blog/how-to-sunset-a-feature/
2. 'The art of unshipping: How to deprioritize features, phase out projects and sunset products' by Planio - https://plan.io/blog/deprioritize-and-sunset-projects/
3. 'Quick Guide: Sunsetting a Product' by Krishnan Hariharan on Product Coalition - https://productcoalition.com/i-was-recently-reading-todd-berkowitzs-blog-overcoming-the-sunk-cost-fallacy-when-selling-907963fb5192

### Impact Calculator Spreadsheet for Conversion Prioritization (Prioritizing conversion opportunities)
A Google Sheets template for structuring thinking about where to focus conversion optimization efforts across a product

How it works: A spreadsheet tool for walking through impact step by step when working across a big section of a product (not just one screen). Link: https://docs.google.com/spreadsheets/d/1g1kQn9p247GFzBfKOzm2Dci76EFpxjLrfe3MQrnllYQ/edit#gid=0

Can incorporate:
- Lenny's motivation/focus/friction framework
- Jeff Chang's intent/ease framework
- Customer and data inputs
- Ease of moving a metric vs. actual impact on central goal

Key insight: Often you'll identify something you could easily move but it won't mean much towards your central goal. The calculator helps you pair ease-of-change with actual impact.

### Recommended Reading List for Big Bet Prioritization (Defending your big bets)
Curated list of books and articles on prioritization, portfolio management, and decision-making under uncertainty

How it works: 1. 'Rock, Pebble, and Sand Product and Portfolio Management' by Becky Flint (article)
2. 'Why you need to innovate on three horizons' by Boris Wertz (article)
3. 'Thinking in Bets' by Annie Duke (book)
4. 'Why The Impact Effort Prioritization Matrix Doesn't Work' by Itamar Gilad (article)
5. 'Ruthless Prioritization' by Brandon Chu (article)

### Single Google Doc Project Management (Keith Coleman & Jay Baxter)
Using a single, long-running Google Doc instead of heavy tools like Jira or Asana to manage a team's daily priorities.

How it works: A daily meeting note-taking doc used to coordinate what the team is building, what's most important right now, what's blocking launches, and reviewing new data. Irrelevant items naturally fall off without needing explicit backlog grooming.

