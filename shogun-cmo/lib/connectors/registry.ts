import { connectorCatalog } from "./catalog";
import { ConnectorUnavailableError, type ConnectorAdapter, type ConnectorDefinition, type ConnectorExecutionInput, type ConnectorExecutionResult, type ConnectorState } from "./types";

export class ConnectorRegistry {
  private readonly definitions = new Map<string, ConnectorDefinition>();
  private readonly adapters = new Map<string, ConnectorAdapter>();

  constructor(definitions: ConnectorDefinition[] = []) {
    for (const definition of definitions) this.register(definition);
  }

  register(definition: ConnectorDefinition, adapter?: ConnectorAdapter) {
    this.definitions.set(definition.id, definition);
    if (adapter) this.adapters.set(definition.id, adapter);
  }

  get(id: string) {
    return this.definitions.get(id);
  }

  list(category?: ConnectorDefinition["category"]): ConnectorState[] {
    return [...this.definitions.values()]
      .filter(definition => !category || definition.category === category)
      .map(definition => this.state(definition));
  }

  capabilities(id: string) {
    const definition = this.require(id);
    return definition.capabilities;
  }

  async health(id: string) {
    const definition = this.require(id);
    const adapter = this.adapters.get(id);
    if (!adapter) return this.state(definition);
    const result = await adapter.health();
    return { ...this.state(definition), healthy: result.healthy, statusMessage: result.message ?? "Health check completed." };
  }

  async execute(input: ConnectorExecutionInput): Promise<ConnectorExecutionResult> {
    const definition = this.require(input.connectorId);
    const capability = definition.capabilities.find(item => item.id === input.capability);
    if (!capability) throw new ConnectorUnavailableError(`Capability "${input.capability}" is not registered for connector "${input.connectorId}".`);
    const adapter = this.adapters.get(input.connectorId);
    if (!adapter) throw new ConnectorUnavailableError(`Connector "${input.connectorId}" has no execution adapter configured.`);
    return adapter.execute(input);
  }

  private require(id: string) {
    const definition = this.get(id);
    if (!definition) throw new ConnectorUnavailableError(`Connector "${id}" is not registered.`);
    return definition;
  }

  private state(definition: ConnectorDefinition): ConnectorState {
    const implemented = definition.availability === "implemented";
    const configured = implemented && (definition.auth === "none" || definition.auth === "manual" ? true : (definition.configKeys ?? []).length > 0 && (definition.configKeys ?? []).every(key => Boolean(process.env[key])));
    const connected = implemented && configured && Boolean(this.adapters.get(definition.id));
    const status = definition.availability === "deferred" ? "UNAVAILABLE" : !implemented ? "UNAVAILABLE" : connected ? "CONNECTED" : configured ? "CONFIGURED" : definition.auth === "none" || definition.auth === "manual" ? "AVAILABLE" : "AUTH_REQUIRED";
    return {
      ...definition,
      status,
      configured,
      connected,
      healthy: connected || (implemented && configured),
      lastSync: null,
      statusMessage: definition.availability === "deferred" ? "Deferred; no verified adapter is enabled." : !implemented ? "Documented connector; adapter is not installed in this workspace." : connected ? "Adapter registered and configured." : configured ? "Credentials are configured; connection verification is pending." : definition.auth === "none" ? "Public read access is available." : "Provider authorization is required.",
    };
  }
}

export const connectorRegistry = new ConnectorRegistry(connectorCatalog);
