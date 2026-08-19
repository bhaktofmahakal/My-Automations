"use client";

import { useEffect, useMemo, useState } from "react";
import { routeByView, viewFromPath, type View } from "../lib/routes";

export type { View } from "../lib/routes";
type Data = { workspace?: any; opportunities: any[]; approvals: any[]; campaigns: any[]; activity: any[]; integrations: any[]; signals: any[] };

const navigation: Array<{ id: View; label: string; glyph: string; group?: string }> = [
  { id: "overview", label: "Overview", glyph: "01" },
  { id: "opportunities", label: "Opportunities", glyph: "02" },
  { id: "campaigns", label: "Campaigns", glyph: "03" },
  { id: "approvals", label: "Approvals", glyph: "04" },
  { id: "brain", label: "Company Brain", glyph: "05" },
  { id: "signals", label: "Signals", glyph: "06" },
  { id: "research", label: "Research", glyph: "07" },
  { id: "activity", label: "Activity", glyph: "08" },
  { id: "skills", label: "Skills", glyph: "09", group: "TOOLS" },
  { id: "command", label: "AI CMO Chat", glyph: "10" },
  { id: "integrations", label: "Integrations", glyph: "11" },
  { id: "settings", label: "Settings", glyph: "12" },
];


const skills = [
  ["research", "Research", "Discover findings and gather evidence.", "Tavily / Firecrawl / TinyFish"],
  ["opportunity", "Opportunity", "Score signals and surface what matters.", "Company Brain"],
  ["content", "Content", "Write founder-editable drafts and assets.", "Groq / OrcaRouter"],
  ["social", "Social", "Prepare channel-specific social drafts.", "Approval required"],
  ["community", "Community", "Find and stage Reddit or HN responses.", "Human posting only"],
  ["seo_geo", "SEO / GEO", "Improve search and answer visibility.", "Evidence required"],
  ["coding", "Coding", "Prepare technical changes and PRs.", "No autonomous merge"],
  ["review", "Review", "Check claims, voice, evidence, and safety.", "Final quality gate"],
];

export function ProductApp({ initialView = "overview", initialOpportunityId, initialCampaignId }: { initialView?: View; initialOpportunityId?: string; initialCampaignId?: string }) {
  const [view, setView] = useState<View>(initialView);
  const [data, setData] = useState<Data>({ opportunities: [], approvals: [], campaigns: [], activity: [], integrations: [], signals: [] });
  const [brain, setBrain] = useState<any[]>([]);
  const [campaignDetail, setCampaignDetail] = useState<any>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [signal, setSignal] = useState("");
  const [researchQuery, setResearchQuery] = useState("");
  const [researchMode, setResearchMode] = useState<"discovery" | "fetch" | "browser">("discovery");
  const [researchSources, setResearchSources] = useState<any[]>([]);
  const [researchLoading, setResearchLoading] = useState(false);
  const [researchError, setResearchError] = useState("");
  const [goal, setGoal] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const [overviewResponse, signalsResponse, brainResponse] = await Promise.all([
        fetch("/api/overview", { cache: "no-store" }),
        fetch("/api/signals", { cache: "no-store" }),
        fetch("/api/brain", { cache: "no-store" }),
      ]);
      if (!overviewResponse.ok || !signalsResponse.ok || !brainResponse.ok) throw new Error("Workspace data could not be loaded.");
      const overview = await overviewResponse.json();
      const signalData = await signalsResponse.json();
      const brainData = await brainResponse.json();
      setData({ ...overview, signals: signalData.signals ?? [] });
      setBrain(brainData.modules ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Workspace data could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);
  useEffect(() => {
    if (!initialOpportunityId) return;
    const listed = data.opportunities.find(item => item.id === initialOpportunityId);
    if (listed) setSelectedOpportunity(listed);
    fetch(`/api/opportunities/${initialOpportunityId}`, { cache: "no-store" }).then(response => response.ok ? response.json() : null).then(result => { if (result?.opportunity) setSelectedOpportunity(result.opportunity); }).catch(() => setError("Opportunity details could not be loaded."));
  }, [initialOpportunityId, data.opportunities]);
  useEffect(() => {
    if (!initialCampaignId || campaignDetail) return;
    fetch(`/api/campaigns/${initialCampaignId}`, { cache: "no-store" }).then(response => response.ok ? response.json() : null).then(result => setCampaignDetail(result)).catch(() => setError("Campaign details could not be loaded."));
  }, [initialCampaignId, campaignDetail]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPaletteOpen(true); }
      if (event.key === "Escape") { setPaletteOpen(false); setNotificationsOpen(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (nextView: View, resourceId?: string) => {
    setView(nextView); setPaletteOpen(false); setNotificationsOpen(false);
    const base = routeByView[nextView];
    const path = resourceId && (nextView === "opportunity" || nextView === "campaign") ? `${base}/${resourceId}` : base;
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
  };
  useEffect(() => {
    const onPopState = () => setView(viewFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const currentTitle = navigation.find(item => item.id === view)?.label ?? "Overview";

  async function submitGoalText(text: string) {
    if (!text.trim()) return;
    const response = await fetch("/api/campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goal: text }) });
    const result = await response.json();
    if (!response.ok) { setNotice(result.error ?? "Campaign could not be created."); return; }
    setNotice("Campaign created with a dependency-aware task DAG."); setGoal(""); await refresh(); navigate("campaigns");
  }

  async function submitSignal(event: React.FormEvent) {
    event.preventDefault();
    if (!signal.trim()) return;
    const response = await fetch("/api/signals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: signal, title: signal, source: "founder", type: "founder_input" }) });
    const result = await response.json();
    setNotice(result.duplicate ? "Duplicate signal ignored." : result.error ?? "Signal normalized and classified."); setSignal(""); await refresh();
    if (!result.duplicate) navigate("opportunities");
  }

  async function runResearch(event: React.FormEvent) {
    event.preventDefault();
    if (!researchQuery.trim()) return;
    setResearchLoading(true); setResearchError("");
    try {
      const response = await fetch("/api/research", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: researchQuery, mode: researchMode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Research failed.");
      setResearchSources(result.sources ?? []); setNotice("Research completed with traceable sources.");
    } catch (researchFailure) { setResearchError(researchFailure instanceof Error ? researchFailure.message : "Research failed."); }
    finally { setResearchLoading(false); }
  }

  async function stageAction(opportunityId: string, channel = "community") {
    const response = await fetch("/api/opportunities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ opportunityId, channel }) });
    const result = await response.json(); setNotice(result.error ?? "Action staged for approval."); await refresh();
  }

  async function takeApproval(actionId: string, action: "approve" | "reject" | "retry", reason?: string, editedPayload?: string) {
    const response = await fetch("/api/approvals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actionId, action, reason, editedPayload }) });
    const result = await response.json(); setNotice(result.error ?? `Action ${String(result.state).toLowerCase()}.`); setSelectedApproval(null); await refresh();
  }

  async function saveBrain(module: any) {
    const response = await fetch("/api/brain", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: module.id, content: module.content }) });
    const result = await response.json(); setNotice(result.error ?? "Company Brain module updated."); await refresh();
  }

  async function openCampaign(campaign: any) {
    setCampaignDetail(null); navigate("campaign", campaign.id);
    const response = await fetch(`/api/campaigns/${campaign.id}`, { cache: "no-store" });
    const result = await response.json();
    setCampaignDetail(result);
  }

  async function connectGithub() {
    const response = await fetch("/api/corsair/connect", { method: "POST" });
    const result = await response.json();
    if (result.connectUrl) window.open(result.connectUrl, "_blank", "noopener,noreferrer");
    setNotice(result.error ?? "Corsair connect page opened in a new tab.");
  }

  const viewContent = () => {
    if (loading && view === "overview") return <LoadingState />;
    if (view === "overview") return <Overview data={data} onNavigate={navigate} onStage={stageAction} onOpenOpportunity={item => { setSelectedOpportunity(item); navigate("opportunity", item.id); }} onOpenApproval={item => setSelectedApproval(item)} onGoal={submitGoalText} />;
    if (view === "opportunities") return <Opportunities data={data} onNavigate={navigate} onOpen={item => { setSelectedOpportunity(item); navigate("opportunity", item.id); }} onStage={stageAction} />;
    if (view === "opportunity") return <OpportunityDetail item={selectedOpportunity} onBack={() => navigate("opportunities")} onStage={stageAction} />;
    if (view === "campaigns") return <Campaigns data={data} goal={goal} setGoal={setGoal} onSubmit={event => { event.preventDefault(); submitGoalText(goal); }} onOpen={openCampaign} />;
    if (view === "campaign") return <CampaignDetail detail={campaignDetail} onBack={() => navigate("campaigns")} />;
    if (view === "approvals") return <Approvals data={data} onReview={item => setSelectedApproval(item)} />;
    if (view === "brain") return <Brain modules={brain} setModules={setBrain} onSave={saveBrain} />;
    if (view === "signals") return <Signals data={data} signal={signal} setSignal={setSignal} onSubmit={submitSignal} />;
    if (view === "research") return <Research query={researchQuery} setQuery={setResearchQuery} mode={researchMode} setMode={setResearchMode} sources={researchSources} loading={researchLoading} error={researchError} onSubmit={runResearch} />;
    if (view === "activity") return <Activity data={data} />;
    if (view === "command") return <CommandCenter data={data} goal={goal} setGoal={setGoal} onGoal={submitGoalText} onNavigate={navigate} />;
    if (view === "skills") return <Skills />;
    if (view === "integrations") return <Integrations data={data} onConnect={connectGithub} />;
    return <Settings />;
  };

  return <div className="app-shell">
    <aside className="app-sidebar">
      <div className="brand-lockup"><span className="brand-mark">S</span><strong>SHOGUN<span>CMO</span></strong></div>
      <div className="workspace-switcher"><span className="workspace-dot" /><span>{data.workspace?.name ?? "ShogunAI"}<small>{data.workspace?.domain ?? "internal workspace"}</small></span><span className="chevron">v</span></div>
      <nav className="primary-nav">{navigation.map((item, index) => <div key={item.id}>{item.group && <span className="nav-group">{item.group}</span>}<button className={view === item.id || (item.id === "opportunities" && view === "opportunity") || (item.id === "campaigns" && view === "campaign") ? "nav-link active" : "nav-link"} onClick={() => navigate(item.id)}><span className="nav-glyph">{item.glyph}</span>{item.label}{item.id === "approvals" && data.approvals.length > 0 ? <b>{data.approvals.length}</b> : null}</button></div>)}</nav>
      <div className="sidebar-bottom"><div className="system-state"><i /> All systems operational</div><div className="profile"><span className="avatar">TT</span><span>Toru Tano<small>Founder workspace</small></span><span className="more">...</span></div></div>
    </aside>
    <main className="app-main">
      <header className="app-header"><div className="header-title"><span className="breadcrumb">SHOGUNAI / CMO</span><h1>{currentTitle}</h1></div><div className="header-actions"><button className="search-trigger" onClick={() => setPaletteOpen(true)}><span>Search anything...</span><kbd>Ctrl K</kbd></button><button className="header-icon" title="Ask ShogunCMO" onClick={() => navigate("command")}>+</button><button className="header-icon notification-trigger" title="Notifications" onClick={() => setNotificationsOpen(value => !value)}>o{data.approvals.length > 0 && <i />}</button><button className="header-icon" title="Help">?</button><button className="profile-mini">T <span>Toru</span></button></div>{notificationsOpen && <Notifications data={data} onReview={item => { setNotificationsOpen(false); setSelectedApproval(item); }} />}</header>
      {notice && <button className="toast" onClick={() => setNotice("")}><span className="toast-dot" />{notice}<b>x</b></button>}
      {error && <div className="global-error"><strong>Workspace unavailable</strong><span>{error}</span><button onClick={refresh}>Retry</button></div>}
      {viewContent()}
    </main>
    {selectedApproval && <ApprovalDrawer item={selectedApproval} onClose={() => setSelectedApproval(null)} onAction={takeApproval} />}
    {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} onNavigate={navigate} onGoal={submitGoalText} />}
  </div>;
}

export function MarketingPage({ section = "home" }: { section?: string }) {
  const content: Record<string, { eyebrow: string; title: string; description: string; cta: string }> = {
    home: { eyebrow: "THE AI CMO FOR TECHNICAL FOUNDERS", title: "Your AI CMO. Always shipping.", description: "ShogunCMO finds opportunities, builds campaigns, creates evidence-grounded content, and stages execution with human approval.", cta: "Book a demo" },
    product: { eyebrow: "PRODUCT", title: "A growth operating system with a memory.", description: "Signals become research, opportunities, campaigns, approvals, execution results, and decision memory in one operational loop.", cta: "Open the product" },
    solutions: { eyebrow: "SOLUTIONS", title: "From product change to market action.", description: "Connect company context, live signals, research providers, skills, and human decisions without turning your team into a content factory.", cta: "See the workflow" },
    resources: { eyebrow: "RESOURCES", title: "Build a sharper growth loop.", description: "Explore the operating patterns behind evidence-first research, approval-first execution, and memory-first marketing.", cta: "Read the product surface" },
    pricing: { eyebrow: "PRICING", title: "Built for internal ShogunAI operations.", description: "The current workspace is optimized for ShogunAI's internal workflow. Commercial plans remain a future phase.", cta: "Talk to the team" },
    demo: { eyebrow: "DEMO", title: "See what matters now.", description: "Walk through signals, opportunities, campaigns, approvals, connectors, and the Company Brain in a real workspace.", cta: "Open the workspace" },
    login: { eyebrow: "WORKSPACE ACCESS", title: "Enter ShogunCMO.", description: "Authentication is intentionally kept behind the workspace boundary until the internal access layer is configured.", cta: "Open local workspace" },
    signup: { eyebrow: "WORKSPACE SETUP", title: "Create an internal workspace.", description: "Workspace provisioning will create the Company Brain, signal sources, approval boundary, and connector registry.", cta: "Start setup" },
  };
  const current = content[section] ?? content.home;
  return <main className="marketing-page"><header className="marketing-nav"><a className="brand-lockup" href="/"><span className="brand-mark">S</span><strong>SHOGUN<span>CMO</span></strong></a><nav><a href="/product">Product</a><a href="/solutions">Solutions</a><a href="/resources">Resources</a><a href="/pricing">Pricing</a></nav><div className="marketing-actions"><a href="/login">Log in</a><a className="button primary-button" href="/demo">Book a demo</a></div></header><section className="marketing-hero"><div className="marketing-copy"><span className="eyebrow">{current.eyebrow}</span><h1>{current.title}</h1><p>{current.description}</p><div className="marketing-cta"><a className="button primary-button" href={section === "home" ? "/demo" : "/overview"}>{current.cta} <span>-&gt;</span></a><a className="button secondary-button" href="/product">See it in action</a></div></div><ProductPreview /></section><section className="marketing-loop"><span className="eyebrow">THE OPERATING LOOP</span><div className="loop-steps">{["Signals", "Research", "Opportunities", "Campaigns", "Approval", "Execution", "Memory"].map((step, index) => <div key={step}><b>{String(index + 1).padStart(2, "0")}</b><strong>{step}</strong></div>)}</div></section><footer className="marketing-footer"><span>SHOGUNCMO / SHOGUNAI</span><div><a href="/overview">Open workspace</a><a href="/product">Product</a><a href="/demo">Demo</a></div></footer></main>;
}

function ProductPreview() { return <div className="marketing-preview"><div className="preview-sidebar"><span className="brand-mark">S</span>{["Overview", "Opportunities", "Campaigns", "Approvals", "Company Brain", "Signals", "Activity"].map((item, index) => <span className={index === 0 ? "active" : ""} key={item}>{String(index + 1).padStart(2, "0")} {item}</span>)}</div><div className="preview-main"><div className="preview-top"><span>SHOGUNAI / CMO</span><span>Search anything... &nbsp; Ctrl K</span></div><div className="preview-title"><span className="eyebrow">LIVE INTELLIGENCE</span><h2>What matters now</h2><p>Top opportunities and actions that move the needle.</p></div><div className="preview-metrics"><span><small>High impact opps</small><b>08</b></span><span><small>Active campaigns</small><b>03</b></span><span><small>Pending approvals</small><b>05</b></span></div><div className="preview-panels"><div><span className="eyebrow">PRIORITIZED</span><strong>Competitor launch creates a search opportunity</strong><small>Score 9.2 / high impact / evidence attached</small></div><div><span className="eyebrow">HUMAN CONTROL</span><strong>3 actions waiting for approval</strong><small>Review drafts, evidence, and execution risk</small></div></div></div></div>; }

export default function Home() { return <MarketingPage />; }

function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
  return <div className="page-header"><div><span className="eyebrow">{eyebrow ?? "WORKSPACE"}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>{actions && <div className="page-actions">{actions}</div>}</div>;
}

function Overview({ data, onNavigate, onStage, onOpenOpportunity, onOpenApproval, onGoal }: { data: Data; onNavigate: (view: View) => void; onStage: (id: string, channel?: string) => void; onOpenOpportunity: (item: any) => void; onOpenApproval: (item: any) => void; onGoal: (goal: string) => void }) {
  return <section className="workspace-page overview-page"><PageHeader eyebrow="LIVE INTELLIGENCE" title="What matters now" description="The most important opportunities and actions moving ShogunAI forward." actions={<button className="button primary-button" onClick={() => onNavigate("command")}>Ask ShogunCMO <span>+</span></button>} />
    <div className="stat-grid"><MetricCard label="High impact opps" value={data.opportunities.length} delta="prioritized" tone="violet" onClick={() => onNavigate("opportunities")} /><MetricCard label="Active campaigns" value={data.campaigns.length} delta="goal-driven work" tone="blue" onClick={() => onNavigate("campaigns")} /><MetricCard label="Pending approvals" value={data.approvals.length} delta="human action required" tone="amber" onClick={() => onNavigate("approvals")} /><MetricCard label="Verified connections" value={data.integrations.filter(item => item.connected).length} delta="provider adapters" tone="green" onClick={() => onNavigate("integrations")} /></div>
    <div className="overview-grid"><Panel title="Top opportunities" label="PRIORITIZED" action={<button className="link-button" onClick={() => onNavigate("opportunities")}>View all -&gt;</button>}><div className="opportunity-stack">{data.opportunities.slice(0, 4).map((item, index) => <OpportunityListItem key={item.id} item={item} index={index} onOpen={onOpenOpportunity} onStage={onStage} />)}{!data.opportunities.length && <EmptyState title="No prioritized opportunities" text="Add a founder signal or connect a source to start the intelligence loop." action={<button className="button secondary-button" onClick={() => onNavigate("signals")}>Add a signal</button>} />}</div></Panel>
      <Panel title="Active campaigns" label="GOAL ENGINE" action={<button className="link-button" onClick={() => onNavigate("campaigns")}>View all -&gt;</button>}><div className="campaign-mini-list">{data.campaigns.slice(0, 4).map(campaign => <button className="campaign-mini" key={campaign.id} onClick={() => onNavigate("campaigns")}><span><strong>{campaign.title}</strong><small>{campaign.goal}</small></span><span className="progress-wrap"><i style={{ width: campaign.status === "completed" ? "100%" : "42%" }} /><small>{campaign.status}</small></span></button>)}{!data.campaigns.length && <EmptyState title="No active campaigns" text="Describe an outcome and the CMO will create a task DAG." />}</div></Panel>
      <Panel title="Pending approvals" label="HUMAN CONTROL" action={<button className="link-button" onClick={() => onNavigate("approvals")}>Review all -&gt;</button>}><div className="approval-mini-list">{data.approvals.slice(0, 4).map(item => <button className="approval-mini" key={item.id} onClick={() => onOpenApproval(item)}><StatusPill state={item.approvalState} /><span><strong>{item.originalPayload}</strong><small>{item.channel} / {timeAgo(item.createdAt)}</small></span><span className="row-arrow">-&gt;</span></button>)}{!data.approvals.length && <EmptyState title="Approval queue is clear" text="Generated actions will appear here before execution." />}</div></Panel>
      <Panel title="Live activity" label="SYSTEM STREAM" action={<button className="link-button" onClick={() => onNavigate("activity")}>Open terminal -&gt;</button>}><ActivityRows items={data.activity.slice(0, 7)} /></Panel>
    </div>
    <Panel title="AI CMO command" label="COMMAND CENTER" className="command-panel"><form className="command-inline" onSubmit={event => { event.preventDefault(); const target = event.currentTarget.elements.namedItem("overviewGoal") as HTMLInputElement; onGoal(target.value); }}><input name="overviewGoal" placeholder="Prepare ShogunAI for Product Hunt launch next Friday..." /><button className="button primary-button">Create campaign <span>+</span></button></form><div className="suggestion-row"><button onClick={() => onGoal("Find the highest-impact opportunities this week")}>Find opportunities this week</button><button onClick={() => onGoal("Prepare ShogunAI for Product Hunt")}>Prepare Product Hunt launch</button><button onClick={() => onNavigate("approvals")}>Show pending approvals</button></div></Panel>
  </section>;
}

function Opportunities({ data, onNavigate, onOpen, onStage }: { data: Data; onNavigate: (view: View) => void; onOpen: (item: any) => void; onStage: (id: string, channel?: string) => void }) {
  const [query, setQuery] = useState("");
  const filtered = data.opportunities.filter(item => `${item.title} ${item.description} ${item.status}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="workspace-page"><PageHeader eyebrow="DECISION SURFACE" title="Opportunities" description="Discover and evaluate growth opportunities from every signal source." actions={<><button className="button secondary-button">Export</button><button className="button primary-button" onClick={() => onNavigate("signals")}>+ New opportunity</button></>} />
    <div className="toolbar"><div className="segmented"><button className="selected">All <b>{data.opportunities.length}</b></button><button>High impact</button><button>New</button><button>In progress</button></div><div className="toolbar-right"><button className="filter-button">Filters v</button><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search opportunities..." /></div></div>
    <div className="data-table opportunities-table"><div className="table-row table-header"><span>Opportunity</span><span>Source</span><span>Score</span><span>Impact</span><span>Effort</span><span>Confidence</span><span>Updated</span><span /></div>{filtered.map(item => <button className="table-row table-item" key={item.id} onClick={() => onOpen(item)}><span className="table-primary"><i className="source-dot violet" /><strong>{item.title}</strong><small>{item.description}</small></span><span>{item.source ?? "Signal"}</span><span className="score-text">{item.compositeScore}</span><span><StatusPill state={item.impactScore >= 8 ? "HIGH" : "MEDIUM"} /></span><span>{item.effortScore <= 3 ? "Low" : "Medium"}</span><span>{Math.round((item.confidenceScore ?? 0) * 100)}%</span><span>{timeAgo(item.createdAt)}</span><span className="row-arrow">-&gt;</span></button>)}{!filtered.length && <EmptyState title="No opportunities found" text="Relevant signals are scored here after normalization and evidence review." />}</div>
  </section>;
}

function OpportunityDetail({ item, onBack, onStage }: { item: any; onBack: () => void; onStage: (id: string, channel?: string) => void }) {
  if (!item) return <section className="workspace-page"><EmptyState title="Opportunity not selected" text="Choose an opportunity from the list to inspect its evidence and actions." action={<button className="button secondary-button" onClick={onBack}>Back to opportunities</button>} /></section>;
  const actions = item.recommendedActionTypes ?? [];
  return <section className="workspace-page detail-page"><button className="back-button" onClick={onBack}>&lt;- Back to opportunities</button><div className="detail-heading"><div><span className="eyebrow">OPPORTUNITY / {item.id}</span><h2>{item.title}</h2><div className="tag-row"><StatusPill state={item.impactScore >= 8 ? "HIGH IMPACT" : "MEDIUM IMPACT"} /><StatusPill state={`SCORE ${item.compositeScore}`} /><StatusPill state={`${Math.round((item.confidenceScore ?? 0) * 100)}% CONFIDENCE`} /></div></div><div className="score-display"><strong>{item.compositeScore}</strong><span>priority score</span></div></div><div className="detail-tabs"><button className="active">Overview</button><button>Evidence</button><button>Recommended actions</button><button>History</button><button>Decision memory</button></div><div className="detail-grid"><Panel title="Why this matters" label="CONTEXT"><p className="long-copy">{item.description}</p><div className="metric-list"><MetricLine label="Impact" value={item.impactScore} /><MetricLine label="Relevance" value={item.relevanceScore} /><MetricLine label="Confidence" value={`${Math.round((item.confidenceScore ?? 0) * 100)}%`} /><MetricLine label="Effort" value={item.effortScore} /></div><div className="why-now"><span>WHY NOW</span><p>{item.whyNow}</p></div></Panel><Panel title="Evidence summary" label={`BUNDLE ${item.evidenceBundleId ? "AVAILABLE" : "PENDING"}`}><div className="evidence-list"><EvidenceRow icon="S" title="Source signal" text={item.source ?? "Normalized signal"} /><EvidenceRow icon="R" title="Research" text={item.evidenceBundleId ? "Evidence bundle attached" : "Research has not been run yet"} /><EvidenceRow icon="B" title="Company Brain" text="Relevant strategy context" /></div><button className="link-button evidence-link">View all evidence -&gt;</button></Panel></div><Panel title="Recommended actions" label={`${actions.length} ACTIONS`} className="recommendations-panel"><div className="recommendation-grid">{actions.map((action: string) => <div className="recommendation-card" key={action}><div><strong>{pretty(action)}</strong><small>{action.includes("community") ? "Community" : action.includes("social") ? "Social" : action.includes("technical") ? "Coding" : "Content"} / Approval required</small></div><button className="button secondary-button" onClick={() => onStage(item.id, action.includes("community") ? "community" : action.includes("technical") ? "github" : "content")}>Stage</button></div>)}{!actions.length && <EmptyState title="No actions recommended" text="Run research before generating actions for this opportunity." />}</div></Panel></section>;
}

function Campaigns({ data, goal, setGoal, onSubmit, onOpen }: { data: Data; goal: string; setGoal: (value: string) => void; onSubmit: (event: React.FormEvent) => void; onOpen: (campaign: any) => void }) {
  return <section className="workspace-page"><PageHeader eyebrow="GOAL ENGINE" title="Campaigns" description="Plan and track multi-step growth initiatives." actions={<form className="inline-form" onSubmit={onSubmit}><input value={goal} onChange={event => setGoal(event.target.value)} placeholder="Founder goal..." /><button className="button primary-button">+ New campaign</button></form>} /><div className="toolbar"><div className="segmented"><button className="selected">All <b>{data.campaigns.length}</b></button><button>Active</button><button>Planning</button><button>Completed</button></div><button className="filter-button">Sort: recent v</button></div><div className="campaign-table">{data.campaigns.map(campaign => <button className="campaign-row" key={campaign.id} onClick={() => onOpen(campaign)}><span className="campaign-icon">C</span><span className="table-primary"><strong>{campaign.title}</strong><small>{campaign.goal}</small></span><span className="campaign-progress"><i style={{ width: campaign.status === "completed" ? "100%" : "42%" }} /><small>{campaign.status}</small></span><span>{campaign.status}</span><span>{campaign.targetDate ? new Date(campaign.targetDate).toLocaleDateString() : "No target date"}</span><span className="row-arrow">-&gt;</span></button>)}{!data.campaigns.length && <EmptyState title="No campaigns yet" text="A founder goal becomes a campaign with parallel skills, tasks, assets, and review gates." />}</div></section>;
}

function CampaignDetail({ detail, onBack }: { detail: any; onBack: () => void }) {
  if (!detail) return <section className="workspace-page"><LoadingState /></section>;
  const campaign = detail.campaign; const tasks = detail.tasks ?? [];
  return <section className="workspace-page detail-page"><button className="back-button" onClick={onBack}>&lt;- Back to campaigns</button><PageHeader eyebrow="CAMPAIGN DETAIL / TASK DAG" title={campaign.title} description={campaign.goal} actions={<><button className="button secondary-button">Edit</button><button className="button primary-button">+ Add task</button></>} /><div className="campaign-summary"><span><small>Status</small><strong>{campaign.status}</strong></span><span><small>Tasks</small><strong>{tasks.length}</strong></span><span><small>Target date</small><strong>{campaign.targetDate ? new Date(campaign.targetDate).toLocaleDateString() : "Not set"}</strong></span></div><div className="campaign-detail-tabs"><button className="active">Task DAG</button><button>List view</button><button>Assets</button><button>Timeline</button><button>Analytics</button></div><div className="dag-layout"><Panel title="Dependency graph" label="PARALLEL WORK" className="dag-panel"><div className="dag-grid">{tasks.map((task: any, index: number) => <div className={`task-node task-${task.status}`} key={task.id}><span className="task-number">{String(index + 1).padStart(2, "0")}</span><div><strong>{task.title}</strong><small>{pretty(task.skillType)} / {pretty(task.status)}</small></div><span className="task-state">{task.status === "completed" ? "ok" : task.status === "blocked" ? "!" : "..."}</span></div>)}</div></Panel><Panel title="Task details" label="SELECTED TASK"><div className="task-detail-empty"><span className="detail-icon">T</span><strong>Select a task</strong><p>Inspect skill context, dependencies, assets, and execution status from the task graph.</p></div></Panel></div></section>;
}

function Approvals({ data, onReview }: { data: Data; onReview: (item: any) => void }) { return <section className="workspace-page"><PageHeader eyebrow="HUMAN CONTROL" title="Approvals" description="Review and approve staged actions before external execution." actions={<input className="search-input" placeholder="Search approvals..." />} /><div className="toolbar"><div className="segmented"><button className="selected">Pending <b>{data.approvals.length}</b></button><button>Approved</button><button>Rejected</button><button>Edited</button></div><button className="filter-button">All types v</button></div><div className="approval-table">{data.approvals.map(item => <div className="approval-row" key={item.id} role="button" tabIndex={0} onClick={() => onReview(item)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") onReview(item); }}><span className="approval-type">{item.channel.slice(0, 1).toUpperCase()}</span><span className="table-primary"><strong>{item.originalPayload}</strong><small>{pretty(item.channel)} / {timeAgo(item.createdAt)}</small></span><StatusPill state={item.approvalState} /><button className="button secondary-button" onClick={() => onReview(item)}>Review</button></div>)}{!data.approvals.length && <EmptyState title="Approval queue is clear" text="Assets and external actions appear here only after a real skill run." />}</div></section>; }

function ApprovalDrawer({ item, onClose, onAction }: { item: any; onClose: () => void; onAction: (id: string, action: "approve" | "reject" | "retry", reason?: string, editedPayload?: string) => void }) { const [draft, setDraft] = useState(item.editedPayload ?? item.originalPayload ?? ""); return <div className="drawer-backdrop" onClick={onClose}><aside className="detail-drawer" onClick={event => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">APPROVAL PREVIEW</span><h2>{pretty(item.channel)} action</h2></div><button className="close-button" onClick={onClose}>x</button></div><div className="drawer-status"><StatusPill state={item.approvalState} /><span>Requested {timeAgo(item.createdAt)}</span></div><div className="drawer-tabs"><button className="active">Preview</button><button>Evidence</button><button>Activity</button></div><label className="field-label">ACTION PAYLOAD<textarea value={draft} onChange={event => setDraft(event.target.value)} /></label><div className="evidence-summary"><span className="eyebrow">WHY THIS ACTION</span><p>Original payload and evidence remain visible. External side effects require explicit founder approval.</p></div><div className="drawer-actions"><button className="button secondary-button" onClick={() => onAction(item.id, "reject", "Rejected from approval drawer")}>Reject</button>{item.approvalState === "FAILED" ? <button className="button primary-button" onClick={() => onAction(item.id, "retry")}>Retry</button> : <button className="button primary-button" onClick={() => onAction(item.id, "approve", undefined, draft)}>Edit & approve</button>}</div></aside></div>; }

function Brain({ modules, setModules, onSave }: { modules: any[]; setModules: (modules: any[]) => void; onSave: (module: any) => void }) { return <section className="workspace-page"><PageHeader eyebrow="CONTEXT LAYER" title="Company Brain" description="The source of truth for product, positioning, strategy, and decisions." actions={<button className="button secondary-button">+ Add module</button>} /><div className="detail-tabs"><button className="active">Strategy modules</button><button>Knowledge base</button><button>Documents</button><button>Competitors</button><button>Voice & tone</button><button>Decision memory</button></div><div className="brain-grid">{modules.map(module => <div className="brain-module" key={module.id}><div className="module-heading"><span className="module-icon">{module.title.slice(0, 1)}</span><span><strong>{module.title}</strong><small>Updated {timeAgo(module.updatedAt)}</small></span><span className="module-version">v{module.version}</span></div><textarea value={module.content} onChange={event => setModules(modules.map(item => item.id === module.id ? { ...item, content: event.target.value } : item))} /><div className="module-footer"><span>Stable knowledge</span><button className="link-button" onClick={() => onSave(module)}>Save module -&gt;</button></div></div>)}</div><div className="brain-lower"><Panel title="Recent updates" label="DECISION MEMORY"><ActivityRows items={[]} /><EmptyState title="No recent updates" text="Founder edits, approvals, and rejections will become decision memory." /></Panel><Panel title="Brain health" label="RETRIEVAL"><MetricLine label="Completeness" value="-" /><MetricLine label="Freshness" value="-" /><MetricLine label="Evidence alignment" value="-" /><p className="muted">Health metrics appear when knowledge sources and decisions are indexed.</p></Panel></div></section>; }

function Signals({ data, signal, setSignal, onSubmit }: { data: Data; signal: string; setSignal: (value: string) => void; onSubmit: (event: React.FormEvent) => void }) { return <section className="workspace-page"><PageHeader eyebrow="INPUT LAYER" title="Signals" description="Normalized events from multiple sources become opportunities through the same pipeline." actions={<form className="inline-form" onSubmit={onSubmit}><input id="signal-create" value={signal} onChange={event => setSignal(event.target.value)} placeholder="Add founder signal..." /><button className="button primary-button">Ingest signal</button></form>} /><div className="toolbar"><div className="segmented"><button className="selected">All <b>{data.signals.length}</b></button><button>Relevant</button><button>Research required</button><button>Duplicates</button></div><button className="filter-button">All sources v</button></div><div className="data-table signals-table"><div className="table-row table-header"><span>Status</span><span>Source / type</span><span>Payload</span><span>Received</span><span /></div>{data.signals.map(item => <div className="table-row table-item" key={item.id}><span><StatusPill state={item.status} /></span><span className="table-primary"><strong>{pretty(item.source)}</strong><small>{pretty(item.type)}</small></span><span>{item.payload?.title ?? item.payload?.message ?? "Signal payload"}</span><span>{timeAgo(item.createdAt)}</span><span className="row-arrow">-&gt;</span></div>)}{!data.signals.length && <EmptyState title="No signals yet" text="Founder input is available now. GitHub, Slack, Notion, community, website, search, and scheduled adapters share this model." />}</div></section>; }

function Research({ query, setQuery, mode, setMode, sources, loading, error, onSubmit }: { query: string; setQuery: (value: string) => void; mode: "discovery" | "fetch" | "browser"; setMode: (value: "discovery" | "fetch" | "browser") => void; sources: any[]; loading: boolean; error: string; onSubmit: (event: React.FormEvent) => void }) { return <section className="workspace-page research-page"><PageHeader eyebrow="EVIDENCE LAYER" title="Research" description="Discover, fetch, and inspect external evidence before it informs an opportunity or action." /><Panel title="Start a research run" label="RESEARCH ROUTER"><form className="research-form" onSubmit={onSubmit}><textarea value={query} onChange={event => setQuery(event.target.value)} placeholder="Research a market, competitor, customer discussion, or search opportunity..." /><div className="research-controls"><div className="segmented"><button type="button" className={mode === "discovery" ? "selected" : ""} onClick={() => setMode("discovery")}>Discovery / Tavily</button><button type="button" className={mode === "fetch" ? "selected" : ""} onClick={() => setMode("fetch")}>Fetch / Firecrawl</button><button type="button" className={mode === "browser" ? "selected" : ""} onClick={() => setMode("browser")}>Browser / TinyFish</button></div><button className="button primary-button" disabled={loading}>{loading ? "Researching..." : "Run research"} <span>-&gt;</span></button></div></form>{error && <div className="inline-error"><strong>Research failed</strong><span>{error}</span></div>}</Panel><div className="research-layout"><Panel title="Evidence sources" label={sources.length ? `${sources.length} SOURCES` : "RUN OUTPUT"}>{sources.length ? <div className="evidence-list">{sources.map((source, index) => <EvidenceRow key={`${source.url ?? source.title ?? index}`} icon="->" title={source.title ?? `Source ${index + 1}`} text={`${source.url ?? "Provider result"}${source.snippet ? ` / ${source.snippet}` : ""}`} />)}</div> : <EmptyState title="No research runs yet" text="Run a query to create provider-backed sources. External web content remains untrusted evidence, never instructions." />}</Panel><Panel title="Run contract" label="PROVENANCE"><MetricLine label="Provider" value={mode === "discovery" ? "Tavily" : mode === "fetch" ? "Firecrawl" : "TinyFish"} /><MetricLine label="Output" value="Evidence bundle" /><MetricLine label="Prompt safety" value="Untrusted content" /><p className="muted">Every source remains linked to the query and provider mode. Research failure never becomes fabricated evidence.</p></Panel></div></section>; }

function Activity({ data }: { data: Data }) { return <section className="workspace-page activity-page"><PageHeader eyebrow="OBSERVABILITY" title="Activity / Terminal" description="Every signal, research run, skill, approval, and execution event is persisted here." actions={<><button className="button secondary-button">Pause</button><button className="button secondary-button">Clear</button></>} /><div className="terminal-filters"><button className="selected">All</button><button>Signals</button><button>Research</button><button>Opportunities</button><button>Actions</button><button>System</button><span /><label>Auto-scroll <input type="checkbox" defaultChecked /></label></div><div className="terminal-window"><div className="terminal-top"><span className="live-dot" /> LIVE <span>workflow stream / persisted SQLite log</span><span className="terminal-meta">provider and model metadata available per event</span></div><div className="terminal-log">{data.activity.map((item, index) => <div className="terminal-line" key={item.id}><time>{new Date(item.timestamp).toLocaleTimeString()}</time><span className={`terminal-event event-${index % 5}`}>{item.stage}</span><span>{item.message}</span><small>{item.metadata?.provider ?? item.metadata?.source ?? "system"}</small></div>)}{!data.activity.length && <EmptyState title="Terminal is quiet" text="New signals and workflow events will stream here." />}</div><div className="terminal-input"><input placeholder="Type to filter logs or run a command..." /><kbd>Enter</kbd></div></div></section>; }

function CommandCenter({ data, goal, setGoal, onGoal, onNavigate }: { data: Data; goal: string; setGoal: (value: string) => void; onGoal: (goal: string) => void; onNavigate: (view: View) => void }) { return <section className="workspace-page command-center"><PageHeader eyebrow="ORCHESTRATOR" title="AI CMO" description="Ask ShogunCMO to find, plan, research, review, or prepare work." /><div className="command-hero"><span className="avatar large">TT</span><div><h3>Good morning, Toru.</h3><p>What would you like ShogunCMO to work on?</p></div></div><form className="command-box" onSubmit={event => { event.preventDefault(); onGoal(goal); }}><textarea value={goal} onChange={event => setGoal(event.target.value)} placeholder="Ask anything... e.g. Prepare ShogunAI for Product Hunt launch next Friday" /><button className="command-send">-&gt;</button></form><div className="suggestion-grid"><button onClick={() => onGoal("Prepare ShogunAI for Product Hunt launch next Friday")}>Prepare Product Hunt launch</button><button onClick={() => onGoal("Find community opportunities this week")}>Find community opportunities</button><button onClick={() => onNavigate("approvals")}>Show me what needs approval</button><button onClick={() => onGoal("Analyze our competitors latest moves")}>Analyze competitor activity</button></div><div className="command-columns"><Panel title="Recent commands" label="HISTORY"><EmptyState title="No commands yet" text="Founder goals will appear here after they create a campaign." /></Panel><Panel title="CMO suggestions" label="CONTEXT"><div className="suggestion-card"><strong>{data.opportunities.length ? "Review your highest impact opportunities" : "Start by adding company context"}</strong><span>{data.opportunities.length ? "Open the opportunities view to inspect evidence." : "Company Brain improves every recommendation."}</span></div><div className="suggestion-card"><strong>Connect your signal sources</strong><span>GitHub is optional; Slack, Notion, search, and founder input use the same signal model.</span></div></Panel></div></section>; }

function Skills() { return <section className="workspace-page"><PageHeader eyebrow="SKILL ENGINE" title="Skills" description="Reusable responsibilities coordinated by the CMO orchestrator." actions={<button className="button secondary-button">View SKILL.md</button>} /><div className="skills-grid">{skills.map(([id, title, description, detail]) => <div className="skill-card" key={id}><div className="skill-icon">{title.slice(0, 1)}</div><div><h3>{title}</h3><p>{description}</p><small>{detail}</small></div><StatusPill state="READY" /></div>)}</div><div className="skill-note"><strong>Skills do not execute side effects.</strong><span>They retrieve Company Brain context, research, evidence, and decision memory before creating assets or approval requests.</span></div></section>; }

function Integrations({ data, onConnect }: { data: Data; onConnect: () => void }) { const groups = ["BOUNDARY", "SIGNAL", "RESEARCH", "LLM", "EXECUTION"]; return <section className="workspace-page"><PageHeader eyebrow="CONNECTOR REGISTRY" title="Integrations" description="Connected devices and data sources. Credentials remain server-side." actions={<button className="button primary-button">+ Add integration</button>} />{groups.map(group => { const items = data.integrations.filter(item => item.kind === group); if (!items.length) return null; return <div className="integration-group" key={group}><div className="group-heading"><span>{group}</span><small>{items.length} registered</small></div><div className="integration-list">{items.map(item => <div className="integration-row" key={item.name}><span className="integration-icon">{item.name.slice(0, 1)}</span><span className="table-primary"><strong>{item.name}</strong><small>{item.description}</small></span><span className="capability-list">{(item.capabilities ?? []).slice(0, 3).map((capability: string) => <em key={capability}>{capability}</em>)}</span><StatusPill state={item.status ?? "NOT_CONFIGURED"} />{item.name === "GitHub" && item.status !== "CONNECTED" ? <button className="button secondary-button" onClick={onConnect}>Connect</button> : <button className="icon-action" title="Integration details">...</button>}</div>)}</div></div>; })}</section>; }

function Settings() { const [saved, setSaved] = useState(false); return <section className="workspace-page"><PageHeader eyebrow="WORKSPACE CONFIGURATION" title="Settings" description="Manage workspace preferences and operational defaults." /><div className="settings-layout"><div className="settings-nav"><button className="active">General</button><button>Integrations</button><button>AI Models</button><button>Team</button><button>Billing</button><button>Advanced</button></div><div className="settings-content"><Panel title="General settings" label="WORKSPACE"><label className="field-label">Workspace name<input defaultValue="ShogunAI" /></label><label className="field-label">Timezone<select defaultValue="Asia/Kolkata"><option>Asia/Kolkata</option><option>UTC</option></select></label><label className="field-label">Language<select defaultValue="English"><option>English</option></select></label><label className="field-label">Date format<select defaultValue="DD/MM/YYYY"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></label><button className="button primary-button" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save changes"}</button></Panel><Panel title="Preferences" label="NOTIFICATIONS"><Preference label="Email notifications" /><Preference label="Slack notifications" /><Preference label="Daily digest" /><Preference label="Weekly report" /></Panel></div></div></section>; }

function Panel({ title, label, action, children, className = "" }: { title: string; label?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) { return <section className={`surface-panel ${className}`}><div className="panel-heading"> <div>{label && <span className="eyebrow">{label}</span>}<h3>{title}</h3></div>{action}</div>{children}</section>; }
function MetricCard({ label, value, delta, tone, onClick }: { label: string; value: string | number; delta: string; tone: string; onClick: () => void }) { return <button className={`metric-card tone-${tone}`} onClick={onClick}><span>{label}</span><strong>{value}</strong><small>{delta}</small><i className="sparkline" /></button>; }
function OpportunityListItem({ item, index, onOpen, onStage }: { item: any; index: number; onOpen: (item: any) => void; onStage: (id: string, channel?: string) => void }) { return <div className="opportunity-list-item"><button className="list-main" onClick={() => onOpen(item)}><span className="rank">{String(index + 1).padStart(2, "0")}</span><span className="table-primary"><strong>{item.title}</strong><small>{item.description}</small><span className="tag-row"><StatusPill state={item.impactScore >= 8 ? "HIGH IMPACT" : "MEDIUM IMPACT"} /><StatusPill state={item.source ?? "SIGNAL"} /></span></span><span className="list-score"><strong>{item.compositeScore}</strong><small>score</small></span></button><button className="row-action" onClick={() => onStage(item.id)}>Stage</button></div>; }
function ActivityRows({ items }: { items: any[] }) { return <div className="activity-rows">{items.map(item => <div className="activity-row" key={item.id}><span className="activity-marker" /><span className="activity-stage">{item.stage}</span><span>{item.message}</span><time>{timeAgo(item.timestamp)}</time></div>)}{!items.length && <div className="empty-inline">No activity recorded yet.</div>}</div>; }
function EvidenceRow({ icon, title, text }: { icon: string; title: string; text: string }) { return <div className="evidence-row"><span className="evidence-icon">{icon}</span><span><strong>{title}</strong><small>{text}</small></span><span className="row-arrow">-&gt;</span></div>; }
function MetricLine({ label, value }: { label: string; value: string | number }) { return <div className="metric-line"><span>{label}</span><strong>{value}</strong></div>; }
function StatusPill({ state }: { state: string }) { const normalized = String(state).replaceAll("_", " "); return <span className={`status-pill status-${normalized.toLowerCase().replaceAll(" ", "-")}`}><i />{normalized}</span>; }
function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) { return <div className="empty-state"><span className="empty-icon">o</span><strong>{title}</strong><p>{text}</p>{action}</div>; }
function LoadingState() { return <section className="workspace-page loading-state"><div className="skeleton wide" /><div className="skeleton-row"><div className="skeleton" /><div className="skeleton" /><div className="skeleton" /></div><div className="skeleton large" /></section>; }
function Notifications({ data, onReview }: { data: Data; onReview: (item: any) => void }) { return <div className="notification-popover"><div className="popover-heading"><strong>Notifications</strong><span>{data.approvals.length} pending</span></div>{data.approvals.slice(0, 4).map(item => <button key={item.id} onClick={() => onReview(item)}><StatusPill state={item.approvalState} /><span>{item.originalPayload}<small>{timeAgo(item.createdAt)}</small></span></button>)}{!data.approvals.length && <p>No new notifications.</p>}</div>; }
function CommandPalette({ onClose, onNavigate, onGoal }: { onClose: () => void; onNavigate: (view: View) => void; onGoal: (goal: string) => void }) { const [query, setQuery] = useState(""); const commands = [{ label: "Find opportunities", view: "opportunities" as View }, { label: "Prepare Product Hunt launch", goal: "Prepare ShogunAI for Product Hunt" }, { label: "Show pending approvals", view: "approvals" as View }, { label: "Open Company Brain", view: "brain" as View }, { label: "Open integrations", view: "integrations" as View }, { label: "Open activity terminal", view: "activity" as View }].filter(command => command.label.toLowerCase().includes(query.toLowerCase())); return <div className="palette-backdrop" onClick={onClose}><div className="command-palette" onClick={event => event.stopPropagation()}><div className="palette-search"><span>/</span><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search commands, actions, or ask anything..." /><kbd>Esc</kbd></div><div className="palette-list">{commands.map(command => <button key={command.label} onClick={() => { if (command.goal) onGoal(command.goal); else if (command.view) onNavigate(command.view); }}><span className="command-icon">+</span><span>{command.label}</span><kbd>Enter</kbd></button>)}{!commands.length && <EmptyState title="No command found" text="Try a workspace page or a founder goal." />}</div></div></div>; }
function Preference({ label }: { label: string }) { return <label className="preference"><span>{label}</span><input type="checkbox" /></label>; }
function pretty(value: string) { return String(value ?? "").replaceAll("_", " ").replace(/\b\w/g, char => char.toUpperCase()); }
function timeAgo(value?: string) { if (!value) return "-"; const ms = Date.now() - new Date(value).getTime(); if (ms < 60_000) return "now"; if (ms < 3_600_000) return `${Math.max(1, Math.round(ms / 60_000))}m ago`; if (ms < 86_400_000) return `${Math.round(ms / 3_600_000)}h ago`; return `${Math.round(ms / 86_400_000)}d ago`; }
