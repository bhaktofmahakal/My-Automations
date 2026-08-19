# AI Evaluation Strategy - All Guest Insights

*11 sources, 38 insights*

---

## Aishwarya Naresh Reganti + Kiriti Badam

**Insight:** Effective AI performance evaluation moves beyond static metrics to a collaborative analysis of agent traces and real-world failure modes.

**Tactical advice:**
- Review agent traces as a cross-functional team to define and calibrate desired system behavior.
- Establish human-in-the-loop feedback mechanisms to flag incorrect AI outputs in production.
- Deconstruct and reconstruct internal processes to ensure evaluation loops capture non-deterministic failures.

*Source: Aishwarya Naresh Reganti + Kiriti Badam @ 00:33:47*

---

> "It's not about being the first company to have an agent among your competitors. It's about have you built the right flywheels in place so that you can improve over time."

**Insight:** The competitive advantage in AI products is not speed to launch, but the ability to build infrastructure for continuous learning and iterative calibration in production.

**Tactical advice:**
- Prioritize building the flywheels necessary to capture and implement improvements over time.
- Embrace the 'pain' of learning through implementation as a necessary moat against competitors.
- Adjust post-deployment lifecycles to account for the unique ways AI systems diverge from traditional software maintenance.

*Source: Aishwarya Naresh Reganti + Kiriti Badam @ 00:46:18*

---

## Boris Cherny

**Insight:** Embedding safety as a core organizational mission ensures it remains the primary filter for all product and model development decisions.

**Tactical advice:**
- Align the development trajectory of models with a defined mental model for safety.
- Integrate tool use and computer use capabilities incrementally to monitor safety at each stage.
- Build a mission-driven culture where safety is the fundamental motivation for every team member.

*Source: Boris Cherny @ 00:54:30*

---

## Brendan Foody

> "I think that for enterprises especially, the core way to think about it is how can they build a test or systematic way to measure how well AI automates their core value chain? So if it's an architecture firm that's producing these architecture diagrams of what they provide to their end customer, how can they effectively measure that? And each company has its own value chain or maybe a handful of them if it's a multi-product company."

**Insight:** Systematic measurement of an AI's ability to automate a company's specific value chain is the essential prerequisite for effective implementation.

**Tactical advice:**
- Identify the core value chain or specific deliverables unique to your business.
- Develop systematic tests to measure how accurately AI can replicate those core outputs.
- Use custom evals as the primary requirement document for all AI initiatives.

*Source: [Why experts writing AI evals is creating the fastest-growing companies in history | Brendan Foody (CEO of Mercor)](https://www.youtube.com/watch?v=ja6fWTDPQl4) @ 00:06:19*

---

## Chip Huyen

**Insight:** Prioritize evaluating the actual performance delta of a potential solution over its technical sophistication or novelty.

**Tactical advice:**
- Calculate the performance gain of an optimal solution versus a non-optimal one before investing time.
- Evaluate the switching cost and long-term commitment required for a new technology.
- Think twice about committing to new technologies that haven't been better tested by the community.

*Source: [Al Engineering 101 with Chip Huyen (Nvidia, Stanford, Netflix)](https://www.youtube.com/watch?v=qbvY0dQgSJ4) @ 00:22:41*

---

## Edwin Chen

> "We are looking for a Nobel Prize-winning poetry. Is this poetry unique? Is it full of subtle imagery? Does it surprise you and target your heart? Does it teach you something about the nature of moonlight?"

**Insight:** True data quality for AI is defined by deep, subjective human excellence—such as emotional resonance and uniqueness—rather than superficial binary checklists.

**Tactical advice:**
- Move beyond superficial criteria like word counts or mandatory keyword presence.
- Evaluate outputs for subjective traits like subtle imagery, uniqueness, and the ability to surprise.
- Set an ambitious bar by aiming for 'Nobel Prize-winning' level human expression in training data.

*Source: [The 100-person AI lab that became Anthropic and Google's secret weapon | Edwin Chen (Surge AI)](https://www.youtube.com/watch?v=dduQeaqmpnI) @ 00:09:47*

---

> "The way it works is we essentially gather thousands of signals about everything that you're doing when you're working on platform. We are looking at your keyboard strokes. We are looking how fast you answer things. We are using reviews, we are using code standards, we are using... We're training models ourselves all on the outputs that you create, and then we're seeing whether they improve the model's performance."

**Insight:** Deep evaluation of AI requires tracking granular behavioral signals and expertise levels to identify the 'best of the best' human data for model training.

**Tactical advice:**
- Monitor granular behavioral signals like keyboard strokes and response speed to ensure human annotator engagement.
- Match evaluation tasks to annotators with specific, proven expertise in those particular domains.
- Measure progress by training internal models on human outputs to observe if they actually improve model performance.

*Source: [The 100-person AI lab that became Anthropic and Google's secret weapon | Edwin Chen (Surge AI)](https://www.youtube.com/watch?v=dduQeaqmpnI) @ 00:18:00*

---

## Hamel Husain & Shreya Shankar

**Insight:** The most effective way to start building AI evaluations is by manually reviewing application traces to identify specific real-world failure modes.

**Tactical advice:**
- Open an observability tool to review traces and logs of real customer interactions.
- Examine the full context of a failure, including system prompts and tool calls, to find the root cause.
- Document where the AI behaves unexpectedly before attempting to build any automated tests.

*Source: [Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar (creators of the #1 eval course)](https://www.youtube.com/watch?v=BsWxPI9UM4c) @ 00:13:29*

---

> "Evals help you create metrics that you can use to measure how your application is doing and kind of give you a way to improve your application with confidence. That you have a feedback signal in which to iterate against."

**Insight:** Building systematic metrics allows teams to move beyond subjective 'vibe checks' and iterate on AI features with the same confidence as traditional software.

**Tactical advice:**
- Create systematic metrics to track application quality over time as you change prompts or models.
- Implement simple unit tests for non-negotiable functionalities within your AI assistant.
- Track basic user signals, such as thumbs-up or thumbs-down, to create a feedback flywheel for product improvement.

*Source: [Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar (creators of the #1 eval course)](https://www.youtube.com/watch?v=BsWxPI9UM4c) @ 00:48:46*

---

> "When you're doing this open coding, a lot of teams get bogged down in having a committee do this. For a lot of situations, that's wholly unnecessary. You don't want to make this process so expensive that you can't do it. You can appoint one person whose taste that you trust."

**Insight:** Streamline the categorization of AI errors by appointing a single 'benevolent dictator' with domain expertise to define quality standards instead of relying on a committee.

**Tactical advice:**
- Use 'open coding' to manually label and group raw errors into distinct failure categories.
- Assign one person whose taste you trust, often the product manager, to lead the error categorization process.
- Keep the process lightweight and inexpensive to ensure the team actually performs it regularly.

*Source: [Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar (creators of the #1 eval course)](https://www.youtube.com/watch?v=BsWxPI9UM4c) @ 00:31:42*

---

**Insight:** To ensure automated evaluations are reliable, builders must first measure how closely the automated judge aligns with expert human judgment.

**Tactical advice:**
- Manually grade a small sample of outputs to create a 'gold set' of human-verified results.
- Compare the automated LLM judge's scores against the human gold set to check for agreement.
- Refine the evaluator's prompt if it fails to consistently match human taste and domain expertise.

*Source: [Why AI evals are the hottest new skill for product builders | Hamel Husain & Shreya Shankar (creators of the #1 eval course)](https://www.youtube.com/watch?v=BsWxPI9UM4c) @ 00:56:28*

---

## Howie Liu

**Insight:** CEOs should personally drive high-volume, expensive AI experiments to stress-test the value and boundaries of new features.

**Tactical advice:**
- Personally run high-inference tests on large internal datasets to evaluate AI output quality at scale.
- Leverage LLM map-reduce patterns to extract insights from massive corpora of data that exceed standard context windows.
- Analyze real-world data, such as sales transcripts, to verify the accuracy of AI-generated summaries and gap identifications.

*Source: [How we restructured Airtable’s entire org for AI | Howie Liu (co-founder and CEO)](https://www.youtube.com/watch?v=GT0jtVjRy2E) @ 01:03:43*

---

## Karina Nguyen

> "I think the bottleneck is actually in evaluations that we don't have all the frontier, like evals like, I don't know, GPQA, which is a Google-proof question answering, PhD level intelligence. The benchmark is getting to, I don't know, more than 60, 70%, which is what PhD gets. So it's literally hitting the wall in like evals."

**Insight:** High-quality evaluations are becoming the primary bottleneck for advancing AI model intelligence.

**Tactical advice:**
- Identify the core behaviors a feature needs (e.g., when to trigger or update) to focus your evaluation efforts.
- Benchmark models against frontier datasets like GPQA to measure PhD-level intelligence.
- Use early internal dogfooding and user feedback to rapidly iterate on model performance.

*Source: [OpenAI researcher on why soft skills are the future of work | Karina Nguyen (Research at OpenAI, ex-Anthropic)](https://www.youtube.com/watch?v=DeskgjrLxxs) @ 00:20:23*

---

## Kevin Weil

**Insight:** Evals are the essential unit tests for the AI era, enabling product builders to systematically measure non-deterministic performance and hill-climb toward quality.

**Tactical advice:**
- Identify specific use cases and build corresponding unit tests (evals).
- Treat the craft of writing evals as a core skill for every product builder.
- Use evals to guide iterative model improvement and hill-climbing.

*Source: [OpenAI’s CPO on how AI changes must-have skills, moats, coding, startup playbooks, more | Kevin Weil (CPO at OpenAI, ex-Instagram, Twitter)](https://www.youtube.com/watch?v=scsW6_2SPC4) @ 00:18:45*

---

## Lenny Rachitsky

> "Evals are the only way you can break down each step in the system and measure *specifically* what impact an individual change might have on a product, giving you the data and confidence to take the right next step. Prompts may make headlines, but evals quietly decide whether your product thrives or dies."

**Insight:** Evaluations provide the empirical data needed to move beyond subjective "vibe checks" and ensure an AI product's long-term quality and reliability.

**Tactical advice:**
- Break down every system step to measure the specific impact of each individual change.
- Shift focus from simple pass/fail tests to qualitative metrics like coherence and relevance.
- Invest in writing evals as a defining skill for AI product management.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "LLM-based evals allow you to generate classification labels in an automated way that resembles human-labeled data—without needing to have users or subject-matter experts label all of your data."

**Insight:** Selecting the right evaluation method involves balancing user accuracy (human evals), speed (code-based evals), and scalability (LLM-as-judge).

**Tactical advice:**
- Use code-based checks for speed when evaluating objective logic like valid API calls.
- Implement human feedback loops like thumbs-up/down buttons for direct user alignment.
- Scale qualitative grading using an external LLM system to act as a judge.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "Clearly articulating what you want your judge-LLM to measure isn’t just a step in the process; it’s the difference between a mediocre AI and one that consistently delights users. Building these writing skills requires practice and attention."

**Insight:** Writing effective evaluations requires a structured prompt that defines the role, data, success criteria, and specific labels for the LLM judge.

**Tactical advice:**
- Provide the judge-LLM with a specific role and the exact context from your application.
- Clearly define success and failure criteria to translate user expectations for the judge.
- Ground the LLM by defining specific terminology and labels for its evaluations.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "Gathering data to evaluate, writing evals, analyzing the results, and integrating feedback from evals is an iterative workflow from initial development through continuous improvement after launch."

**Insight:** High-quality AI products require a continuous loop of capturing real user data, running automated evaluations, and iterating on the system based on those findings.

**Tactical advice:**
- Capture real examples of user engagement through direct feedback and manual inspection.
- Design evals as an iterative workflow from development through continuous post-launch improvement.
- Use evaluation data to decide whether to optimize prompts or fine-tune models.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "Many teams build eval dashboards that look useful but are ultimately ignored and don’t lead to better products, because the metrics these evals report are disconnected from real user problems."

**Insight:** AI evaluations only drive product improvement when they are grounded in real-world failure modes rather than generic metrics.

**Tactical advice:**
- Conduct rigorous error analysis to discover exactly what failure modes to measure.
- Build a reliable evaluation suite using both code-based and LLM-as-a-judge tools.
- Operationalize the suite to create a continuous improvement flywheel that catches regressions.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

> "The process that tells you where to focus is referred to as “error analysis” and should result in a clean and prioritized list of your product’s most common failure modes."

**Insight:** Systematic error analysis transforms anecdotal observations into a prioritized taxonomy of failures that defines your evaluation strategy.

**Tactical advice:**
- Appoint a single principal domain expert to act as the consistent arbiter of quality.
- Perform open coding by reviewing around 100 user interactions and writing free-form critiques.
- Apply axial coding to group free-form notes into a manageable set of under 10 primary failure modes.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

> "The expert’s task is to provide two things for every user interaction with your AI, grouped by session: a binary pass/fail judgment and a detailed critique."

**Insight:** Automated judges must be grounded in human-labeled datasets that use binary labels and critiques to ensure alignment with your quality bar.

**Tactical advice:**
- Designate a single domain expert to provide binary pass/fail judgments to avoid the subjectivity of Likert scales.
- Ensure critiques are detailed enough for a brand-new employee to understand or to be used in a few-shot prompt.
- Measure the judge against a human-labeled ground truth dataset to establish team trust in the metrics.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

> "In our framework, product builders work in a continuous loop of development (CD) and calibration (CC). During development, you scope the problem, design the architecture, and set up evaluations to keep non-determinism in check."

**Insight:** Evaluation metrics for AI must be designed to mitigate non-determinism by measuring how closely system responses align with curated reference data.

**Tactical advice:**
- Set up evaluations during the development phase to keep non-determinism in check.
- Develop application-specific scoring mechanisms before moving to high-agency features.
- Use reference datasets to evaluate system performance against likely real-world variation.

*Source: [Why your AI product needs a different development lifecycle](https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different-development-lifecycle)*

---

> "Once you’ve deployed, you enter the calibration loop, where you observe real behavior, figure out what broke, and make targeted improvements. With every cycle, the system earns a bit more agency."

**Insight:** AI maintenance is a calibration process of identifying specific failure patterns in production and applying targeted fixes to reduce non-determinism.

**Tactical advice:**
- Enter a calibration loop post-deployment to observe real-world behavior.
- Identify exactly what broke in production to make targeted system improvements.
- Tighten feedback loops with each calibration cycle to build system trust.

*Source: [Why your AI product needs a different development lifecycle](https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different-development-lifecycle)*

---

> "Instead of focusing on shiny demos, look for rigorous data and evaluations. I’ve seen too many PMs present flashy demos to executives only to stumble when asked about data and evaluations (including some lessons I learned the hard way!)."

**Insight:** Real AI adoption is signaled by a move away from flashy demos toward rigorous evaluation frameworks and accuracy metrics.

**Tactical advice:**
- Prepare answers for exactly how the model is expected to fail.
- Establish a ground-truth dataset to evaluate prompt performance.
- Validate whether AI actually solves the specific problem better than non-AI solutions.

*Source: [25 proven tactics to accelerate AI adoption at your company](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai-adoption-at-your-company)*

---

> "Evals (short for “evaluations”) are structured ways to measure how well an AI system performs on specific tasks, such as correctness, safety, helpfulness, or tone. They define what “good” looks like for your AI system and help you answer the question: Is this model doing what I want it to do?"

**Insight:** Evals serve as the unit tests for AI products, transforming subjective quality assessments into objective, quantitative benchmarks.

**Tactical advice:**
- Define what 'good' looks like for your AI system across metrics like correctness, safety, and tone.
- Run your model through predefined inputs and compare responses against expected outputs to quantify progress.
- Integrate evaluations into your workflow to catch regressions and guide iterative improvements.

*Source: [An AI glossary](https://www.lennysnewsletter.com/p/an-ai-glossary)*

---

> "After years of building AI products, I’ve noticed something surprising: every PM building with generative AI obsesses over crafting better prompts and using the latest LLM, yet almost no one masters the hidden lever behind every exceptional AI product: evaluations."

**Insight:** The biggest missed opportunity for AI product managers is failing to move beyond manual testing and prompt obsession into systematic evaluations.

**Tactical advice:**
- Stop relying on "vibe checks" and manual verification for internal testing.
- Avoid focusing exclusively on prompt engineering while neglecting system measurement.
- Build the internal muscle of systematic evaluation before launching AI features.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

**Insight:** Implementing evals is an essential safety check for AI products, akin to a driving test, that should never be skipped before launch.

**Tactical advice:**
- Pick a critical feature and write a simple hallucination or toxicity eval.
- Test your evaluation prompt on a small sample of 5-10 real user examples.
- Use open-source evaluator repositories like Phoenix or Ragas to get started quickly.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "As a user, you want evals that are (1) specific, (2) battle-tested, and (3) test for specific areas of success."

**Insight:** Use standard, battle-tested criteria like hallucination and correctness to catch common AI failure modes before they reach users.

**Tactical advice:**
- Apply hallucination evals when systems reason over provided documents or context.
- Deploy toxicity and tone evals for all end-user applications to ensure safety.
- Apply correctness metrics to measure how often the agent achieves its primary goal.

*Source: [Beyond vibe checks: A PM’s complete guide to evals](https://www.lennysnewsletter.com/p/beyond-vibe-checks-a-pms-complete-guide-to-evals)*

---

> "It is through the process of reviewing outputs and articulating what feels “wrong” that the true criteria for success emerge."

**Insight:** Evaluating multi-turn sessions rather than isolated turns is essential for capturing context loss and conversation flow issues.

**Tactical advice:**
- Sample and review full user interaction traces grouped by session to develop intuition.
- Categorize session failures into specific buckets like missing context or awkward handoffs.
- Use the critiques from full-session reviews to define the requirements for LLM-as-a-judge evaluators.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

**Insight:** Continuous quality assurance for AI requires integrating robust, trusted evaluators into a CI/CD pipeline to catch regressions automatically.

**Tactical advice:**
- Operationalize an evaluation suite to act as a gate that catches regressions before shipping.
- Maintain a golden dataset of human-labeled interactions to serve as a benchmark in CI.
- Use production monitoring as a discovery engine to find and categorize new, emergent failure modes.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

**Insight:** Generic metrics are useless for dashboard reporting but highly effective as filters to help humans find interesting failure cases for review.

**Tactical advice:**
- Do not use generic hallucination or toxicity scores as core metrics for product success.
- Sort traces by high and low off-the-shelf scores to uncover surprising failure modes.
- Build custom, product-specific evaluators once generic metrics help you discover what to look for.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

> "Demo value isn’t user value. Building a cool AI demo doesn’t mean we have a product that customers love and is useful."

**Insight:** Traditional engagement metrics are often inflated by 'tourist' curiosity, making longitudinal retention the only reliable indicator of true AI product-market fit.

**Tactical advice:**
- Measure success by the percentage of times users choose the AI-generated option over manual work for high-frequency tasks.
- Watch for the 'phantom PMF' cliff where novelty-driven acquisition masks underlying retention issues.
- Monitor adoption rates of 'small magic' features, which often have higher customer impact than flashy chatbots or complex agents.

*Source: [Counterintuitive advice for building AI products](https://www.lennysnewsletter.com/p/counterintuitive-advice-for-building-ai-products)*

---

> "Hallucination is a technical term that refers to the model’s propensity to return nonsensical or false completions depending on what’s asked of it. Basically, the model is like a very smart and overeager 6-year-old. It will try its best to give you a good answer even if it doesn’t know what it’s talking about."

**Insight:** AI models often prioritize sounding confident over being factually correct, necessitating that you provide specific context to 'ground' their answers.

**Tactical advice:**
- Be skeptical of confident answers that lack source verification, as models often 'hallucinate' plausible-sounding but false information.
- Feed the model the specific data it needs to answer a question 'on the fly' rather than relying on its pre-trained general knowledge.
- Use prompts to give the bot a specific persona (e.g., warm and friendly) to better manage the tone and style of its responses.

*Source: [I built a Lenny chatbot using GPT-3. Here’s how to build your own.](https://www.lennysnewsletter.com/p/i-built-a-lenny-chatbot-using-gpt-3-heres-how-to-build-your-own)*

---

> "Since most products start cold, aim to gather at least 20 to 100 examples up front. This dataset helps you evaluate system performance and also tells you what context your assistant needs in order to perform reliably."

**Insight:** A reference dataset is the essential baseline for AI development, providing a concrete standard for what expected behavior and necessary context look like.

**Tactical advice:**
- Curate 20 to 100 examples of queries and expected outcomes to break the cold start.
- Include metadata and context in your reference examples to ensure reliable decision-making.
- Pull examples from past logs or manually generate them based on expected product behavior.

*Source: [Why your AI product needs a different development lifecycle](https://www.lennysnewsletter.com/p/why-your-ai-product-needs-a-different-development-lifecycle)*

---

**Insight:** RAG systems require isolating the performance of the retriever from the generator to identify whether failures stem from missing data or poor reasoning.

**Tactical advice:**
- Evaluate the retriever component using recall@k to ensure the correct context is being fetched.
- Assess the generator independently for faithfulness and relevance to the provided context.
- Use custom evaluators to verify that the final output aligns with the ground truth data.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

**Insight:** Debugging complex agentic workflows is simplified by identifying exactly which step in a multi-stage transition leads to the ultimate failure.

**Tactical advice:**
- Map out the intended workflow steps and transition points for the agent.
- Create a matrix to track where transitions fail most frequently during user interactions.
- Focus optimization efforts on the specific transition step with the highest error rate.

*Source: [Building eval systems that improve your AI product](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve-your-ai-product)*

---

## Nick Turley

**Insight:** To maintain user trust as AI becomes more autonomous, product leaders must ensure the user always feels in control of the interaction.

**Tactical advice:**
- Keep the human "in the driver's seat" by designing interfaces that allow them to oversee AI agents.
- Provide visual indicators or status screens that show exactly what the AI is doing in real-time.
- Focus on building a long-term relationship where the AI understands the user's overarching goals through memory and context.

*Source: [Inside ChatGPT: The fastest-growing product in history | Nick Turley (Head of ChatGPT at OpenAI)](https://www.youtube.com/watch?v=ixY2PvQJ0To) @ 00:56:08*

---

**Insight:** The ultimate measure of an AI product's success is the user's subjective perception of its "vibe" and utility rather than its performance on academic benchmarks.

**Tactical advice:**
- Evaluate models based on "taste" in subjective areas like coding style and writing quality.
- Prioritize the "vibe" of the model to make it feel more alive and human to the average user.
- Implement dynamic reasoning so the model only pauses to "think" when a task requires high-level intelligence.

*Source: [Inside ChatGPT: The fastest-growing product in history | Nick Turley (Head of ChatGPT at OpenAI)](https://www.youtube.com/watch?v=ixY2PvQJ0To) @ 01:14:23*

---

