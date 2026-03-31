# Social Media Auto-Poster (Multi-Platform)

## Problem
Posting the same content manually to multiple platforms (YouTube, TikTok, Instagram, LinkedIn, etc.) is time-consuming and prone to errors.

## Triggers
- **Telegram Trigger**: Activated when a video idea or file is received via a specified Telegram bot.

## Action Flow
1. **Receive Content**: Content is received through a Telegram bot.
2. **AI Processing**: OpenAI (GPT-4) processed the input and generates metadata/captions.
3. **Drafting**: Captions and metadata are prepared using structured output parsers.
4. **Multi-Platform Posting**: Automatically uploads and posts to:
   - YouTube
   - TikTok
   - Instagram
   - LinkedIn
   - Facebook
   - Threads
   - Bluesky
   - Pinterest
   - Twitter (X)
5. **Tracking**: Updates the status in **Google Sheets** to "Published" once complete.
6. **Notification**: Sends the final video URL back to the user via Telegram.

## Tools / Integrations
- **n8n**: Workflow orchestration.
- **Blotato**: Specialized nodes for multi-platform media uploads.
- **OpenAI**: Content generation and summarization.
- **Telegram**: User interface for triggers and notifications.
- **Google Sheets**: Status tracking and database.

## Required Credentials
- **Telegram Bot Token**: For interaction with the user.
- **OpenAI API Key**: For GPT processing.
- **Blotato Credentials**: To access various social media APIs.
- **Google Sheets (OAuth2)**: For status updates.

## Environment Variables
- `TELEGRAM_CHAT_ID`: The ID where notifications should be sent.
- `GOOGLE_SHEET_ID`: ID of the tracking spreadsheet.

## Expected Output
Content is automatically distributed across all connected social channels with a "Published" status in the tracking sheet.

## Common Failure Cases
- **Upload Timeout**: Large video files may fail; check Blotato limits.
- **API Rate Limits**: Rapid sequential posting may trigger platform-specific bans or rate limits.

## Runbook
- **Smoke Test**: Send a small video file to the Telegram bot and verify the Google Sheet updates.
- **Go-live Checklist**: Ensure all social media accounts are properly linked in Blotato.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
