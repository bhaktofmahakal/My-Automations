import { create } from 'zustand';
import {
  AgentRoleId,
  BeadStatus,
  BeadTask,
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
import { INITIAL_AGENTS } from '../agents/psmasEngine';
import { createDynamicBeadsForRepo } from '../agents/beadsEngine';
import { calculateGraphTokenMetrics, expandNodeProgressive } from '../graph/ogParser';
import { parseCodeToHunks, reconcileApprovedHunks } from '../diff/patchEngine';

interface OmniStoreState {
  // Beads Task Graph (2026 Operational Architecture)
  beads: BeadTask[];
  selectedBeadId: string | null;
  addBead: (bead: BeadTask) => void;
  updateBeadStatus: (id: string, status: BeadStatus) => void;
  selectBead: (id: string | null) => void;

  // Scenarios & Custom Ingestion
  scenarios: Scenario[];
  activeScenarioId: string;
  activeScenario: Scenario;
  isIngestModalOpen: boolean;
  setScenario: (id: string) => void;
  addScenario: (newScenario: Scenario) => void;
  openIngestModal: () => void;
  closeIngestModal: () => void;

  // Self-Ingest (real repository bootstrap)
  selfIngestStatus: 'idle' | 'loading' | 'ready' | 'error';
  selfIngestError: string | null;
  hydrateFromSelf: () => Promise<void>;

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
  startPSMASSweep: (promptOverride?: string) => Promise<void>;
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
  addCollaborator: (collab: Collaborator) => void;
  removeCollaborator: (id: string) => void;
  updateUserProfile: (name: string, role: string) => void;
}

export const EMPTY_SCENARIO: Scenario = {
  id: 'empty',
  title: 'No codebase ingested yet',
  category: 'Self-Ingest',
  description: 'Ingest this repository via "Self-Ingest" in the header, or import any codebase / GitHub repo.',
  taskDirective: 'Analyze the active codebase and generate surgical improvements.',
  benchmarkTarget: '—',
  files: [],
  initialNodes: [],
  initialEdges: [],
  sweBenchMetadata: {
    id: 'empty',
    taskName: 'No benchmark run yet',
    module: '—',
    rawClaudeTokens: 0,
    superbrainTokens: 0,
    rawClaudeCost: 0,
    superbrainCost: 0,
    reductionPercentage: 0,
    status: 'PENDING',
    testAssertionsPassed: 0,
    testAssertionsTotal: 0,
  },
};

const emptyTelemetry: TelemetryMetrics = {
  totalInputTokens: 0,
  totalOutputTokens: 0,
  tokensSaved: 0,
  savingsPercentage: 0,
  linearBaselineTokens: 0,
  currentCostUSD: 0,
  baselineCostUSD: 0,
  activeGraphNodes: 0,
  totalGraphNodes: 0,
  traversalHops: 0,
  compressionRatio: 0,
};

const YOU_COLLABORATOR: Collaborator = {
  id: 'you',
  name: 'You (Lead Engineer)',
  role: 'Lead AI Engineer',
  color: '#38BDF8', // Cyan
  avatar: 'ME',
  cursor: { x: 420, y: 280 },
  status: 'online',
};

export const useOmniStore = create<OmniStoreState>((set, get) => ({
  // Beads Task Graph (2026 Operational Architecture)
  beads: [],
  selectedBeadId: null,
  addBead: (bead: BeadTask) => set({ beads: [bead, ...get().beads] }),
  updateBeadStatus: (id: string, status: BeadStatus) =>
    set({
      beads: get().beads.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              completedAt: status === 'completed' ? new Date().toISOString() : b.completedAt,
            }
          : b
      ),
    }),
  selectBead: (id: string | null) => set({ selectedBeadId: id }),

  // Scenarios & Custom Ingestion
  scenarios: [],
  activeScenarioId: EMPTY_SCENARIO.id,
  activeScenario: EMPTY_SCENARIO,
  isIngestModalOpen: false,
  openIngestModal: () => set({ isIngestModalOpen: true }),
  closeIngestModal: () => set({ isIngestModalOpen: false }),
  addScenario: (newScenario: Scenario) => {
    const updatedScenarios = [newScenario, ...get().scenarios];
    set({ scenarios: updatedScenarios });
    get().setScenario(newScenario.id);
  },
  setScenario: (id: string) => {
    const scenario = get().scenarios.find(s => s.id === id) || EMPTY_SCENARIO;
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

    const dynamicBeads = scenario.files.length > 0
      ? createDynamicBeadsForRepo(
          scenario.title,
          scenario.files,
          scenario.taskDirective || scenario.description || 'Perform AST audit and optimization'
        )
      : [];

    set({
      activeScenarioId: id,
      activeScenario: scenario,
      nodes: scenario.initialNodes,
      edges: scenario.initialEdges,
      files,
      diffHunks: hunks,
      beads: dynamicBeads,
      activeFileTab: scenario.files[0]?.name || '',
      logs: [],
      currentPhaseAngle: 0,
      currentPhaseAngleDeg: 0,
      activeAgentId: null,
      isAgentRunning: false,
      currentStepIndex: 0,
      activePathEdgeIds: [],
      telemetry: {
        ...emptyTelemetry,
        totalGraphNodes: scenario.initialNodes.length,
        activeGraphNodes: scenario.initialNodes.filter(n => n.isLoaded).length,
      },
    });
  },

  // Self-Ingest (real repository bootstrap)
  selfIngestStatus: 'idle',
  selfIngestError: null,
  hydrateFromSelf: async () => {
    if (get().selfIngestStatus === 'loading') return;
    set({ selfIngestStatus: 'loading', selfIngestError: null });
    try {
      const res = await fetch('/api/repo/self', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || `Self-ingest failed (${res.status})`);
      }
      const data = await res.json();
      if (data.status !== 'success' || !data.scenario) {
        throw new Error('Self-ingest returned no scenario.');
      }
      const scenario = data.scenario as Scenario;
      if (!get().scenarios.some(s => s.id === scenario.id)) {
        set({ scenarios: [scenario, ...get().scenarios] });
      }
      get().setScenario(scenario.id);
      set({ selfIngestStatus: 'ready' });
    } catch (err: any) {
      set({ selfIngestStatus: 'error', selfIngestError: err.message || 'Self-ingest failed' });
    }
  },

  // ObjectGraph Canvas
  nodes: [],
  edges: [],
  selectedNodeId: null,
  searchQuery: '',
  activePathEdgeIds: [],
  selectNode: (nodeId: string | null) => set({ selectedNodeId: nodeId }),
  addNode: (newNode: OGNodeData) => set((state) => ({ nodes: [...state.nodes, newNode] })),
  toggleNodeExpansion: async (nodeId: string) => {
    // 1. Optimistic local expansion
    const { nodes, edges } = get();
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

    // 2. Stateless backend expansion over the client's real graph state
    try {
      const res = await fetch('/api/graph/traverse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: updatedNodes, edges: updatedEdges, targetNodeId: nodeId }),
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
      // Local optimistic expansion remains intact
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
  startPSMASSweep: async (promptOverride?: string) => {
    if (get().isAgentRunning) return;

    // Guard: a sweep needs a real ingested codebase
    if (get().files.length === 0 || get().nodes.length === 0) {
      get().addLog({
        id: `log-${Date.now()}-noguard`,
        timestamp: new Date().toLocaleTimeString(),
        agentId: 'architect',
        agentName: 'System Kernel',
        phaseAngle: 0,
        level: 'error',
        message: 'No codebase ingested. Use "Self-Ingest" or "Import Repo" before running a sweep.',
      });
      return;
    }

    set({ isAgentRunning: true });

    // Retrieve client BYOK keys & per-agent heterogeneous models from OrcaRouter & Groq
    const providerMode = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_provider_mode') || 'platform' : 'platform';
    const orcaKey = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_orca_key') || '' : '';
    const orcaBaseUrl = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_orca_url') || 'https://api.orcarouter.ai/v1' : 'https://api.orcarouter.ai/v1';
    const groqKey = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_groq_key') || '' : '';
    const effectiveKey = providerMode === 'byok' ? (orcaKey || groqKey) : undefined;
    const storedAgentModels = typeof window !== 'undefined' ? localStorage.getItem('omnigraph_agent_models') : null;
    const agentModels: Record<string, string> = storedAgentModels ? JSON.parse(storedAgentModels) : {
      architect: 'anthropic/claude-3.5-sonnet',
      codewriter: 'qwen/qwen-2.5-coder-32b-instruct',
      testrunner: 'deepseek/deepseek-r1',
      security: 'openai/gpt-4o',
    };

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
    const activeFile = get().files.find(f => f.path.endsWith(get().activeFileTab)) || get().files[0];
    const codeContext = activeFile?.currentCode?.slice(0, 3000) || '';

    let totalInputTokens = get().telemetry.totalInputTokens;
    let totalOutputTokens = get().telemetry.totalOutputTokens;

    // 1. Live Upstash Vector Semantic Search for Code Context Grounding
    const targetGoal = promptOverride || get().activeScenario.description;
    try {
      const vectorRes = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'vector_search',
          query: targetGoal,
          nodes: get().nodes,
        }),
      });
      if (vectorRes.ok) {
        const vData = await vectorRes.json();
        const topNodeNames = (vData.nodeIds || []).map((id: string) => {
          const n = get().nodes.find(node => node.id === id);
          return n ? n.label : id;
        }).slice(0, 3);

        get().addLog({
          id: `log-${Date.now()}-vector`,
          timestamp: new Date().toLocaleTimeString(),
          agentId: 'architect',
          agentName: 'Mayor Agent',
          phaseAngle: 0,
          level: 'traversal',
          message: `[Upstash Vector] Searched index → ${vData.nodeIds?.length || 0} relevant AST symbols: [${topNodeNames.join(', ')}]`,
          tokenDelta: 24,
        });
      }
    } catch {
      // Graceful fallback
    }

    for (let i = 0; i < agentPhases.length; i++) {
      if (!get().isAgentRunning) break;

      const phase = agentPhases[i];
      const agent = get().agents.find(a => a.id === phase.id)!;

      // Role to Operational Bead Role mapping
      const roleToBeadRole: Record<string, 'mayor' | 'polecat' | 'witness' | 'refinery'> = {
        architect: 'mayor',
        codewriter: 'polecat',
        testrunner: 'witness',
        security: 'refinery',
      };
      const opRole = roleToBeadRole[phase.id] || 'mayor';

      // Update matching Bead task to in_progress & sync to Upstash Redis
      const updatedBeads = get().beads.map((b) =>
        b.assignedRole === opRole && b.status === 'pending'
          ? { ...b, status: 'in_progress' as const }
          : b
      );
      set({ beads: updatedBeads });

      // Persist Beads DAG state to Upstash Redis in background
      fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'persist_beads',
          sessionId: 'active-session',
          beads: updatedBeads,
        }),
      }).catch(() => {});

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
      const phaseGoal = promptOverride || get().activeScenario.description;
      const prompt = `You are the ${agent.name} (${agent.role}). User Request: "${phaseGoal}"\n\nFile: ${activeFile?.path || 'unknown'}\nNode: ${selectedNode?.label || 'root'}\n\nCode:\n\`\`\`\n${codeContext}\n\`\`\`\n\n${phase.id === 'codewriter' ? 'Generate a minimal, surgical unified diff (with @@ hunk headers) for any fixes you recommend.' : phase.id === 'testrunner' ? 'List specific unit test assertions that should pass.' : phase.id === 'security' ? 'List any security vulnerabilities or boundary checks found.' : 'Analyze the architecture and identify key dependencies and potential issues.'}`;

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
            model: agentModels[phase.id] || 'anthropic/claude-3.5-sonnet',
            apiKey: effectiveKey,
            baseUrl: orcaBaseUrl,
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
                message: 'AI provider returned an empty stream for this phase.',
              });
            }
          } else {
            // ============================================================
            // JSON RESPONSE (non-streaming provider)
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
            message: `API Error (${res.status}): ${errText.slice(0, 200)}`,
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
          message: `Network error: ${err.message || 'Connection failed'}.`,
        });
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
          savingsPercentage: rawTokens > 0 ? Number((((rawTokens - compressedTokens) / rawTokens) * 100).toFixed(1)) : 0,
          currentCostUSD: Number(((totalInputTokens + totalOutputTokens) / 1000000 * 0.70).toFixed(4)),
          activeGraphNodes: get().nodes.filter(n => n.isLoaded).length,
          totalGraphNodes: get().nodes.length,
        },
      });

      // Mark agent and matching Bead completed
      set({
        beads: get().beads.map((b) =>
          b.assignedRole === opRole
            ? { ...b, status: 'completed', completedAt: new Date().toISOString() }
            : b
        ),
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
  activeFileTab: '',
  files: [],
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
  diffHunks: [],
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
      diffHunks: diffHunks.map(h => (h.status === 'accepted' ? { ...h, status: 'applied' } : h)),
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
  telemetry: emptyTelemetry,
  addTokenUsage: (inputTokens: number, outputTokens: number) => {
    const current = get().telemetry;
    const totalInput = current.totalInputTokens + inputTokens;
    const totalOutput = current.totalOutputTokens + outputTokens;
    const baseline = current.linearBaselineTokens;
    const saved = Math.max(0, baseline - (totalInput + totalOutput));
    const savingsPct = baseline > 0 ? Number(((saved / baseline) * 100).toFixed(1)) : 0;
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
  collaborators: [YOU_COLLABORATOR],
  updateCollaboratorCursor: (id: string, x: number, y: number, nodeId?: string) =>
    set(state => ({
      collaborators: state.collaborators.map(c =>
        c.id === id ? { ...c, cursor: { x, y, nodeId }, activeNodeId: nodeId } : c
      )
    })),
  addCollaborator: (collab: Collaborator) =>
    set(state => ({ collaborators: [...state.collaborators, collab] })),
  removeCollaborator: (id: string) =>
    set(state => ({ collaborators: state.collaborators.filter(c => c.id !== id) })),
  updateUserProfile: (name: string, role: string) =>
    set(state => ({
      collaborators: state.collaborators.map(c =>
        c.id === 'you' ? { ...c, name, role } : c
      )
    })),
}));