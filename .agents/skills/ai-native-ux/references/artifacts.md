# Designing AI-Native User Experiences - Frameworks, Templates & Checklists

*20 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### 200 Millisecond Latency Sweet Spot for AI Suggestions (Ryan J. Salva)
The optimal response time for inline AI code suggestions to maintain developer flow state

How it works: Through experimentation, the Copilot team found that ~200 milliseconds is the sweet spot for returning AI suggestions in a code editor. Faster isn't always necessary; the goal is that the developer doesn't feel interrupted. Latency varies by geographic location. This was discovered through experiments measuring how many milliseconds are acceptable before a developer feels their flow is broken.

### AI Makes Pixels Free (Sam Schillace)
Just as the internet made information distribution free, AI will make pixel production free — transforming the entire software industry from static apps to dynamic, intentional, semantic experiences.

How it works: Analogy: Pre-internet, distributing information was expensive → businesses built on that scarcity. Internet made it free → disruption. Currently, producing pixels (software UI) is expensive → requires programmers, infrastructure. AI will make pixels free → disruption. Evidence: Digital art that required Photoshop expertise now requires a text prompt. What-if questions for the future: What if models get good at planning? What if multimodal AI can consume and produce dynamic UI? What if personalization gets really good? End state: Users will spend time communicating intention and consuming results, not manipulating static apps. Prediction: Within 5 years, inability to express intent to software will feel as anachronistic as a device without internet connectivity.

### AI Pair Programmer Framing (Ryan J. Salva)
A product persona/metaphor used to guide ethical and UX decisions for AI coding tools

How it works: Frame the AI as a pair programmer sitting next to the developer. Ask: if this pair programmer were whispering crazy things (politics, offensive content, slander), would the developer be able to focus? This framing creates principles for: what behavior is appropriate, what content should be filtered, and how the AI should serve the developer's creative flow. Core principle: AI augments, never replaces the developer.

### AI Tool Spec Design (Karina Nguyen)
A framework for designing how an AI model interacts with a product feature (like Tasks/Reminders).

How it works: Steps to design the spec: 1. Identify the user input (e.g., 'Remind me to go to lunch at 8 AM'). 2. Determine the exact information the model needs to extract (Time, Action). 3. Define the JSON schema format for the extracted data. 4. Set the instruction/trigger for the system to execute the task.

### Agency-Control Trade-off Matrix (Aishwarya Naresh Reganti + Kiriti Badam)
A mental model for scaling AI autonomy by balancing how much decision-making power the AI has (agency) versus how much oversight the human retains (control).

How it works: Start with High Control / Low Agency (e.g., AI suggests, human acts). Move to Medium Control / Medium Agency (e.g., AI drafts and executes pending human review). End at Low Control / High Agency (e.g., AI acts autonomously).

### Agency-Control Tradeoff (Why your AI product needs a different development lifecycle)
A mental model for understanding that every increase in AI system autonomy comes at the cost of reduced human control, and that agency must be earned incrementally.

How it works: Core principle: Every time you give an AI system more agency, you give up some control.

- Agency = the AI system's ability to take actions, make decisions, or carry out tasks on behalf of the user
- Control = the human's ability to observe, override, and correct the system's behavior
- The tradeoff is always present — if the system suggests a response (low agency), you can override; if it sends automatically (high agency), you'd better be sure it's right
- Agency must be earned through demonstrated performance in lower-agency versions
- If you skip to full agency without validating under high control, you lose visibility, trust, and the ability to debug

Versioning approach:
- v1: High control, low agency (e.g., route tickets)
- v2: Medium control, medium agency (e.g., suggest resolutions)
- v3: Low control, high agency (e.g., auto-resolve with human fallback)

### Escape Hatches (Guillermo Rauch)
A systems design principle that allows builders to break out of abstractions when they hit limitations.

How it works: Originally inspired by React's 'dangerouslySetInnerHTML'. In the context of AI, it means having access to the underlying code so you can manually edit it, use Git, or paste it into another AI (like ChatGPT o1) to get unstuck.

### Fault-Tolerant User Interfaces (Gustav Söderström)
A design principle for AI products where the UI is built to accommodate the error rate of the underlying machine learning model.

How it works: If an AI model has a 1-in-5 success rate, the UI should present 5 options simultaneously (e.g., Midjourney generating 4 images) rather than a single 'play' button, ensuring the user finds at least one good result.

### Low Downside Design Patterns for AI Agents (Make product management fun again with AI agents)
Four patterns for capping the risk of AI agent mistakes while preserving upside, applicable to any agent design.

How it works: Instead of high-risk action → Use low-risk alternative:
1. Pinging a Slack channel → Send me a DM that I can copy-paste
2. Sending an email → Create a draft and star the thread for my review
3. Making a decision → Make a recommendation
4. Modifying a document → Append suggestions at the bottom

Also: physically restrict access with granular permissions. Agent platforms with hard access constraints are preferable because they physically limit AI behavior.

### NLX (Natural Language Experience) Design Elements (Aparna Chennapragada)
A set of invisible UI constructs that must be explicitly designed in conversational AI interfaces.

How it works: Key elements include: 1) The prompt as a UI construct. 2) Editable plans generated by the agent. 3) 'Showing the work' (balancing verbosity to build trust without feeling like a cron job). 4) Proactive follow-ups to guide the user to a happy path.

### Two Categories of Prompts (An AI glossary)
A simple framework for distinguishing the two types of prompts in AI products

How it works: 1. Conversational prompts: What you send ChatGPT/Claude/Gemini when you're having a conversation with it
2. System/product prompts: The behind-the-scenes instructions that developers bake into products to shape how the AI product behaves

## Examples

### Canva Magic Media UX Evolution (Counterintuitive advice for building AI products)
How Canva iterated on their text-to-image AI feature to reduce the intimidation of empty prompt boxes and guide users to better outcomes

How it works: Problem: Text-to-image is magical when you know what you want and how to describe it, but most people don't have the right vocabulary or don't know what they're looking for.

Iterations:
1. Lessened the fear-inducing empty prompt box
2. Introduced more visual options to guide users to a great image
3. Added help to get people prompting in the right way
4. Focused on post-generation experience—how to tweak and adjust AI output to be exactly what you want

Key lesson: AI tools require a combination of intuitive product design and broader, ongoing education to support behavior shifts. You can't 'flip the switch' with AI.

### Canvas Synthetic Training Behaviors (Karina Nguyen)
The three core behaviors OpenAI synthetically trained the model to perform for the Canvas feature.

How it works: 1. Triggering: Knowing when to open Canvas (e.g., 'Write me a long essay') vs. standard chat (e.g., general trivia). 2. Updating/Editing: Knowing whether to select specific sections to delete/edit or to rewrite the entire document. 3. Commenting: Critiquing specific parts of the text based on user prompts.

### Car Dealership Chatbot Decomposition (Sander Schulhoff)
Example of using decomposition to handle a complex customer service query by breaking it into verifiable subproblems

How it works: Scenario: Customer sends rambling message about returning a car with unclear dates, car type, and damage. Instead of solving all at once, decompose into subproblems: 1. Is this even a customer? (database check) 2. What car do they have? 3. What date was it checked out? 4. Do they have insurance? 5. What's the return policy for their situation? Each subproblem can be distributed to different tool-calling agents. Final step: Aggregate all resolved subproblems to make return decision.

### Conversation Title Generation Prompt (Karina Nguyen)
A micro-experience prompt used at Anthropic to generate personalized chat titles.

How it works: Take the 5 latest conversations from the user, ask the model 'What is the style of the user?', and then generate the next conversation title matching that specific style to create a personalized micro-experience.

### Intercom Fin (Paul Adams)
An AI-first chatbot that serves as the first line of defense for customer support.

How it works: Resolves up to 50-70% of inbound questions. Also augments human reps in the inbox by suggesting answers and rephrasing text. Requires new roles like 'conversation designers'.

### Nurture Boss Real Estate Assistant Trace (Hamel Husain & Shreya Shankar)
A real-world example of an AI system prompt and user interaction log showing tool calls and conversational flow.

How it works: Includes the system prompt ('You are an AI assistant working as a leasing team member...') and a multi-turn conversation involving tool calls for apartment availability and hallucinated virtual tours.

### Superhuman Pre-computed AI Outputs (Counterintuitive advice for building AI products)
How Superhuman differentiates from Gmail and Outlook by pre-computing AI replies and summaries for instant delivery

How it works: Feature: Instant Reply and Auto Summarize
Differentiator: Gmail and Outlook have similar features but require on-demand generation with wait time. Superhuman pre-computes replies and summaries so they are always instantaneous.
Key lesson: Speed wins. Pre-computing is a massive lever on user experience. The simple difference of instant vs. waiting is what drives adoption.

### Universal Primer (Logan Kilpatrick)
An education-focused GPT that helps users learn new concepts.

How it works: Uses the Socratic method to explain complex concepts (like transformers in LLMs) and then asks the user questions to reinforce learning.

### Windsurf VSCode Acceptance Rate 3x Improvement (Varun Mohan)
Moving from VSCode extension to custom Windsurf IDE tripled autocomplete acceptance rates with identical ML models, proving that UI/UX is as important as model quality.

How it works: In VSCode, they had to dynamically generate images alongside the cursor because the API didn't support proper inline edit display. In Windsurf, they built custom UI for inline refactors. Same ML models, acceptance rate tripled. Key insight: Technology matters, but if users can't extract value from the technology due to poor UX, you need to build a new surface/interface.

