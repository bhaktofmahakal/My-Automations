# Conventions

## Naming
- Folder slugs: kebab-case (utomations/<slug>).
- Workflows: always workflow.json inside each automation folder; never edited after import.
- Docs: README.md, setup.md, env.example, ssets/.

## Versioning
- Keep exported JSON under VCS; if updating, archive prior export in ssets/ or ersions/ with a datestamp.
- Record notable changes in the automation README under a **Changelog** section if needed.

## Secrets
- Do not commit real secrets. Use env.example placeholders.
- Prefer platform credential stores (n8n Credentials, Zapier Connections, Make Connections).
- When webhooks allow signatures (Calendly, Retell, custom HTTP), enforce verification.

## Structure
- No loose files at repo root beyond metadata (README.md, LICENSE, .gitignore).
- All assets (PDFs, screenshots) live under the automation’s ssets/ or docs/guides/.

## Contributions
- Before adding/updating workflows, confirm JSON imports without modification.
- Keep new docs concise and deployment-focused.
