# 📝 Contour Education — AI Solutions Engineer Form Responses

Below are high-quality, professional, and tailored responses for your job application to Contour Education. You can directly copy and paste these into their application form.

---

## 🔑 Q2: Have you personally configured (not just used) a CRM, helpdesk, or automation tool?
* **Answer**: **a. Yes**

---

## ⚡ Q3: You need to get six customer inboxes to a sub-20 minute response time. You have budget for either (a) 10 additional team members, or (b) automation tooling, AI agents, and 4 additional team members. Which do you choose and why?
### *Name the specific tools you would use and describe the first three things you would configure.*

### **My Choice**
**Option (b) — Automation tooling, AI agents, and 4 additional team members.**

### **Why?**
Scaling support operations by simply adding headcount creates a linear cost structure and management bottleneck. 10 human agents working manually in silos will still struggle to maintain sub-20 minute response times during traffic spikes (such as enrollment seasons, exam releases, or billing cycles) without massive overlap.

A hybrid human-AI model (automation + 4 team members) offers infinite scaling capacity:
1. **AI handles the bulk of routine inquiries** (e.g., course start dates, payment troubleshooting, login resets) instantly in `< 1 minute`, deflecting 60-70% of inbox volume.
2. **This leaves the 4 human agents with 70% fewer tickets**, allowing them to focus entirely on high-touch, complex interactions (e.g., curriculum counseling, anxious parent calls, custom billing plans) with deep personalization, easily maintaining a sub-20 minute response time.

---

### **Specific Tools I Would Use**
* **HubSpot Service Hub & Breeze AI**: As the central CRM and Shared Inbox for all 6 channels. HubSpot's Breeze AI will be used for draft generation and standard chatbot flows.
* **Make.com / n8n**: For cross-system data synchronization and advanced multi-step logic (e.g., connecting HubSpot to Stripe, Monday.com, Aircall, and the LMS).
* **OpenAI API / Claude API (via Make/n8n)**: For advanced ticket classification, sentiment triage, and generating highly contextual Hinglish/English draft responses.

---

### **The First Three Things I Would Configure**

1. **Omnichannel Inbox Consolidation & Auto-Triage Routing Engine**:
   I would route all 6 inboxes (Sales, Billing, Academic Ops, Student Exp, Service, Program Consulting) into HubSpot’s unified inbox. I'd set up an n8n/Make workflow that runs an LLM on every incoming query to tag it with **Category** (e.g., Billing, Enrollment), **Urgency** (Critical/High/Medium/Low based on sentiment), and **Brand**. Tickets are then auto-routed to the correct queues or human agents.

2. **Automated Stripe & LMS Context Enrichment**:
   Integrate Make.com to instantly look up the incoming ticket's email address in Stripe (billing records) and Monday.com/LMS (course enrollment, academic status). This data will be written into custom HubSpot properties displayed directly in the agent's side-panel, giving the 4 human agents instant context without making them hop between systems.

3. **Knowledge-Base Powered Draft Generator (Breeze AI / Custom)**:
   Deploy an AI assistant that intercepts incoming tickets, queries our knowledge base via vector search, and automatically generates an accurate email draft. When a human agent opens a ticket, they will already see a pre-written draft based on internal documentation; they simply review, tweak, and hit send in under 30 seconds.

---

## 📖 Q4: You are building a knowledge base for a customer operations team from scratch. No documentation exists. Walk us through your approach. What do you do in the first week? What does the finished product look like? What is the hardest part?

### **My First Week Approach**
* **Day 1–2 (Data-Driven Extraction)**: Instead of starting with a blank page, I will run a script (Python or Make) to export the last 3 to 6 months of resolved customer conversation threads. I'll use an LLM to cluster these threads and auto-extract the top 30 most repetitive questions, billing issues, and enrollment bottlenecks.
* **Day 3 (Shadowing & Tacit Knowledge Capture)**: I will shadow the existing operations team for 2 hours, interviewing agents to extract the "unwritten rules" (e.g., *"How do we actually handle a refund request that comes in 1 day after the deadline?"*).
* **Day 4–5 (Drafting High-Impact Core Articles)**: Write the first 25 high-priority articles covering these core categories. I'll write them in structured markdown with clear headings, bullet points, and binary decision trees (e.g., *IF student status is X, THEN take action Y*).

---

### **What the Finished Product Looks Like**
The finished product is a **clean, searchable HubSpot Knowledge Base** organized into categories matching the 6 inboxes. 

Every article is structured in two formats:
1. **Customer-Facing FAQs**: Clear, conversational, and empathetic articles written in sharp English for students and parents.
2. **Internal SOP Metadata**: Structured bullet points (and JSON/Markdown snippets) optimized for LLMs and Breeze AI to search, ingest, and use for drafting highly accurate responses.
3. **Feedback Loop**: Setup feedback widgets (Was this helpful? Yes/No) and internal flag buttons for agents to report outdated documentation instantly.

---

### **The Hardest Part**
**Extracting tacit/undocumented knowledge from human brains.** 
Customer service teams frequently operate on intuitive memory, undocumented updates, and custom exceptions. Translating subjective human decisions into concrete, objective logic and ensuring that the knowledge base stays updated in real-time as EdTech courses, schedules, and policies evolve is the single biggest bottleneck.

---

## 🧠 Q5: Describe an automation or AI system you personally built for a customer operation. What tool did you use, what did you configure, what did it replace, and what was the measurable result?
### *Tell us about anything that went wrong along the way.*

### **What I Built & Configured**
I built a multi-channel **AI Social Media Comment & DM Triage, Auto-Response, and Escalation Engine** for a fast-growing D2C brand (Divine Hindu). 

Using **n8n, Meta Graph API, Google Sheets (as CRM), Groq LLM API (Llama 3.1 8B), Slack, and SMTP email**, I configured:
1. An automated polling system that sequentially fetches new comments/DMs from Instagram and Facebook every 5 minutes.
2. An LLM node that analyzes the content and runs strict prompt rules to classify queries into 8 categories (e.g., `PRODUCT_INQUIRY`, `COMPLAINT`, `SPAM`, `PRICE_QUESTION`) and actions (`AUTO_REPLY`, `HIDE`, `ESCALATE`).
3. Automated execution routes: hiding spam, liking positive comments, auto-replying using standardized Roman Hindi/English templates, and routing hot leads to Slack `#sales-leads` and complaints to `#complaints`.
4. A Google Sheets dashboard tracking all actions, categories, and response times.

### **What it Replaced**
It replaced a manual workflow where human agents checked social media accounts twice a day. As a result, critical sales leads were missed, spam comments went unmanaged, and urgent customer complaints remained unanswered for 12–24 hours.

### **Measurable Results**
* Reduced average response time from 3 hours to **under 5 minutes** (96% speedup).
* **Auto-resolved/deflected 70% of routine comments** with highly accurate, brand-aligned AI replies.
* Automatically hid **100% of promotional spam** comments.
* Saved the operations team **4 hours of manual triage daily**.

---

### **What Went Wrong along the Way & How I Solved It**
1. **API Token Expirations (Fatal Gaps)**:
   * *Problem*: Initially, we used short-lived user tokens for Meta Graph API and OAuth Playground tokens for Google Sheets, which expired every 1–2 hours, causing workflow crashes.
   * *Solution*: I generated a permanent Page Access Token through Meta System Users and migrated Google Sheets authentication to a **GCP Service Account JSON key**, making the connections permanent and production-stable.
2. **Hinglish Sarcasm Misclassification**:
   * *Problem*: The AI originally struggled with sarcastic Hinglish complaints (e.g., *"Wah! Bahut badhiya service, 10 din baad delivery aayi!"* was classified as POSITIVE_FEEDBACK).
   * *Solution*: I introduced **few-shot prompt training** inside the LLM node with specific slang and sarcastic examples. I also implemented a **confidence score threshold**: if the AI's confidence in its classification is under 70%, it automatically bypasses auto-reply and escalates to a human agent.
