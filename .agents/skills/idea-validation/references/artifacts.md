# Idea Validation - Frameworks, Templates & Checklists

*63 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### AFTER Assessment (Itamar Gilad)
A gamut of validation methods categorized by effort and fidelity.

How it works: Assessment (ICE, assumption mapping), Fact finding (surveys, interviews), Tests (fake doors, Wizard of Oz, fish fooding), Experiments (AB tests), Release results (staged rollouts).

### Amazon Mock Press Release (Jag Duggal)
A product discovery technique used to validate customer value before building.

How it works: Write a two-paragraph explanation directed at the intended customer explaining why they should care about the product. This must be completed before a single engineer is put on the project.

### Amazon PR/FAQ (Press Release / Frequently Asked Questions) (Shweta Shriva)
A product development process where PMs write a press release for the finished product before building begins, forcing clarity on customer value proposition, target audience, and the problem being solved.

How it works: Steps: 1) Write a press release as if the product is launching today. 2) Describe who the product is for, what problem it solves, and what value it delivers. 3) Include FAQs that address customer and internal questions. 4) Use this document to align the team before any development begins. Shweta notes Waymo has its own adapted version of this process.

### Be First to Hit the Brick Wall (Varun Parmar)
A philosophy of prioritizing speed of learning over perfection—being the first to discover what doesn't work gives you a competitive advantage in adjusting course

How it works: Core principle: In competitive markets, speed is the single biggest determinant of who ends up more successful. Goal: Be 1-2-3 steps ahead of everyone else in uncovering/discovering insights. When you hit the wall, you learn faster than competitors and can adjust (10 degrees west, 30 degrees east). This is contrasted with 'go slow to go fast'—Varun respects that approach but believes for new experiences where resonance is unknown, speed wins. Reference: Inspired by Frank Slootman's Amp It Up.

### Chaos to Clarity (Melanie Perkins)
A process for moving an idea from an amorphous, embarrassing thought into a concrete project.

How it works: Steps: 1. Acknowledge the idea is in 'chaos' (in your head). 2. Write it down. 3. Create a pitch deck to visualize the thinking. 4. Turn it into designs/prototypes. Each step adds a layer of clarity.

### Design Sprint (Jake Knapp + John Zeratsky)
A 5-day process for answering critical business questions through design, prototyping, and testing ideas with customers.

How it works: Go from zero to a prototype and test it with users in exactly five days to validate product-market fit quickly.

### Extreme Extrapolation (Nan Yu)
A product ideation method where teams design and build the most extreme, polarized versions of a feature to discover the optimal solution.

How it works: 1. Identify the core problem. 2. Build the most extreme version optimizing for one trait (e.g., speed/unsafe). 3. Build the most extreme version optimizing for the opposite trait (e.g., safety/slow). 4. Test both internally to feel the constraints. 5. Combine learnings into the final feature.

### Foundation Sprint → Design Sprint → Product-Market Fit Pipeline (Introducing the Foundation Sprint: From the creators of the Design Sprint)
The recommended sequence for going from initial strategy to validated product: Foundation Sprint first, then iterative Design Sprints to test and adjust

How it works: Sequence:
1. FOUNDATION SPRINT (2 days): Define Founding Hypothesis — customer, problem, approach, competitors, differentiators
2. DESIGN SPRINTS (weekly): Test prototypes against the Founding Hypothesis Scorecard questions
3. ADJUST: Based on test results, adjust the Founding Hypothesis elements
4. REPEAT: Keep running Design Sprints until the product 'clicks' with customers

Key principle: Establish confidence that people want your solution BEFORE spending loads of time and money building it. This is a simulation, but much better than relying on a hunch.

Prototype testing uses techniques from Michael Margolis (learned during GV days).

### Four B2B Idea Validation Paths (How to validate your B2B startup idea)
A framework for choosing which validation strategy to use based on your context as a founder. Each path represents a different level of up-front investment and is suited to different situations.

How it works: Four paths to validate a B2B startup idea:

1. **The Do-It-Manually Path** — Solve the problem manually for a small number of companies before writing any code. Best when: You're unclear whether the problem is important or even solvable. Examples: Vanta (manually created SOC 2 compliance reports), Ramp (manual savings reports analyzing 90 days of credit card purchases). Key test: Would they spend time with you? Would they believe the output is useful?

2. **The Listening Path** — Talk to tons of potential users first, then start building. This should be your DEFAULT path unless you have a clear sense of what to build. Target: ~30 potential customers minimum (Zip did 75, Ramp did 100+). Look for: Strong emotional reactions, hatred for incumbents, willingness to pay. Examples: Zip, Stytch, Gusto, Snyk, Ramp, Amplitude.

3. **The Prototype Path** — Build a prototype and co-create with a small number of design partners. Best when: You have deep experience in the space and a somewhat clear sense of what to build. Design partner count: 2-12 (Hex used 2, Sprig used 4, Gong used 12). Key signal: Usage and unprompted feature requests. Examples: Retool, Linear, Gong, Sprig, Hex.

4. **Just Launch and See How It Goes** — Ship and let the market respond. Best when: (a) You're desperate and need to try things out, or (b) You have crystal-clear vision of what needs to be built. Examples: Segment (desperation), Loom (thousands of PH downloads day one), Canva (strong vision), Databricks (open source adoption).

All four paths validate the same things — pull and pain — with varying degrees of up-front investment.

### Four Product Risks (Christian Idiodi, Marty Cagan)
A taxonomy of risks that product teams must tackle when uncovering a solution.

How it works: 1. Value risk (will people buy/choose it?), 2. Usability risk (can they use it?), 3. Feasibility risk (can we build it?), 4. Viability risk (does it work for our business?).

### Four Signs Your B2B Idea Has Real Pull (How to validate your B2B startup idea)
A checklist of signals that indicate genuine market demand vs. polite but hollow interest

How it works: Four strong signals your idea has real pull:

1. **People pay you money** — Several people start to (or offer to) pay for your early product, ideally people you don't have a direct connection to. The 'no direct connection' part is critical — friends and batch-mates may buy out of obligation.

2. **Continued usage** — People continue to use your prototype product even when it's hacky and bad. They keep coming back despite rough edges.

3. **Strong emotion** — You're hearing hatred for the incumbents (pain) or a deep, strong emotional reaction to your idea (pull). Key indicator: When people start cursing about their current solution unprompted, you have something. If someone says 'Yeah, that's cool, I may buy it,' that's NOT real signal — they're just being nice.

4. **Cold inbound interest** — You're seeing cold inbound interest in your product from people you've never contacted. Example: Vanta got an unsolicited email from an old colleague saying 'I hear you've become SOC 2 consultants — can you do this for my company?'

### Incubate, Iterate, Integrate (Tanguy Crusson)
A framework for innovating within a successful existing product by building new experiences on the side, iterating until validated, then integrating into the core product

How it works: Incubate: Build the new experience adjacent to but detached from the core product. Example: Instagram's Popular tab on the side. Iterate: Refine with users in isolation. Example: Popular tab becomes Explore tab. Integrate: Merge into the core product once validated. Example: Explore becomes the main feed algorithm. Applied to JPD: Built new UX inside Jira but detached from core Jira components, reimagined for product managers. Currently in integration phase.

### Live Product Experimentation Model (The unconventional Palantir principles that catalyzed a generation of startups)
An iteration approach that uses working code as the unit of experimentation instead of designs, wireframes, or lightweight validation methods, operating in daily build-share-iterate cycles.

How it works: Process: Learn about new customer needs → Design and build working code → Share with customers → Subtract and add and build again → Share again → Repeat in daily cycles. Send designers forward too.

Advantages:
- Customers see feedback incorporated nearly instantaneously → creates insanely strong advocates
- Takes guesswork out of understanding if users will care (they either use it or they don't — clear signal)
- Nothing lost in translation from desire to product
- Creates huge trust and avoids mental gymnastics of testing difficult assumptions
- Especially valuable with hard-to-reach users (e.g., secure facilities)

Disadvantages: Wasting lots of time and money on code no one uses

Prerequisites: Teams with VERY strong engineers who can make serious, meaningful improvements to products in less than 24 hours

Lessons:
1. Consider using working products to iterate instead of designs and concepts
2. Acknowledge that most of what you show won't have value, but what value is there will grow rapidly if you focus
3. Honestly assess who has the skill to participate — do not impose on everyone
4. Keep using traditional discovery and validation for high-risk endeavors, but blend working prototypes more frequently

Key insight: What was novel was using skill and experience to make writing code cheaper than typical teams can run most experiments.

### Minimally Awesome Product (Dylan Field)
An alternative to the Minimum Viable Product (MVP) that emphasizes a baseline of craft and quality.

How it works: Instead of just shipping the bare minimum functionality, define the minimum feature set required but hold a strict quality bar so the product is actually 'awesome' for early users.

### Minimum Lovable Product (MLP) (Anton Osika, Elena Verna 4.0)
A product development mindset that focuses on building something users love rather than just a viable prototype.

How it works: Focuses on creating a 'wow' moment rather than just an 'aha' moment. Prioritizes unique interactions, brand personality, and design from day one to drive word-of-mouth.

### New Bets Framework (Dmitry Zlokazov)
A lightweight pitch structure for internal employees to propose and launch new products.

How it works: Requires defining: 1) Market presence, 2) Business case, 3) Competitive leverage (why we can do it better), 4) Product concept, and 5) Customer problem solved. Approved ideas get a lean team to build a polished V1 for a small user base before scaling.

### New Product Stage Gates (Wonder, Explore, Make, Impact, Scale) (Megan Cook)
A 5-step gated process for validating and funding new internal product ideas.

How it works: 1. Wonder: Idea generation (1 person). 2. Explore: Prototype and customer interest validation (~3 people). 3. Make: Build the product with early customers (~12 people). 4. Impact: Prove self-sufficient revenue/metrics. 5. Scale: Full launch.

### Optimize for the Problems You Want to Have (Scott Belsky)
When deciding MVP features, only build what prevents users from reaching the point where they care enough to ask for more. The problems you WANT are users saying 'I need this on mobile' or 'I want to share this' — those mean they got value.

How it works: Step 1: Identify the core action that delivers value. Step 2: Remove all brick walls preventing users from reaching that action (signup flow, account connection, Google login, etc.). Step 3: Put everything else on the back burner — platform support, sharing, advanced features are problems you WANT to have. Step 4: Only address those features when users care enough to request them.

### Overcast Ads for Concept Testing (Chris Hutchins)
Using the Overcast podcast app's ad platform to cheaply test podcast concepts, cover art, and descriptions.

How it works: Run a small ad budget ($200-$700). Measure click-through rate to validate the title/cover art, and conversion rate (subscriptions) to validate the trailer/content.

### Point A Incubator Stages: Wonder, Explore, Make, Impact (Tanguy Crusson)
Atlassian's internal incubation framework with four stages, each with specific goals and gate reviews involving founders. Wonder = prove problem/market exists and why now. Explore = validate solutions with prototypes. Make = build with alpha→beta→GA progression. Impact = measure real business impact.

How it works: Stage 1 - Wonder: Prove problem area, market opportunity, articulate why Atlassian should move there, articulate why now, validate all claims with data. Stage 2 - Explore: Explore solutions, get customers to play back solutions that address their problems, validate with Figma/Zoom (not code). Stage 3 - Make: Build in stages (alpha→beta→GA), work with lighthouse users 10→100→1000. Stage 4 - Impact: Generally available, measure business impact, transition to real business. Gate review: 6-pager read in meeting with Point A stakeholders and Atlassian founders, 15 min reading then Q&A, decision to advance/hold/kill/merge.

### Pre-Product Invoice Test (How to know if you've got product-market fit)
A pre-product PMF validation technique where you literally try to get potential customers to pay you before the product exists.

How it works: Method:
1. Ask potential customers directly if they would pay for the product
2. Go further: try to get them to pay you NOW
3. Literally send them an invoice for early access to the product
4. Do this even if it's a consumer app you won't charge for — it demonstrates how much value you're creating

Signal: Nothing is a better signal of interest and PMF than getting people to put down money before you have a product.

### Ship, Quit, and Learn (Paul Millerd)
An experimentation framework for testing new paths quickly by shipping something small, designing it to be quittable, and using it primarily as a learning vehicle.

How it works: Three-part framework: (1) SHIP — What is the quickest way to ship something? (2) QUIT — Design it so you can quit easily. (3) LEARN — As soon as you ship, learn about what to do next. Paul's podcast example: Committed to only 5 episodes (borrowed from Tim Ferriss), tested how it felt, found it super energizing, continued. Also used to identify things NOT to do — consulting/advisory gigs that felt wrong led to building 'protectors' against taking similar gigs again.

### Solve vs. Scale Mode (Aparna Chennapragada)
A mental model for managing zero-to-one products to avoid premature optimization.

How it works: In 'Solve Mode', teams must be comfortable with chaos and wide pivots (e.g., shifting from plant detection to translation). They should avoid 'grownup metrics' (CTR, retention) which offer false precision, and instead look for qualitative signals ('the sound of the click') on 1-2 core use cases before entering 'Scale Mode'.

### Systematic Invention Method (Ethan Evans 2.0)
A mental model for generating patents and innovative ideas without waiting for random inspiration.

How it works: 1. Become a knowledgeable expert in the domain. 2. Block off dedicated thinking time away from devices (e.g., 2 hours a month). 3. Combine two existing, disparate concepts (e.g., drone delivery + aircraft carriers = drones launching from delivery trucks).

### Three Lessons from High-Stakes MVP Building (Zoelle Egner)
Three leadership and product lessons from building VaccinateCA under extreme time pressure

How it works: 1) Simple ideas bring people together: Combine 'why it's useful' + 'how you specifically can help' for maximum mobilization. Messaging example: 'Pick up phone, help save lives.' 2) Repeat yourself relentlessly: Say the same 3 talking points thousands of times across writing and speaking. People fill in blanks with wild things if you don't. CEO = 'Repeater in Chief.' 3) Laughably small MVP: Even for life-or-death stakes, starting with just phones + spreadsheet worked and revealed which assumptions about needed tooling were wrong. If it works here, it works for your startup.

### Ugly Baby Validation (1,000,000)
A framework for getting early validation on a new creative project by finding the right motivators

How it works: When starting something new (an 'ugly baby'):
1. Start by writing for yourself — crystallize your own thinking, document what you've learned
2. Share early work publicly (e.g., Medium post)
3. Find respected people who can give you honest feedback
4. Look for positive signals — if people you respect find it valuable, keep going
5. Key tip: Find the folks who can give you the motivation to keep going (not just anyone — people whose opinion you value)
6. Let early positive signals compound into sustained motivation

Lenny's example: Left Airbnb → bullet-point list of lessons → Medium post → good feedback from respected people → more posts → moved to Substack → paid plan → 1M subscribers

## Templates

### One-Page Approach Summary (Introducing the Foundation Sprint: From the creators of the Design Sprint)
A template for describing each alternative approach during Day 2 of the Foundation Sprint

How it works: Structure (one page per approach):
1. WHAT IT IS: Brief description of the approach
2. WHY IT'S A GOOD IDEA: One sentence explaining the rationale
3. DOODLE: A simple sketch/drawing showing how it might work

Used during the 'List all possible approaches' step on Day 2 morning. Each approach gets assigned a letter and/or color for easy tracking across the Magic Lenses evaluation.

### Sign-up Form Question Generation Prompt (How to build your PM second brain with ChatGPT)
A prompt template for generating concise waitlist/sign-up form questions that validate pain points and align user expectations

How it works: Prompt (used within a context-loaded Project):

"I'm sending out a form to users to sign up for a waitlist for [your product/feature]. I want to put 2-3 questions on the form which gauges their expectation to ensure we're aligned on what we're building and to receive another level of verification around the pain point. These questions should be concise, and the user's answer will be open-ended (free text)."

This works because the Project already has full context on the initiative, target users, and pain points.

## Checklists

### B2B Idea Validation Interview Process (How to validate your B2B startup idea)
A synthesized process for conducting validation interviews based on patterns across multiple successful B2B founders

How it works: Validation interview process:

1. **Target number**: Speak with ~30 potential customers minimum (median across founders). Some went higher: Zip did 75, Ramp did 100+.
2. **Timeframe**: 2-4 weeks of intensive interviewing (Zip did 75 in 2-3 weeks)
3. **Sourcing interviewees**: LinkedIn (response rate is 'pretty good when you just want advice'), personal networks, ask each interviewee for referrals ('Who are your friends who have [relevant role/business]?'), cold outreach, even Yelp (Gusto literally called businesses from Yelp)
4. **Document everything**: Zip had 110 pages of notes from their interview sprint
5. **Iterate daily**: After each batch of interviews, refine your idea. 'These two suck, but maybe we should tweak this idea because of what these people said.'
6. **Watch for evolution**: Compare your first call transcript to your 30th — early calls should be open and exploratory, later calls should be mostly validating what you're seeing
7. **Don't stop too early**: Spenser Skates (Amplitude) talked to 30 but wished he'd done 50. None of his 30 became paying customers. He should have continued dedicating half his time to customer conversations.
8. **Prioritize cold outbound over warm intros**: Selling to friends/batch-mates gives false signals. Cold outbound with just your pitch and value prop is the purest signal of real demand.
9. **Look for the four pull signals**: Payment, continued usage, strong emotion, cold inbound interest.

### Conditional Product Validation Sequence (Nikita Bier)
A step-by-step approach to validating a zero-to-one product by isolating and testing one core assumption at a time at 100% execution.

How it works: Step 1: Will people use the core flow? Step 2: Will people spread it within their peer group? Step 3: Will it hop peer groups? Step 4: Will people pay for it? Condense the risk to about four things that must be true.

### Customer Validation Rule (14 habits of highly effective product managers)
A simple rule for when to validate features with customers before building

How it works: For any feature that takes more than X weeks to design and build, you first talk to 5 potential users/customers to validate the desirability of the feature before committing engineering resources. The threshold X should be calibrated to your team's context.

### Evidence Gathering Tips for Problem Validation (A Three-Step Framework For Solving Problems 👌)
Three tips for collecting evidence that a problem is real and worth solving.

How it works: 1. **Look at both quantitative and qualitative evidence.** Collect all data points that point to this being a real and important problem.
2. **Quality over quantity.** 3-5 strong data points is far better than a dozen tangentially related points. Too many items weakens your case because you end up filling with minor/unrelated data. Your case doesn't need to be perfect or air-tight.
3. **Play devil's advocate with yourself.** Try to convince yourself that this ISN'T a real or big enough problem. Identify gaps in evidence. Question whether the evidence truly says what you think. Push yourself.

### Five Ways to Explore a Nascent Idea (Saying no)
Lightweight validation methods before committing to a full build

How it works: 1. Discuss it with smart colleagues
2. Create wireframes and run them by potential users
3. Prototype it
4. Write a 1-Pager (link: https://docs.google.com/document/d/1541V32QgSwyCFWxtiMIThn-6n-2s7fVWztEWVa970uo/edit)
5. Run a quick A/B test to see if there's a bigger opportunity

### Founding Hypothesis Scorecard (Introducing the Foundation Sprint: From the creators of the Design Sprint)
A scorecard with testable questions for each element of the Founding Hypothesis, used to systematically validate or invalidate your product strategy

How it works: Testable questions (each gets a checkbox):
1. RIGHT CUSTOMER? — Do you have the right target customer?
2. RIGHT PROBLEM? — Is this really their most important problem worth solving?
3. RIGHT APPROACH? — Is your chosen approach the best way to solve this problem?
4. WILL THEY CHOOSE YOU? — Will people really choose your solution over the competition?
5. RIGHT DIFFERENTIATORS? — Do customers actually care about your chosen differentiators?
6. BELIEVABLE? — Will customers believe your solution is radically better on those differentiators?
7. DOES IT CLICK? — Overall, does the product click with customers?

Process: After the Foundation Sprint, run weekly Design Sprints to test prototypes and answer these questions. Adjust and repeat until all boxes are checked.

### Julie Zhuo's 6 Principles for Building Products (Essential reading for product builders—part 2)
A six-point checklist for validating whether you're building the right product, covering problem definition, audience, prioritization of intuition vs. data, and communication clarity.

How it works: 1. A product succeeds because it solves a problem for people. This is the single most important thing to understand.
2. The first step is understanding what problem you want to solve, and for whom. This should be crystal clear before thinking about solutions.
3. The second question: 'Why is this particular problem worth solving?'
4. If the audience is narrowly defined (and you're part of it), rely on intuition. If not, rely on research and data.
5. If you are a startup founder, go after a problem for a narrowly defined audience first, then expand after initial traction.
6. The problem should be easy to communicate in a sentence or two and resonate with your target audience. If not, that's a big red flag.

### MVP Scoping Process (Eric Ries)
A step-by-step deductive reasoning process to define an MVP.

How it works: 1. Brainstorm leap of faith assumptions. 2. Select the learning metric. 3. Brainstorm MVPs. 4. Write out the list of necessary features. 5. Cut the list in half, then cut it in half again.

### Product Validation Milestones (Robby Stein)
Progressive gates for validating a new product from internal conviction to external launch

How it works: Milestone 1: Internal conviction — You personally believe in it based on qualitative 'moments of brilliance.' Milestone 2: Friends & family validation — Put 20 friends on it; they won't do you favors past 30-60 days, so real usage = real signal. Milestone 3: Trusted tester feedback — ~500 external users giving honest, detailed feedback (screenshots of what's broken). Milestone 4: Broader beta/Labs — Real query data at scale to tune the product. Milestone 5: Public launch — Expand to broader audience. Key insight: Friends and family are honest enough validators because they won't keep using a bad product just for friendship beyond the first few weeks.

### Sharp Problem Validation Test (Oji Udezue)
A method to measure if a problem is painful enough to solve.

How it works: 1. Draw the current approximate average workflow for the target customer. 2. Draw the workflow after using the software. 3. Measure the lines to see if the new workflow is 2x-3x shorter. 4. Look for the 'whites of their eyes' or spontaneous mentions of money during customer conversations.

### Three Steps to Take Once You Have an Idea (How to kickstart and scale a consumer business)
Immediate action steps after landing on a startup idea you're excited about

How it works: Step 1: Prototype it cheaply and quickly to validate the idea
- Stitch Fix: Used SurveyMonkey + hand-delivered garments, $20 styling fee
- Netflix: Mailed a used music CD to test whether mail delivery worked
- DoorDash: Static HTML page + Google Voice number + PDF menus + $6 delivery fee + AdWords campaign
- Rec Room: Built first game in 90 days, launched on SteamVR
- Hipcamp: Founder learned to program, launched very beta website within months

Step 2: Talk to potential customers to refine your idea
- Rent the Runway: Cold-emailed Diane von Furstenberg to get fashion industry feedback
- Rec Room: Set up in WeWork lobby, asked passersby to test the app
- Discord: Founders jumped into voice chat servers and talked to anyone who showed up

Step 3: Figure out who you are building for
- Identify your super-specific target audience (covered in Step 2 of the series)

## Examples

### Airbnb Social Travel Failure Case Study (A Three-Step Framework For Solving Problems 👌)
A real example from Lenny's time at Airbnb where the team solved the wrong problem, leading to a failed product launch, and how a later team reframed the problem correctly.

How it works: In 2012, Lenny's team at Airbnb was tasked with building a 'social travel' experience. They defined the problem as 'travelers want to hang out with other travelers' and built a product to help guests discover fun local things to do with other travelers. After 6 months of work they launched V1 in San Francisco. The product was beautiful but adoption was poor. A small percentage tried it with mediocre results. They iterated but eventually shut it down.

**Key insight:** The real problem was 'travelers want to find high quality non-touristy things to do.' Hanging out with other travelers was one possible solution, not the actual problem. Another team later recognized this and launched Airbnb Experiences, which was much more successful.

**Lesson:** Nothing is more certain to cause a project to fail than a misunderstanding of the problem you are solving.

### Data Center Brochure MVP (Eric Ries)
An example of testing a B2B hardware product without building it.

How it works: A team of PhDs wanted to spend 3 years and $18M building a highly efficient data center machine. Instead, they made a brochure with the proposed specs. Customers laughed them out of the room because they didn't care about efficiency, saving the team years of wasted effort.

### DoorDash's paloaltodelivery.com MVP (How the biggest consumer apps got their first 1,000 users)
How DoorDash validated demand with a simple website with PDF menus and printed flyers at Stanford

How it works: MVP components:
- Website: paloaltodelivery.com
- Content: PDF'd menus of restaurants in Palo Alto
- Distribution: Printed flyers distributed all over Stanford University
- Pricing: $6 for delivery
- Purpose: Test if there was demand before building anything more

Key insight: The first iteration was intentionally minimal — a website with PDF menus and physical flyers — to validate demand before investing in building a real product.

### Duolingo Badges MVE (Failure)
A case study on the dangers of not dogfooding a Minimum Viable Experiment.

How it works: Tested gamification by giving a badge just for signing up. It failed because signup isn't an achievement. The team abandoned badges for 8 months until they realized they hadn't dogfooded the flawed test.

### Gojek WhatsApp Subscription Test (Crystal W)
A Wizard of Oz experiment to test a subscription feature without building it.

How it works: Added 100 drivers to a WhatsApp group. Told them to pitch a $10 subscription to riders. Drivers texted the group when a rider agreed. Interns manually credited the rider's account and deducted $10 from the driver's balance.

### Gong Forecast Product Development Story (How Gong builds product)
Detailed example of how Gong built their Forecast product (revenue analytics) using the design partner methodology

How it works: Problem identified: Increase predictability and improve operational rhythm for revenue teams.
Approach: Rather than spec out a product, reached out to half a dozen design partners who had this need.
Timeline: Over the course of a few months.
Process: Gave design partners access to early versions in an 'embarrassing state' (very far from being a product). Asked initially for high-level feedback, then feedback based on use.
Anecdote: PM gave a design partner access to a feature not slated until a month later — the 'Save' button didn't even work yet, but PM was eager to see what error message would pop up.
Design partner perspective: One partner met with the PM weekly, gave ideas and suggestions. A week later the PM would show up with different approaches assembled from multiple design partners. The partner said being a design partner helped him better nail down his own internal needs and processes.

### Gong Sales Engagement Product Development Story (How Gong builds product)
Example of scaling the design partner methodology for a larger product with multiple PMs

How it works: Product: Sales engagement product (Engage) — serves account executives, sales development managers, managers, and revenue operations.
Approach: Similar design partner methodology as Forecast but scaled up.
Scale: 20-30 design partners worked with in parallel, split across 3-4 PMs.
Metrics progression: Started with stability metrics (connect rates for web dialer) → outcome metrics (meetings booked per seller) → operational metrics (time for new customer to launch) → business metrics (attach rates, ARPU).

### Google Meet Origin Story (Stockholm Solution) (Introducing the Foundation Sprint: From the creators of the Design Sprint)
The story of how Google Meet was created in one week in Stockholm after two years of failed pitches, illustrating the power of focusing on a simple core hypothesis

How it works: Timeline:
- 2007: Google acquires Serge Lachapelle and Mikael Drugge's startup
- 2007-2008: Jake, Serge, and Mikael spend 1.5 years building a giant slide deck with 3D virtual conference rooms, interactive documents, agendas, whiteboards — nobody gets it
- January 2009: Financial crisis hits, Google closing Nordic offices, project about to die
- One week in Stockholm: Team strips away all complexity, focuses on core hypothesis: 'fastest and easiest video call software'
- Monday: Set goal to have working prototype by Friday (not a proposal, not a slide deck)
- During week: Hashed out 'good enough' design, Mikael built the prototype
- Friday: Shared prototype — people finally understood and wanted it immediately
- Googlers started using it for real meetings, spread across company, launched to public as Google Meet

Key lesson: Two years of perfecting a complex pitch failed. One week focused on a simple core hypothesis succeeded. The Founding Hypothesis that worked: 'If we help people who need to meet remotely solve complicated video calls with browser-based video, they'll choose it because it's the fastest and easiest.'

### Google+ vs. Gmail Tabbed Inbox (Itamar Gilad)
A case study contrasting a massive, top-down, opinion-based failure (Google+) with a bottom-up, highly tested, evidence-guided success (Gmail Tabs).

How it works: Google+ wasted millions of hours based on executive fear of Facebook. Gmail Tabs started as an unpopular idea that was validated through Wizard of Oz testing (faking the UI manually) before being built for 1.8 billion users.

### IMVU Teleportation MVP (Eric Ries)
An example of how a 'low quality' hack can actually be a better product experience.

How it works: Instead of building complex 3D walking animations (inverse kinematics) for avatars, IMVU shipped a hack where avatars just teleported to the clicked location. Customers loved it and rated it higher than competitors like The Sims because it was faster and less annoying.

### Jira Product Discovery launch and growth (Tanguy Crusson)
Case study of successfully incubating a new product through Atlassian's Point A program from idea to 8,000 customers

How it works: Timeline: 4 years total. Month 0: Solo research. Month 2: Dogfooding internally. Month 5: First lighthouse user on alpha. Months 5-11: Alpha with small user group. Months 11-23: Beta (~1 year). Year 3: GA launch. Year 4 (today): 8,000 customers, high CSAT, one of fastest growing products in Atlassian history. Key tactics: Newsletter ad before any code (3000+ waitlist signups in 2 weeks), Figma prototypes validated on Zoom, team of contractors in Europe, no engineering manager, weekly internal demos. Started as 1 of ~100 Point A pitches, one of 3 that made it through all stages.

### Linear Origins Beta Program (How Linear builds product)
Linear's customer beta testing program for getting early product feedback before public launches.

How it works: Program name: Linear Origins
Purpose: Give select customers earlier access to new features for product feedback
Timeline: Sometimes a month or two before launch, sometimes days before
Process: Walk customers through the product on calls → enable feature if they're interested → collect feedback → address it
Not required for all features — used selectively when the team finds it useful

### Pre-code demand validation for Jira Product Discovery (Tanguy Crusson)
How Tanguy validated demand for JPD before writing any code using a newsletter ad and waitlist

How it works: Step 1: Placed an ad in Jira newsletter saying 'We've got this thing for product managers coming up.' Step 2: Created a website (no code written yet) saying 'Product managers, your job is hard. We want to help. Put your name here to join us on the journey.' Result: 3,000+ signups in 2 weeks. This validated both demand and the distribution hypothesis (can we reach PMs through Jira channels?).

### Ramp's Manual Savings Reports Validation (How to validate your B2B startup idea)
How Ramp validated their credit card idea by manually creating savings reports for companies

How it works: Ramp's manual validation process:
1. Talked to 100+ finance and founder teams before shipping a single card
2. Theory: 'We're experts in savings, interested in a credit card that saves businesses money. We think we can save you money, but want to prove it.'
3. Created 'Savings Reports': Asked founders for last 90 days of credit card purchases/ACHs
4. Manually (though companies didn't know it was manual) analyzed spending and came back with savings ideas
5. Key aha moment: Found a company spending money on 7 different project management tools (Basecamp, Trello, Asana, Smartsheet, etc.) — ~$100K on software they weren't using because they grew fast and forgot to cancel subscriptions
6. Pitch: 'There's $200K in savings. You don't have to use us, just enjoy this tip. But by the way, this is what our software does automatically and ongoing.'

### Segment's Anti-Design-Partner Launch Strategy (How to validate your B2B startup idea)
How Segment validated by launching publicly instead of using design partners, and why users finding products beats founders finding design partners

How it works: Segment's contrarian validation approach:
1. Did the OPPOSITE of design partner approach — just launched publicly
2. Prior to launch, spent 9 months building for design partners they were talking to
3. Key insight: 'The overlap between the design partners we were talking to and the new users was near zero'
4. Lesson: 'Users are much better at finding products than founders are at finding design partners'
5. Exception caveat: 'There are exceptions to this rule, but if you have very little in the way of network (like we did), then it's probably worth launching'
6. What drove the launch: Desperation — running out of money, would have to 'find real jobs' in months
7. Backup plan was a group-trip-planning idea (which would have been 'a disaster')

### Snagajob High-Volume Hiring Product Discovery (Christian Idiodi)
A real-world example of doing things that don't scale to discover a product solution for high-volume, rapid hiring.

How it works: Started with a problem from Starbucks (needing 800 employees fast). Validated with McDonald's and Macy's. Manually recruited people using flyers and Craigslist. Learned that 80% of applicants don't show up. Scaled the manual process before writing any code. Resulted in a product that booked $32M in its first 90 days.

### Strong Pain Signal Example (Gusto) (How the most successful B2B startups came up with their original idea)
An example of what extreme customer pain looks like when validating a B2B idea — customers cursing about their current solution

How it works: When Gusto's founders asked small business owners about their current payroll provider: 'As soon as we asked them the simple question of how they feel about their current payroll provider, they started cursing. More than half of the people we talked to just started cursing, unprompted. Two people voluntarily told me, "I use [competitor name], and my password is fuck[competitor name]."'

This is an example of extreme pain signal — when customers curse unprompted about their current solution, you've found a deeply underserved market.

### Strong Pull Signal Example (Sprig) (How the most successful B2B startups came up with their original idea)
An example of strong market pull — a customer willing to sign a large contract before the product is even built

How it works: Robinhood agreed to a large contract even though Sprig was early: 'They're like, "We love it. We'll install tomorrow." They installed it as we were building the first version.' This demonstrates what strong pull looks like — customers committing before the product is ready.

### Stytch's Anti-Design-Partner Strategy via Benchmark Advice (How to validate your B2B startup idea)
Why Stytch deliberately avoided design partners and launched a self-serve product instead, based on investor advice

How it works: Stytch's strategic choice against design partners:
1. Deliberately did NOT go the design partner route
2. Instead focused on getting a self-serve product out ASAP (email magic links as wedge)
3. Rationale from lead investor Chetan at Benchmark: Selling authentication to large companies takes a long time — they need a lot of features. Large design partners will keep asking for things you can't serve yet.
4. Better approach: Serve the 'broader long tail of the internet' with your wedge product
5. If a large company only wants your one product, great — let them be a design partner. But more likely they'll pull you in too many directions.
6. Estimated impact: 'If we had built for only one of those [large companies], we probably would've waited another year to launch.'

### VaccinateCA - Building a Nonprofit from a Tweet (Zoelle Egner)
Case study of how a simple tweet turned into a national vaccine location database that powered Google Maps

How it works: Origin: Patrick McKenzie (Patio11) tweeted the idea: 'Call pharmacists, ask who they can vaccinate and what they have, put on a map.' Tools: Discord, Zoom, Airtable (used like a spreadsheet initially). Scale: Hundreds of volunteers globally, eventually covered entire US as 'Vaccinate The States.' Impact: Most comprehensive vaccine location database in the country (more than federal government), powered Google Maps vaccine locations, built API. Outcome: Shut down after 6 months when official systems caught up—intentionally designed as a stopgap. Key lessons: Simple idea + clear individual contribution = massive volunteer mobilization. Started as spreadsheet + phones, scaled to custom software.

### Vanta's Manual Validation Process (How to validate your B2B startup idea)
How Christina Cacioppo validated Vanta's idea by manually creating SOC 2 compliance reports before writing any code

How it works: Vanta's manual validation process:
1. Spent ~6 months before coding, talked to ~24 companies
2. Started by manually answering security questionnaires for companies — they'd send old questionnaires and new ones, and Christina did the copy/paste work by hand
3. Read two dozen SOC 2 reports to learn the space
4. Created a SOC 2 'report card' in a spreadsheet for companies — interviewed their people, wrote out everything needed for SOC 2
5. Two key tests: (a) Would they spend time with us? (b) Would they believe us / find the spreadsheet useful?
6. First test: Did it for Segment — they really liked it ('Wait, really? Are you serious?')
7. Second test: Did a find-and-replace from 'Segment' to 'Front' in the doc. Test: Can we standardize this? Result: It was useful to Front too.
8. Validation moment: Got an unsolicited email from an old Dropbox colleague: 'I hear you guys have become SOC 2 consultants. That's super-weird. Can you come do this for my company?' That's when they started writing code.

### Wealthfront's Self-Driving Money (Chris Hutchins)
A case study on building an automated financial product, testing prototypes, and realizing it improved retention but wasn't a top-of-funnel growth engine.

How it works: Steps included algorithmic ideation, clickable prototype testing (pretending the product existed during user interviews), and measuring impact on system metrics vs. organic growth.

## Tools

### Confidence Meter (Itamar Gilad)
A visual thermometer tool scoring evidence from 0 to 10 to determine the true confidence level of an idea.

How it works: 0-1 (Blue): Opinions, pitch decks, themes. 1-3: Colleague reviews, estimates. 3-5: Anecdotal data, surveys. 5-10 (Red): Fake door tests, alphas, betas, AB experiments.

### Sprint Miro Board Template (Jake Knapp + John Zeratsky)
A digital whiteboard template containing step-by-step instructions and videos for running a Design Sprint.

How it works: Available at sprintbook.com, includes 30+ videos of Jake explaining each step of the sprint process.

