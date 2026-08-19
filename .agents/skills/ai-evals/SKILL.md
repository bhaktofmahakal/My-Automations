---
name: ai-evals
description: Help users build robust infrastructure for measuring, monitoring, and iterating on AI product performance using human, code-based, and LLM-as-a-judge methodologies.
---

# AI Evaluation Strategy

Move beyond vibe checks to systematic, empirical measurement of AI product quality and reliability.

Help the user with ai evaluation strategy using insights from 11 guests and posts across Lenny's Podcast and Newsletter.

## How to Help

1. **Identify Failure Modes** - Help the user conduct error analysis on real traces to find where the system specifically breaks.
2. **Select Eval Methods** - Recommend the right mix of human, code, and LLM judges based on the specific technical use case.
3. **Build Gold Sets** - Assist in curating a reference dataset of high-quality examples to act as the ground truth for your application.
4. **Operationalize** - Guide the user in integrating these evaluations into a CI/CD pipeline for continuous quality improvement.

## Core Principles

### Automate the Value Chain
Brendan Foody: "I think that for enterprises especially, the core way to think about it is how can they build a test or systematic way to measure how well AI automates their core value chain? So if it's an architecture firm that's producing these architecture diagrams of what they provide to their end customer, how can they effectively measure that? And each company has its own value chain or maybe a handful of them if it's a multi-product company."

Identify the core deliverables unique to your business and develop systematic tests to measure how accurately AI can replicate those specific tasks.

### Prioritize Subjective Excellence
Edwin Chen: "We are looking for a Nobel Prize-winning poetry. Is this poetry unique? Is it full of subtle imagery? Does it surprise you and target your heart? Does it teach you something about the nature of moonlight?"

True data quality is defined by deep, subjective human excellence, such as emotional resonance and uniqueness, rather than superficial binary checks.

### Eliminate Vibe Checks
Hamel Husain & Shreya Shankar: "Evals help you create metrics that you can use to measure how your application is doing and kind of give you a way to improve your application with confidence. That you have a feedback signal in which to iterate against."

Create systematic metrics to track application quality over time, allowing teams to iterate on prompts or models with the same confidence as traditional software.

### Structured Judge Logic
From "Beyond vibe checks: A PM’s complete guide to evals": "Clearly articulating what you want your judge-LLM to measure isn’t just a step in the process; it’s the difference between a mediocre AI and one that consistently delights users. Building these writing skills requires practice and attention."

Write effective automated evaluations by using a structured prompt that defines the role, data, success criteria, and specific labels for the judge.

## Templates & Frameworks

- **LLM-as-a-Judge Playbook** (Building eval systems that improve your AI product) - A systematic three-step process for building, validating, and measuring an LLM judge that provides trusted binary pass/fail metrics for subjective AI quality as
- **Three Eval Approaches (Human, Code-based, LLM-based)** (Beyond vibe checks: A PM’s complete guide to evals) - A decision framework for choosing the right eval approach based on your use case, with pros and cons for each.
- **The Eval Formula (Four-Part Structure)** (Beyond vibe checks: A PM’s complete guide to evals) - A four-part formula for writing effective LLM-based eval prompts that any PM can use to construct judge-LLM prompts.
- **Open Coding and Axial Coding for AI Error Analysis** (Building eval systems that improve your AI product) - A qualitative research methodology adapted for AI product evaluation, used to discover and categorize failure modes from user interaction data.
- **RAG Evaluation Framework (Retriever + Generator)** (Building eval systems that improve your AI product) - A two-part evaluation approach for RAG systems that separately assesses the retriever and generator components with specific metrics for each.
- **AI Eval Improvement Flywheel** (Building eval systems that improve your AI product) - The closed-loop process that uses CI safety nets and production discovery engines together to create continuous AI product improvement.
- **Reference Dataset Structure** (Why your AI product needs a different development lifecycle) - A template for building the initial reference dataset (20-100 examples) to break the cold start and provide a baseline for AI system evaluation.
- **Transition Failure Matrix for Agentic Workflows** (Building eval systems that improve your AI product) - A diagnostic tool for pinpointing exactly which step in an agent's multi-step workflow breaks down, enabling data-driven debugging.

See `references/artifacts.md` for the full list with details.

## Questions to Help Users

- "What are the top 3 to 5 failure modes your users are currently experiencing in production?"
- "Do you have a single domain expert or benevolent dictator who defines what quality looks like for this feature?"
- "What percentage of your current evaluation process is manual versus automated?"
- "Is your system non-determinism primarily occurring in the retrieval or the generation phase?"
- "Have you established a golden dataset of at least 20 to 50 human-labeled examples yet?"
- "How do you currently measure the performance delta when you switch models or change a system prompt?"

## Common Mistakes to Flag

- **Relying on vibe checks** - Manual and anecdotal testing leads to inconsistent quality and hidden regressions that damage user trust over time.
- **Obsessing over prompt engineering** - Focusing solely on prompts while neglecting the underlying evaluation system prevents teams from scaling or hill-climbing systematically.
- **Using generic metrics for product reporting** - Off-the-shelf scores are useful for filtering but often fail to capture the specific value or failures unique to your business logic.
- **Ignoring component isolation** - Failing to evaluate the retriever separately from the generator in RAG systems makes it impossible to know which part of the stack is failing.
- **Neglecting non-determinism** - Failing to account for the stochastic nature of LLMs leads to false confidence in results that may not repeat in production.

## Deep Dive

For all 33 sourced insights from 11 guests, see `references/guest-insights.md`

## Related Skills

- Ai Product Strategy
- Ai Native Ux
