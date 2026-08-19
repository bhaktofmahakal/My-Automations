# Pricing Strategy & Optimization - Frameworks, Templates & Checklists

*112 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 5-Question Freemium Evaluation Framework (Lessons from going freemium: a decision that broke our business)
A set of five guiding questions to evaluate whether freemium could work for your SaaS business, based on Bobby Pinero's experience at Equals and Intercom

How it works: Ask yourself these 5 questions before going freemium:

1. Do you have a massive potential user base? Can you viably drive tens of thousands of active users to your product, over and over? The funnel from visit → activated → paid is long, so you need a very large potential user base. Only a small fraction of free users become paid.

2. Do you have a really short time to value? Minimal setup: minutes, not hours. The faster the time to value, the less inertia required to overcome onboarding and the more likely free is to work.

3. Is your product foundational for the end user? Highly technical and longer-time-to-value products like AWS, MongoDB, and Sanity have successful free tiers because they serve users in the earliest stages of problem development, when the end user is just learning about the solution and needs a frictionless way to learn.

4. Do you have a very low incremental cost to serve each customer? Supporting a lot of free users who may never convert to paid can make your business model unviable.

5. Do free users contribute to your growth model? Are there viral loops that free users contribute to or accelerate? Are there network effects? (e.g., Loom and Miro — for every free user who shares a Loom, there's likely at least one other person who might record a Loom in the future.)

If you fall down on multiple of these (especially 2, 3, and 4), freemium likely isn't right for your business.

### AI Feature Role Matrix (2x2 Bundling Framework) (How should you monetize your AI features?)
A 2x2 matrix to determine whether an AI feature should be a leader, filler, bundle enhancer, or add-on based on breadth of usage and willingness to pay

How it works: **Y-axis:** Breadth of audience (widely used by >70% of users vs. caters to specific personas <70%)
**X-axis:** Willingness to pay (nice-to-have vs. need-to-have / critical mass willing to pay)

Four quadrants:
1. **Leader** (top-right): Widely used (>70%) + high willingness to pay → Bundle in existing plan with price increase. This is a core feature that justifies raising the package price.
2. **Filler** (top-left): Widely used (>70%) + low willingness to pay → Bundle in existing plan without price increase. Adds value broadly but customers won't pay extra for it.
3. **Add-on** (bottom-right): Narrow usage (<70%) + high willingness to pay → Offer as a paid add-on. Used by relatively few users but those users love it and will pay.
4. **Bundle Enhancer** (bottom-left): Narrow usage (<70%) + low willingness to pay → Include as a sweetener in bundles but don't expect it to drive revenue.

**Key benchmark:** 70% usage threshold determines bundle vs. add-on.

**How to assess:** Run a beta program for usage data + ask potential customers about willingness to pay.

### AI Price Point Setting Framework (Three Factors) (How should you monetize your AI features?)
Three key factors to consider when setting the per-user price for AI features

How it works: **Factor 1: Consumer Insights**
- Tie price to value created for the customer
- Analyze the core metric AI impacts: productivity gains, time savings, etc.
- The closer price is to value, the easier to charge a premium
- Example: Microsoft Copilot charges $30/user because it increases productivity by up to 70%
- Example: GitHub Copilot charges $19/user because coders complete tasks 55% faster

**Factor 2: Competitor Pricing**
- Review your 5 closest competitors
- Compare what they charge relative to the value they provide vs. your product
- Stay in the same ballpark as close competitors, even if products are unique
- Customers will compare multiple products

**Factor 3: Costs**
- Understand average cost per user (if using per-user pricing)
- Early on with little usage this matters less, but must ensure profitable pricing at scale
- Cost components: compute, bandwidth, data storage and labeling, security and compliance, maintenance and upgrades

**Structure note:** Per-user monthly fee is currently the dominant model across all 44 companies analyzed, even though underlying costs are usage-based. Companies are prioritizing simplicity for adoption.

### Behavioral Pricing Tactics (Madhavan Ramanujam)
Psychological tactics to frame pricing and increase revenue.

How it works: 1. Compromise Effect: People avoid extremes; use a high-priced decoy to make the middle tier look attractive. 2. Pennies a Day: Frame $30/month as $1/day. 3. Razor Blade Model: Cheap upfront platform cost, make money on consumables. 4. Panini Effect: Present products as an incomplete puzzle (e.g., 'you have 2 of 6 products') to trigger the psychological compulsion to complete the set.

### Consumer App Pricing Playbook (How to win in consumer subscription)
Tactical pricing strategies for consumer subscription apps compiled from multiple founders

How it works: Consumer price anchoring: Users accustomed to $10-20/month (anchored to Netflix price). Higher prices can be jarring.

Annual pricing trend: Push annual discounted pricing aggressively. Some apps (e.g., Calm) no longer offer monthly pricing at all to improve revenue retention metrics and reinvest revenues into growth.

Creative pricing: Noom's 'name your own price' for first month gives users a sense of control.

Longer plans: Noom moved from monthly to 4-month plans — one of their biggest wins. Offer add-ons right after signup when motivation is highest.

Upfront payment effect: Even paying $1 upfront increases engagement and retention vs. $0.

Web-based funnels: Much more freedom to price-test by driving users to web-based funnel than within iOS subscription framework (where every pricing change needs approval and display).

App Store tailwind: Google Play now charges 15% for most apps, Apple App Store is 15% for first $1M in revenue, so newer apps can plan for 85%+ gross margins.

### Customer Feedback Noise Filter for Pricing/Access (Lessons from going freemium: a decision that broke our business)
A lens for evaluating user feedback about pricing and access friction — distinguishing real demand signals from noise

How it works: When users complain about friction (wanting free access, wanting to skip setup steps), ask:

1. Does this person feel enough pain that our product solves? If they won't complete a setup step, they likely don't have the problem badly enough to ever become a paying customer.

2. Are they in our target user profile? Users who refuse to connect data sources or provide credit cards are self-selecting out of the paying customer pool.

3. Would serving this request dilute our focus? Free users require support and attention that diverts resources from paying customers.

4. Is the volume of this feedback proportional to its revenue impact? Many vocal complainers will never convert.

Key quote from Bobby: 'I can now confidently read a message like [a complaint about friction] and know that this person doesn't feel enough of the pain Equals solves. Not in any near-term window were they going to be a paying Equals customer.'

Since removing free, Equals gained clear focus on: which users to pay attention to, who to support, who to build for, and who should inform messaging and positioning.

### Day 1 vs. Day 100 Features (Naomi Ionita)
A mental model for deciding which features belong in a free tier versus a paid tier.

How it works: Day 1 features provide immediate value and get users to the 'aha' moment (keep these free). Day 100 features represent advanced functionality or value derived from scale/data (put these behind a paywall).

### Demand Curve Value Capture Model (Pricing your SaaS product)
A visual framework comparing flat fee, good-better-best, and value metric pricing against a demand curve to show revenue capture potential

How it works: Three pricing models mapped to a demand curve:
1. Flat monthly fee: One point on the demand curve → captures the least revenue. Miss all other willingness to pay.
2. Good-better-best tiered pricing: Three points on the demand curve → captures more revenue. Common in retail/physical goods and mass-market software (Netflix, Adobe). Still leaves revenue on the table.
3. Value metric pricing: Essentially infinite price points along the demand curve → maximizes revenue potential. Customer enters at their level and grows. Bakes growth directly into revenue model.

Data: Companies using value metrics grow at 2x the rate with half the churn and 2x the expansion revenue vs. companies charging flat fees or feature-differentiated tiers.

### Direct vs. Indirect AI Monetization Decision Framework (How should you monetize your AI features?)
A framework for deciding whether to monetize AI features directly (charge for them) or indirectly (absorb into existing pricing), based on two key criteria

How it works: Two monetization approaches with five strategies:

**Direct Monetization** (charge for the AI feature):
1. Add-on with distinct price tag (23% of companies)
2. Standalone AI product for separate purchase (18% of companies)
3. Bundle into existing plan WITH price increase or usage-based component

**Indirect Monetization** (no additional charge):
4. Bundle into existing plan WITHOUT price change
5. Offer for free

**Choose Direct when:**
- High variable costs (compute, bandwidth, data storage/labeling, security/compliance, maintenance/upgrades) that can't be absorbed by indirect revenue gains
- Clear customer value — customers recognize and are willing to pay for the AI feature's added value

**Choose Indirect when:**
- AI features significantly boost usage, conversion, or retention of your core product
- Indirect revenue gains outweigh AI feature costs
- You have usage-based pricing where increased usage = more revenue
- The AI feature greatly increases customer conversion or retention
- Sometimes used as interim strategy to gather user feedback before pricing

**Key stat:** 59% of 44 leading tech companies bundle AI into existing packages. Direct is recommended as default.

### Fair / Expensive / Prohibitive Pricing Questions (Todd Jackson)
Three-question willingness-to-pay framework from Madhavan Ramanujam (Simon-Kucher) for testing pricing during customer discovery

How it works: Ask three sequential questions: 1. What is a fair price you would pay for this? (Usually a deal-seeking answer) 2. What would be an expensive price? (This is typically what they'd actually pay if the product is good) 3. What would be a prohibitively expensive price? (This is the ceiling — they simply can't do this). The 'expensive' price is your target price point.

### Feature Gating Audit (How to make an impact in your first 90 days)
A decision framework for whether gated features should be made free or usage-limited

How it works: Audit criteria for gated features:
- Is the feature completely gated behind a paywall?
- Is it driving meaningful monetization?
- Is it heavily used by paying customers?
- Does it help users unlock core value?

Decision: If a feature is gated, NOT driving meaningful monetization, NOT heavily used by paying customers, but DOES help users unlock core value → consider making it free.

Alternative: Put a usage limit in place instead of full gating. This gives users a taste while preserving upsell opportunity.

### Feature-to-Upgrade Correlation Analysis (How to make an impact in your first 90 days)
A simple analysis method to identify which features drive plan upgrades and user expansion

How it works: Method:
1. Identify customers who grew their usage (went on higher plans or added users)
2. Run a correlation analysis to identify which features those customers used
3. Use the results for:
   - Sales conversations (knowing which features to highlight)
   - Pricing plan bundling (deciding which features go in which tier)

### Five AI Monetization Strategies Taxonomy (How should you monetize your AI features?)
A comprehensive taxonomy of five high-level monetization strategies for AI features, organized into direct and indirect categories

How it works: **Direct Monetization (charge for AI):**
1. **Add-on:** AI feature has its own price tag, sold alongside existing product. Examples: Notion AI ($10/user), Microsoft Copilot ($30/user), Airtable AI. Provides cleanest data on adoption and willingness to pay.
2. **Standalone Product:** AI product sold independently of existing subscriptions. Examples: ChatGPT, Gemini, GitHub Copilot. Offers pricing flexibility without legacy constraints. Rare — mostly LLM-based products.
3. **Bundle in Existing Plan with Price Increase:** AI features added to current packages with higher price or usage-based component. Examples: Canva, Box, Grammarly.

**Indirect Monetization (no additional charge for AI):**
4. **Bundle in Existing Plan without Price Increase:** AI features integrated into current subscriptions at no extra cost. Examples: Zoom, Shopify. Sometimes used as interim strategy.
5. **Free/No Additional Cost:** AI feature offered for free to drive adoption, conversion, or retention.

**Key insight:** Add-on is the 'purest' form of direct monetization and provides cleanest data for understanding willingness to pay, which feeds back into roadmap and product development.

### Four B2B Pricing Models (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36, How today's fastest-growing B2B startups turned their early users into paying customers)
The four options for charging B2B users, based on analysis of 25+ fast-growing companies

How it works: Four options for charging B2B users:
1. **Flat monthly fee** — A single monthly charge (e.g., Segment combines this with usage-based)
2. **Per-seat monthly fee** — Charge per user per month (most common; used by Figma, Slack, Atlassian, Canva, Dropbox)
3. **Usage-based fee** — Charge based on consumption/usage (used by Twilio, Plaid; Segment combines with flat fee)
4. **Transaction fee** — Take a percentage of each transaction (used by Stripe, Shopify)

Note: Some companies combine models (e.g., per-seat + flat monthly fee, or usage-based + flat monthly fee). Most companies studied charge a monthly per-seat fee.

### Four Revenue Models for Startups (Choosing a take rate)
A classification of the four core revenue models available to businesses, useful for determining which model fits your product

How it works: 1. Subscription: Charge a recurring monthly/yearly fee (e.g. SaaS, Stitch Fix, Netflix)
2. Advertising: Charge a 3rd party for users viewing/clicking ads (e.g. Buzzfeed, Twitter, TV)
3. One-time purchase: Charge once for a specific product/service (e.g. DTC, annual contracts, IRL commerce)
4. Taking a cut of each transaction: Charge a fee for each transaction you enable (e.g. Airbnb, Substack, Apple)

Note: Models can be combined (e.g. Shopify charges subscription + transaction fee, NY Times has subscriptions + ads). If your product enables money exchange between two parties, you fit into model #4.

### Four Rules of B2B Pricing (Scaling your B2B growth engine)
Four key principles for B2B startup pricing strategy, distilled from 20+ founder interviews

How it works: Four Key B2B Pricing Lessons:

1. **Charge sooner than you think** — Most companies charge too late. Early revenue provides freedom, leverage with VCs, and validates demand. Notion became profitable and cash-flow positive early, leading to <2-3% dilution per funding round. Front charged from day one. Amplitude founder wishes he'd asked for money earlier.

2. **Charge more than you think** — Founders are biased to undervalue their product because they built it from scratch. Whatever you think the price should be, increase it. Gusto undercharged 'like crazy' in the beginning. Sprig's first AE quoted seven-figure deals the founder would never have considered.

3. **Keep it very simple to start** — Don't overthink pricing. Do something that feels like a fair exchange of value. Make it clear it's valid for one year and move on. Your first few deals will be 0.1% of your ultimate revenue. Linear used industry pricing without optimization. Gong advises being 'friends with your first customers.'

4. **Revisit pricing every year or so** — The mistake is not starting simple but failing to iterate. Stytch regrets not revisiting their simple pricing for 1.5 years. Recommendation: revisit pricing every 6 months to ensure it still makes sense.

### Four WTP Methods Comparison (The ultimate guide to willingness-to-pay)
Structured comparison of the four main quantitative willingness-to-pay research methods with pros, cons, and academic backing

How it works: 1. VAN WESTENDORP (1970s)
- Format: 4 open-ended questions (too cheap, bargain, expensive, too expensive)
- Pros: Simple, only 4 questions, continuous format gives individual variation detail
- Cons: Hypothetical bias (people state higher valuations than actual), not incentive-compatible, invented in 1970s, low academic citations (36), only 8 of 60 surveyed companies use it
- Use when: Established product categories with caution; add incentive-compatible questions

2. BECKER-DEGROOT-MARSCHAK (BDM)
- Format: Write max price, random number drawn, if your price > random number you must buy at random price
- Pros: Incentive-compatible, reduces hypothetical bias, validated in field studies (Ghana water filter)
- Cons: Complex mechanism that many participants don't understand
- Use when: You can explain the mechanism clearly

3. MULTIPLE PRICE LIST (MPL / Gabor-Granger)
- Format: Yes/no to a list of prices (price-taking, not price-giving)
- Pros: Simpler incentive-compatible mechanism, widely used by economists, more transparent than BDM
- Cons: May systematically UNDERESTIMATE WTP (Gao et al. 2023 - 10 experiments), anchoring on presented numbers, interval selection is tricky
- Use when: Want simplicity with incentive compatibility, but be aware of potential underpricing

4. DISCRETE CHOICE (Choice-Based Conjoint)
- Format: Present multiple product bundles with different features/prices, ask which they'd buy, repeat 5-7 times with variations
- Pros: Leverages relativity (how we actually make decisions), works for unfamiliar products, endorsed by John List
- Cons: Requires strategic choices on product bundles, needs statistical package for analysis, can be time-consuming to set up
- Use when: Novel products, high-ticket items, products with significant competition
- Tools: Qualtrics, SurveyMonkey, Conjointly

### Free-to-Paid Newsletter Transition Playbook (This newsletter is growing up 🌱)
The structure Lenny uses to announce and execute a paywall on an existing free newsletter, applicable to any creator or content business.

How it works: Steps/components used in Lenny's transition:
1. **Establish backstory and authenticity**: Explain how the project started (side project) and what changed (reader feedback, organic growth).
2. **Social proof**: Include direct reader testimonials showing impact ('profound impact', 'accelerate professional development', 'transformed the way I work').
3. **Clearly define free vs. paid tiers**: Free = once a month; Paid = weekly + prioritized questions + community perks.
4. **Articulate value proposition simply**: 'Think of this as your personal advice column' / 'Like having a personal coach, but for real cheap.'
5. **Show proof of quality**: Link to 4-6 best past posts across different topics.
6. **Set transparent pricing**: $150/year or $15/month with rationale.
7. **Provide ROI justification**: 'If this helps you make one better decision per year, it pays for itself.'
8. **Address affordability proactively**: 'Email me and we'll work something out.'
9. **Create urgency with early-bird offer**: 33% off ($100/year or $10/month) for 48 hours.
10. **Give a transition runway**: Two weeks notice before paid content begins, with one more free post in between.
11. **Tease future paid perks**: Private community, live AMAs, intimate Zoom chats — framed as experiments.
12. **End with personal, humble ask**: 'If you've found value... consider subscribing. It would mean a lot to me.'

### Freemium Feature Decision Framework (EOY Review)
A set of criteria to determine if a feature should be gated or offered for free in a PLG model.

How it works: Make a feature free if it: 1. Helps indirect monetization (virality/network effects). 2. Suffices for every user (it's commoditized). 3. Helps reach the 'aha' moment (Proof of Concept). 4. Creates habit loops (e.g., notifications). Gate it if it creates friction for your growth model.

### Leaders, Fillers, and Killers (Madhavan Ramanujam)
A framework for packaging and bundling features.

How it works: Leaders: Features >50% of people want (e.g., Big Mac). Fillers: Nice-to-haves that people will accept in a bundle for a marginal price increase (e.g., Fries/Coke). Killers: Features only 10-20% of people want; if included in the main bundle, it kills the deal for everyone else (e.g., Coffee with a burger). Sell killers as separate add-ons.

### Maker Billing (Shishir Mehrotra)
A pricing model where only document creators (makers) are charged, not editors or viewers, specifically designed to remove friction from the viral share edge of the growth loop.

How it works: Three document product personas: viewers (can see), editors (can change), makers (can create). Most products charge for editors+makers. Coda charges only for makers. Principle: 'No dollar signs in the share dialog.' Only one paid license needed per doc even with paid features.

### Monetary Friction Levers (Archie Abrams)
A mental model for categorizing and reducing the financial barriers that prevent users from starting or succeeding.

How it works: Includes trial dynamics (length and amount), incentives (e.g., app score credits), and actual price points. Reducing these gives users more time to succeed, unlocking a new class of valuable customers.

### Monetization Prioritization Framework (4-Priority Tiers) (Pricing your SaaS product)
A prioritized list of monetization activities from foundational to growth accelerators, used to sequence pricing optimization work

How it works: Priority 1: Foundational
- Core customer segments
- Value metrics

Priority 2: Core
- Order of magnitude price point (are you a $10 product vs. a $500 product)
- Positioning and value props
- Packaging

Priority 3: Optimizations
- Add-on strategy
- Specific price point (are you a $10 product vs. an $11 product)
- Price localization/internationalization
- Discounting strategy
- Contract term optimization

Priority 4: Growth Accelerators
- Freemium
- Market expansion (going up or down market)
- Vertical expansion
- Multi-Product

Guidance: All companies should work through Foundational and Core before Optimizations and Growth Accelerators. Starting with a scoped optimization (like price localization) can build momentum and be a forcing function to clean up tech/experimentation stacks.

### Patrick Campbell's Freemium Timing Rule (Freemium vs. trial)
Guidance on when in a company's lifecycle to implement freemium.

How it works: Don't do freemium until you truly understand how to convert leads to customers, because you'll end up increasing noise or false positives when trying to figure out segment beachheads. Best companies that deploy free typically don't implement freemium until 2-3 years into business.

Exceptions where earlier freemium is appropriate:
1. You have a very specific need or network effect (e.g. marketplaces, social networks)
2. You have a top-50 growth person on your team

Key mindset: Freemium is a scalpel, not a sledgehammer. It requires significant thought, effort, and nuance to do properly.

### Per-Seat Pricing Litmus Test (Pricing your SaaS product)
A simple test to determine if per-seat pricing is appropriate for your product

How it works: Test: If a user logs into a colleague's account, can they do all their work?
- If YES (e.g., HubSpot Marketing — logging into anyone's account lets you do your work) → Seats is NOT the right value metric. Find a usage or outcome-based metric instead.
- If NO (e.g., a CRM — logging into someone else's account only shows their leads/accounts) → Seats MAY be appropriate because each seat provides a unique experience.

Rationale: Per-seat pricing is a relic of the perpetual license era when we couldn't measure usage or value within products. Modern software can and should measure usage/value. Per-seat pricing also creates friction to adoption (people share logins to avoid costs), reducing the number of invested users.

### Price Doubling Strategy (Scaling your B2B growth engine)
An iterative approach to finding the right price point by doubling until customers push back

How it works: Strategy: 'Double your price. If they say yes, keep doubling.'

How it works:
1. Start with an initial price (even if it feels low)
2. Quote it to the next prospect
3. If they say yes, double the price for the next prospect
4. Keep doubling until you start getting pushback
5. Use data points to triangulate your pricing matrix

Real example from Sprig:
- Customer 1: $100/month
- Customer 2: $500/month
- Customer 3: $2,000/month
- Soon after: $12,000/month
- Then: triangulate based on usage to fill out a pricing matrix

This approach works because founders systematically undervalue their product and need an external mechanism to push prices to market-appropriate levels.

### Pricing Model Break-Even Test (Madhavan Ramanujam)
A simple test to see which pricing model customers actually prefer.

How it works: Present customers with mathematically identical pricing structures (e.g., $1000 flat + $10/seat vs. $2000 flat vs. $500 flat + higher seat cost). Rational economics says they should be indifferent, but customers will always pick a preference, revealing their psychological bias toward fixed vs. variable costs.

### Psychological Price Threshold Optimization (How to make an impact in your first 90 days)
A pricing technique to align prices with psychological budgeting thresholds and display annual pricing as monthly

How it works: Two principles:

1. Match psychological thresholds: Move prices to just below budget thresholds like $75, $100, or $300. Example: If the price is $273.43, push to $299—most people see it as only $25/month which feels reasonable. Odd prices make people stop and overthink.

2. Lead with monthly price on annual deals: When publishing pricing, show the monthly equivalent of annual plans. Benefits: improves conversion AND is one of the easiest/most impactful growth hacks for retention and LTV. At Canva, driving more annual plans was one of the biggest churn reducers.

### Reverse Trial (Lauryn Isford)
A pricing/packaging strategy combining freemium and free trials.

How it works: Offer an infinitely free version of the product (freemium) BUT also give new users a limited-time (e.g., 14-day) free trial of the premium features upon signup. This showcases advanced capabilities immediately while retaining the user on a free plan if they don't convert.

### Reverse Trial Model (What is good free-to-paid conversion)
A hybrid free model where new users get full premium access for a trial period then downgrade to a free tier if they don't convert

How it works: How it works: New users get access to a free trial of the premium product. If they choose not to upgrade, they are downgraded to the fully free version. Data: Only 5% of respondents use reverse trials. Reverse-trial businesses convert at 2x the rate of classic freemium while maintaining a similar sign-up rate. Airtable case study: New users try Pro plan free for 14 days, which includes extensions, granular interface permissions, and up to 50,000 records per base. If user isn't ready to buy, they stay on free plan. Ongoing conversion opportunities via in-product CTAs, usage paywalls, and feature gates. Benefits per Lauryn Isford: 'Provides space upfront to explore the full potential of the product, but also keeps the door open for you to nurture your relationship with users over a longer time horizon.' Other examples: Krisp, Coefficient.

### Reverse Trial for Existing Users (How to make an impact in your first 90 days)
A monetization tactic that restarts premium trials for existing free users to drive urgency and upgrades

How it works: How it works:
1. Select a predetermined date for your existing user base
2. Restart a paid trial providing access to premium functionality at no cost for a limited time
3. Actually restart the trial—don't just make users eligible
4. Create urgency: 'the trial begins now!'
5. Drive usage of premium features to enhance perceived value of paid plans
6. Goal: trigger upgrades

Key insight: Trials shouldn't be reserved just for new signups. Your product is constantly getting better, so give existing users a taste of the latest improvements.

### Three Axes of Pricing (Pricing your SaaS product)
A framework showing that pricing strategy encompasses three key axes beyond just the price number itself, used to identify which lever to pull for monetization improvement

How it works: Three axes that influence your price and conversion:
1. Segment and Vertical: Go upmarket to higher WTP customers, shift to a vertical that sees more value, or change the ideal customer profile entirely.
2. Product, Positioning, and Packaging: New features, move features between tiers, create add-ons, change value propositions.
3. Price: Move price up or down, impacting conversion and brand perception.
Key insight: Anything that influences the value of your product is involved in pricing and monetization.

### Three Pricing Strategies (Madhavan Ramanujam)
The only three overarching pricing strategies a company can deploy.

How it works: 1. Skimming: Launch at a high price and lower it over time (e.g., Apple). 2. Penetration: Play the volume game with thin margins, requires strict supply chain/cost control (e.g., Amazon). 3. Maximization: Finding the optimal middle ground to maximize revenue in the near term (e.g., Microsoft).

### Trial vs. Freemium Decision Framework (Freemium vs. trial)
A decision framework based on analysis of ~50 SaaS products for choosing between free trial, freemium, or both.

How it works: Four decision rules:
1. You don't have to choose—you can do both. Nearly 90% of freemium products also offer a 7-30 day trial of their paid product. If you have a freemium product, experiment with offering a free trial of your pro plan.
2. Go with freemium WITHOUT a trial if your premium product can be fully understood without experiencing it (e.g. Figma, Miro, Amplitude—pro features like increased collaboration, better admin, or more data are easily understood without trial).
3. Go with a trial (instead of freemium) if: (a) your product significantly benefits from hand-holding, (b) requires complex integration (e.g. Okta, ServiceNow), (c) involves many stakeholders (e.g. Snowflake, HubSpot), (d) converts much better with human intervention (e.g. Front, Looker, Zendesk), or (e) has a high price point that can support cost of hand-holding.
4. Very few products should offer NO free product at all. Exceptions: too-complex onboarding (Workday, ADP), manual human onboarding makes free ROI-negative (Superhuman), or usage-based pricing already makes it cheap to try (Stripe, MongoDB).

TL;DR: Go trial if self-service doesn't convert well + high price point. Otherwise, go freemium + trial of pro plan.

### Two Levers to Change WTP (The ultimate guide to willingness-to-pay)
Framework for understanding the two fundamental ways to impact what customers are willing to pay

How it works: Lever 1: CHANGE YOUR PRICES - Run WTP studies, A/B tests, or launch-and-adjust strategies to find optimal price points.

Lever 2: CHANGE YOUR POSITIONING - This starts long before customers reach your pricing page. Encompasses copy, descriptions, product framing, and choice architecture on the pricing page.

Key insight: Customers are deciding in REAL TIME what they're willing to pay based on the information they have about the product. As a PM, marketer, or designer, YOU decide what that information is. Customers aren't walking in with an unmovable POV—you shape their POV.

The lowest-cost way to impact revenue is often Lever 2: better help people see and understand how your product benefits them.

### Utility Metric Selection Framework for Usage-Based Pricing (Scaling your B2B growth engine)
A decision framework for choosing the right billing metric in usage-based pricing models

How it works: Key questions to evaluate a potential utility metric:

1. **Value alignment**: Does the metric correlate with the value customers receive? (Most important criterion per Snyk)
2. **Behavioral incentives**: Does the metric incentivize good behavior or bad behavior? (Snyk's test-based pricing incentivized testing less often)
3. **Measurability**: Can you easily and accurately measure this metric?
4. **Explainability**: Can customers easily understand what they're paying for? (Census spent a year learning what metrics customers understood)
5. **Market training**: Has a dominant player already trained the market on a pricing model? Consider following unless you have very good reasons to deviate (Databricks learned this the hard way)
6. **Viral loop compatibility**: Does the pricing inhibit or support your product's viral/growth mechanics? (Coda's 'no dollar signs in the share dialogue' principle)
7. **Scalability fairness**: Does the metric scale fairly as customers' usage grows naturally? (Snyk: splitting a monolith into microservices shouldn't 10x the cost)

Process:
- Year 1: Make up pricing / keep it simple, use every sale as a learning opportunity
- Iterate every 6 months
- Test whether customers understand and agree with the metric
- Watch for market adoption of your chosen metric as validation

### Value Metric Identification Framework (Pricing your SaaS product)
A step-by-step process to determine the right value metric (what you charge for) for your SaaS product

How it works: Step 1: Identify the 'ideal essence of value' — what value are you directly providing? (B2B: money saved, revenue gained, time saved; DTC: joy, fitness, efficiency)
Step 2: Can you measure this? Does your customer trust/agree with your measurement? If yes → that's your pure value metric (e.g., ProfitWell Retain charges on churn recovered, MainStreet charges % of tax credits found)
Step 3: If you can't measure the pure value metric, find a proxy. Come up with 5-10 proxy metrics.
Step 4: Talk to customers and prospects to find the 1-2 most preferred metrics.
Step 5: Validate the proxy makes sense for growth — larger customers should use/get MORE of the metric, smaller customers LESS.
Step 6: Ensure the metric encourages retention.

Litmus test for per-seat pricing: If a user logs into a colleague's account and can do all their work, seats is NOT the right value metric. Per-seat is only appropriate when each seat provides a unique experience (e.g., a CRM where each user sees their own leads).

### Van Westendorp & Conjoint Analysis (Grant Lee)
Standard survey methodologies used to determine user willingness to pay and establish initial pricing tiers.

How it works: Used to figure out which features users value most and what price points are acceptable, ultimately leading to a $20/month price point anchored against ChatGPT.

### Van Westendorp Price Sensitivity Meter (Naomi Ionita, Rahul Vohra)
A survey technique to determine optimal price points based on user psychology.

How it works: The Van Westendorp Price Sensitivity Meter is a survey technique that asks respondents four questions about a product's price:
1. At what price would you consider the product to be so expensive that you would not consider buying it? (Too expensive)
2. At what price would you consider the product to be priced so low that you would feel the quality couldn't be very good? (Too cheap)
3. At what price would you consider the product starting to get expensive, so that it is not out of the question, but you would have to give some thought to buying it? (Expensive/High Side)
4. At what price would you consider the product to be a bargain — a great buy for the money? (Cheap/Good Value)

Outputs 4 pricing curves that can be plotted to determine optimal price point. Used by Segment in 2013 to price their v1 product by emailing the survey to existing users.

### WTP Method Selection Decision Framework (The ultimate guide to willingness-to-pay)
Decision tree for selecting the right WTP method based on product characteristics

How it works: Three decision paths:

1. FREQUENTLY BOUGHT, FAMILIAR PRODUCTS → Use open-ended method (Van Westendorp or BDM). Ask the series of four VW questions or 'What's the most you would pay for this widget?' Your audience already knows how the widget can help them, so they'll give a reasonable answer.

2. UNUSUAL OR HIGH-TICKET ITEMS → Use choice-based method. Ask people to choose between different product bundles. Since your audience likely won't have experience buying your widget, they'll need some comparison set to drive their valuation.

3. NEW-TO-THE-WORLD PRODUCTS → Avoid direct methods (VW and BDM). Newness makes open-ended questions much harder to answer. Choice-based is better.

Key principle across all: ALWAYS include an incentive-compatible element to reduce hypothetical bias.

If resources allow: combine multiple methods into one longer survey.

### Willingness to Pay Questioning Methods (Madhavan Ramanujam)
A suite of techniques to extract pricing data without asking 'how much would you pay?'

How it works: 1. Relative Framing: 'If Salesforce is 100 in value/price, where are we?' 2. Psychological Thresholds: Ask for Acceptable, Expensive, and Prohibitively Expensive prices. 3. Purchase Probability: 1-5 scale (only 4s and 5s have actual probability to buy). 4. Most/Least Questions: Present 6 features, ask for 1 must-have (will pay) and 1 least important (won't pay). 5. Trade-off Exercises: Present realistic shopping scenarios with different packages/prices.

## Templates

### Newsletter Paywall Announcement Email Template (This newsletter is growing up 🌱)
The actual structure and language Lenny used to announce going paid, usable as a template for any creator.

How it works: Structure:
- **tl;dr at top**: One-line summary of the change.
- **Origin story paragraph**: 'This was always meant to be a side project while I [did X], but after [positive signal], I've decided to double-down.'
- **Key change bolded**: 'Starting in [timeframe], only paid subscribers will get [frequency].'
- **Target audience callout**: 'Whether you're a [role 1], [role 2], [role 3], or just someone who wants to [aspiration]...'
- **Positioning line**: 'Think of this as your [analogy]. It's like having a [aspirational comparison], but for real cheap.'
- **Early-bird CTA with urgency**: 'Subscribe in the next [hours] and get [X]% off — just $[price].'
- **Section: What's changing?** — Free tier vs. paid tier breakdown, plus list of bonus perks.
- **Section: Why should I subscribe?** — Value prop + links to sample posts.
- **Section: What will it cost?** — Price, expense justification, affordability accommodation.
- **Section: When will this change happen?** — Specific date, transition plan.
- **Closing**: Personal, grateful sign-off.

### Qualitative Pricing Research Guide (100+ Questions) (The ultimate guide to willingness-to-pay)
Mega-guide with over 100 qualitative interview questions for B2B pricing research, designed to uncover what customers actually value vs. what they say they want

How it works: Google Doc template available at https://docs.google.com/document/d/1qJDcl0G6nE1SxGc-VDRhzIxAFLXKKPP84_59JeuKp44/edit. Focused on B2B companies. Based on the principle that what consumers say they want isn't typically what they actually want—particularly true of pricing. Contains 100+ structured questions for qualitative pricing interviews.

### Quantified Persona Spreadsheet (Pricing your SaaS product)
A spreadsheet template for building data-driven customer profiles to inform pricing and packaging decisions

How it works: Google Sheets template (link: https://docs.google.com/spreadsheets/d/1QZ8sNT7aP3TWHDsrK8k1vN_HDohxQUQaPok1BfVh0Uo/edit#gid=0)

Structure:
Columns = Customer profiles you're targeting (separated by size, role, or both)
Example columns for a marketing automation product:
- Marketing leaders (Director+) at companies $1M-$10M
- Marketing leaders (Director+) at companies $10.01M-$50M
- Marketing leaders (Director+) at companies $50.01M-$100M

Rows = Characteristics to differentiate profiles:
- Most valued features
- Least valued features
- Willingness to pay
- Lifetime value (LTV)
- Customer acquisition costs (CAC)
- Any other metric or category useful for differentiation

Process:
1. Fill out with hypotheses even if you don't have data yet
2. Identify the most pressing hypothesis based on upcoming decisions
3. Validate or invalidate through customer research
4. Use as a 'constitution' to centralize focus and arguments about business direction

### Willingness-To-Pay Survey Questions Template (The ultimate guide to willingness-to-pay)
Complete template with exact survey questions for all four WTP methods (Van Westendorp, BDM, MPL, Discrete Choice), including examples and incentive-compatible question variants to reduce hypothetical bias

How it works: Google Doc template available at https://docs.google.com/document/d/1NOo6VYa8oCBe4_iR8HrmqqTfNb6x28Jqnqy6jkjS_MI/edit. Includes: (1) Van Westendorp 4-question format, (2) BDM maximum-amount-with-random-number format, (3) MPL yes/no price list format, (4) Discrete choice bundle comparison format, plus examples of incentive-compatible language and cheap-talk mitigation scripts.

## Checklists

### 10 Data-Backed Pricing Optimization Rules (Pricing your SaaS product)
Rapid-fire data-backed guidelines for common SaaS monetization decisions

How it works: 1. Localize pricing: Use proper currency symbol (+30% revenue per customer) and adjust price points by region based on local WTP.
2. Freemium is acquisition, not pricing: Treat it like a premium e-book for lead gen. Don't implement until you understand lead-to-customer conversion (typically 2-3 years in). Exceptions: network effects, marketplaces, or top-50 growth person on team. Converted free users have higher NPS, better retention, lower CAC.
3. Value propositions swing WTP: ±20% in B2B, ±15% in DTC.
4. Don't discount over 20%: Discount size almost perfectly correlates with higher churn. Large discounts convert but don't retain.
5. Frame annual discounts as whole dollar amounts: '1 month free' outperforms 'X% off'. Annual plans see much lower churn rates.
6. Price ending (9s vs 0s): 9s = discount brand perception; 0s = premium. Inconclusive for tech. 9s may increase conversion for low-price products but hurt retention.
7. Experiment with pricing every quarter: More changes correlate with increasing revenue per customer. Doesn't mean changing price — experiment with any monetization lever.
8. Case studies boost WTP 10-15%: Social proof works in both B2B and DTC.
9. Design boosts WTP by 20%: Design affinity now significantly impacts WTP (wasn't true 10 years ago).
10. Integrations boost retention and WTP: More integrations = higher WTP and retention. Don't charge for integrations — use them to deepen engagement and drive add-on purchases.

### 5 Academic Papers on WTP for Further Study (The ultimate guide to willingness-to-pay)
Curated reading list of the most important academic papers on willingness-to-pay research methods

How it works: 1. 'All Roads Lead to Rome? Evaluating Value Elicitation Methods' - Gao, Huang, Jung (2023) - Comprehensive review comparing top WTP methods across dozens of papers. https://ssrn.com/abstract=4484841

2. 'How Should Consumers' Willingness to Pay Be Measured?' (2011) - In-depth comparison of state-of-the-art approaches, tested direct vs. indirect methods against real purchase data for a cleaning product. https://journals.sagepub.com/doi/10.1509/jmkr.48.1.172

3. 'Using Choice Experiments to Value Non-Market Goods and Services' - https://www.degruyter.com/document/doi/10.2202/1538-0637.1132/html

4. 'Measuring Willingness to Pay: A Comparative Method of Valuation' (2023) - Newly developed comparative method measuring WTP in context of relevant alternatives. https://doi.org/10.1177/00222429231195564

5. 'Eliciting and Utilizing Willingness to Pay: Evidence from Field Trials in Northern Ghana' (2019) - Field study on water filters validating BDM method. https://doi.org/10.1086/705374

### 6 Tips for Running Your Own Pricing Study (The ultimate guide to willingness-to-pay)
Implementation checklist for executing a high-quality WTP pricing study

How it works: 1. MINIMIZE HYPOTHETICAL BIAS
- Tell participants 'Some participants will be selected to purchase the item'
- Create a lottery: win product for free OR take home equivalent cash
- If product doesn't exist: explain 'cheap talk' and encourage thinking as if spending own money
- Tell participants their choices will strongly influence what's produced
- Always include option to 'not purchase'
- Run attention checks to ensure people understand the incentive scheme

2. COPY MATTERS - RE-READ EVERY QUESTION 15 TIMES
- Use scales from 1 to 7 or 1 to 9
- Label the ends ('highly likely' vs. 'not at all likely') but don't overlabel
- Include follow-up certainty question: 'How confident or not confident are you in your answer?'
- If people aren't confident, don't base key decisions on that answer

3. DO A CONTROLLED TRIAL TO TEST DIFFERENT DESCRIPTIONS AND FRAMING
- If recruiting 250 people, triple your sample to 750
- Run 2 additional conditions varying product description and core benefits
- How much people pay depends on how the product is described

4. WHO YOU RECRUIT MATTERS
- Use good screener to match actual target audience
- Consumer/non-niche: Prolific ($2,000 for 1,000 people, 10-min study)
- Other tools: Sago, Guidepoint, Disqo, Respondent
- B2B specialized: Find niche communities (newsletters, forums, Slack groups)

5. THE BEST WAY TO TEST IS ALWAYS IN-MARKET
- A/B test in-market if possible - real data trumps study data
- Launch-high-and-adjust method (Apple iPhone dropped $200, Twitter Blue $20→$8)
- Start at higher end of range, adjust quickly
- Benefit: strong anchoring effect makes second price appear low
- Compensate early adopters who paid higher price
- Alternative: create landing page at a price with 'notify me' option (Meetup Pro method)

6. NEVER FORGET: PRICE IS PERCEPTION
- Change perception of value = change WTP
- Lowest-cost way to impact revenue: better help people understand your product's benefits
- Include clickable website, demo video, or real mock-ups in your survey

### B2C Subscription Bonus Tactics (How to win in consumer subscription)
Five tactical recommendations from founders of successful consumer subscription apps

How it works: 1. Encourage longer plans — Move from monthly to multi-month plans (e.g., Noom went from monthly to 4-month plans). Offer add-ons right after signup when motivation is highest. Even $1 upfront increases engagement and retention vs. $0.

2. Play with pricing — Consumers are anchored to $10-20/month (Netflix price). Push annual discounted pricing aggressively (some apps like Calm don't even offer monthly). Try creative pricing (e.g., Noom's 'name your own price' for first month). Use web-based funnels for more pricing flexibility than iOS subscription framework.

3. Add multi-player features — Transform single-player to multi-player to increase K factor organically.

4. Unpack churn — Not all churn is equal; some users aren't a good fit. Focus on stickiness for best users. Measure by cohorts to track progress over time.

5. Explore B2B2C — Distribute through enterprise channels (e.g., employee wellness programs like Calm and Headspace did).

### Downturn Pricing Defense (Madhavan Ramanujam)
Three steps to take instead of dropping your price during an economic downturn.

How it works: 1. Create a de-featured, less expensive alternate product to keep in your back pocket for churn risks. 2. Use non-pricing actions (give more product value, extend contract length, or soften payment terms). 3. Change the pricing model (e.g., switch to usage-based so they pay less now but scale up automatically when the economy recovers).

### PLG Pricing and Packaging Tips for Conversion (What is good free-to-paid conversion)
Three tactical pricing and packaging recommendations to drive free-to-paid conversion

How it works: 1. Don't ignore the admin experience of PLG pricing and billing. Admins struggle with billing, budgeting, and feeling like they're in control of their spend. 2. Design pricing around team or higher-value use cases, not individuals. Ideally, all plans should have the option of being used with multiple users in an organization. 3. Quantify the value of your features for different audiences. Use ongoing willingness-to-pay surveys to quantify the perceived value of existing and roadmap features.

### Paid Newsletter Benefits Package Checklist (This newsletter is growing up 🌱)
The specific benefits Lenny offers paid subscribers, useful as a checklist for anyone designing a paid tier.

How it works: Core benefits:
- [ ] Increased frequency (weekly vs. monthly for free)
- [ ] More in-depth content
- [ ] Prioritized reader questions
Bonus perks (experimental):
- [ ] Private community for deeper discussion
- [ ] Live AMAs with notable guests
- [ ] Intimate Zoom chats with the creator

### Pricing Method Selection Checklist (Scaling your B2B growth engine)
Different methods B2B startups used to determine their initial pricing, with real examples of each approach

How it works: Methods for determining B2B pricing:

1. **Benchmark against competitors/comparables**
   - Gong benchmarked against Salesforce ($70-100/user/month), set price at roughly half (~$50/user/month)
   - Figma benchmarked against Sketch (~$100/year), set at $12/month or $8/month annual
   - Front looked at competitors and priced similarly
   - Linear used industry pricing for their category

2. **Van Westendorp Price Sensitivity Survey**
   - Segment ran this survey, asking users to find price curves that made sense
   - Offered users a good deal as incentive to fill it out
   - Landed on $9, $39, and $79/month plans

3. **Pricing matrix survey at scale**
   - Loom surveyed tens of thousands of users with various questions
   - Multi-sprint process: research → parsing results → user interviews → A/B testing landing pages
   - Landed on $10/month (monthly) or $8/month (annual)

4. **Iterative price doubling with customers**
   - Start low, keep doubling until pushback
   - Plot data points and fill gaps in pricing matrix
   - Used by Segment and Sprig

5. **Value-based conversations**
   - Retool asked customers how they justify value
   - Played back what other customers said about ROI
   - Built value story based on customer language (e.g., '100x ROI')

6. **Just ask users directly**
   - Figma asked potential customers about willingness to pay for specific features
   - Customers tend to be honest about how they think about their business and comparable software costs

7. **Make it up and iterate**
   - Census made up pricing for the first year, learning what metrics customers understand
   - Used each sale to test whether customers understood the metric and agreed on margins

### Recommended Reading List on Pricing Strategy (Freemium vs. trial)
Curated reading list for going deeper on SaaS pricing, freemium, and packaging strategy.

How it works: Core Reading:
1. 'Bottom Up Pricing & Packaging: Let the User Journey Be Your Guide' by Jennifer Li and Martin Casado (a16z)
2. 'Per Seat or Per Use Pricing: A Framework for Evaluating the Right Strategy for Your Startup' by Tomasz Tunguz
3. 'Pricing your SaaS product' by Patrick Campbell (Lenny's Newsletter)
4. Book: 'Monetizing Innovation' by Madhavan Ramanujam and Georg Tacke
5. Course: Reforge 'Monetization and Pricing'

Further Study:
1. 'The Hidden Freemium Advantage' by Elena Verna (Reforge)
2. 'Freemium, Free Trial and Free Surprises' by Elena Verna
3. 'The Flavors of Free' by Rob Litterst
4. Book: 'Free: The Future of a Radical Price' by Chris Anderson
5. 'The Freemium Manifesto' by ProfitWell
6. 'The Ultimate Guide to Freemium' by HubSpot

### Three Levers to Reduce Payback Period (What is a good payback period?)
Actionable tactics for reducing payback period

How it works: The three core levers: (1) Reduce CAC, (2) Increase price, (3) Increase margin. Tactical tips: 1. Encourage annual plans: Collect cash upfront. Typical path: annual plan = 10x monthly cost, but can go as low as 6x to create a positive cash cycle. Run in-app promos and emails to convert monthly subscribers to annual—this is one of the highest-ROI optimization hacks for mid-stage companies. You're effectively getting a 'loan' from current customers to acquire future customers. 2. Adopt PLG tactics: Enterprise SaaS companies (often in 18-24 month payback range) can explore self-serve motions to increase sales efficiency. Implement usage-based pricing as a natural escalator to increase LTV and reduce payback toward <12 months. 3. Monitor incremental payback: When extending payback periods, measure payback on the incremental customers acquired. If extending from 6 to 12 months yields very few incremental customers, payback on those customers is well beyond 12 months and the investment may not be worthwhile.

### Three-Step Direct Monetization Process for AI Features (How should you monetize your AI features?)
A structured three-step process for implementing direct monetization of AI features

How it works: **Step 1: Define the role AI will play in your product portfolio**
- Answer: Will this feature be widely used by a broad audience (>70%) or specific personas?
- Answer: Will a critical mass of people want to pay for this feature (need-to-have vs. nice-to-have)?
- Use answers to place feature on the 2x2 matrix (Leader/Filler/Add-on/Bundle Enhancer)
- Methods: Beta program for usage data, willingness-to-pay interviews with potential customers

**Step 2: Evaluate the three direct strategy options**
- Option 1 — Standalone product: Best when AI solves a different problem than existing product, little overlap with existing solutions, can segment toward new buyer/industry/ICP
- Option 2 — Add-on: Best when AI provides value to some but not all customers, and it enhances existing solutions
- Option 3 — Bundle in existing plan (with price increase): Best when feature aligns with core value prop, ~70% consider it crucial, customers unlikely to buy separately, separate pricing would feel like nickel-and-diming

**Step 3: Distribute AI features across product tiers**
- Don't add all AI features to a single package
- Evaluate different use cases and willingness to pay across customer segments
- Sprinkle features across packages at different price points
- Creates upsell path from entry-level to premium
- Saves costs on entry-level subscriptions

### What to Keep Free vs. What to Charge For (Freemium vs. trial)
Criteria for deciding which features belong in a free tier and which should be gated in paid tiers.

How it works: WHAT TO KEEP FREE:
1. Features that enable your product to spread throughout an organization/community (e.g. invites, sharing, some level of collaboration)
2. Features that are necessary to keep a user hooked (e.g. your killer 'aha' features)
3. Features that are necessary to keep a user retained (e.g. meaningful usage limits)

WHAT TO CHARGE FOR:
1. Features that professionals or teams need for business productivity (e.g. billing and admin, customer support, higher usage limits)
2. Features that make power users' lives much less annoying (e.g. automations, reports, history)
3. Increased usage limits beyond some initial threshold

## Examples

### AI Pricing Benchmarks from 44 Tech Companies (How should you monetize your AI features?)
Real pricing data from leading tech companies showing how they price AI features relative to their base SaaS products

How it works: **Distribution of strategies (44 companies):**
- 59% bundle AI into existing packages
- 23% offer AI as add-on
- 18% offer standalone AI products

**Price range for AI add-ons/standalone:**
- Lowest: 25% of base package price (Adobe)
- Highest: 4.75x the base SaaS product price (GitHub Copilot)
- Absolute range: $4 to $30 per user per month
- AI products are generally priced lower than non-AI add-on counterparts

**Specific examples:**
- Microsoft Copilot for M365: $30/user/month (highest), exceeds base subscription cost; justification: up to 70% productivity increase
- GitHub Copilot: $19/user/month, 4.75x standard SaaS subscription; justification: 55% faster task completion
- Notion AI: $10/user/month add-on
- Companies using usage-based pricing within bundles: Canva, Box, Grammarly
- Companies using indirect/free strategy: Zoom, Shopify

**Canva tier distribution example:**
- Different AI features distributed across Free, Pro, and Enterprise tiers with varying usage limits

**Pricing model innovation:**
- Intercom Fin: Pay-per-resolution model (customer pays only when AI resolves a conversation)

### Amplitude: Pricing escalation story ($50 → $1,000/month) (A guide for finding product-market fit in B2B)
Spenser Skates' story of pricing his first customer, going from an instinct of $50/month to $1,000/month, and the customer saying it was cheap.

How it works: Context: Super Lucky Casino asked 'How much does it cost?' — first time anyone wanted to pay.
Thought process:
1. Initial instinct: $50/month (what SaaS 'should' cost)
2. Remembered Patrick McKenzie's advice: 'Charge more'
3. Doubled to $100/month
4. Added another zero: $1,000/month
Result: Customer said 'Holy smokes, that's so cheap, amazing.'

Subsequent pricing escalation across first customers:
- Super Lucky Casino: $1,000/month
- Keepsafe: $2,000/month
- The Hunt: $3,000/month
- HERE Maps (Nokia): $4,000/month
- Rdio and QuizUp: $10,000/month

Result: Zero to $1M ARR in less than 9 months

Key lesson: Charge more than you think you should. Reference: Patrick McKenzie's 'You can probably stand to charge more.'

### Business Model Disruption Case Studies (Freemium vs. trial)
Real examples of companies that disrupted industries by making their core product free.

How it works: 1. Microsoft Teams vs. Slack: Teams disrupted Slack's dominance (145M DAU vs. 12M) by making product essentially free as part of Office 365 bundle.
2. Robinhood: Launched world's first free stock-trading product, built waitlist of 1M+ people. Revenue from payment for order flow.
3. Fortnite: Gave game away for free, generated $5B+ in one year from in-game purchases.
4. Chime: Fee-free banking disrupted entrenched banking industry. Revenue from transaction interchange fees.
5. Square: Gave away free PoS systems as wedge into SMB transaction flows. Expanded to lending, banking, payroll.

### Canva AI Feature Tier Distribution (How should you monetize your AI features?)
Example of how Canva distributes AI features across its pricing tiers to create upsell paths

How it works: Canva is highlighted as a great example of distributing AI features across product tiers rather than putting all AI in one package. They use usage-based pricing components integrated into existing packages, with different AI capabilities and usage limits at each tier level. This creates natural upsell paths where entry-level users get basic AI access, and power users can upgrade for more advanced AI features or higher usage limits. Canva, Box, and Grammarly are cited as examples of companies that integrated AI into existing packages with a usage-based pricing component.

### Carta's Pricing Model Evolution (How today's fastest-growing B2B startups turned their early users into paying customers)
How Carta pivoted from per-certificate to subscription pricing with 2000+ customers

How it works: Initial problem: Couldn't get companies to pay a subscription because cap tables don't change frequently. Initial model: Charged $20 per preferred stock certificate issued; common shares were free. Only got paid during financing rounds or occasionally when hiring employees. Learning: This was not a good business model. Pivot: Shifted to subscription pricing with 2000+ customers at the time. Consequence: 'Ton of work' to migrate, lost some customers in the process, but it was the right move.

### Chegg's Pricing Experiment (Mike Maples Jr)
A case study on designing experiments to discover surprises rather than just validating hypotheses.

How it works: Chegg created a fake site (Textbookflix) to test textbook rentals. Instead of testing just one expected price ($35), they tested arbitrary prices up to $75. The surprise was students were willing to pay much more because they didn't want to keep the book anyway.

### Coda Maker Billing Pricing Model (Scaling your B2B growth engine)
Detailed case study of how Coda designed 'maker billing' to avoid inhibiting viral growth, including the failed first launch and rapid iteration

How it works: Context: All document products have 3 personas — viewers, editors, and makers. Every competitor (Office, Google Docs, Notion, Airtable, Figma, Miro, etc.) charges for editors + makers.

Philosophy: 'No dollar signs in the share dialogue.' Sharing is the viral moment. Charging for sharing would be like putting a dollar sign on sharing an Airbnb listing or a Facebook story.

Approach: Charge only for creation (makers), not for sharing (editors/viewers).

First launch (failed):
- Launched with a governor/halfway model: makers come with X editor seats (5, 10, etc.)
- Very complicated
- Got significant negative feedback, especially from deepest users
- Head of Support called CEO on Sunday: 'These people are happy to pay. They think pricing is reasonable. But we got the mechanic wrong.'

Second launch (3 weeks later):
- Simplified to: makers pay, nobody else does
- Easy to explain, easy to understand
- Took the risk of people potentially abusing it (one maker creating for hundreds of editors)
- Has worked out fine

Key lesson: Align pricing with your viral loop mechanics. Don't charge for the action that spreads your product.

### Coda's Maker Billing Model Development (How today's fastest-growing B2B startups turned their early users into paying customers)
How Coda co-developed their pricing model with their largest free users

How it works: Timeline: February 2019 — launched Coda 1.0 as first generally available release, kept product free for all users. October 2019 (8 months later) — launched Coda 2.0 'a new doc for teams' with monetization. Approach: Started with largest customers (some had grown to thousands of users) and worked through monetization model incorporating their feedback, same way they iterated on product. Result: Landed on 'maker billing' — only charge for doc makers, all editors and viewers are free. All top customers converted.

### Cost-Allocated Pricing Model (Nilan Peiris)
A pricing strategy where every operational cost is allocated back to the specific transaction or customer segment that generated it.

How it works: Allocate costs like support calls or document verification to specific currency routes or customer types. Charge the expensive 20% of customers their actual cost, and drop the price for the remaining 80%.

### Databricks Pricing Evolution (Scaling your B2B growth engine)
Case study of Databricks iterating through multiple pricing models including a failed customer-suggested model before landing on usage-based pricing

How it works: Timeline:
- 2012 (before company existed): Fierce debates about pricing models
- 2014: Internal hackathon — engineers thought product was ready to charge, non-engineers disagreed. Went with engineers' instinct. People paid ($10K-$20K felt like a lot).
- 2015-2016: Two co-founders spent extensive time with customers testing what sticks

Failed pricing model (customer-suggested):
- Customer proposed: 'Pay X for Y reserved machines. If I use more but only 10% of the time at 10x capacity, that's okay. But what about >10x >10% of the time?'
- Problems: Very hard to put in legal contracts. No existing pricing systems in the world supported this model.
- Had to phase it out.

Key insight: 'If there are big dominant players in the market that price in a certain way, you should seriously consider that, because they've trained the market on that pricing model. If you're going to deviate, you'd better have really good reasons.'

Final model: Usage-based pricing aligned with Amazon's pay-as-you-go model, since AWS had already trained the market on that approach.

### Discrete Choice Survey Question Example (The ultimate guide to willingness-to-pay)
Example of how to structure a discrete-choice-based pricing question for enterprise software

How it works: Question prompt:
'Imagine you're considering purchasing new and innovative enterprise software that can do the following:'

Options:
1. Project management software that costs $8/month per user and can automate quarterly headcount planning
2. Project management software that costs $11/month per user and can automate quarterly headcount planning and provide what-if scenario planning
3. Project management software that costs $12/month per user and can provide what-if scenario planning and real-time headcount planning
4. Would not purchase

Incentive-compatible language:
'Please click around on the landing page and explore what these products can do. Then select the option that you would be most likely to purchase. At the end, we will choose 20% of the people who take this survey and sell them the product at the price they choose. Make sure to choose the product you would actually spend money on!'

Design notes: Ask this question 5-7 times varying features and prices across iterations.

### Envoy's 10x Pricing Experiment (Naomi Ionita)
An example of testing price ceilings in enterprise sales.

How it works: Envoy's founder Larry 10x'd the quoted price during a live sales meeting with a hospitality company. The exec agreed without hesitation, proving the product was wildly underpriced. Lesson: Keep asking for more until you lose 20-30% of deals.

### Evernote's Guilt-Based Pricing (Naomi Ionita)
A case study on the dangers of underpricing and having a single premium tier.

How it works: Evernote charged a flat $45/year. Surveys revealed avid users paid out of 'guilt' because they got hundreds of dollars of value, indicating the free version was too generous and the paid version was severely underpriced.

### Figma's Free-to-Paid Transition Timeline (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36)
How Figma deliberately delayed charging and then transitioned from free to paid when customers requested it

How it works: Timeline:
- December 2015: Launched closed beta (free)
- October 2016: General availability (still free)
- End of 2016: Started hearing from customers: 'Hey, why aren't you charging, you idiots? I want to pay so that you don't go away.'
- 2017: Launched paid plan

Rationale for staying free: 'It'll spread faster if we don't charge'
Trigger to charge: NOT charging became a barrier — companies didn't trust they'd survive without revenue

Conversion approach: Fully self-service. May have been on phone with key customers but it wasn't a meaningful part of conversion.

Pricing model: Per-seat monthly subscription with freemium tier

### Figma's Path from Free to Paid (How today's fastest-growing B2B startups turned their early users into paying customers)
How Figma deliberately stayed free for over a year before customers demanded to pay

How it works: Timeline: December 2015 — launched closed beta. October 2016 — general availability (still free). End of 2016 — started hearing from customers 'Hey, why aren't you charging, you idiots? I want to pay so that you don't go away.' 2017 — launched paid plan. Key insight: Not paying became the barrier for companies to adopt it — customers wanted to pay to ensure the company's survival. Going from free to paid was fully self-service.

### Fin Outcome-Based Pricing Model (Eoghan McCabe)
A pricing strategy that charges customers a flat fee ($0.99) only when an AI agent successfully resolves a customer ticket.

How it works: The model ignores initial compute costs (which were $1.20 per transaction at launch) to anchor on customer value. It was benchmarked against the $20-$30 cost of human resolution, finding a nexus point that was highly palatable to buyers while aligning revenue 100% with attained value.

### Fivestars Choice-Based Method Win (The ultimate guide to willingness-to-pay)
How Fivestars used choice-based method over Van Westendorp for an unfamiliar product and discovered a new pricing tier

How it works: Problem: People weren't familiar with Fivestars' product, so open-ended Van Westendorp answers would cover too wide a price range. Solution: Mathew Diep pushed to use choice-based method (#4). People struggle to accurately evaluate pricing for products they've never used. Result: The choice-based method paid off, resulting in the discovery of an additional pricing tier.

### Grammarly's Real-Time Reverse Free Trial (Albert Cheng)
A monetization tactic where free users are shown a limited sample of premium features.

How it works: Instead of a time-based trial, Grammarly gives free users a capped number of premium suggestions (e.g., tone adjustments, sentence rewrites) alongside free spelling checks to demonstrate value before hitting a paywall.

### Heroku Overage Monetization Model (How to make an impact in your first 90 days)
How Heroku generated millions in ARR by letting users experience premium features for free and monetizing overages

How it works: Strategy: Allow users to use most product features and plans for free in a consumption-based pricing model. Focus monetization on overages for both feature use and usage/consumption. Result: Closed several million in ARR in just one quarter. Sales motion: Not just topping off current usage but also selling more products based on growing needs.

### Hypothetical Bias - John List Donation Study (The ultimate guide to willingness-to-pay)
Landmark study demonstrating how dramatically hypothetical settings inflate stated willingness to pay

How it works: John List ran a donation study where the real treatment raised $310 for their cause, but more than twice that ($780) was pledged in the hypothetical condition. This demonstrates people's fundamental inability to predict future behavior accurately in hypothetical settings—in fake worlds, we have no competing priorities, we're very rich, and we like lots of things.

### Intercom Fin Pay-Per-Resolution Model (How should you monetize your AI features?)
Example of innovative outcome-based pricing for AI, where customers pay only when the AI achieves a desired result

How it works: Intercom's AI bot Fin uses a pay-per-resolution pricing model. The customer pays only when Fin achieves the outcome customers care about most — resolved conversations. This is one of the only examples of pricing model innovation in AI among the 44 companies studied. It aligns the price directly to end-user value rather than usage or seats. This model is predicted to become more common as gen AI matures in the application layer.

### Launch-High-and-Adjust Pricing Strategy (Apple & Twitter) (The ultimate guide to willingness-to-pay)
Real examples of launching at a high price and quickly adjusting downward to find the market price while benefiting from anchoring

How it works: Apple iPhone (2007): Launched at initial price, then lowered by $200 within months. Compensated early adopters.
Twitter Blue: Announced at $20/month subscription, promptly dropped to $8/month.

Benefits of this approach:
1. Tests real market behavior (not hypothetical)
2. Creates strong anchoring effect - second price appears low by comparison
3. Generates real purchase data

Key requirement: Must compensate early adopters who paid the higher price.

### Lenny's Curated Product Bundle (A new perk for annual subscribers: A free year of some of the world's most beloved products (while supplies last))
A list of specific SaaS products bundled with an annual newsletter subscription, including plan details and dollar values — serves as an example of a creator-led product partnership/bundle strategy.

How it works: Available products:
1. Granola (granola.ai) — One year of the Business plan for you and your team, up to 100 seats ($10,000+ value)
2. Linear (linear.app) — One year of the Business plan, two seats ($336 value)
3. Superhuman (superhuman.com) — One year of the Starter plan ($300 value)
4. Perplexity Pro (perplexity.ai/pro) — One year of the Pro plan ($240 value)
5. Bolt (bolt.new) — One year of the Pro plan ($240 value)

Sold out products: Notion, Cursor, v0, Lovable, Replit.

Total stated value: $15,000+

### Lenny's Newsletter Bundle Pricing and Value Breakdown (Announcing the greatest product bundle ever: Get a year free of Granola, Notion, Superhuman, Linear, and Perplexity with an annual subscription)
A real-world example of how a creator/media business packages partner deals to increase subscription value and retention.

How it works: Bundle price: $200/year (annual newsletter subscription). Total bundle value claimed: $13,000+. Breakdown:
- Granola Business (100 seats): $10,000+ value
- Notion Plus with AI (10 seats): $2,000+ value
- Linear Business (2 seats): $336 value
- Superhuman Starter: $300 value
- Perplexity Pro: $240 value

Key deal constraints:
1. Must be a new customer of each product
2. Must be on annual (not monthly) subscription
3. Codes deactivated if refund or chargeback requested

Retention mechanism: Codes tied to active annual subscription status.

### Lenny's Newsletter Monetization Case Study (This newsletter is growing up 🌱)
A real example of a creator transitioning from free to paid on Substack, including pricing, timing, and communication strategy.

How it works: Timeline: Newsletter launched ~6 months prior as a side project after leaving Airbnb. Grew organically with free weekly posts. Transition announced with 2 weeks notice. Pricing: $150/year or $15/month. Early-bird: $100/year or $10/month (33% off) for 48 hours. Free tier retained at ~monthly cadence. Topics covered before paywall included: impostor syndrome, marketplace growth, underperforming teams, product-market fit, breaking into PM. Reader testimonials cited as evidence of value. Affordability accommodations offered on a case-by-case basis via email.

### Looker's Usage-Maximizing Pricing Strategy (How today's fastest-growing B2B startups turned their early users into paying customers)
How Looker intentionally under-priced to maximize usage and learn before scaling sales

How it works: Strategy: Initial customer strategy was NOT to maximize revenue but to maximize usage in customers that would give best early data to shape product and company. Approach: Used low flat monthly price for unlimited users (instead of per-seat) to see how analysts could build in Looker and roll out across entire organizations. Also wanted early indicators of pricing strategy — tested premium priced, user-based annual subscriptions. Removed as many factors as possible to optimize conversion rate and usage within pricing strategy bounds. Timeline: Maintained this for first 8-12 months before scaling sales team and adjusting pricing to per-seat model.

### McKinsey 1% Pricing Improvement Stat (The ultimate guide to willingness-to-pay)
Data point on the profit impact of small pricing improvements

How it works: A 1% improvement in pricing can increase profits by up to 11%. Source: McKinsey analysis published in Harvard Business Review, 'Managing Price, Gaining Profit' (1992).

### Meetup Pro Pre-Launch Pricing Test (The ultimate guide to willingness-to-pay)
How Meetup tested pricing for a product that didn't exist yet using a landing page

How it works: Method: Created a landing page for the Pro product before it even existed. Offered the product at a particular price and gave people the option to be notified when it becomes available in the future. This allowed them to test WTP with real intent signals without actually building the product.

### Michelin Tires Pricing Model (Madhavan Ramanujam)
An example of changing the pricing model to align with value.

How it works: Michelin created a tire that lasted 20% longer. Instead of charging 20% more upfront (which would fail in a price-sensitive market), they changed the model to charge 'per mile driven'. Truckers loved it because it became a variable cost they could pass to their customers.

### Notion Early Charging Strategy and Fundraising Outcome (Scaling your B2B growth engine)
Case study of how Notion's early monetization led to profitability, independence, and minimal equity dilution

How it works: Key facts:
- Notion charged for the product early on
- Became profitable and cash-flow positive from the get-go
- By mid-2018: 8 people, profitable, never needed to raise money again
- 100% of time focused on getting new customers (not fundraising)
- Many VCs thought Notion was a 'nice lifestyle business'
- Eventually raised 3 times, diluting less than 2-3% per round each time
- More money in the bank than they've collectively raised
- Has not used a single dollar of the money raised
- Result: 'A fairly disciplined company, which is very rare in the Valley'

Key lesson: Early charging provides leverage, freedom from VC pressure, and better fundraising terms later.

### Optum Choice-Based Pricing Study (The ultimate guide to willingness-to-pay)
Real-world case study of how Optum used choice-based pricing method and killed a product based on findings

How it works: Method: Choice-based pricing (discrete choice)
Question format: 'Which of the three products are you most inclined to purchase?' asked 5 different times with variations of feature and pricing combinations
Sample: 12 provider practices via phone-based interviews, representative of target market
Result: Found WTP was LOWER than assumed and adoption would be more difficult than expected
Business impact: Killed the full product they were about to launch. Instead, integrated high-value parts into other existing businesses and products.
Key takeaway: Pricing research can save you from launching the wrong product at the wrong price.

### Outcome-Based Pricing Model (Bret Taylor)
An example of how to price an AI agent based on business value rather than usage.

How it works: Sierra charges a pre-negotiated rate only when their AI agent successfully resolves a customer's problem without human intervention (a 'call deflection'). This aligns the vendor's revenue directly with the customer's cost savings (e.g., saving the $15 cost of a human-handled phone call).

### Pay-What-You-Want Pricing Experiment (Karri Saarinen)
A method to test pricing appetite during a beta phase.

How it works: Add a billing page in settings with a slider allowing users to optionally pay whatever they want per seat (e.g., $1 to $28) to gauge willingness to pay before official pricing launches.

### Porsche Cayenne Willingness to Pay Testing (Madhavan Ramanujam)
An example of testing product features and willingness to pay before building.

How it works: Porsche tested the concept of an SUV before drawing blueprints. They used 'car clinics' to test specific features (e.g., big cup holders were kept because people would pay for them; 6-speed manual transmission was scrapped because they wouldn't). The result was their most profitable car.

### ProfitWell Metrics Freemium Pivot Case Study (Pricing your SaaS product)
How ProfitWell discovered through persona/segment research that analytics products have terrible WTP and retention, leading to a freemium pivot

How it works: Problem: ProfitWell built a subscription metrics tool thinking it would be highly valuable.
Research finding: Analytics products have terrible willingness to pay, terrible retention, and terrible NPS. Customers don't appreciate graphs or aren't willing to pay much for them.
Decision: Changed positioning to freemium, massively over-delivering a free product better than paid competition.
Result: Freemium strategy fueled the business, achieved NPS of 70, and put them 18 months ahead of competitors.
Lesson: Never underestimate the power of focusing on the customer through research. Don't just do what they ask, but be an anthropologist who knows them better than anyone else.

### Reader Testimonials as Social Proof (This newsletter is growing up 🌱)
Five real reader quotes Lenny used to justify the transition to paid, demonstrating how to use social proof in a paywall announcement.

How it works: Quotes used:
1. 'Your writings have had a profound impact on me'
2. 'It's easily one of the most valuable emails I get every week'
3. 'Your posts have enabled me to accelerate my professional development'
4. 'It's transformed the way I work with my team'
5. 'It's making me smarter'

Pattern: Each quote is short (one sentence), speaks to a different type of value (emotional impact, relative ranking, career growth, team improvement, personal growth), and uses the reader's voice rather than the creator's claims.

### SaaS Pricing Model Analysis (~50 Companies) (Freemium vs. trial)
Analysis of pricing models across approximately 50 SaaS products, categorized by freemium, trial, or both.

How it works: Key findings from analyzing ~50 SaaS companies:
- ~50% of all SaaS companies offer BOTH freemium and trial
- ~90% of freemium products also offer a 7-30 day trial of paid plans
- Only 3 freemium products found with NO trial: Figma, Miro, Amplitude
- Only a handful with NO free offering at all: Workday, ADP, Superhuman, Stripe, MongoDB

Examples of freemium + trial: Slack, Canva, Airtable
Examples of trial-only (with hand-holding): Okta, ServiceNow, Snowflake, HubSpot, Front, Looker, Zendesk
Examples of business model disruption (core product free): Chime, Robinhood, Square, Microsoft Teams, Fortnite

### Segment's Monetization Timeline and Pricing Research (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36)
Detailed timeline of how Segment went from free to paid, including their use of Van Westendorp pricing survey

How it works: Timeline:
- Launched with free plan (client-side only)
- Added pricing pages ~1 month after launch
- Didn't build real self-service billing or start charging until ~9 months after launch
- Priority was nailing product-market fit and onboarding experience first

Pricing Research:
- Used Van Westendorp Price Sensitivity Meter survey sent to users in 2013
- Survey generates 4 pricing curves to plot what makes sense for most users
- Email asked users questions about price sensitivity to determine fair pricing

Conversion Approach:
- Early users: fully self-service (sent form/link to enter card in Stripe)
- Enterprise customers: worked with them directly to onboard
- Later built real self-service flow

Eventual pricing: Monthly flat-fee plus usage-based fee with freemium tier

### Segment's Path from Free to Paid (How today's fastest-growing B2B startups turned their early users into paying customers)
Detailed timeline of how Segment went from free product to paid plans over 9+ months

How it works: Timeline: (1) Launched with free plan for client-side only. (2) Added pricing pages about one month later. (3) Did not build self-service billing or start charging until ~9 months after launch. (4) Focused on nailing product-market fit and onboarding experience first. (5) Sent Van Westendorp pricing survey to users to determine fair price. (6) For enterprise customers, worked with them to onboard. (7) For early users, made it all self-service — sent form or Stripe link to enter credit card. (8) Later turned into a real self-service flow. Key insight: Delaying billing let them focus on product-market fit and understand pricing before building billing infrastructure.

### Shopify's Pricing Pivot (How today's fastest-growing B2B startups turned their early users into paying customers)
How Shopify's switch from percent-of-sale to SaaS pricing saved the company

How it works: Shopify was percent-of-sale only for the first year (3.75%). According to CEO Tobi Lütke, this 'totally didn't work.' They switched to the 'now common 3-plan monthly SaaS pricing' in 2007 or 2008. Lütke says this change 'saved the company.' Key takeaway: Transaction-based pricing didn't work for an e-commerce platform; switching to tiered monthly SaaS pricing was the fix.

### Shopify's Pricing Pivot That Saved the Company (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36)
How Shopify switched from a transaction-fee-only model to monthly SaaS pricing, which CEO Tobi Lütke says 'saved the company'

How it works: Initial model (Year 1): Percent-of-sale only at 3.75% — 'Totally didn't work'
Pivot (2007-2008): Switched to 3-plan monthly SaaS pricing
Outcome: 'That saved the company'

Key lesson: Pure transaction-fee models can be risky for early-stage B2B; predictable monthly SaaS pricing may be more sustainable.

### Slack's Launch Pricing Strategy (How today's fastest-growing B2B businesses turned their early users into paying customers – Issue 36)
How Slack launched with freemium and self-serve paid plans from day one

How it works: Approach:
- Launched with freemium plan from the start
- Included self-serve paid plan from day one
- No sales team at launch — only self-service
- Launched with roughly the same plan structure they have today
- Enterprise plan listed as 'coming soon'
- No inside sales at all initially
- Relatively early on added account execs to manage larger accounts and handle invoicing

Pricing model: Per-seat monthly subscription with freemium tier

### Snyk Utility Metric Journey (Scaling your B2B growth engine)
Detailed case study of Snyk evaluating multiple pricing metrics before landing on 'contributing developers'

How it works: Metrics evaluated:

1. **Number of tests** (initial choice)
   - Pros: Easily measured, easily explained
   - Cons: Doesn't align with value, incentivizes wrong behavior (test less often to save money), penalizes good architecture (splitting monolith into microservices = 10x more tests for same value)
   - Still used for free-tier limits due to simplicity

2. **Lines of code** (competitor approach)
   - 'Long been a terrible way to measure app size — why would moving a variable assignment to a new line suddenly cost more?'

3. **Number of apps/domains** (competitor approach)
   - Poor because some apps are huge and others tiny, hard to quantify

4. **Number of users** (considered)
   - Doesn't work: one developer can register and add Snyk to CI system doing builds for 100 developers

5. **Contributing developers** (final choice)
   - Definition: Developers who contributed code to protected apps in the last 90 days
   - Pros: Best correlation to value — more developers protected = more value delivered (productivity + risk reduction)
   - Cons: Not the easiest to measure
   - Result: Many in the industry have since embraced this measure

Key principle: Choose the metric with the best correlation to value delivered, even if it's harder to measure.

### Spotify's Freemium Conversion Benchmark (How to win in consumer subscription)
Spotify's freemium model conversion rates compared to the Skype benchmark

How it works: Benchmark at the time: Skype converted ~7% of users to pay at least something.

Spotify's results: Hit 7% within a few months, then continued climbing past 10%, 15%, 20%.

Magic trick: The illusion of having downloaded all of Napster to your hard drive, instantly accessible, for free. 200ms limit for response to scrubbing in a song.

Design approach: Made it mechanically similar to iTunes and Winamp to be familiar.

Key principle: If you're going to tear people out of an existing habit that works for them, you need to be 10x better — especially if that habit is free and you're charging $120/year.

### Subscription Model Sub-types (Types of business models)
Five distinct pricing structures within the subscription business model, each with a real-world company example

How it works: 1. Flat fee: Superhuman
2. Tiered plans: Notion
3. Per seat: Figma
4. Per host: Datadog, New Relic
5. Annual contracts: Oracle, gyms

### Survey of 60 Software Companies on Pricing Practices (The ultimate guide to willingness-to-pay)
Data on how rarely companies actually run pricing studies, used to motivate action

How it works: Irrational Labs surveyed 60 software companies:
- 50% said their companies have NEVER run pricing studies
- Only 25% reported even A/B testing a pricing change
- Only 8 of 60 companies said they used Van Westendorp
- Larger firms often have dedicated pricing staff but are still reluctant to change status quo

Three main reasons companies don't run pricing studies:
1. Too risky - fear of user backlash (Reddit, Strava, Patreon examples)
2. Technically complex - testing multiple prices in-market means maintaining them
3. WTP studies are hard to run - recruiting, writing, analyzing requires expertise

### Tinder Whale Discovery and Tinder Platinum Launch (Ravi Mehta)
Case study of discovering high-spending Tinder users, disproving assumptions through user research, and launching new monetization features

How it works: Discovery: Small single-digit % of users driving large % of a la carte revenue (boosts and super likes, spending hundreds per month). Hypothesis: High net worth users flaunting wealth. Reality (from user interviews): Average income users with intense use cases (military, sales travelers, new to city) who framed Tinder spend against cost of dating ($200+/month). Products launched: Tinder Platinum (third subscription tier with bundled consumables) and super-like-with-note (breaks the no-chat-before-match rule, priced higher than expected because of reframed utility).

### Two-Sided Marketplace Feature Prioritization (Madhavan Ramanujam)
An example of using willingness to pay to kill a bad feature idea.

How it works: A company wanted to build a 'Highlight Connections from Facebook' feature. Internal teams loved it. When tested with customers, they found zero willingness to pay (some hated it, some liked it but wouldn't pay, some wanted privacy). They killed the feature before wasting engineering resources.

### Udemy's High-Price Anchor Trust Strategy (How to build trust in a marketplace)
Udemy used high anchor prices ($199) to signal quality and trust, then discounted to $10, with revenue splits based on the discounted price.

How it works: Udemy purposely had instructors set prices very high ($199). High prices signal value — 'If it's this much, I can trust it!' Then they discounted courses to $10. Because they split revenue with instructors on the actual sales price ($10), margins were fine. This served dual purpose: building trust with students through perceived value, and maintaining healthy economics.

### Usage-Based Model Sub-types (Types of business models)
Three distinct pricing structures within the usage-based business model, each with a real-world company example

How it works: 1. One-off cost: Twilio
2. Per second usage cost: AWS EC2, S3
3. Per mile: Metromile

### Value Metric Examples from Real Companies (Pricing your SaaS product)
Six real-world examples of creative value metrics beyond per-seat pricing

How it works: 1. Wistia: Charges by number of videos or channels used/owned
2. Zapier: Invented the concept of a 'zap' (connection of software) and charges based on time to connect
3. Theater in Barcelona: Charged based on number of laughs (per-laugh pricing)
4. Husqvarna: Charges based on time for lawn care products vs. making customers buy them
5. Rolls Royce: Charges per mile for airplane engines — they own the engines on your plane and do all maintenance
6. Fresh Patch: Charges based on amount of grass delivered per month for your dog

Additional examples:
- ProfitWell Retain: Charges on amount of churn recovered (pure value metric — measured and agreed upon by customer)
- MainStreet: Charges a percentage of tax credits found (pure value metric)
- HubSpot Marketing: Pure value metric would be revenue driven, but that's hard to measure. Proxy metric = number of contacts. Gives unlimited seats to reduce friction, and usage (blog posts, email campaigns, landing pages) drives contacts, which drives revenue.

### Van Westendorp 4 Questions (The ultimate guide to willingness-to-pay)
The exact four questions used in a Van Westendorp pricing study

How it works: Ask participants these four open-ended questions (empty text box response):

1. At what price would it be so low that you would start to question this product's quality?
2. At what price do you think this product is starting to be a bargain?
3. At what price does this product begin to seem expensive?
4. At what price is this product too expensive?

Note: This gives you what people WANT to pay, not what they MIGHT pay. Proceed with caution due to hypothetical bias unless you add incentive-compatible elements.

## Tools

### Participant Recruitment Platforms for Pricing Studies (The ultimate guide to willingness-to-pay)
Recommended platforms for recruiting study participants for WTP research

How it works: Consumer / Non-niche audiences:
- Prolific (recommended by Irrational Labs): ~$2,000 for 1,000 participants for a 10-minute study. Sign up at https://app.prolific.com/register/researcher/email for $10 off first study.
- Sago (https://sago.com)
- Guidepoint (https://guidepoint.com)
- Disqo (https://www.disqo.com/solutions/researchers/)
- Respondent (https://www.respondent.io/)

Discrete Choice / Conjoint survey design tools:
- Qualtrics (used by Irrational Labs) - has survey design packages for conjoint
- SurveyMonkey - has strong discrete choice examples on their blog
- Conjointly (https://conjointly.com)

### Van Westendorp Pricing Survey (Nick Turley)
A standard 4-question survey used to determine user willingness to pay.

How it works: Nick deployed this via a Google Form to the OpenAI Discord community to quickly land on the $20/month price point for ChatGPT Plus.

### a16z Pricing Tiers Database (50+ SaaS Products) (Freemium vs. trial)
Airtable database collected by a16z showing pricing tiers of 50+ SaaS products for benchmarking and inspiration.

How it works: Airtable link: https://airtable.com/shrCT6ToQg0xnCvZA/tblkxppVHddRti4l4 — Contains pricing tiers and packaging details for 50+ SaaS products, useful for benchmarking free vs. paid feature decisions.

