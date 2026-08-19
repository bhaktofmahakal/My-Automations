import { describe, expect, it } from "vitest";
import { ConnectorRegistry } from "./registry";
import type { ConnectorDefinition } from "./types";

const slack: ConnectorDefinition = {
  id: "slack",
  provider: "Slack",
  category: "signal",
  auth: "corsair_managed",
  availability: "documented",
  signalTypes: ["slack_message"],
  capabilities: [{ id: "messages.read", label: "Read messages", direction: "read", approvalRequired: false }],
  description: "Test connector",
};

describe("ConnectorRegistry", () => {
  it("lists providers without making GitHub a domain dependency", () => {
    const registry = new ConnectorRegistry([slack]);
    expect(registry.list().map(item => item.id)).toEqual(["slack"]);
    expect(registry.capabilities("slack")[0].id).toBe("messages.read");
  });

  it("does not execute without a registered adapter", async () => {
    const registry = new ConnectorRegistry([slack]);
    await expect(registry.execute({ connectorId: "slack", capability: "messages.read", payload: {}, idempotencyKey: "test-1" })).rejects.toThrow("no execution adapter");
  });
});
