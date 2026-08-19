import { describe, expect, it } from "vitest";
import { scoreOpportunity } from "../lib/engine";

describe("opportunity scoring", () => {
  it("returns a deterministic score", () => {
    expect(scoreOpportunity({ impact: 8, effort: 3, confidence: 0.9, relevance: 0.9, freshness: 1, evidenceQuality: 0.8 })).toBe(6.41);
  });
  it("penalizes high effort", () => {
    expect(scoreOpportunity({ impact: 8, effort: 8, confidence: 0.9, relevance: 0.9 })).toBeLessThan(scoreOpportunity({ impact: 8, effort: 2, confidence: 0.9, relevance: 0.9 }));
  });
});
