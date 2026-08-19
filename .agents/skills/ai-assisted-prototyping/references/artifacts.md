# AI-Assisted Prototyping - Frameworks, Templates & Checklists

*60 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### AI Coding Graduation Path (Zevi Arnovitz)
A progressive skill-building path for non-technical people to become comfortable with AI-assisted coding, structured as exposure therapy

How it works: Step 1: ChatGPT/Claude projects — beautiful UI, conversational, learn concepts. Step 2: Bolt/Lovable/Replit/Base44 — opinionated builders that abstract away decisions. Step 3: Cursor in light mode — more control, start seeing code. Step 4: Full terminal/dark mode — Claude Code, complete control, all decisions yours. Graduate when you 'outgrow' the current tool (e.g., when Bolt's opinions limit you).

### AI Development Tool Selection Framework (A guide to AI prototyping for product managers)
A three-tier categorization of AI development tools with specific selection criteria for each category, helping PMs choose the right tool for their prototyping needs.

How it works: Three categories of AI development tools:

1. CHATBOTS (ChatGPT, Claude)
- Best for: Single-page prototypes without complex design requirements (calculators, flip cards, data visualizations)
- Limitations: Can't host code, can't create multi-page apps, difficult to edit code directly
- Claude advantage: Artifact system allows running code in-browser and deploying to shareable link

2. CLOUD DEVELOPMENT ENVIRONMENTS (v0, Bolt, Replit, Lovable)
- Best for: Multi-feature prototypes, specific design requirements, many pages
- v0: Beautiful designs by default, uses Next.js and Shadcn UI, deploys to real cloud hosting
- Bolt: Quick prototypes with flexible designs, runs server in browser (limitation: no native user identity, multi-user, secure data, or persistent storage)
- Replit: Internal tools, data-driven apps, supports Python and JavaScript, includes database
- Lovable: Production apps with integrations (GitHub, Supabase, AI providers), but lacks code editor

3. LOCAL DEVELOPER ASSISTANTS (GitHub Copilot, Cursor, Windsurf, Zed)
- Best for: People who know how to code, serious production applications
- Cursor: Best at general instructions, modifies existing files
- GitHub Copilot: Better in enterprise, needs specific direction
- Windsurf: Larger complex codebases
- Zed: Productivity features like prompt libraries and keyboard shortcuts

Decision rule for most PMs: Use cloud development environments. Choose v0 for beautiful designs, Bolt for quick flexible prototypes, Replit for internal/data tools, Lovable for production apps with integrations.

### Baselines and Forks Workflow (How to get your entire team prototyping with AI)
A team workflow pattern for AI prototyping that creates a single high-quality reproduction of your current product (baseline) and uses forks to explore ideas without rebuilding

How it works: Three layers:
1. Component Library: Building blocks (buttons, cards, nav bars, etc.) that match your brand
2. Baseline: A high-quality reproduction of your current product experience built using the component library. Treat as read-only—never modify directly.
3. Forks: Duplicates of the baseline that team members can freely experiment on without using tokens or risking the baseline.

Process:
1. Build component library using one of the three methods
2. Create a baseline reproduction of your current product page (~20 min with component library)
3. Lock the baseline (make no further changes)
4. Create a fork for each new idea you want to explore
5. Prompt the fork with your new idea (e.g., 'Modify this page so that it runs through a questionnaire...')
6. Create additional forks from baseline for each alternative idea

Benefits:
- No rebuilding the starting page each time
- Zero token cost for creating forks
- Easy to compare multiple ideas side by side
- Any team member can fork and explore

Fork instructions available for: Bolt, v0, Lovable, Replit, Magic Patterns

### ChatPRD-to-vibe-code workflow (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
A workflow for going from raw idea to live prototype using ChatPRD integrated with vibe-coding tools

How it works: Step 1: Start with raw ideas or messy notes. Step 2: Use ChatPRD to turn them into clear, structured PRDs. Step 3: Share the PRD with your favorite vibe-coding tool (Lovable, Bolt, or others). Step 4: The vibe-coding tool turns the PRD into a live, interactive prototype. Additional workflow: In Linear, mention @chatprd in comments to improve task descriptions, break down work into actionable sub-issues, and get product feedback. ChatPRD also integrates with Gamma, Magic Patterns, and Linear for end-to-end spec-to-prototype pipelines.

### Five Core Prompting Techniques (Sander Schulhoff)
A prioritized set of prompting techniques from basic to advanced that Sander recommends, summarized by Lenny at the end of the techniques discussion

How it works: 1. Few-shot prompting: Give examples of desired output (most impactful). 2. Decomposition: Ask 'what are subproblems that need to be solved first?' then solve each. 3. Self-criticism: Ask LLM to check its response, get criticism, then ask it to implement improvements (do up to 3 times). 4. Additional information: Provide as much context as possible, place at beginning of prompt for caching benefits. 5. Ensembling: Use multiple prompts/models/roles on same problem, take most common answer.

### Four Parallel Builds (Lazar Jovanovic)
A method for starting a new AI project by running 4-5 different prompts simultaneously to quickly identify the best architectural and design direction.

How it works: Step 1: Brain dump via voice. Step 2: Structured text prompt. Step 3: Attach a visual mock design (from Mobbin/Dribbble). Step 4: Attach an actual code snippet/template (from 21st.dev). Compare the outputs and select the clear winner to build upon.

### Four Strategies for Debugging AI Prototypes Without Coding (A guide to AI prototyping for product managers)
A framework of four strategies non-technical PMs can use to resolve errors and get better results from AI prototyping tools.

How it works: Strategy 1: REFLECTION
- Force AI to plan before writing code
- Ask AI to detail minimum requirements first WITHOUT writing code
- Example prompt: "Build me a calorie tracking app with only a front end. Start by detailing out the minimum requirements. Do not write any code."
- Also use reflection to escape error loops: ask AI for a list of possible reasons an error exists, explicitly requesting no code, only explanations

Strategy 2: BATCHING
- Counter-intuitive: providing MORE context upfront leads to WORSE results
- Build the smallest functional iteration first, then extend
- Start with the data model first (backbone of how prototype stores information)
- Break complex prototypes into smaller sequential prompts
- Example prompt: "Implement only the client-side view for calorie tracking. Use a basic data model that tracks entries with a description and number of associated calories. Display a table of all current entries and the sum of total calories in the top right corner."

Strategy 3: BE SPECIFIC
- Treat AI like a junior engineer—specify technologies, product areas, files, and even specific lines of code
- Detail every change point precisely
- Example prompt: "Add the ability to track calories on each day.
  - Extend the data model to include a date for the entry
  - Display a date picker in the entry form, defaulted to today's date
  - Display today's date inline with the total calorie amount
  - Add a left and right navigation arrow inline with the calorie amount to switch days backward and forward
  - The total calorie amount should show the sum of calories on the specified date."

Strategy 4: LOST CONTEXT
- Problem: AI rewrites entire sections when instructions aren't specific enough, losing hours of work
- Solution 1: Use checkpoint/rollback systems built into tools
- Solution 2: Combine the other three strategies:
  a) Reflection to determine what files need to change
  b) Batching to limit changes in each iteration
  c) Being specific to minimize incorrect results

### Product Development Lifecycle for AI Prototyping (How to get your entire team prototyping with AI)
A six-step framework mapping when and how AI prototypes should be used throughout the product development process, including fidelity levels and ownership

How it works: Step 1: Discovery
- Fidelity: Medium
- Owner: PM
- Audience: Internal (product, design, engineering lead)
- Time: ~20 minutes
- Purpose: Quickly express an idea to start internal discussion
- Note: Not suitable for executives or customers

Step 2: Roadmap and Alignment
- Fidelity: High
- Owner: PM and/or Designer
- Audience: Stakeholders and customers
- Time: 20-60 minutes (refining from discovery prototype)
- Purpose: Build buy-in with polished, professional prototype using component library

Step 3: PRD and Mocks
- Fidelity: High
- Owner: PM
- Audience: Engineering team
- Time: 2+ hours across multiple discussions
- Purpose: Include prototype in PRD, demo live to generate questions, work out edge cases
- Key benefit: Drives conversations faster than text-only PRDs

Step 4: User Interviews
- Fidelity: High
- Owner: PM and/or Designer
- Audience: Users/customers
- Time: 3-5 days for sufficient feedback collection
- Purpose: Get feedback on exact user flows early in development cycle
- Bonus: Embed survey tools (e.g., Typeform) directly into prototype for scaled feedback

Step 5: Engineering Scoping and Delivery
- Fidelity: High
- Owner: Engineering
- Time: 2-6 weeks depending on complexity
- Purpose: Communication tool for questions during build
- Important caveat: AI prototype code is mostly useless to engineering (doesn't follow existing patterns, libraries, or programming language)
- Exception: Specific interactions like animations can be reused

Step 6: (Implied) Launch/Iteration
- Prototype continues to serve as communication tool

Key principle: Choose appropriate fidelity for context and set clear expectations with team members around fidelity level.

### Prototype Fidelity Spectrum (How to get your entire team prototyping with AI)
Three levels of prototype fidelity and when to use each in AI prototyping

How it works: Low Fidelity (Lo-fi):
- Traditional scratch-pad/napkin drawings
- Not the focus of AI prototyping tools

Medium Fidelity (Mid-fi):
- NEW category introduced by AI prototyping tools
- Better than a napkin drawing but still not as good as finalized Figma mocks
- Contains imperfections: doubled UI elements, incorrect padding, misaligned navigation
- Example: Reddit mock with two upvote buttons, too much left nav padding, top-right nav pushed in too far
- When to use: Explaining interactions to engineers, internal team discussions, early discovery
- Time: ~20 minutes

High Fidelity (Hi-fi):
- Polished, professional output
- Achievable with AI tools but requires more time and effort
- Uses component libraries for brand consistency
- When to use: Customer interviews, stakeholder presentations, CEO pitches, PRD supplements
- Time: 20-60 minutes

Key principle: It's critically important to choose appropriate fidelity based on context and set clear expectations with team members. Don't waste time on hi-fi when mid-fi suffices (e.g., engineer communication). Invest in hi-fi when stakes are high (e.g., pitching CEO on millions in investment).

### Reflection Technique for Prototype Refinement (How to get your entire team prototyping with AI)
A prompting technique that leverages AI self-evaluation to quickly identify and fix differences between a screenshot and the AI's implementation

How it works: Prompt: 'List the differences between the screenshot and your implementation. How can you match the design more exactly? Don't code.'

How it works:
1. The AI compares its output to the original screenshot
2. It identifies specific visual differences
3. It proposes fixes WITHOUT generating code yet
4. You review the proposed fixes and decide which to implement
5. Then ask it to implement the changes

The 'Don't code' instruction is critical—it forces the AI to analyze before acting, leading to better UX improvements. This technique is called 'reflection' and is a general-purpose prompting strategy.

### Three Methods for Building Component Libraries (How to get your entire team prototyping with AI)
A decision framework for choosing how to build AI prototyping component libraries based on effort, technical requirements, and output quality

How it works: Method 1: Screenshots
- Effort: Low
- Technical expertise needed: None
- Tool compatibility: Any AI prototyping tool
- Output quality: Good (mid-fi)
- Process: Take screenshots of your product, use the component library prompt, iterate with reflection technique

Method 2: Chrome Extensions
- Effort: Medium
- Technical expertise needed: Low
- Tool compatibility: Magic Patterns (currently only tool supporting this)
- Output quality: Better (extracts actual styling)
- Process: Use Chrome extension to select UI elements, extract styling, turn into reusable components

Method 3: Code
- Effort: High
- Technical expertise needed: High (GitHub, terminal commands, engineering support)
- Output quality: Best (indistinguishable from real product)
- Process: Set up front-end to run locally without back-end, mock API responses, use Cursor/Windsurf to prototype
- Variant: Use Figma MCP server to extract design tokens and CSS directly from Figma designs
- Best for: Smaller companies or those with more technical designers and PMs

### Vibe Coding (Kevin Weil)
A rapid prototyping method using AI code generators where the human guides the high-level direction and accepts AI suggestions.

How it works: Give a prompt, let the model generate, hit tab/accept repeatedly. If there's an error, paste it back and say 'go'. Used to build proofs of concept and internal tools in minutes.

### Vibe Coding Approach (What people are vibe coding (and actually using))
Lenny's recommended approach to getting started with vibe coding — treat AI tools like a remote engineer you're giving instructions to

How it works: 1. Open one or more AI coding tools (Cursor, Claude Code, Replit, Lovable, v0, Bolt, or ChatGPT)
2. Simply describe what you want in plain English, as if you were talking to a remote engineer
3. Iterate by describing what you want to change about what you see, as if you're speaking with a remote engineer
4. You'll be surprised by how far you get

## Templates

### Emotion Prompting Template (Five proven prompt engineering techniques (and a few more-advanced tactics))
A template for adding emotional stakes to prompts to elicit more thoughtful responses

How it works: Template: "Help me [task]. Please make sure [attribute]. This task is very important for my career."

Example: "Help me draft a product roadmap presentation that will resonate with our executive team. Please make sure it conveys a sense of urgency and highlights the strategic importance of each initiative. This task is very important for my career."

Caveat: Use judiciously — can sometimes have the opposite intention and lead to worse results.

Source paper: https://arxiv.org/abs/2307.11760

### GPT Index Chatbot Code Template (I built a Lenny chatbot using GPT-3. Here’s how to build your own.)
Minimal code to index a content archive and query it with GPT-3

How it works: Two main code blocks: (1) Index Construction — collect all content files into a folder, use GPT Index (now called LlamaIndex) to break files into sequential chunks, create embeddings for each chunk, and store in index.json. (2) Query — pass a user question to GPT Index, which automatically finds the most relevant chunks via embedding similarity, combines them with the question into a prompt, sends to GPT-3, and returns the answer. Full source code available in a Google Colab notebook. Cost note: embeddings cost $0.0004 per 1,000 tokens.

### GPT-3 Chatbot Prompt Template (I built a Lenny chatbot using GPT-3. Here’s how to build your own.)
The prompt structure used to make GPT-3 behave as a chatbot with a specific personality

How it works: Format: Start the prompt with personality/role instructions (e.g., 'You are a friendly, warm, and smart product management assistant based on Lenny Rachitsky's newsletter'). Then structure the conversation as a transcript format with labeled speakers. Each time the model is called, feed it the entire conversation transcript so far plus the new user message. GPT-3 completes the transcript by generating the next chatbot response. The key insight is that GPT-3 has read enough chatbot transcripts to understand and follow this format.

### Lightweight AI-Assisted PRD (Eric Simons)
A minimal Product Requirements Document that replaces heavy text specifications with a live, functional AI-generated prototype.

How it works: Keep written context minimal to avoid communication loss. Instead of writing out exact UI/UX behaviors, include a link to a live Bolt prototype so stakeholders and developers can 'feel' the feature.

### Poor Man's Fine-Tuning Prompt (Kevin Weil)
A prompting technique that includes multiple examples of inputs and desired outputs before asking the actual question.

How it works: Structure: [Example Problem 1] -> [Good Answer 1], [Example Problem 2] -> [Good Answer 2], [Actual Problem] -> [Expected Output]. This teaches the model the exact format and quality expected.

### Product Manager MVP Prompt (Amjad Masad)
A descriptive prompt structure used to generate a full-stack web application via an AI agent.

How it works: Prompt structure: 1. Specify the stack (e.g., Node.js). 2. Define the core purpose (track feature requests on a public dashboard). 3. List specific features (feature request submission, voting system, status tracking with planned/in-progress columns). 4. Specify design requirements (user-friendly, modern). 5. Define user roles (admin controls for the PM).

### Prompt Template: Data Dashboard (A guide to AI prototyping for product managers)
Copy-paste prompt template for building a data visualization dashboard using Python and Streamlit with Replit.

How it works: Task: Build a dashboard to visualize data
Tool: Replit

Prompt:
"Build a prototype for [x].
Use Python and Streamlit."

Example output: Product analytics dashboard (https://product-analytics-dashboard-colinmatthews2.replit.app/)

### Prompt Template: Figma Design to Prototype (A guide to AI prototyping for product managers)
Copy-paste prompt template for converting a Figma design screenshot into a working prototype using Bolt.

How it works: Task: Build a prototype from an existing Figma design
Tool: Bolt

Prompt:
"Build a prototype to match this design. Match it exactly. Use Tailwindcss.
Match styles, fonts, spacing, and colors.
[Include a single screenshot from Figma]"

Example output: Deployment manager (https://spectacular-jelly-78231b.netlify.app/)

### Prompt Template: Hand-drawn Sketch to Prototype (A guide to AI prototyping for product managers)
Copy-paste prompt template for converting a hand-drawn mockup into a functional prototype styled after a known product.

How it works: Task: Convert a hand-drawn mockup to a prototype
Tool: v0

Prompt:
"Convert the hand-drawn sketch to a functional prototype. Focus on frontend functionality.
Make it in the style of [product you like].
[Include photo of hand-drawn sketch]"

Example output: Netflix-inspired blog (https://a4thjlf0qthccgos.vercel.app/)

### Prompt Template: PRD to Prototype (A guide to AI prototyping for product managers)
Copy-paste prompt template for converting a product requirements document into an interactive front-end prototype using Bolt.

How it works: Task: Convert a PRD to a prototype
Tool: Bolt

Prompt:
"Implement a prototype to match the features in this PRD. Follow the exact specifications in the document. Focus on front end functionality -- do not include a server or database. Use Tailwindcss
[Copy/paste PRD. Include any relevant images]"

Example output: 2-factor authentication UI (https://musical-pegasus-eb007e.netlify.app/)

### Prompt Template: Personal Productivity Tool (A guide to AI prototyping for product managers)
Copy-paste prompt template for building a personalized internal or productivity tool using Replit.

How it works: Task: Build your personalized productivity tool
Tool: Replit

Prompt:
"Build a tool that does [x].
This tool should:
- [Behavior 1]
- [Behavior 2]
- [Behavior 3]"

Example output: Substack image resizer (https://substack-image-resizer-colinmatthews2.replit.app/)

### Prompt Template: Prototype from Scratch with Good UI (A guide to AI prototyping for product managers)
Copy-paste prompt template for building a prototype from an idea with good default UI design using v0.

How it works: Task: Build a prototype from scratch with good UI design defaults
Tool: v0

Prompt:
"Build a prototype for [x].
This tool should:
- [Behavior 1]
- [Behavior 2]
- [Behavior 3]
Implement a simple initial iteration that meets these exact requirements."

Example output: Sales calculator (https://v0.dev/chat/zMcDEi4HTuf?b=b_blmQipLxqTK)

### Prototype Generation Prompt Workflow (How to build your PM second brain with ChatGPT)
A workflow for generating Lovable-ready prompts from your second brain by combining screenshots and behavior descriptions

How it works: Workflow:
1. While in a conversation thread in your Project, identify a moment where the idea feels stuck in theory
2. Say: "Let's make this real. Write me a prompt for Lovable that builds this experience."
3. Drop in screenshots from Figma, highlight specific areas you're referring to
4. Describe the desired behavior: e.g., "This panel should expand on hover. This tooltip should guide users through setup. Keep it lightweight, just enough to simulate the flow."
5. The Project uses the images as reference + all accumulated context to generate a Lovable prompt
6. Copy the prompt into Lovable to get a working prototype in minutes
7. Use the prototype to gather feedback from designer and engineer before anyone builds

### RAG (Retrieval-Augmented Generation) Prompt Template (Five proven prompt engineering techniques (and a few more-advanced tactics))
A template for providing relevant documents as context before asking AI to perform analysis

How it works: Template: "Based on [relevant document(s)], answer this question: [question]."

Example: "Based on Seeking Alpha's Tesla report, answer this question: How does Tesla's performance compare with competitors like BYD?"

Note: In practice, the full PDF is inserted into the prompt. In many systems (including OpenAI's custom GPTs), only the most relevant parts of the report will be retrieved via vector search (searching by similarity to the user question).

Source paper: https://arxiv.org/abs/2005.11401

### Reddit Answers PRD Prompt (Full Example) (How to get your entire team prototyping with AI)
A complete PRD-as-prompt example used to generate a medium-fidelity AI prototype of a gen AI feature called Reddit Answers

How it works: # Reddit Answers PRD

## Overview
Reddit Answers is a new Q&A feature that leverages Reddit's vast community knowledge to provide generated, fact-based answers to user questions, with references to specific posts and comments. It prioritizes highly upvoted, less controversial content and supplements Reddit information with external sources to enhance credibility.

## User Stories
- As a user, I want to ask questions and receive comprehensive answers based on Reddit's collective knowledge.
- As a user, I want to see which specific Reddit posts and comments contributed to the answer.
- As a user, I want to understand how reliable the Reddit-sourced information is compared with external sources.
- As a user, I want to access additional external links that provide more context to the answer.
- As a user, I want to navigate easily to the Reddit discussions referenced in the answer.
- As a developer, I want to access Reddit Answers data via API to enhance AI applications with Reddit's knowledge.

## Implementation Phases
### Phase 1: Core Q&A Experience
- Question input interface in left nav
- Answer generation from Reddit content
- Basic reference linking to source posts/comments
- Simple reliability scoring
- Local answer history

### Phase 2: Enhanced Credibility & Context
- Sophisticated reliability-scoring algorithm
- External source integration
- Content moderation systems
- Improved reference highlighting
- Personalized answer recommendations

### Phase 3: Ecosystem Integration
- API access for AI companies
- Analytics dashboard for Reddit team
- Community feedback mechanisms
- Mobile optimization
- Enhanced search integration

## Design System
Colors:
- Primary: Reddit Orange (#FF4500)
- Secondary: Periwinkle Blue (#9494FF)
- Background: Light Gray (#F8F9FA)
- Text: Dark Gray (#1A1A1B)

Typography:
- Reddit's IBM Plex font family

Spacing:
- Consistent 8px grid system

## Components:
- Question Input
- Answer Card
- Reference List
- Reliability Score Badge
- External Link Cards
- Source Attribution Tag

## Data Model
### Question
- id: unique identifier
- text: the user's question
- timestamp: when question was asked
- user_id: who asked the question
- category: auto-categorized topic area

### Answer
- id: unique identifier
- question_id: reference to question
- text: generated answer content
- reliability_score: 0-100 score comparing Reddit info with external sources
- timestamp: when answer was generated

### Reference
- id: unique identifier
- answer_id: reference to answer
- post_id: Reddit post referenced
- comment_id: specific comment referenced (optional)
- relevance_score: how relevant this reference is to the answer
- controversy_score: measure of how controversial the content is
- upvote_count: number of upvotes on referenced content

### ExternalSource
- id: unique identifier
- answer_id: reference to answer
- url: link to external source
- title: title of the external content
- relevance_score: how relevant this source is to the answer
- domain_authority: credibility rating of the source domain

### Screenshot-to-Component-Library Prompt (How to get your entire team prototyping with AI)
A detailed prompt template that instructs an AI prototyping tool to analyze a screenshot and generate a full React/Tailwind component library with custom components

How it works: Prompt text:

You are tasked with creating a component library based on a screenshot using React, and Tailwind CSS.

All components should be custom-made to match the screenshot as closely as possible.

Follow these instructions carefully:

1. Analyze the provided screenshot.
2. Identify distinct UI components in the screenshot. These may include, but are not limited to:
   - Buttons
   - Input fields
   - Navigation bars
   - Cards
   - Modals
   - Typography elements
3. For each identified component:
   a. Create a React functional component.
   b. Use Tailwind CSS classes to style the component, matching the visual design in the screenshot.
   c. Ensure the component is responsive and accessible.
   d. Add any necessary props for customization.
   e. Include a brief comment describing the component's purpose.
4. After creating all individual components, create an index page that imports and displays each component with example usage.

Remember to use only custom-made components and Tailwind CSS classes. Do not use any external libraries or pre-built components.

Strive to match the visual design in the screenshot as closely as possible while maintaining good coding practices and component reusability.

Follow-up prompt if tool reproduces the screenshot instead of listing components: 'Instead of showing me a page that re-creates the UI, the index page should be a list of components in the component library.'

Refinement prompt using reflection technique: 'List the differences between the screenshot and your implementation. How can you match the design more exactly? Don't code.'

### Synthetic Bootstrap Prompt Template (2-step) (Five proven prompt engineering techniques (and a few more-advanced tactics))
A two-step template for generating synthetic examples and then using them as context for subsequent tasks

How it works: Step 1 Template: "Generate ten examples of [examples] for [context]. Here are the inputs: [inputs]."

Step 2 Template: "Generate [task] using [examples]."

Example Step 1: "Generate ten examples of user personas for our new fitness tracking app. Here are the inputs:
- Name and age
- Occupation
- Fitness goal
- Current fitness routine
- Technology comfort level
- Key pain points in their fitness journey"

Example Step 2: "Generate potential customer feedback on our idea to track calories burned during work meetings, using our user personas."

Source paper: https://arxiv.org/abs/2310.03714

### Vercel AI SDK / Open-Source ChatGPT Template (Guillermo Rauch)
A foundational plumbing template for building vertical AI applications.

How it works: Available at vercel.com/templates. Allows developers to clone a ChatGPT-style interface that supports 'generative UI' (responding with interactive components instead of just text) to build expert AI tools.

### Zero-Shot Personal Website Prompt (Eric Simons)
A simple prompt structure for first-time users to test AI coding tools and understand their capabilities.

How it works: Prompt structure: 'I need a website, my name is [Name], here's my LinkedIn history: [Paste copied LinkedIn text]. My favorite color is [Color], and I like [Interest]. Make it pretty.'

## Checklists

### Cloud Development Environment Selection Criteria (A guide to AI prototyping for product managers)
Quick decision checklist for choosing between v0, Bolt, Replit, and Lovable based on project requirements.

How it works: Choose v0 when:
- You want beautiful designs by default
- You need real cloud hosting infrastructure
- You're comfortable with Next.js/Shadcn UI defaults

Choose Bolt when:
- You need quick prototypes with flexible designs
- You're building off a pre-existing design (Figma screenshot)
- You DON'T need: user login/accounts, multi-user interactions, payment processing, persistent data storage between sessions

Choose Replit when:
- You need a fully functional backend
- You want to use Python code
- You're building internal admin tools (file conversion, applicant tracking)
- You're building data-driven applications (image resizing, multi-page dashboards)
- You need a database

Choose Lovable when:
- You want to build production apps
- You need integrations with GitHub, Supabase, or AI providers (Anthropic, OpenAI)
- You need authentication and databases via Supabase
- Note: No code editor—may need to move to Cursor for debugging

### Logo Integration Checklist for AI Prototypes (How to get your entire team prototyping with AI)
Two methods to get your real company logo into AI prototypes instead of AI-generated approximations

How it works: Method 1: Inspect Element
1. Navigate to your website
2. Right-click on the logo image
3. Select 'Inspect Element'
4. Find the image element in the DOM
5. If it's a regular image: Copy the image URL
6. If it's an SVG: Copy the SVG content directly
7. Paste into your AI tool with prompt: 'Add my logo to the header using this [link/SVG]'

Method 2: Logo Repository (Brandfetch)
1. Go to Brandfetch (brandfetch.com)
2. Search for your company
3. Find your logo
4. Copy the embed link
5. Paste directly into your AI prototyping tool

Key tips:
- Make sure you're linking to the image itself, not a webpage
- URL should typically end in .PNG or .SVG
- For realistic stock images in prototypes, prompt: 'Add images from Unsplash that make sense given the context'
- These approaches work for any images, not just logos

### Lovable use cases by team function (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
Four team-specific ways to apply Lovable in an organization

How it works: 1) Product teams: Turn PRDs or screenshots into live, interactive prototypes to validate ideas; 2) Marketing teams: Launch landing pages; turn customer collateral into interactive websites with trackable CTAs; 3) Sales teams: Build ROI dashboards that quantify product value; 4) Finance teams: Take FP&A out of spreadsheets and into live, easy-to-use dashboards.

### Team AI Prototyping Adoption Roadmap (How to get your entire team prototyping with AI)
Three-step sequence for driving team-wide adoption of AI prototyping

How it works: Step 1: Establish Component Libraries
- Choose method (screenshots, Chrome extension, or code) based on team capabilities
- Build shared component set matching your brand
- Share across entire team for consistent visual quality
- Use for onboarding new team members

Step 2: Implement Baselines and Forks
- Create baseline reproductions of key product pages
- Teach team to fork instead of rebuilding from scratch
- Accelerate iteration by eliminating repetitive setup work

Step 3: Align on Fidelity Levels and Lifecycle Usage
- Define when mid-fi vs hi-fi is appropriate
- Map prototype usage to each stage of your product development lifecycle
- Clarify ownership (PM vs designer vs engineering) at each stage
- Set clear expectations with stakeholders about fidelity levels

This separates teams 'poking at the surface' from those 'fully integrating AI tools into their best practices and daily workflows.'

### Vibe Coding Idea Categories (What people are vibe coding (and actually using))
Categories of problems people are solving with vibe coding, useful as an idea generation framework

How it works: Categories with example problems:
1. Health, Wellness, and Style — Carb counting, workout tracking, clothing decisions, meal planning, habit tracking, sports tracking
2. Parenting and Family — Story generation for kids, budgeting education, photo/video memories, baby care tracking, chore management, bedtime routines, greeting cards
3. Work Productivity — Meeting prep, standup facilitation, calendar/scheduling, time tracking, email management, accomplishment tracking
4. Personal Productivity — Home automation, bill splitting, restaurant discovery, document management
5. Personal Development — Conversation analysis, language learning, journaling/reflection
6. Music — Playlist curation, production inspiration
7. Games and Fun — RPG games, kids' learning games, trivia
8. Chrome Extensions — Paywall bypass, email augmentation, availability sharing
9. Internal/Backend Tools — Member management, Slack bots, dashboards, Figma plugins
10. Niche Utility — Immigration documents, fantasy sports drafting, healthcare policy monitoring

## Examples

### 2D Tank Game (Quick AI Build Example) (A guide to AI prototyping for product managers)
Example of building a complete 2D game with AI opponent in 10 minutes using iterative prompts.

How it works: Build time: 10 minutes
Prompt sequence:
1. "Build a 2d tank game with an AI opponent."
2. "Add collision for the shot when it hits a tank."
3. "When health hits zero, play an animation and reset the game."
4. "Improve the acceleration for player movement."
5. "Make it so holding down the space bar has a timer to shoot a 2nd time."
6. "Add power ups to the map."

Deployed example: https://cfjzdhoyqmiljtvb3fnjprf0stjcd8tg.vercel.app/

Key takeaway: Demonstrates iterative prompting pattern—start simple, add features incrementally.

### AI Weekend Project Routine (Howie Liu)
A practical example of how to string together AI tools to build intuition.

How it works: Step 1: Deep research a topic with ChatGPT. Step 2: Prompt it to generate a comical dialogue script. Step 3: Use HeyGen to create an avatar video reading the script. Total time: ~1 hour.

### Airbnb Experiences Baseline & Fork Example (How to get your entire team prototyping with AI)
Full walkthrough of creating a baseline of Airbnb's Experiences page and forking it to explore two different feature ideas

How it works: Scenario: PM at Airbnb working on the Experiences product

Step 1: Create Baseline (~20 minutes)
- Used component library to reproduce current Airbnb Experiences page
- Focused on matching branding details exactly
- Result: Nearly identical reproduction of the real Airbnb Experiences page
- Lock this as baseline—no more changes

Fork 1: Questionnaire-based Discovery
- Prompt: 'Modify this page so that it runs through a questionnaire to determine experiences that I would like before showing me experiences. Maintain the Airbnb branding.'
- Result: Interactive questionnaire flow leading to personalized experience recommendations

Fork 2: Travel History-based Recommendations
- Prompt: 'Modify this page so it shows me experiences I would like based on my past travel history with Airbnb. For each recommendation, add a UI element that says based on your trip to...'
- Result: Personalized experience page with contextual recommendations tied to past trips

Key insight: Both forks started from the same baseline, took minimal time, and produced two distinct testable concepts.

### Airbnb Price Filter Prototype (Design-to-Prototype Walkthrough) (A guide to AI prototyping for product managers)
Step-by-step example of converting an Airbnb homepage design into a working prototype with a new price filter feature, built in under 10 minutes using Bolt.

How it works: Step 1: Upload Airbnb homepage design screenshot to Bolt with prompt: "Build a prototype to match this design. Match it exactly."

Step 2: Add price filter feature with specific prompt: "Implement an inline price filter as a component of the search bar. It should appear next to 'Add guests' in its own section. Selecting the input should pop up a price filter with minimum and maximum values. The background of the pop-up should be white and should cover elements beneath it."

Step 3: Extend with price slider: "Can you add a price slider? It should have a blue line and a black node. Sliding the node should modify the minimum price."

Result: Functional prototype in ~10 minutes, no coding skill required.
Deployed example: https://peaceful-shortbread-751d61.netlify.app/

Pro tip: Be hyperspecific when describing changes in subsequent prompts to help the AI pinpoint what should change.

### Bonus: 30 Additional Vibe Coding Examples (What people are vibe coding (and actually using))
Extended list of 30 additional real vibe-coded products from the community

How it works: Highlights include:
- 11-year-old built a cats and sushi game on Replit
- Healthcare payer policy change alert system
- New mom built milk tracking app in 5 minutes with 2 Lovable prompts
- Chrome extension to bypass paywalls
- Bible study daily guide app (Lovable + OpenAI)
- Trove Dad — prompted journal for new dads (Cursor)
- Voice AI therapy journal (Replit + OpenAI Realtime API)
- Custom Figma plugins for design system work (Cursor + ChatGPT)
- Backend systems for Women Defining AI organization
- Meeting-to-task automation for an agency (Lovable/Supabase/Vercel)
- Frens Circle — friend birthday/contact reminder app (Lovable)
- Custom learning game for 7-year-old (Bolt)
- Conference networking tool (v0 + Claude Code + Cursor)
- Scene inventory tool for book writing (Claude Code CLI)
- Workout motivation app built in under 15 minutes (Lovable)
- Voice-based workout tracker
- Anki flashcard generator from PDF for German learning
- Time audit tool and energy level tracker (Replit)
- 5-star App Store rating dashboard (Replit)
- Calories tracker with voice mode
- Simple PDF viewer with zoom (ChatGPT)
- Local video-to-GIF converter (Claude Code)
- Restaurant picker for indecisive couples
- Battery Lens Mac app (ChatGPT + Claude)
- Barbell weight calculator (Cursor + Gemini Pro)
- Nanny handover page for child (Lovable + Cursor)
- Multi-sport fantasy league draft app (Lovable + Supabase)
- Sales leaderboard (Lovable)
- Homeschool learning games
- Personal date/appointment tracker (Lovable)

### CRM with AI Email Writer Prototype (Scratch Build Walkthrough) (A guide to AI prototyping for product managers)
Step-by-step example of building a CRM from scratch and adding an AI email outreach feature for customer feedback, using Bolt.

How it works: Use case: Exploring whether to add automated email outreach to a CRM, wanting customer feedback before building.

Step 1: Create base CRM with prompt: "Create a comprehensive customer relationship management (CRM) system."
Result: Working CRM prototype in less than 5 minutes.

Step 2: Add AI email writer feature with prompt: "Please implement a mock AI email writer. This should be accessible from the left nav."
Result: New feature added in under 5 minutes.

Outcome: Interactive prototype to show potential users and gather feedback before committing engineering resources.

### Cowork by Anthropic (Marc Andreessen)
An example of rapid AI application development.

How it works: An application built in just a week and a half using Claude Code. Used as a case study to debate whether AI application layers have defensible moats if they can be built so quickly.

### Flightradar Clone (Guillermo Rauch)
A complex, high-performance web application built entirely via AI prompting.

How it works: Built in under two hours on airplane Wi-Fi using v0. It utilized Mapbox, Leaflet, and a canvas-based overlay to render tens of thousands of flights, demonstrating AI's ability to handle complex math (like the curvature of the earth) and performance optimization.

### Lenny's Own Vibe-Coded Tools (What people are vibe coding (and actually using))
Three tools Lenny personally built after being inspired by the community responses

How it works: 1. YouTube Thumbnail Preview Tool — Preview how podcast thumbnails will look. Built with Magic Patterns.
2. Tweet Crafter for Podcast Clips — Helps craft tweets to promote podcast clips. Built with Lovable.
3. Most Mentioned Books by Podcast Guests Tracker — Tracks which books are most frequently mentioned by Lenny's podcast guests (data not real yet). Built with v0/Vercel.

### Lenny's personal Bolt projects (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
Four real tools Lenny built with Bolt to demonstrate practical vibe-coding use cases

How it works: 1) Daily AI news feed (daily-ai-news-feed-2nt6.bolt.host) — a feed of latest AI news updated daily; 2) Stress level dial (lennys-stress-level-xv83.bolt.host) — a visual dial showing stress level based on workload, shareable with spouse; 3) Jacket checker (toddler-jacket-weath-f61o.bolt.host) — tells you if your child needs a jacket at school today based on weather; 4) Spanish learning app (spanish-learning-app-plkw.bolt.host) — tool to learn basic Spanish.

### Lenny's personal Lovable projects (Part 2 of how to get the most out of your product pass—and welcome, Stripe Atlas, to the bundle!)
Four real tools Lenny built with Lovable to demonstrate practical vibe-coding use cases

How it works: 1) YouTube preview tool (youtube-thumbnail-preview.lovable.app) — preview YouTube thumbnails; 2) YouTube thumbnail downloader (yt-thumbnail-grab.lovable.app) — download YouTube thumbnails; 3) Strikethrough text tool for X (twitter-strike-through.lovable.app) — create strikethrough text for Twitter/X; 4) Google Doc image downloader (gdoc-images-grab.lovable.app) — download all images inside a Google Doc.

### Paul's AI CRM (Eric Simons)
A case study of a non-technical entrepreneur building a production-grade SaaS application using AI.

How it works: A non-technical founder built a custom CRM with AI features and Stripe billing in 3 weeks for $300 using Bolt. This replaced an agency quote that estimated 6 months and $30,000.

### Presentation App with Live Q&A (Production Build Example) (A guide to AI prototyping for product managers)
Real-world example of building a production-grade presentation app with live Q&A and polls using Lovable and Cursor over 10 days.

How it works: Product: Presentation app with live Q&A and polls
Build time: ~10 days (most spent on debugging)
Tools used: Lovable (initial build) → GitHub (code sync) → Cursor (bug fixes and final changes)
Technical features: Authentication, databases, real-time updates

Workflow:
1. Started in Lovable to build basic features quickly
2. Synced code to GitHub to allow editing in other tools
3. Made final changes and fixed bugs with Cursor

Key insight: Lovable lacks a code editor, making debugging difficult, so moving to Cursor for troubleshooting is a common pattern.

### Reddit Answers Full Lifecycle Example (How to get your entire team prototyping with AI)
End-to-end example of using AI prototypes throughout the product development lifecycle for a gen AI feature

How it works: Feature: Reddit Answers - a gen AI feature allowing users to ask questions and get answers based on past Reddit posts and comments

Discovery (~20 min):
- Generated mid-fi prototype from full PRD prompt
- Used internally between product, design, and engineering lead
- Not shown to executives or customers

Roadmap & Alignment (20-60 min):
- Refined prototype to high fidelity using component library
- Showed to stakeholders and customers for buy-in

PRD & Mocks (2+ hours across discussions):
- Included hi-fi prototype in PRD
- Demoed live to engineering team
- Surfaced key questions: What does accuracy score mean? What external sources? Should any Reddit content be excluded? How should answers be vetted?
- Key insight: Prototype-driven discussions surfaced questions that text PRDs alone would miss

User Interviews (3-5 days):
- Brought hi-fi prototype to user interviews
- Got feedback on exact user flows before development
- Embedded survey tools for scaled feedback collection

Engineering Delivery (2-6 weeks):
- Code from prototype mostly not reusable
- Specific interactions (animations) could be used as starting point
- Prototype remained useful as communication reference throughout build

### Vibe Coding Gallery: Health, Wellness, and Style (What people are vibe coding (and actually using))
Real examples of vibe-coded health and wellness apps with tools used, creators, and links

How it works: 1. CarbScan (carbscan.ai) — Carb counter for diabetes management. Built by Morgan Brown using Replit. Daily use.
2. Lash Map Tracker — Photo + style tracker for eyelashes. Built by Jackie Bavaro using Replit.
3. How Many Layers (howmanylayersidag.se) — Daily clothing decision app based on weather. Built by Vijith Quadros using Lovable. Grew to 85K users in 9 months.
4. Custom Workout App — Personalized workout tracker. Built by Faraz Khan using v0 and Claude Code. Started in Claude Artifacts, deployed via v0.
5. MealMuse (mealmuse.ai) — Upload fridge photos to get recipes and shopping lists based on dietary preferences. Built by Nick Markman using Lovable, Supabase, and Cursor.
6. Flowbound (flowbound.app) — Games/exercises for procrastination. Built by Su using Bolt.
7. Paddles.ai — Pickleball match tracking and analysis. Built by Jacob Jolibois using Replit. Users across the U.S.
8. Pouched (iOS app) — Nicotine pouch tapering tracker. Built by Thatcher using Cursor/Xcode + SwiftUI. No coding background. Took 1 month to launch, redesigned in days.

### Vibe Coding Gallery: Music (What people are vibe coding (and actually using))
Real examples of vibe-coded music tools

How it works: 1. FyreDrill (fyredrill.dev) — Artist discovery and playlist generation for UK festivals. Built by Steven Newstead using v0 and Cursor, backed by Supabase for Spotify auth. Running on free tier.
2. Splintr (splintr.dreamgazeraudio.com) — Music production tool for inspiration. Built by Scott Korchinski using 90% v0 and 10% Cursor. Three days from idea to shipping. Weekly use with some external users via Hotjar.

### Vibe Coding Gallery: Other/Fun (What people are vibe coding (and actually using))
Real examples of vibe-coded games and utility tools

How it works: 1. Rehearsal (rehearsal.so) — Browser RPG game where you have 10 minutes to convince an AI character. Built by Jean Kaddour using Cursor (Sonnet 3.7) + Next.js. First version built in a day. Daily use.
2. VisaMonkey (visamonkey.com) — Immigration document manager for India/China immigrants with 10-20 year journeys. Keeps documents in one place, helps fill out forms. Built by Shree using v0.

### Vibe Coding Gallery: Parenting and Family (What people are vibe coding (and actually using))
Real examples of vibe-coded parenting and family apps with tools used, creators, and links

How it works: 1. Storypot (app.thestorypot.com) — Kids drag emoji into a pot to create stories. Built by Akshan Ish using Replit. Used by 60+ families.
2. College Budget Planner — Expense planning and saving tool for teenagers. Built by Sanjeev Nair using Claude Code.
3. Timeless Memories (timelessmemories.me) — Turn family photos into videos. Built by Oren Saban using Lovable and Bolt.
4. My Baby Logger (mybabylogger.com) — Track feedings, sleep, diapers, and meds. Built by Javier Evelyn using Lovable over two weekends.
5. Chores AI (chores-ai.com) — Chore management app for kids. Built by Ben Ogren using v0 and Claude Code. First iOS app.
6. Stories of Life — Bedtime storytelling app that turns daily emotions into personalized stories. Built by Harshitha P. using Bolt + Supabase.
7. JeniCards (jenicards.com/cards) — Hyper-personalized AI greeting card generator. Built by Bob Sheth using Cursor, Windsurf, and Claude Code.

### Vibe Coding Gallery: Personal Development (What people are vibe coding (and actually using))
Real examples of vibe-coded personal development tools

How it works: 1. Conversation Intelligence — Paste call transcript, get breakdown of what you did well and what to improve. Built by Peter Nixey using Claude Code.
2. Daily Language Learning Newsletter — Audience of 1. Daily email with: story in target language about today-in-history (via Gemini), vocabulary list, grammar lesson. Built by Dustin Coates using v0 for design, Lambda for execution, Resend for email delivery.
3. BerryPlush Talk (talk.berryplush.com) — Talk to AI about day-to-day problems. Built by Alex Mathew using Replit.

### Vibe Coding Gallery: Personal Productivity (What people are vibe coding (and actually using))
Real examples of vibe-coded personal productivity tools

How it works: 1. BuzzerBee (buzzerbee.app) — Automatically answers apartment buzzer calls based on access rules and schedules. Built by Darren Rulofs using Bolt and Cursor. Daily use, growing user base.
2. Bill Splitter (my-bill-split-project.lovable.app) — Tip-first bill splitter showing per-person share including tax. Built by Shashikiran Devadiga using Lovable + Unicorn Studio.
3. Curated (curated.now) — Personalized restaurant recommendations via database + RAG + LLM chat. Built by Lani Young using Replit. Currently Denver-only.

### Vibe Coding Gallery: Work Productivity (What people are vibe coding (and actually using))
Real examples of vibe-coded work productivity tools with tools used, creators, and links

How it works: 1. Meeting Prep Automation — Checks calendar each morning, identifies who you're meeting with, compiles everything needed. Built by Marissa Goldberg using Zapier Agent. Tutorial available at ideakitchen.substack.com.
2. Standup Buddy (standup-buddy.lovable.app) — Randomizes standup order. Built by Rob Balderstone using Lovable. Daily use.
3. Availability Chrome Extension — Adds availability to emails in natural language, analyzes suggested times, books meetings. Also a Slack app for team scheduling. Built by Olena Vozna using Replit.
4. Time Tracker (time.wisdemic.com) — Time tracking app built in a day. Built by Asif using Warp.dev.
5. Inbox Focus Tool — Gmail add-on that holds inbound email and delivers on schedule (e.g., 10am and 3pm), with VIP bypass for keywords, domains, and addresses. Built by Ari Klein using Gemini.
6. AccomplishIt (goaccomplishit.com) — Track workplace wins for resume and review prep. Built by Kevin Kirkpatrick using Lovable. Weekly use.

## Tools

### AI Prototyping Tool Stack (A guide to AI prototyping for product managers)
Complete list of AI development tools mentioned with their categories and URLs.

How it works: CHATBOTS:
- Claude (claude.ai) - Artifacts system for running code in-browser
- ChatGPT (chatgpt.com) - Generates code but requires manual copy/paste to run
- Perplexity (perplexity.ai) - Search-focused, not recommended for prototyping

CLOUD DEVELOPMENT ENVIRONMENTS:
- v0 (v0.dev) - By Vercel, uses Next.js and Shadcn UI
- Bolt (bolt.new) - Browser-based server, quick prototyping
- Replit (replit.com) - Full-stack with database, Python support
- Lovable (lovable.dev) - Production apps with integrations

LOCAL DEVELOPER ASSISTANTS:
- Cursor (cursor.com) - Best at general instructions, great for debugging
- GitHub Copilot (github.com/features/copilot) - Enterprise-friendly, needs specific direction
- Windsurf (codeium.com/windsurf) - Multi-line changes, larger codebases
- Zed (zed.dev/ai) - Prompt libraries, keyboard shortcuts

DESIGN SYSTEMS (for good defaults):
- Tailwind CSS (tailwindcss.com)
- Shadcn UI (ui.shadcn.com)

INFRASTRUCTURE:
- Supabase - External servers and databases for Bolt/Lovable
- Vercel - Cloud hosting (owns v0)
- GitHub - Code syncing between tools

LEARNING RESOURCES:
- Colin Matthews' course: AI Prototyping for Product Managers (Maven)
- Free 30-minute lightning lesson (Maven)

### AI Prototyping Tools Referenced (How to get your entire team prototyping with AI)
List of AI prototyping tools discussed in the newsletter with their specific use cases

How it works: Primary AI Prototyping Tools:
- v0 (v0.dev): Used for component library creation, general prototyping. Supports forking.
- Bolt (bolt.new): Used for homepage prototyping, logo integration. Supports project duplication.
- Cursor (cursor.com): AI code editor for prototyping with real codebases. Supports Figma MCP integration.
- Lovable: AI prototyping tool. Supports remixing existing projects.
- Replit: AI prototyping tool. Supports remixing/forking apps.
- Magic Patterns (magicpatterns.com): Only tool with Chrome extension for extracting components from live webpages. Supports forking.
- Windsurf: AI code editor alternative to Cursor.

Supporting Tools:
- Figma MCP Server: New protocol for connecting Figma design data to AI code editors
- Brandfetch: Logo repository for finding and embedding company logos
- Unsplash: Free stock photo source that AI tools can pull from for realistic prototype images
- Survey tools (e.g., Typeform): Can be embedded directly into prototypes for user feedback collection

