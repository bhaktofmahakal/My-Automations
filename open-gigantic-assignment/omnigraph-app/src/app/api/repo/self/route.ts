import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { generateCustomScenario } from '@/lib/graph/ogParser';
import { Scenario } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Self-Ingest Route.
 *
 * Reads the app's own real source tree (src/) from disk, parses each file
 * through the real AST parsers, and returns a live scenario of OmniGraph Studio
 * itself. This replaces the old hardcoded sample codebases with real content.
 */

const ALLOWED_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs', '.java']);
const SKIP_DIRS = new Set([
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  '.vercel',
  '.turbo',
  'coverage',
  'out',
]);
const MAX_FILES = 40;
const MAX_BYTES = 95 * 1024;
const MAX_DEPTH = 6;

interface CollectedFile {
  name: string;
  path: string;
  content: string;
}

async function collectFiles(dir: string, out: CollectedFile[], depth = 0): Promise<void> {
  if (out.length >= MAX_FILES || depth > MAX_DEPTH) return;

  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  // Deterministic ordering: directories first, then files, alphabetical
  entries.sort((a, b) => {
    const aDir = a.isDirectory() ? 0 : 1;
    const bDir = b.isDirectory() ? 0 : 1;
    if (aDir !== bDir) return aDir - bDir;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (out.length >= MAX_FILES) return;

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      await collectFiles(path.join(dir, entry.name), out, depth + 1);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (!ALLOWED_EXTS.has(ext)) continue;

      const fullPath = path.join(dir, entry.name);
      let stat;
      try {
        stat = await fs.stat(fullPath);
      } catch {
        continue;
      }
      if (stat.size > MAX_BYTES) continue;

      let content: string;
      try {
        content = await fs.readFile(fullPath, 'utf8');
      } catch {
        continue;
      }

      const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
      out.push({ name: entry.name, path: relPath, content });
    }
  }
}

export async function POST() {
  try {
    const srcRoot = path.join(process.cwd(), 'src');
    const files: CollectedFile[] = [];
    await collectFiles(srcRoot, files);

    if (files.length === 0) {
      return NextResponse.json(
        { status: 'error', message: 'No source files found to self-ingest.' },
        { status: 404 }
      );
    }

    const scenario: Scenario = generateCustomScenario({
      repoName: 'omnigraph-app',
      language: 'typescript',
      issueDescription: 'Self-ingested live source tree of OmniGraph Studio',
      files,
    }) as Scenario;

    return NextResponse.json({
      status: 'success',
      ingestedFiles: files.length,
      scenario,
    });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'error', message: err.message || 'Self-ingest failed' },
      { status: 500 }
    );
  }
}