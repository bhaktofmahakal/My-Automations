# TASK: Complete Gesture AI Full Stack Engineer Intern take-home assignment — TARGET: BEST SUBMISSION AMONG ALL CANDIDATES

## Competitive context (read first)
The upstream repo already has **11+ forks** — meaning 11+ other candidates are working this same assignment, possibly across multiple cohorts. The bar is not "pass the tests." The bar is "be the fork the reviewer remembers." Evaluation weights: tests 40%, code clarity 25%, correct retrieval/generation 25%, bonus 10%. Most candidates will satisfy the 40% and stop there. Winning means also nailing the 25%+25%+10% that separates a working submission from a standout one.

**Definition of done for this task — self-check against ALL of these before declaring finished:**
- [ ] All provided tests in `tests/test_pipeline.py` pass, unmodified.
- [ ] The undocumented noise files in `data/` (see Step 1.3) are detected and handled — most candidates will miss this entirely.
- [ ] A NEW automated test file proves the noise-filtering works (not just a manual demo) — turns a one-off observation into demonstrable engineering rigor.
- [ ] All 4 explicitly-listed bonus items are done: error handling, `--query` CLI flag, additional test cases, type hints. Not 2 of 4 — all 4.
- [ ] Out-of-domain queries get a deterministic, reliable refusal — not a hope-the-small-LLM-behaves refusal.
- [ ] Code is genuinely clean: type hints, docstrings, no dead code, a diff a senior engineer would approve without comment.
- [ ] README/NOTES documents the noise-file decision in 4-6 sentences — this is the single highest-signal artifact in the whole submission.
- [ ] Git history is 3-4 clean, well-labeled commits, not one dump.
- [ ] Submitted same day, not stretched to the 48hr limit — speed is itself a signal on a competitive take-home.

---

## STEP 0 — Setup
1. Fork `Gesture-Tech/gesture-fs-intern-takehome` to my GitHub account.
2. Clone my fork locally.
3. Create venv, install deps:
   ```
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
4. Do NOT run `pytest` yet — first do Step 1.

---

## STEP 1 — Read and understand every file before writing anything

Read these in order and summarize back to me what each does before touching code:

1. **`README.md`** — objective, stack, evaluation weights, the two TODOs, documented project structure.

2. **`src/knowledge_base.py`** (DO NOT MODIFY — explicitly forbidden):
   - `get_embeddings()` → `HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")`, local, no API key.
   - `load_and_chunk(data_dir, chunk_size=500, chunk_overlap=50)` → `DirectoryLoader(data_dir, glob="**/*.txt", loader_cls=TextLoader)` loads ALL `.txt` files recursively, then `RecursiveCharacterTextSplitter` chunks them.
   - `build_knowledge_base(data_dir)` → builds and returns a FAISS vector store, supports `.similarity_search(query, k=3)`.
   - **Critical detail:** the glob `**/*.txt` loads every .txt file in `data_dir` with zero filtering.

3. **`data/` directory** — `ls data/`. There will be 5 files, but the README's documented project structure only lists 3 (`services.txt`, `pricing.txt`, `faq.txt`). Read all 5 in full:
   - `services.txt`, `pricing.txt`, `faq.txt` — the real marketing-agency knowledge base.
   - `company_handbook.txt`, `product_faq.txt` — NOT marketing agency content. Describe an unrelated fictional company ("Acme Corp": HR policy, a cloud storage product called AcmeCloud). Undocumented in the README's file tree — strong signal this is an intentional distractor, not an oversight.
   - Implication: because the loader glob can't be changed, these get embedded into the same FAISS index as real content. Ambiguous/borderline queries can retrieve chunks from the wrong company. This directly threatens the 25%-weighted "correct retrieval + generation" criterion if left unhandled. **This is the single biggest differentiator available in this assignment — treat it as the main event, not a footnote.**

4. **`src/pipeline.py`** — the file to edit:
   - `get_llm()` — provided, wraps `google/flan-t5-base` (seq2seq, local, CPU). `result = llm(prompt); result[0]["generated_text"]`.
   - `PROMPT_TEMPLATE` — provided, `{context}`/`{question}` placeholders, instructs the model to say "I don't have enough information to answer that." if the answer isn't in context.
   - `ask_question(vector_store, llm, question: str) -> dict` — TODO 1.
   - `main()` — TODO 2. `data_dir` already computed for you.

5. **`tests/test_pipeline.py`** — read every assertion so the implementation is built to satisfy it, not debugged against it afterward:
   - `TestAskQuestionStructure` — dict with non-empty string `"answer"`, non-empty list `"sources"`.
   - `test_retrieves_pricing_info` — Growth package question → sources contain "growth" or "$5,500".
   - `test_retrieves_seo_info` — SEO question → sources contain "seo" or "keyword".
   - `test_different_questions_get_different_sources` — two different questions → different `sources` lists.
   - `test_answer_is_not_just_the_prompt` — `"answer"` must not contain `"Context:"`. Automatic if `answer` comes from `result[0]["generated_text"]`, not the prompt string (flan-t5 is seq2seq, only emits the completion).
   - `test_answer_responds_to_question` — Starter package price question → answer contains "2,500", "2500", or "starter".

---

## STEP 2 — Implement TODO 1: `ask_question()`

```python
ALLOWED_FILES = {"services.txt", "pricing.txt", "faq.txt"}
NO_INFO_MSG = "I don't have enough information to answer that."

def ask_question(vector_store, llm, question: str) -> dict:
    if not question or not question.strip():
        return {"answer": "Please enter a question.", "sources": []}

    # Retrieve a wider pool than needed, because data/ contains two
    # undocumented files (company_handbook.txt, product_faq.txt) describing
    # an unrelated company. knowledge_base.py's loader can't be modified,
    # so both get embedded in the same index. Filter by source file here.
    candidates = vector_store.similarity_search(question, k=5)
    filtered = [
        doc for doc in candidates
        if os.path.basename(doc.metadata.get("source", "")) in ALLOWED_FILES
    ][:3]

    if not filtered:
        # Every top match was out-of-domain noise. Don't trust a small local
        # LLM to reliably self-censor on empty/irrelevant context — return
        # the refusal deterministically instead of rolling the dice on it.
        return {"answer": NO_INFO_MSG, "sources": []}

    context = "\n\n".join(doc.page_content for doc in filtered)
    prompt = PROMPT_TEMPLATE.format(context=context, question=question)
    result = llm(prompt)
    answer = result[0]["generated_text"].strip()

    return {
        "answer": answer,
        "sources": [doc.page_content for doc in filtered],
    }
```

Add `import os` at the top of `pipeline.py` if not already present (it already is, per the stub).

---

## STEP 3 — Implement TODO 2: `main()`

```python
import argparse

def main():
    data_dir = os.path.join(os.path.dirname(__file__), "..", "data")

    parser = argparse.ArgumentParser(description="Marketing agency Q&A assistant")
    parser.add_argument("--query", type=str, help="Ask a single question and exit")
    args = parser.parse_args()

    print("Building knowledge base...")
    vector_store = build_knowledge_base(data_dir)
    print("Loading LLM...")
    llm = get_llm()

    if args.query:
        result = ask_question(vector_store, llm, args.query)
        print("\n📄 Sources:")
        for i, src in enumerate(result["sources"], 1):
            preview = src[:200] + "..." if len(src) > 200 else src
            print(f"  {i}. {preview}")
        print(f"\n💬 Answer: {result['answer']}")
        return

    print("\nAsk me anything about our services, pricing, or process.")
    print("Type 'quit' to exit.\n")

    try:
        while True:
            question = input("> ").strip()
            if question.lower() in ("quit", "exit"):
                print("Goodbye!")
                break
            if not question:
                continue

            result = ask_question(vector_store, llm, question)

            print("\n📄 Sources:")
            for i, src in enumerate(result["sources"], 1):
                preview = src[:200] + "..." if len(src) > 200 else src
                print(f"  {i}. {preview}")
            print(f"\n💬 Answer: {result['answer']}\n")
    except KeyboardInterrupt:
        print("\nGoodbye!")


if __name__ == "__main__":
    main()
```

---

## STEP 4 — Add a NEW test file (bonus: "Additional test cases" + proves the differentiator)

Do NOT touch `tests/test_pipeline.py`. Create `tests/test_noise_filtering.py`:

```python
"""
Additional tests: verify out-of-domain content (undocumented distractor
files in data/) never leaks into answers about the marketing agency.
Run: pytest tests/test_noise_filtering.py -v
"""

import os
import pytest
from src.knowledge_base import build_knowledge_base
from src.pipeline import ask_question, get_llm

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")


@pytest.fixture(scope="module")
def vector_store():
    return build_knowledge_base(DATA_DIR)


@pytest.fixture(scope="module")
def llm():
    return get_llm()


class TestNoiseFiltering:
    def test_out_of_domain_question_is_refused(self, vector_store, llm):
        """A question that only matches the unrelated 'company_handbook.txt'
        (HR/PTO policy for a different fictional company) must not produce
        an answer sourced from that file."""
        result = ask_question(vector_store, llm, "What is the remote work policy?")
        sources_text = " ".join(result["sources"]).lower()
        assert "remote work" not in sources_text or "acme corp employee handbook" not in sources_text

    def test_sources_never_include_handbook_or_product_faq(self, vector_store, llm):
        """No returned source chunk should ever come from the two
        undocumented, out-of-domain distractor files."""
        for q in [
            "What is your PTO policy?",
            "How does file versioning work in AcmeCloud?",
            "How much does the Growth package cost?",
        ]:
            result = ask_question(vector_store, llm, q)
            sources_text = " ".join(result["sources"]).lower()
            assert "acmecloud" not in sources_text
            assert "paid time off" not in sources_text
```

Run this alongside the main suite: `pytest tests/ -v`.

---

## STEP 5 — Stretch, ONLY if time and test suite allow (do not risk the core 40%)

Try these in order. After each, immediately re-run `pytest tests/ -v`. If a change drops any test from green to red, revert that specific change and move on — never trade a guaranteed 40% for a maybe-10%.

1. **Chunk de-duplication**: if `similarity_search` returns near-identical chunks (common with `chunk_overlap=50`), dedupe by exact `page_content` match before taking top 3, so the LLM gets 3 distinct pieces of context instead of 2 unique + 1 repeat.
2. **Confidence-aware fallback (optional, careful)**: use `vector_store.similarity_search_with_score(question, k=5)` instead of `similarity_search`, and additionally short-circuit to `NO_INFO_MSG` if even the best in-domain match has a distance score worse than a generous threshold. Only add this if you can verify all provided tests still pass with real queries — the point is catching genuinely irrelevant questions, not second-guessing legitimate ones.

If either of these adds risk without a clean pytest pass, skip it — a working, well-documented core beats a fancy but flaky one.

---

## STEP 6 — Test and verify

1. `pytest tests/ -v` — first run downloads ~1.2GB (flan-t5-base + MiniLM), allow 10-15 min.
2. ALL tests in both `tests/test_pipeline.py` and `tests/test_noise_filtering.py` must pass.
3. Manually run the CLI and capture transcripts for:
   - "How much does the Growth package cost?"
   - "Do you offer SEO services?"
   - "What is your PTO policy?" — **the adversarial proof point**. Confirm it does NOT leak Acme Corp HR content. Capture this exact transcript for the README.
   - `python -m src.pipeline --query "Can I cancel early?"` — confirms the bonus CLI flag.

---

## STEP 7 — Document the decision

Add a short section to the README (or `NOTES.md` if you don't want to touch the graded README) — 4-6 sentences:
- `data/` contains two files not in the documented project structure, describing an unrelated company — read as intentional distractor content.
- `knowledge_base.py`'s `**/*.txt` glob (off-limits to modify) means these get indexed regardless.
- The filtering approach in `ask_question()`: source-based allowlist, applied post-retrieval, with a deterministic refusal when no in-domain chunks survive.
- The adversarial test result (PTO question correctly refused) as evidence, plus a pointer to `tests/test_noise_filtering.py` as the automated proof.
- **Explicitly note why a pure similarity-score threshold is insufficient here**: the distractor content (`company_handbook.txt`) is topically coherent, well-written HR policy text — a real semantic match for a question like "What is your PTO policy?", just from the wrong company. Distance-based confidence gating alone won't catch this, because the embedding model correctly identifies it as relevant text. Only filtering by source file catches it. One sentence is enough — it signals the trap was understood at a deeper level than a threshold-only approach would suggest.

---

## STEP 8 — Commit and finalize

Use 3-4 clean, logical commits (not one dump), e.g.:
1. `Implement ask_question(): retrieval, out-of-domain filtering, generation`
2. `Implement interactive CLI + --query flag`
3. `Add tests proving noise-file filtering works`
4. `Document distractor-file handling in README`

Push to my fork. Do NOT open a PR to upstream `Gesture-Tech` — my fork is the deliverable; a PR would expose the solution publicly to the other candidates who forked the same repo.

Give me back:
- Fork URL
- Final `pytest tests/ -v` summary line (must show all green, both files)
- The adversarial test transcript (PTO question → correct refusal)
- Confirmation on the definition-of-done checklist at the top — item by item
- Any deviations from this plan and why

---

## Constraints (do not violate)
- Never modify `src/knowledge_base.py` or `tests/test_pipeline.py`.
- No new pip dependencies beyond `requirements.txt` unless something is genuinely broken.
- Don't over-engineer beyond what's above — no new config system, no logging framework, no unrelated refactors. Target diff size: roughly 150-220 lines total across `pipeline.py` + the new test file + docs. Every line should be explainable in one sentence if asked in a follow-up interview.
