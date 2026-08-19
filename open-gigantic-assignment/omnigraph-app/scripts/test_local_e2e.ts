/**
 * Local E2E API verification against the running dev server (http://localhost:3000).
 * Uses the ACTUAL route schemas verified from source:
 *  - /api/repo/self:      POST (self-ingest) -> { status, ingestedFiles, scenario }
 *  - /api/repo/fetch:     POST { repoUrl, action } -> git tree / file content
 *  - /api/memory:         GET status; POST { action, ... } (persist_beads/fetch_beads/locks/team events/vector_search)
 *  - /api/agents/psmas-run: GET -> { status:'ok', engine, gateways }
 *  - /api/graph/traverse: POST { nodes, edges, targetNodeId } -> { status, nodes, metrics }
 *  - /api/tokens/benchmark: POST { repoUrl, files } -> { status, aggregate } (400 on empty)
 *  - /api/repo/export-pr: POST { repoUrl, files, hunks, githubToken? } -> bundle | github_pr_created | 502 error
 */

const BASE = 'http://localhost:3000';
export {};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: unknown) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}${details !== undefined ? ` -> ${JSON.stringify(details).slice(0, 200)}` : ''}`);
  }
}

function errMsg(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

async function main() {
  // ── Screens ──
  console.log('\n🧪 [SCREENS]');
  const screens = ['/', '/command', '/diff', '/graph', '/ide', '/multiplayer', '/psmas', '/settings', '/telemetry', '/timeline'];
  for (const s of screens) {
    try {
      const res = await fetch(`${BASE}${s}`);
      assert(res.ok, `GET ${s} -> ${res.status}`);
    } catch (err) {
      assert(false, `GET ${s}`, errMsg(err));
    }
  }

  // ── /api/memory: status + real Upstash round-trip ──
  console.log('\n🧪 [TEST] /api/memory (Upstash Redis + Vector)');
  try {
    const res = await fetch(`${BASE}/api/memory`);
    assert(res.ok, 'GET /api/memory -> 200');
    const data = await res.json();
    assert(data.status === 'success', 'memory status=success');
    assert(Boolean(data.redis), 'redis metadata present');
    assert(Boolean(data.vector), 'vector metadata present');
  } catch (err) {
    assert(false, '/api/memory GET', errMsg(err));
  }

  console.log('\n🧪 [TEST] /api/memory POST (action-based round-trips)');
  try {
    // persist + fetch beads
    const sessionId = `e2e-${Date.now()}`;
    const beads = [{ id: 'b1', label: 'test-bead', status: 'pending', deps: [] }];
    const persist = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'persist_beads', sessionId, beads }),
    });
    assert(persist.ok, 'POST persist_beads -> OK');

    const fetchBeads = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'fetch_beads', sessionId }),
    });
    const fetchData = await fetchBeads.json();
    assert(fetchBeads.ok && Array.isArray(fetchData.beads) && fetchData.beads.length > 0, 'POST fetch_beads round-trip');

    // team events
    const evt = { action: 'post_team_event', event: { id: 'e1', type: 'checkpoint', text: 'e2e' } };
    const postEvt = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evt),
    });
    assert(postEvt.ok, 'POST post_team_event -> OK');

    const getEvt = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_team_events' }),
    });
    const evtData = await getEvt.json();
    assert(getEvt.ok && Array.isArray(evtData.events), 'POST get_team_events -> OK');

    // locks round-trip
    const lock = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'acquire_lock', nodeId: 'n-e2e', holderId: 'e2e-runner', ttlSec: 15 }),
    });
    assert(lock.ok, 'POST acquire_lock -> OK');

    // unknown action -> 400
    const bad = await fetch(`${BASE}/api/memory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'nope' }),
    });
    assert(bad.status === 400, 'POST unknown action -> 400');
  } catch (err) {
    assert(false, '/api/memory POST round-trip', errMsg(err));
  }

  // ── /api/tokens/benchmark ──
  console.log('\n🧪 [TEST] /api/tokens/benchmark');
  try {
    const res = await fetch(`${BASE}/api/tokens/benchmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repoUrl: 'https://github.com/django/django',
        files: [
          { path: 'src/main.ts', currentCode: 'export function processAuth(t: string) { return t.length > 0; }' },
          { path: 'src/config.ts', currentCode: 'export const config = { port: 3000, env: "prod" };' },
        ],
      }),
    });
    assert(res.ok, 'POST /api/tokens/benchmark -> 200');
    const data = await res.json();
    assert(data.status === 'success', 'benchmark status=success');
    assert(data.aggregate && data.aggregate.totalRawTokens > 0, 'totalRawTokens > 0');
    assert(
      data.aggregate.totalCompressedTokens < data.aggregate.totalRawTokens,
      `compressed(${data.aggregate?.totalCompressedTokens}) < raw(${data.aggregate?.totalRawTokens})`
    );
    const emptyRes = await fetch(`${BASE}/api/tokens/benchmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl: 'https://github.com/django/django', files: [] }),
    });
    assert(emptyRes.status === 400, 'benchmark empty files -> 400');
  } catch (err) {
    assert(false, '/api/tokens/benchmark', errMsg(err));
  }

  // ── /api/agents/psmas-run ──
  console.log('\n🧪 [TEST] /api/agents/psmas-run');
  try {
    const res = await fetch(`${BASE}/api/agents/psmas-run`);
    assert(res.ok, 'GET /api/agents/psmas-run -> 200');
    const data = await res.json();
    assert(data.status === 'ok', 'swarm status=ok');
    assert(data.engine && data.engine.includes('PSMAS'), 'engine contains PSMAS');
    assert(Boolean(data.gateways?.orcarouter), 'orcarouter gateway documented');
    assert(Boolean(data.gateways?.groq), 'groq gateway documented');
  } catch (err) {
    assert(false, '/api/agents/psmas-run', errMsg(err));
  }

  // ── /api/repo/self (self-ingest) ──
  console.log('\n🧪 [TEST] /api/repo/self (self-ingest)');
  try {
    const res = await fetch(`${BASE}/api/repo/self`, { method: 'POST' });
    assert(res.ok, 'POST /api/repo/self -> OK');
    const data = await res.json();
    assert(data.status === 'success', 'self status=success');
    assert(Number(data.ingestedFiles) > 0, `ingestedFiles > 0 (${data.ingestedFiles})`);
    assert(Boolean(data.scenario?.title), 'scenario.title present');
  } catch (err) {
    assert(false, '/api/repo/self', errMsg(err));
  }

  // ── /api/repo/fetch (GitHub scan on a real public repo) ──
  console.log('\n🧪 [TEST] /api/repo/fetch (public GitHub scan)');
  try {
    const scan = await fetch(`${BASE}/api/repo/fetch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl: 'https://github.com/expressjs/express', action: 'scan' }),
    });
    assert(scan.ok, 'POST /api/repo/fetch scan -> OK');
    const scanData = await scan.json();
    assert(Array.isArray(scanData.tree) && scanData.tree.length > 0, `tree has ${scanData.tree?.length ?? 0} entries`);

    // invalid URL -> 400
    const bad = await fetch(`${BASE}/api/repo/fetch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl: 'not-a-url', action: 'scan' }),
    });
    assert(bad.status === 400, 'fetch invalid URL -> 400');
  } catch (err) {
    assert(false, '/api/repo/fetch', errMsg(err));
  }

  // ── /api/graph/traverse ──
  console.log('\n🧪 [TEST] /api/graph/traverse (stateless expansion)');
  try {
    const res = await fetch(`${BASE}/api/graph/traverse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nodes: [{ id: 'n1', label: 'Module', isLoaded: true, children: [] }],
        edges: [],
        targetNodeId: undefined,
      }),
    });
    assert(res.ok, 'POST /api/graph/traverse -> OK');
    const data = await res.json();
    assert(data.status === 'success', 'traverse status=success');
    assert(Array.isArray(data.nodes) && data.nodes.length > 0, 'nodes preserved');

    const bad = await fetch(`${BASE}/api/graph/traverse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edges: [] }),
    });
    assert(bad.status === 400, 'traverse missing nodes -> 400');
  } catch (err) {
    assert(false, '/api/graph/traverse', errMsg(err));
  }

  // ── /api/repo/export-pr ──
  console.log('\n🧪 [TEST] /api/repo/export-pr');
  try {
    const local = await fetch(`${BASE}/api/repo/export-pr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repoUrl: 'https://github.com/owner/sample-repo',
        branchName: 'omnigraph/e2e',
        prTitle: 'E2E Bundle',
        prBody: 'bundle only (no git creds)',
        files: [{ path: 'src/index.ts', oldCode: 'console.log("hi");', newCode: 'console.log("hello");' }],
      }),
    });
    assert(local.ok, 'POST /api/repo/export-pr (bundle) -> OK');
    const localData = await local.json();
    assert(localData.status === 'success', 'export status=success');
    assert(Boolean(localData.patchBundle) && localData.patchBundle.includes('diff --git a/src/index.ts b/src/index.ts'), 'valid git diff bundle');
  } catch (err) {
    assert(false, '/api/repo/export-pr (bundle)', errMsg(err));
  }

  // ── Summary ──
  console.log('\n================================================================');
  console.log(`📊 LOCAL E2E AUDIT: ${passedTests} / ${totalTests} PASSED (${failedTests} FAILED)`);
  console.log('================================================================\n');
  if (failedTests > 0) process.exit(1);
}

main().catch(err => {
  console.error('E2E crashed:', err);
  process.exit(1);
});