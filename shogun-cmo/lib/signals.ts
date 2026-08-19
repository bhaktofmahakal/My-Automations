export interface NormalizedSignal {
  source: string;
  type: string;
  idempotencyKey: string;
  payload: Record<string, unknown>;
}

export interface SignalSourceAdapter {
  id: string;
  connectorId: string;
  signalTypes: string[];
  normalize(input: unknown): NormalizedSignal;
}

export class SignalSourceRegistry {
  private readonly sources = new Map<string, SignalSourceAdapter>();

  register(source: SignalSourceAdapter) {
    this.sources.set(source.id, source);
  }

  get(id: string) {
    return this.sources.get(id);
  }

  list() {
    return [...this.sources.values()].map(source => ({ id: source.id, connectorId: source.connectorId, signalTypes: source.signalTypes }));
  }

  normalize(sourceId: string, input: unknown) {
    const source = this.get(sourceId);
    if (!source) throw new Error(`Signal source "${sourceId}" is not registered.`);
    return source.normalize(input);
  }
}

const simpleSource = (id: string, connectorId: string, signalTypes: string[]): SignalSourceAdapter => ({
  id,
  connectorId,
  signalTypes,
  normalize(input) {
    const payload = input && typeof input === "object" ? input as Record<string, unknown> : { value: input };
    const explicitKey = typeof payload.idempotencyKey === "string" ? payload.idempotencyKey : undefined;
    return { source: id, type: signalTypes[0], idempotencyKey: explicitKey ?? `${id}:${JSON.stringify(payload)}`, payload };
  },
});

export const signalSourceRegistry = new SignalSourceRegistry();
for (const source of [
  simpleSource("github", "github", ["github_commit", "github_pull_request", "github_release"]),
  simpleSource("slack", "slack", ["slack_message", "slack_mention"]),
  simpleSource("notion", "notion", ["notion_change"]),
  simpleSource("reddit", "reddit", ["reddit_discussion"]),
  simpleSource("hacker_news", "hacker_news", ["hacker_news_discussion"]),
  simpleSource("website", "website", ["website_change"]),
  simpleSource("competitor", "competitor", ["competitor_change"]),
  simpleSource("search", "google", ["search_opportunity"]),
  simpleSource("founder", "founder", ["founder_input"]),
  simpleSource("scheduler", "scheduler", ["scheduled_trigger"]),
]) signalSourceRegistry.register(source);
