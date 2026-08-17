import { AgentRoleId, PSMASAgent, TerminalLogEntry } from '../types';

export const INITIAL_AGENTS: PSMASAgent[] = [
  {
    id: 'architect',
    name: 'Architect Agent',
    role: 'System Architecture & Subgraph Discovery',
    theta: 0, // 0 rad / 0 deg
    color: '#38BDF8', // Cyan
    accentColor: 'rgba(56, 189, 248, 0.2)',
    status: 'idle',
    activeTokens: 0,
    compressedMemorySize: 64,
    avatarIcon: 'Compass',
    currentTask: 'Waiting for task prompt'
  },
  {
    id: 'codewriter',
    name: 'CodeWriter Agent',
    role: 'Surgical AST Patch Implementation',
    theta: Math.PI / 2, // pi/2 rad / 90 deg
    color: '#34D399', // Emerald
    accentColor: 'rgba(52, 211, 153, 0.2)',
    status: 'idle',
    activeTokens: 0,
    compressedMemorySize: 85,
    avatarIcon: 'Code2',
    currentTask: 'Awaiting architectural plan'
  },
  {
    id: 'testrunner',
    name: 'TestRunner Agent',
    role: 'Automated Assertion & SWE-bench Grader',
    theta: Math.PI, // pi rad / 180 deg
    color: '#FBBF24', // Amber
    accentColor: 'rgba(251, 191, 36, 0.2)',
    status: 'idle',
    activeTokens: 0,
    compressedMemorySize: 48,
    avatarIcon: 'FlaskConical',
    currentTask: 'Awaiting code patch verification'
  },
  {
    id: 'security',
    name: 'SecurityReviewer Agent',
    role: 'Vulnerability Audit & RBAC Validator',
    theta: (3 * Math.PI) / 2, // 3pi/2 rad / 270 deg
    color: '#F43F5E', // Rose
    accentColor: 'rgba(244, 63, 94, 0.2)',
    status: 'idle',
    activeTokens: 0,
    compressedMemorySize: 52,
    avatarIcon: 'ShieldCheck',
    currentTask: 'Awaiting patch security validation'
  }
];

export interface AgentExecutionStep {
  agentId: AgentRoleId;
  targetAngle: number; // In radians
  angleDeg: number;
  durationMs: number;
  logs: {
    level: TerminalLogEntry['level'];
    message: string;
    codeSnippet?: string;
    tokenDelta: number;
    subgraphNodeId?: string;
  }[];
  compressedHandoff: {
    summary: string;
    compressionRatio: string;
    targetAgents: AgentRoleId[];
  };
  nodeStatusUpdates?: { nodeId: string; status: 'scanning' | 'traversed' | 'modified' | 'tested' | 'verified' }[];
  highlightEdgeIds?: string[];
  activeFileTab?: string;
}

export const DJANGO_SCENARIO_STEPS: AgentExecutionStep[] = [
  {
    agentId: 'architect',
    targetAngle: 0,
    angleDeg: 0,
    durationMs: 1800,
    logs: [
      {
        level: 'info',
        message: 'Initializing PSMAS angular sweep (phi = 0.00 rad). Activating Architect Agent.',
        tokenDelta: 120
      },
      {
        level: 'traversal',
        message: 'ObjectGraph Query: Ingesting repository topology for issue django-11099...',
        subgraphNodeId: 'mod-auth',
        tokenDelta: 85
      },
      {
        level: 'reasoning',
        message: 'Identified concurrency bleed in session.ts: SessionStore loads global un-isolated session before JWT claims verification.',
        tokenDelta: 140
      },
      {
        level: 'info',
        message: 'Plan established: 1) Fast-path verifyJwtToken in auth.ts 2) Refactor loadSession -> loadIsolatedSession 3) Assert RBAC wildcard rules.',
        tokenDelta: 95
      }
    ],
    compressedHandoff: {
      summary: 'PLAN: Fast-path JWT check in auth.ts + IsolatedSessionStore in session.ts. Affected AST: [auth.ts:authenticateRequest, jwt.ts:verifyJwtToken].',
      compressionRatio: '96.2% (148 tokens vs 3,920 raw tokens)',
      targetAgents: ['codewriter', 'testrunner', 'security']
    },
    nodeStatusUpdates: [
      { nodeId: 'mod-auth', status: 'scanning' },
      { nodeId: 'file-auth-ts', status: 'traversed' },
      { nodeId: 'file-jwt-ts', status: 'traversed' }
    ],
    highlightEdgeIds: ['e-mod-auth', 'e-auth-jwt'],
    activeFileTab: 'auth.ts'
  },
  {
    agentId: 'codewriter',
    targetAngle: Math.PI / 2,
    angleDeg: 90,
    durationMs: 2200,
    logs: [
      {
        level: 'info',
        message: 'Phase rotation phi -> pi/2 (90 deg). CodeWriter Agent engaged.',
        tokenDelta: 90
      },
      {
        level: 'reasoning',
        message: 'Injecting surgical patch on AST Node fn: authenticateRequest (auth.ts:11-33)...',
        subgraphNodeId: 'fn-authenticate',
        tokenDelta: 160
      },
      {
        level: 'patch',
        message: 'Generated Hunk #1: Replaced synchronous session pre-fetch with token fingerprint validation & claims expiration gate.',
        codeSnippet: `const claims = verifyJwtToken(token);\nif (!claims || claims.exp * 1000 < Date.now()) return null;\nconst session = await getSessionStore().loadIsolatedSession(claims.sub, claims.sessionId);`,
        tokenDelta: 210
      },
      {
        level: 'patch',
        message: 'Generated Hunk #2 (jwt.ts): Hardened Base64URL decoding with sanitization regex and timestamp bounds.',
        subgraphNodeId: 'fn-verifyjwt',
        tokenDelta: 175
      }
    ],
    compressedHandoff: {
      summary: 'DIFF_BUFFERED: 3 hunks across auth.ts, jwt.ts, session.ts. Zero breaking API changes. Pending human approval.',
      compressionRatio: '94.8% (190 tokens vs 3,650 raw tokens)',
      targetAgents: ['testrunner', 'security']
    },
    nodeStatusUpdates: [
      { nodeId: 'file-auth-ts', status: 'modified' },
      { nodeId: 'fn-authenticate', status: 'modified' },
      { nodeId: 'file-jwt-ts', status: 'modified' }
    ],
    highlightEdgeIds: ['e-auth-session', 'e-fn-auth-verify'],
    activeFileTab: 'auth.ts'
  },
  {
    agentId: 'testrunner',
    targetAngle: Math.PI,
    angleDeg: 180,
    durationMs: 2000,
    logs: [
      {
        level: 'info',
        message: 'Phase rotation phi -> pi (180 deg). TestRunner Agent engaged.',
        tokenDelta: 75
      },
      {
        level: 'test',
        message: 'Synthesizing assertion harness for tests/auth.test.ts (django-11099 test fixture)...',
        subgraphNodeId: 'file-auth-test-ts',
        tokenDelta: 130
      },
      {
        level: 'test',
        message: 'Executing SWE-bench Lite unit test suite against patched AST nodes...',
        tokenDelta: 90
      },
      {
        level: 'success',
        message: 'PASSED: test_rejects_malformed_auth (4ms)\nPASSED: test_isolated_session_bleed (12ms)\nPASSED: test_superadmin_wildcard (3ms)',
        tokenDelta: 60
      },
      {
        level: 'success',
        message: 'SWE-bench Evaluation: 14/14 test assertions passed (100% resolve rate). Zero regressions.',
        tokenDelta: 45
      }
    ],
    compressedHandoff: {
      summary: 'TEST_REPORT: 14/14 passed. All concurrency edge cases validated.',
      compressionRatio: '97.5% (80 tokens vs 3,200 raw test traces)',
      targetAgents: ['security', 'architect']
    },
    nodeStatusUpdates: [
      { nodeId: 'file-auth-test-ts', status: 'tested' },
      { nodeId: 'assert-session-bleed', status: 'verified' }
    ],
    highlightEdgeIds: ['e-test-auth', 'e-test-assert'],
    activeFileTab: 'auth.test.ts'
  },
  {
    agentId: 'security',
    targetAngle: (3 * Math.PI) / 2,
    angleDeg: 270,
    durationMs: 1800,
    logs: [
      {
        level: 'info',
        message: 'Phase rotation phi -> 3pi/2 (270 deg). SecurityReviewer Agent engaged.',
        tokenDelta: 65
      },
      {
        level: 'security',
        message: 'Running AST vulnerability scan on pending diffs (OWASP A01:2021 Broken Access Control & CWE-287)...',
        tokenDelta: 110
      },
      {
        level: 'security',
        message: 'AUDIT PASS: Cryptographic token expiry verified before session storage queries. RBAC wildcard bounds protected.',
        tokenDelta: 85
      },
      {
        level: 'success',
        message: 'PSMAS Cycle Complete: 0 vulnerabilities found. Memory footprint: 94,120 tokens ($0.065 cost vs $0.104 baseline). Ready for Human-in-the-Loop merge.',
        tokenDelta: 50
      }
    ],
    compressedHandoff: {
      summary: 'SECURITY_PASSED: Clean audit. Ready for developer approval.',
      compressionRatio: '98.1% (60 tokens vs 3,100 raw audit vectors)',
      targetAgents: ['architect', 'codewriter']
    },
    nodeStatusUpdates: [
      { nodeId: 'mod-auth', status: 'verified' },
      { nodeId: 'file-auth-ts', status: 'verified' },
      { nodeId: 'file-jwt-ts', status: 'verified' },
      { nodeId: 'file-session-ts', status: 'verified' }
    ],
    highlightEdgeIds: ['e-mod-auth', 'e-mod-jwt', 'e-mod-session'],
    activeFileTab: 'auth.ts'
  }
];
