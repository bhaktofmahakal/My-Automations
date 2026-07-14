# 🕉️ Divine Hindu — Social Media Operations SOP
## Standard Operating Procedure for Comments & DM Management System

**Version**: 1.0  
**Effective Date**: 18 June 2026  
**Owner**: AI & Customer Success Operations Team  

---

## 1. Document Purpose
This document outlines the Standard Operating Procedure (SOP) for managing Divine Hindu's social media platforms (Instagram & Facebook) using the AI-augmented Comment/DM Triage & Automation system.

---

## 2. System Architecture & Roles
The system operates on a **hybrid human-in-the-loop** architecture, dividing work between the AI classification engine (n8n + Groq/Ollama LLM) and the human Customer Support (CS) & Sales teams.

### Operational Roles:
1. **L0: AI Triage Engine (Automated)**: Checks comments/DMs every 3–5 minutes. Auto-replies, hides spam, and logs rows to the Google Sheets tracker.
2. **L1: Social Media Executive (Human)**: Actively monitors the Dashboard and handles all queries that require human touch, such as custom DMs, product sizing questions, or initial sales outreach.
3. **L2: CS Team Lead / Manager (Human)**: Resolves escalated complaints (damaged items, wrong orders, severe delays) and approves custom compensation.
4. **L3/L4: Head of CS & Leadership (Human)**: Handles public relations issues, brand reputation risks, and legal threats.

---

## 3. Daily Schedule & Core Workflows

### 🌅 09:00 AM — Morning Review (L1 Executive)
1. **Review Daily Report**: Open the `#social-media-reports` channel in Slack. Read the daily summary generated at 6:00 PM the previous evening.
2. **Review Overnight Queue**: Open the [Google Sheet Command Center](file:///u:/My-Automations/divine-hindu-assignment/dashboard/dashboard-setup.md). Filter for rows with `Status = "Open"` and `Timestamp` falling in the overnight hours (6:00 PM to 9:00 AM).
3. **Address Outstanding Complaints**: Prioritize any unhandled complaints from the overnight queue.

### ⚡ 09:00 AM to 06:00 PM — Real-Time Alert Monitoring (L1 & L2)
- **High-Priority Slack Alerts**: Keep Slack open. Pay attention to two channels:
  - `#sales-leads`: Triggers when a "HOT_LEAD" is identified. Action must be taken in under 15 minutes.
  - `#complaints`: Triggers when a complaint of Priority 1 or 2 is logged. Must be acknowledged and routed in under 10 minutes.
- **Auto-Reply Verification**: Spot-check L0 (AI) replies. If the AI replied incorrectly or used a sub-optimal template, delete/edit the comment directly on the platform and update `Action Taken` to `MANUAL_CORRECTION` in the Sheet.

### 📊 06:00 PM — Daily Reporting & Sign-Off (L1 & L2)
1. **Status Update**: Ensure all comments/DMs received during the day are updated. No row should remain in `Status = "Open"` without a comment/action logged.
2. **Auto-Report Generation**: At 6:00 PM, n8n will trigger the Daily Report Generator. Verify that the report compiles successfully and updates the `Daily Reports` tab in the Google Sheet.
3. **Handover**: For any unresolved complaints or pending leads, update the `Notes` column and assign the row to the next agent in the `Assigned To` column.

---

## 4. Query Handling & Response Protocol

### 🛒 4.1 Product Inquiries (Priority: HIGH | SLA: < 15 min)
*AI Action: Auto-replies with standard template + routes to L1.*
- **Step 1**: If the query is complex (e.g., custom sizes, material certifications), the L1 agent must step in.
- **Step 2**: Open [reply-templates.json](file:///u:/My-Automations/divine-hindu-assignment/templates/reply-templates.json). Find the appropriate category ID (`PRODUCT_INQUIRY`).
- **Step 3**: Customize the template variables (e.g., `{{customer_name}}`, `{{product_name}}`).
- **Step 4**: Respond directly on Instagram/Facebook. Update `Status` to `Resolved` in the Sheet.

### 💰 4.2 Price & Discount Questions (Priority: HIGH | SLA: < 15 min)
*AI Action: Auto-replies with product price, current discount code, and catalog link.*
- **Step 1**: Check if the user is asking about bulk/wholesale rates.
- **Step 2**: If bulk pricing is requested, use template `PQ_002` (Bulk Pricing structure).
- **Step 3**: Send a direct message (DM) asking for their required quantity and delivery pin-code.
- **Step 4**: Mark the row in the sheet as `Assigned To = "Sales Team"` and `Status = "In Progress"`.

### 😡 4.3 Complaints (Priority: CRITICAL | SLA: < 10 min)
*AI Action: Logs to sheet, sends instant email/Slack alerts to CS Manager (L2), auto-sends warm acknowledgment to customer.*
- **Step 1**: Read the complaint text (e.g., "damaged murti received", "wrong pooja item").
- **Step 2**: Send the pre-approved apology template:
  > *"Namaste {{customer_name}} ji, we are extremely sorry for the trouble. Your ticket ID is #{{ticket_id}}. We are preparing a replacement/refund immediately. Our manager will contact you in 10 minutes. 🙏"*
- **Step 3**: Route according to damage type:
  - **Damaged/Broken Item**: Request photo/video proof via DM. Initiate a free replacement shipment in the shipping portal.
  - **Wrong Item**: Book a reverse pickup for the wrong item and dispatch the correct item.
  - **Delayed Delivery**: Open the courier API/dashboard, locate the parcel, and call the logistics partner to prioritize delivery.
- **Step 4**: Update `Status` to `Resolved` only after the customer confirms resolution.

### 🤝 4.4 Collaboration & Influencer Requests (Priority: MEDIUM | SLA: < 4 hours)
*AI Action: Auto-routes to Marketing team.*
- **Step 1**: L1 agent reviews the sender's profile for authenticity.
- **Step 2**: Use template `COL_001` or `COL_002` from `reply-templates.json` to gather metrics (Follower count, engagement rate, media kit).
- **Step 3**: Forward details to marketing@divinehindu.in. Update status to `Resolved` (transferred).

---

## 5. Google Sheets Data Entry & Maintenance
To keep the dashboard accurate, operators must maintain discipline:
1. **Assigned To**: Always put your name in Column M when you take ownership of a row.
2. **Status**:
   - `Open`: Unresolved, needs human action.
   - `In Progress`: Active conversation/investigation ongoing.
   - `Resolved`: Conversation finished, customer satisfied, or action taken.
3. **Response Time**: The companion Google Apps Script will calculate this automatically when you change the status to `Resolved`.
4. **Manual Notes**: Add detailed tracking information (e.g., courier tracking numbers, refund transaction IDs) in the `Notes` column.

---

## 6. Emergency & Crisis Protocol (L3/L4)
In the event of a brand reputation crisis (e.g., offensive comments, coordinated spam attacks, or public threats):
1. **Pause Auto-Replies**: Open n8n, go to the `comment-monitor-classifier` workflow, and toggle the active state to **Disabled** to prevent the AI from posting automated responses.
2. **Mass Hide**: In Google Sheets, filter the comments by platform, and use the n8n bulk-hide utility (or manually hide comments via the Meta Business Suite).
3. **Alert Leadership**: Notify the CS Head and Founders immediately via the WhatsApp urgent hotline.
