---
name: building-with-ai-agents
description: Help users master the transition from manual coding to managing AI-driven development workflows by focusing on high-level direction, parallel tasking, and rigorous automated review.
---

# Building With AI Agents

Transition from writing lines of code to directing a parallel team of autonomous agents.

Help the user with building with ai agents using insights from 15 guests and posts across Lenny's Podcast and Newsletter.

## How to Help

1. **Identify Tasks** - Use the Junior Intern framework to find repetitive or well-defined engineering tasks suitable for delegation.
2. **Define Instructions** - Draft precise, granular prompts and provide context through markdown files and past examples.
3. **Manage Parallel Threads** - Direct multiple agents simultaneously across different pull requests or features to scale output.
4. **Review and Iterate** - Maintain oversight by reviewing code logic and using AI-led peer reviews to ensure quality before deployment.

## Core Principles

### The Directorial Shift
Boris Cherny: "100% of my code is written by Claude Code. I have not edited a single line by hand since November. Every day, I ship 10, 20, 30 pull requests. So, at the moment I have, like, five agents running."

Stop manual code editing and transition to directing multiple AI agents simultaneously across different pull requests to maximize productivity.

### Absolute Specificity
Lazar Jovanovic: "AI just don't understand what do you mean when you say, 'You know what I mean?' So you need to be specific. I'm optimizing 100% of my time today on good judgment, clarity, quality, taste."

Abandon the assumption that the tool understands your implicit intent and provide granular instructions as if you are talking to a technical co-founder.

### High-Level Reasoning and Orchestration
Marc Andreessen: "Over the holiday break, it feels like the AI coding thing really hit critical mass and the world's best programmers, including Linus Torvalds, for the first time over the holiday break basically said, 'Yeah, AI is now coding better than we can.'"

Transform your role from manual execution to reasoning and orchestration, using AI to achieve 10x the output of a standard programmer.

### Asynchronous Coordination
Scott Wu: "Our whole team is only like 15 engineers a year. We use a ton of Devin when we're building Devin. Most folks on the team are definitely working with up to five Devins at once, and so Devin merges like several hundred pull requests into production in the Devin code bases every month."

Move from synchronous single-tasking to coordinating a parallel team by assigning distinct tasks to multiple agent instances at once.

### Eliminate Manual Escape Hatches
Sherwin Wu V2: "There's a team that's actually doing an experiment right now within OpenAI where they are maintaining a 100% Codex-written code base. They run into the exact problems that you're describing. And so usually you're like, 'All right, I'll roll up my sleeves and figure it out.' This team doesn't have that escape hatch."

Resist the urge to manually fix code when agents struggle; instead, commit to mastering the model steering required to solve issues through AI alone.

### Multi-Model Peer Review
Zevi Arnovitz: "It's very difficult for me to catch mistakes. What I'll do is basically /review. This tells Claude to start reviewing its own code, but what's even cooler is I have Codex as well as Cursor open. I will have each of them review the code."

Compensate for technical knowledge gaps by forcing different AI models to cross-check each other for logic errors before deployment.

## Templates & Frameworks

- **AI Agent Builder Meta-Prompt** (Make product management fun again with AI agents) - A comprehensive prompt to paste into an LLM with deep research capabilities (o3 Deep Research or Perplexity Deep Research) that generates platform-specific, ste
- **10 Use Cases for Devin (Autonomous AI Engineer)** (A free year of Devin: the world’s most advanced autonomous AI software engineer) - A list of 10 specific ways teams can use Devin, progressing from straightforward engineering tasks to broader product and analytics work.
- **Junior Intern Test for Task Delegation** (Make product management fun again with AI agents) - A mental model for identifying which tasks to delegate to AI agents: ask yourself what you'd assign to a smart, motivated junior intern with zero experience.
- **/peer review command** (Zevi Arnovitz) - A prompt that frames Claude as the dev lead receiving code review feedback from other team leads (other AI models), instructing it to either defend its decision
- **AI Project Planning PRDs (Markdown Files)** (Lazar Jovanovic) - A suite of markdown documents used to provide persistent, dynamic context to AI coding agents so they don't lose track of the project scope.
- **4x4 Debugging Framework** (Lazar Jovanovic) - A four-step sequential process for fixing broken AI-generated code without knowing how to code.
- **/exploration phase command** (Zevi Arnovitz) - A prompt that tells Claude to deeply explore a problem before any code is written — fetches context from Linear, analyzes the codebase, and asks clarifying ques
- **/create plan command** (Zevi Arnovitz) - A prompt that generates a structured markdown plan file from the exploration exchange, with status trackers on each task, TLDR, critical decisions, and task bre

See `references/artifacts.md` for the full list with details.

## Questions to Help Users

- "Which repetitive engineering tasks are currently slowing your team down the most?"
- "Do you have existing documentation or markdown files that explain your codebase structure to a new joiner?"
- "How comfortable are you resisting the urge to manually fix a bug instead of re-prompting the agent?"
- "What communication tools like Slack or Linear would you like these agents to integrate with?"
- "Do you have a clear definition of success or a template of a perfect pull request for the agent to follow?"

## Common Mistakes to Flag

- **Vibe Coding** - Generating code without maintaining a thorough understanding of the implementation details leads to unmaintainable systems.
- **Vague Prompting** - Assuming the AI knows what you mean without providing granular, specific technical constraints results in misaligned output.
- **Manual Intervention** - Reverting to manual coding when the AI goes off-rails prevents you from learning how to steer the model effectively for long-term scale.
- **Synchronous Management** - Treating agents as chat tools rather than asynchronous team members prevents you from realizing the gains of parallel development.

## Deep Dive

For all 31 sourced insights from 15 guests, see `references/guest-insights.md`

## Related Skills

- Writing Prds
- Shipping Velocity
- Ai Assisted Prototyping
- Product Tool Stack
