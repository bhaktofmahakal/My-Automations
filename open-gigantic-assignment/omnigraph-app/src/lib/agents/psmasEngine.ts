import { PSMASAgent } from '../types';

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
