export type ConnectorCategory = "signal" | "research" | "llm" | "execution";
export type ConnectorStatus = "AVAILABLE" | "CONFIGURED" | "CONNECTED" | "AUTH_REQUIRED" | "NOT_CONFIGURED" | "UNAVAILABLE" | "DEGRADED";
export type CapabilityDirection = "read" | "write" | "read_write";

export interface ConnectorCapability {
  id: string;
  label: string;
  direction: CapabilityDirection;
  approvalRequired: boolean;
}

export interface ConnectorDefinition {
  id: string;
  provider: string;
  category: ConnectorCategory;
  auth: "corsair_managed" | "api_key" | "oauth" | "none" | "manual";
  packageName?: string;
  availability: "implemented" | "documented" | "deferred";
  configKeys?: string[];
  signalTypes?: string[];
  capabilities: ConnectorCapability[];
  description: string;
}

export interface ConnectorState extends ConnectorDefinition {
  status: ConnectorStatus;
  configured: boolean;
  connected: boolean;
  healthy: boolean;
  lastSync: string | null;
  statusMessage: string;
}

export interface ConnectorExecutionInput {
  connectorId: string;
  capability: string;
  payload: unknown;
  approvalId?: string;
  idempotencyKey: string;
}

export interface ConnectorExecutionResult {
  connectorId: string;
  capability: string;
  status: "EXECUTED" | "FAILED";
  externalReference?: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectorAdapter {
  health(): Promise<{ healthy: boolean; message?: string }>;
  execute(input: ConnectorExecutionInput): Promise<ConnectorExecutionResult>;
}

export class ConnectorUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConnectorUnavailableError";
  }
}
