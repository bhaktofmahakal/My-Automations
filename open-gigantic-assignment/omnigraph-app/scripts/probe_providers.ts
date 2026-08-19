import { readFileSync } from 'fs';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
const orcaKey = env.ORCAROUTER_API_KEY;
const groqKey = env.GROQ_API_KEY;

async function call(url: string, key: string, body: object) {
  const t = Date.now();
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify(body),
    });
    const txt = await r.text();
    const ok = r.status === 200;
    console.log(`${ok ? 'OK ' : 'ERR'} ${r.status} (${Date.now() - t}ms) ${txt.slice(0, 120).replace(/\n/g, ' ')}`);
    return ok;
  } catch (e: any) {
    console.log(`NETERR ${e.message}`);
    return false;
  }
}

(async () => {
  const base = 'https://omnigraph-app-kohl.vercel.app/api/agents/psmas-run';
  const orca = {
    prompt: 'Respond with exactly: connection_ok', model: 'orcarouter/auto', baseUrl: 'https://api.orcarouter.ai/v1',
  };
  const orcaKey2 = { ...orca, apiKey: orcaKey };
  const groqKey2 = { ...orca, apiKey: groqKey, model: 'groq/qwen/qwen3.6-27b' };
  const groqCompound = { ...orca, apiKey: groqKey, model: 'groq/groq/compound' };

  console.log('1. settings-style platform (baseUrl, auto)  :', await call(base, '', orca));
  console.log('2. settings-style BYOK orca key              :', await call(base, '', orcaKey2));
  console.log('3. groq qwen3.6-27b (BYOK)                   :', await call(base, '', groqKey2));
  console.log('4. groq compound (BYOK)                      :', await call(base, '', groqCompound));

  const models = await (await fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: 'Bearer ' + groqKey } })).json();
  console.log('groq count:', (models.data || []).length);
})().catch((e) => console.log('FATAL', e.message));