# 📊 Google Sheets Dashboard Setup Guide

## Step 1: Create New Google Sheet
Name it: **"Divine Hindu — Social Media Command Center"**

---

## Step 2: Create These Tabs/Sheets

### Tab 1: `Master Tracker`
| Column | Header Name | Format | Notes |
|--------|-------------|--------|-------|
| A | Timestamp | DateTime | Auto-filled by n8n |
| B | Platform | Text | Instagram / Facebook |
| C | Post ID | Text | Link to original post |
| D | Comment ID | Text | Unique identifier |
| E | Username | Text | Commenter handle |
| F | Comment Text | Text | Full comment content |
| G | AI Category | Text | PRODUCT_INQUIRY, COMPLAINT, etc. |
| H | AI Confidence | Number | 0-100 confidence score |
| I | Priority | Number | 1 (Critical) → 5 (Low) |
| J | Action | Text | AUTO_REPLY, HIDE, DELETE, etc. |
| K | Suggested Reply | Text | AI-generated reply |
| L | Action Taken | Text | What was actually done |
| M | Assigned To | Text | Team member name |
| N | Status | Text | Open / In Progress / Resolved |
| O | Response Time (min) | Number | Minutes to first response |
| P | Notes | Text | Manual notes |

**Conditional Formatting:**
- Priority 1 → Red background
- Priority 2 → Orange background
- Priority 3 → Yellow background
- Status "Open" → Red text
- Status "Resolved" → Green text

---

### Tab 2: `DM Tracker`
| Column | Header Name | Format |
|--------|-------------|--------|
| A | Timestamp | DateTime |
| B | Platform | Text |
| C | Conversation ID | Text |
| D | Customer Username | Text |
| E | Message Text | Text |
| F | AI Category | Text |
| G | Priority | Number |
| H | Route To | Text |
| I | Suggested Reply (Hindi) | Text |
| J | Suggested Reply (English) | Text |
| K | Urgency | Text |
| L | Status | Text |
| M | Handled By | Text |
| N | Resolution Time (min) | Number |

---

### Tab 3: `Daily Dashboard`
This is the visual dashboard tab. Create these summary cells:

**Row 1-2: Header**
- A1: "📊 Divine Hindu — Daily Social Media Dashboard"
- A2: Today's date formula: `=TEXT(TODAY(), "DD MMM YYYY")`

**Row 4-5: KPI Cards (use COUNTIF formulas)**
- B4: Total Comments Today
  ```
  =COUNTIF('Master Tracker'!A:A, ">="&TODAY())
  ```
- D4: Avg Response Time
  ```
  =AVERAGEIFS('Master Tracker'!O:O, 'Master Tracker'!A:A, ">="&TODAY())
  ```
- F4: Auto-Resolved %
  ```
  =COUNTIFS('Master Tracker'!A:A, ">="&TODAY(), 'Master Tracker'!J:J, "AUTO_REPLY") / COUNTIF('Master Tracker'!A:A, ">="&TODAY()) * 100
  ```
- H4: Open Complaints
  ```
  =COUNTIFS('Master Tracker'!A:A, ">="&TODAY(), 'Master Tracker'!G:G, "COMPLAINT", 'Master Tracker'!N:N, "Open")
  ```

**Row 7-15: Category Breakdown (for Pie Chart)**
- A7: "Category", B7: "Count"
- A8: "Product Inquiry", B8: `=COUNTIFS('Master Tracker'!A:A, ">="&TODAY(), 'Master Tracker'!G:G, "PRODUCT_INQUIRY")`
- (Repeat for all categories)

**Charts to Create:**
1. Pie Chart — Category breakdown
2. Bar Chart — Comments by hour
3. Line Chart — Response time trend (7 days)
4. Funnel — Sales leads conversion

---

### Tab 4: `Reply Templates`
| Column | Header |
|--------|--------|
| A | Template ID |
| B | Category |
| C | Sub-Category |
| D | Template (Hindi) |
| E | Template (English) |
| F | Variables |
| G | Tone |
| H | Platform |

---

### Tab 5: `Daily Reports`
| Column | Header |
|--------|--------|
| A | Date |
| B | Total Comments |
| C | Total DMs |
| D | Avg Response Time |
| E | Auto-Resolved % |
| F | Hot Leads |
| G | Complaints |
| H | Spam Cleaned |
| I | AI Summary |

---

### Tab 6: `Config`
Store configuration values:
| A | B |
|---|---|
| Last Processed Comment ID (IG) | (auto-updated by n8n) |
| Last Processed Comment ID (FB) | (auto-updated by n8n) |
| Last Processed DM Timestamp | (auto-updated by n8n) |
| Team Members | member1, member2 |
| Alert Email | manager@divinehindu.in |
| Support Phone | +91-XXXXXXXXXX |

---

## Step 3: Share Sheet Permissions
- Share with n8n service account (Google Sheets API access)
- Share with team members as Editors
- Manager/Leadership as Viewers

## Step 4: Copy Sheet ID
- The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Set this as `GOOGLE_SHEETS_ID` in n8n environment variables

---

## Step 5: Install Google Apps Script (Optional but Recommended)
To enable automated response time calculations and email alerts for critical complaints, add the companion Apps Script:

1. Open your Google Sheet.
2. Go to **Extensions** > **Apps Script**.
3. Delete any code in the editor, and copy-paste the entire contents of [code.gs](file:///u:/My-Automations/divine-hindu-assignment/dashboard/code.gs).
4. Click the **Save** icon (floppy disk).
5. Select `initializeConfigSheet` from the function dropdown at the top, and click **Run**.
   - You will be asked to authorize permissions. Accept them.
   - This will automatically create the `Config` tab with pre-filled default settings.
6. To set up the triggers:
   - In the Apps Script sidebar, click the **Triggers** icon (clock).
   - Click **+ Add Trigger** in the bottom right.
   - Set "Choose which function to run" to `onEdit`.
   - Set "Select event source" to `From spreadsheet`.
   - Set "Select event type" to `On edit`.
   - Click **Save**.
7. Now, when a row status is updated to "Resolved", the system will automatically calculate the response time. Additionally, any new complaint or hot lead logged will trigger an email notification to the configured email in the `Config` sheet.
