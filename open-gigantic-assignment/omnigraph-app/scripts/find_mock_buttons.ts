import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const walk = (d: string): string[] =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]
  );

for (const f of walk('src').filter((x) => x.endsWith('.tsx'))) {
  const src = readFileSync(f, 'utf8');
  const re = /<button[\s\S]*?>/g;
  let m;
  while ((m = re.exec(src))) {
    const tag = m[0];
    if (!tag.includes('onClick') && !tag.includes('type="submit"') && !tag.includes('type="button"')) {
      const line = src.slice(0, m.index).split('\n').length;
      const label = tag.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(`${f}:${line}  [${label.slice(0, 90)}]`);
    }
  }
}