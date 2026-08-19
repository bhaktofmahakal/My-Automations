---
name: product-experiments
description: Help users design, execute, and analyze product experiments to validate hypotheses and measure true incremental impact while avoiding common statistical pitfalls.
---

# Product Experimentation Excellence

Drive measurable growth and mitigate risk through rigorous A/B testing and data-driven learning.

Help the user with product experimentation excellence using insights from 9 guests and posts across Lenny's Podcast and Newsletter.

## How to Help

1. **Hypothesis Definition** - Guide the user in drafting clear, falsifiable hypotheses based on user behavior theories.
2. **Experimental Design** - Help determine the right metrics, sample sizes, and guardrail metrics for a clean test.
3. **Statistical Analysis** - Support the interpretation of p-values, confidence intervals, and potential sample ratio mismatches.
4. **Strategic Evaluation** - Assist in deciding whether to ship, iterate, or kill a feature based on experiment results and long-term business impact.

## Core Principles

### Use long-term holdouts for true incrementality
Archie Abrams: "So we constantly will relook at an experiment a year later, see that the way the GMV curve for the distribution was different than we might've originally thought. And that'll actually change what we do from that previous experiment. And so there's a lot of longterm monitoring of experiments over these very long time horizons to both inform what those input metrics are and more importantly hold ourselves accountable to, did we actually move what we cared about, which is that longterm GMV, in the right way?"

Implement holdout groups for one or more years to distinguish between immediate growth and short-term pull-forward effects. This ensures you are measuring the genuine downstream business impact of changes.

### Focus experiments on risk mitigation
Lauryn Isford: "So, with all that said, generally my advice is to experiment when you need to and to primarily see it as a risk mitigation tactic when you're making dramatic changes and to let the product development process do more work. So, spend more time with customers, be more rigorous in understanding precisely what problem you're solving, get mocks in front of people and see how they react, and hopefully have more conviction than you otherwise would when you ship something that it's okay if every customer sees it tomorrow and that the experiment doesn't actually matter as much."

Prioritize A/B testing for high-stakes, dramatic product changes rather than using it solely for precise metric attribution. Invest in qualitative research first to build conviction before launching high-risk tests.

### Balance success metrics with guardrails
Ronny Kohavi: "It's very easy to increase revenue by doing theatrics. Displaying more ads is a trivial way to raise revenue, but it hurts the user experience. And we've done the experiments to show that. In this case, this was just a home run that improved revenue, didn't significantly hurt the guardrail metrics."

Develop a robust Overall Evaluation Criterion (OEC) that includes guardrail metrics. This prevents short-term wins from inadvertently degrading the long-term user experience or retention.

### Normalize a high failure rate
Ronny Kohavi: "At Bing, which is a much more optimized domain after we've been optimizing it for a while, the failure rate was around 85%. So it's harder to improve something that you've been optimizing for a while. And then at Airbnb, this 92% number is the highest failure rate that I've observed."

Expect that 80 percent to 92 percent of experiments in optimized domains will fail. Calibrating team expectations around these industry standards prevents discouragement and maintains high testing volume.

### Skip testing for low-risk best practices
From "When NOT to run an experiment – Issue 54": "If you can run experiments quickly and easily (e.g. a few hours), this decision is generally easy: run the experiment. If running experiments is a pain in the butt, and the changes are relatively benign, you can probably skip the experiment."

Shipping directly is often superior to experimenting when the time required for statistical significance outweighs the data value. Avoid formal tests for standard industry practices where downside risk is minimal.

### Apply Twyman's Law to surprising wins
Ronny Kohavi: "We can talk later about Wyman's law, but that was the first reaction, which is, 'This is too good to be true. Let's find a bug.' And we did. And we looked for several times, and we replicated the experiment several times, and there was nothing wrong with it."

Treat any result that looks too good to be true with immediate skepticism. Conduct rigorous bug-hunting and replicate surprising results multiple times to ensure they are not technical flukes.

## Templates & Frameworks

- **Three Reasons to Skip an Experiment** (When NOT to run an experiment – Issue 54) - A decision framework with three distinct scenarios where shipping without an experiment is the right call
- **Whole Pie Impact Calculation (Product Amdahl's Law)** (The secret to Duolingo’s exponential growth) - Framework for calculating total experiment impact by factoring in what percentage of users will actually see the change
- **5 Pillars of Experimentation Culture** (Fostering a culture of experimentation) - A framework of five key areas to build a strong culture of experimentation, derived from Airbnb's approach
- **Risk Assessment Questions Before Running an Experiment** (When NOT to run an experiment – Issue 54) - Five questions to evaluate whether the risk/reward of running an experiment is worth it
- **Long-Term Holdout Experiment Method** (How Duolingo builds product) - A technique for measuring long-term effects of features like social by maintaining a control group for 3+ months
- **Sample Size Calculation Example for Sign-up Flow** (When NOT to run an experiment – Issue 54) - A concrete example showing how many users are needed to detect a 5% change on a step converting at 10%
- **Decision Framework for Failed Experiments: Kill, Iterate, or Ship** (Communicating bad news - Issue 26) - Three options to evaluate when a project experiment shows negative results
- **Sample Ratio Mismatch (SRM) check** (Ronny Kohavi) - A statistical test to verify that the ratio of users in control vs. treatment matches the designed ratio. The single most important validity check for any A/B t

See `references/artifacts.md` for the full list with details.

## Questions to Help Users

- "What is the core psychological hypothesis you are testing with this change?"
- "What are the guardrail metrics we need to monitor to ensure we don't hurt the long-term experience?"
- "Do we have enough traffic to reach statistical significance within a reasonable timeframe?"
- "Is the potential lift from this experiment worth the engineering and analysis time compared to shipping a known best practice?"
- "How does this experiment fit into our balance of low-effort wins versus high-variance big bets?"
- "If this experiment fails, what specific user behavior insight will we gain?"

## Common Mistakes to Flag

- **The search for significance** - Making decisions based on real-time P-values leads to high false positive rates and invalid conclusions.
- **Ignoring Sample Ratio Mismatch (SRM)** - Failing to verify that the control and treatment counts match the intended ratio can hide fundamental technical bugs that invalidate results.
- **Over-optimizing for short-term theatrics** - Focusing purely on immediate conversion metrics can mask long-term damage to the user experience or revenue quality.
- **Losing institutional memory** - Failing to document past wins and failures leads to teams repeating the same experiments or losing valuable product patterns to organizational churn.

## Deep Dive

For all 13 sourced insights from 9 guests, see `references/guest-insights.md`

## Related Skills

- Customer Interviews
- Continuous Discovery
- Idea Validation
- Defining Icp
