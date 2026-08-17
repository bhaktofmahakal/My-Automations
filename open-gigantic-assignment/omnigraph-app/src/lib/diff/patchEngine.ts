import { DiffHunk, HunkLine } from '../types';

export function parseCodeToHunks(
  filename: string,
  originalCode: string,
  modifiedCode: string
): DiffHunk[] {
  const originalLines = originalCode.split('\n');
  const modifiedLines = modifiedCode.split('\n');

  const hunks: DiffHunk[] = [];
  let oldIdx = 0;
  let newIdx = 0;
  let hunkCounter = 1;

  // Simple and clean hunk extraction for demo & interactive diffing
  if (filename === 'auth.ts') {
    hunks.push({
      id: `hunk-${filename}-1`,
      file: filename,
      oldStart: 4,
      oldLines: 6,
      newStart: 4,
      newLines: 8,
      header: '@@ -4,6 +4,8 @@ export interface UserContext',
      lines: [
        { type: 'context', content: 'export interface UserContext {', oldLineNo: 4, newLineNo: 4 },
        { type: 'context', content: '  id: string;', oldLineNo: 5, newLineNo: 5 },
        { type: 'context', content: '  email: string;', oldLineNo: 6, newLineNo: 6 },
        { type: 'context', content: '  roles: string[];', oldLineNo: 7, newLineNo: 7 },
        { type: 'addition', content: '+  permissions: Set<string>;', newLineNo: 8 },
        { type: 'addition', content: '+  fingerprint: string;', newLineNo: 9 },
        { type: 'context', content: '}', oldLineNo: 8, newLineNo: 10 },
      ],
      status: 'pending',
      explanation: 'Adds strongly-typed RBAC permissions Set and session fingerprint to UserContext.',
      astNodeId: 'file-auth-ts'
    });

    hunks.push({
      id: `hunk-${filename}-2`,
      file: filename,
      oldStart: 18,
      oldLines: 15,
      newStart: 20,
      newLines: 16,
      header: '@@ -18,15 +20,16 @@ export async function authenticateRequest',
      lines: [
        { type: 'deletion', content: '-  const session = await getSessionStore().loadSession(token);', oldLineNo: 18 },
        { type: 'deletion', content: '-  if (!session) { return null; }', oldLineNo: 19 },
        { type: 'deletion', content: '-  const isValid = verifyJwtToken(token);', oldLineNo: 20 },
        { type: 'addition', content: '+  // SURGICAL FIX: Fast-path cryptographic verification before stateful session query', newLineNo: 20 },
        { type: 'addition', content: '+  const claims: TokenClaims | null = verifyJwtToken(token);', newLineNo: 21 },
        { type: 'addition', content: '+  if (!claims || claims.exp * 1000 < Date.now()) { return null; }', newLineNo: 22 },
        { type: 'addition', content: '+  const session = await getSessionStore().loadIsolatedSession(claims.sub, claims.sessionId);', newLineNo: 23 },
        { type: 'addition', content: '+  if (!session || session.revoked) { return null; }', newLineNo: 24 },
      ],
      status: 'pending',
      explanation: 'Fixes session context bleed (django-11099) by validating JWT cryptographic expiry first and scoping session cache by userId and sessionId.',
      astNodeId: 'fn-authenticate'
    });

    hunks.push({
      id: `hunk-${filename}-3`,
      file: filename,
      oldStart: 35,
      oldLines: 5,
      newStart: 38,
      newLines: 6,
      header: '@@ -35,5 +38,6 @@ export function checkPermissions',
      lines: [
        { type: 'deletion', content: '-  return user.roles.includes(requiredRole);', oldLineNo: 36 },
        { type: 'addition', content: '+  if (user.roles.includes("superadmin")) return true;', newLineNo: 39 },
        { type: 'addition', content: '+  return user.permissions.has(requiredPermission) || user.permissions.has("*");', newLineNo: 40 },
      ],
      status: 'pending',
      explanation: 'Enforces fine-grained permission resolution and wildcard permissions bypass.',
      astNodeId: 'file-auth-ts'
    });
  } else if (filename === 'jwt.ts') {
    hunks.push({
      id: `hunk-${filename}-1`,
      file: filename,
      oldStart: 12,
      oldLines: 12,
      newStart: 15,
      newLines: 18,
      header: '@@ -12,12 +15,18 @@ export function verifyJwtToken',
      lines: [
        { type: 'deletion', content: '-export function verifyJwtToken(token: string): boolean {', oldLineNo: 12 },
        { type: 'addition', content: '+export function verifyJwtToken(token: string): TokenClaims | null {', newLineNo: 15 },
        { type: 'context', content: '   if (!token || token.length < 10) return null;', oldLineNo: 13, newLineNo: 16 },
        { type: 'addition', content: '+  // Validated Base64URL parsing & timestamp bounds checking', newLineNo: 17 },
        { type: 'addition', content: '+  const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));', newLineNo: 18 },
        { type: 'addition', content: '+  if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return null;', newLineNo: 19 },
      ],
      status: 'pending',
      explanation: 'Hardens Base64URL decoding against malformed payloads and returns verified typed TokenClaims.',
      astNodeId: 'fn-verifyjwt'
    });
  } else {
    // Generic single hunk
    hunks.push({
      id: `hunk-${filename}-1`,
      file: filename,
      oldStart: 1,
      oldLines: originalLines.length,
      newStart: 1,
      newLines: modifiedLines.length,
      header: `@@ -1,${originalLines.length} +1,${modifiedLines.length} @@`,
      lines: [
        ...originalLines.slice(0, 3).map((l, i) => ({ type: 'deletion' as const, content: '-' + l, oldLineNo: i + 1 })),
        ...modifiedLines.slice(0, 5).map((l, i) => ({ type: 'addition' as const, content: '+' + l, newLineNo: i + 1 })),
      ],
      status: 'pending',
      explanation: 'Updates implementation with AST-optimized primitives.',
      astNodeId: 'file-' + filename.replace('.', '-')
    });
  }

  return hunks;
}

export function computePatchHash(hunks: DiffHunk[]): string {
  const content = hunks.map(h => `${h.id}:${h.status}:${h.header}`).join('::');
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'patch_0x' + Math.abs(hash).toString(16).padStart(8, '0');
}
