import { create } from 'zustand';
import {
  AgentRoleId,
  Collaborator,
  DiffHunk,
  OGEdgeData,
  OGNodeData,
  PatchFile,
  PSMASAgent,
  Scenario,
  TelemetryMetrics,
  TerminalLogEntry,
} from '../types';
import { SCENARIOS } from '../graph/sampleCodebases';
import { DJANGO_SCENARIO_STEPS, INITIAL_AGENTS } from '../agents/psmasEngine';
import { calculateGraphTokenMetrics, expandNodeProgressive } from '../graph/ogParser';
import { parseCodeToHunks } from '../diff/patchEngine';

interface OmniStoreState {
  // Scenarios
  scenarios: Scenario[];
  activeScenarioId: string;
  activeScenario: Scenario;
  setScenario: (id: string) => void;

  // ObjectGraph Canvas
  nodes: OGNodeData[];
  edges: OGEdgeData[];
  selectedNodeId: string | null;
  searchQuery: string;
  activePathEdgeIds: string[];
  selectNode: (nodeId: string | null) => void;
  addNode: (node: OGNodeData) => void;
  toggleNodeExpansion: (nodeId: string) => void;
  setSearchQuery: (query: string) => void;
  resetGraph: () => void;

  // PSMAS Multi-Agent System
  agents: PSMASAgent[];
  currentPhaseAngle: number; // in radians
  currentPhaseAngleDeg: number;
  activeAgentId: AgentRoleId | null;
  isAgentRunning: boolean;
  currentStepIndex: number;
  playbackSpeed: number;
  startPSMASSweep: () => Promise<void>;
  pausePSMASSweep: () => void;
  resetPSMASSweep: () => void;
  setPlaybackSpeed: (speed: number) => void;

  // Terminal Logs
  logs: TerminalLogEntry[];
  logFilter: string;
  addLog: (entry: TerminalLogEntry) => void;
  clearLogs: () => void;
  setLogFilter: (filter: string) => void;

  // Monaco Editor & Files
  activeFileTab: string;
  files: PatchFile[];
  activeViewMode: 'editor' | 'diff' | 'split';
  setActiveFileTab: (filename: string) => void;
  setActiveViewMode: (mode: 'editor' | 'diff' | 'split') => void;
  updateFileCode: (filename: string, code: string) => void;

  // Surgical Diffs & Approval Gate
  diffHunks: DiffHunk[];
  isApprovalModalOpen: boolean;
  acceptHunk: (hunkId: string) => void;
  rejectHunk: (hunkId: string) => void;
  acceptAllHunks: () => void;
  rejectAllHunks: () => void;
  openApprovalModal: () => void;
  closeApprovalModal: () => void;
  applyApprovedPatches: () => void;

  // Telemetry & Metrics
  telemetry: TelemetryMetrics;

  // Multiplayer Collaborators
  collaborators: Collaborator[];
  updateCollaboratorCursor: (id: string, x: number, y: number, nodeId?: string) => void;
}

const initialScenario = SCENARIOS[0];

const initialHunks = initialScenario.files.flatMap(f =>
  parseCodeToHunks(f.name, f.initialCode, f.modifiedCode)
);

const initialFiles: PatchFile[] = initialScenario.files.map(f => ({
  path: f.path,
  language: f.language,
  originalCode: f.initialCode,
  currentCode: f.initialCode,
  modifiedCode: f.modifiedCode,
  hunks: initialHunks.filter(h => h.file === f.name),
  isDirty: false,
}));

const initialTokenMetrics = calculateGraphTokenMetrics(initialScenario.initialNodes);

const initialTelemetry: TelemetryMetrics = {
  totalInputTokens: 3820,
  totalOutputTokens: 1450,
  linearBaselineTokens: 265400,
  tokensSaved: 171280,
  savingsPercentage: 64.5,
  currentCostUSD: 0.065,
  baselineCostUSD: 0.104,
  activeGraphNodes: 4,
  totalGraphNodes: initialScenario.initialNodes.length,
  traversalHops: 3,
  compressionRatio: 2.82,
};

const INITIAL_COLLABORATORS: Collaborator[] = [
  {
    id: 'collab-1',
    name: 'Mohit (Founder)',
    role: 'Staff Architect',
    color: '#818CF8', // Indigo
    avatar: 'MD',
    cursor: { x: 380, y: 190, nodeId: 'file-auth-ts' },
    activeNodeId: 'file-auth-ts',
    status: 'reviewing'
  },
  {
    id: 'collab-2',
    name: 'Premraj (Founder)',
    role: 'Systems Lead',
    color: '#34D399', // Emerald
    avatar: 'PK',
    cursor: { x: 580, y: 320, nodeId: 'file-jwt-ts' },
    activeNodeId: 'file-jwt-ts',
    status: 'editing'
  },
  {
    id: 'collab-3',
    name: 'Candidate (You)',
    role: 'Founding AI Engineer',
    color: '#38BDF8', // Cyan
    avatar: 'AI',
    cursor: { x: 420, y: 280 },
    status: 'online'
  }
];

export const useOmniStore = create<OmniStoreState>((set, get) => ({
  // Scenarios
  scenarios: SCENARIOS,
  activeScenarioId: initialScenario.id,
  activeScenario: initialScenario,
  setScenario: (id: string) => {
    const scenario = SCENARIOS.find(s => s.id === id) || SCENARIOS[0];
    const hunks = scenario.files.flatMap(f =>
      parseCodeToHunks(f.name, f.initialCode, f.modifiedCode)
    );
    const files: PatchFile[] = scenario.files.map(f => ({
      path: f.path,
      language: f.language,
      originalCode: f.initialCode,
      currentCode: f.initialCode,
      modifiedCode: f.modifiedCode,
      hunks: hunks.filter(h => h.file === f.name),
      isDirty: false,
    }));

    set({
      activeScenarioId: id,
      activeScenario: scenario,
      nodes: scenario.initialNodes,
      edges: scenario.initialEdges,
      files,
      diffHunks: hunks,
      activeFileTab: scenario.files[0]?.name || 'auth.ts',
      logs: [],
      currentPhaseAngle: 0,
      currentPhaseAngleDeg: 0,
      activeAgentId: null,
      isAgentRunning: false,
      currentStepIndex: 0,
      activePathEdgeIds: [],
    });
  },

  // ObjectGraph Canvas
  nodes: initialScenario.initialNodes,
  edges: initialScenario.initialEdges,
  selectedNodeId: null,
  searchQuery: '',
  activePathEdgeIds: [],
  selectNode: (nodeId: string | null) => set({ selectedNodeId: nodeId }),
  addNode: (newNode: OGNodeData) => set((state) => ({ nodes: [...state.nodes, newNode] })),
  toggleNodeExpansion: (nodeId: string) => {
    const { nodes, edges } = get();
    const { updatedNodes, updatedEdges } = expandNodeProgressive(nodeId, nodes, edges);
    const metrics = calculateGraphTokenMetrics(updatedNodes);
    set({
      nodes: updatedNodes,
      edges: updatedEdges,
      telemetry: {
        ...get().telemetry,
        totalGraphNodes: updatedNodes.length,
        activeGraphNodes: updatedNodes.filter(n => n.isLoaded).length,
      }
    });
  },
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  resetGraph: () => {
    const { activeScenario } = get();
    set({
      nodes: activeScenario.initialNodes,
      edges: activeScenario.initialEdges,
      activePathEdgeIds: [],
      selectedNodeId: null,
    });
  },

  // PSMAS Multi-Agent System
  agents: INITIAL_AGENTS,
  currentPhaseAngle: 0,
  currentPhaseAngleDeg: 0,
  activeAgentId: null,
  isAgentRunning: false,
  currentStepIndex: 0,
  playbackSpeed: 1,
  startPSMASSweep: async () => {
    if (get().isAgentRunning) return;
    set({ isAgentRunning: true });

    const steps = DJANGO_SCENARIO_STEPS;
    let accumulatedTokens = get().telemetry.totalInputTokens;

    for (let i = 0; i < steps.length; i++) {
      if (!get().isAgentRunning) break;

      const step = steps[i];
      const speed = get().playbackSpeed;

      // Update Phase angle and activate agent
      set({
        currentStepIndex: i,
        activeAgentId: step.agentId,
        currentPhaseAngle: step.targetAngle,
        currentPhaseAngleDeg: step.angleDeg,
        agents: get().agents.map(a => ({
          ...a,
          status: a.id === step.agentId ? 'active' : a.status === 'completed' ? 'completed' : 'idle',
        })),
        activePathEdgeIds: step.highlightEdgeIds || [],
        activeFileTab: step.activeFileTab || get().activeFileTab,
      });

      // Stream logs for this step
      for (const logItem of step.logs) {
        accumulatedTokens += logItem.tokenDelta;
        const entry: TerminalLogEntry = {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          timestamp: new Date().toLocaleTimeString(),
          agentId: step.agentId,
          agentName: get().agents.find(a => a.id === step.agentId)?.name || 'Agent',
          phaseAngle: step.angleDeg,
          level: logItem.level,
          message: logItem.message,
          codeSnippet: logItem.codeSnippet,
          tokenDelta: logItem.tokenDelta,
          subgraphNodeId: logItem.subgraphNodeId,
          memoryBroadcast: logItem.level === 'success' || logItem.level === 'info' ? step.compressedHandoff : undefined,
        };

        get().addLog(entry);

        // Update telemetry live
        const currentSaved = Math.max(0, 265400 - accumulatedTokens);
        const savingsPct = Number(((currentSaved / 265400) * 100).toFixed(1));
        const currentCost = Number(((accumulatedTokens / 1000000) * 0.70).toFixed(3));

        set({
          telemetry: {
            ...get().telemetry,
            totalInputTokens: accumulatedTokens,
            tokensSaved: currentSaved,
            savingsPercentage: Math.max(60, Math.min(85, savingsPct)),
            currentCostUSD: currentCost,
            traversalHops: get().telemetry.traversalHops + 1,
          }
        });

        // Delay between log items
        await new Promise(r => setTimeout(r, (step.durationMs / step.logs.length) / speed));
      }

      // Update node statuses if any
      if (step.nodeStatusUpdates) {
        const updateMap = new Map(step.nodeStatusUpdates.map(u => [u.nodeId, u.status]));
        set({
          nodes: get().nodes.map(n => ({
            ...n,
            status: (updateMap.get(n.id) as any) || n.status,
          }))
        });
      }

      // Mark agent completed
      set({
        agents: get().agents.map(a => ({
          ...a,
          status: a.id === step.agentId ? 'completed' : a.status,
        }))
      });
    }

    set({ isAgentRunning: false, activeAgentId: null });
  },
  pausePSMASSweep: () => set({ isAgentRunning: false }),
  resetPSMASSweep: () => {
    set({
      isAgentRunning: false,
      activeAgentId: null,
      currentStepIndex: 0,
      currentPhaseAngle: 0,
      currentPhaseAngleDeg: 0,
      agents: INITIAL_AGENTS,
      activePathEdgeIds: [],
    });
  },
  setPlaybackSpeed: (speed: number) => set({ playbackSpeed: speed }),

  // Terminal Logs
  logs: [
    {
      id: 'log-init',
      timestamp: new Date().toLocaleTimeString(),
      agentId: 'architect',
      agentName: 'System Kernel',
      phaseAngle: 0,
      level: 'info',
      message: 'OmniGraph Studio v1.0.0 initialized. ObjectGraph (.og) engine & TokenFold Context Ready.'
    }
  ],
  logFilter: 'all',
  addLog: (entry: TerminalLogEntry) =>
    set(state => ({ logs: [entry, ...state.logs].slice(0, 100) })),
  clearLogs: () => set({ logs: [] }),
  setLogFilter: (filter: string) => set({ logFilter: filter }),

  // Monaco Editor & Files
  activeFileTab: 'auth.ts',
  files: initialFiles,
  activeViewMode: 'split',
  setActiveFileTab: (filename: string) => set({ activeFileTab: filename }),
  setActiveViewMode: (mode: 'editor' | 'diff' | 'split') => set({ activeViewMode: mode }),
  updateFileCode: (filename: string, code: string) =>
    set(state => ({
      files: state.files.map(f =>
        f.path.endsWith(filename) ? { ...f, currentCode: code, isDirty: true } : f
      )
    })),

  // Surgical Diffs
  diffHunks: initialHunks,
  isApprovalModalOpen: false,
  acceptHunk: (hunkId: string) =>
    set(state => ({
      diffHunks: state.diffHunks.map(h => (h.id === hunkId ? { ...h, status: 'accepted' } : h))
    })),
  rejectHunk: (hunkId: string) =>
    set(state => ({
      diffHunks: state.diffHunks.map(h => (h.id === hunkId ? { ...h, status: 'rejected' } : h))
    })),
  acceptAllHunks: () =>
    set(state => ({
      diffHunks: state.diffHunks.map(h => ({ ...h, status: 'accepted' }))
    })),
  rejectAllHunks: () =>
    set(state => ({
      diffHunks: state.diffHunks.map(h => ({ ...h, status: 'rejected' }))
    })),
  openApprovalModal: () => set({ isApprovalModalOpen: true }),
  closeApprovalModal: () => set({ isApprovalModalOpen: false }),
  applyApprovedPatches: () => {
    const { diffHunks, files } = get();
    // Apply modified code to current code for accepted files
    const updatedFiles = files.map(file => {
      const fileHunks = diffHunks.filter(h => h.file === file.path.split('/').pop());
      const hasAccepted = fileHunks.some(h => h.status === 'accepted');
      if (hasAccepted) {
        return {
          ...file,
          currentCode: file.modifiedCode,
          isDirty: false,
        };
      }
      return file;
    });

    set({
      files: updatedFiles,
      isApprovalModalOpen: false,
      nodes: get().nodes.map(n => ({
        ...n,
        status: n.status === 'modified' ? 'verified' : n.status,
      }))
    });
  },

  // Telemetry
  telemetry: initialTelemetry,

  // Collaborators
  collaborators: INITIAL_COLLABORATORS,
  updateCollaboratorCursor: (id: string, x: number, y: number, nodeId?: string) =>
    set(state => ({
      collaborators: state.collaborators.map(c =>
        c.id === id ? { ...c, cursor: { x, y, nodeId }, activeNodeId: nodeId } : c
      )
    })),
}));
