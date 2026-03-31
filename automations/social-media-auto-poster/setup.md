# Setup Guide: Social Media Auto-Poster

1. **Prerequisites**
   - Access to a Telegram bot (via BotFather).
   - Google Cloud account with Sheets API enabled.
   - Blotato account (for multi-platform media uploads).
   - OpenAI API key.

2. **Workflow Import**
   - Import `workflow.json` into n8n.
   - Map the following nodes to your credentials:
     - **Telegram Trigger**: Map to your Telegram Bot Token.
     - **OpenAI Chat Model**: Map to your OpenAI API key.
     - **Blotato Nodes**: Map each node (YouTube, TikTok, etc.) to your Blotato API.
     - **Update Status**: Map to your Google Sheets account.

3. **Environment Configuration**
   - Create a `.env` file from `env.example`.
   - Update `GOOGLE_SHEET_ID` with the ID of your tracking spreadsheet.
   - Update `TELEGRAM_CHAT_ID` if you wish to restrict access.

4. **Smoke Test**
   - Send a test video idea or link to the Telegram bot.
   - Verify that OpenAI processes the metadata and at least one Blotato upload starts.
   - Confirm that the status in the Google Sheet updates to "Published" or "DONE".

5. **Activation**
   - Enable the workflow and monitor initial multi-platform uploads.
