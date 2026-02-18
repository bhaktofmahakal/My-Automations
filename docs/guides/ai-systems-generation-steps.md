# AI Systems Generation Steps

Recreated guide based on the original PDF (now removed) summarizing the practical steps to spin up production-ready AI systems quickly.

## 1) Frame the use case
- Define user, task, success metric, and latency/cost constraints.
- List inputs (APIs, DBs, files) and required outputs (schema, format).

## 2) Choose the architecture
- Retrieval-augmented generation (RAG) when using proprietary data.
- Tool-calling/agents when orchestration across APIs is needed.
- Simple prompting when the task is deterministic and low-risk.

## 3) Data + evaluation
- Prepare representative eval set (happy paths, edge cases, adversarial).
- Define automatic checks (string contains, JSON schema, function call presence).
- Set acceptance thresholds before shipping.

## 4) Prompt and tools
- Start with a concise system prompt; keep task + formatting explicit.
- Add function/tool schemas with strict argument types.
- Handle retries with temperature/backoff; cap token usage.

## 5) Guardrails
- Schema validation on model output; reject/repair invalid JSON.
- Timeouts on external calls; circuit-break noisy providers.
- Redact PII before logging; store traces securely.

## 6) Deployment
- Separate staging vs production keys and endpoints.
- Observability: log prompts, outputs, latency, tool calls, failures.
- Rollout with feature flags; start with small traffic.

## 7) Iteration loop
- Collect user feedback + traces → add to eval set.
- Tune prompts/tools; retrain rerankers if used.
- Re-run evals on every change; promote only on green.

## 8) Team checklist
- Security reviewed (secrets, PII, access).
- Runbooks in place for on-call (what to restart, what to roll back).
- Budget caps set on LLM/provider usage.

## Contacts
Maintainer: utsav mishra (utsavmishraa005@gmail.com)
