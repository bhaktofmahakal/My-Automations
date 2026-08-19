# AI Evaluation Strategy - Frameworks, Templates & Checklists

*54 artifacts extracted from Lenny's Podcast and Newsletter*

## Frameworks

### AI Content Filtering Evolution (Ryan J. Salva)
A progression model for managing offensive/inappropriate AI output, from crude to sophisticated

How it works: Stage 1: No filter at all (very early days). Stage 2: Simple blocklist of words (fraught with peril—context-dependent words get caught). Stage 3: AI-based sentiment/context detection models (e.g., Azure Responsible AI) that understand when words are offensive vs. legitimate in context (e.g., medical software). Key lesson: crude blocklists make you an editor of language, which is uncomfortable and imprecise; AI models for content moderation are a better long-term solution.

### AI Eval Improvement Flywheel (Building eval systems that improve your AI product)
The closed-loop process that uses CI safety nets and production discovery engines together to create continuous AI product improvement.

How it works: Two components working together:

1. Safety Net (CI - known unknowns):
- Golden dataset + code-based evaluators
- Runs on every code/prompt change
- Blocks regressions

2. Discovery Engine (Production - unknown unknowns):
- Comprehensive logging of full interaction traces (input, intermediate steps, tool calls, output)
- Run validated evaluators (including LLM judges) asynchronously on sampled traces
- Use guardrails synchronously for critical, high-impact failures
- Feed results into monitoring dashboard
- Statistically correct raw outputs using known TPR/TNR

The Flywheel Loop:
1. MONITOR: Production monitoring flags new or drifting failure mode
2. ANALYZE: Manual review of flagged traces (new round of error analysis)
3. IMPROVE: Refine prompts, fix product issues, AND update evaluation artifacts
4. DEPLOY: Ship improvements
5. Add discovered examples to CI golden dataset (regression test)
→ Repeat

Key insight: Every failure, once discovered, makes system permanently smarter and more robust through both product improvement AND eval improvement.

### AI Postmortem Loop (Zevi Arnovitz)
A continuous improvement process where you ask AI to reflect on what in its system prompt or tooling caused a mistake, then update the tooling to prevent recurrence

How it works: Step 1: Identify when Claude fails to execute correctly or produces a bad bug. Step 2: Ask 'What in your system prompt or tooling made you make this mistake?' Step 3: Claude goes introspective and identifies root cause. Step 4: Update system prompt, /commands, documentation, or Claude.md to prevent recurrence. Step 5: Repeat after every significant failure. Applies even after successes — always review what could be better.

### AI System Non-Determinism Model (Two-Sided) (Why your AI product needs a different development lifecycle)
A mental model explaining that AI products introduce non-determinism on both the input side (user behavior) and output side (system behavior), unlike traditional software.

How it works: Traditional Software:
- Input: Deterministic (button clicks, form submissions, API calls)
- Output: Deterministic (fixed logic maps inputs to outputs)
- Debugging: Traceable to code issues

AI Systems:
- Input: Non-deterministic (open-ended prompts, voice commands, natural language — harder to validate, easier to misinterpret, widely varying expressions of intent)
- Output: Non-deterministic (models generate plausible responses based on patterns, not fixed rules; same request can produce different results depending on phrasing, context, or model version)
- Debugging: Harder to trace; behavior is probabilistic

Implication: You're designing for *likely* behavior, not guaranteed behavior. Your development process must account for uncertainty from the start, continuously calibrating between expected and actual behavior.

### Artificial Social Engineering (Sander Schulhoff)
Term for AI red teaming that parallels classical social engineering in cybersecurity - tricking AI systems through conversational manipulation rather than code-level exploits

How it works: Just as social engineering tricks humans into revealing information or taking harmful actions, artificial social engineering tricks AIs through prompt manipulation. Common techniques: storytelling/roleplay (grandmother bomb story), typos (BMB instead of bomb, bac ant instead of bacillus anthracis), encoding/obfuscation (Base64, ROT13), language switching. Key insight: 'You can patch a bug but you can't patch a brain' - unlike traditional cybersecurity where specific bugs can be fixed permanently, AI vulnerabilities can never be fully eliminated.

### Blind Evaluation Method for AI vs Human Work (How close is AI to replacing product managers?)
Methodology for fairly comparing AI and human work output, inspired by the Pepsi Challenge

How it works: Method:
1. Source hard tasks by crowdsourcing what AI struggles with from practitioners
2. Find real human answers to the same tasks (e.g., from Exponent PM interview database)
3. Use expert prompting with the best current model (GPT-4o via OpenAI Playground, not default ChatGPT)
4. Set custom system prompt (not default ChatGPT system prompt which has extra instructions)
5. Match formatting between AI and human answers to avoid visual bias
6. Present both solutions side-by-side without revealing which is AI
7. Ask evaluators to: (a) vote which is better, and (b) guess which is AI
8. Tally results separately for preference and identification accuracy
9. Count ties as AI wins (since AI is orders of magnitude cheaper/faster)

Key principles:
- Blind testing is the only fair evaluation method
- Brand/label bias significantly skews results (like Coke vs Pepsi)
- Private voting reduces groupthink and self-presentation bias
- Human performance benchmarks also need rigorous measurement
- Watch for data contamination in future tests (don't reveal correct answers publicly)

### Constitutional AI Process (Benjamin Mann)
A recursive self-improvement process for aligning AI models using a set of natural language principles.

How it works: Step 1: Model generates an initial response to a prompt. Step 2: Model checks its response against applicable constitutional principles (e.g., UN Human Rights, Apple TOS). Step 3: If non-compliant, the model critiques and rewrites its own response. Step 4: The middle critique steps are removed, and the model is trained to produce the final corrected output by default.

### Driving Test Analogy for AI Evaluation (Beyond vibe checks: A PM’s complete guide to evals)
A mental model for understanding what evals measure, framed as three dimensions analogous to a driving test.

How it works: Evaluating AI systems is like giving someone a driving test, measuring three dimensions:

1. Awareness: Can it correctly interpret signals and react appropriately to changing conditions?
2. Decision-making: Does it reliably make the correct choices, even in unpredictable situations?
3. Safety: Can it consistently follow directions and arrive safely at the intended destination, without going off the rails?

Key distinction from traditional software testing: Traditional unit testing is like checking if a train stays on tracks (deterministic, clear pass/fail). LLM evals are like driving through a busy city (variable environment, non-deterministic, qualitative/open-ended metrics).

### Evals as PRDs (Brendan Foody)
A mental model for AI development where the evaluation criteria serve as the Product Requirements Document.

How it works: Treat the AI model as the product and the eval as the PRD. Researchers use these evals to run experiments, measure progress, and eventually use them as sales collateral to demonstrate capabilities.

### Four-Phase Eval Workflow (Beyond vibe checks: A PM’s complete guide to evals)
An end-to-end workflow for building, testing, iterating, and deploying evals from initial data collection through production monitoring.

How it works: Phase 1: Collection
- Gather real user interactions via direct feedback, analytics, or manual inspection
- Capture human feedback (thumbs-up/down) from users interacting with the agent
- Document edge cases — unusual/unexpected user interactions and atypical agent responses
- Balance dataset across topics (e.g., hotel booking, flight booking, support, trip planning advice)
- Build a representative dataset: 10-100 examples with human labels as ground truth
- Start with spreadsheets, then consider tools like Phoenix for logging/managing data

Phase 2: First-Pass Evaluation
- Write initial eval prompts using the four-part eval formula
- Run evals against your dataset by sending eval prompt + agent answer variable to a judge LLM
- Get back a label for each row in your dataset
- Aim for at least 90% accuracy compared with human-labeled ground truth
- Identify patterns in failures and iterate on the prompt

Phase 3: Iteration Loop
- Refine eval prompts based on results
- Add few-shot examples of 'good' and 'bad' evals to ground the LLM response
- Expand dataset with new examples and edge cases
- Use evals as benchmarks when changing the AI system (e.g., swapping GPT-4o for Claude 3.7 Sonnet) — rerun dataset through updated agent and compare eval scores

Phase 4: Production Monitoring
- Set up evals to run automatically on live user interactions
- Track scores over time (e.g., 'Are users getting more frustrated over time?')
- Compare eval results to actual user outcomes (human-labeled ground truth)
- Build actionable eval dashboards for stakeholders
- Tie evals to business outcomes as proxy leading metrics

### Judge Alignment Matrix (Hamel Husain & Shreya Shankar)
A pivot table method to compare human error labels against LLM judge outputs to verify the judge's accuracy.

How it works: Rows = Human thought (True/False), Columns = Judge thought (True/False). Focus on the non-green diagonals (mismatches) rather than overall agreement percentage to refine the judge prompt.

### LLM-as-a-Judge Playbook (Building eval systems that improve your AI product)
A systematic three-step process for building, validating, and measuring an LLM judge that provides trusted binary pass/fail metrics for subjective AI quality assessments.

How it works: Step 1: Establish Ground Truth
- Use principal domain expert to label interactions
- Two things per interaction: binary pass/fail judgment + detailed critique
- Do NOT use 1-5 Likert scale (distinction between 3 and 4 is subjective/inconsistent)
- Binary decisions force clarity; nuance is captured in the critique
- Critiques are the 'secret ingredient' for building a high-fidelity judge

Step 2: Build and Validate the Judge
- Split ground-truth data into three sets:
  * Train set (10-20%): Clear examples with expert critiques for few-shot prompting
  * Dev set (40-45%): Iteratively test and refine judge prompt
  * Test set (40-45%): Held-out, untouched during development, for final unbiased measurement
- Refining on dev set is a 'meta-evaluation' task (evaluating your evaluator)
- This process also helps articulate and refine your own quality standards ('criteria drift')

Step 3: Measure TPR/TNR Over Accuracy
- Do NOT use single accuracy score (misleading for imbalanced datasets)
- TPR (True Positive Rate): Of all examples that should pass, % correctly labeled pass
- TNR (True Negative Rate): Of all examples that should fail, % correctly labeled fail
- Tradeoff depends on product context:
  * Medical advice: false negative (missing harmful suggestion) is most costly → prioritize TNR
  * Creative writing: false positive (flagging good response) is most costly → prioritize TPR
- Can use known TPR/TNR to statistically correct raw judge scores for more accurate failure rate estimates

### Multi-turn Conversation Eval Diagnostic (Building eval systems that improve your AI product)
A diagnostic approach for evaluating conversational AI that distinguishes between simple knowledge gaps and true conversational memory failures.

How it works: Step 1: Evaluate at session level first
- Did the entire session achieve the user's goal? (session-level pass/fail)

Step 2: When a conversation fails, isolate root cause
- Before diving into multi-turn analysis, try to reproduce the failure in a single turn
- Example: If shopping bot gives wrong return policy on turn 4, directly ask 'What is the return policy for product X1000?'
- If it still fails in single turn → simple knowledge or retrieval issue (not conversational)
- If it succeeds in single turn → confirmed conversational failure (losing context or misinterpreting earlier dialogue)

Benefit: Saves significant time by distinguishing simple knowledge gaps from true conversational memory failures

### Objective vs. Subjective Evaluator Selection (Building eval systems that improve your AI product)
A simple decision framework for choosing the right type of evaluator for each failure mode.

How it works: For each prioritized failure mode, ask one question:
Is this failure objective and rule-based, or subjective and requiring judgment?

Objective/Rule-based → Code-based evaluators
- Examples: 'Does the output contain a user ID?', valid JSON check, required keyword present, code executes without error
- Properties: Fast, cheap, deterministic
- Analogy: Like assertions in a unit test

Subjective/Requiring judgment → LLM-as-a-judge
- Examples: 'Was the tone appropriate for the persona?', relevance assessment, reasoning quality
- Properties: Requires systematic build and validation process
- Must measure alignment with human judgment via TPR/TNR

### Off-the-Shelf Metrics Creative Use Pattern (Building eval systems that improve your AI product)
The one appropriate way to use generic metrics like hallucination and toxicity scores—as a sorting/discovery mechanism rather than a dashboard metric.

How it works: DON'T: Report hallucination or toxicity scores directly on a dashboard.

DO (advanced technique):
1. Calculate off-the-shelf scores (hallucination, toxicity, etc.) on your traces
2. Sort traces by high/low score
3. Review the highest AND lowest scoring examples
4. Look for surprising failure modes or unexpected successes
5. Use discovered patterns to build custom evaluators

This is described as the ONLY appropriate use for off-the-shelf metrics.
Note: This is an advanced technique; master the basic error analysis approach first.

### Open Coding and Axial Coding for AI Error Analysis (Building eval systems that improve your AI product)
A qualitative research methodology adapted for AI product evaluation, used to discover and categorize failure modes from user interaction data.

How it works: Open Coding:
- Review each user interaction with the AI
- Write free-form critique on anything wrong or undesirable
- Give binary pass/fail judgment
- For passes: explain why the AI succeeded in meeting user's primary need, highlight areas for improvement
- For fails: identify critical elements that led to failure, explain why AI did not meet user's main objective
- Heuristic: critique should be detailed enough for a brand-new employee to understand, OR detailed enough to use in a few-shot prompt for an LLM judge
- Common mistake: being too terse

Axial Coding (Pattern-Finding):
- Read through all open-ended critiques
- Group related failures into categories
- Aim for manageable set of <10 primary failure modes
- Can use LLM for first-pass categorization but human must review
- Common trap: creating too many categories
- Final output: frequency count of each category (e.g., via pivot table)

Example categories from apartment leasing assistant:
- Conversation flow issues (missing context, awkward responses)
- Handoff failures (not recognizing when to transfer to humans)
- Rescheduling problems (struggling with date handling)

### RAG Evaluation Framework (Retriever + Generator) (Building eval systems that improve your AI product)
A two-part evaluation approach for RAG systems that separately assesses the retriever and generator components with specific metrics for each.

How it works: Principle: Evaluate retriever and generator separately. An end-to-end correctness score won't tell you which part is broken. Fix the retriever first.

Retriever Evaluation:
- Treat as a search problem
- Need dataset of queries paired with known correct documents
- Primary metric: Recall@k (% of truly relevant documents captured in top k results)
- Recall is paramount: if correct info isn't retrieved, generator can't produce correct answer
- Tuning k:
  * Simple factual queries (e.g., 'What are property taxes for 123 Main St?'): small k (3-5)
  * Complex synthesis queries (e.g., 'Summarize market trends for 3-bedroom houses'): larger k (10-20)
- Precision@k becomes important for re-ranking stages

Generator Evaluation:
- Faithfulness: Does the answer stick to facts in retrieved context, or is it hallucinating?
- Answer Relevance: Does the answer directly address user's original question?
- Note: An answer can be perfectly faithful but still irrelevant to user intent

### Stages of AI Post-Training (Edwin Chen)
A mental model comparing the evolution of AI training methods to how humans learn.

How it works: 1. SFT (Supervised Fine-Tuning): Mimicking a master. 2. RLHF: Writing 55 essays and having someone pick the best one. 3. Rubrics and Verifiers (Evals): Getting graded with detailed feedback on mistakes. 4. RL Environments: Learning by doing in a simulated world.

### The Eval Formula (Four-Part Structure) (Beyond vibe checks: A PM’s complete guide to evals)
A four-part formula for writing effective LLM-based eval prompts that any PM can use to construct judge-LLM prompts.

How it works: Every great LLM eval contains four distinct parts:

Part 1: Setting the Role — Provide the judge-LLM a role (e.g., 'You are examining written text') so the system is primed for the task.

Part 2: Providing the Context — This is the data you will be sending to the LLM to grade. It comes from your application (e.g., the message chain or agent-generated message). Use a variable like {text} that gets populated with the actual LLM agent output.

Part 3: Providing the Goal — Clearly articulate what you want the judge-LLM to measure. Define what success and failure look like. Translate nuanced user expectations into precise criteria.

Part 4: Defining the Terminology and Label — Be specific about what terms mean in your context. For example, 'toxicity' can mean different things — ground the judge-LLM in the terminology you care about.

Concrete example (toxicity/tone eval for trip planner):
- Role: 'You are a judge, evaluating written text.'
- Context: 'Here is the text: {text}'
- Goal: 'Determine whether the LLM agent response was friendly.'
- Terminology: ''Friendly' would be defined as using an exclamation point in response and generally being helpful. The response should never have a negative tone.'

### Three Eval Approaches (Human, Code-based, LLM-based) (Beyond vibe checks: A PM’s complete guide to evals)
A decision framework for choosing the right eval approach based on your use case, with pros and cons for each.

How it works: 1. Human Evals
   - What: Human feedback loops designed into the product (thumbs-up/down, comment boxes) or hired human labelers/SMEs providing labels
   - Pro: Directly tied to end user
   - Cons: Very sparse (most users don't provide feedback), not a strong signal (what does thumbs-up mean?), costly (hiring human labelers)
   - Used for: RLHF, aligning with human preferences, prompt optimization, fine-tuning

2. Code-based Evals
   - What: Checks on API calls or code generation (e.g., was generated code valid and runnable?)
   - Pro: Cheap and fast to write. Ranges from simple checks (string present in paragraph) to complex logic/system checks. Often cheaper/faster than LLM-as-judge on first pass.
   - Con: Not a strong signal for subjective or open-ended tasks
   - Used for: Code validation, deterministic checks, structured output validation

3. LLM-based Evals (LLM-as-Judge)
   - What: External LLM system with a prompt to grade output of the agent system
   - Pros: Highly scalable (like cheap human labeling), uses natural language so PMs can write prompts directly, can generate explanations for judgments, empirically useful over large datasets. Can use confidence scores or panels of judges to increase reliability.
   - Con: Requires initial setup with labeled examples to validate. Results are probabilistic — need sufficient volume to trust the signal.
   - Used for: Subjective quality assessment, tone, relevance, coherence at scale

### Three-Phase AI Eval System (Building eval systems that improve your AI product)
A complete methodology for building evaluation systems that drive real product improvements, consisting of three sequential phases.

How it works: Phase 1: Ground your evals in reality with error analysis
- Designate a single principal domain expert ('benevolent dictator') as arbiter of quality
- Sample ~100 representative user interactions (start with random sampling)
- Perform open coding: expert reviews each interaction, writes free-form critique + pass/fail judgment
- Perform axial coding: group critiques into failure mode categories (aim for <10 primary categories)
- Count category frequencies using pivot table to prioritize

Phase 2: Build out your evaluation suite
- For each failure mode, ask: Is this objective/rule-based or subjective/requiring judgment?
- Objective failures → code-based evaluators (assertions, JSON validation, keyword checks)
- Subjective failures → LLM-as-a-judge (systematic build and validation process)

Phase 3: Operationalize for continuous improvement
- Safety net: Code-based evals in CI with golden dataset
- Discovery engine: LLM judges + guardrails in production monitoring
- Flywheel: monitor → analyze → improve → deploy

### Transition Failure Matrix for Agentic Workflows (Building eval systems that improve your AI product)
A diagnostic tool for pinpointing exactly which step in an agent's multi-step workflow breaks down, enabling data-driven debugging.

How it works: Structure:
- Rows: Last successful step in the agent workflow (e.g., generating_sql, executing_sql, interpreting_results)
- Columns: Step where the failure occurred
- Cells: Count/frequency of failures at each transition

How to use:
1. Collect traces of failed agent interactions
2. For each failed trace, identify the last successful step and the step where failure occurred
3. Map each failure onto the matrix
4. Analyze hotspots (high-frequency cells) to identify the most common breakdown points
5. Focus debugging and improvement efforts on the highest-frequency transitions

Benefit: Transforms overwhelming task of debugging complex agents into focused, data-driven investigation. Instead of guessing, you can see with data where failures concentrate.

### Vibes Before Evals (Howie Liu)
A testing methodology for novel AI features.

How it works: Phase 1 (Vibes): Open-ended, ad-hoc testing to see what works and find the cluster of useful use cases. Phase 2 (Evals): Programmatic measurement to iterate and improve the output for the defined use cases.

## Templates

### AI Evaluation Spreadsheet (Karina Nguyen)
A simple spreadsheet structure used by PMs to define deterministic evaluations for AI model behaviors.

How it works: Create a spreadsheet with tabs for different scenarios. Columns should include: User Prompt/Conversation, Current Behavior, Ideal Behavior, Why (Reasoning), and Notes. This is used to create ground truth labels for pass/fail deterministic evals.

### Binary LLM-as-a-Judge Prompt (Hamel Husain & Shreya Shankar)
A prompt designed to evaluate a single, specific failure mode and output a binary True/False.

How it works: Instructs the LLM to output True or False based on specific criteria. Example criteria for a handoff error: explicit human requests ignored, sensitive resident issues, tool data unavailability, same day walk-in requests.

### Error Pattern Documentation Table (Why your AI product needs a different development lifecycle)
A simple table format for documenting recurring error patterns discovered during manual review of AI system outputs.

How it works: Table columns:
- Error Pattern: Short name for the recurring issue
- Description: What happens and why it's wrong
- Frequency: How often it occurs (e.g., % of reviewed cases)
- Impact: Severity of the error on user experience or system reliability
- Suggested Fix: Proposed change (prompt tweak, model change, retrieval improvement, new component, etc.)

Customer Support v1 Example Patterns:
| Error Pattern | Description | Frequency | Impact | Suggested Fix |
| Refund-Billing Confusion | Refund requests misrouted to Billing department | High | Medium | Add 'refund' keyword detection in routing logic; update prompt with department definitions |
| Vague Queries | Ambiguous user messages (e.g., 'I need help') routed randomly | Medium | High | Add clarification step before routing; improve fallback to human |
| Multi-issue Tickets | Tickets with multiple issues routed to only one department | Low | High | Split multi-issue tickets into sub-tickets or route to general triage |

### Friendly Tone Eval Prompt Template (Beyond vibe checks: A PM’s complete guide to evals)
A concrete example eval prompt for measuring agent tone/friendliness, demonstrating the four-part eval formula in practice.

How it works: Role: 'You are a judge, evaluating written text.'

Context: 'Here is the text: {text}'
(Where {text} is a variable populated with the LLM agent's actual response)

Goal: 'Determine whether the LLM agent response was friendly.'

Terminology & Label: ''Friendly' would be defined as using an exclamation point in response and generally being helpful. The response should never have a negative tone.'

Target accuracy: At least 90% agreement with human-labeled ground truth.

Iteration tip: If the eval disagrees with human labels (e.g., requiring an exclamation point is too strict), refine the terminology definition. Add few-shot examples of 'friendly' and 'not friendly' responses to improve performance.

### LLM-as-a-Judge Prompt Template (2-step) (Five proven prompt engineering techniques (and a few more-advanced tactics))
A two-step template for generating content and then having the AI evaluate and rate the outputs

How it works: Step 1 Template: "Generate [task]."

Step 2 Template: "Please rate the output on a scale of 1 to 5 based on [criteria]: [output of task]. For each rating, provide a brief explanation of the score."

Example Step 1: "Generate five diverse product descriptions for a pair of shoes that fits any foot size."

Example Step 2: "Please rate each of the product descriptions on a scale of 1 to 5 based on clarity, persuasiveness, and how well it conveys the product's unique value proposition. For each rating, provide a brief explanation of the score."

Source paper: https://arxiv.org/abs/2306.05685

### Open Codes to Axial Codes Prompt (Hamel Husain & Shreya Shankar)
An LLM prompt used to synthesize raw error notes (open codes) into distinct failure categories (axial codes).

How it works: Prompt structure: 'Please analyze the following CSV file... I have different open codes... create axial codes.' Can be customized to group by user story stage or demand actionable failure modes.

### Open Coding Annotation Template (Building eval systems that improve your AI product)
Template structure for domain experts to annotate AI interactions during error analysis, with pass/fail judgment and detailed critique.

How it works: For each user interaction with the AI:

Fields:
- Interaction ID / Session ID
- User input(s)
- AI output(s)
- Additional context (retrieved documents, tool calls, etc.)
- Judgment: PASS / FAIL
- Detailed Critique:

For PASS:
- Why the AI succeeded in meeting the user's primary need
- Critical aspects that could be improved (even though it passed)
- Justification for overall passing judgment

For FAIL:
- Critical elements that led to the failure
- Why the AI did not meet the user's main objective
- Any compromised factors (user experience, security, accuracy, etc.)

Quality heuristic for critique detail level:
- Detailed enough for a brand-new employee at your company to understand it
- OR detailed enough to use as a few-shot example in an LLM judge prompt

Common mistake: Being too terse

### Reference Dataset Structure (Why your AI product needs a different development lifecycle)
A template for building the initial reference dataset (20-100 examples) to break the cold start and provide a baseline for AI system evaluation.

How it works: For each example in the reference dataset, capture:
- User input: The query, prompt, or trigger from the user
- Expected output: The correct or ideal system response/action
- Decision metadata: Context used to make the decision (e.g., product type, user tier, channel, intent category)
- Source: Whether the example came from past logs or was manually generated

Customer Support v1 Example:
| User Query | Expected Department | Product Type | User Tier | Channel |
| 'I want my money back for order #1234' | Refunds | Electronics | Premium | Chat |
| 'My invoice shows the wrong amount' | Billing | SaaS | Standard | Email |
| 'I can't log into my account' | Technical Support | SaaS | Premium | Chat |

Guidelines:
- Aim for 20-100 examples to start
- Pull from past logs if available; otherwise generate based on expected product behavior
- Cover key use cases broadly rather than optimizing for edge cases
- This dataset serves dual purpose: evaluating system performance AND identifying what context the system needs

## Checklists

### AI Application Setup Checklist (Why your AI product needs a different development lifecycle)
Key requirements to have in place before deploying an AI product version.

How it works: Before deploying any version:
1. ☐ Capability is scoped to a specific agency level (not trying to do everything)
2. ☐ Reference dataset of 20-100 examples is curated
3. ☐ Logging is set up to capture: user inputs, system outputs, and user interactions
4. ☐ Control handoffs are designed — humans can seamlessly take back control when needed
5. ☐ Corrections from control handoffs are logged (feeds back into improvement)
6. ☐ Guardrails and compliance basics are in place
7. ☐ Evaluation metrics are defined and tied to the scoped capability
8. ☐ Evals have been run against the reference dataset
9. ☐ Deployment target is a small cohort (not full userbase)
10. ☐ Architecture is minimal — only what's needed for the current version (no premature optimization)

### Common Eval Mistakes to Avoid (Beyond vibe checks: A PM’s complete guide to evals)
Three common pitfalls teams encounter when adopting evals, with specific remedies.

How it works: 1. Making evals too complex too quickly — Creates 'noisy' signals and causes the team to lose trust in the approach. Fix: Focus on specific outputs rather than complex evaluations. Add sophistication later.

2. Not testing for edge cases — Fix: Provide one or two specific examples of 'good' and 'bad' evals as part of your prompt (few-shot prompting) for increased eval performance. This grounds the judge-LLM.

3. Forgetting to validate eval results against real user feedback — Remember you're not just testing code, you're validating if your AI can truly solve user problems. Fix: Always compare eval outputs to human-labeled ground truth.

### Eval Quickstart Steps (Beyond vibe checks: A PM’s complete guide to evals)
A four-step guide to get started with evals immediately on your AI product.

How it works: 1. Pick one critical feature of your AI product to evaluate. A common starting point is 'hallucination detection' for a chatbot or agent that relies on documents/context to answer questions. Tackle a well-defined component before evaluating deeply internal logic.

2. Write a simple eval checking whether the LLM output correctly references provided content or if it invents (hallucinates) information.

3. Run your eval on 5 to 10 representative examples from real interactions you have collected or created.

4. Review the results and iterate, refining the eval prompt until accuracy improves.

### Golden Dataset Construction Checklist (Building eval systems that improve your AI product)
Criteria for building the curated dataset used in CI pipelines to prevent AI quality regressions.

How it works: A golden dataset is NOT a random sample of production data. It is a purpose-built stress test that should include:

1. Examples covering your core features
2. Challenging edge cases discovered during error analysis
3. Regression tests for every significant bug you have fixed (most important)

Usage in CI:
- On every code or prompt change, run system against golden dataset
- Check outputs with fast, deterministic, code-based evaluators
- If any check fails, build breaks and regressive change is blocked
- A passing CI build signals stability (no reintroduced known failures), NOT overall production quality
- Continuously expand golden dataset as new failures are discovered in production

### Guardrail Design Criteria (Building eval systems that improve your AI product)
Decision criteria for implementing synchronous guardrails in production AI systems.

How it works: Guardrails are synchronous evaluators that run in the request path and can block, redact, or regenerate responses before users see them.

Design criteria:
1. Use for critical, high-impact failures only
2. Most should be fast, deterministic checks (regexes, keyword blocklists, schema validators)
3. Must add minimal latency
4. Must have very low false-positive rate (blocking a valid response = production bug)
5. LLM-as-a-judge CAN be used as guardrail but only if latency budget allows

Decision framework for guardrail type:
- High-stakes domain (e.g., medical advice): Cost of false negative (letting harmful advice through) may justify slower, more powerful LLM judge inline
- Creative applications: Cost of false positive (blocking valid response) might be too high for aggressive guardrails

### Manual Error Review Process (Why your AI product needs a different development lifecycle)
Step-by-step process for manually reviewing AI system failures to identify actionable error patterns.

How it works: Steps:
1. Start where eval metrics are weakest — that's where the most valuable signal is
2. Pull 20-50 low-accuracy examples per segment (e.g., per department, per task type)
3. Focus more on segments where scores are lagging
4. For each example, examine: (a) What the user said, (b) What the system did, (c) What the outcome was
5. Depending on your application, review single interactions or multi-turn sessions
6. Use eval metrics to identify the specific point of failure in each case
7. After reviewing enough examples, document recurring error patterns in a table (pattern, description, frequency, impact, suggested fix)
8. Use patterns to scope the next set of fixes (prompt tweaks, model changes, retrieval improvements, new components)
9. After applying fixes, re-run evals to verify improvement
10. If evals themselves missed issues or scored flawed outputs highly, redesign evals too

### Standard Eval Criteria Checklist (Beyond vibe checks: A PM’s complete guide to evals)
A checklist of common evaluation criteria to consider for AI products, with specific use cases for each.

How it works: Core eval criteria to consider:

1. Hallucination — Is the agent accurately using provided context, or making things up?
   - Use when: Agent performs reasoning on top of provided documents (e.g., PDFs)

2. Toxicity/Tone — Is the agent outputting harmful or undesirable language?
   - Use when: End-user applications; detecting if users are exploiting the system or LLM is responding inappropriately

3. Overall Correctness — How well is the system performing at its primary goal?
   - Use when: Measuring end-to-end effectiveness (e.g., question-answering accuracy)

4. Code Generation — Is the generated code valid and functional?
   - Use when: AI produces code output

5. Summarization Quality — Does the summary accurately capture key information?
   - Use when: AI summarizes documents or conversations

6. Retrieval Relevance — Are retrieved documents/passages relevant to the query?
   - Use when: RAG systems need to validate retrieval quality

### Three Layers of AI Safety Evaluation (Boris Cherny)
Anthropic's approach to ensuring AI models are safe before and after release.

How it works: 1) Alignment and Mechanistic Interpretability (monitoring neurons for concepts like deception). 2) Evals (testing the model in a controlled, laboratory 'Petri dish' setting). 3) In the wild (releasing early as a research preview to study real-world behavior).

### What Doesn't Work in Prompt Injection Defense (Sander Schulhoff)
A list of commonly attempted but ineffective defenses against prompt injection attacks

How it works: Defenses that DON'T work: 1. Prompt-based defenses - telling the model 'do not follow malicious instructions, be a good model' in system prompt (tested in HackAPrompt 1.0, May 2023 - failed then, fails now). 2. Separators between system prompt and user input. 3. Randomized tokens around user input. 4. AI guardrail models that classify input as malicious or not (exploitable via intelligence gap - guardrail can't understand Base64 but main model can). 5. Blocking inputs containing common prompt injection keywords (described as 'insane'). Defenses that PARTIALLY work: 1. Safety-tuning - training on dataset of malicious prompts to respond with canned refusals (good for specific harms like competitor mentions). 2. Fine-tuning for narrow tasks - model becomes less susceptible because it only knows how to do one specific thing. Key insight: Must be solved at AI provider/architecture level, not by external products.

## Examples

### Apartment Leasing Assistant Error Analysis (Building eval systems that improve your AI product)
Real-world example of conducting error analysis on an apartment leasing AI assistant, showing the full process from open coding through category frequency counting.

How it works: Product: AI apartment leasing assistant

Failure discovered during open coding: AI hallucinated a virtual tour when that isn't something offered.

Categories that emerged from axial coding:
1. Conversation flow issues (missing context, awkward responses)
2. Handoff failures (not recognizing when to transfer to humans)
3. Rescheduling problems (struggling with date handling)

Frequency analysis (via pivot table in spreadsheet):
- Conversation flow: most frequent
- Handoff (to a human): second most frequent
- Rescheduling appointments: third most frequent

This data provided concrete, product-specific problems to focus on when building evals. Source: Hamel's real-life field guide scenario.

### Deep Research Eval Breakdown (Chip Huyen)
An example of how to evaluate a complex, multi-step AI workflow rather than just evaluating the final output.

How it works: Instead of one end-to-end metric, evaluate each step: 1) Search Queries (Are they diverse or repetitive?), 2) Search Results (Do they have breadth, depth, and relevance to the prompt?), 3) Final Summary (Does it accurately aggregate the retrieved data?).

### Entrapment Classification for Suicidal Intent (Sander Schulhoff)
Case study showing that including a professor's email as context dramatically improved GPT-4's ability to classify Reddit posts for suicidal entrapment, and anonymizing names crashed performance

How it works: Task: Classify Reddit posts for entrapment (feeling trapped in life) as indicator of suicidal intent. Challenge: GPT-4 didn't know what entrapment meant in this context. Solution: Pasted professor's original email describing the problem plus research into the prompt. Unexpected finding: Removing the email or anonymizing names in it caused performance to drop off a cliff - likely because professor names carried contextual weight in training data. Key lesson: Additional information/context can have massive and unpredictable positive effects on performance.

### Eval Template for Toxicity and Tone (An AI glossary)
An example eval prompt that measures the toxicity and tone of a model's response, with a {text} variable for model output

How it works: An eval to measure toxicity and tone of a model's response. The model output is inserted into a {text} variable, and the eval runs the model through predefined inputs comparing responses against expected outputs. This is described as analogous to unit tests or benchmarks for AI products. Full visual example shown in newsletter image.

### GPQA Paper (Garrett Lord)
A public paper demonstrating how to break an AI model, provide ground truth, and correct step-by-step reasoning.

How it works: Used to understand how experts evaluate models: break the model, provide the right answer, and fix the specific reasoning steps (e.g., steps 6-10) where the model failed.

### GitHub Copilot 35% Acceptance Rate Benchmark (Counterintuitive advice for building AI products)
A concrete benchmark for AI suggestion acceptance rates, with guidance on how to evaluate what's 'good enough' for your use case

How it works: Metric: GitHub Copilot has a 35% acceptance rate — developers commit 35% of Copilot suggestions into their code editor.
Context: Traditional software is deterministic (works or doesn't). LLM-based services are probabilistic (sometimes helpful, sometimes not).
Key insight: 'Good enough' acceptance rate differs based on use case and customer cohort.
How to determine your target: Ask customers 'Is this making your job easier?' rather than just measuring acceptance rate in isolation.

### Model Swap Benchmarking with Evals (Beyond vibe checks: A PM’s complete guide to evals)
Example of using evals as A/B test benchmarks when switching between AI models.

How it works: When making a change to an agent (e.g., changing the model from GPT-4o to Claude 3.7 Sonnet):
1. Take the dataset of questions you collected
2. Run them through your updated agent (Claude 3.7 Sonnet)
3. Evaluate the new output with your eval agent
4. Compare scores against initial agent (GPT-4o) eval scores
5. Goal: Improve on initial eval scores, giving you a benchmark for continual improvement

This makes evals 'the final boss when A/B testing prompts for your AI system.'

### Moon Poem Quality Criteria (Edwin Chen)
An example illustrating the difference between superficial data labeling and high-quality human evaluation.

How it works: Superficial criteria: Is it a poem? Does it have 8 lines? Does it contain the word 'moon'? Deep criteria: Is it unique? Does it have subtle imagery? Does it surprise you? Does it teach you about moonlight? Does it evoke emotion?

### Prompt Caching for Cost and Latency (Sander Schulhoff)
Technique of placing additional information at the beginning of prompts so subsequent API calls can use cached context, reducing computation costs

How it works: Place additional information/context at the BEGINNING of the prompt for two reasons: 1. Caching - model provider stores initial context and its embeddings, making subsequent calls with same context cheaper and faster. 2. Task preservation - if context is at the end and very long, the model may forget its original task and pick up a question from the context instead.

### Prompting Techniques Impact on Accuracy (How close is AI to replacing product managers?)
Research-backed statistics on how prompt engineering improves AI performance

How it works: - Basic prompting techniques can drive ~30% improvement in accuracy on some tasks (from the paper 'Language Models are Few-Shot Learners')
- Adding multiple examples of the task being done correctly can yield 50-60% overall accuracy boost
- Chain-of-thought prompting (giving the model time to think step-by-step) largely solves the early weakness of LLMs being bad at math
- Google used a similar expert-prompting approach to test Gemini 1.5's capabilities
- When papers claim 'ChatGPT can't do X,' it's usually because they used basic prompts and older models (e.g., GPT-3 instead of GPT-4)

### Sycophancy Measurement (Nick Turley)
A metric introduced to ensure the AI doesn't just tell users what they want to hear.

How it works: After an update made the model too agreeable (e.g., 'You should break up with your boyfriend'), OpenAI created a specific metric to measure and reduce 'sycophancy' in future releases to ensure the AI actually helps users achieve their goals.

### Trip-Planning Agent Eval Mapping (Beyond vibe checks: A PM’s complete guide to evals)
A concrete example of how different eval approaches map to different steps in a multi-step AI agent system.

How it works: For a trip-planning AI agent (user types 'I want a relaxing weekend getaway near San Francisco for under $1,000'), multiple things can go wrong at each step:

- User intent parsing → Could misinterpret 'San Francisco' as 'San Diego'
- Flight API calls → Could return wrong results or fail
- Hotel database queries → Could surface irrelevant options
- Response generation → Could hallucinate details, use wrong tone, or provide inaccurate pricing

You choose the right eval approach for each step:
- Code-based evals: For API call validation, structured data checks
- LLM-based evals: For tone, relevance, hallucination detection
- Human evals: For overall user satisfaction and edge case discovery

The example demonstrates balanced dataset categories: help booking a hotel, help booking a flight, asking for support, asking for trip planning advice.

## Tools

### Evals (Kevin Weil)
Unit tests for AI models to benchmark performance on specific use cases.

How it works: Define a hero use case, write a question you want to ask, define an amazing answer, turn it into an eval, and hill-climb the model's performance against that benchmark during development.

### Recommended Learning Resources for Evals (Beyond vibe checks: A PM’s complete guide to evals)
Curated list of courses, videos, and guides for deepening eval skills.

How it works: Courses:
- DeepLearning.ai course: 'Evaluating AI Agents' (with Andrew Ng and Aman Khan)
- Maven course: 'AI Product Management' by Aman Khan (launching Spring 2025)
- Free lightning lesson: 'Mastering Evals as an AI Product Manager' (April 18th, 30 min)

Guides:
- Arize eval hub (free): arize.com/llm-evaluation
- Prompt optimization guide: arize.com/course/prompt-optimization/
- Hamel Husain's field guide on measuring alignment between automated evals and human judgment

Videos:
- OpenAI CPO Kevin Weil + Anthropic CPO Mike Krieger + Sarah Guo conversation
- Peter Yang + Aman Khan: 'The AI Skill That Will Define Your PM Career in 2025'
- Peter Yang + Scott White (Anthropic): 'Inside the Best AI Model for Coding and Writing'

