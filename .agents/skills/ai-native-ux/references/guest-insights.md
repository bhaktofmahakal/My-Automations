# Designing AI-Native User Experiences - All Guest Insights

*14 sources, 16 insights*

---

## Adriel Frederick

> "And I was like yeah, the reason that falls down is the algorithms don't understand long term effects often, nor do they understand how people might respond to it, nor do they understand your intent for the product, and I think it's really important for product managers to play that role. That is our job. When you are working on algorithmic heavy products, your job is figuring out what the algorithm should be responsible for, what people are responsible for, and the framework for making decisions."

**Insight:** Product managers must bridge the gap between machine optimization and human intent by defining the clear boundaries and decision-making frameworks for algorithmic systems.

**Tactical advice:**
- Explicitly define which decisions are the responsibility of the algorithm versus the human team members.
- Establish a decision-making framework that accounts for long-term user impact and product intent.
- Monitor for second-order effects and human responses that automated objectives fail to perceive.

*Source: [Humanizing product development | Adriel Frederick (Reddit, Lyft, Facebook)](https://www.youtube.com/watch?v=4avaVEAa64Y) @ 00:28:00*

---

## Aishwarya Naresh Reganti + Kiriti Badam

> "Most people tend to ignore the non-determinism. You don't know how the user might behave with your product, and you also don't know how the LLM might respond to that. The second difference is the agency control trade-off."

**Insight:** Building AI-native products requires a fundamental shift from fixed decision engines to managing fluid natural language interfaces and the trade-off between system autonomy and user control.

**Tactical advice:**
- Design for a fluid interface where user intentions are expressed in natural language rather than fixed buttons or forms.
- Account for non-deterministic outputs by anticipating varied LLM responses to identical prompts.
- Determine the appropriate level of agency to grant the system based on the reliability and trust it has earned.

*Source: Aishwarya Naresh Reganti + Kiriti Badam @ 00:05:54*

---

## Aparna Chennapragada

> "Natural language interface. NLX is the new UX. Often I hear a product builders say, 'Oh, yeah. With AI, the model eats the products.' That doesn't mean it's not designed."

**Insight:** Designing for natural language requires defining structured grammars and invisible UI constructs rather than leaving the user experience entirely to the model.

**Tactical advice:**
- Define the specific grammars and structures inherent in different conversational contexts, such as meetings versus podcasts.
- Identify and design the invisible UI elements that guide natural language as an interface.
- Resist the idea that 'the model eats the product' by actively designing constraints and conversational flows.

*Source: [Microsoft CPO: If you aren’t prototyping with AI, you’re doing it wrong | Aparna Chennapragada](https://www.youtube.com/watch?v=HbbfXAWcuUo) @ 00:18:10*

---

## Asha Sharma

**Insight:** AI enables a shift from static interface design to dynamic, code-native experiences that adapt in real-time to specific user contexts.

**Tactical advice:**
- Transition to "on the fly" personalization where the user experience adapts dynamically to each unique session.
- Design distinct interface paradigms to support the specific requirements of autonomous agents versus human users.
- Utilize interaction data to evolve the product UX automatically without manual design interventions.

*Source: [How 80,000 companies build with AI: products as organisms, the death of org charts, and why agents will outnumber employees by 2026 | Asha Sharma (CVP of AI Platform at Microsoft)](https://www.youtube.com/watch?v=J9UWaltU-7Q) @ 00:16:38*

---

## Boris Cherny

**Insight:** Choosing a flexible, low-overhead interface like a terminal allows product development to keep pace with rapidly evolving underlying AI models.

**Tactical advice:**
- Select form factors that provide the model maximum freedom to act and use tools.
- Avoid building overly rigid UIs that may become obsolete as model capabilities advance.
- Prioritize bringing AI capabilities directly into existing user workflows like the terminal or IDE.

*Source: Boris Cherny @ 01:03:43*

---

## Dr. Fei Fei Li

**Insight:** Generating realistic 3D worlds requires moving beyond language-only models to incorporate visual, perceptual, and spatial understanding.

**Tactical advice:**
- Develop world models based on visual and perceptual understanding rather than just language.
- Design navigable environments that mirror human spatial and object-based reasoning.
- Integrate language and spatial data as complementary systems for robust virtual worlds.

*Source: [The Godmother of AI on jobs, robots & why world models are next | Dr. Fei-Fei Li](https://www.youtube.com/watch?v=Ctjiatnd6Xk) @ 00:48:14*

---

## Gustav Söderström

> "And the AI DJ is you press a button, a digitized person, there's a real person named X, digitized X. So he's now an AI, comes on and talks to you about music that you like and suggests music, and you can listen to it. And if you don't like it, you can just call him back and he says, 'Okay, now, let's listen to something maybe from a few summers ago,' or 'Here's some new stuff that were trending yesterday in The Last of Us episode or something like that.'"

**Insight:** Generative user interfaces should prioritize effortless correction mechanisms to account for the inherent variability and unpredictable nature of AI-generated outputs.

**Tactical advice:**
- Implement digitized personas to act as a conversational interface for delivering AI-generated content.
- Design a simple feedback loop, such as a 'call back' button, to allow users to instantly pivot when AI suggestions miss the mark.
- Use generative models to create personalized commentary that explains the cultural relevance of recommendations to the user.

*Source: Gustav Söderström @ 00:13:12*

---

## Karina Nguyen

**Insight:** Defining when an AI should take autonomous action—and when it shouldn't—is a critical design step for collaborative agent features.

**Tactical advice:**
- Map out the user intentions that should trigger a specific interface change, such as shifting from a chatbot to a collaborative workspace.
- Teach the model when to refrain from triggering to avoid interrupting general information-seeking queries.
- Design the model's agency to include autonomous editing, such as selecting, deleting, or rewriting specific document sections based on natural language commands.

*Source: [OpenAI researcher on why soft skills are the future of work | Karina Nguyen (Research at OpenAI, ex-Anthropic)](https://www.youtube.com/watch?v=DeskgjrLxxs) @ 00:27:04*

---

## Kevin Weil

> "It's very good at instruction following. That's actually something that I think people... I'm starting to see people discover with it, but you can do very complex things. You can give it two images, one is your living room and the other is a whole bunch of photos or memorabilia or things you want and you say, 'Tell me how you would arrange these things.'"

**Insight:** AI user experiences should transition from static UI to natural, instruction-based interaction patterns that leverage the model's complex reasoning and instruction-following abilities.

**Tactical advice:**
- Design interfaces that prioritize high-quality instruction following for complex, multi-step tasks.
- Utilize multi-modal inputs to allow users to provide context and intent naturally.
- Mimic human-like interaction patterns, such as expert consultations, to simplify complex user requests.

*Source: [OpenAI’s CPO on how AI changes must-have skills, moats, coding, startup playbooks, more | Kevin Weil (CPO at OpenAI, ex-Instagram, Twitter)](https://www.youtube.com/watch?v=scsW6_2SPC4) @ 00:36:14*

---

## Lenny Rachitsky

> "Start by identifying a set of features that are high control and low agency (version 1 in the image above). These should be small, testable, and easy to observe. From there, think about how those capabilities can evolve over time by gradually increasing agency, one version at a time."

**Insight:** Successful AI scaling requires versioning features based on an 'agency-control' ladder, where autonomy is increased only after performance is verified at lower levels.

**Tactical advice:**
- Identify a set of features for v1 that are high-control and low-agency.
- Break down lofty end-states into small, testable early behaviors.
- Increase agency one version at a time as the system proves it can handle more autonomy.

*Source: [Why your AI product needs a different development lifecycle](https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different-development-lifecycle)*

---

> "All of this underscored to us that AI tools require a combination of intuitive product design and broader, ongoing education to support these behavior shifts. You can't ‘flip the switch’ with AI—society is in the midst of change at a cultural level, but well-built products can support this shift."

**Insight:** AI features require proactive UX design and user education to help people overcome the paralysis of an empty prompt box and build trust in probabilistic outputs.

**Tactical advice:**
- Replace empty prompt boxes with visual starting points and guided options to help users understand what is possible.
- Design robust post-generation tools that allow users to easily tweak and adjust AI-generated results to their exact needs.
- Use 'AI-powered' branding to set user expectations about the feature's capabilities and intended interaction style.

*Source: [Counterintuitive advice for building AI products](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building-ai-products)*

---

> "If you haven’t tested how the system behaves under high control, you’re not ready to give it high agency. And if you hand over too much agency without the system earning it first, you may lose visibility into the system, and the trust of your users."

**Insight:** Building AI systems without early human-in-the-loop controls creates 'black box' issues that make debugging and tracing errors impossible.

**Tactical advice:**
- Start with simple decisions that are easy for humans to verify and override.
- Ensure you have full visibility into system actions before increasing autonomy.
- Avoid jumping to full agency until you have tested the system's behavior when it fails.

*Source: [Why your AI product needs a different development lifecycle](https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different-development-lifecycle)*

---

## Robby Stein

**Insight:** Natural AI interfaces leverage state-of-the-art models to turn complex search tasks into simple, interactive conversations.

**Tactical advice:**
- Move away from rigid command syntax in favor of allowing users to ask five-sentence questions in natural language.
- Implement multi-turn conversational capabilities to allow users to refine their intent through follow-up questions.
- Integrate live, rich data graphs (like shopping or local places) to provide utility that feels more like a personal assistant than a search engine.

*Source: [Inside Google's AI turnaround: The rise of AI Mode, strategy behind AI Overviews, and their vision for AI-powered search | Robby Stein (VP of Product, Google Search)](https://www.youtube.com/watch?v=kOnsqqVbIeY) @ 00:18:51*

---

## Ryan J. Salva

> "When you are in the editor, it could be VS Code, it could be IntelliJ, it could be them, essentially, as you are typing, Copilot will provide suggestions usually in kind of this italicized gray text that is really, to your point, kind of magical what it's able to infer."

**Insight:** Optimal AI user experience is achieved by integrating suggestions directly into the user's existing tools using non-disruptive visual cues that preserve their creative flow.

**Tactical advice:**
- Implement inline suggestions using italicized gray text to distinguish AI input from user-authored content.
- Design the feature to infer intent from the local context, including class names, method names, and comments.
- Surface multiple suggestions to the user to provide scaffolding they can choose from and riff on.

*Source: [The role of AI in product development | Ryan J. Salva (VP of Product at GitHub, Copilot)](https://www.youtube.com/watch?v=awcd3P1DnX4) @ 00:22:43*

---

## Shweta Shriva

> "We had to integrate this into our design philosophy from the very beginning that this has to feel credible, predictable and the writers have to be able to trust the system. So that has been sort of the core of the design philosophy."

**Insight:** Building trust in high-stakes automated experiences requires a design philosophy that prioritizes human-like predictability and system transparency from the very beginning.

**Tactical advice:**
- Mimic human driving data and social norms to ensure the vehicle's body language is recognizable and predictable to other road users.
- Provide riders with real-time visibility into the system’s perception via in-car monitors to demonstrate that the vehicle is aware of its surroundings.
- Establish a human-in-the-loop connection, such as rider support calls, to reassure users that they can always reach a person if needed.

*Source: [Product lessons from Waymo | Shweta Shrivastava (Waymo, Amazon, Cisco)](https://www.youtube.com/watch?v=VtNmAjNF3Tc) @ 00:05:30*

---

## Tamar Yehoshua

**Insight:** Design AI products that guide users through non-deterministic outputs rather than trying to perfectly control every result.

**Tactical advice:**
- Provide guardrails and suggested prompts to help users get high-quality results from AI.
- Build product experiences that improve naturally as underlying models get better.
- Set clear expectations for users about the unpredictable nature of AI-generated content.

*Source: [Lessons in product leadership and AI strategy from Glean, Google, Amazon, and Slack | Tamar Yehoshua (Product at Glean, ex-Google and Slack)](https://www.youtube.com/watch?v=ZoSeOltKqQk) @ 01:02:16*

---

