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
import { parseCodeToHunks, reconcileApprovedHunks } from '../diff/patchEngine';

interface OmniStoreState {
  // Scenarios & Custom Ingestion
  scenarios: Scenario[];
  activeScenarioId: string;
  activeScenario: Scenario;
  isIngestModalOpen: boolean;
  setScenario: (id: string) => void;
  addScenario: (newScenario: Scenario) => void;
  openIngestModal: () => void;
  closeIngestModal: () => void;

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

  // Mobile UI & Sidebar
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  openMobileSidebar: () => void;

  // Telemetry & Metrics
  telemetry: TelemetryMetrics;
  addTokenUsage: (inputTokens: number, outputTokens: number) => void;

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
  // Scenarios & Custom Ingestion
  scenarios: SCENARIOS,
  activeScenarioId: initialScenario.id,
  activeScenario: initialScenario,
  isIngestModalOpen: false,
  openIngestModal: () => set({ isIngestModalOpen: true }),
  closeIngestModal: () => set({ isIngestModalOpen: false }),
  addScenario: (newScenario: Scenario) => {
    const updatedScenarios = [newScenario, ...get().scenarios];
    set({ scenarios: updatedScenarios });
    get().setScenario(newScenario.id);
  },
  setScenario: (id: string) => {
    const scenario = get().scenarios.find(s => s.id === id) || SCENARIOS[0];
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
      activeFileTab: scenario.files[0]?.name || 'core.ts',
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
  toggleNodeExpansion: async (nodeId: string) => {
    // 1. Optimistic local expansion
    const { nodes, edges, activeScenarioId } = get();
    const { updatedNodes, updatedEdges } = expandNodeProgressive(nodeId, nodes, edges);
    set({
      nodes: updatedNodes,
      edges: updatedEdges,
      telemetry: {
        ...get().telemetry,
        totalGraphNodes: updatedNodes.length,
        activeGraphNodes: updatedNodes.filter(n => n.isLoaded).length,
      }
    });

    // 2. Real Backend API Call to Next.js API Route
    try {
      const res = await fetch('/api/graph/traverse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioId: activeScenarioId, targetNodeId: nodeId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.nodes) {
          set({
            nodes: data.nodes,
            edges: data.edges,
            telemetry: {
              ...get().telemetry,
              totalGraphNodes: data.metrics.totalNodes,
              activeGraphNodes: data.metrics.disclosedNodes,
              tokensSaved: data.metrics.tokensSaved,
              savingsPercentage: data.metrics.savingsPercentage,
            }
          });
        }
      }
    } catch {
      // Local optimistic fallback remains intact
    }
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

    // Retrieve client BYOK keys if configured
    const providerMode = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_provider_mode') || 'platform' : 'platform';
    const orcaKey = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_orca_key') || '' : '';
    const groqKey = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_groq_key') || '' : '';
    const effectiveKey = providerMode === 'byok' ? (orcaKey || groqKey) : undefined;
    const preferredModel = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_orca_model') || 'openai/gpt-4o-mini' : 'openai/gpt-4o-mini';

    // Agent execution order (circular manifold sweep)
    const agentPhases: { id: AgentRoleId; angle: number; angleDeg: number }[] = [
      { id: 'architect', angle: 0, angleDeg: 0 },
      { id: 'codewriter', angle: Math.PI / 2, angleDeg: 90 },
      { id: 'testrunner', angle: Math.PI, angleDeg: 180 },
      { id: 'security', angle: (3 * Math.PI) / 2, angleDeg: 270 },
    ];

    // Get the currently selected node or first node as context
    const selectedNode = get().selectedNodeId
      ? get().nodes.find(n => n.id === get().selectedNodeId)
      : get().nodes[0];

    // Get user's active file code for context
    const activeFile = get().files.find(f => f.path.endsWith(get().activeFileTab));
    const codeContext = activeFile?.currentCode?.slice(0, 3000) || '';

    let totalInputTokens = get().telemetry.totalInputTokens;
    let totalOutputTokens = get().telemetry.totalOutputTokens;

    for (let i = 0; i < agentPhases.length; i++) {
      if (!get().isAgentRunning) break;

      const phase = agentPhases[i];
      const agent = get().agents.find(a => a.id === phase.id)!;

      // Update phase angle and activate agent
      set({
        currentStepIndex: i,
        activeAgentId: phase.id,
        currentPhaseAngle: phase.angle,
        currentPhaseAngleDeg: phase.angleDeg,
        agents: get().agents.map(a => ({
          ...a,
          status: a.id === phase.id ? 'active' : a.status === 'completed' ? 'completed' : 'idle',
          currentTask: a.id === phase.id ? `Analyzing ${selectedNode?.label || 'codebase'}...` : a.currentTask,
        })),
      });

      // Log: starting this agent phase
      get().addLog({
        id: `log-${Date.now()}-start`,
        timestamp: new Date().toLocaleTimeString(),
        agentId: phase.id,
        agentName: agent.name,
        phaseAngle: phase.angleDeg,
        level: 'info',
        message: `[LIVE] Activating ${agent.name} at θ=${phase.angleDeg}°. Sending real code context (${codeContext.length} chars) to AI gateway...`,
      });

      // Build prompt with real code context
      const prompt = `You are the ${agent.name} (${agent.role}). Analyze this code and provide your assessment:\n\nFile: ${activeFile?.path || 'unknown'}\nNode: ${selectedNode?.label || 'root'}\nTask: ${get().activeScenario.description}\n\nCode:\n\`\`\`\n${codeContext}\n\`\`\`\n\n${phase.id === 'codewriter' ? 'Generate a unified diff (with @@ hunk headers) for any fixes you recommend.' : phase.id === 'testrunner' ? 'List specific test assertions that should pass.' : phase.id === 'security' ? 'List any security vulnerabilities found.' : 'Analyze the architecture and identify key dependencies and potential issues.'}`;

      // Estimate input tokens
      const inputTokenEstimate = Math.ceil(prompt.length / 4);
      totalInputTokens += inputTokenEstimate;

      // ================================================================
      // REAL API CALL — Actually read the streamed response
      // ================================================================
      try {
        const res = await fetch('/api/agents/psmas-run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            activeAgent: phase.id,
            nodeContext: selectedNode ? { label: selectedNode.label, path: selectedNode.path, tokenCount: selectedNode.tokenCount, compressedTokens: selectedNode.compressedTokens } : undefined,
            apiKey: effectiveKey,
            model: preferredModel,
            prompt,
          }),
        });

        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';

          if (contentType.includes('text/event-stream') && res.body) {
            // ============================================================
            // STREAMING SSE — Read real tokens from AI model
            // ============================================================
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';
            let chunkBuffer = '';

            while (true) {
              if (!get().isAgentRunning) break;
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value);
              chunkBuffer += chunk;

              // Parse SSE data lines
              const lines = chunkBuffer.split('\n');
              chunkBuffer = lines.pop() || ''; // Keep incomplete line in buffer

              for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const data = line.slice(6).trim();
                if (data === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.message?.content || '';
                  if (content) {
                    fullResponse += content;
                    totalOutputTokens += Math.ceil(content.length / 4);
                  }
                } catch {
                  // Non-JSON SSE data — still real response content
                  if (data && !data.includes('"error"')) {
                    fullResponse += data;
                  }
                }
              }

              // Update telemetry with real token counts
              set({
                telemetry: {
                  ...get().telemetry,
                  totalInputTokens: totalInputTokens,
                  totalOutputTokens: totalOutputTokens,
                  currentCostUSD: Number(((totalInputTokens + totalOutputTokens) / 1000000 * 0.70).toFixed(4)),
                  traversalHops: get().telemetry.traversalHops + 1,
                },
              });
            }

            // Log the real AI response
            if (fullResponse.trim()) {
              // Split response into meaningful chunks for terminal logs
              const responseLines = fullResponse.split('\n').filter(l => l.trim());
              const maxLogLines = Math.min(responseLines.length, 8);

              for (let j = 0; j < maxLogLines; j++) {
                const lineContent = responseLines[j].trim();
                if (!lineContent) continue;

                get().addLog({
                  id: `log-${Date.now()}-${j}-${Math.random().toString(36).substr(2, 4)}`,
                  timestamp: new Date().toLocaleTimeString(),
                  agentId: phase.id,
                  agentName: agent.name,
                  phaseAngle: phase.angleDeg,
                  level: phase.id === 'codewriter' ? 'patch' : phase.id === 'testrunner' ? 'test' : phase.id === 'security' ? 'security' : 'reasoning',
                  message: lineContent.slice(0, 200),
                  tokenDelta: Math.ceil(lineContent.length / 4),
                });

                await new Promise(r => setTimeout(r, 80 / get().playbackSpeed));
              }

              // If codewriter: try to parse diff hunks from the response
              if (phase.id === 'codewriter' && fullResponse.includes('@@')) {
                const { parseUnifiedDiffToHunks } = await import('../diff/patchEngine');
                const aiHunks = parseUnifiedDiffToHunks(
                  activeFile?.path?.split('/').pop() || 'code.ts',
                  fullResponse
                );
                if (aiHunks.length > 0) {
                  set({ diffHunks: [...aiHunks, ...get().diffHunks] });
                  get().addLog({
                    id: `log-${Date.now()}-diff`,
                    timestamp: new Date().toLocaleTimeString(),
                    agentId: 'codewriter',
                    agentName: 'CodeWriter Agent',
                    phaseAngle: 90,
                    level: 'success',
                    message: `Generated ${aiHunks.length} real diff hunk(s) from AI response. Review in Diff Viewer.`,
                  });
                }
              }
            } else {
              get().addLog({
                id: `log-${Date.now()}-empty`,
                timestamp: new Date().toLocaleTimeString(),
                agentId: phase.id,
                agentName: agent.name,
                phaseAngle: phase.angleDeg,
                level: 'warn',
                message: `Stream completed but no content received. Check API key configuration in Settings.`,
              });
            }
          } else {
            // ============================================================
            // JSON RESPONSE (fallback when no streaming / no API key)
            // ============================================================
            const json = await res.json();
            const responseText = json.response?.thought || json.response?.action || JSON.stringify(json.response || json);
            totalOutputTokens += Math.ceil(responseText.length / 4);

            get().addLog({
              id: `log-${Date.now()}-json`,
              timestamp: new Date().toLocaleTimeString(),
              agentId: phase.id,
              agentName: agent.name,
              phaseAngle: phase.angleDeg,
              level: 'reasoning',
              message: responseText.slice(0, 300),
              tokenDelta: Math.ceil(responseText.length / 4),
            });
          }
        } else {
          const errText = await res.text();
          get().addLog({
            id: `log-${Date.now()}-err`,
            timestamp: new Date().toLocaleTimeString(),
            agentId: phase.id,
            agentName: agent.name,
            phaseAngle: phase.angleDeg,
            level: 'error',
            message: `API Error (${res.status}): ${errText.slice(0, 150)}`,
          });
        }
      } catch (err: any) {
        get().addLog({
          id: `log-${Date.now()}-catch`,
          timestamp: new Date().toLocaleTimeString(),
          agentId: phase.id,
          agentName: agent.name,
          phaseAngle: phase.angleDeg,
          level: 'error',
          message: `Network error: ${err.message || 'Connection failed'}. Using server-managed AI gateway.`,
        });

        // ============================================================
        // FALLBACK: Use hardcoded steps when API is unavailable
        // ============================================================
        const fallbackStep = DJANGO_SCENARIO_STEPS.find(s => s.agentId === phase.id);
        if (fallbackStep) {
          for (const logItem of fallbackStep.logs) {
            get().addLog({
              id: `log-${Date.now()}-fb-${Math.random().toString(36).substr(2, 4)}`,
              timestamp: new Date().toLocaleTimeString(),
              agentId: phase.id,
              agentName: agent.name,
              phaseAngle: phase.angleDeg,
              level: logItem.level,
              message: `[Offline Fallback] ${logItem.message}`,
              tokenDelta: logItem.tokenDelta,
            });
            await new Promise(r => setTimeout(r, 200 / get().playbackSpeed));
          }
        }
      }

      // Update real telemetry
      const compressedTokens = get().nodes.reduce((s, n) => s + n.compressedTokens, 0);
      const rawTokens = get().nodes.reduce((s, n) => s + n.tokenCount, 0) * 4;
      set({
        telemetry: {
          ...get().telemetry,
          totalInputTokens: totalInputTokens,
          totalOutputTokens: totalOutputTokens,
          linearBaselineTokens: rawTokens,
          tokensSaved: Math.max(0, rawTokens - compressedTokens),
          savingsPercentage: rawTokens > 0 ? Number((((rawTokens - compressedTokens) / rawTokens) * 100).toFixed(1)) : 65,
          currentCostUSD: Number(((totalInputTokens + totalOutputTokens) / 1000000 * 0.70).toFixed(4)),
          activeGraphNodes: get().nodes.filter(n => n.isLoaded).length,
          totalGraphNodes: get().nodes.length,
        },
      });

      // Mark agent completed
      set({
        agents: get().agents.map(a => ({
          ...a,
          status: a.id === phase.id ? 'completed' : a.status,
          currentTask: a.id === phase.id ? 'Phase complete' : a.currentTask,
        }))
      });

      // Brief pause between agents
      await new Promise(r => setTimeout(r, 300 / get().playbackSpeed));
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
    // Surgically apply accepted diff hunks line-by-line using reconcileApprovedHunks
    const updatedFiles = files.map(file => {
      const fileName = file.path.split('/').pop() || file.path;
      const fileHunks = diffHunks.filter(h => h.file === fileName || h.file === file.path);
      const hasAccepted = fileHunks.some(h => h.status === 'accepted');
      if (hasAccepted) {
        const patchedCode = reconcileApprovedHunks(file.currentCode, fileHunks);
        return {
          ...file,
          currentCode: patchedCode,
          isDirty: true,
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

  // Mobile Sidebar
  isMobileSidebarOpen: false,
  toggleMobileSidebar: () => set(state => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  closeMobileSidebar: () => set({ isMobileSidebarOpen: false }),
  openMobileSidebar: () => set({ isMobileSidebarOpen: true }),

  // Telemetry
  telemetry: initialTelemetry,
  addTokenUsage: (inputTokens: number, outputTokens: number) => {
    const current = get().telemetry;
    const totalInput = current.totalInputTokens + inputTokens;
    const totalOutput = current.totalOutputTokens + outputTokens;
    const baseline = current.linearBaselineTokens;
    const saved = Math.max(0, baseline - (totalInput + totalOutput));
    const savingsPct = baseline > 0 ? Number(((saved / baseline) * 100).toFixed(1)) : 65;
    const cost = Number(((totalInput + totalOutput) / 1000000 * 0.70).toFixed(4));

    set({
      telemetry: {
        ...current,
        totalInputTokens: totalInput,
        totalOutputTokens: totalOutput,
        tokensSaved: saved,
        savingsPercentage: savingsPct,
        currentCostUSD: cost,
      }
    });
  },

  // Collaborators
  collaborators: INITIAL_COLLABORATORS,
  updateCollaboratorCursor: (id: string, x: number, y: number, nodeId?: string) =>
    set(state => ({
      collaborators: state.collaborators.map(c =>
        c.id === id ? { ...c, cursor: { x, y, nodeId }, activeNodeId: nodeId } : c
      )
    })),
}));
