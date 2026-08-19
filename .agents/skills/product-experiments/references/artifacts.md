# Product Experimentation Excellence - Frameworks, Templates & Checklists

*49 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 5 Pillars of Experimentation Culture (Fostering a culture of experimentation)
A framework of five key areas to build a strong culture of experimentation, derived from Airbnb's approach

How it works: 1. 🤓 HIRING: Hire data-minded people early and often. Consider a full-time data person as one of your first hires. Get a senior DS into leadership.
2. 🔭 ALIGNING: Align around a measurable north-star metric. Use it as a common denominator for comparing projects and prioritizing investment. Layer on additional metrics over time for healthy growth.
3. 🔗 EMBEDDING: Embed data scientists into cross-functional product teams (transition from centralized at ~25 DS people). DS should participate in roadmap planning, not just post-facto analysis. Centralize processes, tooling, and knowledge repos.
4. 💞 HUMANIZING: Frame data as the voice of customers at scale. Be data-informed (data as input) not data-driven (blindly following data). Demonstrate practical value to win over resistant functions.
5. 🛠 BUILDING: Make it effortless to run and analyze experiments. Start simple and scrappy, evolve over time. Establish a single source of truth for metrics. Ensure teams trust the results.

### Bayesian A/B Testing for Institutional Learning (Ramesh Johari)
Using Bayesian priors in experimentation to encode past learning, so that 'failed' experiments contribute value by updating the organization's beliefs for future experiments

How it works: Problem: Frequentist stats treat each experiment in isolation, throwing away past learning. Solution: Build prior beliefs from past experiments → combine with new experiment data → produce posterior conclusions. Cultural benefit: A 'failed' experiment that moves the prior is still valuable because it changes how all future experiments in that area are analyzed. Creates information positive externalities across the organization.

### CUPED (Controlled-experiment Using Pre-Experiment Data) (Ronny Kohavi)
A variance reduction technique that uses pre-experiment data to adjust experiment results, producing unbiased estimates with lower variance and requiring fewer users.

How it works: Uses pre-experiment data to adjust post-experiment metrics. Result is unbiased but with lower variance. Reduces number of users needed for statistical significance. Published paper available.

### Confidence Interval Adjustment for Speed (When NOT to run an experiment – Issue 54)
A tactical recommendation to lower your statistical confidence threshold when moving fast at earlier stages

How it works: When you're moving fast and are OK with shipping slightly negative experiments occasionally, lower your confidence interval to something like 85% (instead of the standard 95%). This reduces the required sample size and experiment duration. As you scale up and the stakes increase, you can increase the confidence interval back up. Attributed to Yair Livne.

### Decision Framework for Failed Experiments: Kill, Iterate, or Ship (Communicating bad news - Issue 26)
Three options to evaluate when a project experiment shows negative results

How it works: When an experiment or project shows negative metrics, PMs should recommend one of three paths:

1. ITERATE ONE MORE TIME: Continue working on the project with specific improvements based on learnings
2. KILL IT: End the project and move resources to other priorities
3. SHIP IT ANYWAY AND CLAW BACK: Launch the experience despite negative results and work to recover the negative impact over time

The PM is in the best position to make this recommendation and leaders will look to you to inform the decision.

### Experimentation Maturity Model (Crawl-Walk-Run-Fly) (Ronny Kohavi)
A six-axis framework for assessing and advancing an organization's experimentation capability, from crawl stage to fly stage.

How it works: Six axes (referenced in a published paper). Used in consulting to assess where an org is on each axis. Helps determine what to build next. Paper to be linked in show notes.

### Fail Conclusively (Maximize Treatment Effect) (Sri Batchu)
For B2B experiments with limited sample sizes, maximize the treatment effect by testing all possible tactics simultaneously rather than incrementally

How it works: Two ways to make experiments succeed: large N (sample size) or significant treatment effect. B2B typically lacks large N. Steps: 1) Define the hypothesis, 2) Identify ALL possible tactics that could prove the hypothesis (trigger, content, personalization, design, etc.), 3) Deploy all of them simultaneously in the test, 4) If it fails with maximum effort → the hypothesis is wrong, stop repeating it, 5) If it works → run cost-optimization experiments to isolate which tactics matter most. Use this for expensive, time-consuming cross-functional tests; for cheap quick tests (emails, website copy), iterate normally. ~30% experiment success rate is typical.

### False Positive Risk (Bayesian reinterpretation of P-values) (Ronny Kohavi)
The actual probability that a statistically significant result is a false positive, computed using Bayes' rule with historical success rates as the prior. Much higher than the commonly assumed 5%.

How it works: Formula applies Bayes' rule: P(hypothesis|data) requires prior probability of success. At Airbnb search (8% success rate), p<0.05 yields 26% false positive risk. Mitigation: for p between 0.01 and 0.05, replicate the experiment and combine using Fisher's or Stouffer's method.

### Five Benefits of Running Experiments (When NOT to run an experiment – Issue 54)
A list of five distinct reasons why experiments are valuable for product teams

How it works: 1. LEARNING: Experiments help you learn about your users
2. DECIDING: Experiments tell you if your change had the intended consequence
3. AVOIDING: Experiments catch unintended consequences
4. QUANTIFYING: Experiments precisely quantify the impact of your changes (and your team)
5. ALIGNING: Experiments settle subjective debates

### Five Downsides of Running Experiments (When NOT to run an experiment – Issue 54)
A list of five risks and costs associated with running experiments

How it works: 1. TIME: Experiments take time to set up and run
2. FALSE CONFIDENCE: Experiments can create false confidence based on misinterpreted results
3. SHORT-TERM THINKING: Experiments can push you to think short-term
4. NARROW-THINKING: Experiments disincentivize taking bets that are hard to measure
5. BAD PRODUCT: Experiments can introduce awkward user-experiences or legal risk

### GPS Analogy for Intentionality vs A/B Testing (Sanchan Saxena)
Mental model for when to use vision/intuition vs data: you set the destination (intentionality), then use A/B tests as GPS to find the fastest route there.

How it works: You never get in your car and ask GPS where to go. You tell it the destination, then GPS finds the optimal route. Similarly: 1) Start with intentionality — what customer problem do you want to solve, what experience do you want to create, 2) Use A/B tests to find the fastest route to that end state, 3) Don't use A/B tests to discover the destination. Anti-pattern: PM says 'here are 10 assumptions I want to test' without first stating the intentionality of the product.

### GiveDirectly's Experimentation Strategy Framework (How GiveDirectly increased donations by over $3 million/year through experimentation)
Three principles for running product experiments, especially for small teams with limited resources.

How it works: 1. Balance small optimizations and big bets: Running low-effort tests helps balance out the riskiness of bigger bets and maintains team morale when experiments don't go as planned. Low-hanging fruit and basics can have a bigger payoff than expected.
2. Get out of the way: Visitors are already interested—remove steps in the funnel and provide an effortless checkout experience before users change their minds. This is one of the most impactful things you can do.
3. Test ideas before building anything: Validate direction with lightweight tests (e.g., email-based tests, no engineering required) before investing significant resources in building a product.

### Hierarchy of Evidence (Ronny Kohavi)
A trust hierarchy for evaluating claims: anecdotal < observational study < natural experiment < controlled experiment < multiple controlled experiments.

How it works: Levels from lowest to highest trust: 1) Anecdotal (don't trust), 2) Observational study (some trust), 3) Natural experiment (more trust), 4) Controlled experiment (high trust), 5) Multiple controlled experiments (highest trust). Many published observational studies later proven directionally incorrect by controlled experiments.

### Long-Term Experiment Holdout System (Archie Abrams)
A system for measuring the true long-term impact of product changes by keeping a control group for up to a year.

How it works: 1. Keep a 5% global holdout for all changes in a quarter. 2. For new user experiments, run a 50/50 split for a few weeks, then ship the winner to 100% but continue tracking the original cohort. 3. Send automated email pings to the experiment team at 3, 6, 9, and 12 months with updated results.

### Long-Term Holdout Experiment Method (How Duolingo builds product)
A technique for measuring long-term effects of features like social by maintaining a control group for 3+ months

How it works: Method: Launch the experiment condition to the majority of users. Hold a small percentage of users in the control condition for a long time (more than 3 months). Use case: Social features have long-term effects because it takes time for learners to add friends and have meaningful interactions. Standard short-term A/B tests may not capture the full impact. This technique allows measuring effects that compound over time. Part of Duolingo's broader experimentation methodology (200+ A/B tests running at any time, every product change tested as an A/B experiment).

### OFAT (One-Factor-At-a-Time) (Ronny Kohavi)
Testing one change at a time rather than bundling multiple changes in a redesign, to isolate which factors drive positive or negative results.

How it works: Instead of shipping 17 changes together (which is more likely to be net negative), test each factor independently. Learn from each, adjust, and ship only the ~4 out of 17 that are positive. Avoids sunk cost fallacy of shipping large negative redesigns.

### Practical defaults for experimentation (Ronny Kohavi)
A set of recommended defaults for running experiments including minimum sample sizes, effect sizes to target, and when to start experimenting.

How it works: From a talk by Ronny: For a retail site targeting 5% minimum detectable effect on conversion rate, need ~200,000 users. Below tens of thousands, statistics don't work. Startups should target 5-10% effects (not 1%). At 200,000 users, 'the magic starts happening.'

### Prediction vs. Decision-Making (Correlation vs. Causation) (Ramesh Johari)
Framework for ensuring data scientists focus on causal decision-making rather than pure prediction, distinguishing between 'who has the highest LTV' (prediction) and 'whose LTV will increase most because of this action' (decision)

How it works: Key distinction: Prediction picks up patterns in past data (correlation). Decision-making evaluates the incremental impact of an action (causation). Example: Don't send promotions to highest-LTV customers. Instead, send to customers whose LTV will increase the most because of the promotion. The differential matters, not the absolute.

### Sample Ratio Mismatch (SRM) check (Ronny Kohavi)
A statistical test to verify that the ratio of users in control vs. treatment matches the designed ratio. The single most important validity check for any A/B test.

How it works: If designed 50/50 split, check actual ratio using chi-squared test. Even 50.2/49.8 with 1M users can be a red flag (1 in 500,000 chance). Common causes: bots hitting control/treatment differently, data pipeline filtering skew, campaigns pushing users asymmetrically. ~8% of experiments at Microsoft had SRM. Spreadsheet available for calculation.

### Surprising Experiment Definition (Ronny Kohavi)
A framework for identifying the most learning-rich experiments by measuring the absolute difference between expected and actual results, not just looking at winners.

How it works: Surprising = |estimated result - actual result| is large. Categories: 1) Expected great, turned out flat (learn something), 2) Expected small, turned out great (big learning, e.g., ad title promotion), 3) Expected small, turned out very negative (insight from failure, e.g., Windows indexer killing battery life). Used for quarterly review meetings.

### Three Reasons to Skip an Experiment (When NOT to run an experiment – Issue 54)
A decision framework with three distinct scenarios where shipping without an experiment is the right call

How it works: Skip an experiment when:

1. IT'LL TAKE TOO LONG TO GET ACTIONABLE RESULTS
- Ask: How long do you expect your experiment to take before you have conclusive results? Is waiting that long for this change worth it?
- Run the math on required sample size before committing
- Example: A 5% change on a 10% converting step requires 60,000+ users per variation (120,000 total)
- Consider lowering confidence interval to 85% when moving fast
- For long-term metrics (brand, network effects, retention), launch with a small holdout instead

2. THE DOWNSIDE RISK IS LOW (AND THE EFFORT IS HIGH)
- Ask these 5 questions:
  a. Is your change a best practice and already worked well for others? (e.g. moving buttons above the fold, fewer steps in a flow, making your pitch clearer)
  b. Will you be able to detect significant negative impact in other ways? (e.g. before/after data, CX)
  c. What's the most negative impact you've ever seen from an experiment like this?
  d. What will you concretely do with experiment results once you have them?
  e. What's been the typical time for your team to set up and analyze experiments?
- Core decision: What's the bigger risk — making this change without an experiment, or taking your team's time from higher-impact work?
- If experiments are quick (few hours): run it. If experiments are painful and change is benign: skip it.

3. YOU'RE LAUNCHING SOMETHING COMPLETELY NEW
- No control group exists to compare against
- Set independent success criteria instead (e.g. specific retention rate, new user signup threshold)
- Especially true if going back to the previous product is not an option

### Twyman's Law (Ronny Kohavi)
Any figure that looks interesting or different is usually wrong. Used as a heuristic to investigate suspiciously large experiment results before celebrating — 9 out of 10 times, a flaw is found.

How it works: Heuristic: If normal metric movement is <1% and you see 10%+, investigate before celebrating. Named after a UK radio media professional. 9/10 times a flaw is found. First step: check for sample ratio mismatch. Second: check data pipeline. Third: replicate the experiment.

### Whole Pie Impact Calculation (Product Amdahl's Law) (The secret to Duolingo’s exponential growth)
Framework for calculating total experiment impact by factoring in what percentage of users will actually see the change

How it works: Principle: Total impact = percentage improvement × percentage of users who see it

This is the product version of Amdahl's Law.

Factors that reduce the 'pie':
- Feature only on some platforms (iOS but not Android/web)
- Feature only for certain user segments (paid users, specific UI languages)
- Feature buried deep in menus (rarely seen)
- Feature only for specific use cases (e.g., Korean stories = 0.007% of DAUs)

Duolingo example:
- Notification icon change affecting 0.1% DAU for ALL users > 30% DAU improvement for Korean stories users (0.007% of DAUs)
- The notification change is ~50x more impactful

Opt-in vs. Opt-out corollary:
- If only 33% of users opt in, a feature needs a 9% gain just to match a 3% gain from an opt-out feature
- Design recommendation: Invest time to make features good for nearly all users (opt-out) rather than making a more advanced feature that's only appropriate as opt-in
- Duolingo leaderboard example: Made it opt-out so a huge percentage would experience it rather than never finding or trying it

## Checklists

### Experiment doc hypothesis requirements (Ramesh Johari)
What every experiment document should include beyond just treatment/control definition — hypotheses about business learning

How it works: Each experiment doc should articulate: (1) What will we learn about a business flow or funnel? (2) What will we learn about user preferences (guests, hosts, etc.)? (3) What will we learn about demand elasticity or behavioral response? (4) What hypotheses are being tested beyond 'does this win?' This creates a culture where learning is expected alongside impact measurement.

### Experiment success rate benchmarks by company maturity (Ronny Kohavi)
Reference failure rates for experiments across companies at different optimization levels, useful for setting expectations.

How it works: Microsoft overall: ~66% failure rate. Bing (highly optimized): ~85% failure rate. Airbnb search (highly optimized): 92% failure rate. Booking/Google Ads: 80-90% failure rate. Key insight: more optimized domains have higher failure rates. ~10% of experiments aborted on first day (usually implementation bugs, not bad ideas).

### Experimentation Tooling Build Strategy (Fostering a culture of experimentation)
Guidelines for when and how to build experimentation infrastructure

How it works: Early stage: Don't overinvest in tooling when systems are still in flux (data schemas changing, infrastructure evolving). But DO ensure quick access to experiment results data. Build something simple and scrappy first. Scaling stage: Evolve tooling to support team's growing needs. Eventually dedicate a full-time team to building, supporting, and growing data tooling. Critical foundations: (1) Establish a single source of truth for metrics. (2) Invest in data infrastructure that teams can trust. (3) It's better to operate with intuition than with incorrect data. Reference: Airbnb's search team built their own tooling out of frustration with experiment turnaround time, which became the foundation for all experimentation.

### Low-Volume Experimentation Techniques (Brian Tolkin)
A list of alternative methods to build conviction when you lack the sample size for a traditional 95%-confidence A/B test.

How it works: 1. Talk to more customers. 2. Use observational data (diff-in-diff). 3. Look at sister cities or twin cities. 4. Segment by geography. 5. Reduce statistical power/confidence requirements (e.g., accept 80% confidence). 6. Use long-term holdouts. 7. Ship on intuition but establish a rigorous alternative feedback loop (e.g., support ticket volume).

### Risk Assessment Questions Before Running an Experiment (When NOT to run an experiment – Issue 54)
Five questions to evaluate whether the risk/reward of running an experiment is worth it

How it works: Before running an experiment, answer these questions:
1. Is your change a best practice and already worked well for others? (e.g. moving buttons above the fold, fewer steps in a flow, making your pitch clearer, etc.)
2. Will you be able to detect significant negative impact in other ways? (e.g. before/after data, CX)
3. What's the most negative impact you've ever seen from an experiment like this?
4. What will you concretely do with experiment results once you have them?
5. What's been the typical time for your team to set-up and analyze experiments?

Then ask the core question: What's the bigger risk — making this change without an experiment, or taking your team's time from higher-impact work?

## Examples

### Airbnb 'Guess the Winner' Experiment Review Ritual (Fostering a culture of experimentation)
A team ritual where experiment results are presented and the audience votes on which variant won before results are revealed

How it works: Format: A roundup of experiment results across the growth team. Process: (1) Someone explains the experiment setup (e.g., 'We showed 50% of users this banner, and 50% saw nothing...'). (2) The audience votes on which variant won. (3) Results are revealed. Key learning: It shocked everyone that so often, the intuitive variant was not the winner. Example: A banner increased banner clicks but decreased bookings (the north-star metric). Purpose: Builds humility about not knowing the right answer, which is essential to a data-driven culture.

### Airbnb 'Sort by Price' Experiment (Fostering a culture of experimentation)
A real example of how experimentation prevented a seemingly obvious feature that would have hurt the business

How it works: Feature: 'Sort by price' filter (vs. existing price range filter). Hypothesis: Letting users sort by price would be an obvious UX win. Result: Every time a team attempted to add this feature, conversion plummeted. Why: Travelers unknowingly focused on listings that were lower-rated, with hosts who were less responsive and rejected more often. This led to bad experiences and travelers leaving forever. Impact: Without this data, hundreds of thousands of guests would not have found a place to stay over the years. Lesson: Data and experimentation can prevent well-intentioned features from destroying value.

### Airtable Forms Feature Launch (Lauryn Isford)
An example of shipping a feature without an A/B test based on strong customer conviction.

How it works: The team built a feature allowing form submitters to request a copy of their submission. They gated it on account creation and rolled it out without an A/B test because qualitative research proved it was net-good for users, using post-launch attribution to measure impact instead.

### Bing ad title promotion experiment ($100M revenue impact) (Ronny Kohavi)
Moving the second line of ad text to the first line (making the title larger) was the biggest revenue-generating idea in Bing's history, worth ~$100M annually, despite languishing in the backlog for months as a low-priority idea.

How it works: A simple change (promote second ad line to first line, making title larger) triggered a revenue alarm. Replicated multiple times. Did not hurt user guardrail metrics. Led to follow-on experiments about font size, color, etc. Took only a couple of days to implement.

### Booking.com's Google Translate A/B Testing for Ad Copy (Top 5 most interesting things about Booking.com's early growth strategy – Issue 46)
Booking.com used Google Translate for ad copy localization even at scale, and A/B tested it against human translations

How it works: Approach:
- Used Google Translate for all ad copy localization, even when spending billions
- Team members (local speakers) were often upset about the quality of translated copy
- When team members provided 'better' human-written copy, they A/B tested it against the Google Translate version
- Google Translate copy often won the A/B test
- Principle: Keep what works regardless of what would be 'better' according to local speakers

Key takeaway: Data-driven decisions > expert opinion, even for something as seemingly qualitative as language and copy

### Cart Copy Change Driving Conversion (Tim Holley)
A single line of text about carbon offset in the cart experience that drove significant unexpected conversion uplift

How it works: Change: Added text to cart page stating 'Etsy offsets carbon emissions from every delivery.' Result: Significant conversion uplift that was unexpected. Insight: Communicated company values in a way that resonated deeply with Etsy's buyer demographic. Minimal engineering effort, outsized business impact.

### Centered's 2x Web Conversion Win (How to win in consumer subscription)
A specific design change that doubled web conversions for Centered

How it works: Change: Stripped everything above the fold — removed header links, platform-specific download links, and all other elements. Forced new subscriptions into a single CTA.
Result: 2x'd web conversions.

### Donor-Recipient Matching Experiment (Failed Big Bet) (How GiveDirectly increased donations by over $3 million/year through experimentation)
A detailed case study of building and deprecating a donor-recipient matching product, including what didn't work and what they learned.

How it works: Product: Donors fund a basic income at $40/month, get matched with the specific person receiving funds, and receive quarterly emails with photos and quotes.

Ethical differentiators: (1) No choosing recipients—matched with next person in queue. (2) No poverty porn—adults only, informed consent, unedited stories. (3) No middlemen—GiveDirectly runs end-to-end operations.

Operational costs: (1) Field teams visiting remote villages quarterly to gather photos/quotes/translations. (2) 20+ hours/month of product team manual QA. (3) High volume of donor inquiries about delayed updates.

Results: (1) No significant impact on conversion (p=0.69 in 2-month A/B test vs. generic 'send someone a monthly basic income'). (2) Short-term retention boost that faded—churned at same rate as other monthly donors eventually.

Decision: Deprecated in late 2023. Costs and complexity outweighed initial retention benefits.

Pivot: Matched donors to villages instead of individuals. Village-specific email had 58% higher CTR and 2x positive written responses vs. country-level email. Much lower operational cost.

### Experimentation Platforms at Top Companies (How to get into product management, Startup PM vs. big company PM)
Real examples of how top tech companies run A/B testing and experimentation, recommended as study material for aspiring PMs

How it works: 1. **Airbnb** — Experiments at Airbnb (Airbnb Engineering blog)
2. **Uber** — XP experimentation platform (Uber Engineering blog)
3. **Netflix** — 'It's All A/Bout Testing' — The Netflix Experimentation Platform (Netflix Tech Blog)
4. **Pinterest** — Building Pinterest's A/B Testing Platform (Pinterest Engineering blog)

Lenny recommends studying these platforms and finding a way to launch an experiment or two at your own company.

### GiveDirectly's case for cash transfers as charity (How GiveDirectly increased donations by over $3 million/year through experimentation)
Evidence-based argument for why direct cash transfers are an effective charitable intervention.

How it works: 1. Cash works: 500+ academic studies (basically A/B tests for charity interventions). Proven to improve income, psychological well-being, food security, entrepreneurship, education. Also unexpected benefits: improved gender equity, reduced domestic violence, reduced alcohol/drug use.
2. Tech-enabled: Sent directly to families via mobile money technology. Scalable. Uses AI for targeting to deliver emergency cash faster or even before disasters.
3. Respectful and anti-paternalistic: People in poverty know what they need. Top-down decisions (laptops, water pumps, chickens) often haven't worked. Cash lets people make their own choices.
4. Simple: Sometimes people who don't have money just need money.

Example: $850 per family in Baringo, Kenya (one of the poorest regions). Spent on food, school fees, small businesses, medical care, first mattress. Less than half the cost of average Bay Area monthly rent can be life-changing for an entire family.

### Homepage Redesign Three-Arm Test ($700K/year lift) (How GiveDirectly increased donations by over $3 million/year through experimentation)
A three-arm A/B test separating the effects of visual design and embedded donation form on homepage conversion.

How it works: Test arms:
1. Control: Old simple/bare-bones homepage with donate button
2. New polished design with donate button (link to separate page)
3. New polished design with embedded donation form on the homepage

Results: Arm 3 (new design + embedded form) increased visitor-to-donor conversion by 35%—from 1.98% to 2.67%. Breakdown: 20% of the uplift came from the embedded donation form, 15% from the improved design. Nonprofit industry average conversion is ~1%.

Result: $700,000/year incremental donations (second biggest lift ever).

Key insight: Both design quality and reducing clicks to conversion matter independently. Embed the conversion action on the page rather than linking to a separate flow.

### Instacart Long-Term Holdouts (Sri Batchu)
Instacart maintained permanent holdout groups for each product surface area to measure cumulative impact of all improvements over time

How it works: Each surface area team (checkout, ads, etc.) had a small permanent holdout group experiencing the old version. Could compare cumulative impact of all improvements (last half's experience vs this half's) on MAO. Used alongside regression analysis for translation factors. Included an advertising holdout where some users never see ads — creates internal debate about permanent holdouts for revenue-driving features.

### Netflix Perfect New Release A/B Test (Gibson Biddle)
A case study on testing customer stated desires versus actual business impact.

How it works: Test cell of 10k users got next-day DVDs. Control got them in ~2 weeks. Result: Retention only improved from 4.5% to 4.45% churn. Math: Saved 5k customers * $100 LTV * 2x word of mouth = $1M value. Cost of inventory = $5M. Decision: Do not roll out.

### Open in new tab experiment (cross-company pattern) (Ronny Kohavi)
Opening search results in a new tab instead of navigating away was one of the biggest wins at Microsoft (2008), Airbnb, and likely other companies — a reusable pattern that works across products.

How it works: First tested at Microsoft ~2008 for Hotmail and MSN search. Heavily debated by designers. Produced highly surprising positive results. At Airbnb, was implemented for listings but forgotten for newer features until Ronny reintroduced it.

### Sample Size Calculation Example for Sign-up Flow (When NOT to run an experiment – Issue 54)
A concrete example showing how many users are needed to detect a 5% change on a step converting at 10%

How it works: Scenario: You want to measure the conversion impact of a copy change on the last step of your sign-up flow, which is currently converting at 10%.

Question: How many users would need to go through this step to notice a 5% change in conversion?

Answer: Over 60,000 unique users per variation (120,000 total users through the flow). For most startups, this takes far too long.

Implication: Until you are at significant scale, experiments probably aren't even worth thinking about, particularly on features buried within your product.

### Unauthorized holdout group at real estate platform (Ramesh Johari)
A marketing data science manager held out a group of visitors from all innovations for a year without authorization, costing millions but proving the team's value

How it works: A marketing DS manager at a real estate platform held out visitors from all innovations for a year. At year end, the holdout showed the team's work was worth several million dollars. Manager's defense: 'Now you know what my team's worth, and you'd never have known without this.' Illustrates that learning has a real cost (the forgone revenue in the holdout group), and you have to be willing to pay that cost to gain knowledge.

### Windows indexer experiment (unexpected battery drain) (Ronny Kohavi)
An improved Windows indexer showed better relevance in offline tests but killed laptop battery life when A/B tested, demonstrating the value of live experiments catching unexpected side effects.

How it works: Offline tests showed improved indexing relevance. Live A/B test revealed excessive CPU consumption on laptops, killing battery life. Documented as institutional learning to incorporate battery/CPU as a factor in future indexer iterations.

## Tools

### Airbnb Experimentation Reading List (Fostering a culture of experimentation)
A curated list of Airbnb engineering blog posts about their experimentation infrastructure and culture

How it works: 1. '4 Principles for Making Experimentation Count' by Lindsay Pettingill (Airbnb Engineering blog)
2. 'At Airbnb, Data Science Belongs Everywhere — Insights from Five Years of Hypergrowth' by Riley Newman (Airbnb Engineering blog)
3. 'An island of truth: practical data advice from Facebook and Airbnb' by James Mayfield (Towards Data Science)
4. 'Experiments at Airbnb' by Jan Overgoor (Airbnb Engineering blog)
5. 'Experiment Reporting Framework' by Will Moss (Airbnb Engineering blog)
6. 'Scaling Airbnb's Experimentation Platform' by Jonathan Parks (Airbnb Engineering blog)
7. 'Data Infrastructure at Airbnb' by James Mayfield (Airbnb Engineering blog)
8. 'Growth tech talk' by Nick Handel (Airbnb Design)

### Power Analysis Calculator (Brian Tolkin)
A statistical tool used before launching an experiment to determine if a test is actually viable.

How it works: Inputs required: Expected traffic/volume, acceptable runtime (e.g., 1 month vs 6 months), and minimum detectable impact. Used to prevent the mistake of running a test for a month only to realize it was never going to reach significance.

### SRM (Sample Ratio Mismatch) spreadsheet calculator (Ronny Kohavi)
A spreadsheet where you input users in control, users in treatment, and designed ratio to calculate the probability the mismatch happened by chance.

How it works: Input: number of users in control, number in treatment, designed split ratio. Output: probability this split could happen by chance. Available from Ronny Kohavi.

### goodui.org (Ronny Kohavi)
A website that collects A/B test results from across companies and organizes them into ~140 reusable UI patterns with success rates and effect sizes.

How it works: Run by Jakub Linowski. ~140 patterns. Each pattern shows how many times it helped, success rate (e.g., 3 out of 5), and magnitude. Includes patterns like 'open in new tab.' Crowdsourced from practitioners.

