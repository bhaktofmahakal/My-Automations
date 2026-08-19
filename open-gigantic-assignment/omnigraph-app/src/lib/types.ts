export type OGNodeType = 'module' | 'file' | 'function' | 'class' | 'assertion';

export type NodeExecutionStatus = 'idle' | 'scanning' | 'traversed' | 'modified' | 'tested' | 'verified' | 'locked';

export interface ASTSignature {
  name: string;
  kind: 'function' | 'method' | 'class' | 'type' | 'variable' | 'assertion';
  lineStart: number;
  lineEnd: number;
  params?: string[];
  returnType?: string;
  docstring?: string;
  tokenCost: number;
}

export interface OGNodeData {
  [key: string]: unknown;
  id: string;
  label: string;
  type: OGNodeType;
  path: string;
  language: string;
  linesCount: number;
  tokenCount: number; // Raw tokens if injected fully
  compressedTokens: number; // Tokens under ObjectGraph disclosure
  isExpanded?: boolean;
  isLoaded?: boolean;
  parentId?: string;
  childrenIds?: string[];
  signatures: ASTSignature[];
  status: NodeExecutionStatus;
  lockedBy?: string; // Collaborator name if locked
  heatScore?: number; // 0 to 1 activity heat
  exportSymbols?: string[];
  dependencies?: string[];
  activePhase?: string;
  description?: string;
}

export interface OGEdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: 'imports' | 'calls' | 'inherits' | 'modifies' | 'tests' | 'traversed';
  animated?: boolean;
  active?: boolean;
}

export type AgentRoleId = 'architect' | 'codewriter' | 'testrunner' | 'security';
export type OperationalRole = 'mayor' | 'polecat' | 'witness' | 'refinery';

export type BeadDependencyType = 'blocks' | 'related' | 'parent-child' | 'discovered-from';
export type BeadStatus = 'pending' | 'in_progress' | 'blocked' | 'completed' | 'failed';

export interface BeadTask {
  id: string;
  title: string;
  description: string;
  status: BeadStatus;
  dependencyType: BeadDependencyType;
  dependencies: string[];
  targetNodeId?: string;
  targetFile?: string;
  diffHunkId?: string;
  assignedRole: OperationalRole;
  tokenCost: number;
  createdAt: string;
  completedAt?: string;
  toolCallsExecuted: {
    tool: string;
    params: Record<string, any>;
    resultSummary: string;
    timestamp: string;
  }[];
  reflexionAttempts: number;
}

export interface PSMASAgent {
  id: AgentRoleId;
  name: string;
  role: string;
  theta: number; // Angle on [0, 2pi]
  color: string;
  accentColor: string;
  status: 'idle' | 'active' | 'completed' | 'waiting';
  activeTokens: number;
  compressedMemorySize: number; // O(1) vector size in tokens (e.g. 64 tokens)
  currentTask?: string;
  avatarIcon: string;
}

export type LogLevel = 'info' | 'reasoning' | 'traversal' | 'patch' | 'test' | 'security' | 'success' | 'warn' | 'error';

export interface TerminalLogEntry {
  id: string;
  timestamp: string;
  agentId: AgentRoleId;
  agentName: string;
  phaseAngle: number; // Current phi(t) in degrees or radians
  level: LogLevel;
  message: string;
  codeSnippet?: string;
  tokenDelta?: number;
  subgraphNodeId?: string;
  memoryBroadcast?: {
    summary: string;
    compressionRatio: string;
    targetAgents: AgentRoleId[];
  };
}

export interface HunkLine {
  type: 'context' | 'addition' | 'deletion';
  content: string;
  oldLineNo?: number;
  newLineNo?: number;
}

export interface DiffHunk {
  id: string;
  file: string;
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  header: string;
  lines: HunkLine[];
  status: 'pending' | 'accepted' | 'rejected' | 'applied';
  explanation: string;
  astNodeId?: string;
}

export interface PatchFile {
  path: string;
  language: string;
  originalCode: string;
  currentCode: string;
  modifiedCode: string;
  hunks: DiffHunk[];
  isDirty?: boolean;
}

export interface SWEBenchItem {
  id: string;
  taskName: string;
  module: string;
  rawClaudeTokens: number;
  superbrainTokens: number;
  rawClaudeCost: number;
  superbrainCost: number;
  reductionPercentage: number;
  status: 'RESOLVED' | 'VERIFIED' | 'PASSING' | 'PENDING';
  testAssertionsPassed: number;
  testAssertionsTotal: number;
}

export interface TelemetryMetrics {
  totalInputTokens: number;
  totalOutputTokens: number;
  linearBaselineTokens: number;
  tokensSaved: number;
  savingsPercentage: number;
  currentCostUSD: number;
  baselineCostUSD: number;
  activeGraphNodes: number;
  totalGraphNodes: number;
  traversalHops: number;
  compressionRatio: number;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  color: string;
  avatar: string;
  cursor: { x: number; y: number; nodeId?: string };
  activeNodeId?: string;
  isTyping?: boolean;
  status: 'online' | 'reviewing' | 'editing';
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  description: string;
  taskDirective?: string;
  benchmarkTarget: string;
  files: {
    name: string;
    path: string;
    language: string;
    initialCode: string;
    modifiedCode: string;
  }[];
  initialNodes: OGNodeData[];
  initialEdges: OGEdgeData[];
  sweBenchMetadata: SWEBenchItem;
}
