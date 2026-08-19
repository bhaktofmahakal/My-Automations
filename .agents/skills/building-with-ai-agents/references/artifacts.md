# Building With AI Agents - Frameworks, Templates & Checklists

*46 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 4x4 Debugging Framework (Lazar Jovanovic)
A four-step sequential process for fixing broken AI-generated code without knowing how to code.

How it works: 1. Click 'Try to fix' to let the agent self-correct. 2. Ask the AI to write console logs, run the app, and paste the logs back into the chat to give the AI awareness. 3. Export the codebase to an external tool (Codex or Claude via Repomix) for an unbiased diagnostic. 4. Revert to a previous version, rewrite your prompt, and ask the AI: 'How could I have prompted you better to avoid this?'

### AI Model Personality Framework (Zevi Arnovitz)
A mental model for understanding and leveraging different AI models' strengths by imagining them as distinct team members with specific roles

How it works: Claude = Communicative, opinionated CTO/dev lead — best for architecture decisions, exploration, and collaborative work. Codex (GPT) = Antisocial genius coder — best for deep debugging and worst bugs, not communicative but solves hardest problems. Gemini = Artsy, brilliant but terrifying scientist — best for UI/design work but scary to watch work (may delete things then recreate them). Strategy: assign tasks to models matching their strengths, use others to cross-check weaknesses.

### Bricklayer to Architect (Scott Wu)
A mental model for understanding how AI changes the engineer's role: engineers shift from spending 90% of time on implementation (bricklaying) to spending most time on problem definition, architecture, and specification (architect work)

How it works: Current engineer time split: ~10% architecture/problem definition, ~90% implementation (Kubernetes errors, debugging, migrations, bug fixes, boilerplate). AI shifts this so engineers focus on: 1) Defining the problem precisely, 2) Thinking through architecture, 3) Mapping out the exact solution, 4) Making key trade-off decisions. Implementation is increasingly handed off to AI agents.

### CTO Project Pattern (Zevi Arnovitz)
Using a ChatGPT/Claude project as a virtual CTO who owns the technical decisions while you own the problem and user experience

How it works: System prompt: 'I own the problem. I own how we want the users to feel. You're the complete owner of how this is going to be built. I want you to challenge me. I don't want you to be a people pleaser.' Purpose: Prevents the default AI sycophancy where it agrees with bad ideas. Originally in a ChatGPT project, now embedded in Claude.md for Cursor/Claude Code. Mitigates the problem Zevi experienced where GPT said 'I thought you were making this up and I was riffing with you' about a technical question.

### Compounding Engineering (Dan Shipper)
A development method where every unit of engineering work makes the next unit easier through AI automation.

How it works: Instead of manually writing repetitive PRDs, spend time writing a prompt that turns rambling thoughts into a perfect PRD. Store these prompts as slash commands in Claude Code or a shared GitHub repo to accelerate all future feature development.

### Devin Adoption Progression Path (A free year of Devin: the world’s most advanced autonomous AI software engineer)
A framework for how teams typically expand their use of Devin from initial engineering tasks to broader organizational functions.

How it works: Stage 1: AI Software Engineer — Hand off well-scoped software engineering tasks (bugs, features, refactors)
Stage 2: Expand to QA — Handle QA on product changes
Stage 3: Expand to Product — Scope roadmap ideas, update UI
Stage 4: Expand to Analytics — Take first pass at data analysis requests
Stage 5: Expand to CX — Broader customer experience work

Goal: Take on all lower-level work so you have more time to focus on figuring out WHAT to build and how to get it into the hands of users.

### Five Key Takeaways from 1,000+ Vibe Coding Examples (What people are vibe coding (and actually using))
High-level patterns Lenny identified from the community responses about what people are building and how

How it works: 1. Cursor, Claude Code, Replit, and Lovable are the favorite tools, followed by v0, Bolt, and ChatGPT. Honorable mentions to Gemini, n8n, Zapier Agent, Warp, and Windsurf.
2. Almost no examples are alike — everyone is solving their own hyper-specific problem. Welcome to the era of n-of-1 personalized software.
3. People are creating a lot of Chrome extensions — makes sense since we spend most of our time in the browser.
4. Even though people are solving their own problem, many products end up being used by tens/hundreds/thousands of other people.
5. Women are vibe coding like crazy — the male-female ratio in responses is more balanced than in most tech conversations.

### Iterative AI Task Chopping (Michael Truell)
A workflow for effectively delegating coding tasks to AI agents without losing control or quality.

How it works: Instead of writing one giant prompt for an end-to-end task, chop the task into small bits. Workflow: Specify a little bit -> AI writes -> Human reviews -> Specify the next bit -> AI writes -> Human reviews.

### Jagged Intelligence (Scott Wu)
A concept for understanding AI capabilities where the agent is simultaneously much better than humans at some tasks and much worse at others, rather than being uniformly at a single 'level'

How it works: AI agents don't map neatly to a single seniority level. Devin is like a staff engineer at understanding/retrieving codebase information, but like a junior engineer at complex architectural decisions. This means tasks should be assigned based on the specific capability required, not a general 'seniority' assumption.

### Junior Intern Test for Task Delegation (Make product management fun again with AI agents)
A mental model for identifying which tasks to delegate to AI agents: ask yourself what you'd assign to a smart, motivated junior intern with zero experience.

How it works: The framing question: 'If my company assigned me a junior intern, what would I have them do?'

Criteria for good AI agent tasks:
- Requires some judgment and writing abilities
- Does NOT require your full expertise and intuition
- Ongoing tasks that arrive continually (not one-time batch tasks)
- Can be described in 1-2 sentences, exactly as you'd write in a Slack message to the intern

For batch tasks instead, use:
- Export data and upload to Claude, Gemini, or ChatGPT
- Built-in tools: Slack AI, Notion AI, Gemini for Workspace, Microsoft Copilot
- MCP integrations

### Model Context Protocol (MCP) (Dhanji R. Prasanna)
An open protocol created by Anthropic that provides formalized wrappers around existing enterprise tools so LLMs can manipulate them.

How it works: Requires writing a few lines of code to wrap an existing system (like Salesforce or SQL), instantly making it orchestratable by an AI agent without waiting for vendor AI features.

### Security Risk Evaluation for AI Agents (Make product management fun again with AI agents)
A reframing approach to evaluate AI agent security risk relative to existing human and SaaS access baselines.

How it works: Two questions to evaluate AI agent security risk:
1. Are you using third-party automations already (regardless of AI)? If so, how much more risk does AI itself add to your workflow?
2. How many human employees have been granted those permissions? How much more risk does AI truly add to the picture?

Key considerations:
- Every AI system provider has an option not to train with queries (whether that's sufficient depends on company policy)
- Quote from Jacob Bank: 'People are way too casual about hiring employees and giving them lots of information, and way overly strict about SaaS products that have security best practices.'
- Always consult your CISO for final decisions.

### Sorcerer's Apprentice Model for AI-Assisted Engineering (Sherwin Wu V2)
Mental model from SICP comparing AI-assisted coding to The Sorcerer's Apprentice — extremely powerful but requires skill and seniority to avoid agents going off the rails

How it works: From SICP (Structure and Interpretation of Computer Programs, 1980): Programming is sorcery, languages are incantations, programs are spells. Current state: AI coding is the latest evolution — incantations are now literal natural language. Risk: Like Mickey Mouse in Fantasia, you can set agents loose and they go wild. Key insight: Senior engineers who are proficient with tools get extreme leverage (10-20 parallel threads), but you need skill to keep agents from going off the rails. You definitely don't want to just go away and ignore the thing.

### Tasks Not Problems (Scott Wu)
A guideline for how to assign work to AI coding agents: give well-defined tasks with clear verification criteria rather than open-ended problems

How it works: Devin works best when: 1) The task is well-defined (not an open-ended problem), 2) There's a quick way to iterate and test (easy verification loop), 3) Scope is clear. For bigger projects, expect to steer more. Examples of good tasks: front-end feature requests, bug fixes, adding testing/documentation, migrations. Bad: 'Re-architect the whole codebase.'

## Templates

### /create issue command (Zevi Arnovitz)
A reusable prompt/command that tells Claude the user is mid-development and needs to quickly capture a bug, feature, or improvement as a Linear issue without breaking flow

How it works: Prompt instructs Claude: 'The user is mid-development and thought of a bug or feature improvement. Capture it fast so they can keep working.' Includes format template for Linear issue structure. Uses MCP integration to create issue directly in Linear. Accepts voice-dictated input via Wispr Flow.

### /create plan command (Zevi Arnovitz)
A prompt that generates a structured markdown plan file from the exploration exchange, with status trackers on each task, TLDR, critical decisions, and task breakdown

How it works: Template structure: 'Based on our exchange, create a markdown file that will be the plan. Include clear, minimal, concise steps. Track the status.' Output includes: TLDR section, Critical Decisions section, Tasks broken down with status trackers that Claude updates during execution. Designed to be readable by multiple models (Gemini for frontend, Composer for speed tasks). Saved as markdown file in codebase for future agent reference.

### /execute plan command (Zevi Arnovitz)
A command to begin code execution against the plan, tagging the plan markdown file so the AI builds according to the agreed specification

How it works: Simple invocation: type 'execute' and tag the plan markdown file. Can be run in Cursor Composer for speed or Claude Code for complex work. Updates task status trackers in the plan file as it progresses.

### /exploration phase command (Zevi Arnovitz)
A prompt that tells Claude to deeply explore a problem before any code is written — fetches context from Linear, analyzes the codebase, and asks clarifying questions about scope, data model, UX, validation, and AI integration

How it works: Accepts an argument (e.g., Linear ticket ID like STU88). Claude reads relevant code files, understands current architecture, then returns: current understanding of system, feature requirements interpretation, key areas identified, and clarifying questions covering scope, data model, UX/UI, validation, grading, and system prompt changes. Configured in Claude.md to challenge the user's thinking.

### /learning opportunity command (Zevi Arnovitz)
A prompt that shifts Claude into teaching mode, explaining complex technical concepts encountered during development using the 80/20 rule for a non-technical PM audience

How it works: Prompt content: 'I am a technical PM in the making. I have mid-level engineering knowledge. I understand architecture. I want you to explain what we're currently working on using the 80/20 rule.' Designed to be invoked mid-workflow whenever the user encounters something they don't understand.

### /peer review command (Zevi Arnovitz)
A prompt that frames Claude as the dev lead receiving code review feedback from other team leads (other AI models), instructing it to either defend its decisions with context or fix genuine issues

How it works: Prompt structure: 'You're the dev lead on this project. Other team leads within the company have looked at your code and reviewed it and found these issues. Don't take what they said at face value. You have more context than them and you led this project. Either explain why the stuff they found are not real issues and wrong, or fix them yourself.' User pastes in reviews labeled as 'dev lead 1' and 'dev lead 2' from Codex and Cursor. Run multiple rounds until no issues remain.

### /review command (Zevi Arnovitz)
A command that tells Claude to review its own code for bugs, categorized by severity (critical, high, medium)

How it works: Triggers Claude to self-review all code changes. Output includes bugs categorized by severity level. Designed to be run alongside independent reviews from other models (Codex, Composer) to enable the peer review step.

### AI Agent Builder Meta-Prompt (Make product management fun again with AI agents)
A comprehensive prompt to paste into an LLM with deep research capabilities (o3 Deep Research or Perplexity Deep Research) that generates platform-specific, step-by-step walkthroughs for building any AI agent across multiple platforms.

How it works: Full prompt text:

"Below are my objectives for an AI agent workflow. You're an expert explainer of how to build an AI agent that is excellent at explaining to newbies. I want to build an agent in either Relay App or Lindy AI or Zapier Agents (not Zaps) or Cassidy AI or Gumloop or Relevance AI.

For each platform, using only their official documentation or tutorials or videos, create step-by-step, explicit, hand-holding walkthroughs for me on how to create it in each platform (each one separately, without combining platforms).

Keep it as simple as possible. No recommendation should ever require coding. (If you have no choice but to recommend a direct API call or webhook, make it super-clear and explicit how to make that work.) Use only the minimum necessary access permissions to achieve the task.

Don't gloss over any step; assume I don't know anything and need even the smallest steps spelled out for me. If a step requires an LLM prompt, write the prompt for me. Same for any query strings (e.g. Gmail search query or otherwise).

When you suggest a feature or functionality, ensure that this ability truly exists in that platform! If the web results don't directly support your recommendation, It's OK to still recommend it, but note your uncertainty inline in the step itself, using a '🚨' emoji, and provide alternatives in case it doesn't exist, marked by '♻️.'

For each service, spell out for me any components I'd need to have in place outside the platform I choose. Also, highlight any risks why these instructions might not actually work and questions to ask myself before I get started to save me time.

If there's a better tool you recommend for this job (AI agent, automation, or other no-code solution), repeat this process for that tool. If you recognize this is a batch task and not a continuous task (i.e. one-time vs. trigger-driven), then suggest better ways to do this potentially with an LLM even if it's a bit more manual effort.

🌅 OPPORTUNITY
[If your boss gave you a junior intern (smart, motivated, zero experience), what would you have them do? Why is it valuable and impactful?]

🪖 INSTRUCTIONS FOR AI AGENT TO FOLLOW
[Tell your new junior intern how you would go about it at the level of naming the services, clarifying decisions, etc. that a human would need to perform the task. Use the format ❝Whenever ______ happens, I want you to decide ______, based on this data _______ and/or using web research, compare it to previous data from last time, and then go ahead and do ________."]

Ping me before the final action by [DMing me/Create a draft/etc.]."

Recommended LLMs: OpenAI o3 Deep Research or Perplexity Deep Research

### AI Agent Platform Comparison Prompt (Make product management fun again with AI agents)
A follow-up prompt to generate a structured comparison table across AI agent platforms for a specific use case, ending with a single recommendation.

How it works: Full prompt text (to be used in the same thread as the builder prompt):

"Based on the platforms above and the methods chosen, please create a platform comparison table on all of the critical aspects required to make them happen. Each column should be a different platform, and each row should be a different functionality relevant to the steps you outlined. Focus the rows on concrete functionalities rather than abstract concepts or subjective traits or guesses. In each table cell, cite web sources where possible. Use emojis sparingly to draw attention to critical differences.

Finally, if I could choose only one platform, based only on your answers above for this specific use case only and no web results or marketing claims, which platform do you recommend I choose to implement this specific objective based on simplicity and likelihood of not needing technical skills, fastest to set up, and easiest learning curve?"

### AI Project Planning PRDs (Markdown Files) (Lazar Jovanovic)
A suite of markdown documents used to provide persistent, dynamic context to AI coding agents so they don't lose track of the project scope.

How it works: Includes: 1. masterplan.md (10,000-foot overview and intent). 2. implementation_plan.md (high-level order of operations, e.g., backend first, then auth). 3. design_guidelines.md (look, feel, and CSS elements). 4. user_journeys.md (navigation and features). 5. tasks.md (nitty-gritty subtasks). 6. rules.md/agents.md (instructions telling the agent to read all files before acting).

### Update docs command (Zevi Arnovitz)
A command run after feature completion to update all codebase documentation so that future AI agents can write better code in affected areas

How it works: Updates documentation and markdown files in the codebase after a feature is complete. Ensures future agents have context about what was built and how, preventing repeated mistakes. Part of the postmortem process.

### plan.md (Plan-driven development) (Alexander Embiricos)
A markdown file structure used to collaborate with an AI agent on a plan before executing long-running tasks.

How it works: Create a 'plan.md' file with verifiable steps. Align with the AI on the approach first, then ask it to execute the steps. This allows the agent to work for much longer periods autonomously without going off track.

## Checklists

### 10 Use Cases for Devin (Autonomous AI Engineer) (A free year of Devin: the world’s most advanced autonomous AI software engineer)
A list of 10 specific ways teams can use Devin, progressing from straightforward engineering tasks to broader product and analytics work.

How it works: 1. Scope new roadmap ideas
2. Update UI and add visual polish to your site
3. Handle QA on product changes
4. Keep internal documentation up to date
5. Take a first pass at data analysis requests
6. Take on the most tedious items on your backlog
7. Build SaaS integrations
8. Send daily summaries of shipped changes
9. Tackle complex migrations (e.g., Nubank migrated a 6M-line ETL monolith in weeks instead of 18 months with 1,000 engineers)
10. Increase your unit test coverage (e.g., Litera increased test coverage by 40%, reducing regression cycles from 3 weeks to 2 days)

Progression path: Start with well-scoped software engineering tasks → expand into QA, product, analytics, and CX → goal is to free up time to focus on deciding what to build and getting it to users.

### AI Agent Onboarding Process for Engineering Teams (Scott Wu)
Step-by-step process for getting an AI coding agent set up and productive within an engineering team

How it works: 1) Identify early adopter engineers who are excited to invest time, 2) Set up repos and give agent access, 3) Teach agent how to run linting, CI, and testing, 4) Start with easy one-pointer tasks to build familiarity, 5) Let agent build its representation of the codebase, 6) Scale to more complex tasks as confidence grows, 7) Other team members join after seeing agent's PRs and value, 8) New joiners benefit from agent's accumulated codebase knowledge

### Claude Code Best Practices (Boris Cherny)
Tactical steps for developers to get the most out of Claude Code.

How it works: 1) Use the most capable model (Opus 4.6) with maximum effort enabled—it's often cheaper because it requires fewer correction tokens. 2) Use 'plan mode' (shift+tab twice) to agree on the approach before writing code. 3) Play with different interfaces (terminal, desktop, iOS) to find what fits your workflow.

### Cowork Onboarding Steps (Boris Cherny)
How to start delegating non-coding tasks to the Cowork agent.

How it works: 1) Start by having it use a single tool (e.g., clean up desktop, summarize email). 2) Connect multiple tools (e.g., read emails and put them in a spreadsheet, or check a spreadsheet and send Slack DMs). 3) Run multiple agents in parallel for different tasks.

### Figma MCP Server Setup Steps (How to get your entire team prototyping with AI)
Step-by-step instructions to connect Figma's Dev Mode MCP server to Cursor for extracting design components

How it works: 1. Enable the Figma MCP server for the design you want to work with:
   - Go to Preferences in Figma
   - Enable Dev Mode Server
   - This will provide you with a URL to connect to

2. In Cursor, add the MCP server:
   - Go to Settings > MCP Tools
   - Click 'Add a new MCP server'
   - Paste in the URL provided by Figma

3. Copy a component URL from Figma:
   - Right-click the component in Figma
   - Select 'Copy as URL'

4. Ask Cursor to generate the component:
   - Paste the URL and ask Cursor to generate it as a component
   - Request that the index page be a list of components

Figma MCP supports four actions:
- Get Code
- Get Variable Definitions
- Get Image
- Get Code Connect

This gives Cursor the ability to autonomously take screenshots, extract design tokens, and get CSS from Figma's Dev Mode.

Tip: Works best if you have existing components Cursor can mimic, or provide clear instructions for how the code should be formatted.

### Tips for Getting Maximum Value from AI Coding Tools (Varun Mohan)
Practical advice for new users of AI coding tools like Windsurf to be successful

How it works: 1) Be explicit in your prompts—vague requests lead to irrelevant changes. 2) Start with small changes—don't ask it to refactor an entire directory at once (if wrong, it destroys 20 files). 3) Learn the hills and valleys—understand what the tool does well vs poorly, like learning when autocomplete will help. 4) Build gut feeling for model capabilities—how specific vs abstract to be. 5) Recalibrate every ~3 months as capabilities improve dramatically. 6) Use images/mockups as input—even crude boxes work. 7) Point to specific UI elements to make targeted changes. 8) Review the AI's code changes carefully—your role shifts from writer to reviewer.

### Top Vibe Coding Tools Ranked by Community Usage (What people are vibe coding (and actually using))
Ranked list of the most popular vibe coding tools based on 1,000+ community responses, useful for selecting which tool to try first

How it works: Tier 1 (Community Favorites):
- Cursor
- Claude Code
- Replit
- Lovable

Tier 2 (Popular):
- v0
- Bolt
- ChatGPT

Tier 3 (Honorable Mentions):
- Gemini
- n8n
- Zapier Agent
- Warp
- Windsurf

## Examples

### Atlas Browser Development Acceleration (Alexander Embiricos)
An example of productivity gains on a complex systems engineering project using Codex.

How it works: Tasks that previously would have taken 2-3 engineers 2-3 weeks to complete were reduced to 1 engineer taking 1 week.

### ChatPRD: Devin as #2 contributor to a six-figure business (A free year of Devin: the world’s most advanced autonomous AI software engineer)
Claire Vo's ChatPRD business uses Devin as its second-largest contributor, touching 100% of pull requests by reviewing code, updating documentation, or writing all of the code.

How it works: Company: ChatPRD (chatprd.ai)
Founder: Claire Vo
Devin's role: #2 contributor (behind only Claire herself)
Scope: Touches 100% of PRs — reviews code, updates documentation, or writes all code
Business size: Six-figure revenue
Note: Claire expects Devin may surpass her as #1 contributor ('for now')

### Codeium's $500K Internal Tool Savings (Varun Mohan)
Codeium saved over $500K in SaaS purchases by having non-engineers on their go-to-market team build custom internal tools using Windsurf instead of buying off-the-shelf software.

How it works: When Windsurf launched, every employee was tasked with building an app. The go-to-market and sales teams built custom internal tools. Example: Head of partnerships built a custom partner portal instead of buying a partner portal product—had never written software before. Result: $500K+ saved on SaaS products. The company built internal deployment infrastructure to support these non-engineer-built apps.

### Coding Assistant Progression (Aishwarya Naresh Reganti + Kiriti Badam)
A three-step progression for safely deploying an AI coding assistant.

How it works: V1: Suggest inline completion and boilerplate snippets. V2: Generate larger blocks like tests or refactors for humans to review. V3: Apply changes and open PRs autonomously.

### Cognition's Internal Devin Usage (Scott Wu)
How a 15-person engineering team uses AI coding agents in production, including metrics on PR volume and parallel agent usage

How it works: Team size: 15 engineers. Each engineer works with up to 5 Devins simultaneously. ~25% of all PRs committed by Devin (expected to exceed 50% by end of 2025). Devin merges several hundred PRs into production monthly. Workflow: engineers define 5 tasks for the day, assign each to a Devin, jump in only for the 10-20% requiring human expertise (architecture decisions, precise specifications, final testing). Engineers spend more time on core product/capability questions rather than boilerplate implementation.

### Debugging AI Agent Errors (Sprint Numbers and Task Status) (Make product management fun again with AI agents)
Two real debugging examples from a PM usability session showing how agent errors trace back to input problems, not AI failures.

How it works: Example 1 — Hallucinated sprint numbers:
- Symptom: Agent was hallucinating sprint numbers in Slack updates
- Root cause: Example templates included 'Sprint 5' in titles, but the project management board didn't mention 'sprints' at all
- Fix: Remove 'Sprints' from the example templates

Example 2 — Mislabeled task status:
- Symptom: Agent was labeling tasks as 'done' incorrectly
- Root cause: Board only had estimated 'end date' with no 'task status' field. AI reasonably assumed anything past end date was done.
- Fix: Added a 'done' checkbox to the board, which instantly improved results

Lesson: Before getting frustrated with AI, ask if you threw it curveballs or shared enough context.

### Gumroad: Devin as #1 code contributor with 1,500+ merged PRs (A free year of Devin: the world’s most advanced autonomous AI software engineer)
Sahil Lavingia's Gumroad uses Devin as their top code contributor, averaging 10 merged pull requests per day.

How it works: Company: Gumroad
Founder/CEO: Sahil Lavingia
Devin's role: #1 contributor of code
Output: Over 1,500 merged PRs
Velocity: Averaging 10 merged PRs per day

### Litera: 40% test coverage increase with Devin (A free year of Devin: the world’s most advanced autonomous AI software engineer)
Litera used Devin to increase unit test coverage by 40%, cutting regression cycles from three weeks to two days.

How it works: Company: Litera
Task: Increase unit test coverage
Result: Test coverage increased by 40%
Impact: Regression cycles reduced from 3 weeks to 2 days (approximately 90% reduction in cycle time)

### Nubank: Complex ETL migration using Devin (A free year of Devin: the world’s most advanced autonomous AI software engineer)
Nubank used Devin to migrate a 6-million-line ETL monolith in weeks, a project originally estimated at 18 months and 1,000 engineers.

How it works: Company: Nubank
Task: Migrate an over-6-million-line ETL monolith
Time with Devin: A couple of weeks
Original estimate without Devin: 18 months, 1,000 engineers
Compression factor: Roughly 36x faster in time, massive reduction in human resources needed

### OpenAI's 100% Codex-Written Codebase Experiment (Sherwin Wu V2)
Internal OpenAI team maintaining a codebase where all code is written by Codex with no escape hatch of manual coding, producing best practices for agent-first development

How it works: Setup: Internal team commits to 100% Codex-generated code — no manual coding escape hatch. Key learnings: 1. Most agent failures are context problems — underspecified instructions or missing information. 2. Solution: Encode tribal knowledge into the codebase via code comments, code structure, .md files, Skills files, and additional documentation. 3. Removing the escape hatch forces you to solve the real problems with agent-first development. 4. Blog post forthcoming with full learnings.

### Sora Android App Development Timeline (Alexander Embiricos)
A real-world case study of extreme acceleration using AI coding agents to port an iOS app to Android.

How it works: Built a fully new app in 18 days to employee launch, and 10 days later to public GA (28 days total). Used 2-3 engineers. Codex looked at the existing iOS app, produced plans of work, and implemented them for Android.

## Tools

### Claude Code (Dan Shipper)
A command-line interface agent by Anthropic that can read local file systems, run terminal commands, and browse the web autonomously.

How it works: Highly recommended for non-coders to process large local datasets (like meeting transcripts or books). You give the agent a task, it creates a to-do list in a digital notebook, and runs autonomously for 20-30 minutes to summarize or extract data.

### Goose (Dhanji R. Prasanna)
An open-source, general-purpose AI agent desktop app that uses the Model Context Protocol (MCP) to interact with local files, write code, and operate other software.

How it works: Can be downloaded as an Electron app or CLI. Uses pluggable LLM providers (Claude, OpenAI, local models via Ollama). Can read screens, write code, and orchestrate apps like Snowflake or Google Docs.

