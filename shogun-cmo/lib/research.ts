import { config } from "./config";

export type ResearchMode = "discovery" | "fetch" | "browser";
export interface ResearchSource { title: string; url: string; snippet: string; provider: string; }
export class ResearchUnavailableError extends Error { constructor(message: string) { super(message); this.name = "ResearchUnavailableError"; } }

export interface ResearchProvider { id: string; modes: ResearchMode[]; run(query: string): Promise<ResearchSource[]>; }

export class ResearchRouter {
  async run(query: string, mode: ResearchMode = "discovery"): Promise<ResearchSource[]> {
    if (mode === "discovery" && config.TAVILY_API_KEY) return tavily(query);
    if (mode === "fetch" && config.FIRECRAWL_API_KEY) return firecrawl(query);
    if (mode === "browser" && config.TINYFISH_API_URL) return tinyfish(query);
    throw new ResearchUnavailableError(`${mode} research is not configured. No fabricated sources were returned.`);
  }

  providers(): Array<{ id: string; mode: ResearchMode; configured: boolean }> {
    return [
      { id: "tavily", mode: "discovery", configured: Boolean(config.TAVILY_API_KEY) },
      { id: "firecrawl", mode: "fetch", configured: Boolean(config.FIRECRAWL_API_KEY) },
      { id: "tinyfish", mode: "browser", configured: Boolean(config.TINYFISH_API_URL) },
    ];
  }
}

export const researchRouter = new ResearchRouter();

export async function research(query: string, mode: ResearchMode = "discovery"): Promise<ResearchSource[]> {
  return researchRouter.run(query, mode);
}

async function tavily(query: string) { const response = await fetch("https://api.tavily.com/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ api_key: config.TAVILY_API_KEY, query, search_depth: "advanced", max_results: 5 }) }); if (!response.ok) throw new ResearchUnavailableError(`Tavily returned ${response.status}.`); const body = await response.json() as { results?: Array<{ title: string; url: string; content: string }> }; return (body.results ?? []).map(x => ({ title: x.title, url: x.url, snippet: x.content, provider: "tavily" })); }
async function firecrawl(url: string) { const response = await fetch("https://api.firecrawl.dev/v1/scrape", { method: "POST", headers: { Authorization: `Bearer ${config.FIRECRAWL_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ url, formats: ["markdown"] }) }); if (!response.ok) throw new ResearchUnavailableError(`Firecrawl returned ${response.status}.`); const body = await response.json() as { data?: { markdown?: string; metadata?: { title?: string; sourceURL?: string } } }; return [{ title: body.data?.metadata?.title ?? url, url: body.data?.metadata?.sourceURL ?? url, snippet: body.data?.markdown?.slice(0, 2000) ?? "", provider: "firecrawl" }]; }
async function tinyfish(query: string) { const response = await fetch(config.TINYFISH_API_URL!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query }) }); if (!response.ok) throw new ResearchUnavailableError(`TinyFish returned ${response.status}.`); const body = await response.json() as { results?: ResearchSource[] }; return (body.results ?? []).map(x => ({ ...x, provider: "tinyfish" })); }
