# Retention and Engagement Mastery - Frameworks, Templates & Checklists

*103 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 5-Step Retention Measurement Framework (How to measure cohort retention)
A sequential framework for setting up accurate cohort retention measurement from scratch

How it works: Step 1: Define 'active' — Choose the right activity event for your product (visit, session start, login/app open, page views, or main user action). Recommendation: use main user action.
Step 2: Differentiate users from customers — Segment into free vs. paid users. Different retention logic for each.
Step 3: Pick your retention type — X-day (bounded) or unbounded (rolling) retention.
Step 4: Report retention from BI tools or SQL — Choose tool-based or query-based approach.
Step 5: Visualize retention — Use cohort tables with color coding as best practice.

### 7 Strategies to Increase Product Retention (How to increase your product's retention)
A ranked framework of seven strategies to improve retention, each with specific sub-tactics, ordered by expected impact

How it works: Ranked roughly by expected impact:

1. 🛠 Improve your product — deliver more value for users
   1.1 Solve your customer's problem significantly better (10x better)
   1.2 Solve more problems (e.g. Uber multi-service, Instacart adding Walmart, Instagram Stories)
   1.3 Make your product cheaper
   1.4 Make it faster and more reliable
   1.5 Wait for network effects to kick in
   1.6 Wait for the world to change
   1.7 Pivot to solving a different problem

2. 👋 Improve your onboarding — connect more users to existing value
   2.1 Manually onboard new users (e.g. Superhuman 1:1, Airtable)
   2.2 Make sure new users experience your value (get to core product fast but not faster — Pinterest principle)
   2.3 Increase the odds new users have a great time (smart defaults, pre-populated fields — Scott Belsky)
   2.4 Get more users through the flow (reduce friction, reduce distractions, increase motivation)

3. ⛓ Make it stickier — make the value hard to give up
   3.1 Build habits
   3.2 Create incentives to come back (Amazon Prime, loyalty programs)
   3.3 Sign annual plans
   3.4 Deeper integration (Slack, AWS, WhatsApp)

4. ✋ Catch users before they leave — give them an excuse to stay
   4.1 Let users 'pause' or 'snooze' instead of cancel (Airbnb host pause, Hulu)
   4.2 Give users an incentive to stay (discount/leeway)
   4.3 Ask users why they're leaving and offer a solution (in-line)
   4.4 Remind users of the value they'll lose (Facebook deactivation page)
   4.5 Predict churn and try to avoid it

5. ☝️ Remind users of your value — deliver value more often
   - Email/SMS, in-product notifications, occasional calls

6. 💫 Bring back users after they've gone — remind them what they're missing
   - Ad retargeting, calls, email/SMS

7. 😬 Change your users — target a more suitable audience
   - Cut back on paid/low-intent traffic
   - Zero in on users who do retain and find more like them
   - Reference: Superhuman's PMF engine

### Accruing Benefits and Mounting Loss (Sarah Tavel)
A retention framework where the product gets better the more you use it (accruing benefits) AND you accumulate more that you'd lose by leaving (mounting loss), creating a dual lock-in effect

How it works: Accruing benefits: Pinterest home feed gets more personalized with each pin, Evernote search becomes more valuable with more documents. Mounting loss: Pinterest boards contain your saved recipes/inspiration/planning, Evernote has thousands of irreplaceable documents. Key insight: The core action should be the mechanism that drives both.

### Bandit Algorithm for Notification Optimization (The secret to Duolingo’s exponential growth)
Duolingo's approach to automatically scoring notification variants for effectiveness

How it works: Duolingo uses a bandit algorithm that automatically scores various notifications to see how effective they are at bringing people back to do a lesson shortly after receiving the notification.

This was one of their most successful notification iterations and represents cutting-edge innovation (where they innovate rather than copy).

References:
- Blog post: https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/
- Academic paper: https://research.duolingo.com/papers/yancey.kdd20.pdf

### Building State (Julian Shapiro)
A framework for creating product stickiness and retention by having users accrue non-transferable value.

How it works: Three main types of state: 1) Non-transferable reputation (e.g., eBay seller ratings, Yelp reviews), 2) Non-transferable audience (e.g., YouTube subscribers), 3) Social graphs (e.g., Facebook/LinkedIn connections).

### Casey Winters' Retention Importance Framework (What is good retention?)
A mental model for why retention is the most important growth metric, articulated as a 'triple word score' for growth.

How it works: Retention is the 'triple word score' of growth because it simultaneously serves three critical functions:
1. It is THE scalable way to grow a product
2. It is the best indicator of product-market fit
3. It is the most important factor in a user's lifetime value
4. High retention drives all of the best acquisition strategies

Companion resource: Casey's essay at caseyaccidental.com/what-is-good-retention covers three ways to approach increasing retention.

### Churn Decomposition Framework (What is good monthly churn)
A 2x2 framework for breaking churn into component parts to diagnose root causes

How it works: Two dimensions to model churn: Dimension 1 - Intent: (a) Intentional churn: user willingly decides to stop using the product. (b) Involuntary churn: user loses access unintentionally — credit card declined, forgot password, connection errors. Good data instrumentation can flag these events and recover meaningful percentage points. Dimension 2 - Payment status: (a) Hard churn: user stops using AND stops paying. (b) Soft churn: user stops using but is still paying (monthly or annual recurring). This is a concern because value extraction exceeds value generation.

### Cohort Retention Analysis (How to increase your retention)
A method for measuring retention by tracking what percentage of new users from each cohort are still active X periods later, rather than using a blended churn rate

How it works: Key question: What percentage of new users are still active X months/weeks/days later?

Two chart types:
1. Cohort table: Rows = cohorts by sign-up date, columns = periods since sign-up, cells = % still active
2. Line chart: Each line represents a cohort, x-axis = time since sign-up, y-axis = % active

Three things to read from a cohort table:
1. Whether retention is increasing or decreasing over time — skim down any column and see if numbers trend up or down
2. Whether something went very wrong or very right for a specific cohort — look for outlier rows worth investigating
3. Whether your retention rate flattens — if it stops decreasing, a group of users continues to find value; this is the best measure of product-market fit

Example: Only 14% of users who joined the week of May 5th were still active ten weeks later = not good.

### Cohort Retention Analysis Method (How to increase your product's retention)
A method for measuring retention by tracking what percentage of new users remain active X periods later, using cohort tables and line charts

How it works: How to measure retention properly:

1. Don't just measure: '% of active users that churn each month' (blends old and new users)
2. Instead measure COHORT RETENTION: 'What percentage of new users are still active X months/weeks/days later?'

How to build the analysis:
- Create a cohort retention table: rows = cohorts by signup week/month, columns = time periods (week 1, week 2, etc.), cells = % still active
- Create a line chart: one line per cohort, X-axis = time since signup, Y-axis = % retained

Three things to look for:
1. Whether retention is increasing or decreasing over time — skim down any column, look for trend up or down
2. Whether something went very wrong or very right for a specific cohort — outliers worth investigating
3. Whether the retention curve FLATTENS — if it stops decreasing, a group of users continues finding value (this is the best measure of product-market fit)

Tools with built-in cohort retention: Amplitude, Mixpanel, Google Analytics, Mode
Spreadsheet templates available from Andrew Chen and others.

### Community Canvas (Petra Wille)
A workshop tool to define and structure a community of practice.

How it works: Used to reflect on the purpose of the community, values, definition of success, rituals, rhythm, incentives/sponsoring, and roles.

### Community Health Measurement Framework (Activity, Value, Belonging) (A founder’s guide to community)
Three dimensions for measuring community health with specific metrics and survey questions for each

How it works: Three dimensions:

1. **Activity:** Are your members participating regularly?
   - Primary metric: % of total members who are active every month (MAU)
   - Activity defined as: logging in, posting, commenting, reacting
   - Advanced metric: Stickiness score = DAU/MAU
   - Also track: repeat attendance at events
   - Benchmarks from CMX:
     - CMX Slack (4,200 members): 14% MAU
     - CMX Hub Facebook group (11,800 members): 18% MAU
   - For founding/early communities: aim for at least 50% MAU

2. **Value:** Are members getting the benefits they came for?
   - Net Promoter Score (NPS) tracked over time
   - Survey questions:
     a. What value do you expect to get from the community?
     b. On a scale of 1-10, to what extent do you feel you're getting that value?

3. **Belonging:** Do members feel connected, safe, and included?
   - Survey questions (rate 1-10):
     a. Do you feel safe in the community?
     b. Do you feel like your voice is heard?
     c. Have you formed relationships with other members?
     d. Do you feel included?
   - Optional: long-form answer for additional context

Survey cadence:
- One large annual community health survey to all members
- Shorter health survey to every member 90 days after joining

### Consumer Retention Benchmarks (6-month cohort retention) (How to kickstart and scale a consumer business—Step 5: RETAIN: Iterate until enough people stick around)
Specific benchmarks for good and great 6-month user retention across three categories of consumer businesses

How it works: Consumer Social (e.g. Snap): ~25% is good, ~45% is great
Consumer Transactional (e.g. Airbnb): ~30% is good, ~50% is great
Consumer Subscription (e.g. Duolingo): ~40% is good, ~70% is great

Exceptions where lower retention may be OK:
1. You have low CAC and marginal costs
2. You're not building a venture-scale business
3. You're just starting out

Key principle from Casey Winters: 'You have product-market fit when your retention creates enough money (or content/virality) to drive sustainable acquisition.'

### Cross-Customer Data as Retention Tool (Sahil Mansuri)
Use your unique position as a vendor with visibility across many customers to create benchmarks and insights that make your product indispensable beyond its core feature set

How it works: Principle: Every vendor has a cross-section view of what their ICP is doing. Extract value from that data. Examples: 1) Bravado: Tell clients what % of similar companies are hiring, how they're adjusting quotas, changing comp plans, hitting quota. 2) Amplitude/Mixpanel: Share benchmarks on what changes other product teams are making. 3) Greenhouse/Lever: Report on hiring trends by company stage—open headcount changes, salary movements, which departments are investing. Execution: Shift product marketing team to research. Assign 1-2 data analysts. Create content exclusive to paying customers. Goal: Move from 'tool in the SaaS stack' to 'value-added advisor.'

### D5/D7 Retention Metric (Josh Miller)
A stringent metric tracking how many users engage with the product at least 5 out of 7 days a week.

How it works: Used instead of DAU or WAU. It captures retention, engagement, and growth in a single number that cannot be easily gamed by accidental opens.

### Duolingo's Early Retention Playbook (How to kickstart and scale a consumer business—Step 5: RETAIN: Iterate until enough people stick around)
The specific features and strategies Duolingo used early on to improve retention and reach PMF

How it works: High-level strategy: Focus product efforts on retention. D1 retention was the simplest metric to reflect progress and quick to see impact.

Features that improved retention early:
1. Daily streak mechanic (very important retention mechanic)
2. Improving lessons to teach better
3. Improving new-user onboarding
4. Emails (web-only at first, so no push notifications)

PMF indicators:
1. New sign-ups growing without marketing (organic word of mouth)
2. Product changes improving retention (team working on right things)
3. New users + retention = sustainable DAU growth

### Flexibility vs. Perfection Balance (Jackson Shuttleworth)
A retention framework for balancing user forgiveness with rewards for flawless execution.

How it works: 1. Give users more flexibility (e.g., 2 streak freezes) early in their journey (days 0-7) to prevent early churn. 2. Once the habit is formed, introduce 'Perfect Streak' visual rewards to encourage flawless daily use without relying on freezes.

### Future's Cohort-Based Retention Iteration Method (How to win in consumer subscription)
A methodology for iterating on retention by onboarding and firing cohorts until anomalously high retention is achieved

How it works: Step 1: Set an insanely high bar for 3-month retention (relative to category benchmarks).
Step 2: Onboard a cohort of members every 3 months.
Step 3: Bill and remind members monthly (don't hide recurring charges; even remind ~1 week before first recurring charge).
Step 4: Measure 3-month retention for the cohort.
Step 5: If retention doesn't meet the insanely high bar, tweak the offering.
Step 6: Fire perfectly happy paying members to keep costs and complexity low (avoid expanding coaching team early, avoid catering to different needs/journeys).
Step 7: Onboard a new cohort with improvements.
Step 8: Repeat until 3-month retention is consistently anomalously high.
Step 9: Only then expand operations and keep members perpetually.

Key insight: Firing paying customers keeps you focused and prevents premature scaling of operations.

### GOOD vs. GREAT Retention Benchmarks by Business Type (What is good retention?)
A comprehensive benchmark framework providing GOOD and GREAT thresholds for both user retention (6-month) and net revenue retention (12-month) across all major business types. Used to evaluate product-market fit and retention health.

How it works: USER RETENTION (6-month):
- Consumer Social (e.g., Snapchat, Twitter, Instagram): ~25% GOOD, ~45% GREAT
- Consumer Transactional (e.g., Airbnb, Lyft, TurboTax): ~30% GOOD, ~50% GREAT
- Consumer SaaS (e.g., Netflix, Spotify, Hulu): ~40% GOOD, ~70% GREAT
- SMB/Mid-Market SaaS (e.g., Asana, Slack, Atlassian): ~60% GOOD, ~80% GREAT
- Enterprise SaaS (e.g., Salesforce, Workday, ADP): ~70% GOOD, ~90% GREAT

NET REVENUE RETENTION (12-month):
- Consumer SaaS: ~55% GOOD, ~80% GREAT
- Bottom-Up SaaS (e.g., Slack, Figma, Zoom): ~100% GOOD, ~120% GREAT
- Land & Expand VSB SaaS (e.g., Gusto): ~80% GOOD, ~100% GREAT
- Land & Expand SMB/Mid-Market SaaS (e.g., Atlassian, Box, Zendesk): ~90% GOOD, ~110% GREAT
- Enterprise SaaS (e.g., Salesforce, Workday): ~110% GOOD, ~130% GREAT

### Golden Goose Notification Strategy (The secret to Duolingo’s exponential growth)
A comprehensive framework for managing notifications that drive growth without burning out the channel

How it works: Core metaphor: Notifications are the goose that lays golden eggs. Individual notification improvements are golden eggs. The notification channel itself is the goose. Don't kill the goose.

Cautionary tale: Groupon sent more and more emails because every experiment showed positive metrics. Eventually the channel rotted—users unsubscribed, emails went to spam, delivery rates dropped, people stopped reading.

6 Practices to protect the goose:
1. Set a very high bar for ADDITIONAL notifications. Kill notifications that are wins but aren't efficient enough.
2. Monitor leading indicators: notification disable rate and efficiency (messages sent per DAU gained). Block launches if unsubscribe rate exceeds control or efficiency is low.
3. Use notification channels on Android for any new notification type (lets users disable specific types without losing all notifications).
4. Create in-app settings to disable each notification type (don't rely on OS-level controls alone).
5. Make engineering lift trivial for adding new notification channels and settings.
6. Aim for a general frequency cap across all notifications.

Efficiency benchmarks:
- Great: 1 DAU per ~3.6 notifications (Streak Saver notification)
- Good: 1 DAU per ~30 notifications
- Bad/removed: 1 DAU per ~130 notifications (XP Happy Hour notification)

### Habit Loop for Retention (Tim Holley)
Framework for driving marketplace retention by closing the loop between user intent signals, triggers, and rewards

How it works: Steps: 1) Capture intent signal (e.g., favoriting an item); 2) Monitor for trigger events (item goes on sale, item selling out/low stock); 3) Deliver notification/trigger (push notification, updates feed entry); 4) Provide reward (item at lower price, urgency to purchase). Applied to Etsy's 'updates feed' — a feed of activity showing how favorited items have changed.

### Hierarchy of Engagement (Sarah Tavel)
A three-level framework for building enduring consumer products: Level 1 (Core Action) - identify and optimize for the single action that signals true engagement; Level 2 (Retention) - make the product get better with use and increase switching costs through accruing benefits and mounting loss; Level 3 (Self-Perpetuation) - build network effects, growth loops, and re-engagement loops that make the product grow organically

How it works: Level 1: Identify core action (e.g., pinning for Pinterest, friending for Facebook, subscribing for YouTube). Test: Does completing this action mean the user understands the product? Does it predict return visits? Level 2: Product gets better with use + user has more to lose by leaving. The core action should be the input that drives both. Level 3: Convert user kinetic energy into network effects (strongest), growth loops (sharing, SEO, collaborative features), and re-engagement loops (notifications triggered by other users' actions)

### Inverse K-Factor / Network Decay Model (Lessons on building a viral consumer app: The story of Saturn)
A framework explaining how social apps without single-player utility experience nonlinear decay when users begin leaving, with early departures disproportionately worsening overall network value.

How it works: The inverse K-factor describes how the departure of even a small number of users can trigger a cascading collapse of a social network's value.

How it works (illustrated example from Saturn founders):
- Day 0: A new app is super-popular. All of your friends are posting once a day.
- Weekend: 3 friends don't post—not coordinated, just lack of motivation from notification loops and existing content.
- Result: Library of relevant content is significantly reduced. Product becomes significantly less compelling.
- Following days: Another 3 people open the app to check in but don't feel they need to post.
- Net effect: 60% of creators lost in just a few days. For the remaining 4 users, the product is a shell of what it was.

Key insight: The decay in value is NONLINEAR. Early departures disproportionately worsen the overall value of the network.

Why it happens: When the value of an app is almost entirely social, any change in the network has outsized effects on its overall health. When a network starts shrinking, things spiral quickly.

Protection strategy: Build products where users can 'survive in smaller pockets—or, better still, alone.' This means having a legitimate single-player use case that keeps users coming back regardless of network activity.

### L7/L30 Retention (Power User Curve) (The most important bottom-up SaaS metrics to track (and how to best visualize them), The most important bottom-up SaaS metrics to track)
A retention metric that measures user engagement intensity by counting the number of days a user is active per week or month, referenced from a16z's power user curve analysis

How it works: L7: Number of days a user is active per week (out of 7)
L30: Number of days a user is active per month (out of 30)

Plot the distribution of users across activity levels to see your power user curve. A smile-shaped curve (high on both ends) indicates a healthy product with both casual and power users. Reference: https://a16z.com/2018/08/06/power-user-curve-l30-l7/

### Lakes and Rivers Customer Retention Model (Leading your company through a pandemic - Issue 20)
Analogy for managing free-to-paid conversion funnels during a downturn — fill the 'lakes' now, monetize later

How it works: Lakes = your free active subscribers, freemium users. Generally, you send them down the stream to convert into paid users.

Strategy: If you have cash, now is the time to fill the lakes. Remove all friction you can to build these free user bases.

Example: Loom massively expanded what you get in the free plan and cut the cost of the paid plan in half. By removing friction, they build habit with the product now. As things settle down, the stored monetization potential will pay off.

Key insight: Don't try to monetize aggressively during the crisis — invest in building habitual usage that converts later.

### Monthly Churn Benchmarks by Business Type (What is good monthly churn)
A benchmark table for evaluating monthly churn as GOOD or GREAT based on whether you're B2C SaaS, B2B SMB/Mid-Market, or B2B Enterprise

How it works: B2C SaaS: GOOD = 3% to 5% monthly churn, GREAT = less than 2% monthly churn. B2B SMB + Mid-Market (companies <1,000 employees, avg charge <$1K/month): GOOD = 2.5% to 5%, GREAT = less than 1.5%. B2B Enterprise (companies >1,000 employees, avg charge >$5K/month): GOOD = 1% to 2%, GREAT = less than 0.5%.

### Monthly Churn Benchmarks by Price Point (What is good monthly churn)
A more granular benchmark showing acceptable monthly churn rates correlated with average monthly revenue per customer, for both B2B and B2C

How it works: Key takeaways: (1) Higher price points demand lower churn. (2) At $5K+ monthly price points in B2B, acceptable churn is below 0.35%. (3) B2B has much more variance in churn than B2C. (4) For B2C subscription products, target less than 2% monthly churn regardless of price point. (5) In B2C, the difference between top 10% and top 25% performers is small (nearly impossible to get under 1%), whereas in B2B there's a bigger spread between top 25% and top 10%. Specific tiers are shown in a detailed chart in the original post.

### Net Revenue Retention Benchmarks (12-month) (What is good monthly churn)
GOOD and GREAT 12-month net revenue retention benchmarks by business model

How it works: Consumer SaaS: ~55% is GOOD, ~80% is GREAT. Bottom-Up SaaS: ~100% is GOOD, ~120% is GREAT. Land and Expand VSB SaaS: ~80% is GOOD, ~100% is GREAT. Land and Expand SMB/Mid-Market SaaS: ~90% is GOOD, ~110% is GREAT. Enterprise SaaS: ~110% is GOOD, ~130% is GREAT.

### Protect the Channel Rule for Push Notifications (How Duolingo reignited user growth)
A foundational constraint for push notification optimization that prevents channel destruction through over-testing

How it works: Foundational Rule: Protect the channel.

Origin: Groupon's CEO explained to Duolingo's CEO that Groupon stuck to one email per day, then tested sending more. Each additional email increased metrics. They kept pushing to as many as 5 emails/day. Then suddenly, their email channel lost most of its effectiveness. The accumulation of aggressive email tests destroyed their channel.

Key Insight: One often underappreciated risk with aggressively A/B testing emails and push notifications is that it results in users opting out of the channel; and even if you kill the test, those users remain opted out forever. Do this many times, and you've destroyed your channel.

Implementation at Duolingo:
- Team given freedom to optimize: timing, templates, images, copy, localization
- Team could NOT increase the quantity of notifications without strong justification and CEO approval
- Used A/B testing and bandit algorithms for optimization
- Generated dozens of small- and medium-size wins that compounded into substantial DAU gains year after year

### Re-engagement Content Strategy: Three Messages for Bounced Users (Strategy and tactics for increasing conversion)
Three core content strategies for convincing bounced users to return and complete a flow

How it works: Three core re-engagement messages:

1. A REMINDER — 'You tried to do this thing and you didn't finish. Want to finish?'
   - Airbnb examples: Reminding hosts a guest is waiting for a response; reminding visitors a home they viewed is still available; telling new hosts they were only X steps from completing listing

2. SOMETHING HAS CHANGED — 'Since you last tried, conditions have improved. Want to try again?'
   - Airbnb examples: Changes in market conditions (homes getting booked = urgency); changes to prices (this listing is now cheaper)

3. THERE'S MORE INFORMATION — 'Looks like you stopped at this step — did you know it's optional?'
   - Addresses confusion or uncertainty that caused the drop-off

Key insight: Think about what value you can provide users that would give them a good reason to try again.

### Retention Cohort Windows by Business Model (The most important consumer metrics to track)
A mapping of which retention cohort time windows to measure for each consumer business model type

How it works: Subscription—trial-based: Month 1/3/6 (customer retention)
Subscription—freemium: Week 1/2/12 (user retention) + Month 1/3/6 (customer retention)
Ad-based: Week 2/4/8 (user retention)
Marketplaces: Month 1/3/6 (buyer retention) + Month 1/3/6 (supply retention)
DTC: Month 3/6/12 (customer retention)

Pattern: Engagement-heavy products (ad-based) use weekly cohorts. Transaction-based products (marketplaces, subscriptions) use monthly cohorts. DTC uses the longest windows (up to 12 months) since repeat purchase cycles are longer.

### Retention First Principles Mental Model (How to increase your retention)
A first-principles way to think about why users churn and what to do about it

How it works: When someone stops using your product, it means they no longer find enough value in it. Your task is to change that.

Key insights:
- Marc Andreessen: 'People's time is already fully allocated' — this is why most startups fail; they don't create something enough people want badly enough.
- Brian Balfour: 'If you have poor retention, nothing else matters.'
- Andrew Chen: 'The standard advice of listening to long-term customers who are already retained, and adding features for them — that doesn't work. The real levers to improve retention dramatically are in the experience for new users.'
- For early-stage companies, retention is the single most important growth metric to get right.

### Retention Measurement Definitions (What is good retention?)
Precise definitions for user retention and net revenue retention used in the benchmarking framework, including the correct denominator for each business type.

How it works: User Retention: The percentage of users who signed up and are still active (using the product, making a purchase, posting a photo) six months later.
- Consumer Social denominator: registered users
- Consumer Transactional denominator: users who have made at least one transaction
- Consumer SaaS denominator: users who have started a paid subscription
- SMB/Mid-Market SaaS denominator: companies that have started a paid subscription
- Enterprise SaaS denominator: companies that have started a paid subscription

Net Revenue Retention: A company's monthly recurring revenue (MRR) one year ago divided into the current month's MRR from that same group of customers. Measures how much revenue you drive from one cohort of customers over time.

Note: NRR categories differ from user retention categories because customer type impacts revenue retention differently — network effects in bottom-up SaaS drive up retention, involuntary churn of VSBs is common because many go out of business, and land-and-expand models increase revenue per user.

### SaaS Quick Ratio (The most important bottom-up SaaS metrics to track (and how to best visualize them))
A formula for measuring the efficiency of SaaS revenue growth by comparing revenue gains to revenue losses

How it works: Quick Ratio = (New MRR + Expansion MRR) / (Contraction MRR + Churned MRR)

A higher ratio indicates healthier growth. Listed as an additional monetization metric to track beyond the core post-revenue metrics.

### Seven Strategies to Increase Retention (Ranked by Impact) (How to increase your retention)
A comprehensive, ranked framework of seven strategies for improving product retention, from most to least expected impact

How it works: 1. 🛠 Improve your product — deliver more value for users
2. 👋 Improve your onboarding — connect more users to existing value
3. ⛓ Make it stickier — make the value hard to give up
4. ✋ Catch users before they leave — give them an excuse to stay
5. ☝️ Remind users of your value — deliver value more often
6. 💫 Bring back users after they've gone — remind them what they're missing
7. 😬 Change your users — target a more suitable audience

### The 23.5-Hour Notification Rule (Jackson Shuttleworth)
A heuristic for timing daily push notifications based on revealed user behavior.

How it works: Instead of asking users to set a reminder time, track their exact usage time from the previous day and send a push notification exactly 23.5 hours later (e.g., if they practiced at 12:00 PM today, remind them at 11:30 AM tomorrow).

### Three Things a Cohort Retention Chart Tells You (How to increase your product's retention)
Three diagnostic insights you can quickly extract from a single cohort retention table

How it works: From one cohort retention chart, you can quickly tell:

1. WHETHER RETENTION IS INCREASING OR DECREASING OVER TIME: Skim down any column and see if numbers trend up or down across cohorts.

2. WHETHER SOMETHING WENT VERY WRONG OR VERY RIGHT FOR A COHORT: Look for outlier rows — a cohort with unusually high or low retention is worth investigating (and potentially repeating if positive).

3. WHETHER YOUR RETENTION RATE FLATTENS: If the retention curve stops decreasing over time, there is a group of users who continue to find value. A flattening curve is the best measure of product-market fit. If it doesn't flatten, you likely don't have PMF.

### Three-Pillar Gamification Model (Albert Cheng)
A structure for building habit-forming products using three distinct gamification layers.

How it works: 1. Core Loop: The daily action (e.g., lesson, streak extension, push notification). 2. Metagame: Long-term goals (e.g., learning path, leaderboards, achievements). 3. Profile: A reflection of the user's investment and identity inside the product over time.

### X-Day vs. Unbounded Retention Decision Guide (How to measure cohort retention)
Decision criteria for choosing between bounded (X-day) and unbounded (rolling) retention

How it works: X-day (N-day/bounded) retention: Percentage of users who come back on a SPECIFIC day. More conservative, returns lower retention percentage.
- Use when: Users use product regularly (daily food logging, exercise, podcast); KPIs are coded to specific time ranges (30-day trial, 28-day active, 7-day resubscriber); Short-term analysis like onboarding funnel or marketing campaigns; SaaS products tied to subscription/trial lengths.

Unbounded (rolling) retention: Percentage of users who come back on a specific day OR LATER. Returns higher retention percentage.
- Use when: Users don't engage on a predictable daily/weekly/monthly basis; Engagement pattern is chaotic; You want retention to be inverse of churn for data validation; Measuring long-term user behavior; Segmenting users into retention groups (6M, 9M, 1Y, 2Y); Consumer social or transactional businesses.

Rule of thumb: SaaS → X-day retention. B2C/consumer/social → unbounded retention.

### Zynga/MyFitnessPal Retention Metrics (CURR, NURR, RURR, SURR) (How Duolingo reignited user growth)
A set of retention rate metrics originally developed at Zynga and expanded at MyFitnessPal for segmenting and measuring user engagement

How it works: Original Zynga weekly retention metrics:
- CURR (Current Users Retention Rate): The chance a user comes back this week if they came to the product each of the past two weeks
- NURR (New Users Retention Rate): The chance a user comes back this week if they were new to the product last week
- RURR (Reactivated User Retention Rate): The chance a user comes back this week if they reactivated last week

MyFitnessPal addition:
- SURR (Resurrected User Retention Rate): The chance a user comes back this week if they resurrected (from a longer absence) last week

Duolingo adaptation:
- Converted from weekly to daily view
- Added several more metrics including iWAURR (inactive WAU reactivation rate)
- Used as arrows in the MECE bucket model for sensitivity analysis

## Templates

### A Founder's Guide to Community Worksheet (A founder’s guide to community)
A comprehensive Google Doc worksheet companion to the guide with exercises for member research, SPACES scoring, 7Ps design, and community health measurement

How it works: Three-part worksheet:
- Part 1: Member research questions and interview tracking
- Part 2: SPACES objective scoring exercise (rate Business Impact, Measurability, Member Motivation for each of 6 objectives)
- Part 3: 7Ps of community design template (People, Purpose, Place, Participation, Policy, Promotion, Performance)

Link: https://docs.google.com/document/d/1dBID0wCPTQSptUoUkYk4VIEBUsTP0NJemoTPGO7ZmSo/edit

### CMX Monthly Community Report Structure (A founder’s guide to community)
Table of contents structure for a monthly community report to update stakeholders on community progress

How it works: Monthly report covering three levels:
1. Business-level metrics (leads sourced, deals influenced by community)
2. Community-level health metrics (MAU, NPS, belonging scores)
3. Tactical updates (events hosted, onboarding improvements, content posted, engagement experiments)

Sent monthly to the rest of the team. Quarterly reviews set new OKRs.

### Cohorted Retention SQL Query Template (How to measure cohort retention)
Sample SQL for calculating daily cohorted retention with signup cohorts

How it works: WITH new_user_activity AS (
  SELECT a.*
  FROM activity a
  JOIN signups s
    ON s.user_id = a.user_id
    AND s.signup_date = a.activity_date
)
, active_user_count AS (
  SELECT
    activity_date,
    COUNT(DISTINCT user_id) AS users_count
  FROM new_user_activity
  GROUP BY activity_date
)
-- for daily retention:
SELECT
  n.signup_date AS signup_date,
  DATEDIFF('DAY', n.signup_date, a.activity_date) AS period,
  MAX(c.users_count) AS new_users,
  COUNT(DISTINCT a.user_id) AS retained_users,
  COUNT(DISTINCT a.user_id) / MAX(c.users_count)::float AS retention
FROM new_user_activity n
LEFT JOIN activity a
  ON n.user_id = a.user_id
  AND n.signup_date < a.activity_date
  AND (n.signup_date + interval '30 days') >= a.activity_date
LEFT JOIN active_user_count c
  ON n.signup_date = c.activity_date
GROUP BY 1, 2

Output columns: signup_date, period (days since signup), new_users (cohort size), retained_users (count returned), retention (percentage).

### Cohorted Retention Table Structure (How to measure cohort retention)
The expected output table format for cohorted retention data

How it works: Columns: signup_date (cohort identifier), period (0, 1, 2, 3... representing days/weeks/months since signup), new_users (total users in that cohort), retained_users (count of users active in that period), retention (retained_users / new_users as percentage).

Example rows:
signup_date | period | new_users | retained_users | retention
2022-01-01  | 0      | 1000      | 1000           | 100%
2022-01-01  | 1      | 1000      | 450            | 45%
2022-01-01  | 2      | 1000      | 320            | 32%
...
2022-01-08  | 0      | 1200      | 1200           | 100%
2022-01-08  | 1      | 1200      | 500            | 41.7%

### Retention Benchmark Visual Guide (PDF) (What is good retention?)
A high-resolution visual summary of all GOOD and GREAT retention benchmarks across business types, available as a downloadable PDF.

How it works: A single-page visual reference card containing all GOOD and GREAT benchmarks for user retention (5 categories) and net revenue retention (5 categories), with the specific threshold percentages for each. Referenced in the newsletter as a 'handy visual guide' linking to a high-res PDF.

### Retention Summary Table for KPI Dashboard (How to measure cohort retention)
Simple summary format for retention stats on a KPI dashboard

How it works: A summary table format showing retention at key milestones. Example structure:
Metric | Value
Day 1 Retention | X%
Day 7 Retention | X%
Day 14 Retention | X%
Day 30 Retention | X%

Best practice: Include on KPI dashboards alongside DAU, WAU, MAU metrics. Should be segmented by user type (free vs. paid) and key cohorts.

### Simple Retention SQL Query Template (How to measure cohort retention)
Minimal SQL for basic retention by snapshot date and period

How it works: SELECT
    snapshot_date,
    start_date,
    n_period,
    COUNT(user_id) AS n_users
FROM subscriptions
GROUP BY snapshot_date, start_date, n_month

Output: snapshot_date, start_date, n_period, n_users

### Subscription Change Announcement Email Template (Taking the week off + a newsletter cadence update)
A template for communicating a reduction in content frequency to paying subscribers without triggering churn, modeled on Lenny's actual announcement.

How it works: Structure:
1. Personal/warm opening — Share something human (vacation, family, recharging)
2. Announce the change clearly:
   - 'What's changing?' — State the old cadence → new cadence in specific terms
3. Explain the rationale honestly:
   - 'Why the change?' — Lead with audience feedback ('the most common feedback I get is...')
   - Acknowledge your own needs ('it's hard to sustain this pace forever')
   - Reframe as a quality upgrade ('deeper, higher-value content')
4. Reinforce the total value bundle:
   - List everything subscribers currently get beyond the posts themselves (community, archives, tools, partnerships, perks)
   - Signal that more value is coming ('and more coming soon')
5. Invite dialogue:
   - 'If you have any questions, just reply to this email'
6. Close with gratitude:
   - 'Thanks as always for your support'

## Checklists

### ARIA Framework Checklist (How to accelerate growth by focusing on the features you already have)
A handy checklist summarizing all the steps in the ARIA framework for increasing feature engagement

How it works: ANALYZE:
☐ Identify key features correlated with growth (acquisition, monetization, retention, expansion)
☐ Calculate usage metrics: awareness rate, trial rate, adoption rate, power user rate
☐ Calculate completion rates for multi-step features
☐ Calculate success rates where applicable
☐ Segment metrics by user tenure (0-30 days, 31-90 days, 91+ days)
☐ Identify features with high growth correlation but low usage metrics

REDUCE:
☐ Count all steps (clicks, taps, types) and remove unnecessary ones
☐ Have users edit rather than create from scratch
☐ Use smart defaults to prefill values
☐ Replace typing with click/tap selections where possible
☐ Watch new users try features to identify cognitive load issues
☐ Use templates to make unfamiliar concepts tangible

INTRODUCE:
☐ Introduce features in context (at the moment of need), not just in onboarding
☐ Describe the benefits of each feature explicitly
☐ Highlight different use cases for each feature

ASSIST:
☐ Design empty states with guidance, benefits, CTAs, and resources
☐ Provide templates to help users accomplish goals
☐ Create error messages that explain the cause and how to fix it

REPEAT:
☐ Revisit the process regularly — this is ongoing, not one-and-done

### Cancellation Flow Optimization (Patrick Campbell)
A two-question sequence to present to users when they click 'cancel' to reduce churn and gather data.

How it works: Step 1: Ask 'Why are you leaving?' using multiple choice (not free response). Step 2: Ask 'What did you like about the product?' to trigger nostalgia. Step 3: Offer a salvage offer, pause plan, or maintenance plan based on their answers.

### Community Member Leadership Roles (A founder’s guide to community)
Eight types of leadership roles community members can take on to scale value creation

How it works: 1. **Moderators:** Keep content clean and organized in the community
2. **Facilitators:** Start conversations in the community and host discussions
3. **Event organizers:** Start local chapters and self-organize local or virtual events
4. **Ambassadors:** Advocate on behalf of the brand
5. **Content contributors:** Write articles, create videos, or develop other forms of content
6. **Committee members:** Join a customer advisory board to guide product direction
7. **Power users:** Achieve status by being the most active members of a platform
8. **Mentors:** Dedicate time to supporting other customers one on one or in small groups

### Community Professional Operational Tasks (A founder’s guide to community)
Seven key operational tasks that a community professional might own beyond direct engagement

How it works: 1. Managing analytics dashboards and reporting
2. Creating processes for common community programs like running an event or recruiting new leaders
3. Optimizing the community journey and new-member onboarding
4. Internal communications
5. Quarterly planning
6. Creating automations to reduce repetitive tasks
7. Vetting and implementing new technology into the community stack

### Community-Led Events Program Launch Playbook (A founder’s guide to community)
Step-by-step process for building a scalable community-led events program powered by volunteer hosts

How it works: Steps:
1. **Host events yourself first.** Find community-market fit by testing formats and content. Events are working when:
   - Attendance is growing
   - People return to multiple events
   - Attendees rate events highly in post-event surveys

2. **Create a host playbook** covering:
   - Community mission and values
   - How to launch a chapter
   - How to promote an event
   - How to find a venue
   - Where to find design assets and resources
   - How to select speakers
   - The community code of conduct
   - Anything else hosts need to succeed

3. **Start small with 3-5 hosts:**
   - Identify people who've already expressed interest in hosting
   - Give them permission to start organizing
   - Run this pilot for ~3 months

4. **Create an application form** for volunteers to apply to host, building a pipeline for scaling.

5. **Review applications and interview** everyone to ensure right fit:
   - Genuinely care about helping others
   - Aligned on values
   - Understand expectations

6. **Set expectations:** At least one event per quarter (monthly is ideal but don't over-ask volunteers).

7. **Reward hosts with:** swag, perks, exclusive event invitations, speaker training, event budgets, or compensation.

8. **Scale once model is proven.** Examples: Google has 1,000+ Developer Groups; Finimize runs 200+ events/year with 3 community staff; Duolingo runs 2,600 events/month with 3 people.

### Copilot's Habit Loop and Stickiness Metrics (How to win in consumer subscription)
Metrics and feature strategies for building daily habits in a consumer subscription app

How it works: Key metrics to measure: DAU/WAU and DAU/MAU (indicators of daily habit formation).

Process: Iterate quickly on feature set very early to find hooks that bring people back organically.

Example hook: 'Inbox zero' experience for reviewing recent purchases — creates a habit that brings users back multiple times a week.

Churn analysis: Understand what makes users churn, but recognize not all churn is equal. Some users aren't a good fit. Focus on making product stickier for best users. Measure by cohorts.

### Core Action Identification Process (Sarah Tavel)
A two-pronged approach to identifying the core action for a consumer product, combining data analysis with product intuition

How it works: Bottoms-up: List every action users can take. For each action, measure (a) what percentage of users complete it and (b) if they complete it in a week, what's their probability of returning the next week. Rank by retention correlation. Top-down: Ask 'What is this product for? If a user never does X, do they really understand the product?' Converge both analyses on one core action. Additional criteria: Must scale to enough users. Ask 'If I optimize my product roadmap for this action, what do we end up building?' (sanity check).

### Customer Retention Tactics During a Downturn (Leading your company through a pandemic - Issue 20)
Specific tactics to reduce churn and maintain customer relationships during an economic crisis

How it works: From Russell Glass (CEO of Ginger):
1. Look for partnerships where you can help the customer with what they're trying to do — can you help them drive revenue in a new way? If so, they'll stick with you.
2. Offer short-term contracts (e.g. 30-day outs) with no obligation — people can't plan, so don't try to make them.

From Patrick Campbell (CEO of ProfitWell):
1. Offer customers free extra months instead of a lower percentage cost
2. The game right now is cash flow, so get deals moving
3. Stay on top of payment failures — engage lapsing customers personally

### De-activation Flow Checklist (How to increase your product's retention)
Five tactics to implement in your cancellation/de-activation flow to catch users before they leave

How it works: When a user tries to cancel or deactivate:

1. Offer pause/snooze: Let users temporarily pause instead of permanently cancel (e.g. Airbnb host pause, Hulu pause subscription)

2. Offer an incentive to stay: If a short-term cash crunch is the issue, offer a discount, free month, or payment flexibility

3. Ask why and offer a solution: Present reasons for leaving and try to address the issue inline before they complete cancellation

4. Remind of value they'll lose: Show what they'll miss — but be thoughtful, don't go too far (e.g. Facebook showing friends who will miss you)

5. Predict churn proactively: Find strong indicators of dissatisfaction and intervene before users reach the cancellation page (holy grail — hard to do in practice)

### Growth Vectors Exploration Checklist (How Duolingo reignited user growth)
The portfolio of growth vectors Duolingo pursued beyond their primary CURR focus

How it works: Retention Vectors:
- Leaderboards with league progression
- Push notification optimization (timing, templates, images, copy, localization)
- Streak feature optimization (streak-saver notifications, calendar views, animations, streak freezes, streak rewards)

Acquisition Vectors:
- International expansion
- Social features
- Accelerated course content creation
- Influencer partnerships
- Presence in schools
- Paid user acquisition (small investment)
- TikTok virality
- Referral programs (underperformed at 3% lift)

Organizational Approach:
- Started with one Retention Team focused on CURR
- Maintained healthy paranoia that CURR would hit a ceiling
- Consistently increased investment by creating more Product and Marketing teams
- Each team focused on finding new vectors for both retention and acquisition

### Re-engagement Channels for Bounced Users (Strategy and tactics for increasing conversion)
Three channels for reaching users who dropped off your conversion funnel

How it works: Three re-engagement channels:

1. EMAILS / PUSH NOTIFICATIONS — Simple, effective, but easy to abuse. Was extremely effective at Airbnb both early-on and at scale.
2. RETARGETING — Paid ads that target site visitors who didn't convert. Was extremely effective at Airbnb both early-on and at scale.
3. CALLS — Calling prospects that have dropped off. Used at Airbnb but less than email and retargeting.

Note: At Airbnb, email and retargeting were the primary channels and both were extremely effective.

### Recommended Reading on Retention (How to increase your product's retention)
Curated list of seven essential resources on retention, onboarding, and product-market fit

How it works: 1. 'Do You Have Product-Market Fit? It's All About Retention' — Casey Winters (YouTube)
2. 'Why Retention Is The Silent Killer' — Brian Balfour (Reforge blog)
3. 'What Is Good Retention: An Exhaustive Benchmark Study with Lenny Rachitsky' — Casey Winters
4. 'Retention is King' — Jamie Quint (Andrew Chen's blog)
5. 'Crafting The First Mile Of Product' — Scott Belsky (Medium)
6. 'Why Onboarding is the Most Crucial Part of Your Growth Strategy' — Casey Winters
7. 'From conversion to retention: industry experts on improving your onboarding' — Intercom blog

### Retention Reporting Readiness Checklist (How to measure cohort retention)
Prerequisites and decisions needed before measuring retention accurately

How it works: Before you can measure retention accurately, ensure:
1. ☐ Team has agreed on what 'active' means for your product (which event defines activity)
2. ☐ Users are segmented into free vs. paid (not blended)
3. ☐ Retention type is chosen: X-day (bounded) or unbounded (rolling)
4. ☐ Foundation data tables are built (Sessions, Users, or Activity table with right timestamp, event ID, user ID, properties)
5. ☐ Payment data is accessible if measuring paid user retention (loaded into analytics tools or available in database)
6. ☐ Activity event is available and consistent across all platforms (app, web)
7. ☐ Cohort visualization uses color-coded format
8. ☐ Retention is treated as an output metric (not used as A/B test baseline)
9. ☐ Dashboard is flexible enough to adopt new retention definitions from stakeholders

### Retention Visualization Best Practices (How to measure cohort retention)
Guidelines for creating effective retention visualizations

How it works: 1. Best format: Cohort table (rows = signup cohorts, columns = time periods, cells = retention %)
2. Apply color scale via conditional formatting — without color-coding, cohorts are difficult to read
3. For KPI dashboards: Include a simple summary table with key retention milestones (D1, D7, D14, D30)
4. Line charts work for product analytics tools (Amplitude, Mixpanel defaults) but cohort tables give more insight
5. Group by: (a) time period (daily, monthly, annually) then (b) user segments (trialers, resubscribers, power users)
6. Segment cohorts by: active users, churned users, inactive users, reactivated users
7. In Excel: Use pivot tables — drag initial activity dates into rows, retained period into columns, then apply color scale
8. BI tools (Tableau, Power BI, Mode, Sisense) support cohorted graphs natively

### SQL Retention Calculation Steps (How to measure cohort retention)
Six-step process for building retention queries in SQL

How it works: Step 1: Get users' first (initial) action — usually sign-up or first purchase
Step 2: Get user activity after sign-up or purchase — based on your activity definition
Step 3: Get total time between initial and consecutive user action ('retained_time')
Step 4: Convert total time to days/weeks/months as needed
Step 5: Group users into buckets based on total retained time
Step 6: Map and order user buckets based on their initial action time (sign-up or first purchase)

Note: Depending on underlying data/table structure, these steps can be done via simple SELECT, multiple subqueries, self-joins, window functions, or combination. Always build foundation metrics tables first before writing retention SQL.

### Seven Sub-Strategies to Improve Your Product (How to increase your retention)
A checklist of seven specific ways to improve your core product to increase the value delivered to users

How it works: 1. Solve your customer's problem significantly better — How might you solve your customer's problems 10x better? What would a customer's ideal solution look like? Work backward from that.
2. Solve more problems — Expand the breadth of problems you're solving (e.g., Uber launching many car service types, Instacart adding Walmart, Instagram adding Stories)
3. Make your product cheaper — Increase the ROI of your product
4. Make it faster and more reliable — Make the user experience act (or feel) significantly better
5. Wait for network effects to kick in — In marketplaces and social networks, the product becomes more valuable with more users. Bootstrap your network to get there more quickly.
6. Wait for the world to change — Sometimes external factors create tailwinds
7. Pivot to solving a different problem — If you can't budge retention enough, try a different solution or problem

### Steps to Run Correlation and Linear Regression Analysis (How to do linear regression and correlation analysis)
A step-by-step process for running both correlation and regression analysis, demonstrated with a retention hypothesis

How it works: Hypothesis example: An increase in food logs will improve active user day-30 retention.

Step 1: Correlation Analysis
- Confirm there IS a relationship between the user activity (e.g., food logging) and the metric (e.g., retention)
- Confirm the relationship is strong (closer to 1.0 or -1.0)
- Confirm whether it's a positive or negative correlation
- Tools: Amplitude Compass, Mixpanel Signal, Google Sheets (=CORREL), Excel

Step 2: Compare Multiple Features
- Run the same correlation analysis for other user activities (e.g., water intake, plan activation, exercise logging)
- Compare correlation scores to identify which feature has the strongest relationship with your metric

Step 3: Linear Regression (if correlation is confirmed)
- Use regression to estimate HOW MUCH increasing the activity will impact the metric
- Tools: Google Sheets (=LINEST), Excel Analysis ToolPak, online calculators (DATAtab, Statistics Kingdom, Social Science Statistics)
- Address outliers before finalizing

Step 4: Address Outliers
- View the full distribution of data points
- Rule of thumb: closer outliers to average = less likely to affect regression; further outliers = more leverage to skew trend line
- If overall data variance is high, keep extreme outliers
- Consider using statistical tools like Wizard to help identify and handle outliers

### Tactical Retention Correlation Analysis Steps (How to determine your activation metric)
Step-by-step instructions for correlating activation milestones to retention using analytics tools

How it works: Method 1 (Event-based):
1. Run correlation analysis between key brainstormed events and 4-week retention rate (where retention curve hits a plateau)
2. Check if the frequency of hitting that event (hitting milestone multiple times) changes the retention rate
3. Try different thresholds for number of days by which a user needs to reach that point
4. Find the interesting threshold
5. As a proxy, use Amplitude/Mixpanel yourself to check if there's a better action that gives a higher retention rate

Method 2 (Funnel-based, for streak/daily products):
1. Set up an onboarding funnel in Mixpanel with app installed as step 1
2. Add day-1 streak through day-30 streak as remaining funnel steps
3. Plot percentage drop-off at each step
4. Identify where drop-off starts to flatten — that's your activation point

Method 3 (Step-based, for service products):
1. Map all steps in user journey after marketing site
2. For each step, calculate percentage of users who completed that step AND went on to perform the retention action (e.g., 2+ bookings in following 4 months)
3. Order the steps and look for the point where retention percentage jumps by at least 2-3x
4. That step is your activation milestone

### When Higher Churn is Acceptable (What is good monthly churn)
Three scenarios where your monthly churn being above benchmarks is not necessarily a death sentence

How it works: 1. You're just starting out: Use benchmarks to prioritize retention vs. acquisition. But know that startups rarely increase retention significantly. 2. You have low CAC and marginal costs: If you acquire users cheaply through SEO, word-of-mouth, or virality, you can afford higher churn. Growth is a balancing act between CAC, retention, and unit economics. 3. You're not building a venture-scale business: These benchmarks come from iconic, massively scalable businesses. A flat retention curve with a scalable acquisition strategy is enough to sustain a business, even if upside is limited.

### When Low Retention Is Acceptable (What is good retention?)
Three conditions under which a business can survive and grow with below-benchmark retention rates.

How it works: Low retention may be OK if:
1. You're just starting out — Use benchmarks as a guide to prioritize retention vs. acquisition. But know that startups rarely increase retention significantly.
2. You have low CAC and marginal costs — If you acquire users cheaply (SEO, word of mouth, virality), you can afford to lose more users. Growth is a balancing act between CAC, retention, and unit economics.
3. You're not building a venture-scale business — These benchmarks target iconic, massively scalable businesses. A flat retention curve that drives a scalable acquisition strategy is enough to keep a business alive, though upside will be limited.

Ultimate test: 'What matters is that your retention supports sustained growth.' — Fareed Mosavat

## Examples

### 8-Word Feature Explanation (Jackson Shuttleworth)
A highly concise explanation of a core feature to ensure global comprehension.

How it works: Copy used to explain streaks simply: 'Start a day to extend your streak, but miss a day and it resets.' This clarity alone drove over 10,000 incremental DAUs.

### Acorns Retention Strategy (Hila Qu, Summary: The ultimate guide to adding a PLG motion | Hila Qu (Reforge, GitLab))
A case study on improving retention for a low-frequency product.

How it works: Strategy 1 - Activation for retention: Analyzed features correlated with retention → identified 'recurring investment' as highly correlated → experimented with getting more users to set up recurring investment during onboarding.

Strategy 2 - Higher-frequency use cases: Added features that inherently encouraged more frequent usage: (a) Individual Retirement Account (IRA), (b) Spending account with debit card. These created higher-frequency engagement loops, improving retention.

Result: Scaled Acorns from 1 million to 5 million users.

### Airbnb Host Pause Experiment (How to increase your product's retention)
Real example of a successful retention experiment at Airbnb where giving hosts the option to 'pause' their listing instead of removing it reduced host churn

How it works: Problem: Hosts were removing their listings entirely when they needed a break or had temporary issues.
Solution: Give hosts a way to 'pause' their listing instead of removing it permanently.
Result: One of the more successful experiments Airbnb ran to reduce host churn. It gave hosts time to deal with whatever they needed and then easily come back when ready.
Principle: Let users pause/snooze instead of cancel — reduces permanent churn by keeping the door open for return.

### Amazon email unsubscribe cost model (Ronny Kohavi)
Amazon's email recommendation team modeled the lifetime value cost of user unsubscribes, discovering that more than half of email campaigns were net negative, and innovated campaign-specific unsubscribe options.

How it works: Problem: Team optimized for email-attributed revenue with no countervailing metric, leading to spam. Solution: Data science study valued each unsubscribe at 'a few dollars' of lost lifetime value. Result: >50% of campaigns were net negative. Innovation: Default unsubscribe changed to campaign-specific (e.g., 'unsubscribe from author emails') reducing the countervailing metric cost.

### Annual Plans as Churn Reduction Lever (How to increase your product's retention)
Portfolio company example showing that shifting to annual plans was the most impactful churn reduction tactic

How it works: Quote: 'One portfolio company spent years trying to improve churn. The most important lever was shifting 70% of new cohorts to annual.'
Takeaway: Annual plans create commitment and reduce the monthly decision point to cancel, often outperforming product-level retention improvements.

### Change.org Retention-Driven Growth (How to measure cohort retention)
Real example of how monitoring cohort retention drove 450% growth in a key KPI

How it works: At Change.org, Olga was part of the Petition Starters squad. By monitoring and slicing Day 7 and Day 30 retention of users who started petitions, they grew 'petition starters per day' (their KPI) by 450%. Each new petition generated new signatures, which helped Change.org grow to over 450 million active users. Key retention metrics monitored: D7 and D30 retention of petition starters.

### Duolingo 'These notifications don't seem to be working' Optimization (The secret to Duolingo’s exponential growth)
How Duolingo found the optimal number of re-engagement notifications before stopping

How it works: The famous notification 'These notifications don't seem to be working' is sent 7 days after last session, then practice reminders stop until the user returns.

Method: Tested how many days to send before stopping. More days = more returns, but also more spam risk (reduced long-term notification responsiveness, potential uninstalls, disabled notifications).

Decision method: Charted the point where sending one additional notification was LESS incrementally effective than the previous day. This creates an 'elbow' in the retention chart. The elbow was after day 7, so they cut day 8+ despite short-term DAU losses shown in experiment reports.

### Duolingo Failed Gamification Attempt (Gardenscapes Moves Counter) (How Duolingo reignited user growth)
A cautionary example of borrowing a game mechanic that doesn't translate to a different product context

How it works: What they did: Borrowed the 'moves counter' mechanic from Gardenscapes (match-3 mobile game). Gave users a finite number of chances to answer questions correctly before restarting the lesson.

Why they thought it would work: 3-minute Duolingo lessons felt similar to Gardenscapes levels. Both used progress bars. Gardenscapes was stickier than Duolingo. The moves counter added scarcity and urgency.

Why it failed: In Gardenscapes, each move is a strategic decision (outmaneuvering dynamic obstacles). In Duolingo, you either know the answer or you don't—no strategy involved. The counter was a boring, tacked-on nuisance.

Result: Completely neutral. No change to retention. No increase in DAU. Hardly any user feedback. Team fell into dissension and disbanded.

Lesson: Focused too much on similarities between products and failed to account for underlying differences. Team spent ~2 months building it.

Team composition: Engineering manager, engineer, designer, APM, and Jorge (Head of Product).

### Duolingo Leaderboard Design and Results (The secret to Duolingo’s exponential growth)
Detailed case study of how Duolingo built their leaderboard by copying successful casual game mechanics

How it works: Background: 4th iteration of leaderboards, based on Gardenscapes, Golf Clash, Toon Blast

Design details:
- Opt-out experience (not opt-in)
- New group of 30 users each week
- Promotion/demotion to higher or lower leagues each week
- Leagues automatically tune users to similar difficulty level
- Rewards for top 3 places
- Multiple interesting boundaries in group of 30 where users are always close to gaining or losing something
- Most complicated feature ever added to Duolingo but designed so users could figure it out without pop-up explainers

Results:
- D1 retention: +1%
- D7 retention: +2%
- D14 retention: +3%
- Time spent learning: +17%

Context: At Duolingo, moving a major metric by 1% is considered a really good experiment outcome.

### Duolingo Leaderboard Implementation Results (How Duolingo reignited user growth)
Real results from Duolingo's league-based leaderboard system inspired by FarmVille 2

How it works: Design Decisions:
- Compete with strangers grouped by engagement closeness, NOT friends/family (based on Jorge's Zynga insight that closeness of competitor's engagement > closeness of personal relationships)
- League progression system: Bronze → Silver → Gold (etc.) providing sense of progress and reward
- Users auto-opted in (no friction to start)
- Progress by merely engaging consistently in regular language study (no additional tasks required, unlike FarmVille 2)
- Deliberately simpler than FarmVille 2 to avoid adding complexity to language learning

Results:
- Overall learning time increased by 17%
- Highly engaged learners (1+ hour/day, 5 days/week) tripled (3x)
- Traditional retention metrics (D1, D7, etc.) improved materially with statistical significance
- Became an ongoing optimization vector that teams continue to improve

### Duolingo Streak Optimization Results and Tactics (How Duolingo reignited user growth)
The series of optimizations Duolingo made to their streak feature that drove massive retention improvements

How it works: Key Discovery: If a user reached a 10-day streak, their chances of dropping off were reduced substantially (correlation/selection bias acknowledged but deemed actionable).

Optimization Tactics:
1. Streak-saver notification: Late-night notification alerting users with streaks that they're about to lose their streak (first big win)
2. Calendar views: Visual representation of streak history
3. Animations: Visual celebration of streak milestones
4. Changes to streak freezes: Modifications to the forgiveness mechanic
5. Streak rewards: Incentives tied to streak milestones

Why Streaks Work:
- Increasing motivation over time: the longer the streak, the greater the impetus to keep it going
- Each day a learner comes to Duolingo, they care a bit more about coming back the next day than the day before
- Creates social bragging rights (e.g., '1,435-day streak with no streak freezes!')

Overall Results:
- Share of DAU with 7+ day streak increased almost 3x to more than half of DAU
- Demonstrates that major wins can be squeezed from existing features

### Duolingo Streaks as Anti-JTBD Example (Sriram and Aarthi)
The Duolingo growth story used to illustrate why JTBD wouldn't surface the actual product breakthrough (streaks) that saved the company

How it works: JTBD would say Duolingo's job is 'help teach a new language.' But the actual breakthrough was streaks (fire emojis, daily commitment). They tried dozens of things, found their North Star metric (current user retention rate), tried leaderboards (didn't work), then landed on streaks. No JTBD brainstorming offsite would get you to 'show fire emojis daily.' Real breakthroughs come from product intuition about psychology + systems thinking.

### Duolingo XP Happy Hour Notification Iteration (The secret to Duolingo’s exponential growth)
Example of killing a winning notification and finding an alternative approach that preserved the channel

How it works: Problem: XP Happy Hour notification told users to come get 5 XP in the next hour on Saturday. It was great for DAUs but had low efficiency (1 DAU per ~130 notifications sent).

Solution: Instead of sending an additional notification, they changed the feature so that if you show up on Saturday at ANY point in the day, that begins your XP Happy Hour, and they show a screen letting the user know. Same DAU result, no additional notification needed.

### Duolingo's Passive-Aggressive Push Notifications (Gina Gotthilf)
An example of using a unique, irreverent brand voice to drive engagement and viral word-of-mouth.

How it works: Instead of standard corporate copy, Duolingo used 'This doesn't seem to be working. We'll stop sending them for now' and images of a crying owl (Sad Duo) to guilt/humor users into returning. They leaned into user-generated memes rather than reverting to 'safe' corporate PR.

### Early-Month Churn Attribution (What is good monthly churn)
Expert insight on diagnosing month 1-3 churn as either an activation/onboarding problem or a customer acquisition quality problem

How it works: Month 1-3 churn can often be attributed to failure of activation/onboarding. New user churn in the first month normally ranges from 5% to 50%. This can vary a lot across companies and even within the same company by channel and funnel. For businesses with paid user acquisition, another major factor is acquiring the wrong kind of customer. Recommendation: if you cut paid marketing by half, your churn will likely go down because you're filtering out low-quality acquisitions.

### HoneyBook TuesdaysTogether 7Ps Example (A founder’s guide to community)
A real-world example of the 7Ps framework applied to HoneyBook's Rising Tide community events program

How it works: 1. **People:** Small-business owners who want to share knowledge, learn from peers, and grow together. Organized by local industry leaders. Focused on creatives and entrepreneurs including artists, bloggers, boutique owners, calligraphers, designers, event planners, florists, makeup artists, photographers, stylists, wedding pros, writers, and more.
2. **Purpose:** Getting out from behind your computer and building true relationships with other creative entrepreneurs. Members learn new business tips from colleagues, grow in confidence, and find a network of compassionate professionals in their local area.
3. **Place:** Meetups occur on the second Tuesday of the month at local coffee shops.
4. **Participation:** Varies city to city; leaders have freedom to cultivate gatherings for their local area. Most include discussion on the topic of the month followed by open Q&A. Attendees encouraged to actively participate.
5. **Policy:** Every meetup must be approachable, authentic, and uplifting. Five Rising Tide values: (1) People come first, (2) We go the extra mile, (3) We love what we do, (4) We are fearless, (5) We are family. Leaders agree to community code of conduct.
6. **Promotion:** Local leaders promote events and grow local communities by inviting members to their local Facebook group.
7. **Performance:** A successful meetup receives positive reviews from attendees in a post-event survey.

### Instagram Account Access Churn Fix (Bangaly Kaba)
A case study of using understand work to solve a massive churn issue related to logging out.

How it works: Millions were churning because they logged out to save data and forgot credentials. Fix: Created an omnibox for email/phone/handle, sent SMS to trusted devices after 2 failed attempts, and prompted to save credentials on device before logging out. Resulted in 15-20M extra MAUs/year and birthed the multiple-accounts feature.

### Lenny's Newsletter Value Bundle (Taking the week off + a newsletter cadence update)
The full list of value Lenny provides to paid subscribers beyond the newsletter posts themselves, used to justify a cadence reduction.

How it works: Components of Lenny's paid subscription value:
- A thriving Slack community
- 6+ years of evergreen content archive
- Hand-crafted podcast takeaways
- 15+ free products worth over $10k (via partnerships)
- More perks coming soon
- Weekly podcast episodes (free, but part of ecosystem)

### Monthly Churn Annual Impact Calculator (What is good monthly churn)
Simple mental model showing how monthly churn compounds into annual user loss

How it works: 8% monthly churn = lose ~65% of users annually (almost two-thirds). 4% monthly churn = lose ~39% of users annually (rebuilding about a third of user base year over year). Formula: Annual retention = (1 - monthly churn rate)^12. To grow: monthly new user growth rate must exceed monthly churn rate. Example: losing 2% of users each month means you need to grow by over 2% monthly to see net growth.

### MyFitnessPal Retention Monitoring Practice (How to measure cohort retention)
Example of how a consumer app monitors retention for every product initiative

How it works: At MyFitnessPal, Day 1 and Day 7 retention are closely monitored for every product initiative. Main user actions for a fitness app include: log food, log exercise. This is an example of using short-term retention metrics (D1, D7) as guardrails for product development.

### MyFitnessPal: Food Logging and Retention Analysis (How to do linear regression and correlation analysis)
Real-world example of using correlation and regression to prove food logging drives retention at MyFitnessPal

How it works: Company: MyFitnessPal (leading nutrition and food-tracking app)
Hypothesis: Encouraging users to log more foods soon after signup would improve overall user retention.

Correlation findings:
- Amplitude Compass: 0.564 correlation score between food logging in first 7 days and returning on day 14 (rated 'highly predictive')
- Mixpanel Signal: 0.78 correlation score between food logging and second-week retention
- Mixpanel heatmap showed: action needs to be completed at least 2 times within 3 days of registration for impact
- Compared against other features: water intake logging, plan activation, intermittent fasting, exercise logging — none showed as strong a correlation
- Amplitude Compass bonus finding: logging food once in 7 days was sufficient to detect improvement (didn't need five times)

Other examples from Olga:
- Change.org: Used regression to forecast exact day/time of hitting 200 million users — was within 10 minutes accuracy
- MyFitnessPal: Used regression to estimate how many meals users need to log to become 'sticky' and how many days to use app before upgrading subscription

### Notification Efficiency Benchmarks (The secret to Duolingo’s exponential growth)
Concrete efficiency ratios used at Duolingo to evaluate notification quality

How it works: Metric: DAUs gained per notification sent

- Excellent: 1 DAU per 3.6 notifications (Streak Saver notification - sent the night after using a Streak Freeze)
- Good threshold: 1 DAU per ~30 notifications
- Poor/removed: 1 DAU per ~130 notifications (XP Happy Hour - removed despite being a DAU win)

Used as a leading indicator alongside notification disable/unsubscribe rates to decide whether to launch notification experiments, even if the experiment shows positive DAU results.

### Public Company Net Revenue Retention Comps (What is good retention?)
Real net revenue retention data from major public companies organized by business type.

How it works: Bottom-Up SaaS:
- Twilio: 140%-170%
- Zoom: 140%
- Slack: 135%-155%
- PagerDuty: 139%
- Datadog: 130%
- New Relic: 115%
- Dropbox: ~100%

Land & Expand SMB/Mid-Market SaaS:
- Atlassian: 100%-148%
- Box: 130%
- Zendesk: 123%
- SendGrid: 116%

Enterprise SaaS:
- Alteryx: 135%
- Fastly: 130%
- Okta: 124%
- Anaplan: 124%
- Workday: 100%+
- ServiceNow: 97%

### Public Company User Retention Comps (What is good retention?)
Real user retention data from major public companies organized by business type, used as reference points for benchmarking.

How it works: Consumer Social:
- Facebook: 60%-70% 6-month user retention
- Instagram: 50%-60% 6-month user retention
- Snapchat: 33% 3-month, 30% 24-month
- Twitter: 31% 3-month, 22% 24-month

Consumer Transactional:
- TurboTax: 77% 12-month customer retention
- Lyft: 22% 12-month customer retention

Consumer SaaS:
- Amazon Prime: 93% 12-month
- Dropbox: ~80% 12-month
- Spotify: 72% 6-month
- Netflix: 66% 12-month
- Hulu: 53% 12-month

SMB/Mid-Market SaaS:
- Atlassian: 98% 12-month
- Slack: 90%-95% 12-month
- QuickBooks: 79% 12-month

Enterprise SaaS:
- Workday: 95% 12-month
- Salesforce: 90% 12-month
- ADP: 90%+ 12-month

### Retention Improvement Company Examples (How to increase your retention)
Real company examples referenced for retention strategies

How it works: - Superhuman: Famous for 1:1 manual onboarding of every new user (Rahul Vohra)
- Airtable: Hands-on onboarding approach for new users
- Pinterest: 'Get people to the core product as fast as possible — but not faster' (Casey Winters, former head of growth)
- Uber: Solving more problems by launching many types of car services
- Instacart: Solving more problems by adding Walmart as a store option
- Instagram: Solving more problems by adding Stories
- Airbnb: Example of network effects in marketplaces improving retention
- Snapchat: Example of network effects in social networks improving retention

### Roblox: Avatar Shop success rate optimization (How to accelerate growth by focusing on the features you already have)
Real example of how improving the success rate of an existing feature (Avatar Shop) increased new-user retention

How it works: Context: Ken was an advisor to Roblox in their early days.

Analysis: Making frequent changes to your avatar was strongly correlated with user retention, particularly for new users. But ~20% of visits to the Avatar Shop were 'unsuccessful' — users left without changing their avatar.

Approach: Added the ability to sort clothing and accessories to show newest or best-selling items first, and added simple search capabilities.

Result: Significantly increased success rate of Avatar Shop visits → increased frequency of avatar changes → increased new-user retention by a couple percent.

### Saturn's Growth Metrics and Benchmarks (Lessons on building a viral consumer app: The story of Saturn)
Specific metrics from Saturn's growth journey, useful as benchmarks for consumer social apps

How it works: App Store Performance:
- Reached #4 overall in Apple's App Store
- Reached #2 on Social Networking charts
- Achieved this in August (back-to-school timing)

Retention:
- D30 new-user retention: mid-30s percent
- Benchmark comparison (source: a16z): Snap, TikTok, Twitter, and Facebook all have D30 new-user retention between 28% and 40%

Scale:
- Millions of users
- Nearly 20,000 schools
- Entirely bottom-up through students, without a single school partnership

First School Launch (Weston High School, CT):
- More than half the student body joined in the first 3 hours on launch night

White-Label Phase:
- 17 schools launched as individual white-labeled apps before consolidating into Saturn at school #18

Ambassador Program:
- Scaled to 1,000+ student ambassadors
- Used as default model for first ~1,000 schools

Waitlist (July 2021):
- 100,000+ students from 10,000 schools joined in 90 days

Year-over-Year Growth:
- Schools grew significantly year over year once initially seeded
- Validated hypothesis that seeded schools would eventually become fully saturated

Cap Table (notable investors):
- General Catalyst, Insight, Coatue
- Dick Costolo and Adam Bain's 01 Advisors
- Marc Benioff, Dara Khosrowshahi, Ashton Kutcher, Robert Downey Jr.
- Mike Vernal (Sequoia), Bezos Expeditions, Elad Gil, Dylan Field

### Shopify Ecosystem Churn vs. NRR (What is good monthly churn)
Real-world example showing how net revenue retention can be healthy even with high logo churn

How it works: In the Shopify ecosystem, SaaS players see 'unavoidable churn' due to shorter lifespan of smaller merchants. This is inherent to the Shopify model. However, expansion looks great as merchants grow/graduate to Shopify Plus. Net revenue retention can look very healthy even with low logo retention. This illustrates why revenue retention is much more important than customer retention in SMB/Mid-Market SaaS.

### TikTok Misinformation Friction (Kristen Berman)
An intervention that reduced misinformation sharing by 24% by adding friction.

How it works: Added a label noting unverified information and a confirmation popup ('Are you sure?') when the share button is clicked, introducing cognitive friction to slow down users in a hot state.

## Tools

### Christoph Janz's SaaS Cohort Analysis Excel Template (How to measure cohort retention)
Pre-built Excel template for cohort retention analysis — plug in customer data and get retention calculations automatically

How it works: Downloadable Excel template available at: https://www.dropbox.com/s/cbegrp1ohchgtj5/ChristophJanz_SaaSCohortAnalysisb.xlsx
Usage: Input new customers and their activity dates, and the template automatically calculates cohorted retention. Recommended for quick cohort analysis without building from scratch.
Also referenced at: https://christophjanz.blogspot.com/2013/10/excel-template-for-cohort-analyses-in.html

### Cohort Analysis Tools and Templates (How to increase your product's retention)
Analytics tools with built-in cohort retention and spreadsheet templates for manual analysis

How it works: Analytics tools with built-in cohort retention:
- Amplitude (help.amplitude.com)
- Mixpanel (help.mixpanel.com)
- Google Analytics (support.google.com/analytics)
- Mode (mode.com)

Plug-and-play spreadsheet templates:
- Andrew Chen's churn/MRR/cohort analysis spreadsheet
- Cohort analysis + customer LTV in Excel (blog.usejournal.com)
- Google Sheets cohort template (docs.google.com/spreadsheets)

### Cohort Retention Analysis Tools and Templates (How to kickstart and scale a consumer business—Step 5: RETAIN: Iterate until enough people stick around)
Software tools and spreadsheet templates for measuring cohort-based retention

How it works: Analytics tools:
- Amplitude (retention analysis feature)
- Mixpanel (retention report)
- Google Analytics (cohort analysis)
- Mode (cohort analysis for retention and churn)

Plug-and-play spreadsheet templates:
1. Google Sheets template: https://docs.google.com/spreadsheets/d/1BWhbks4NhDOAoy3GEosD_PBff5eM5OfUYDcdQggw8ao/edit#gid=0
2. Andrew Chen's churn/MRR/cohort spreadsheet: https://andrewchen.co/the-easiest-spreadsheet-for-churn-mrr-and-cohort-analysis-guest-post/
3. Cohort analysis + LTV calculator in Excel: https://blog.usejournal.com/how-to-perform-cohort-analysis-calculate-customer-ltv-in-excel-80bfed785ec4

### Further Reading on Activation and Retention (What is a good activation rate)
Recommended resources for deeper study on activation rates and retention.

How it works: 1. Reforge: Retention and Engagement series (https://www.reforge.com/retention-engagement-series)
2. 'Activation: The Product Metric Everyone Thinks They Need but Can't Seem to Define' by Open View Partners (https://openviewpartners.com/blog/user-activation-the-product-metric/)

### Product Analytics Tools for Retention (How to measure cohort retention)
List of product analytics tools that support retention reporting with key caveats

How it works: Tools that support retention reporting:
- Amplitude (default: N-day retention, guide: https://help.amplitude.com/hc/en-us/articles/230543327)
- Mixpanel (guide: https://help.mixpanel.com/hc/en-us/articles/115004546883)
- Google Analytics (guide: https://support.google.com/analytics/answer/6074676)
- Kissmetrics
- Adobe Analytics

Key caveats:
1. Default to N-day retention — change settings for consumer/social products
2. Client-side SDK integration means payment data (subscriptions, purchases) often NOT available
3. Solution: Load payment data via Segment or data pipeline from Stripe/Apple/PayPal
4. If reporting from multiple sources (e.g., Amplitude + Tableau), expect different numbers due to: rolling dates/N-day type, different activity definitions, data availability gaps

Visualization tools: Tableau, Power BI, Mode, Sisense

### Retention Analytics Tools (How to increase your retention)
Software tools with built-in cohort retention analysis functionality

How it works: Tools with built-in cohort retention charts:
- Amplitude (help.amplitude.com)
- Mixpanel (help.mixpanel.com)
- Google Analytics (support.google.com/analytics)
- Mode (mode.com)

Plug-and-play spreadsheet templates:
- Andrew Chen's churn/MRR/cohort analysis spreadsheet
- UseJournal cohort analysis + LTV calculator in Excel
- Google Sheets cohort analysis template

### a16z Social App Retention Benchmarks (Lessons on building a viral consumer app: The story of Saturn)
Reference source for benchmarking D30 new-user retention against top social apps

How it works: Source: a16z article 'Do you have lightning in a bottle? How to benchmark your social app'
URL referenced in newsletter: https://a16z.com/do-you-have-lightning-in-a-bottle-how-to-benchmark-your-social-app/

Benchmark data:
- Snap D30 new-user retention: between 28% and 40%
- TikTok D30 new-user retention: between 28% and 40%
- Twitter D30 new-user retention: between 28% and 40%
- Facebook D30 new-user retention: between 28% and 40%

(All four platforms fall within the 28-40% range for D30 new-user retention)

Saturn's D30 new-user retention: mid-30s, putting them squarely within the range of the largest social networks.

