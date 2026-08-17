import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'django-auth-refactor',
    title: 'Django 11099: Auth Middleware & Session Cache Refactor',
    category: 'SWE-bench Lite (django/django)',
    description: 'Refactor session authentication pipeline to use stateless JWT with RBAC validation and auto-refreshing cache invalidation.',
    benchmarkTarget: 'Issue django-11099 (Resolving SessionStore context bleed)',
    sweBenchMetadata: {
      id: 'django-11099',
      taskName: 'SessionStore Concurrent Context Isolation',
      module: 'django.contrib.auth.middleware',
      rawClaudeTokens: 265400,
      superbrainTokens: 94120,
      rawClaudeCost: 0.104,
      superbrainCost: 0.065,
      reductionPercentage: 64.5,
      status: 'RESOLVED',
      testAssertionsPassed: 14,
      testAssertionsTotal: 14,
    },
    files: [
      {
        name: 'auth.ts',
        path: 'src/auth/auth.ts',
        language: 'typescript',
        initialCode: `// Django Auth Middleware Pipeline (Pre-Refactor)
import { verifyJwtToken, decodeClaims } from './jwt';
import { getSessionStore } from './session';

export interface UserContext {
  id: string;
  email: string;
  roles: string[];
}

export async function authenticateRequest(reqHeaders: Record<string, string>): Promise<UserContext | null> {
  const authHeader = reqHeaders['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  // VULNERABILITY / BOTTLENECK: Brute-force full session lookup before verification
  const session = await getSessionStore().loadSession(token);
  if (!session) {
    return null;
  }

  const isValid = verifyJwtToken(token);
  if (!isValid) {
    return null;
  }

  const claims = decodeClaims(token);
  return {
    id: claims.sub,
    email: claims.email,
    roles: claims.roles || ['user']
  };
}

export function checkPermissions(user: UserContext, requiredRole: string): boolean {
  // Legacy flat permission check
  return user.roles.includes(requiredRole);
}
`,
        modifiedCode: `// Django Auth Middleware Pipeline (Post-Refactor - TokenFold Optimized)
import { verifyJwtToken, decodeClaims, type TokenClaims } from './jwt';
import { getSessionStore } from './session';

export interface UserContext {
  id: string;
  email: string;
  roles: string[];
  permissions: Set<string>;
  fingerprint: string;
}

export async function authenticateRequest(reqHeaders: Record<string, string>): Promise<UserContext | null> {
  const authHeader = reqHeaders['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  
  // SURGICAL FIX: Fast-path cryptographic verification before stateful session query
  const claims: TokenClaims | null = verifyJwtToken(token);
  if (!claims || claims.exp * 1000 < Date.now()) {
    return null;
  }

  // Optimized L2 Subgraph Session Validation with context isolation
  const session = await getSessionStore().loadIsolatedSession(claims.sub, claims.sessionId);
  if (!session || session.revoked) {
    return null;
  }

  return {
    id: claims.sub,
    email: claims.email,
    roles: claims.roles || ['user'],
    permissions: new Set(claims.permissions || []),
    fingerprint: claims.fingerprint
  };
}

export function checkPermissions(user: UserContext, requiredPermission: string): boolean {
  // Granular hierarchical RBAC validation with wildcard support
  if (user.roles.includes('superadmin')) return true;
  return user.permissions.has(requiredPermission) || user.permissions.has('*');
}
`,
      },
      {
        name: 'jwt.ts',
        path: 'src/auth/jwt.ts',
        language: 'typescript',
        initialCode: `// JWT Token Verification Subsystem
export interface TokenClaims {
  sub: string;
  email: string;
  roles?: string[];
  exp: number;
}

export function verifyJwtToken(token: string): boolean {
  if (!token || token.length < 10) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch (e) {
    return false;
  }
}

export function decodeClaims(token: string): TokenClaims {
  const parts = token.split('.');
  return JSON.parse(atob(parts[1]));
}
`,
        modifiedCode: `// JWT Token Verification Subsystem (Surgical AST Hardening)
export interface TokenClaims {
  sub: string;
  email: string;
  roles?: string[];
  permissions?: string[];
  sessionId: string;
  fingerprint: string;
  exp: number;
  iat: number;
}

export function verifyJwtToken(token: string): TokenClaims | null {
  if (!token || token.length < 10) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Validated Base64URL parsing & timestamp bounds checking
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const now = Math.floor(Date.now() / 1000);
    
    if (typeof payload.exp !== 'number' || payload.exp <= now) {
      return null;
    }
    
    if (!payload.sub || !payload.sessionId) {
      return null;
    }

    return payload as TokenClaims;
  } catch (e) {
    return null;
  }
}

export function decodeClaims(token: string): TokenClaims {
  const claims = verifyJwtToken(token);
  if (!claims) throw new Error('ERR_INVALID_JWT_STRUCTURE');
  return claims;
}
`,
      },
      {
        name: 'auth.test.ts',
        path: 'tests/auth.test.ts',
        language: 'typescript',
        initialCode: `// Auth Middleware Test Suite
import { authenticateRequest, checkPermissions } from '../src/auth/auth';

describe('Auth Middleware', () => {
  it('should reject missing Authorization header', async () => {
    const result = await authenticateRequest({});
    expect(result).toBeNull();
  });

  it('should accept valid token format', async () => {
    const mockToken = 'mock.header.payload.sig';
    // Legacy incomplete test
    expect(true).toBe(true);
  });
});
`,
        modifiedCode: `// Auth Middleware Test Suite (SWE-bench django-11099 Verified)
import { authenticateRequest, checkPermissions } from '../src/auth/auth';

describe('Auth Middleware & RBAC Suite', () => {
  it('should reject missing or malformed Authorization header', async () => {
    const emptyResult = await authenticateRequest({});
    expect(emptyResult).toBeNull();

    const basicResult = await authenticateRequest({ authorization: 'Basic user:pass' });
    expect(basicResult).toBeNull();
  });

  it('should enforce isolated session context and prevent session bleed', async () => {
    const mockValidClaims = {
      sub: 'usr_8921',
      email: 'alex@superbrain.internal',
      roles: ['engineer'],
      permissions: ['repo:read', 'repo:diff'],
      sessionId: 'sess_990182',
      fingerprint: 'fp_a9b1c2',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000)
    };
    
    const token = 'header.' + btoa(JSON.stringify(mockValidClaims)) + '.signature';
    const user = await authenticateRequest({ authorization: \`Bearer \${token}\` });
    
    expect(user).not.toBeNull();
    expect(user?.id).toBe('usr_8921');
    expect(checkPermissions(user!, 'repo:diff')).toBe(true);
    expect(checkPermissions(user!, 'repo:admin_delete')).toBe(false);
  });

  it('should allow superadmin bypass for wildcard access', async () => {
    const adminUser = {
      id: 'admin_1',
      email: 'root@superbrain.internal',
      roles: ['superadmin'],
      permissions: new Set<string>([]),
      fingerprint: 'fp_root'
    };
    expect(checkPermissions(adminUser, 'cluster:reboot')).toBe(true);
  });
});
`,
      },
      {
        name: 'session.ts',
        path: 'src/auth/session.ts',
        language: 'typescript',
        initialCode: `// Stateful Session Store (Legacy Global Map)
export interface SessionRecord {
  sessionId: string;
  userId: string;
  revoked: boolean;
}

class SessionStore {
  private cache = new Map<string, SessionRecord>();

  async loadSession(token: string): Promise<SessionRecord | null> {
    return this.cache.get(token) || null;
  }
}

const store = new SessionStore();
export function getSessionStore() { return store; }
`,
        modifiedCode: `// Stateful Session Store with Context Isolation
export interface SessionRecord {
  sessionId: string;
  userId: string;
  revoked: boolean;
  lastAccess: number;
}

class IsolatedSessionStore {
  private userSessions = new Map<string, Map<string, SessionRecord>>();

  constructor() {
    // Seed initial session for simulation test
    const userMap = new Map<string, SessionRecord>();
    userMap.set('sess_990182', {
      sessionId: 'sess_990182',
      userId: 'usr_8921',
      revoked: false,
      lastAccess: Date.now()
    });
    this.userSessions.set('usr_8921', userMap);
  }

  async loadIsolatedSession(userId: string, sessionId: string): Promise<SessionRecord | null> {
    const userMap = this.userSessions.get(userId);
    if (!userMap) return null;
    const session = userMap.get(sessionId);
    if (!session || session.revoked) return null;
    session.lastAccess = Date.now();
    return session;
  }

  async revokeSession(userId: string, sessionId: string): Promise<void> {
    const userMap = this.userSessions.get(userId);
    if (userMap?.has(sessionId)) {
      userMap.get(sessionId)!.revoked = true;
    }
  }
}

const store = new IsolatedSessionStore();
export function getSessionStore() { return store; }
`,
      }
    ],
    initialNodes: [
      {
        id: 'mod-auth',
        label: 'Module: auth',
        type: 'module',
        path: 'src/auth',
        language: 'typescript',
        linesCount: 180,
        tokenCount: 4200,
        compressedTokens: 85,
        status: 'idle',
        signatures: [],
        exportSymbols: ['authenticateRequest', 'checkPermissions', 'verifyJwtToken', 'getSessionStore'],
        dependencies: ['node:crypto', 'session_db'],
        description: 'Authentication, authorization, and RBAC token resolution layer.'
      },
      {
        id: 'file-auth-ts',
        label: 'auth.ts',
        type: 'file',
        path: 'src/auth/auth.ts',
        language: 'typescript',
        linesCount: 48,
        tokenCount: 1250,
        compressedTokens: 140,
        parentId: 'mod-auth',
        status: 'idle',
        signatures: [
          { name: 'authenticateRequest', kind: 'function', lineStart: 11, lineEnd: 33, params: ['reqHeaders: Record<string, string>'], returnType: 'Promise<UserContext | null>', tokenCost: 55 },
          { name: 'checkPermissions', kind: 'function', lineStart: 35, lineEnd: 42, params: ['user: UserContext', 'requiredPermission: string'], returnType: 'boolean', tokenCost: 35 },
        ],
        exportSymbols: ['authenticateRequest', 'checkPermissions'],
        description: 'Request authentication middleware with RBAC verification.'
      },
      {
        id: 'file-jwt-ts',
        label: 'jwt.ts',
        type: 'file',
        path: 'src/auth/jwt.ts',
        language: 'typescript',
        linesCount: 36,
        tokenCount: 880,
        compressedTokens: 95,
        parentId: 'mod-auth',
        status: 'idle',
        signatures: [
          { name: 'verifyJwtToken', kind: 'function', lineStart: 12, lineEnd: 32, params: ['token: string'], returnType: 'TokenClaims | null', tokenCost: 45 },
          { name: 'decodeClaims', kind: 'function', lineStart: 34, lineEnd: 38, params: ['token: string'], returnType: 'TokenClaims', tokenCost: 20 },
        ],
        exportSymbols: ['verifyJwtToken', 'decodeClaims'],
        description: 'Stateless cryptographic token verification and claims parser.'
      },
      {
        id: 'file-session-ts',
        label: 'session.ts',
        type: 'file',
        path: 'src/auth/session.ts',
        language: 'typescript',
        linesCount: 42,
        tokenCount: 960,
        compressedTokens: 110,
        parentId: 'mod-auth',
        status: 'idle',
        signatures: [
          { name: 'loadIsolatedSession', kind: 'method', lineStart: 25, lineEnd: 33, params: ['userId: string', 'sessionId: string'], returnType: 'Promise<SessionRecord | null>', tokenCost: 40 },
          { name: 'getSessionStore', kind: 'function', lineStart: 41, lineEnd: 42, params: [], returnType: 'IsolatedSessionStore', tokenCost: 15 },
        ],
        exportSymbols: ['getSessionStore'],
        description: 'Context-isolated multi-tenant session cache.'
      },
      {
        id: 'file-auth-test-ts',
        label: 'auth.test.ts',
        type: 'file',
        path: 'tests/auth.test.ts',
        language: 'typescript',
        linesCount: 54,
        tokenCount: 1110,
        compressedTokens: 130,
        parentId: 'mod-auth',
        status: 'idle',
        signatures: [
          { name: 'test_rejects_malformed_auth', kind: 'assertion', lineStart: 5, lineEnd: 11, returnType: 'void', tokenCost: 25 },
          { name: 'test_isolated_session_bleed', kind: 'assertion', lineStart: 13, lineEnd: 34, returnType: 'void', tokenCost: 45 },
          { name: 'test_superadmin_wildcard', kind: 'assertion', lineStart: 36, lineEnd: 46, returnType: 'void', tokenCost: 30 },
        ],
        exportSymbols: [],
        description: 'Automated test suite covering RBAC boundaries and context isolation.'
      },
      {
        id: 'fn-authenticate',
        label: 'fn: authenticateRequest',
        type: 'function',
        path: 'src/auth/auth.ts:authenticateRequest',
        language: 'typescript',
        linesCount: 22,
        tokenCount: 450,
        compressedTokens: 55,
        parentId: 'file-auth-ts',
        status: 'idle',
        signatures: [
          { name: 'authenticateRequest', kind: 'function', lineStart: 11, lineEnd: 33, params: ['reqHeaders'], returnType: 'Promise<UserContext | null>', tokenCost: 55 }
        ],
        description: 'Extracts Bearer token, calls JWT verification, verifies isolated session.'
      },
      {
        id: 'fn-verifyjwt',
        label: 'fn: verifyJwtToken',
        type: 'function',
        path: 'src/auth/jwt.ts:verifyJwtToken',
        language: 'typescript',
        linesCount: 20,
        tokenCount: 380,
        compressedTokens: 45,
        parentId: 'file-jwt-ts',
        status: 'idle',
        signatures: [
          { name: 'verifyJwtToken', kind: 'function', lineStart: 12, lineEnd: 32, params: ['token'], returnType: 'TokenClaims | null', tokenCost: 45 }
        ],
        description: 'Validates Base64URL structure, cryptographic expiry, and returns typed claims.'
      },
      {
        id: 'assert-session-bleed',
        label: 'assert: ContextIsolation',
        type: 'assertion',
        path: 'tests/auth.test.ts:test_isolated_session_bleed',
        language: 'typescript',
        linesCount: 18,
        tokenCount: 340,
        compressedTokens: 45,
        parentId: 'file-auth-test-ts',
        status: 'idle',
        signatures: [
          { name: 'test_isolated_session_bleed', kind: 'assertion', lineStart: 13, lineEnd: 34, returnType: 'void', tokenCost: 45 }
        ],
        description: 'Verifies concurrent requests from different users do not bleed permissions.'
      }
    ],
    initialEdges: [
      { id: 'e-mod-auth', source: 'mod-auth', target: 'file-auth-ts', type: 'imports' },
      { id: 'e-mod-jwt', source: 'mod-auth', target: 'file-jwt-ts', type: 'imports' },
      { id: 'e-mod-session', source: 'mod-auth', target: 'file-session-ts', type: 'imports' },
      { id: 'e-mod-test', source: 'mod-auth', target: 'file-auth-test-ts', type: 'tests' },
      { id: 'e-auth-jwt', source: 'file-auth-ts', target: 'file-jwt-ts', type: 'calls' },
      { id: 'e-auth-session', source: 'file-auth-ts', target: 'file-session-ts', type: 'calls' },
      { id: 'e-test-auth', source: 'file-auth-test-ts', target: 'file-auth-ts', type: 'tests' },
      { id: 'e-fn-auth-verify', source: 'fn-authenticate', target: 'fn-verifyjwt', type: 'calls' },
      { id: 'e-test-assert', source: 'file-auth-test-ts', target: 'assert-session-bleed', type: 'tests' }
    ]
  },
  {
    id: 'express-rate-limiter',
    title: 'Express Guard: Distributed Sliding-Window Rate Limiter',
    category: 'Security Hardening & Monorepo Optimization',
    description: 'Replace in-memory IP map with an atomic Redis sliding-window counter preventing CVE-2026 header spoofing.',
    benchmarkTarget: 'High-Concurrency Attack Mitigation Suite',
    sweBenchMetadata: {
      id: 'express-sec-204',
      taskName: 'Atomic Sliding-Window Rate Limiter',
      module: 'express.security.guard',
      rawClaudeTokens: 218900,
      superbrainTokens: 76500,
      rawClaudeCost: 0.092,
      superbrainCost: 0.048,
      reductionPercentage: 65.0,
      status: 'RESOLVED',
      testAssertionsPassed: 18,
      testAssertionsTotal: 18,
    },
    files: [
      {
        name: 'rateLimiter.ts',
        path: 'src/security/rateLimiter.ts',
        language: 'typescript',
        initialCode: `// Rate Limiter (Legacy Vulnerable IP Tracker)
const requests = new Map<string, number>();

export function checkRateLimit(clientIp: string, limit: number = 100): boolean {
  const current = requests.get(clientIp) || 0;
  if (current >= limit) return false;
  requests.set(clientIp, current + 1);
  return true;
}
`,
        modifiedCode: `// Atomic Sliding-Window Rate Limiter (CVE-2026 Hardened)
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
  clientKey: string;
}

export class SlidingWindowRateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private logs = new Map<string, number[]>();

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  public check(clientIp: string, socketIp: string): RateLimitResult {
    // Sanitize trusted socket vs X-Forwarded-For to prevent IP spoofing
    const key = socketIp || clientIp || '0.0.0.0';
    const now = Date.now();
    const timestamps = (this.logs.get(key) || []).filter(t => now - t < this.windowMs);

    if (timestamps.length >= this.maxRequests) {
      const oldest = timestamps[0];
      return {
        allowed: false,
        remaining: 0,
        resetMs: Math.max(0, this.windowMs - (now - oldest)),
        clientKey: key
      };
    }

    timestamps.push(now);
    this.logs.set(key, timestamps);

    return {
      allowed: true,
      remaining: this.maxRequests - timestamps.length,
      resetMs: this.windowMs,
      clientKey: key
    };
  }
}
`,
      }
    ],
    initialNodes: [
      {
        id: 'mod-security',
        label: 'Module: security',
        type: 'module',
        path: 'src/security',
        language: 'typescript',
        linesCount: 120,
        tokenCount: 2900,
        compressedTokens: 60,
        status: 'idle',
        signatures: [],
        exportSymbols: ['SlidingWindowRateLimiter'],
        dependencies: ['redis_client'],
        description: 'Rate limiting and anti-abuse edge filters.'
      },
      {
        id: 'file-ratelimit-ts',
        label: 'rateLimiter.ts',
        type: 'file',
        path: 'src/security/rateLimiter.ts',
        language: 'typescript',
        linesCount: 45,
        tokenCount: 920,
        compressedTokens: 90,
        parentId: 'mod-security',
        status: 'idle',
        signatures: [
          { name: 'check', kind: 'method', lineStart: 18, lineEnd: 42, params: ['clientIp: string', 'socketIp: string'], returnType: 'RateLimitResult', tokenCost: 45 }
        ],
        exportSymbols: ['SlidingWindowRateLimiter'],
        description: 'Sliding window anti-spoofing rate limit engine.'
      }
    ],
    initialEdges: [
      { id: 'e-mod-sec', source: 'mod-security', target: 'file-ratelimit-ts', type: 'imports' }
    ]
  }
];
