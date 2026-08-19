export type View = "overview" | "opportunities" | "opportunity" | "campaigns" | "campaign" | "approvals" | "brain" | "signals" | "research" | "activity" | "command" | "skills" | "integrations" | "settings";

export const routeByView: Record<View, string> = { overview: "/overview", opportunities: "/opportunities", opportunity: "/opportunities", campaigns: "/campaigns", campaign: "/campaigns", approvals: "/approvals", brain: "/brain", signals: "/signals", research: "/research", activity: "/activity", command: "/ai-cmo", skills: "/skills", integrations: "/integrations", settings: "/settings" };

export function viewFromPath(pathname: string): View {
  const path = pathname.replace(/\/$/, "") || "/overview";
  if (path.startsWith("/opportunities/") && path !== "/opportunities") return "opportunity";
  if (path.startsWith("/campaigns/") && path !== "/campaigns") return "campaign";
  const match = Object.entries(routeByView).find(([, route]) => route === path);
  return (match?.[0] as View | undefined) ?? "overview";
}
