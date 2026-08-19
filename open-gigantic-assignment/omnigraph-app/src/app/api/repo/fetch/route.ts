import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Enterprise GitHub Repository Ingestion Engine
 * - Action 'scan': Returns the full recursive git tree with file sizes & structure.
 * - Action 'fetch' (or default): Downloads selected or prioritized source files in parallel.
 * - Action 'preview': Fetches preview content for a single selected file.
 */

const CODE_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java',
  '.c', '.cpp', '.h', '.cs', '.rb', '.swift', '.kt', '.scala',
  '.vue', '.svelte', '.astro', '.php', '.json', '.md', '.yaml', '.yml',
]);

const IGNORED_PATHS = [
  'node_modules/', '.git/', 'dist/', 'build/', '.next/', 'coverage/',
  'vendor/', '__pycache__/', '.venv/', 'venv/', '.vscode/', '.idea/',
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'Cargo.lock',
];

const MAX_DOWNLOAD_FILES = 40; // Download up to 40 primary source files for AST parsing
const MAX_FILE_SIZE = 95000; // 95KB per file

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { repoUrl, action = 'fetch', selectedPaths = [], previewPath, branchOverride } = body;

    if (!repoUrl || typeof repoUrl !== 'string') {
      return NextResponse.json({ error: 'Missing repository URL' }, { status: 400 });
    }

    // Parse GitHub URL: https://github.com/owner/repo
    const urlMatch = repoUrl.match(
      /github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/tree\/([^/]+)(?:\/(.+))?)?$/
    );
    if (!urlMatch) {
      return NextResponse.json({
        error: 'Invalid GitHub URL format. Expected: https://github.com/owner/repo',
      }, { status: 400 });
    }

    const owner = urlMatch[1];
    const repo = urlMatch[2];
    let branch = branchOverride || urlMatch[3] || 'main';

    // 1. Fetch Repository Metadata for default branch & stars
    const repoMetaRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OmniGraph-Studio/1.0',
      },
    });

    let repoMeta: any = {};
    if (repoMetaRes.ok) {
      repoMeta = await repoMetaRes.json();
      if (!branchOverride && !urlMatch[3] && repoMeta.default_branch) {
        branch = repoMeta.default_branch;
      }
    } else if (repoMetaRes.status === 404) {
      return NextResponse.json({
        error: `Repository ${owner}/${repo} not found. Ensure the repository is PUBLIC.`,
      }, { status: 404 });
    } else if (repoMetaRes.status === 403) {
      return NextResponse.json({
        error: 'GitHub API rate limit exceeded. Please try again in a minute or use the "Paste Code" tab.',
      }, { status: 429 });
    }

    // 2. Fetch Single File Preview if action === 'preview'
    if (action === 'preview' && previewPath) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${previewPath}`;
      const previewRes = await fetch(rawUrl, {
        headers: { 'User-Agent': 'OmniGraph-Studio/1.0' },
      });
      if (!previewRes.ok) {
        return NextResponse.json({ error: 'Could not fetch file preview' }, { status: 404 });
      }
      const previewContent = await previewRes.text();
      return NextResponse.json({
        path: previewPath,
        content: previewContent.slice(0, 5000), // First 5KB for fast preview
      });
    }

    // 3. Query GitHub Recursive Git Tree API (?recursive=1)
    let treeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'OmniGraph-Studio/1.0',
        },
      }
    );

    // Fallback to 'master' if 'main' fails
    if (!treeRes.ok && branch === 'main') {
      branch = 'master';
      treeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'OmniGraph-Studio/1.0',
          },
        }
      );
    }

    if (!treeRes.ok) {
      const errText = await treeRes.text();
      return NextResponse.json({
        error: `Could not retrieve file tree for ${owner}/${repo} (${branch}): ${errText.slice(0, 150)}`,
      }, { status: treeRes.status });
    }

    const treeData = await treeRes.json();
    const treeItems: any[] = treeData.tree || [];

    // Filter valid source code files across the whole repo
    const eligibleFiles = treeItems.filter((item: any) => {
      if (item.type !== 'blob') return false;
      const path: string = item.path;

      if (IGNORED_PATHS.some((ignored) => path.includes(ignored))) return false;

      const ext = '.' + (path.split('.').pop() || '').toLowerCase();
      if (!CODE_EXTENSIONS.has(ext)) return false;

      if (item.size && item.size > MAX_FILE_SIZE) return false;

      return true;
    });

    // Detect language
    const extCount: Record<string, number> = {};
    for (const f of eligibleFiles) {
      const ext = (f.path.split('.').pop() || '').toLowerCase();
      extCount[ext] = (extCount[ext] || 0) + 1;
    }
    const primaryExt = Object.entries(extCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'ts';
    const languageMap: Record<string, string> = {
      ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
      py: 'python', go: 'go', rs: 'rust', java: 'java',
      c: 'c', cpp: 'cpp', cs: 'csharp', rb: 'ruby', swift: 'swift', kt: 'kotlin',
    };
    const detectedLanguage = languageMap[primaryExt] || 'typescript';

    // 4. ACTION === 'scan': Return only the tree for the interactive tree browser
    if (action === 'scan') {
      return NextResponse.json({
        status: 'success',
        repo: `${owner}/${repo}`,
        branch,
        stars: repoMeta.stargazers_count || 0,
        description: repoMeta.description || '',
        totalTreeFiles: treeItems.length,
        eligibleCodeFiles: eligibleFiles.length,
        language: detectedLanguage,
        tree: eligibleFiles.map((item: any) => ({
          path: item.path,
          size: item.size || 0,
          isEntry: /^(src\/)?(main|index|app|server)\.[a-z]+$/i.test(item.path),
        })),
      });
    }

    // 5. ACTION === 'fetch': Download source code in parallel
    let filesToDownload = eligibleFiles;
    if (Array.isArray(selectedPaths) && selectedPaths.length > 0) {
      const selectedSet = new Set(selectedPaths);
      filesToDownload = eligibleFiles.filter((f: any) => selectedSet.has(f.path));
    } else {
      // Prioritize src/ & lib/
      filesToDownload = eligibleFiles.sort((a: any, b: any) => {
        const scoreA = a.path.startsWith('src/') || a.path.startsWith('lib/') ? 2 : 1;
        const scoreB = b.path.startsWith('src/') || b.path.startsWith('lib/') ? 2 : 1;
        return scoreB - scoreA;
      }).slice(0, MAX_DOWNLOAD_FILES);
    }

    const downloadPromises = filesToDownload.map(async (file: any) => {
      try {
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;
        const contentRes = await fetch(rawUrl, {
          headers: { 'User-Agent': 'OmniGraph-Studio/1.0' },
        });
        if (!contentRes.ok) {
          throw new Error(`GitHub raw fetch failed: ${contentRes.status} ${contentRes.statusText}`);
        }
        const content = await contentRes.text();
        return {
          name: file.path.split('/').pop() || file.path,
          path: file.path,
          content,
          size: content.length,
        };
      } catch (e: any) {
        return { error: e.message, path: file.path };
      }
    });

    const downloadedResults = await Promise.all(downloadPromises);
    const validFiles = downloadedResults.filter((f): f is { name: string; path: string; content: string; size: number } => !('error' in f));
    const failedFiles = downloadedResults.filter((f): f is { error: string; path: string } => 'error' in f);
    
    if (validFiles.length === 0 && failedFiles.length > 0) {
      return NextResponse.json({
        error: `Failed to download any files: ${failedFiles.map(f => `${f.path}: ${f.error}`).join('; ')}`,
      }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      repo: `${owner}/${repo}`,
      branch,
      totalTreeFiles: treeItems.length,
      eligibleCodeFiles: eligibleFiles.length,
      downloadedFilesCount: validFiles.length,
      language: detectedLanguage,
      files: validFiles,
    });
  } catch (err) {
    return NextResponse.json({
      error: `Server failed to process repository: ${String(err)}`,
    }, { status: 500 });
  }
}
