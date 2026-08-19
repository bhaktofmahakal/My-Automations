# Analyzing User Feedback - Frameworks, Templates & Checklists

*39 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### Balanced Feedback Portfolio (Yuhki Yamashata)
Approach to avoiding blind spots in customer understanding by maintaining a diverse portfolio of feedback sources, each with known biases

How it works: Different feedback channels have different biases: 1) Twitter/social media - vocal minority, tends toward designers/power users, 2) Support tickets - skews toward dissatisfied customers, 3) Sales conversations with prospects - more about perceptions, 4) Community forums/Discord, 5) Direct user research. PMs should feel they have a balanced portfolio with no blind spots.

### Complaint-Storms (Noah Weiss)
A group exercise to identify friction points in a user journey by critically evaluating a product screen by screen.

How it works: Step 1: Gather the team (PM, design, eng, leadership). Step 2: Pick an adjacent product first. Step 3: Project one screen at a time. Step 4: Document every confusing element, pain point, and missing context. Step 5: Repeat the process on your own product.

### Dogfooding Strategy for Non-User Teams (Yuhki Yamashata)
Creative approaches to get non-core-user employees to use the product daily, increasing quality feedback and personal accountability

How it works: Tactics at Figma: 1) Switch from memo culture to deck culture so PMs build presentations in Figma. 2) Run performance review calibrations in FigJam. 3) Create and distribute FigJam templates through HR for company-wide processes. 4) At Uber: all employees took Ubers to work, drivers drove for Uber. Goal: Maximize hours every employee spends in the product to create personal accountability when bugs are encountered.

### Duolingo Dogfooding Process (How Duolingo builds product)
A structured internal testing process where every product change goes live to employees before rolling out to users

How it works: Process: Every change goes live to all Duolingo employees (Duos) before rolling out to users. For large projects, teams push regular updates to internal builds for dogfooding. Creates awareness of project progress across the company. Gives team opportunity to experience UX firsthand. Dogfooding nudges: Special nudges for employees to test app flows that don't get frequently tested, such as: Onboarding for new users. Re-onboarding for resurrected users (learners who return after 30+ days away). Benefits: Keeps pulse on how large feature projects are evolving. Generates internal buzz and feedback signals. For feature-based teams, internal buzz is one of the key success signals.

### Feedback Evaluation: Representation × Influence Matrix (What 5 years at Reddit taught us about building for a highly opinionated user base)
A two-factor framework for assessing whether user feedback is worth acting on, based on what percentage of users the feedback represents and whether those users can influence others.

How it works: When assessing user feedback, evaluate two key factors:

Factor 1 - Representation: Does the feedback represent a significant portion (10% or more) of your user base?
Factor 2 - Influence: Can the users giving feedback influence the opinions of other users?

This creates four quadrants:
- High Representation + High Influence: Top priority feedback — act on it
- High Representation + Low Influence: Important feedback from many but non-influential users
- Low Representation + High Influence: Small group but they shape opinions of others (e.g., Reddit moderators of women-focused communities when trying to expand beyond young male gamers)
- Low Representation + Low Influence: Likely safe to deprioritize, but explain why

Key lessons:
1. Customers typically won't go out of their way to tell you if a feature is useful — they treat useful features as table stakes
2. Loud voices don't necessarily represent the majority
3. If you deprioritize a group's feedback, help them understand why — they may assume most users feel the same way they do

### Feedback Prioritization 2×2: Depth of Effect × Breadth of Effect (What 5 years at Reddit taught us about building for a highly opinionated user base)
A 2x2 matrix for deciding which user feedback to act on, plotting the depth of a feature's impact against how many users it affects.

How it works: 2x2 Matrix Axes:
- X-axis: Breadth of effect (Few people ↔ Many people)
- Y-axis: Depth of effect (Shallow effect ↔ Deep effect)

Quadrants:
1. Upper Right (Deep effect + Many people) = DO IT — top priority, almost certainly build it
   - Reddit example: Home feed improvements
2. Lower Left (Shallow effect + Few people) = PROBABLY NOT — likely a no
   - Reddit example: Bookmark folders for power users (feature hardly anyone used)
3. Upper Left (Deep effect + Few people) = CONSIDER CAREFULLY
   - Reddit example: Flair system (some subreddits like r/stopdrinking completely relied on it, most never used it)
4. Lower Right (Shallow effect + Many people) = CONSIDER CAREFULLY

For items in the ambiguous quadrants (upper-left and lower-right), consider three things:
1. Trust Vault impact: Will this affect how the community feels about you and how much goodwill you have stored?
2. Organizational goals: Consider future potential customers and new audiences you want to attract, not just existing users
3. Advisory council input: They should play an important (but not solo) role in the decision

### Feedback River (Shaun Clowes)
A concept from Sachin Rekhi (LinkedIn) about surrounding yourself with a constant flow of user interview data, direct customer feedback, NPS data, competitor information—always washing yourself over with information.

How it works: Set up systems to constantly receive: 1) User interview data, 2) Direct customer feedback, 3) NPS data, 4) Competitor information. Use LLMs to take in inbound customer requests, summarize what they're about, find semantically similar asks, and track which ideas are getting more or less popular over time.

### Product Feedback Prioritization Framework (Julie Zhuo)
A sequential model for synthesizing product feedback during design critiques.

How it works: Layer 1: Core Value (Does it solve the target audience's problem/JTBD?). Layer 2: Ease of Use (Can people access the value without confusion or friction?). Layer 3: Joy/Delight (Is it pleasurable, exceeding expectations with aesthetics/animations?). Always align on the current layer before accepting feedback for the next.

### Study Group (Jeff Weinstein)
A group exercise where employees pretend to be a specific customer trying to achieve a goal, with strict rules against using internal knowledge.

How it works: Rule 1: You do not work at the company (no internal knowledge/lingo). Rule 2: You are not here to solve problems or file bugs, just to practice empathy and experience the flow. Takes 1-1.5 hours with 4-8 random employees.

### The Trust Vault (What 5 years at Reddit taught us about building for a highly opinionated user base)
A metaphor and measurement system for tracking how much trust your user base has in you. Trust can be deposited (through wins and transparency) and depleted (through broken promises or controversial launches). Reddit maintained company-level and team-level Trust Vaults.

How it works: The Trust Vault is a metaphor for how much trust the customer base has in you. Key principles:

1. Your Trust Vault can be filled and depleted
2. You can have multiple Trust Vaults: company-level, team-level, individual PM-level
3. You can't ask passionate users not to love your product — instead fill the Trust Vault and harness their passion productively

Measurement method (adapted from Edelman Trust Barometer):
- Survey Question 1: 'On a scale of 0 to 6, how much do you trust [your company] staff to do the right thing?'
- Survey Question 2: 'Why?'
- Cadence: Once or twice per quarter (oversending depletes trust)

How to use Trust Vault scores:
- If trust score with a target audience is too low, adjust launch plans
- Consider delaying controversial product launches
- Sequence trust-building wins before risky releases
- Example: Reddit delayed features that increased moderator effort when moderator trust was trending down, instead shipping 'Mod Experience Oriented Wins' (MEOWs) first to boost trust

### Voice of the Customer Report (Laura Schaffer)
A proactive digest of customer insights shared broadly across the company to build influence.

How it works: Start by taking notes on customer pain points during routine calls. Compile these into a written digest, share it via Slack or email, and eventually evolve it into a quarterly cross-functional meeting.

### Walk the Store / Essential Journeys Audit (Katie Dill)
A quarterly process where cross-functional leaders manually test critical user journeys and log friction.

How it works: 1. Identify top 15 critical user journeys. 2. Have Eng, Product, and Design leaders walk through them together (from Google search to dashboard). 3. Fill out a friction log with screenshots and tags ('nice touch', 'consider fix', 'P0 bug'). 4. Give a summary score using a color system. 5. Calibrate scores in a Product Quality Review (PQR) meeting.

## Templates

### Customer Feedback Hub (Coda Template) (This Week #8: Splitting equity with late-joining co-founders, favorite roadmap templates, and small changes that improve your org)
A Coda template for systematically tracking every piece of customer feedback and following up after improvements are shipped

How it works: Methodology: Track every piece of customer feedback received, then follow up with customers after improvements are made to let them know they've been heard.

Template link: https://coda.io/t/Customer-Feedback-Hub_tR3QcZZMHKW?previewTemplate=R3QcZZMHK

This was the #1 highest-rated team effectiveness idea from Lenny's readers.

### Friction Log (David Singleton)
A structured document used to record the end-to-end user experience of a product flow to identify areas for improvement.

How it works: State the goal, explicitly define the user persona/mental model, write a stream-of-consciousness log of the experience, and explicitly praise the good parts.

## Checklists

### Advisory Council Feedback Stages (What 5 years at Reddit taught us about building for a highly opinionated user base)
Four development stages with corresponding feedback questions to ask your advisory council at each stage.

How it works: When conducting advisory council meetings, be clear about where you are in the development process so they know what type of feedback is most helpful:

1. At conception: 'Does the idea resonate with them?'
2. At design: 'Does this raise any alarm bells?'
3. At beta: 'What gaps do they find once they try it?'
4. At launch prep: 'Make sure they know that it's coming and how you've acted on their feedback'

### Advisory Council Setup: 4 Essential Components (What 5 years at Reddit taught us about building for a highly opinionated user base)
Four components needed to create and maintain a successful user advisory council for product feedback.

How it works: Component 1: Assemble a representative group
- Include a broad cross-section: casual users, serious users, minority groups
- Look for critical thinkers and strong communicators
- Avoid people who will simply agree with you AND people who are immovably stubborn
- Include influential users who can help pitch changes to the larger group
- Find candidates on social media, comments sections, idea forums
- Add follow-up question to customer surveys: 'Can we contact you again if we have follow-ups?'
- Target size: ~80 people on a rolling basis, with at least 10 showing up to monthly calls

Component 2: Create a space and culture for reasonable discussion
- Create a code of conduct and enforce it consistently
- Remind everyone why they're there at the beginning of meetings
- Praise desired behavior (candid feedback and thoughtfulness)
- Lead by example
- Choose format based on bandwidth: live calls for clarity, forums/chat rooms for volume
- Set expectations about your engagement and hold up your end
- Reddit used: private subreddit for async conversations + regular live calls

Component 3: Build process and cadence for connecting
- Consult the group early and often
- Meet at least once a month; accommodate multiple time zones for global audiences
- Adjust cadence based on how involved they want to be and how frequently you ship
- Reddit sometimes did more than one call per week
- Tailor feedback requests to development stage:
  * At conception: 'Does the idea resonate with you?'
  * At design: 'Does this raise any alarm bells?'
  * At beta: 'What gaps do you find once you try it?'
  * At launch prep: 'Make sure they know it's coming and how you've acted on their feedback'

Component 4: Cycle them out
- Do NOT have fixed permanent membership
- Set 12-month tenure for most members
- Option for one extension
- Thank them for service and maintain the relationship
- Reasons to cycle: prevents too few people having too much power, avoids decision-making blind spots, prevents comfort that disincentivizes candid feedback

### Best Customer Survey Criteria (Gia Laudi)
A set of criteria to determine which customers to survey for voice-of-customer research.

How it works: Criteria include: gets a ton of value from the product, pays happily, low maintenance, and signed up recently (3-6 months ago) so they remember life before the solution.

### Internal Dogfooding Playbook (Maya Prohovnik)
A set of rules Maya gives her team to ensure they experience the true friction of podcast creation.

How it works: 1. Don't record by yourself, find a friend. 2. Don't follow a script (it feels awkward). 3. Don't just record a 30-second test and publish it; do the real work to feel the user's pain.

## Examples

### #UX-input Slack Channel with Auto-Triage (How Ramp builds product)
A crowdsourced UX improvement system using Slack, emoji triage, auto-created Linear tickets, and GPT summarization

How it works: Anyone at Ramp can post UX improvements in the #UX-input Slack channel. Posts are triaged using emoji reactions, which automatically creates Linear tickets routed to the right teams. GPT summarizes the issue for the team. Individual teams are accountable for burning down a fixed percentage of these improvements every sprint.

### Air Dives (Laura Modi)
A branded internal program for analyzing customer service tickets and pain points.

How it works: Instead of calling it a 'customer service analysis', branding it 'Air Dives' made the team excited to review customer issues on Fridays. Demonstrates how to brand mundane workflows.

### Confluent LLM-Powered Customer Feedback Clustering (Shaun Clowes)
Confluent uses LLMs internally to semantically cluster inbound customer requests, identify the most popular ideas, and track trending demand over time.

How it works: System takes in hundreds/thousands of inbound customer requests. LLMs: 1) Summarize what each ask is about, 2) Find semantically similar asks (same concept, not just same words), 3) Rank by popularity, 4) Track popularity trends over time. Enables looking across all inbound demand to find the most important and growing requests.

### Discord channel AI analysis for product insights (Tamar Yehoshua)
A PM fed an entire Discord channel transcript into Gemini's expanded context window to analyze sentiment, top feature requests, and pain points — something that would have been impossible to do manually.

How it works: Process: 1) Copy full Discord channel transcript. 2) Feed into Gemini (leveraging expanded context window). 3) Ask questions: What is the sentiment of my product? What is the most requested feature? What are people unhappy with? Result: 'It was like a goldmine' — insights that would have been impossible to gather manually due to volume.

### Glean Gong call summarization for feature requests (Tamar Yehoshua)
Glean built an internal app that reads all Gong sales call transcripts, formats them in a spreadsheet, and summarizes top customer-requested features — with iteration needed to distinguish customer requests from salesperson recommendations.

How it works: Process: 1) Record all sales calls in Gong. 2) Glean app reads all Gong transcripts. 3) Puts them in a spreadsheet with structured fields (AE name, etc.). 4) Summarizes top requested features across all calls. Challenge: Initial prompt couldn't distinguish customer requests from salesperson recommendations. Required iteration on the prompt to get accurate results. Key lesson: These tools don't work out of the box — you need patience to iterate.

### Groove's Cancellation Email Tweak (Jason Cohen)
A specific copywriting change that doubled the response rate of exit surveys.

How it works: Changing the question from 'Why did you cancel?' (yielded 10% usable responses) to 'What made you cancel?' (yielded 20% usable responses) forces the user to think about the product rather than giving a generic excuse like 'budget'.

### Gumloop's Support Thread Analysis Approach (Make product management fun again with AI agents)
Real example of how Gumloop uses AI to analyze helpbot chat threads without summarizing — by reasoning about root cause to better classify issues.

How it works: Quote from Max Brodeur-Urbas: 'We use AI to analyze each chat and ask, "What is this person struggling with? What is the main complaint?" We take those thoughtful analyses of the thread and we create a report that references the original issue, so we can go back and look at the raw conversation.'

Key insight: AI's role is to reason about root cause for classification, NOT to summarize. The report always references the original issue with links back to raw conversations. This preserves the PM's ability to access raw customer signals.

### Linear's Customer Requests Feature (Nan Yu)
A case study on solving a root problem for ICs instead of building middle-management reporting bloat.

How it works: Instead of adding custom fields for managers to track customer requests (which ICs hate filling out), Linear integrated with support tools/CRMs to automatically tag issues with the requesting customer. This gave managers reporting capabilities and gave ICs context without requiring manual data entry.

### Mixpanel's Customer Feedback Pipeline (Vijay)
An automated system that pipes customer feedback from multiple sources into Slack and Notion with enriched account data, enabling engineers to directly engage customers

How it works: Architecture: 1) Customer gaps from CS/sales teams + Twitter posts + NPS survey feedback + win/loss notes from competitive deals. 2) All data ETL'd into BigQuery. 3) Enriched with account info (ARR, CSM, contact info). 4) Pushed via Census (reverse ETL) to Slack channels and Notion databases. Culture: Engineers read the raw feed daily (~20 min). Engineers react with email emoji to indicate they'll contact the customer. Engineers email customers directly saying 'I'm the engineer who built this, tell me more.' No gatekeeper between engineers and customer feedback.

### NPS Survey Triage Agent (Make product management fun again with AI agents)
An example agent that reviews NPS survey responses arriving in Slack and decides whether to proactively create a Zendesk ticket for technical issues.

How it works: Use case: NPS survey responses arrive in a Slack channel. The agent reviews each response, determines if it hints at a technical issue, and either creates a Zendesk ticket (Lindy AI implementation) or posts to a channel for review (Cassidy AI implementation, as a workaround when direct Zendesk integration isn't available). Demonstrated across two platforms to show creative workarounds.

### Ramp AI User Personas for PM Feedback (25 proven tactics to accelerate AI adoption at your company)
AI personas loaded with user research context that give PMs instant feedback on product specs

How it works: Ramp built AI personas loaded with all their user research context. PMs can now give any product spec to these personas and get instant feedback on what they're missing or haven't thought through. This enables faster iteration on product specs without waiting for user research cycles.

### Reddit Multi-Image Gallery Posts: Saying No with Nuance (What 5 years at Reddit taught us about building for a highly opinionated user base)
Example of transparently declining part of user feedback by breaking a request into sub-components and plotting each on the depth × breadth matrix.

How it works: Feature: Multi-image gallery posts launched in 2020
User demand: Full support for 'Old Reddit' (legacy web platform loved by vocal moderators)

The team broke moderator concerns into three categories and assessed each:
1. Creation: Creating galleries on Old Reddit — unlikely to be used by many Old Reddit users (who preferred text posts) → Shallow effect, few people → Did NOT build
2. Consumption: Viewing gallery posts on Old Reddit — inability to view would break browsing experience → Deep effect, few people → Built basic consumption experience
3. Moderation: Removing problematic gallery posts on Old Reddit — requiring volunteer moderators to use two platforms would deeply affect them → Deep effect, few people → Built basic moderation tools

Decision: Limited Old Reddit support — basic viewing and moderation, but no gallery creation. Explained decision to advisory council. Result: Feature was successful, moderators appreciated the targeted enhancements.

### Reddit Redesign 'Throw a Bone': Classic and Condensed View Options (What 5 years at Reddit taught us about building for a highly opinionated user base)
Example of making a small, low-effort concession to vocal power users that deflects ongoing complaints without compromising the product direction for new users.

How it works: Problem: Old-school users complained about white space in Reddit's modern redesign cards.
Constraint: New users needed the spacious, modern design.

Solution: Three content density options:
1. Modern (new default for new users) — spacious card design
2. Classic (default for existing users) — similar to original Reddit design
3. Compact/Ultra-condensed — added purely to delight power users, not most people's cup of tea

Result: After adding these options, most complaints about the modern card were deflected by other users pointing out the classic and condensed options.

Guidance on when to 'throw a bone':
- Don't do it constantly (don't reward vocal minority for complaining)
- Most effective when: the change is staring the vocal minority in the face all day, AND the work to add the concession is relatively light

### WeDash Dogfooding Program (Keith Yandell)
A mandatory company-wide program requiring all employees to use the product in the real world to build empathy and find bugs.

How it works: Employees must complete at least 4 deliveries per year (or do customer support if unable to deliver). Findings are reported in a dedicated Slack channel. Used as a cultural filter during the interview process to weed out candidates lacking humility.

### WeDash Program (Jess Lachs)
A company-wide program to build extreme ownership and customer empathy.

How it works: All employees, regardless of role, must do customer support or dash (deliver food) four times a year to build empathy and catch product bugs.

### Writer's Power-User Call Review Process (Prioritizing at startups)
How Writer internalized user needs by re-listening to power-user calls and extracting quotes

How it works: Process: (1) Keep a folder of all power-user video calls. (2) Re-listen to them over and over. (3) Hand-write out the exact clutch quotes. (4) Try to connect the dots between different types of users who were really happy with the product. (5) Use these insights to articulate the core value proposition (which became 'AI writing assistant for teams'). (6) Relay insights back to engineering and to the market to acquire more users.

## Tools

### Concerning Tweets Channel (Yuhki Yamashata)
A private Slack channel where the CEO can drop individual customer tweets or feedback that feel concerning, allowing leadership to review signals without creating company-wide fire drills

How it works: Problem: CEO reading tons of customer feedback and dropping tweets into public Slack channels caused teams to drop everything. Solution: Private channel with small group (CEO, CPO, CTO) where CEO drops concerning tweets (even with 0-1 likes). The group evaluates whether there's a bigger pattern. Treats individual feedback as canaries in the coal mine, not fire drills.

### Edelman Trust Barometer (adapted for product teams) (What 5 years at Reddit taught us about building for a highly opinionated user base)
A trust measurement survey methodology adapted from the corporate/government trust survey for measuring user trust in product teams.

How it works: Original source: https://www.edelman.com/trust/2023/trust-barometer

Adapted survey questions:
1. 'On a scale of 0 to 6, how much do you trust [your company] staff to do the right thing?'
2. 'Why?'

Cadence guidance:
- Once or twice per quarter is generally fine
- Unless dealing with rapid swings in trust
- Oversending the survey can itself deplete trust

Use the trending scores to inform product launch timing and sequencing.

### Slack-to-Asana Emoji Integration (Mihika Kapoor)
A workflow where reacting to a Slack message with a specific Asana emoji automatically creates a task in the product backlog.

How it works: Use for capturing non-immediately actionable feedback from sales calls into a weekly grooming backlog without breaking workflow.

### Support Ticket Feed in Slack for Customer Feedback (This Week #10: Keeping designers and engineers excited about metrics + Transitioning from DS to PM 🕺)
Tactic for keeping the product team in the loop on customer sentiment by piping support tickets into Slack

How it works: Set up an automatic feed of product-related support tickets in Slack to keep the entire team in the loop. Use an existing workflow tool to filter and route product-relevant tickets. Support tickets are described as 'a gold mine of customer feedback and sentiment.'

### Users Having a Bad Day Chart (Jeff Weinstein)
A stacked bar chart tracking specific events that indicate a user is having a bad experience.

How it works: Emit a log line anytime a user hits a known friction point (e.g., 404 error, late payout, 10+ payment declines). Stack these into a single bar chart to monitor and burn down.

