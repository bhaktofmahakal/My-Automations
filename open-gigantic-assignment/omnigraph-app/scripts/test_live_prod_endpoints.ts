/**
 * Live Production Endpoint Verification Suite
 * Tests all production API routes on https://omnigraph-app-kohl.vercel.app
 */

const BASE_URL = 'https://omnigraph-app-kohl.vercel.app';
export {};

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName}${details ? ` -> ${details}` : ''}`);
  }
}

function errMsg(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

async function runLiveTests() {
  console.log('\n================================================================');
  console.log('🌐 TESTING LIVE PRODUCTION ENDPOINTS ON VERCEL');
  console.log(`Target: ${BASE_URL}`);
  console.log('================================================================\n');

  // 1. Test /api/memory (Upstash Redis & Vector health)
  console.log('🧪 [TEST 1] /api/memory (Upstash Redis & Vector Integration)');
  try {
    const res = await fetch(`${BASE_URL}/api/memory`, {
      method: 'GET',
    });
    assert(res.ok, 'GET /api/memory should return HTTP 200');
    const data = await res.json();
    assert(data.status === 'success', 'Memory status should be "success"');
    assert(Boolean(data.redis), 'Redis connection metadata should be present');
    assert(Boolean(data.vector), 'Vector connection metadata should be present');
  } catch (err: unknown) {
    assert(false, '/api/memory request failed', errMsg(err));
  }

  // 2. Test /api/tokens/benchmark (Live AST TokenFold Tokenizer)
  console.log('\n🧪 [TEST 2] /api/tokens/benchmark (AST Token Benchmark)');
  try {
    const res = await fetch(`${BASE_URL}/api/tokens/benchmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repoUrl: 'https://github.com/django/django',
        files: [
          { path: 'src/main.ts', currentCode: 'export function processAuth(t: string) { return t.length > 0; }' },
          { path: 'src/config.ts', currentCode: 'export const config = { port: 3000, env: "prod" };' }
        ]
      }),
    });
    assert(res.ok, 'POST /api/tokens/benchmark should return HTTP 200');
    const data = await res.json();
    assert(data.status === 'success', 'Benchmark status should be "success"');
    assert(Boolean(data.aggregate), 'Aggregate metrics should be present');
    assert(data.aggregate.totalRawTokens > 0, 'Total raw tokens should be > 0');
    assert(data.aggregate.totalCompressedTokens < data.aggregate.totalRawTokens, 'Compressed tokens should be less than raw tokens');
    assert(data.aggregate.netReductionPct > 0, 'Percentage reduction should be > 0%');
  } catch (err: unknown) {
    assert(false, '/api/tokens/benchmark request failed', errMsg(err));
  }

  // 3. Test /api/agents/psmas-run (OrcaRouter & Groq Gateway)
  console.log('\n🧪 [TEST 3] /api/agents/psmas-run (Autonomous Swarm Gateway)');
  try {
    const res = await fetch(`${BASE_URL}/api/agents/psmas-run`, {
      method: 'GET',
    });
    assert(res.ok, 'GET /api/agents/psmas-run should return HTTP 200');
    const data = await res.json();
    assert(data.status === 'success', 'Swarm engine status should be "success"');
    assert(data.engine.includes('PSMAS'), 'Engine name should contain PSMAS');
    assert(Boolean(data.gateways.orcarouter), 'OrcaRouter gateway should be documented');
    assert(Boolean(data.gateways.groq), 'Groq LPU gateway should be documented');
  } catch (err: unknown) {
    assert(false, '/api/agents/psmas-run request failed', errMsg(err));
  }

  // 4. Test /api/repo/export-pr (Patch Bundle Generator)
  console.log('\n🧪 [TEST 4] /api/repo/export-pr (Unified Patch & PR Creator)');
  try {
    const res = await fetch(`${BASE_URL}/api/repo/export-pr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        repoUrl: 'https://github.com/owner/sample-repo',
        branchName: 'omnigraph/test-export',
        prTitle: 'Test Patch Export',
        prBody: 'Automated test patch export bundle verification',
        files: [
          {
            path: 'src/index.ts',
            oldCode: 'console.log("hello");',
            newCode: 'console.log("hello world");',
          }
        ],
        hunks: [],
      }),
    });
    assert(res.ok, 'POST /api/repo/export-pr should return HTTP 200');
    const data = await res.json();
    assert(data.status === 'success', 'Export status should be "success"');
    assert(Boolean(data.patchBundle), 'Generated patch bundle should be returned');
    assert(data.patchBundle.includes('diff --git a/src/index.ts b/src/index.ts'), 'Patch bundle should contain valid git diff syntax');
  } catch (err: unknown) {
    assert(false, '/api/repo/export-pr request failed', errMsg(err));
  }

  // ──────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n================================================================');
  console.log(`📊 LIVE PRODUCTION AUDIT SUMMARY: ${passedTests} / ${totalTests} PASSED (${failedTests} FAILED)`);
  console.log('================================================================\n');

  if (failedTests > 0) process.exit(1);
}

runLiveTests().catch(err => {
  console.error('Live production tests crashed:', err);
  process.exit(1);
});
