# North Star Metrics - Frameworks, Templates & Checklists

*76 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### AARM Method (Preparing for a PM interview)
A framework for picking the right metric for a product in interview questions.

How it works: Used for: Picking a metric for a product
Reference: https://www.lewis-lin.com/blog/2017/11/3/what-is-the-aarm-method

### ARR Quality Assessment Components (What is a good growth rate)
A framework for evaluating the quality and sustainability of ARR beyond the topline growth number

How it works: Components of ARR to evaluate: 1. New ARR, 2. Retained ARR, 3. Expansion ARR, 4. Resurrection ARR, 5. Contraction ARR, 6. Churn ARR. Additional quality metrics: Customer concentration (risk from over-reliance on few customers), Sales efficiency (how does new ARR compare to sales and marketing spend?), CAC payback period. Key insight: The sustainability of growth matters as much as the rate — high growth fueled by unsustainable spend is not impressive.

### Active User Definition Evaluation Matrix (How to measure cohort retention)
Five common events used to define 'active users' with pros and cons of each

How it works: 1. Visit: Too broad, overcounts users, challenge with unauthenticated/unregistered users, only relevant for web.
2. Session starts: Possibly overcounts via unauthenticated IDs, need to limit session length to exclude background app refreshes and notifications.
3. Login or app opens: Need to exclude new users' first app open for cohorted retention, exclude unauthenticated users and duplicates.
4. Web page views or screen views: Too broad, pulls in all user types (dormant, lapsers, new) into one bucket, over-reports DAU and retention.
5. Main user action (e.g. item view, search, log exercise, transaction): Too narrow, may miss adjacent users, but recommended for cleanest data.

Recommendation: Use main user action. Examples by product type:
- Social network: Post, like, comment, share
- E-commerce: Search, item view, purchase
- Fitness app: Log food, log exercise
- Streaming: Play video, listen to podcast
- Fintech: Transaction, transfer
- Marketplace: Search, list, book

### Benchmark Reference Collection (The Best of Lenny’s Newsletter 2023)
A comprehensive set of product metric benchmarks covering retention, activation, churn, payback period, growth rate, and cohort measurement.

How it works: Six benchmark references organized by metric: 1. What is good retention — benchmarks by product type/vertical, 2. What is a good activation rate — plus how to determine your activation metric, 3. What is a good payback period, 4. What is good monthly churn — churn benchmarks, 5. How to measure cohort retention — methodology and standards, 6. What is a good growth rate — growth benchmarks. Each provides specific numerical thresholds for what 'good' looks like.

### Benchmark Reference Guide (The Best of Lenny’s Newsletter—2024 Edition)
A collection of benchmark values for key product metrics

How it works: Benchmark data across six key product metrics: 1) Retention rates (what is good retention by category), 2) Activation rates (what is a good activation rate), 3) Payback periods (what is a good payback period), 4) Monthly churn rates (what is good monthly churn), 5) Cohort retention (how to measure it), 6) Growth rates (what is a good growth rate). Each has specific numeric benchmarks segmented by business type.

### Common Currency Metrics Translation (Jess Lachs)
A method for standardizing the impact of different business levers into a single top-line metric.

How it works: Quantify all levers (e.g., lowering price by $1, reducing delivery time by 1 minute) into a common currency (Gross Order Value and volume) to easily compare trade-offs across different departments.

### Consumer Metrics by Business Model Framework (The most important consumer metrics to track)
A comprehensive framework mapping five consumer business model types to their most important metrics, with specific metrics prioritized for each type. Designed as a starting point before narrowing to 2-3 key metrics.

How it works: Five business model types with recommended metrics:

1. SUBSCRIPTION—TRIAL-BASED (e.g. Calm, Noom):
   Success drivers: Low acquisition costs, high trial-to-paid conversion, high retention
   Metrics: (1) Trials growth: New trials started, (2) Conversion: % of trials that convert to customers, (3) Customer retention: Month 1/3/6 cohort retention, (4) Revenue: Monthly recurring revenue, (5) CAC: Cost of acquiring a trial, (6) Growth spend efficiency: Payback period or CAC/LTV

2. SUBSCRIPTION—FREEMIUM (e.g. Duolingo, Spotify):
   Success drivers: Large free user pools via WOM/virality, high-enough free-to-paid conversion, high retention
   Metrics: (1) User growth: New signups, (2) User retention: Week 1/2/12 cohort retention, (3) Customer growth: New paying customers, (4) Customer retention: Month 1/3/6 cohort retention, (5) Conversion: % of free users converting to customers after 1-3 months, (6) Engagement: Key action each day/week/month, (7) Revenue: Monthly recurring revenue, (8) Growth spend efficiency: Payback period or CAC/LTV

3. AD-BASED (e.g. Snap, Twitter):
   Success drivers: Virality-driven (cheap) user growth, large % daily/weekly engagement, high retention
   Metrics: (1) User growth: New signups, (2) Engagement: DAU, WAU, or MAU, (3) Intensity: DAU/MAU, WAU/MAU, or L7/L30, (4) Retention: Week 2/4/8 cohort retention, (5) Activation: % of new users who 'activate', (6) CAC: Cost of acquiring a new user

4. MARKETPLACES (e.g. Airbnb, Etsy):
   Success drivers: Efficient acquisition costs, high-enough buyer conversion, high AOV or high purchase frequency
   Metrics: (1) Bookings: Total number of transactions, (2) Revenue: Total GMV, (3) Buyer retention: Month 1/3/6 purchaser retention, (4) Supply retention: Month 1/3/6 supply cohort retention, (5) Conversion: % of visitors who end up purchasing

5. DTC (e.g. Hims, Glossier):
   Success drivers: Highly efficient acquisition costs, sustainable margins, high AOV
   Metrics: (1) Customer growth: Number of new purchases/subscribers, (2) Customer retention: Month 3/6/12 cohort retention, (3) Revenue: Monthly (recurring) revenue, (4) Growth spend efficiency: Payback period, and/or contribution margin, and/or ROAS, (5) Gross margins: Net sales revenue minus cost of goods sold (per purchase or from annual subscription), (6) CAC: Cost to acquire a customer, (7) AOV: Average order value

### Consumer Subscription Metric Benchmarks (The most important consumer subscription metrics to track)
Specific benchmark thresholds for key consumer subscription metrics indicating 'great' performance

How it works: Benchmarks for 'great' performance:
- Free user growth: Over 20% MoM
- Payback period: Under 6 months
- Virality coefficient: Over 1.0
- ROAS: Over 4:1
- Paid cohort retention at 6 months: Over 70%
- Subscriber growth: Over 20% MoM
- Activation rate: See Mixpanel 2019 Product Benchmarks Report
- Free-to-paid conversion: See Ada Chen and Parsa VC benchmarks

### DMAIC (Bill Carr)
A Six Sigma process improvement framework adapted for finding and refining input metrics.

How it works: Stands for Define, Measure, Analyze, Improve, and Control. Used to treat the customer experience as a process where inputs are initially a black box that must be discovered and tuned.

### Daily Numbers Update (Daniel Lereya)
A daily automated message sent to specific product teams containing the exact metrics they are trying to move.

How it works: Teams receive a daily Slack message (via an internal bot) showing specific adoption metrics (e.g., how many accounts used AI actions today) to spark immediate conversation and action.

### Data Validation: Upstream, Downstream, One Click Up (Shaun Clowes)
A three-check framework for validating surprising data findings before presenting them, to avoid fool's gold and embarrassing presentations.

How it works: When you find a surprising data insight: 1) Check UPSTREAM (one click left): What happened before this event? Does it look normal? E.g., does this intervention only apply to 2% of the funnel? 2) Check DOWNSTREAM (one click right): What happened after? E.g., do these users churn in week 3? 3) Check ONE CLICK UP: Does the higher-level metric also improve? E.g., are these retained users actually paying enough to matter for revenue goals? If you still see the story after all three checks, you have something compelling.

### Data as Company Org Chart (Six rules of hiring for growth)
A mental model for structuring your company's data hierarchy, making it intuitive to prioritize which metrics to build and track first.

How it works: Hierarchy:
- CEO = Revenue (outcome metric)
- Leadership Team = Acquisition, Retention, Monetization (strategic growth levers)
- Team Members = Activation, Engagement, Conversion, etc. (operational metrics the growth team directly impacts)
- Chief of Staff = North Star Metric (predictor of revenue success, works behind the scenes)

Build order:
1. Start with 'Leadership Team' metrics (acquisition, retention, monetization) → gets you to data-informed stage
2. Then identify 'Team Member' metrics (activation, engagement, conversion) → transitions you to data-driven stage

Benefits:
- Understand where the most customer friction happens
- Prioritize opportunities for growth
- Help growth team members hit the ground running
- Aid in the creation of growth teams or growth pods

### Data as Compass, Not GPS (Shaun Clowes)
A mental model for how to use data in product management—data tells you if what you said is ridiculous or has potential, but it doesn't give you the answer.

How it works: Principles: 1) Data is for disproving, not proving, 2) If data contradicts your intuition wildly, the most likely explanation (Occam's razor) is that the data is wrong—trust intuition first, then verify, 3) Your intuition IS data—it's the accumulated pattern matching from everything you've seen, 4) Being data-driven is easily overdone—it makes you slow or wrong or both, 5) Don't use data as a weapon to force people to believe you.

### Data-Informed vs. Data-Driven Decision Making (Fostering a culture of experimentation)
A distinction between two approaches to using data in decision-making

How it works: Data-Informed: Using data as an input to decisions. Data is one of several factors considered. Acknowledges that data doesn't always have answers and is sometimes unhelpful or imperfect. Data-Driven: Blindly doing whatever the data tells you. Can be dehumanizing, too narrowly focused, or dangerous. Recommendation: Be data-informed, not data-driven. Frame data as 'the voice of your customers' — the scaled version of the founder feedback loop that becomes impossible to maintain as you grow.

### Feature Adoption Stages (How to accelerate growth by focusing on the features you already have)
A funnel for measuring how deeply users have adopted a feature, from awareness through power usage

How it works: Four stages of feature adoption to measure:
1. Aware — user knows the feature exists
2. Tried It — user has used the feature at least once
3. Adopted — user uses the feature regularly
4. Power User — user uses the feature heavily/frequently

Additional metrics to layer on:
- Completion Rate: Of users who start a multi-step feature flow, what % complete it?
- Success Rate: Of users who complete the flow, what % achieve a successful outcome?

Segment all metrics by user tenure:
- 0-30 days
- 31-90 days
- 91+ days

### Happy GMV (Sarah Tavel)
A metric concept that reframes GMV to focus on transactions where both the buyer and seller had a great experience, arguing that customers don't care about marketplace size — they care about how happy each individual transaction makes them

How it works: Instead of measuring raw GMV, identify what constitutes a 'happy' transaction (buyer retains, seller retains, both sides satisfied). Track the percentage of transactions that meet the happy threshold. Only happy GMV builds enduring value — unhappy GMV can actually be destructive.

### Input vs. Output Metrics (Bill Carr)
A mental model for focusing team goals on controllable actions rather than lagging results.

How it works: Output metrics are results (revenue, active users). Input metrics must be controllable by the team and directly touch/affect the customer experience (e.g., page load time, selection size, price).

### Metric Framework (Ecosystem-First Approach) (The definitive guide to mastering analytical thinking interviews)
Structured approach to defining metrics by starting with ecosystem players rather than jumping straight to metrics

How it works: Three-part structure:

1. **Ecosystem Value Mapping**:
   - List all key players who derive value from the product ecosystem
   - For each player, identify: (a) their value proposition ('What's in it for me?'), (b) specific actions they must take to realize this value
   - Leave out nice-to-have actions

2. **Metric Definition**:
   - Track key actions through metrics a data scientist could implement
   - Include time frames based on real user behavior (DWM = daily/weekly/monthly)
   - Track 3-5 primary metrics per ecosystem player
   - Define North Star Metric (NSM) that:
     * Reflects value creation across ecosystem players
     * Can grow indefinitely as the product succeeds
     * Includes a time frame (e.g., 'per week')
     * Is NOT an average or ratio (these can show false positives)

3. **Critique NSM**:
   - Identify 1-2 ways NSM growth could unintentionally damage ecosystem health
   - Define guardrail metrics that specifically address those drawbacks

Rules: If you can't describe a metric so a data scientist could run a query tomorrow, it's not useful. Never use averages/ratios as NSM.

Tip: Spend ~2 minutes organizing thoughts before sharing.

### NSM Anti-Patterns (What NOT to Do) (The definitive guide to mastering analytical thinking interviews)
Common mistakes when selecting North Star metrics that can give false positive signals

How it works: Anti-patterns to avoid:
1. **Using averages as NSM**: If average engagement increases but total users decrease, your NSM looks great while the product dies
2. **Using ratios as NSM**: Same problem — ratios can improve as denominators shrink
3. **Metrics without time frames**: Always include 'per day/week/month' — if a data scientist can't run a query from your definition, it's not useful
4. **Metrics that can't grow indefinitely**: NSM should be able to grow as the product succeeds, not be capped
5. **Too many metrics**: Focus on 3-5 primary metrics per ecosystem player rather than capturing everything
6. **Metrics that don't reflect value to all ecosystem players**: NSM should capture the unifying action that benefits everyone

### North Star Metric Translation Layer (Sri Batchu)
A system where each sub-team has a local metric they optimize, with a finance/data-built conversion factor that translates impact into the company-wide north star metric

How it works: Structure: 1) Set one north star metric (e.g., MAO at Instacart, SQL pipeline dollars at Ramp), 2) Each team has a local metric they directly influence (e.g., load time, checkout conversion, items in cart), 3) Finance/data team creates translation factors (e.g., 1 extra weekly order from checkout improvements = X impact on MAO), 4) All project plans and impact are rolled up into the north star for cross-prioritization, 5) Translation factors are updated every 6 months, 6) Use 70/30 or 80/20 confidence — don't use for marginal decisions.

### North-Star Metric to Team KRs Hierarchy (Fostering a culture of experimentation)
A framework for cascading a company-level north-star metric down to team-level key results

How it works: Step 1: Define a single quantifiable north-star metric (e.g., 'nights booked').
Step 2: Identify the components/levers that impact this north-star (e.g., supply growth, activation, conversion, retention).
Step 3: Map those levers to a hierarchy of team-level Key Results.
Step 4: Create clear accountability and direction for every leader based on their team's KRs.
Step 5: Over time, layer on additional metrics to ensure healthy and sustainable growth (e.g., trip quality, second-order effects).
Key insight: Move OKRs from output-based ('Launch X', 'Ship Y') to outcome-based (measurable impact on north-star components).

### Observations vs. Insights (Crystal W)
A framework for evaluating the usefulness of data tracking.

How it works: Observation: A factual data point (e.g., power users do 4x more bookings). Insight: Fact + Context + Action (e.g., power users use free shipping on high GMV baskets -> change marketing spend to only offer this to power users).

### Outlier Handling Rules for Linear Regression (How to do linear regression and correlation analysis)
Guidelines for deciding when to keep or remove outliers in regression analysis

How it works: Key principle: Outliers can either make regression more precise or skew the trend line.

Rule of thumb:
1. View the FULL distribution of data points before making decisions
2. The CLOSER outliers are to your average → LESS likely they affect regression → generally safe to keep
3. The FURTHER outliers fall from the average → MORE leverage to skew the trend line → consider removing
4. If overall data VARIANCE is HIGH → keep extreme outliers
5. If overall data variance is LOW and outliers are far from average → remove them

Two scenarios:
- Keep outliers: When they make regression more precise (data points that are unusual but valid)
- Remove outliers: When they deviate from the whole result and skew the trend line (errors, anomalies)

Recommendation: Running regression manually in Excel is tricky because of outliers. Safer to use online tools and statistical applications (like Wizard) that build regression for you and help identify influential outliers.

### Overall Evaluation Criterion (OEC) (Ronny Kohavi)
A composite metric that balances revenue/business goals with user experience guardrails, designed to be causally predictive of user lifetime value. Can be formulated as a constraint optimization problem (e.g., maximize revenue under a fixed pixel budget for ads).

How it works: Components: 1) Primary metric (e.g., revenue), 2) Guardrail/countervailing metrics (e.g., time to successful click, session success rate, churn rate), 3) Constraint formulation (e.g., fixed vertical pixel budget for ads). Key test: directionally, the whole room must agree whether up or down is good. Must be causally predictive of lifetime value.

### PLG Marketing North Star: Activated Signups (Product-led marketing)
The recommended north star metric for PLG marketing teams

How it works: Target KPI should NOT be:
- Website traffic
- Monthly signups

Target KPI SHOULD be:
- Activated signups: the number of new users who reach their aha moment with your product
- This is the best north star for PLG marketers
- Requires marketers to be tightly embedded in product strategy
- Note: Some friction can be good — PLG products need to motivate users to put in the work to be successful
- Healthy friction examples: punching up messaging, showing how product works (interactive tours), nurturing visitors who aren't ready

### Positive vs. Negative Correlation Examples for Product Metrics (How to do linear regression and correlation analysis)
Reference examples of positive and negative correlations commonly seen in product analytics

How it works: Positive correlation (increase in X correlated with increase in Y):
- Increase in installs → increase in signups
- Increase in notifications → increase in DAU
- Increase in comments per post → increase in post shares

Negative/inverse correlation (increase in X correlated with decrease in Y):
- Increase in price → decrease in trial-to-paid rate
- Increase in webpage load time → decrease in page views
- Stopping logging exercises → user churn

Use case questions to answer with correlation:
1. Is there any relationship between two features or user activities? (e.g., booking a hotel and purchasing a concert ticket)
2. Do they increase and decrease together? (e.g., comments per post and post shares)
3. Are they dependent or independent? (e.g., day's weather and app usage, market recession and subscription churn)

### Retention Metric Input by Business Model (How to measure cohort retention)
Maps business models to the correct baseline metric for retention calculation

How it works: Different business models require different metric inputs for retention:
- Free consumer product: DAU (Daily Active Users) — users who perform main action
- Freemium product: DAU for free users + DAPU (Daily Active Paying Users) for paid users — track separately
- SaaS/Subscription: DAC (Daily Active Customers) or DAPU — based on subscription status and activity
- E-commerce/Marketplace: DAU or transaction-based active users

Key insight: Never blend free and paid users into one 'blended' retention number. Paid users use product far more than free users, hiding true free user activity and conversion opportunity.

### Retention as Output Metric Principle (How to measure cohort retention)
Why retention should not be used as an A/B test metric or weekly reporting baseline

How it works: Retention (like revenue) is an OUTPUT metric, not an input metric. Activity is only one component of retention. Key implications:
1. Do not use retention as a baseline metric for A/B tests — increases in user activity won't necessarily move retention
2. Do not use retention for weekly reporting cadence — it moves too slowly
3. Monitor retention but don't strictly utilize it as a goal for testing or campaigning
4. Instead, use retention as a long-term health indicator and use component metrics (activity, engagement actions) for experiments

Source: Brian Balfour's framework on output vs. input metrics.

### Root Cause Analysis for Metrics Drops (Robby Stein)
Systematic approach to diagnosing why a product metric has dropped by progressively narrowing the scope

How it works: When metrics drop, ask progressively: 1) Is it in a specific region? 2) Is it on a specific device? 3) Is it in a specific demographic? 4) Is it in a specific use case? 5) Where in the funnel do users bail? Once root cause is identified, design the 'treatment for the disease' and get back to growth. Example: Close Friends failed because mistranslation caused users to add only 1 person, breaking the core feedback loop.

### Signal Not Noise (Timothy Davis)
A data analysis philosophy adapted from Nate Silver's 'The Signal and the Noise' for focusing on the metrics that matter based on campaign objectives

How it works: Principle: Platforms give you everything (reach, frequency, CPMs, CPC, conversion rate, cost per lead, cost per MQL, etc.) — most of it is noise. Filter by campaign objective: Conversions campaign → focus on clicks, conversions, targeting accuracy. Ignore impressions, reach, frequency. Awareness campaign → focus on how many people saw it. Consideration campaign → focus on funnel progression (white paper downloads, demos). Used as interview question: throw many data points at candidate, ask what they'd optimize — right answer starts with 'What's the purpose of the campaign?'

### Sound of Silence in Ratings (Ramesh Johari)
The concept that ratings NOT left contain significant predictive information, and normalizing by including non-responses creates a more predictive metric

How it works: From Steve Tadelis et al. at eBay: 'Effective percent positive' normalizes ratings by including ratings that weren't left. This metric was much more predictive of downstream seller performance than traditional rating averages. Insight: People who have a bad experience often just don't leave a review rather than leaving a negative one.

### Two Success Metrics: Volume + Efficiency (Sri Batchu)
Always have exactly two success metrics — one measuring volume/growth and one measuring efficiency

How it works: Volume metric criteria: (1) clear linkage to business value creation, (2) intuitive for all employees, (3) translatable to individual team efforts — not too far toward revenue (lagging) and not too granular. Efficiency metric: payback period on contribution margin preferred over CAC or LTV-to-CAC. Examples: Instacart = MAO (volume); Ramp = SQL pipeline dollars (volume).

### Value Exchange Loop (Itamar Gilad)
A model for setting top-level goals by measuring both sides of a business transaction.

How it works: Consists of measuring 'Value Delivered' to the market (North Star Metric, e.g., messages sent on WhatsApp) and 'Value Captured' back by the business (Top KPI, e.g., revenue or profit).

### Waymo KPI Categories: Commercial vs. System Behavior (Shweta Shriva)
A two-category framework for measuring progress in a complex autonomous driving product, balancing business viability with technical performance.

How it works: Category 1 - Commercial & Operational Metrics: trips per week, daily/weekly active users, funnel metrics, cost to operate. Category 2 - System Behavior / Driver Performance Metrics: safety (collisions per 100K miles vs. human benchmark), road rule compliance, adequate progress (avoiding undue stops/strands), rescue intervention frequency, impact on surrounding traffic.

## Templates

### Correlation and Linear Regression Google Sheets Template (How to do linear regression and correlation analysis)
A ready-to-use Google Sheets template with two columns for input data, CORREL formula for correlation, and LINEST formula for regression

How it works: Google Sheets template link: https://docs.google.com/spreadsheets/d/1T4LAcBx9HHhDydMW0NPr1jOaEzx5GtZ9CTrcjeTrFZ8/edit#gid=1443729456

Setup:
- Column A: Independent variable X (e.g., number of food logs, page views, notifications sent)
- Column B: Dependent variable Y (e.g., retention rate, signups, DAU)

Formulas:
- Correlation: =CORREL(X range, Y range)
- Linear regression: =LINEST(Y range, X range, true, true) where 'true' = show additional statistics / calculate intercept

For Excel: Install Analysis ToolPak add-in → Data menu → Data Analysis → Regression → Input X and Y column ranges

### Data Dictionary (Hila Qu)
A foundational document to align teams on product analytics tracking.

How it works: A spreadsheet that includes: Key user actions, the exact event name for each action, and the associated properties. Ensures PMs and analysts share the same definitions.

### Four-Box Hypothesis Framework (Nicole Forsgren)
A visual tool drawn on paper to map conceptual relationships to measurable data.

How it works: Draw 4 boxes in a 2x2 grid. Top row is 'Words' (e.g., Box 1: Customer Satisfaction -> Box 2: Return Customers). Bottom row is 'Data' (e.g., Box 3: CSAT score -> Box 4: Website return visits). Connect top boxes with an arrow, and bottom boxes with an arrow. Validates if the data actually represents the words.

### Metrics Trees (Itamar Gilad)
A visual breakdown of the North Star metric and Top KPI into layers of sub-metrics that individual teams can own.

How it works: Maps out the mathematical formula of variables that impact the top-level goals, helping teams estimate experiment impact and organize team topology.

### Performance Metrics/KPI Definition Prompt (DoorDash Example) (How close is AI to replacing product managers?)
Full prompt used to define North Star and supporting metrics that beat a human PM's answer 68% to 32%

How it works: As a product manager for a major tech company similar to Google, Amazon, Microsoft, or Facebook, you are tasked with defining performance metrics for the provided product.

Start by listing assumptions and planning out your answer in a separate bullet point section labeled "Thinking". Then follow the instructions:

## Instructions
- Start by identifying the core service/product and determine the most crucial metric aligning with overarching goals of all stakeholders — this is your NorthStar metric
- NorthStar should reflect primary measure of success impacting revenue, user satisfaction, and operational efficiency
- Define primary metrics that feed into NorthStar metric, broken into categories by user groups or business aspects
- For each category, list specific, measurable, actionable metrics clearly related to enhancing NorthStar metric
- Use clear professional language, ensure metrics are logically connected showing how primary metrics influence NorthStar

Follow the structure in the example exactly:

## Example
What should be the NorthStar metric for StreamLine?
The ideal NorthStar metric for StreamLine would be the 'Number of active streamers per day,' as this metric is pivotal to the ecosystem's vitality...

To strategically drive our North Star metric, we should rigorously track these primary metrics:
- Streamers - Daily Active Streamers, Number of Streaming Sessions per Streamer, Conversion Rate, Average Stream Length
- Viewers - Daily Active Viewers, Average Viewing Duration per Session, Viewer Engagement Rate
- Advertisers - Number of Active Campaigns, Average Impressions per Stream, Ad Click-Through Rates

## Checklists

### Ad-Based Product Metrics Checklist (The most important consumer metrics to track)
Six essential metrics to track for ad-supported consumer products

How it works: 1. User growth: New signups
2. Engagement: DAU, WAU, or MAU
3. Intensity: DAU/MAU, WAU/MAU, or L7/L30 power user curve
4. Retention: Week 2/4/8 cohort retention
5. Activation: % of new users who 'activate' (define what activation means for your product)
6. CAC: Cost of acquiring a new user

### Additional SaaS Metrics Checklist (The most important bottom-up SaaS metrics to track)
Secondary metrics to have available for deeper analysis beyond the core pre-revenue and post-revenue metrics

How it works: Engagement:
☐ DAU/MAU
☐ Key actions per day/week (e.g. tasks created, pics sent)
☐ Average time spent/user/day

Virality (deeper):
☐ Invite volume (median number of invites sent per user when an invite is sent)
☐ Velocity of virality (median days from 1→N seats at a company)
☐ Traction (number of companies with at least 3 users signed up)
☐ Leads (top domain names with most users for targeting outreach)

Monetization (deeper):
☐ ARPU (average revenue per user)
☐ User conversion (% of free users converting to paid within X days)
☐ Quick ratio: (New MRR + Expansion MRR) / (Contraction MRR + Churned MRR)
☐ Growth spend efficiency (CAC/LTV)
☐ Speed to next tier (if usage-based pricing)
☐ Company adoption (number of users per domain name)

Funnel conversion:
☐ Landing conversion (% visitors click CTA)
☐ Activation (% visitors who activate)
☐ % visitors complete sign-up flow
☐ % visitors signup

### Amplitude Compass Correlation Analysis Steps (How to do linear regression and correlation analysis)
Step-by-step guide for running correlation analysis using Amplitude's Compass feature

How it works: Steps:
1. Go to Analysis section in Amplitude
2. Select the Compass chart
3. Select the user activity you want to measure (e.g., logging a meal, opening the app, sending an invite, viewing a listing, creating a video)
4. Pick the metric you want to see an impact on (e.g., retention, trial, churn, activation)
5. Adjust the time range for the user activity (e.g., 7 days after signup)
6. Review the correlation score returned

Interpreting results:
- Score closer to 1.0 = highly predictive positive correlation
- 'Highly predictive' means high likelihood of the activity predicting the metric
- Does NOT prove causation or guarantee future users will behave the same way
- Bonus: Compass also shows impact of FREQUENCY of activity on the metric (e.g., logging food once vs five times in 7 days)

Next step: Run the same analysis for other user activities to compare correlation strengths across features

### Context-Rich Event Tracking (Crystal W)
Criteria for setting up useful analytics events.

How it works: Instead of just tracking the event (e.g., 'map loaded'), track properties that explain the user's context: number of items on screen, location, pricing/surge status, active vouchers. This allows you to answer *why* an event happened.

### DTC Metrics Checklist (The most important consumer metrics to track)
Seven essential metrics to track for direct-to-consumer businesses

How it works: 1. Customer growth: Number of new purchases/subscribers
2. Customer retention: Month 3/6/12 cohort retention
3. Revenue: Monthly (recurring) revenue
4. Growth spend efficiency: Payback period, and/or contribution margin, and/or ROAS
5. Gross margins: Net sales revenue minus cost of goods sold (per purchase or from annual subscription)
6. CAC: Cost to acquire a customer
7. AOV: Average order value

### Foundational Metrics Every Business Should Track (The most important marketplace metrics to track)
Five universal metrics that apply regardless of business model, recommended as a baseline alongside marketplace-specific metrics

How it works: 1. Cohort-based retention: Percentage of users who come back x months later
2. Net revenue retention: How much you grow revenue per customer over time
3. New user growth: Number of new users per day/week/month
4. CAC/LTV, payback period, or contribution margin: Cost to acquire a new user vs. money you make from each new user
5. Unit economics (optional): How much profit you make per order

### Freemium Subscription Metrics Checklist (The most important consumer metrics to track)
Eight essential metrics to track for freemium subscription consumer products

How it works: 1. User growth: New signups
2. User retention: Week 1/2/12 cohort retention
3. Customer growth: New paying customers
4. Customer retention: Month 1/3/6 cohort retention
5. Conversion: % of free users that end up converting to customers after 1-3 months
6. Engagement: Key action each day/week/month
7. Revenue: Monthly recurring revenue (MRR)
8. Growth spend efficiency: Payback period or CAC/LTV

### Full Consumer Subscription Metrics Dashboard (The most important consumer subscription metrics to track)
Complete list of all metrics organized by the six pillars, suitable for building a comprehensive subscription metrics dashboard

How it works: Acquisition:
- Free user growth (MoM % growth in free/trial users)
- Payback period (months to recover CAC from subscription revenue)
- Virality (average new users driven per existing user)
- ROAS (return on ad spend by channel)

Activation:
- Activation rate (% of free/trial users hitting a valuable milestone in first X days)
- Total number of activated users (absolute count in past X weeks)

Engagement:
- Monthly or weekly active users (total doing something valuable in past X weeks)
- Cohort engagement (% still doing something valuable X weeks after signup)
- Intensity of engagement (L7/L30 for software, time spent for content)

Conversion:
- Cohort conversion from free to paid (% converting X weeks after signup, split by monthly/annual)
- Revenue growth (MoM growth in first-time purchaser revenue)
- Velocity (median time from free signup to paid conversion)
- Length (split between monthly and annual subscriptions)

Retention:
- Cohort retention (% of paid users still paying X months later)
- Second-order retention (% not canceling after first experience/order)
- Subscriber growth (MoM growth in new subscribers)
- Resurrection (% of churned users who re-subscribe)

Profitability:
- Gross margins per order (net sales revenue minus COGS)
- Contribution margin (incremental profit per unit after all variable costs)
- Contact rate (% of users contacting support at least once)
- ARPU (average revenue per user)

### How to Set Up Tracking and Analytics (How today’s top consumer brands measure marketing’s impact)
Step-by-step process for implementing digital tracking infrastructure from scratch

How it works: Steps:
1. Start with a tracking plan - detail what you want to track and when events occur. Can be an Excel spreadsheet or a dynamically updated event tracking system (e.g., Avo) integrated with your deployment process or tag manager (e.g., Segment Protocols).

2. Implement a tag manager - records data once and pushes to where you need it. Options: Google Tag Manager (free) or Segment (paid, better collaboration/monitoring/implementation).

3. Set up tracking pixels for each ad platform.

4. Choose analytics software - Google Analytics 4 is good default for web. For mobile: use link attribution service like AppsFlyer or Branch (because Apple App Store blocks UTM parameters).

5. Add UTM codes to campaign URLs - format: ?utm_source=facebook&utm_medium=cpc&utm_campaign=abc

6. For advanced use cases: Set up a data warehouse pulling in all analytics data + advertising spend data via Supermetrics or Funnel.io.

7. Build custom MTA models and reports using data visualization tools like Looker or Tableau.

### Mixpanel Signal Report Correlation Analysis Steps (How to do linear regression and correlation analysis)
Step-by-step guide for running correlation analysis using Mixpanel's Signal feature

How it works: Steps:
1. Click on Mixpanel Apps in the top navigation bar
2. Select Signal
3. Define the user cohort for analysis (e.g., new users)
4. Choose a time frame (e.g., the last quarter)
5. Pick the goal/metric (e.g., second-week retention)
6. Select the user activity you want to measure (e.g., 'log food')
7. Add additional filters to the selected user activity (specific time, device type, or geo)
8. Click 'Correlate'

Interpreting results:
- Returns correlation score (e.g., 0.78 = strongly correlated)
- Click 'Details' to view heatmap showing ideal frequency and timing (e.g., action needs to be completed at least 2 times within 3 days of registration)
- Use 'Top features' breakdown to compare correlation scores across all features in your app
- Returns a ranked list of top activities with their correlation scores to your selected metric

### Post-Revenue SaaS Metrics Checklist (The most important bottom-up SaaS metrics to track (and how to best visualize them), The most important bottom-up SaaS metrics to track)
The essential metrics to track after generating revenue in a bottom-up SaaS company, in priority order

How it works: Priority 1 - Revenue growth:
☐ MRR (total and MoM growth)
☐ ARR (total and MoM growth)
☐ New customers per week

Priority 2 - Retention:
☐ Customer retention (% of new paying customers still customers 3-6 months later)
☐ Net Dollar Retention (MRR of each cohort at 12 months)

Priority 3 - Monetization:
☐ Paid company conversion (% of free companies converting to paid within X days)
☐ Payback period (average time to pay back CAC)
☐ Gross margins (net sales revenue minus COGS)

### Product Quality Control Metrics (Geoff Charles)
A set of standardized metrics used to ensure fast-moving teams do not degrade the customer experience.

How it works: Criteria to track: 1) Voice of customer (negative reviews sent to tech lead/PM/designer monthly), 2) NPS and CSAT, 3) Operational overhead (percentage of support tickets normalized by user count), 4) Number of customers confused. If metrics drop, feature shipping is halted to fix the issues.

### Server-Side Analytics Tracking Approach (Vijay)
Vijay's recommended approach for setting up product analytics using server-side tracking instead of client-side SDKs

How it works: Problems with client-side: 1) Web: 20-30% event drop from ad blockers. 2) Mobile: duplicate events across iOS/Android. 3) Mobile: old tracking stuck on old app versions, new tracking only on latest version. Server-side benefits: 1) Instantly cross-platform (web, mobile, TV all go through servers). 2) Controlled environment — updates apply to 100% of users. 3) Engineers already know how to do it (structured logs with user IDs = events). Recommendation: Start server-side by default. Supplement with client-side later only if you need client-only context.

### Snowflake Product Success Metrics (How Snowflake builds product)
The set of metrics Snowflake uses to measure product success across QBRs and dashboards

How it works: Metrics tracked:
- Product revenue
- Net revenue retention rate (currently 150%)
- Impressions
- Active usage
- Engagement
- Customer satisfaction / Net Promoter Score (NPS) — currently 72, published externally annually
- Dashboard monitoring (leadership checks for changes within 24-48 hours)

Measurement infrastructure:
- Dedicated data scientist embedded in each product area
- QBRs report key indicators to leaders across product, marketing, sales, and support
- Everyone encouraged to dig into the data
- All analysis done using Snowflake itself

### Starter Metrics Checklist by Subscription Type (The most important consumer subscription metrics to track)
Prioritized short list of the most important metrics to track first, tailored to each of the three consumer subscription business types

How it works: Software subscription businesses — start here:
1. Activation rate: % of free/trial users who hit a valuable milestone in first X days (e.g. meditate, watch a show, listen to a song, find a match, sync a folder)
2. Intensity of engagement: L7/L30
3. Conversion from free to paid: % of free users who convert X weeks after signing up
4. Cohort retention: % of paid users still paying 1 month and 1 year later

Content subscription businesses — start here:
1. Cohort engagement: % of users still doing something valuable X weeks after signing up
2. Conversion from free/trial to paid: % of free users who convert X weeks after signing up
3. Cohort retention: % of paid users still paying 1 month and 1 year later

Physical goods subscription businesses — start here:
1. Second-order retention: % of users who don't cancel after their first order
2. Contribution margin: Incremental profit per unit sold, subtracting all variable costs
3. Cohort retention: % of paid users still paying 1 month and 1 year later

### Success Criteria Definition Tips (A Three-Step Framework For Solving Problems 👌)
Three tips for defining how you'll know if you've solved the problem.

How it works: 1. Try hard to make it a concrete number, e.g., '10% increase in X', '50% decrease in Y', '20% adoption of feature Z within 3 months.'
2. Pick a goal that's believable but ambitious — one that if hit, your team and leaders would be excited about.
3. If a metric truly doesn't make sense (think long and hard about this), write out what concretely the world would look like if this was a big success. Make that the success criteria.

### Trial-Based Subscription Metrics Checklist (The most important consumer metrics to track)
Six essential metrics to track for trial-based subscription consumer products

How it works: 1. Trials growth: New trials started
2. Conversion: % of trials that convert to customers
3. Customer retention: Month 1/3/6 cohort retention
4. Revenue: Monthly recurring revenue (MRR)
5. CAC: Cost of acquiring a trial
6. Growth spend efficiency: Payback period or CAC/LTV

## Examples

### Airbnb Growth Model and Goal-Setting Example (Setting goals)
A real-world example of how Airbnb identified their north star metric, mapped levers, found the biggest constraint, and set a concrete goal

How it works: North Star Metric: Nights booked
Growth Model Levers (Level 1): Demand, Supply, Dynamics between the two
Sub-levers (Level 2, Demand example): Site visits, Conversion, Cancellation rate
Biggest Constraint Identified: Homes (supply)
Action: Built a team focused just on growing supply
Concrete Goal Metric: 'New listings that received at least one booking'

### Airbnb North Star Metric Implementation (Fostering a culture of experimentation)
How Airbnb chose 'nights booked' as their north-star metric and how it transformed experimentation culture

How it works: Problem: The DS team was overwhelmed by analysis requests. Comparing impact across disparate projects (e.g., growth in China vs. ML improvements for search ranking) was impossible. OKRs were output-focused ('Launch X', 'Ship Y'). Solution: The CFO and DS lead established 'nights booked' as the north-star metric — a common denominator for all projects. Impact: (1) Leaders were held accountable to measurable results instead of task completion. (2) Leaders needed to understand why things worked/didn't, so they embraced experiments. (3) Leadership could map the north-star to component levers (supply growth, activation, etc.) and create a hierarchy of team-level KRs. (4) Later layered on additional metrics for healthy growth (trip quality, second-order effects).

### Balancing Quality Metrics (Nickey Skarstad)
Using specific quality-focused metrics to counterbalance top-line growth metrics.

How it works: Airbnb Experiences used '5-star review rate' as their north star to balance booking growth. Etsy used 'first sale in 7 days' and intentionally added friction to the onboarding flow to ensure long-term seller success over raw shop-creation numbers.

### DoorDash's Market Graduation Metric (How To Know If You're Supply or Demand Constrained 🤹‍♂️ - Phase 2 of Kickstarting and Scaling a Marketplace Business)
DoorDash's approach to validating new markets using a minimum delivery threshold

How it works: DoorDash was essentially always supply constrained. Growth was always driven by three supply-oriented factors: Selection, Delivery quality, and Affordability. When launching new markets, they focused on reaching a small, defined number of deliveries per day (e.g., 100 deliveries/day) within a relatively defined space (a couple of neighborhoods, not an entire metro area). When markets hit that level, they 'graduated' as a market. If they didn't reach that level relatively quickly, dashers and restaurants would churn.

### Lenny's Podcast Growth Metrics (My podcast tech stack, workflows, and lessons)
Key metrics from Lenny's Podcast after approximately two years of operation

How it works: After ~2 years:
- 10M+ total downloads
- 3M+ YouTube views
- Over 50% of views from YouTube sending new people (algorithmic discovery)
- Consistently top 10 technology podcast globally (Chartable/Spotify)
- 5.0 average star rating across nearly 4,000 reviews
- Started with product management niche, expanded to sales, storytelling, design, fear, productivity
- ~1-3 inbound guest requests per day
- 4-5 hours of work per episode (with production team)

### Merchant Health Score Simplification (Jess Lachs)
Moving from a complex composite metric to simple, actionable input metrics.

How it works: Replaced a confusing 0.35 composite score with three distinct, trackable inputs (e.g., orders in first 7 days, photo coverage, accurate hours) so the team knew exactly what to move.

### Never Delivered Metric (Jess Lachs)
A specific metric created to track and eliminate a rare but highly costly fail state.

How it works: Instead of looking at average delivery success, they created a dedicated metric and cross-functional team goal to eradicate orders that are never delivered, which disproportionately cause churn and financial loss.

### North Star Metrics of 40+ Successful Growth-Stage Companies (Choosing Your North Star Metric)
A comprehensive table/reference showing the North Star Metrics used by over 40 of today's most successful growth-stage companies, collected via survey of current and past employees. The full table is included as a large image in the newsletter and detailed in the linked a16z Future post.

How it works: A reference table mapping 40+ successful growth-stage companies to their chosen North Star Metrics. The full details are in the linked a16z Future post (future.a16z.com/north-star-metrics/). The newsletter includes a preview image of the table. Companies and their NSMs are categorized to help readers find patterns relevant to their own business type.

### North-Star Metric Examples by Marketplace Company (The most important marketplace metrics to track)
How different marketplace companies define their primary bookings/north-star metric

How it works: Company → North-Star Metric (Bookings variant):
- Uber: Rides
- Lyft: Rides
- Airbnb: Nights booked
- Cameo: Orders
- Hipcamp: Nights outside
- eBay: Items sold
- Peerspace: Bookings
- Offsyte: Events booked

GMV as north-star (second most common):
- Snackpass
- Whatnot
- Shopify
- Cameo (partially)

### Open Startup Metrics Dashboard Examples (The most important bottom-up SaaS metrics to track)
Real companies that publicly share their SaaS metrics, useful as references for how to structure and visualize your own dashboard

How it works: 1. Open startups by Baremetrics: https://baremetrics.com/open-startups
2. Open startups by Postmake: https://postmake.io/open
3. Ghost: https://ghost.org/open/
4. Buffer: https://buffer.com/revenue
5. Gumroad: Revenue shared by @shl on Twitter

### Pinterest Core Action Discovery (Sarah Tavel)
How Pinterest's product team identified pinning as the core action through bottoms-up data analysis and top-down product reasoning, ultimately adopting weekly active pinners (WAPs) as their North Star metric

How it works: Challenge: Unclear if Pinterest was a social network (optimize follows?) or a discovery tool. Measured: follows, clicking through, liking, pinning, repinning, time on site. Bottoms-up finding: Users who pinned had 90%+ probability of returning the next week. Top-down reasoning: If a user never saves something to a board, they don't understand what Pinterest is. Result: Weekly Active Pinners (WAPs) became North Star. Initially called Weekly Active Repinners (WAR) because 'we felt like we were at war.'

### Thumbtack's Hire Rate and 3+ Quotes Threshold (How To Know If You're Supply or Demand Constrained 🤹‍♂️ - Phase 2 of Kickstarting and Scaling a Marketplace Business)
Thumbtack's process for finding their most predictive metric of consumer satisfaction

How it works: Thumbtack went through a process to find the metric most predictive of consumer satisfaction (NPS in their case) and found that 'Hire Rate' was directly correlated with the NPS score customers ended up giving later. They focused on Hire Rate. They found that customers were happy when they got at least three results when searching for a Pro. The marketplace was considered healthy when 60% of search results included 3 or more quotes. Below that threshold meant they were supply constrained.

### YouTube's Core Action Evolution (Sarah Tavel)
How YouTube shifted its core action from watching videos to subscribing, as shared by former CPO Shishir Mehrotra

How it works: Initial assumption: Core action was watching a video. Discovery: Subscribing was actually the core action. Why it works for both sides: Creators care about YouTube because that's where they grow their audience (subscribers = accruing benefit + mounting loss). Viewers come back because they've found creators whose content resonates enough to subscribe. Key insight: The best core action helps both sides of the network.

### Zero Support Tickets Metric (Jeff Weinstein)
A cohort metric tracking the percentage of users who complete a core product flow without ever contacting support.

How it works: Used at Stripe Atlas. Tracked users from first page load through the entire process plus a two-week buffer. Drove the number from 15% to 85% by turning engineers into PMs to solve specific ticket drivers.

## Tools

### CSAT over NPS (Judd Antin)
A specific survey question recommendation to replace the Net Promoter Score.

How it works: Instead of asking 'How likely are you to recommend...', ask a Customer Satisfaction (CSAT) question: 'Overall, how satisfied are you with your experience with [Product/Company]?' This avoids the methodological flaws of the 11-point NPS scale and correlates much better to actual business outcomes.

### Correlation Analysis Resources (How to accelerate growth by focusing on the features you already have)
Reference to tools and guides for running correlation analysis on product features

How it works: For identifying key features correlated with growth:
- Many popular, easy-to-use tools (including free ones) exist for quickly doing correlation analysis
- Can be done in a spreadsheet
- Recommended primer: 'How to do linear regression and correlation analysis' by Olga Berezovsky on Lenny's Newsletter (https://www.lennysnewsletter.com/p/linear-regression-and-correlation-analysis)
- Note: Correlation doesn't imply causation, but it's still the best way to identify features with the highest likelihood of driving growth

### Further Reading and Resources on Consumer Subscriptions (The most important consumer subscription metrics to track)
Curated list of five resources for deeper study on consumer subscription metrics and strategy

How it works: 1. '10 Factors To Consider When Evaluating Consumer Subscriptions' by Nikhil Basu Trivedi (Substack)
2. 'Hierarchy of Engagement' by Sarah Tavel (Medium)
3. 'Consumer Subscription Software Insights' by GP Bullhound (PDF report)
4. 'The Internet Subscription Startup is Winning' by Tomasz Tunguz (blog)
5. Lenny's Twitter thread on this topic

### Further Study Resources for Consumer Metrics (The most important consumer metrics to track)
Curated list of deep-dive resources on consumer metrics topics including retention benchmarks, DTC metrics, subscription evaluation, and engagement measurement

How it works: 1. 'What is good retention?' by Lenny Rachitsky — retention benchmarks
2. 'DTC Metrics, Explained' by Zachariah Reitano (Medium/Ro) — DTC-specific metric deep dive
3. '10 Factors to Consider When Evaluating Consumer Subscriptions' by Nikhil Basu Trivedi — subscription evaluation criteria
4. 'DAU/MAU is an important metric to measure engagement, but here's where it fails' by Andrew Chen — limitations of DAU/MAU ratio
5. 'The Power User Curve' by Andrew Chen — L7/L30 methodology as alternative to DAU/MAU
6. 'Choosing Your North Star Metric' by a16z — framework for selecting a north star metric

### Recommended Tools for Correlation and Regression Analysis (How to do linear regression and correlation analysis)
Curated list of tools for running correlation and linear regression analysis, from product analytics platforms to statistical calculators

How it works: Product Analytics Tools (correlation + predictions, no full regression):
1. Amplitude — Compass feature (Analysis section → Compass chart)
2. Mixpanel — Signal report (Mixpanel Apps → Signal)

Spreadsheet Tools (correlation + regression):
3. Google Sheets — =CORREL() for correlation, =LINEST() for regression. Template: https://docs.google.com/spreadsheets/d/1T4LAcBx9HHhDydMW0NPr1jOaEzx5GtZ9CTrcjeTrFZ8/edit#gid=1443729456
4. Excel — Requires Analysis ToolPak add-in. Data → Data Analysis → Regression

Free Online Calculators:
5. DATAtab — https://datatab.net/statistics-calculator/regression
6. Statistics Kingdom — https://www.statskingdom.com/linear-regression-calculator.html
7. Social Science Statistics — https://www.socscistatistics.com/tests/regression/default.aspx

Statistical Application:
8. Wizard (Mac) — https://www.wizardmac.com/ — Recommended for exploring outliers, building scatterplots, finding correlation scores, and handling different types of regressions and distributions

### SaaS Metrics Dashboard Tool Recommendations (The most important bottom-up SaaS metrics to track (and how to best visualize them), The most important bottom-up SaaS metrics to track)
Crowdsourced survey results of the most popular tools SaaS founders actually use to track and visualize metrics

How it works: Ranked by popularity among SaaS founders:
1. Google Sheets — by far the most popular; real examples shared by @craigzingerline, @garrett_wj, @lwcassid, @rylandking, @JorecelleDGR
2. Profitwell — purpose-built SaaS metrics tool
3. Google Data Studio — typically sits on top of Google Sheets for visualization
4. Other options mentioned: Mixpanel, Looker, Tableau, Anaplan, Causal, Slack

Key finding: Most early-stage founders use simple tools (especially Google Sheets) rather than expensive analytics platforms.

