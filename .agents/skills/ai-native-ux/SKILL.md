---
name: ai-native-ux
description: Help users interact with probabilistic models by designing interfaces that manage fluidity, intent, and agency while maintaining trust and control.
---

# Designing AI-Native User Experiences

Transition from static interfaces to fluid, intent-driven interactions that leverage model intelligence.

Help the user with designing ai-native user experiences using insights from 14 guests and posts across Lenny's Podcast and Newsletter.

## How to Help

1. **Map the Agency-Control Balance** - Assist the user in deciding which tasks the AI should automate versus which requires manual human oversight.
2. **Design for Non-Determinism** - Help create UI patterns that account for varying model outputs and provide easy correction mechanisms.
3. **Structure Conversational Grammars** - Guide the user in defining the invisible rules and structured elements that make natural language interfaces predictable.
4. **Iterate on Feedback Loops** - Help implement simple, high-frequency feedback mechanisms to refine model performance based on user interaction.

## Core Principles

### Design for fluid intent
Aishwarya Naresh Reganti + Kiriti Badam: "Most people tend to ignore the non-determinism. You don't know how the user might behave with your product, and you also don't know how the LLM might respond to that. The second difference is the agency control trade-off."

Move away from fixed buttons and forms toward interfaces where user intentions are expressed through natural language. This requires managing the trade-off between the flexibility of language and the precision of traditional UI.

### Define clear decision boundaries
Adriel Frederick: "And I was like yeah, the reason that falls down is the algorithms don't understand long term effects often, nor do they understand how people might respond to it, nor do they understand your intent for the product, and I think it's really important for product managers to play that role. That is our job. When you are working on algorithmic heavy products, your job is figuring out what the algorithm should be responsible for, what people are responsible for, and the framework for making decisions."

Explicitly establish which decisions belong to the algorithm and which require human intervention. This framework bridges the gap between machine optimization and human intent.

### Build structured grammars for language
Aparna Chennapragada: "Natural language interface. NLX is the new UX. Often I hear a product builders say, 'Oh, yeah. With AI, the model eats the products.' That doesn't mean it's not designed."

Natural language experiences shouldn't be left entirely to the model. Designers must define the invisible UI constructs and grammars inherent in specific contexts like meetings or podcasts.

### Implement effortless correction
Gustav Söderström: "And the AI DJ is you press a button, a digitized person, there's a real person named X, digitized X. So he's now an AI, comes on and talks to you about music that you like and suggests music, and you can listen to it. And if you don't like it, you can just call him back and he says, 'Okay, now, let's listen to something maybe from a few summers ago,' or 'Here's some new stuff that were trending yesterday in The Last of Us episode or something like that.'"

Because AI outputs are inherently variable, prioritize simple feedback loops. Use digitized personas or 'call for help' buttons to make correcting AI mistakes feel natural for the user.

### Optimize for instruction following
Kevin Weil: "It's very good at instruction following. That's actually something that I think people... I'm starting to see people discover with it, but you can do very complex things. You can give it two images, one is your living room and the other is a whole bunch of photos or memorabilia or things you want and you say, 'Tell me how you would arrange these things.'"

Shift interaction patterns from simple commands to complex, multi-step instructions. Design the UX to leverage the model's reasoning capabilities across multi-modal inputs.

### Scale through an agency-control ladder
From "Why your AI product needs a different development lifecycle": "Start by identifying a set of features that are high control and low agency (version 1 in the image above). These should be small, testable, and easy to observe. From there, think about how those capabilities can evolve over time by gradually increasing agency, one version at a time."

Only increase AI autonomy after performance is verified in low-stakes environments. Start with high-control features and break down lofty agent goals into small, testable behaviors.

### Preserve user flow state
Ryan J. Salva: "When you are in the editor, it could be VS Code, it could be IntelliJ, it could be them, essentially, as you are typing, Copilot will provide suggestions usually in kind of this italicized gray text that is really, to your point, kind of magical what it's able to infer."

Integrate AI suggestions directly into existing tools using non-disruptive cues like italicized gray text. This ensures the AI assists the user without breaking their creative momentum.

## Templates & Frameworks

- **NLX (Natural Language Experience) Design Elements** (Aparna Chennapragada) - A set of invisible UI constructs that must be explicitly designed in conversational AI interfaces.
- **AI Makes Pixels Free** (Sam Schillace) - Just as the internet made information distribution free, AI will make pixel production free — transforming the entire software industry from static apps to dyna
- **Fault-Tolerant User Interfaces** (Gustav Söderström) - A design principle for AI products where the UI is built to accommodate the error rate of the underlying machine learning model.
- **Canva Magic Media UX Evolution** (Counterintuitive advice for building AI products) - How Canva iterated on their text-to-image AI feature to reduce the intimidation of empty prompt boxes and guide users to better outcomes
- **Low Downside Design Patterns for AI Agents** (Make product management fun again with AI agents) - Four patterns for capping the risk of AI agent mistakes while preserving upside, applicable to any agent design.
- **200 Millisecond Latency Sweet Spot for AI Suggestions** (Ryan J. Salva) - The optimal response time for inline AI code suggestions to maintain developer flow state
- **AI Pair Programmer Framing** (Ryan J. Salva) - A product persona/metaphor used to guide ethical and UX decisions for AI coding tools

See `references/artifacts.md` for the full list with details.

## Questions to Help Users

- "What is the current breakdown between human control and AI agency in this workflow?"
- "How does the interface handle a situation where the model provides an incorrect or low-confidence response?"
- "Are we providing enough visual cues to help the user move past a blank prompt box?"
- "What invisible UI grammars are necessary to make this conversation feel structured and useful?"
- "Is the latency of the AI response fast enough to maintain the user's flow state?"
- "How are we distinguishing between user-authored content and AI-generated suggestions?"

## Common Mistakes to Flag

- **The Empty Prompt Trap** - Expecting users to know exactly what to type without providing visual starting points or guided options leads to user paralysis.
- **Over-building Rigid UI** - Hard-coding specific UI elements for model features makes the product fragile and unable to keep pace with rapid AI improvements.
- **Black Box Autonomy** - Increasing AI agency without early human-in-the-loop controls makes debugging impossible and destroys user trust when errors occur.
- **Ignoring Non-Determinism** - Treating AI like a fixed decision engine leads to broken user experiences when the model inevitably produces varied results.

## Deep Dive

For all 14 sourced insights from 14 guests, see `references/guest-insights.md`

## Related Skills

- Ai Product Strategy
- Ai Evals
