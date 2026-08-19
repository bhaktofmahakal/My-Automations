# Evaluating Trade-Offs - Frameworks, Templates & Checklists

*22 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### Build AND Buy (Austin Hay)
A decision-making framework that replaces the binary 'Build vs. Buy' debate with a hybrid approach to software procurement.

How it works: Instead of choosing one or the other, buy a third-party tool to solve the foundational 90% of the problem at the lowest possible cost, and use internal engineering resources to build custom features or integrations for the remaining 10%.

### Build/Buy/Partner decision framework for large companies (Tanguy Crusson)
How Atlassian evaluates whether to build internally, acquire, or partner when entering a new market

How it works: Three options evaluated for every strategy: Build (internal development), Buy (acquisition), Partner (integration/alliance). For acquisitions, two approaches: 1) Buy and keep product running, integrate with tech stack (risk: frankenstack of incompatible systems). 2) Buy and rebuild on platform (acqui-hire model - shut down product, rebuild with team's knowledge). Tanguy's preferred next approach: small acquisition, treat as acqui-hire, buy acceleration of roadmap (enter market 1 year earlier), rebuild on own platform.

### EV > TV > MEV (Brian Halligan)
A prioritization framework for decision-making and performance evaluation.

How it works: EV = Enterprise Value, TV = Team Value, MEV = My Value. (Later added CV = Customer Value at the front). Employees must prioritize the company over their department, and their department over themselves.

### Every Strength Has a Corresponding Weakness (Sarah Tavel)
Mental model that strengths and weaknesses come in pairs — you can't have one without the other, applicable to individuals, organizations, and product decisions

How it works: Examples: Decentralized org → moves quickly but feels chaotic. Centralized org → intentional decision-making but slow. Applies to personal strengths/weaknesses and organizational design trade-offs. Source: Reid Hoffman (Sarah's former partner at Greylock).

### Five Techniques for Communicating Tradeoffs (How to communicate tradeoffs so leaders will listen)
Tara Seshan's five-part playbook for making tradeoffs crystal clear to senior leaders, preventing the 'do both' default.

How it works: 1. Repetition doesn't spoil the prayer — Build awareness of priorities before tradeoff moments arise using an Ongoing Stack Rank (OSR), shared repeatedly in GTM catch-ups, exec presentations, and weekly updates. Become the 'repeater-in-chief.' 2. Steelman the request — Present the strongest version of the opposing argument before countering it. Collaborate with the requester, approach with curiosity, dig into data. Minimizes surprises in exec meetings and positions you as the expert. 3. Company first, team second — Frame every tradeoff in terms of company goals, not team goals. Leadership thinks company-first and will respond better. Shows you're making globally optimal decisions. 4. Predict the future, just a little bit — Project what happens next quarter and next year. Consider ongoing costs, team morale, and long-term unit economics. Address the core fear behind short-term thinking. 5. Always communicate an opinionated decision — Make a specific recommendation using SCQA format. You have more context than leadership. Present in a document with a meeting that includes silent reading, stated recommendation, decision timeline, and clear next steps.

### Magic Lenses (4 Classic Lenses + Custom) (Introducing the Foundation Sprint: From the creators of the Design Sprint)
A technique for evaluating multiple product approaches by plotting them on multiple 2x2 charts, each representing a different decision-making perspective

How it works: 4 Classic Lenses (each is a 2x2 chart):
1. CUSTOMER LENS — Axes: How much do customers want this? / How well does this solve the target problem?
2. PRAGMATIC LENS — Axes: How feasible is this to build? / How quickly can we test this?
3. GROWTH LENS — Axes: How large is the potential market? / How viral/shareable is this?
4. MONEY LENS — Axes: How much revenue potential? / How sustainable is the business model?

(Note: Exact axis labels are starting points and can be adjusted)

Custom Lenses — Additional 2x2 charts using team-specific criteria:
- Examples: 'no advertising required', 'founder excitement', 'customer pain', 'unique to us', 'delivers on our mission'
- Can also re-use the differentiation chart from Day 1
- Most teams try 1-2 additional custom charts

Process:
1. Create the 2x2 charts
2. Plot each approach (color-coded) on every chart, one axis at a time
3. Use expert/Decider for relative placement
4. Zoom out and look for patterns across all charts
5. Decider chooses one top bet and one backup plan

### Nuanced Decision-Making Format ('It Depends') (Becoming a senior Product Manager)
A structured format for reasoning through ambiguous decisions and communicating tradeoffs clearly.

How it works: When making a decision, find nuances where a different decision would be better. Write out:

'It depends. If X, then A is the best choice. If Y, then B is the best choice. I think this situation is X, so A.'

Practice tips:
- Take stakeholder concerns seriously and look for hidden complexity
- Ask: What are the circumstances in which they'd be right?
- Ask: What information might they have that causes them to come to a different conclusion?
- Only share the longer 'it depends' answer if it's actually helpful — don't annoy teammates

Example: A feature launch without updated customer support scripts. Instead of brushing off the concern, ask questions until you understand the full implication chain: without scripts → longer ticket resolution → lower satisfaction → subscription cancellations. Then decide whether to delay launch.

### Technical/Design Investment Evaluation Framework (This Week #13: Balancing outcome-thinking with design and technical requirements ⚖️)
A scenario-based evaluation framework used at Airbnb to decide whether to invest in large technical or design work that doesn't directly drive near-term outcomes. Extend outcome thinking further into the future by laying out scenarios.

How it works: When facing a large technical or design investment (e.g. monolith-to-SOA migration), lay out three scenarios: do it all now, do some of it now, or do none of it now. For each scenario, evaluate:
1. How long do we anticipate this work taking, best case and worst case?
2. What resources would it take up from the team?
3. What impact would it have on our immediate goals and strategy?
4. What impact would it have on our long-term goals and strategy?
5. What risks would it introduce, or take away?

Additionally ask:
- How much would this work benefit your outcome (e.g. growth, quality, retention) 1+ years out?
- What happens if you don't do it?
- What are the chances of it being successful?

Decision rule: If the scope and impact can be absorbed within the team, make the decision and move forward. If it significantly hurts short-term goals, surface the options along with your recommendation to leadership for buy-in. It always comes back to ROI and what best helps you achieve short-term and long-term outcomes.

### The 'Optimizing For' Framework (Nikita Miller)
A mental model for prioritization and trade-offs.

How it works: Ask 'What are you optimizing for?' across specific time horizons (today, this quarter, this year). Use the answer to dictate OKRs and force clarity on what trade-offs are acceptable.

### Three Tradeoff Traps (How to communicate tradeoffs so leaders will listen)
Three common anti-patterns that prevent PMs from successfully communicating tradeoffs, leading to overcommitment and burnout.

How it works: 1. The 'Peanut Butter' Trap — Small asks accumulate and spread the team too thin. Each request isn't big enough to obviously force a tradeoff, but they add up. Fix: Treat every small request as a real tradeoff against the OSR. 2. The 'Just One More Engineer' Trap — Requesting more headcount instead of making prioritization decisions. No amount of capacity eliminates the need to prioritize. Planning always scales to match capacity. Fix: Prioritize based on business importance first, then request capacity for agreed-upon priorities. 3. The 'But We Have a Framework' Trap — Hiding behind scoring frameworks instead of diving into specifics. Frameworks help order by relative priority but aren't laws of physics. Fix: Reference frameworks as a starting point but elaborate on details that don't fit, consider where the framework might be wrong with new data, and be willing to throw it out.

### Tradeoff Evaluation Framework (The definitive guide to mastering analytical thinking interviews)
Structure for making and communicating decisive tradeoff decisions in PM interviews

How it works: Five common tradeoff question types:
1. Resource allocation tradeoffs
2. Short-term vs. long-term tradeoffs
3. User segment prioritization tradeoffs
4. Metric conflict tradeoffs (e.g., NSM vs. guardrail)
5. Feature/strategy direction tradeoffs

Approach:
1. **Identify the common benefit** of both options
2. **Outline pros and cons** of each option
3. **Pinpoint the crux** of the decision (the fundamental tension)
4. **Clearly state your decision** — be decisive, no hedging or dodging
5. **Connect rationale** back to: company strategy, product maturity, product mission, relevant metrics
6. **State what would need to be true** for you to change your mind (this is what great candidates do)

Evaluation questions to ask yourself:
- Do both options align with the mission and NSM equally?
- Would either option trigger your guardrail metrics?

Tip: Spend ~1 minute organizing thoughts before walking interviewer through decision. Reserve ~10 min total for tradeoffs.

## Templates

### SCQA Tradeoff Decision Document (How to communicate tradeoffs so leaders will listen)
A structured document for presenting a prioritization tradeoff to leadership, using the Situation-Complication-Question-Answer framework with a bottom-line-up-front (BLUF) recommendation.

How it works: Template at https://docs.google.com/document/d/e/2PACX-1vQDH0AX5FGuXrDLX3e7cT6KGo3dJAxm1IYFYRVs-MyCCqM6o1gC2EtqaVobaZ02CTuGxjm56IwHLXdt/pub. Structure: 1) BLUF — Decision recommendation stated right at the top. 2) Situation — Context of current roadmap, priorities, and how they relate to company priorities. Highlight the specific roadmap item that would be traded off. Should feel like common knowledge (repetition doesn't spoil the prayer). 3) Complication — The new request, steelmanned with data (qualitative and quantitative). Include risks of not taking action. 4) Question — The key decision as a succinct tradeoff: 'We must choose between [X, new request] or [Y, existing item on OSR]. Should we do X or Y?' Explain why it's specifically these two items. 5) Answer — Thorough explanation of recommended decision. Project the outcome. Answer big open questions with hypothesized outcomes and indicate level of certainty.

### Should We Do This Ourselves? Document (Jeff Weinstein)
An annual strategic document evaluating whether to build internal capabilities or use third-party vendors.

How it works: Forces the team to review operational tasks (like mailing 83(b) elections) and explicitly decide if it's worth building internally vs. partnering, maintaining leverage and focus.

### Traffic Light Decision Matrix (Naomi Gleit)
A visual table used in meetings to evaluate three options against specific criteria using color coding instead of a flat pros/cons list.

How it works: Rows: 3 Options. Columns: Evaluation criteria (e.g., legal, policy, user experience, engineering feasibility). Cells: Color-coded Red/Yellow/Green with specific rationale text. The final recommendation should have the most green/yellow.

### Weighted Decision-Making Spreadsheet (Nicole Forsgren)
A spreadsheet to evaluate options based on weighted criteria.

How it works: 1. List options. 2. Identify criteria (e.g., comp, prestige, work-life balance). 3. Assign a percentage weight to each criterion (totaling 100%). 4. Score each option per criterion, multiply by weight, and sum for a final score.

## Checklists

### Bad vs. Good Tradeoff Statements (How to communicate tradeoffs so leaders will listen)
A review of common counterproductive tradeoff statements PMs make, what trap each falls into, and what the correct framing looks like.

How it works: BAD statements and their traps: 1. 'We are thin on resources' — No options, no context on existing priorities. Just one more engineer trap. 2. 'All of the engineers are working on this other feature. Maybe we can sneak it in if they can do it in spare cycles' — No options, no context. Peanut butter trap. 3. 'I'm not sure if this is really high-priority' — Doesn't provide details on what IS a priority. Framework trap. 4. 'I have many things higher in my stack rank [shows list]' — Closer, but doesn't present a specific option of what might be cut. Framework trap. 5. 'Yes, we could deprioritize our new dashboard rehaul—what do you think?' — An option, but how is leadership supposed to know the value? Framework trap. GOOD statement: 'No — to build the feature, which might help a sales demo with one big client, we'd have to push out support for single sign-on for enterprises for a quarter, which means these 10 clients won't be onboarded in that time. I don't think it's worth it for the company; we won't hit our usage and revenue goals.' — Specific tradeoff, company-goal framing, opinionated recommendation.

### Tradeoffs to Communicate When Saying 'Yes, But' (Path 1) (Saying no)
Five categories of impact to lay out when showing the cost of pursuing a new idea

How it works: When communicating the cost of switching to a new idea, lay out:
1. Existing priorities that will get pushed
2. Launch dates changing
3. Resources getting moved around
4. Risks being introduced
5. Impact on dependencies and other projects

Try to be as precise and unbiased as possible. The goal is to transparently give your manager all the information they need to make a well-informed decision.

## Examples

### Google Video vs. YouTube — 'Just One More Engineer' Trap Example (How to communicate tradeoffs so leaders will listen)
The Google Video Product Lead rejected acquiring YouTube, claiming they just needed 'one more good Java/UI engineer' to compete — a classic capacity-over-strategy mistake.

How it works: When Jeff Huber (Google SVP) asked the Google Video Product Lead about acquiring YouTube, the lead said they just needed one more good Java/UI engineer to beat YouTube. Chris Sacca's better framing: 'Positionally, Google is focused on getting all the world's video on our platform, while YouTube is specifically focused on user-generated content. Unlike YouTube, we have to play nice with media and ISPs. The real question isn't about tech or specific resources, it's about position. We have a tradeoff to make: (1) buy them once we have leverage, (2) take the same strategy but prepare for fallout, or (3) pursue existing strategy and lean into advantages like the Olympics deal. I think we should do 3. And if we do 3, we're not staffed to do it well. I need [X] people to do it right.' Lesson: Prioritize based on strategic importance first, then request capacity for agreed priorities.

### Luodingo Delayed Port Cost Calculation (The secret to Duolingo’s exponential growth)
Hypothetical (but real) example showing the compound cost of delaying a feature port from iOS to Android

How it works: Feature A: Ported quickly from iOS to Android. Total time including dev, rollout, 2-week experiment = 82 days.

Feature B: Similar initial impact, but team did 2 small (roughly neutral) iterations to polish before porting. Port launched 184 days after iOS launch.

Cost of delay:
- 184 - 82 = 102 extra days without port live
- Port showed ~21k DAUs/day gain over 2-week period
- 102 days ÷ 14 = 7.3 two-week periods
- 7.3 × 21k = ~153,300 average DAUs lost per day during the gap
- At 1 new WOM user per 50 DAUs: 153,000/50 = ~3,000 missing new users per day from word of mouth
- Total: missing both the 153.3k direct DAUs AND 3,000 WOM users per day

Lesson: The team worked hard on other experiments that likely produced less than what simply porting the win earlier would have achieved.

### Rippling Global Payroll Architecture (Jeremy Henrickson)
An example of designing for the most complex use case instead of building an MVP.

How it works: Instead of copying the US system to launch in the UK quickly, they designed a system to support 6 vastly different countries at once. Resulted in an architecture where 80% is a global platform and 20% is country-specific configuration managed by compliance/legal rather than engineers.

### Security vs UX Trade-off in NFT Marketplaces (A product manager’s guide to web3)
Real-world example of the 'approve all' permissions dilemma in NFT marketplaces illustrating web3's unique security-first PM considerations

How it works: Some NFT marketplace PMs prompt users for 'approve all' permissions in Metamask transactions to avoid repeated permission requests (which are cumbersome and expensive). But the risk is that the user could have their entire NFT collection transferred out of their wallet if the marketplace turns malicious or gets hacked. The user only intended to give one-time access to sell an NFT. Alternative: require repeated approvals despite expense, prioritizing security over UX. This trade-off would never arise in web2 (eBay/Etsy) because listing an item doesn't put all other assets at risk, and there's always customer support to reverse transactions.

## Tools

### Further Study Resources on Tradeoff Communication (How to communicate tradeoffs so leaders will listen)
Recommended resources for deeper learning on executive communication and tradeoff decision-making.

How it works: 1. Harrison Metal: Executive Communication (video) — https://www.heavybit.com/library/video/executive-communication/ 2. Lucy Spence: A Devilish Approach to Tradeoffs (video) — https://www.youtube.com/watch?v=zNfoSKIobK8 3. Ami Vora (Faire CPO) clip on approaching requests with curiosity — https://youtu.be/6UHAop9fhNU?si=GF3amwVxFLKxZqeo&t=595

