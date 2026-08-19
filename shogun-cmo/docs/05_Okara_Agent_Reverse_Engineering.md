# Okara.ai Agent Reverse Engineering

This document provides a detailed, agent-by-agent reverse engineering of Okara's platform based on observed behavior, strong inferences, and identified unknowns.

---

## 1. Agent Analysis Tables

### Growth / Research Agent (The Initializer)
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Growth / Research Agent |
| **Purpose** | Crawl user website and generate foundational strategy context. |
| **Trigger** | User signs up and inputs their website URL. |
| **Inputs** | Target Website URL. |
| **Context required** | None (this creates the context). |
| **Tools/integrations used** | Web scraper / crawler. |
| **Research performed** | Crawls up to 24 pages of the domain to extract product info, messaging, and competitors. |
| **Decision logic visible** | Synthesizes raw HTML into structured markdown strategy frameworks. |
| **Output** | 5 Markdown files: `product-information.md`, `marketing-strategy.md`, `competitor-analysis.md`, `brand-voice.md`, `content-strategy.md`. |
| **Drafts or executes** | Executes (Saves files to the internal context store). |
| **Human approval requirement** | No. |
| **Where result appears** | Internal knowledge base / Dashboard setup screen. |
| **Dependencies** | None. |
| **Runs once or continuously** | Runs once at onboarding (may be re-triggered manually). |
| **Evidence/source URL** | https://okara.ai/ (Step 1 — Research) |

### SEO Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | SEO Agent |
| **Purpose** | Audit technical SEO, track rankings, and identify keyword gaps. |
| **Trigger** | Daily recurring cron job. |
| **Inputs** | Domain URL, Google Search Console data, Google Analytics 4 data. |
| **Context required** | `content-strategy.md`, `competitor-analysis.md`. |
| **Tools/integrations used** | GSC API, GA4 API. |
| **Research performed** | Analyzes backlink profiles, SERP rankings, on-page factors, and traffic metrics. |
| **Decision logic visible** | Prioritizes issues based on real GA4 traffic data; filters down to the top 2 highest-impact fixes per day. |
| **Output** | Daily audit score, competitor share-of-voice tracking, 2 high-impact copy-paste code snippets/fixes. |
| **Drafts or executes** | Executes (Generates audit) / Drafts (Provides snippets for fixes). |
| **Human approval requirement** | Yes, to implement the snippets manually (unless Coding agent is used). |
| **Where result appears** | Dashboard cards / Daily WhatsApp/Telegram digest. |
| **Dependencies** | Growth Agent (for baseline strategy). |
| **Runs once or continuously** | Continuously (Daily). |
| **Evidence/source URL** | https://okara.ai/agent/seo |

### Writer Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Writer Agent |
| **Purpose** | Draft and publish long-form SEO blog articles. |
| **Trigger** | Daily recurring cron job or manual request. |
| **Inputs** | Keyword targets, SEO Agent gap analysis. |
| **Context required** | All 5 strategy docs (especially `brand-voice.md` and `content-strategy.md`). |
| **Tools/integrations used** | WordPress, Webflow, Framer, Sanity APIs. |
| **Research performed** | Uses SEO keyword targets to research topic depth. |
| **Decision logic visible** | Selects topics based on `content-strategy.md`; applies brand voice rules to generation. |
| **Output** | Formatted markdown articles with metadata, categories, and tags. |
| **Drafts or executes** | Drafts (by default) / Executes (can auto-publish to CMS). |
| **Human approval requirement** | Optional (Can publish directly or wait in pending queue). |
| **Where result appears** | Dashboard pending queue / WhatsApp notification / CMS draft or live post. |
| **Dependencies** | SEO Agent (for topic selection), Growth Agent (for brand voice). |
| **Runs once or continuously** | Continuously (Daily). |
| **Evidence/source URL** | https://okara.ai/agent/writer |

### Coding Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Coding Agent |
| **Purpose** | Implement technical SEO and GEO fixes directly into the codebase. |
| **Trigger** | SEO Agent or GEO Agent generating a fix recommendation. |
| **Inputs** | Fix snippets (e.g., JSON-LD schema, meta tags, `llms.txt`). |
| **Context required** | GitHub repository structure. |
| **Tools/integrations used** | GitHub API. |
| **Research performed** | Reads target files in the repository to determine where to inject code. |
| **Decision logic visible** | Maps the SEO recommendation to the specific HTML/React/Next.js file and formats the commit. |
| **Output** | Git branch, commit, and Pull Request with inline explanations. |
| **Drafts or executes** | Executes (Creates PR). |
| **Human approval requirement** | Yes (User must merge the PR in GitHub). |
| **Where result appears** | GitHub (as a Pull Request). |
| **Dependencies** | SEO Agent, GEO Agent. |
| **Runs once or continuously** | Continuously (Triggered by audit findings). |
| **Evidence/source URL** | https://okara.ai/agent/coding |

### GEO Agent (Generative Engine Optimization)
| Attribute | Details |
| :--- | :--- |
| **Agent name** | GEO Agent |
| **Purpose** | Track and improve brand visibility inside AI answer engines. |
| **Trigger** | Daily recurring cron job. |
| **Inputs** | Brand name, target keywords. |
| **Context required** | `product-information.md`, `competitor-analysis.md`. |
| **Tools/integrations used** | Scrapers for ChatGPT, Perplexity, Claude, Gemini. |
| **Research performed** | Queries AI engines for the brand and competitors to assess citation frequency and sentiment. |
| **Decision logic visible** | Calculates an "AI Visibility Score" and identifies missing schemas or `llms.txt` gaps. |
| **Output** | GEO score, sentiment analysis, schema/content fix recommendations, `llms.txt` generation. |
| **Drafts or executes** | Executes (Generates audit) / Drafts (Provides fix snippets). |
| **Human approval requirement** | Yes (To implement fixes, unless Coding agent handles it). |
| **Where result appears** | Dashboard / Daily Digest. |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Continuously (Daily). |
| **Evidence/source URL** | https://okara.ai/agent/geo |

### Reddit Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Reddit Agent |
| **Purpose** | Discover high-intent discussions and draft context-aware replies. |
| **Trigger** | Continuous monitoring / Polling. |
| **Inputs** | Target subreddits, competitor names, keywords. |
| **Context required** | `product-information.md`, Subreddit rules. |
| **Tools/integrations used** | Reddit API / Web scraper. |
| **Research performed** | Scans subreddits; reads thread context and subreddit rules to ensure compliance. |
| **Decision logic visible** | Filters out low-intent threads; matches thread context to product value prop; enforces anti-spam tone. |
| **Output** | Curated list of high-intent threads + pre-written draft replies. |
| **Drafts or executes** | Drafts only (Ban-safe design). |
| **Human approval requirement** | Yes (User must manually copy/paste and post from their own account). |
| **Where result appears** | Dashboard (Opportunities list). |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Continuously. |
| **Evidence/source URL** | https://okara.ai/agent/reddit |

### Hacker News Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Hacker News Agent |
| **Purpose** | Identify relevant HN discussions and draft comments/posts. |
| **Trigger** | Continuous monitoring / Trending alerts. |
| **Inputs** | HN frontpage feed, Ask HN feed. |
| **Context required** | `product-information.md`. |
| **Tools/integrations used** | Hacker News API / Scraper. |
| **Research performed** | Monitors for brand mentions, competitor mentions, or relevant tech discussions. |
| **Decision logic visible** | Identifies optimal timing for "Show HN"; matches thread context to product. |
| **Output** | Drafted comments or Show HN post drafts. |
| **Drafts or executes** | Drafts only. |
| **Human approval requirement** | Yes (Manual posting required). |
| **Where result appears** | Dashboard. |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Continuously. |
| **Evidence/source URL** | https://okara.ai/agent/hackernews |

### X (Twitter) Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | X (Twitter) Agent |
| **Purpose** | Generate tweets, threads, and viral hooks. |
| **Trigger** | Daily scheduled cron. |
| **Inputs** | "Viral Launch X Handbook" playbooks, current trends. |
| **Context required** | `brand-voice.md`, `marketing-strategy.md`. |
| **Tools/integrations used** | X (Twitter) API. |
| **Research performed** | None explicitly observed beyond consuming the strategy docs. |
| **Decision logic visible** | Applies viral hook templates to the brand's specific value proposition. |
| **Output** | Tweet and thread drafts. |
| **Drafts or executes** | Drafts (default) / Executes (Auto-posting available). |
| **Human approval requirement** | Optional (Can auto-post or wait in chat/dashboard for approval). |
| **Where result appears** | Dashboard / WhatsApp / Twitter (if auto-published). |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Continuously (Daily). |
| **Evidence/source URL** | https://okara.ai/agent/twitter |

### UGC Videos Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | UGC Videos Agent |
| **Purpose** | Generate short-form vertical video clips for social media/ads. |
| **Trigger** | Manual user request. |
| **Inputs** | Short guided text brief, optional image assets. |
| **Context required** | `product-information.md`, `brand-voice.md`. |
| **Tools/integrations used** | AI Video generation API (Unknown specific provider), TikTok/Instagram (Soon). |
| **Research performed** | None. |
| **Decision logic visible** | Translates text brief into scene descriptions and renders video. |
| **Output** | Rendered MP4 clips formatted for Reels/Shorts/TikTok. |
| **Drafts or executes** | Executes (Renders video). |
| **Human approval requirement** | Yes (User downloads or approves for posting). |
| **Where result appears** | Dashboard (Media library). |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Runs once per request. |
| **Evidence/source URL** | https://okara.ai/agent/ugc-video |

### Influencer Agent
| Attribute | Details |
| :--- | :--- |
| **Agent name** | Influencer Agent |
| **Purpose** | Automate creator discovery, outreach, and payouts. |
| **Trigger** | Manual campaign launch. |
| **Inputs** | Campaign brief, budget, target audience. |
| **Context required** | `marketing-strategy.md`, `product-information.md`. |
| **Tools/integrations used** | Creator databases, Email API, Payment gateway (Stripe/PayPal). |
| **Research performed** | Searches creator databases for matches based on audience and engagement. |
| **Decision logic visible** | Filters creators by metrics; orchestrates email follow-ups; triggers payout upon deliverable confirmation. |
| **Output** | Creator lists, sent emails, payment receipts. |
| **Drafts or executes** | Executes (Sends emails, processes payments). |
| **Human approval requirement** | Yes (Likely approves creator list and final video deliverable before payout). |
| **Where result appears** | Dashboard (Campaign manager). |
| **Dependencies** | Growth Agent. |
| **Runs once or continuously** | Runs continuously during active campaign. |
| **Evidence/source URL** | https://okara.ai/agent/influencer |

---

## 2. Reconstructed Workflows

### Research → Strategy → Content
* **Observed Behavior:** User enters URL. System crawls site. 5 markdown files are generated. Writer Agent uses these files to draft a blog post. Post is sent to WhatsApp for approval. User approves. Post is published to Webflow.
* **Strong Inference:** The 5 markdown files act as a system prompt prefix or RAG context for the Writer Agent's LLM call. The transition from draft to publish is a simple state change triggered by a webhook from WhatsApp.
* **Unknown Implementation:** The exact chunking/retrieval strategy for the 5 markdown files if they exceed token limits, though they are likely small enough to pass entirely in the context window.

### SEO → Writer → Coding (The SEO Flywheel)
* **Observed Behavior:** SEO Agent identifies a keyword gap (e.g., "AI marketing for real estate"). Writer Agent drafts an article for it. SEO Agent also identifies missing JSON-LD schema on the homepage. Coding Agent creates a GitHub PR to add the schema.
* **Strong Inference:** The SEO Agent acts as an orchestrator or task generator. It populates a queue of "opportunities" (content gaps vs. technical gaps). The Writer Agent consumes content gap tasks; the Coding Agent consumes technical gap tasks.
* **Unknown Implementation:** How the Coding Agent accurately locates the correct file within an arbitrary, user-provided GitHub repository to inject the schema without breaking the build.

### Research → Opportunity → Draft → Approval (Social/Community)
* **Observed Behavior:** Reddit Agent scans subreddits. Finds a relevant thread. Drafts a reply. Shows it in the dashboard. User copies it and posts it manually.
* **Strong Inference:** The agent uses an RSS feed or Reddit API search for specific keywords defined in `content-strategy.md`. It passes the thread text + `brand-voice.md` to an LLM to generate the reply.
* **Unknown Implementation:** The exact filtering logic to determine "high intent" vs. "low intent" threads to avoid surfacing garbage to the user.

### Competitor Signal → Content Opportunity → Execution
* **Observed Behavior:** GEO agent tracks AI visibility against competitors. Identifies a competitor is cited more often for a specific query. Recommends a fix (e.g., updating an FAQ).
* **Strong Inference:** GEO Agent uses automated browser testing (e.g., Puppeteer/Playwright) to run queries on Perplexity/ChatGPT and parses the citations. It compares the results against `competitor-analysis.md`.
* **Unknown Implementation:** How reliably it bypasses bot protections on ChatGPT/Perplexity to gather this data at scale.

---

## 3. Minimum Core Engine Required

**What is the minimum core engine required to reproduce Okara's core experience?**

To reproduce the core Okara experience, you do not need 10 disparate AI models. You need a centralized orchestration engine with the following 4 components:

1. **The Static Context Store (The Brain):**
   - A mechanism to store and retrieve foundational business logic (Product info, brand voice, competitors, strategy). In Okara, this is achieved by crawling a URL and generating 5 markdown files. This is the absolute minimum requirement to prevent generic AI outputs.

2. **The Cron Orchestrator (The Heartbeat):**
   - A daily task scheduler (e.g., a background worker on a 24-hour loop). The core experience relies on the tool "running 24/7" without user prompting. The orchestrator must wake up, check connected data sources (SERPs, Reddit), and generate tasks.

3. **The LLM Task Executor (The Hands):**
   - A single, powerful LLM (like GPT-4o or Claude 3.5 Sonnet) wrapped in specialized system prompts. The "Reddit Agent", "Writer Agent", and "X Agent" are likely just different prompt templates applied to the same underlying LLM, fed with the Static Context Store data and the specific task data from the Cron Orchestrator.

4. **The Frictionless Approval Loop (The UX):**
   - A webhook receiver connected to a messaging API (WhatsApp/Telegram/Slack) or a very simple web dashboard with an "Approve / Publish" button. The core value prop is eliminating the need to write; the user only needs to review.

**In summary:** A web crawler that writes 5 text files -> A daily cron job that fetches external data (Reddit/Keywords) -> An LLM that drafts content based on the text files + external data -> A webhook that waits for user approval to publish.
