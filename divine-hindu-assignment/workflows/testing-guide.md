# 🧪 n8n Workflow Testing Guide — Divine Hindu

## Testing Without Real API Credentials (Using n8n Pin Data)

n8n has a built-in feature called **Pin Data** — it lets you "freeze" a node's output so downstream nodes use that data instead of making real API calls.

---

## Workflow 1: Comment Monitor & Classifier

### Step 1 — Import & Open
1. Open n8n → **Import from File** → select `comment-monitor-classifier.json`
2. Click the workflow to open it

### Step 2 — Pin Mock Data on Fetch Nodes (no API needed)

**On "Fetch Instagram Comments" node:**
1. Double-click the node → switch to **Output** tab
2. Click **Pin Data** button
3. Paste this JSON:
```json
{
  "data": [{
    "id": "18023456789012345",
    "caption": "Beautiful brass Ganesha idol 🕉️ Link in bio.",
    "timestamp": "2026-06-20T10:00:00+0000",
    "comments": {
      "data": [
        { "id": "17891111111111111", "username": "sharma_pooja", "text": "price kya hai iska?", "timestamp": "2026-06-20T10:05:00+0000" },
        { "id": "17892222222222222", "username": "bot_promo_99", "text": "DM for collab! Luxury watches!", "timestamp": "2026-06-20T10:06:00+0000" },
        { "id": "17893333333333333", "username": "rahul_devotee", "text": "Jai Shri Ram! Bahut sundar murti.", "timestamp": "2026-06-20T10:08:00+0000" }
      ]
    }
  }]
}
```

**On "Fetch Facebook Comments" node:**
1. Double-click → Pin Data → paste:
```json
{
  "data": [{
    "id": "100234567890123_456789012345678",
    "message": "Premium Sandalwood Agarbatti now available!",
    "created_time": "2026-06-20T09:30:00+0000",
    "comments": {
      "data": [
        { "id": "456789_123456", "from": {"name": "Amit Patel", "id": "987654321"}, "message": "Order 5 din pehle kiya, abhi shipped nahi hua!", "created_time": "2026-06-20T10:10:00+0000" },
        { "id": "456789_234567", "from": {"name": "Sita Verma", "id": "876543210"}, "message": "Kya ye natural sandlewood hai?", "created_time": "2026-06-20T10:12:00+0000" }
      ]
    }
  }]
}
```

**On "Fetch Processed Comment IDs" node:**
1. Double-click → Pin Data → paste (simulates empty sheet = all comments are new):
```json
{ "values": [["comment_id"]] }
```

### Step 3 — Run
- Click **Test Workflow**
- Watch each comment flow through: Merge → IF → LLM Classify → Switch → Action → Log

### Expected Results
| Comment | Expected Category | Expected Action |
|---|---|---|
| "price kya hai iska?" | PRICE_QUESTION | AUTO_REPLY |
| "DM for collab! Luxury watches!" | SPAM | HIDE |
| "Jai Shri Ram! Bahut sundar" | POSITIVE_FEEDBACK | LIKE_ONLY |
| "Order 5 din pehle, shipped nahi" | COMPLAINT | ESCALATE_SUPPORT |
| "Natural sandlewood hai?" | PRODUCT_INQUIRY | AUTO_REPLY |

---

## Workflow 2: DM Monitor & Router

### Pin Data on Fetch Nodes

**On "Fetch Instagram DMs" node — Pin:**
```json
{
  "data": [{
    "id": "t_1234567890",
    "participants": { "data": [{"name": "Priya Sharma", "id": "111222333"}] },
    "messages": {
      "data": [
        { "id": "m_ig_001", "from": {"name": "Priya Sharma", "id": "111222333"}, "message": "Hello, I want to buy the Ganesha idol. How do I order?", "created_time": "2026-06-20T13:30:00+0000" }
      ]
    }
  }]
}
```

**On "Fetch Facebook Messenger DMs" node — Pin:**
```json
{
  "data": [{
    "id": "t_0987654321",
    "participants": { "data": [{"name": "Rajesh Kumar", "id": "444555666"}] },
    "messages": {
      "data": [
        { "id": "m_fb_001", "from": {"name": "Rajesh Kumar", "id": "444555666"}, "message": "Mera order 7 din pehle aaya tha. Item damaged hai. Refund chahiye.", "created_time": "2026-06-20T13:28:00+0000" }
      ]
    }
  }]
}
```

**On "Fetch Processed DM IDs" node — Pin:**
```json
{ "values": [["message_id"]] }
```

### Expected Results
| DM | Expected Category | Route |
|---|---|---|
| "I want to buy... How do I order?" | HOT_LEAD | sales |
| "Item damaged. Refund chahiye." | SUPPORT_REQUEST | support |

---

## Workflow 3: Daily Report Generator

### Pin Data on Read nodes

**On "Read Master Tracker" node — Pin:**
```json
{
  "values": [
    ["timestamp","platform","post_id","comment_id","username","comment_text","category","action","priority","suggested_reply","action_taken","response_time_ms","logged_at"],
    ["2026-06-20T10:05:00Z","instagram","18023456789","17891111","sharma_pooja","price kya hai?","PRICE_QUESTION","AUTO_REPLY","2","Namaste! Price ₹1499 hai","YES","2500","2026-06-20T10:05:02Z"],
    ["2026-06-20T10:06:00Z","instagram","18023456789","17892222","bot_promo_99","DM for collab","SPAM","HIDE","5","","YES","1800","2026-06-20T10:06:02Z"],
    ["2026-06-20T10:10:00Z","facebook","100234567_456789","456789_123456","Amit Patel","Order shipped nahi","COMPLAINT","ESCALATE_SUPPORT","1","Namaste ticket generate...","YES","3200","2026-06-20T10:10:03Z"]
  ]
}
```

**On "Read DM Tracker" node — Pin:**
```json
{
  "values": [
    ["timestamp","platform","convo_id","msg_id","from_name","from_id","category","route_to","priority","urgency","reply_hindi","reply_english","action_taken","response_time_ms","logged_at"],
    ["2026-06-20T13:30:00Z","instagram","t_1234567890","m_ig_001","Priya Sharma","111222333","HOT_LEAD","sales","5","high","नमस्ते! हमारी Sales team...","Namaste! Our sales team...","YES","4500","2026-06-20T13:30:05Z"],
    ["2026-06-20T13:28:00Z","facebook_messenger","t_0987654321","m_fb_001","Rajesh Kumar","444555666","SUPPORT_REQUEST","support","2","high","नमस्ते! आपकी समस्या...","Namaste! We have received...","YES","5200","2026-06-20T13:28:06Z"]
  ]
}
```

### Expected Report Output
- Total Comments: 3, Total DMs: 2
- Hot Leads: 1, Complaints: 2, Escalations: 1
- LLM generates English + Hindi report
- Slack message sent, DailyReports sheet updated
- `Needs Attention?` → TRUE (complaints > 0) → Slack alert

---

## 🛠️ Real Production Setup & Deployment Guide

This section explains how to configure the real API credentials, developer apps, and third-party integrations to make the workflows run in a live production environment.

### 1. Meta Graph API Setup (Facebook & Instagram)
To fetch live comments and messages and perform actions (like, reply, hide) on your accounts:
1. **Create a Meta Developer App**:
   - Go to [Meta for Developers Portal](https://developers.facebook.com/).
   - Click **My Apps** → **Create App**. Select **Other** as the app type, then select **Business** on the next screen.
   - Name your app (e.g., `Divine Hindu Social Engine`) and connect your Business Manager account.
2. **Add Products & Configure Permissions**:
   - Inside your App Dashboard, add **Facebook Login for Business** and **Messenger API for Instagram**.
   - Make sure your app has access to these specific permissions:
     - `pages_read_engagement`, `pages_manage_posts`, `pages_manage_comments`
     - `instagram_basic`, `instagram_manage_comments`, `instagram_manage_messages`
     - `pages_messaging`
3. **Generate User Access Token**:
   - Open the [Graph API Explorer](https://developers.facebook.com/tools/explorer/).
   - Select your App from the top-right dropdown. Under **User or Page**, select your Facebook Page.
   - Select the permissions above and click **Generate Access Token**. Approve permissions in the Facebook popup.
4. **Exchange for Long-Lived Page Access Token (Crucial for Production)**:
   - The token generated in the explorer is short-lived (expires in 1-2 hours).
   - Exchange it for a 60-day Long-Lived User Access Token by running a GET request:
     `GET https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id={YOUR_APP_ID}&client_secret={YOUR_APP_SECRET}&fb_exchange_token={SHORT_LIVED_TOKEN}`
   - Use that new long-lived User Access Token to get a permanent Page Access Token by calling:
     `GET https://graph.facebook.com/v19.0/me/accounts?access_token={LONG_LIVED_USER_ACCESS_TOKEN}`
   - Copy the Page Access Token for your page. Set this as `META_ACCESS_TOKEN` in your n8n environment variables.
5. **Get Page ID and Instagram Business Account ID**:
   - Your **Facebook Page ID** is located in: Facebook Page → About → Page Transparency. Set this as `META_PAGE_ID`.
   - To get your **Instagram Business Account ID**, run this GET query in the Graph Explorer:
     `GET https://graph.facebook.com/v19.0/{PAGE_ID}?fields=instagram_business_account`
   - Set the returned ID as `META_IG_USER_ID` in n8n.

---

### 2. Google Cloud Console Setup (Service Account for Google Sheets)
Using Google OAuth tokens from OAuth Playground is only for testing as they expire in 1 hour. For a reliable production system, configure a GCP Service Account:
1. **Create a GCP Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/). Create a new project (e.g., `divine-hindu-automation`).
2. **Enable Google Sheets & Drive APIs**:
   - Go to **APIs & Services** → **Library**.
   - Search for and enable **Google Sheets API** and **Google Drive API**.
3. **Create Service Account**:
   - Go to **IAM & Admin** → **Service Accounts** → **Create Service Account**.
   - Name it (e.g., `n8n-sheets-agent`). Click **Create and Continue**, then click **Done**.
4. **Download JSON Key**:
   - Click on the newly created Service Account. Go to the **Keys** tab → **Add Key** → **Create New Key**.
   - Select **JSON** format and click **Create**. Save the downloaded `.json` key file.
5. **Share the Sheet**:
   - Open your Google Sheet ("Divine Hindu — Social Media Command Center").
   - Click **Share** (top-right). Paste the Service Account's email address (found in the JSON file).
   - Set role as **Editor** and click **Share**.
6. **Configure in n8n**:
   - In n8n, click **Credentials** → **Add Credential** → **Google Sheets**.
   - Select **Service Account** authentication type.
   - Paste the contents of the downloaded JSON file into the Key field.
   - *(Production Note: To migrate our raw HTTP Google Sheet nodes to native nodes, double-click the Sheet nodes, select Google Sheets as the node type, select your newly added credentials, and specify the Sheet ID and range. This removes the need for `GOOGLE_SHEETS_TOKEN` entirely!)*

---

### 3. Slack Webhook Integration
To send real-time alerts for Sales Leads and Support Complaints to Slack:
1. Go to [Slack API Apps Console](https://api.slack.com/apps).
2. Click **Create New App** → **From scratch**. Name it `Divine Hindu Alert Bot` and select your workspace.
3. In the sidebar, select **Incoming Webhooks** under Features.
4. Toggle **Activate Incoming Webhooks** to **On**.
5. Click **Add New Webhook to Workspace** at the bottom.
6. Choose the channel (e.g., `#sales-leads` or `#complaints`) and click **Allow**.
7. Copy the generated Webhook URL and set it as `SLACK_WEBHOOK_URL` in n8n.

---

### 4. WhatsApp Business Cloud API Setup (Optional)
To send instant alerts for Hot Leads directly to the sales team's WhatsApp:
1. In Meta Developer Console, go to your App and add **WhatsApp** product.
2. Go to **WhatsApp** → **API Setup**.
3. Copy the **Phone Number ID**. Set it as `META_WHATSAPP_PHONE_NUMBER_ID` in n8n.
4. Create a WhatsApp message template in the Meta WhatsApp Manager (e.g., "Namaste, new lead received: {{name}} is interested in {{product}}").
5. Copy your Phone Number ID and recipient number and set them in n8n variables.

---

### 5. SMTP Email Configuration
The Daily Report Generator uses SMTP to send daily summaries:
1. In n8n, click **Credentials** → **Add Credential** → **SMTP**.
2. Enter your email provider's SMTP details (Host, Port, SSL, Username/Password). For Gmail, use an **App Password**.
3. Link this credential to the **Email Daily Report** node in the daily-report-generator workflow.

---

### 6. Transitioning to Live Production Run
To start processing real social media interactions:
1. **Unpin Data**: Double-click each Fetch node in the workflows, go to the Output tab, and click **Unpin Data** (remove the green pin icon).
2. **Configure Node Credentials**:
   - Make sure Meta access tokens and Google Sheet credentials/native nodes are connected.
3. **Turn Workflows On**: In n8n, toggle the **Active** switch in the top-right corner of each workflow.
4. **Initial Verification Run**:
   - Write a test comment (e.g., "Price kitna hai?") on your Facebook Page post or Instagram post.
   - Go to n8n → **Executions** tab and watch the run.
   - Verify that the comment was categorized as `PRICE_QUESTION`, logged to Google Sheets, and an automated response was posted.

---

## 🔍 Troubleshooting Production Issues

| Error / Issue | Root Cause | Fix |
|---|---|---|
| `Sheets 401 Unauthorized` | OAuth token expired (usually if using OAuth Playground token after 1 hour). | Switch to Google Service Account as detailed in GCP setup above. |
| `LLM 429 Rate Limit` | Using a free model tier and sending too many concurrent comments. | Increase cron polling interval (e.g., to 10 minutes) or upgrade LLM API key. |
| `Meta 100/10 Permission Error` | Access token does not have necessary permissions or has expired. | Re-generate Long-Lived Page Access Token using the Explorer and make sure all permissions are checked. |
| `SMTP Authentication Failed` | SMTP details or password incorrect. | Check your email host port settings. For Gmail/Outlook, make sure "App Passwords" are enabled and used. |
| `Node X hasn't been executed` | In mock testing mode, one of the mock-inputs was not pinned. | Follow mock setup guide above and ensure all input nodes have green Pin icon active. |
