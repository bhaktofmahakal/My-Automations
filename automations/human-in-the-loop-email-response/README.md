# Human-in-the-loop Email Response System

## Problem
Automates handling of incoming emails by summarizing content and generating AI-driven responses, while maintaining human oversight through a "send and wait" approval system via email.

## Triggers
- **Email Trigger (IMAP)**: Activated when a new email is received in the monitored inbox.

## Action Flow
1. **Receive Email**: Fetches new emails via IMAP.
2. **Markdown Conversion**: Converts HTML body to Markdown for better LLM processing.
3. **Summarization**: Generates a concise summary (max 100 words) of the email.
4. **Draft Response**: AI Agent (GPT-4o-mini) drafts a professional reply based on the summary and context.
5. **Approval Step**: Sends an email to the administrator with the original message and the AI draft, then waits for a boolean "approved" response.
6. **Final Delivery**: If approved, sends the drafted response to the original sender via SMTP.

## Tools / Integrations
- **n8n**: Workflow orchestration.
- **IMAP**: Receiving incoming emails.
- **SMTP**: Sending approval requests and final replies.
- **OpenAI**: Summarization and response generation (GPT-4o-mini).
- **LangChain**: AI summarization and agent chains.

## Required Credentials
- **IMAP**: Credentials for the inbox to monitor (e.g., info@n3witalia.com).
- **SMTP**: Credentials for sending outgoing emails.
- **OpenAI API**: For GPT model access.

## Environment Variables
- `ADMIN_EMAIL`: Email address where approval requests are sent.
- `SENDER_EMAIL`: Email address used to send replies.

## Expected Output
A professional, AI-generated email response sent to the user only after explicit human approval.

## Common Failure Cases
- **IMAP Connection Error**: Check credentials and server settings.
- **AI Token Limit**: Summarization might fail if the email is excessively long.
- **Approval Timeout**: The workflow waits for a response; ensure the administrator checks the approval inbox.

## Runbook
- **Smoke Test**: Send a test email to the monitored IMAP inbox and verify the approval request is received.
- **Go-live Checklist**: Ensure all credentials are valid and the approval email is accessible.

## Contacts
- Maintainer: utsav mishra (utsavmishraa005@gmail.com)
