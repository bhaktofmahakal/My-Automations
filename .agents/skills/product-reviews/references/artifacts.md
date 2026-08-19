# Effective Product Reviews - Frameworks, Templates & Checklists

*26 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 15-Minute Product Reviews (Hari Srinivasan)
A time-boxed meeting format to review product initiatives efficiently.

How it works: Reduces standard 1-hour reviews to 15 minutes. The goal is to force the presenter to articulate the problem statement immediately and design from there, cutting out long, institutionalized documentation.

### Duolingo Product Review (PR) Process (How Duolingo builds product)
A staged product review process with four document types used at different phases of product development

How it works: Meeting structure: Occurs every Tuesday and Thursday for 2 hours total. Divided into 20-minute slots that product teams sign up for. Format: 5-10 minutes presenting proposed changes, remaining time for questions and feedback. Open to anyone who wants to observe. New PMs and designers encouraged to watch at least 10 product reviews during onboarding. Core reviewers: Luis (CEO), Simmy (VP of Design), Rotational group of Product Area leads + VP Product, Deanna (Lead Product Ops Manager — runs meeting and coordinates process). Four review types by stage: (1) ONE-PAGER: Get early feedback on a specific idea. Describes potential feature at concept level. Ensures team starts on right foot. Helps identify issues early. (2) 1.5-PAGER: Choose a specific direction for a feature. A one-pager with wireframes or wireflows. Optional step. Useful for big features or when the spec is likely to be controversial. Generates 'right level' of feedback — not 30,000-foot, not pixel-specific. (3) SPEC: Get approval on fully fleshed-out proposed change. Final product review document. Mocks must be pixel-perfect, copy must be word-perfect. Should perfectly represent what users will see. (4) PROTOTYPE: Get feedback on product experience. Centered on a test build of the experience. Reviewers can see the flow themselves. Team shows up with prototype instead of product doc. Most teams don't go through every step — teams decide how much leadership input they need. Most common reviews are one-pagers and spec reviews. Complementary process: QUALITY REVIEW — Reviews implementation quality: performance, visual polish, delightfulness, adherence to approved spec. Teams encouraged to go through quality review before or after rolling out significant features.

### Feature Flag-Driven Development and Review Process (How Linear builds product)
Linear's approach to replacing formal product/design reviews with rapid internal testing via feature flags and async feedback.

How it works: Process:
1. Designers share early designs in project-related Slack groups
2. Get informal async feedback from many people
3. Engineers push new features behind feature flags to internal testing as fast as possible (days or weeks from project start)
4. Everyone at the company can try the feature and provide feedback
5. Iterate based on internal feedback
6. Optionally: push to beta customers via 'Linear Origins' program (sometimes months before launch, sometimes days)
7. For significant features: set up calls with customers to walk through the product, enable the feature, collect feedback
8. Ship when the team has conviction the feature is as good as it can be

Key principle: 'No excuse to wait to ship' — feature flags enable continuous internal testing. Not everything needs to go through beta. Value shipping quickly.

### GSD (Get Shit Done) - 5-Phase Project Review System (How Shopify builds product)
Shopify's homegrown project tracking and stakeholder review tool with five sequential phases

How it works: Every project goes through 5 phases: 1. Proposal - Initial pitch for the project. 2. Prototype - Early design/concept validation. 3. Build - Active development. 4. Release - Shipping the product. 5. Results - Post-launch evaluation. Two-tier sign-off system: OK1 (front-line reviewers: directors from Product, UX, Engineering, Data) and OK2 (senior leadership team from Product, UX, Engineering, Data). Most reviews are async with short PM videos explaining: What is this thing? Why is it valuable? How does it work? Synchronous meetings reserved for controversial or high-stakes topics. Office-hours rotation available for quick 30-minute reviews on short notice.

### Notion's Four-Stage Product Review Process (How Notion builds product)
A structured check-in process at four key milestones in product development, replacing unstructured working sessions. Primarily async with a shift to synchronous for the exploration stage.

How it works: Four check-in stages:

1. **User Problem Statement**: Define and align on the user problem being solved. Sent async via email.
2. **Possible Directions**: Present ~3 high-level approaches to solve the user problem with a team recommendation. SHIFTING to synchronous/in-person (~30 min) because async was too time-consuming for exploration. Stare at Figma together, discuss pros/cons, align on reasoning.
3. **Full Solution**: High-fidelity designs, everything scoped out. Sent async via email.
4. **Ship Candidate**: Final quality check before launch. Sent async via email.

Process details:
- At each step, an engineer, designer, PM, or EM sends an email describing where they are
- Leadership reviews and gives feedback asynchronously
- Feedback covers everything from user problem clarity to product interactions to nitpicky details
- Only projects with 'meaningful product impact' go through this (not every single change)
- Introducing tiering: only P0 projects reviewed by CPTO
- Started February 2023, continuously iterating

### OK1 and OK2 Alignment Process (Farhan Thawar)
A two-step approval and alignment process for projects.

How it works: OK1 is at the director level to ensure directional alignment. OK2 is at the VP level to ensure architectural and industry context alignment.

### Option Space (How Figma builds product)
A framework for product reviews where the presenter maps all possible solutions or problems before discussing specific directions, enabling better debate on tradeoffs.

How it works: Used in product review meetings. Before diving into a specific recommendation, the PM presents the full 'option space' — a framework that maps ALL possible solutions (for solution alignment reviews) or ALL possible problems (for problem alignment reviews). This device is used to discuss high-level tradeoffs and surface philosophical differences among stakeholders. Yuhki describes this as 'really powerful' for driving better conversations.

### Product Review Stages (P-Strat, P0, P1, P2) (How Miro builds product)
A four-stage product review framework aligned to the product development lifecycle, each with defined templates and review criteria

How it works: P-Strat: Long-term strategy and vision review. P0: The opportunity and problem that the team wants to pursue (Product Alignment stage). At end of P0, teams use relative estimation techniques to align on rough timeline. P1: The proposed solution. Once committed to building, teams look at delivery flow and build telemetry for work tracking and team health. P2: What was launched and how it's performing. Each stage has a defined template outlining the type of information the team should bring. Large initiatives: Discussed in sync meetings with pre-scheduled slots (usually Mondays, Wednesdays, Fridays). Teams self-sign up. ~5 hours/week spent on these reviews. Small/medium projects: Approved over Slack where everyone can engage. Process: At booking, Product team identifies who needs to be present. Product Excellence team ensures participation of critical stakeholders (DRIs, Product leaders who can veto or provide direction). Reviews are cross-functional - the full AMPED team presents together. Reviews are open to everyone. After meeting, PMs share details and decisions in a dedicated Slack channel.

### Product/Design Review Meeting Design Principles (How Ramp builds product)
Four principles for running lightweight, non-blocking product and design reviews at scale

How it works: 1. Focus on what truly matters: Any new product or major change to the core user experience. PMs ask: 'If we get this wrong, what impact could it have on our product goals?' If 'big impact,' get input. Otherwise, take the risk and skip the meeting.

2. Don't slow down teams: Make it lightweight, frequent, and non-blocking. Block out an hour every week (e.g. Wednesdays at 4 PM). Folks simply sign up. Leadership is always available.

3. Ensure alignment between product and design: Both product and design leadership in the room ensures they are aligned. Speeds things up instead of hearing feedback from two different people at different times.

4. Stick with relevant folks: Include engineering leaders involved. Exclude anyone outside of tech — their perspective should have been covered as part of the initial spec process as key stakeholders.

### Project Murder Board (Nabeel S. Qureshi)
A peer-review process for new projects where a 2-page plan is aggressively critiqued by smart outsiders.

How it works: Write a 2-page plan including vision, goals, 3-month tactics, and principles. Principles must be controversial enough that reasonable people could disagree with them (e.g., 'move fast' is a bad principle). Invite 3-4 smart people who know nothing about the project to tear the plan apart.

### Quality Classification System (Binary Triage) (Varun Parmar)
A monthly process where design leadership reviews all shipped features and classifies each as high quality or not high quality, building shared understanding through examples rather than written definitions

How it works: Process: 1) One designated design leader owns the monthly triage. 2) Every feature shipped that month gets classified: high quality or not high quality (binary). 3) For 'not high quality' items, specific reasons are documented (A, B, C, D, E). 4) Examples are shared with all designers to build pattern matching. 5) Over time, this builds a corpus of examples that calibrates the entire org. Key insight: Trying to write long documents defining quality failed. Showing examples (like showing colors—pink vs. red) is far more effective. Inspired by how AI classification systems learn.

### Six-Week Reviews (Farhan Thawar)
A recurring review cycle where teams walk through their roadmap, resourcing, and progress with leadership.

How it works: Short enough to remember context, long enough to get meaningful work done. Involves getting in a room for a few days to review every project in the company.

### Uncertainty × Impact 2x2 Review Cadence Rubric (Five principles for successfully managing managers)
A 2x2 matrix for skip leads to determine how closely to review delegated projects based on uncertainty and impact

How it works: Two axes:
- X-axis: Uncertainty (Low to High) — e.g., a new 0-to-1 product offering is high uncertainty
- Y-axis: Impact (Low to High) — e.g., a key launch in the core product that can make or break the financial plan is high impact

Quadrants:
1. Low Uncertainty + Low Impact: Can be easily delegated to a newer line manager and largely 'forgotten about.' Minimal review needed.
2. Low Uncertainty + High Impact: Delegate to a capable manager; periodic review sufficient since execution path is known.
3. High Uncertainty + Low Impact: Good stretch assignment; moderate review cadence.
4. High Uncertainty + High Impact: Assign to someone with high TRM for the situation AND review closely and continually. Especially important for multi-team projects cutting across line managers or skip leads, given inherent inter-team communication difficulties and competing priorities.

Key principle: Delegation does not mean abdicating responsibility. The buck stops with the skip leader.

### Walk the Store (David Singleton)
A company-wide product review ritual to build a shared language and bar for craft.

How it works: Done during a weekly all-hands meeting. The company goes through critical product flows together, focusing on the user experience to align on priorities and quality standards.

## Templates

### Alignment Scale Widget (Yuhki Yamashata)
A FigJam/Figma widget that shows a spectrum where reviewers click to place their avatar, enabling quick pulse checks on alignment during product reviews

How it works: Usage: Drop into any product review or meeting in FigJam. Participants click on a scale from aligned to not aligned, and their face appears on the spectrum. If aligned, move on. If not, discuss. Purpose: Quickly identify hotspots that need discussion without lengthy go-arounds.

### Catalyst Review Format (Lane Shackleton)
A meeting structure for cross-functional product reviews that eliminates standing attendees and single-threaded bottlenecks.

How it works: Requires 3 one-hour blocks per week where the whole company is free. Topics are added dynamically. Each topic assigns four roles: Driver, Maker, Braintrust, and Interested.

### Figma Product Review Template (How Figma builds product)
A FigJam template for running product review meetings — used for decision-making sessions where teams align on problems or solutions.

How it works: Available as a FigJam file at https://www.figma.com/file/m10kTJd28p5DDQC6xoCmY8/Product-Review-Template/duplicate. Two types of reviews use this template: (1) aligning on the problem, (2) aligning on the solution. Key practice: first present the 'option space' — a framework mapping all possible solutions or problems to discuss high-level tradeoffs.

### Opendoor Product Review Template (Brian Tolkin)
A standardized document pre-filled by the product team before a review to align the room on the problem, context, and risks.

How it works: The template includes the following sections: Context, Problem (framed around the user's job-to-be-done), Potential Solution, Risks / Pre-mortem, and Measurement of Success. It is also bucketed by the stage of the project (e.g., ideation vs. ready to ship).

### P0 Product Alignment Document Template (How Miro builds product)
Template for the P0 stage of product review, outlining the opportunity and problem that a team wants to pursue

How it works: Miro provides a public template for the P0 product alignment stage at https://miro.com/blog/product-management-at-miro/ and https://miro.com/miroverse/product-alignment-document-template/. Each stage of the product review (P-Strat, P0, P1, P2) has a defined template outlining the type of information the team should bring.

### Product Review Presentation Template (Annie Pearl)
A presentation template used during product reviews to ruthlessly reinforce focus on the target customer.

How it works: Must explicitly answer: Who is the target customer? Who is the target user within that customer base? What are their needs? How are we going to solve their needs better than any alternative on the market?

### Snowflake Product Review Document (Six-Pager) (How Snowflake builds product)
A six-page document shared one week before product reviews that outlines the customer problem, proposed solution, and key data for leadership review

How it works: Sections typically included (no prescribed template, but commonly contains):
1. Executive Summary
2. Goals and Non-Goals
3. Background Information
4. Problem Statement
5. Key Tenets (underlying product principles)
6. Use Cases
7. Key Requirements
8. Risks
9. Timeline
10. FAQ Section

Process:
- Shared with attendees 1 week before the review meeting
- Attendees review and comment on the document before the meeting
- Goal is NOT to 'sell' leadership on an investment, but to detail customer requirements, align on business priorities, and provide clear direction
- Attendees include product/engineering leadership, architects, directors, and relevant stakeholders
- Co-founders attend and actively comment
- Any PM can add a review to the schedule backlog
- Each product area has roughly one product review per month

## Checklists

### Async Product Review Workflow with Talktracks (How Miro builds product)
A workflow for making product reviews more efficient by shifting presentations to async and focusing meetings on discussion

How it works: Workflow: 1. PMs create Talktracks (board recordings) a few days before the meeting. 2. CPO and other reviewers watch Talktracks async. 3. Reviewers add comments or questions directly on the board. 4. In the live meeting, skip the 'presentation' portion entirely. 5. Jump directly to important discussions. 6. During the meeting, use interactive presentations to share slides, data from dashboards, and Talktracks. 7. Capture reactions and questions from all participants on the frames in real time. 8. After the meeting, PMs share details and decisions in a dedicated Slack channel. Result: Described as a 'game changer' for meeting efficiency.

### Concentric Circle Review Process (Bill Carr)
An iterative feedback loop for reviewing product documents (like PR/FAQs) to build a product funnel.

How it works: Step 1: Author writes low-fidelity draft. Step 2: Share with a small group for feedback. Step 3: Iterate and widen the group. Step 4: Escalate only the best ideas up to senior leadership.

### Factory Inspection Process (Loom Reviews) (Matt MacInnis)
A process for reviewing product flows before they ship.

How it works: Teams must record a Loom video of every major flow through the product. The executive reviews every flow and provides feedback in a public channel to model intensity and standards for the rest of the org.

### GSD 'Okay-To' Review Process (Archie Abrams)
A mandatory quality assurance and taste-check process for shipping any new product or feature.

How it works: Every project must submit a short video walkthrough with Figma designs. It cannot ship until it receives an explicit 'okay-to' approval from a designated group lead (e.g., Head of Core Product, Head of Growth) to ensure it meets the company's taste bar.

### Three-Step Product Review Process (Nickey Skarstad)
A structured sequence of check-ins for product development to ensure alignment without bottlenecking.

How it works: Gate 1: First principles check-in (What are we trying to build and what are we solving for?). Gate 2: Approach/Technical review (How are we going to build it? Architecture review). Gate 3: Pre-ship review (Is it ready to go and does it meet the quality bar?).

