# Setup Guide: Human-in-the-loop Email Response

1. **Prerequisites**
   - Access to an IMAP server (e.g., info@n3witalia.com).
   - Access to an SMTP server.
   - OpenAI API key.

2. **Workflow Import**
   - Import `workflow.json` into n8n.
   - Map the following nodes to your credentials:
     - **Email Trigger (IMAP)**: Map to your IMAP account.
     - **Send Email**: Map to your SMTP account.
     - **Approve Email**: Map to your SMTP account.
     - **OpenAI**: Map to your OpenAI API key.

3. **Environment Configuration**
   - Create a `.env` file from `env.example`.
   - Update the placeholder values with your actual administrator and sender emails.

4. **Smoke Test**
   - Trigger a manual execution or send a test email to the monitored IMAP inbox.
   - Verify that the approval email is sent to the `ADMIN_EMAIL`.
   - Approve the request and ensure the final email is sent to the sender.

5. **Activation**
   - Enable the workflow and monitor for any initial errors.
