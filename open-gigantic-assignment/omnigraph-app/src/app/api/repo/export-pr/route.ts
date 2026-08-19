import { NextResponse } from 'next/server';
import { DiffHunk } from '@/lib/types';

export const runtime = 'nodejs';

/**
 * GitHub Pull Request & Unified Patch Export Engine
 * 
 * Supports:
 * 1. Opening a real GitHub PR on the target repository using GitHub REST API
 * 2. Generating standard RFC-compliant .patch unified diff strings for `git apply`
 */

interface ExportFile {
  path?: string;
  oldCode?: string;
  originalCode?: string;
  newCode?: string;
  currentCode?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      repoUrl,
      branchName = `omnigraph-patch-${Date.now()}`,
      prTitle = 'feat(omnigraph): apply autonomous multi-agent surgical patches',
      prBody = 'Autonomous patch bundle generated and verified by OmniGraph Studio (PSMAS Swarm v2026.2).',
      files = [],
      hunks = [],
      githubToken,
    } = body as {
      repoUrl?: string;
      branchName?: string;
      prTitle?: string;
      prBody?: string;
      files?: ExportFile[];
      hunks?: DiffHunk[];
      githubToken?: string;
    };

    // 1. Generate Unified Patch Bundle (.patch)
    let patchBundle = '';

    if (hunks.length > 0) {
      hunks.forEach((hunk) => {
        patchBundle += `diff --git a/${hunk.file} b/${hunk.file}\n--- a/${hunk.file}\n+++ b/${hunk.file}\n${hunk.header || '@@ -1,1 +1,1 @@'}\n`;
        hunk.lines?.forEach((line) => {
          const prefix = line.type === 'addition' ? '+' : line.type === 'deletion' ? '-' : ' ';
          patchBundle += `${prefix}${line.content}\n`;
        });
        patchBundle += '\n';
      });
    } else if (files.length > 0) {
      // Generate diff from modified files vs original
      files.forEach((f) => {
        const oldLines = (f.oldCode || f.originalCode || '').split('\n');
        const newLines = (f.newCode || f.currentCode || '').split('\n');
        patchBundle += `diff --git a/${f.path} b/${f.path}\n--- a/${f.path}\n+++ b/${f.path}\n@@ -1,${oldLines.length} +1,${newLines.length} @@\n`;
        oldLines.forEach((l: string) => { if (l) patchBundle += `-${l}\n`; });
        newLines.forEach((l: string) => { if (l) patchBundle += `+${l}\n`; });
        patchBundle += '\n';
      });
    }

    let githubError: string | null = null;

    // 2. If GitHub Token is provided, create real GitHub Pull Request
    if (githubToken && repoUrl) {
      // Parse owner and repo from URL (e.g. https://github.com/owner/repo or owner/repo)
      const cleanUrl = repoUrl.replace('https://github.com/', '').replace(/\.git$/, '');
      const parts = cleanUrl.split('/');
      if (parts.length >= 2) {
        const [owner, repo] = parts;

        try {
          // A. Get repository default branch SHA
          const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
              Authorization: `token ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
              'User-Agent': 'OmniGraph-Studio',
            },
          });

          if (repoRes.ok) {
            const repoData = await repoRes.json();
            const defaultBranch = repoData.default_branch || 'main';

            // B. Get default branch ref SHA
            const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${defaultBranch}`, {
              headers: {
                Authorization: `token ${githubToken}`,
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'OmniGraph-Studio',
              },
            });

            if (refRes.ok) {
              const refData = await refRes.json();
              const baseSha = refData.object.sha;

              // C. Create new branch
              const newBranchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
                method: 'POST',
                headers: {
                  Authorization: `token ${githubToken}`,
                  Accept: 'application/vnd.github.v3+json',
                  'User-Agent': 'OmniGraph-Studio',
                },
                body: JSON.stringify({
                  ref: `refs/heads/${branchName}`,
                  sha: baseSha,
                }),
              });

              if (newBranchRes.ok) {
                // D. Update files in branch
                for (const file of files) {
                  const contentBase64 = Buffer.from(file.currentCode || file.newCode || '').toString('base64');
                  
                  // Get file SHA if exists
                  let fileSha = undefined;
                  const fileCheck = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}?ref=${branchName}`, {
                    headers: {
                      Authorization: `token ${githubToken}`,
                      Accept: 'application/vnd.github.v3+json',
                      'User-Agent': 'OmniGraph-Studio',
                    },
                  });
                  if (fileCheck.ok) {
                    const fData = await fileCheck.json();
                    fileSha = fData.sha;
                  }

                  await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`, {
                    method: 'PUT',
                    headers: {
                      Authorization: `token ${githubToken}`,
                      Accept: 'application/vnd.github.v3+json',
                      'User-Agent': 'OmniGraph-Studio',
                    },
                    body: JSON.stringify({
                      message: `chore(omnigraph): apply multi-agent surgical diff to ${file.path}`,
                      content: contentBase64,
                      branch: branchName,
                      sha: fileSha,
                    }),
                  });
                }

                // E. Create Pull Request
                const prRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                  method: 'POST',
                  headers: {
                    Authorization: `token ${githubToken}`,
                    Accept: 'application/vnd.github.v3+json',
                    'User-Agent': 'OmniGraph-Studio',
                  },
                  body: JSON.stringify({
                    title: prTitle,
                    body: `${prBody}\n\n### Modified Files (${files.length}):\n${files.map((f) => `- \`${f.path}\``).join('\n')}\n\n---\n*Created with OmniGraph Studio — PSMAS Swarm v2026.2*`,
                    head: branchName,
                    base: defaultBranch,
                  }),
                });

                if (prRes.ok) {
                  const prData = await prRes.json();
                  return NextResponse.json({
                    status: 'success',
                    mode: 'github_pr_created',
                    prUrl: prData.html_url,
                    prNumber: prData.number,
                    branch: branchName,
                    patchBundle,
                  });
                } else {
                  const prErr = await prRes.json().catch(() => null);
                  githubError = `GitHub PR creation failed (${prRes.status}): ${prErr?.message || prRes.statusText}`;
                }
              } else {
                const brErr = await newBranchRes.json().catch(() => null);
                githubError = `GitHub branch creation failed (${newBranchRes.status}): ${brErr?.message || newBranchRes.statusText}`;
              }
            } else {
              const refErr = await refRes.json().catch(() => null);
              githubError = `GitHub ref lookup failed (${refRes.status}): ${refErr?.message || refRes.statusText}`;
            }
          } else {
            const repoErr = await repoRes.json().catch(() => null);
            githubError = `GitHub repo lookup failed (${repoRes.status}): ${repoErr?.message || repoRes.statusText}`;
          }
        } catch (ghErr) {
          githubError = ghErr instanceof Error ? ghErr.message : 'Unknown GitHub API error';
        }
      } else {
        githubError = 'Invalid repository URL. Expected https://github.com/owner/repo';
      }
    }

    // Default response: Ready-to-apply Unified Patch Bundle
    const base: Record<string, unknown> = {
      status: githubError ? 'error' : 'success',
      mode: githubError ? 'github_pr_failed' : 'patch_bundle_ready',
      branch: branchName,
      patchBundle,
      applyCommand: `git apply --whitespace=fix omnigraph-${Date.now()}.patch`,
    };
    if (githubError) {
      base.error = githubError;
      return NextResponse.json(base, { status: 502 });
    }
    return NextResponse.json(base);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'PR Export failed' }, { status: 500 });
  }
}
