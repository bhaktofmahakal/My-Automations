import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Real GitHub Repository File Fetcher
 * Fetches actual source files from public GitHub repos via the GitHub API.
 * No token needed for public repos (60 req/hr rate limit).
 */
export async function POST(req: Request) {
  try {
    const { repoUrl } = await req.json();
    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json({ error: 'Missing repoUrl' }, { status: 400 });
    }

    // Parse GitHub URL: https://github.com/owner/repo or https://github.com/owner/repo/tree/branch/path
    const urlMatch = repoUrl.match(
      /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/tree\/([^/]+)(?:\/(.+))?)?$/
    );
    if (!urlMatch) {
      return NextResponse.json({ error: 'Invalid GitHub URL format. Expected: https://github.com/owner/repo' }, { status: 400 });
    }

    const owner = urlMatch[1];
    const repo = urlMatch[2];
    const branch = urlMatch[3] || 'main';
    const subPath = urlMatch[4] || '';

    // Fetch the repository file tree
    const apiUrl = subPath
      ? `https://api.github.com/repos/${owner}/${repo}/contents/${subPath}?ref=${branch}`
      : `https://api.github.com/repos/${owner}/${repo}/contents?ref=${branch}`;

    const treeRes = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OmniGraph-Studio/1.0',
      },
    });

    if (!treeRes.ok) {
      if (treeRes.status === 404) {
        // Try 'master' branch if 'main' failed
        const fallbackUrl = subPath
          ? `https://api.github.com/repos/${owner}/${repo}/contents/${subPath}?ref=master`
          : `https://api.github.com/repos/${owner}/${repo}/contents?ref=master`;
        const fallbackRes = await fetch(fallbackUrl, {
          headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OmniGraph-Studio/1.0' },
        });
        if (!fallbackRes.ok) {
          return NextResponse.json({
            error: `GitHub API error: ${fallbackRes.status}. Ensure the repo is public and the URL is correct.`,
          }, { status: fallbackRes.status });
        }
        const fallbackData = await fallbackRes.json();
        return await processGitHubContents(owner, repo, 'master', fallbackData);
      }
      const errText = await treeRes.text();
      return NextResponse.json({ error: `GitHub API: ${treeRes.status} - ${errText.slice(0, 200)}` }, { status: treeRes.status });
    }

    const treeData = await treeRes.json();
    return await processGitHubContents(owner, repo, branch, treeData);
  } catch (err) {
    return NextResponse.json({ error: `Server error: ${String(err)}` }, { status: 500 });
  }
}

const CODE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java',
  '.c', '.cpp', '.h', '.cs', '.rb', '.swift', '.kt', '.scala',
  '.vue', '.svelte', '.astro', '.php',
]);

const MAX_FILES = 15; // Limit to prevent huge repos from overwhelming the parser
const MAX_FILE_SIZE = 50000; // 50KB per file

async function processGitHubContents(
  owner: string,
  repo: string,
  branch: string,
  contents: any
): Promise<Response> {
  // Handle single file (not array)
  if (!Array.isArray(contents)) {
    contents = [contents];
  }

  // Filter to code files only
  const codeFiles = contents.filter((item: any) => {
    if (item.type !== 'file') return false;
    const ext = '.' + (item.name.split('.').pop() || '');
    return CODE_EXTENSIONS.has(ext) && (item.size || 0) < MAX_FILE_SIZE;
  }).slice(0, MAX_FILES);

  // Also check for src/ subdirectory to fetch code from there
  const srcDir = contents.find((item: any) => item.type === 'dir' && ['src', 'lib', 'app', 'pkg', 'cmd'].includes(item.name));
  
  let subDirFiles: any[] = [];
  if (srcDir && codeFiles.length < 5) {
    try {
      const subRes = await fetch(srcDir.url, {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OmniGraph-Studio/1.0' },
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        if (Array.isArray(subData)) {
          subDirFiles = subData.filter((item: any) => {
            if (item.type !== 'file') return false;
            const ext = '.' + (item.name.split('.').pop() || '');
            return CODE_EXTENSIONS.has(ext) && (item.size || 0) < MAX_FILE_SIZE;
          }).slice(0, MAX_FILES - codeFiles.length);
        }
      }
    } catch { /* Ignore subdirectory fetch errors */ }
  }

  const allCodeFiles = [...codeFiles, ...subDirFiles].slice(0, MAX_FILES);

  if (allCodeFiles.length === 0) {
    return NextResponse.json({
      error: 'No parseable source files found in this repository root. Try pointing to a subdirectory (e.g., /tree/main/src).',
    }, { status: 404 });
  }

  // Fetch actual file contents in parallel
  const filePromises = allCodeFiles.map(async (file: any) => {
    try {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
      const contentRes = await fetch(rawUrl, {
        headers: { 'User-Agent': 'OmniGraph-Studio/1.0' },
      });
      if (!contentRes.ok) return null;
      const content = await contentRes.text();
      return {
        name: file.name,
        path: file.path,
        content,
        size: content.length,
      };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(filePromises);
  const fetchedFiles = results.filter(Boolean);

  // Detect primary language from file extensions
  const extCount: Record<string, number> = {};
  for (const f of fetchedFiles) {
    if (!f) continue;
    const ext = f.name.split('.').pop() || '';
    extCount[ext] = (extCount[ext] || 0) + 1;
  }
  const primaryExt = Object.entries(extCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'ts';
  const languageMap: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    py: 'python', go: 'go', rs: 'rust', java: 'java',
    c: 'c', cpp: 'cpp', cs: 'csharp', rb: 'ruby', swift: 'swift', kt: 'kotlin',
  };
  const detectedLanguage = languageMap[primaryExt] || 'typescript';

  return NextResponse.json({
    status: 'success',
    repo: `${owner}/${repo}`,
    branch,
    language: detectedLanguage,
    fileCount: fetchedFiles.length,
    files: fetchedFiles,
  });
}
