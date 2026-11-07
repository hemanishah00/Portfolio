import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const all = walk('dist');
const pages = all.filter((f) => f.endsWith('.html'));
const FEATURED = ['voice2insight', 'pharma-bot', 'airport-bot', 'vlm-finetuning', 'indian-speech-to-text', 'edaa'];

function toRoute(file: string): string {
  const rel = '/' + file.slice('dist/'.length).replace(/\\/g, '/');
  return rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
}

// Internal references: href/src values that are root-relative or relative, not external schemes.
function internalRefs(html: string, pageRoute: string): string[] {
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]);
  return refs
    .filter((r) => r && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(r))
    .map((r) => new URL(r, 'http://x' + pageRoute).pathname);
}

function resolves(path: string): boolean {
  const clean = decodeURIComponent(path);
  if (existsSync(join('dist', clean)) && statSync(join('dist', clean)).isFile()) return true;
  const base = clean.replace(/\/$/, '');
  return existsSync(join('dist', base, 'index.html')) || existsSync(join('dist', base + '.html'));
}

test('the crawl is not vacuous: it covers the home page, 404 and every case study', () => {
  const routes = pages.map(toRoute);
  expect(routes).toContain('/');
  expect(routes).toContain('/404');
  for (const s of FEATURED) expect(routes).toContain(`/work/${s}/`);
  let checked = 0;
  for (const p of pages) checked += internalRefs(readFileSync(p, 'utf8'), toRoute(p)).length;
  expect(checked).toBeGreaterThan(20);
});

test('no internal link or asset reference 404s', () => {
  const broken: string[] = [];
  for (const p of pages) {
    for (const ref of internalRefs(readFileSync(p, 'utf8'), toRoute(p))) {
      if (!resolves(ref)) broken.push(`${p} -> ${ref}`);
    }
  }
  expect(broken).toEqual([]);
});

test('every project is reachable: 21 rows on the index', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const rows = [...html.matchAll(/<[^>]*\sdata-work-row[\s>=][^>]*>/g)];
  expect(rows.length).toBe(21);
});

test('the six featured projects link from the index and render full case studies', () => {
  const index = readFileSync('dist/index.html', 'utf8');
  for (const s of FEATURED) {
    expect(index, `index links /work/${s}`).toContain(`href="/work/${s}"`);
    const file = `dist/work/${s}/index.html`;
    expect(existsSync(file), file).toBe(true);
    const html = readFileSync(file, 'utf8');
    expect(html, `${s} has a case-study body`).toMatch(/<h1[\s>]/);
    expect(html.length, `${s} is substantive`).toBeGreaterThan(5000);
  }
  const caseStudyDirs = readdirSync('dist/work').filter((d) => statSync(join('dist/work', d)).isDirectory());
  expect(caseStudyDirs.sort()).toEqual([...FEATURED].sort());
});

test('docs/ (recovered old-site source) is never served', () => {
  expect(existsSync('dist/docs')).toBe(false);
  expect(all.filter((f) => /(^|\/)docs(\/|$)|recovered-2026/.test(f))).toEqual([]);
  for (const f of all.filter((f) => /\.(html|css|js|json|xml|txt|svg)$/.test(f))) {
    expect(readFileSync(f, 'utf8'), f).not.toMatch(/recovered-2026-11-07/);
  }
  expect(existsSync('dist/client')).toBe(false);
});

test('<title> and the visible role agree', () => {
  const profile = JSON.parse(readFileSync('src/content/profile.json', 'utf8'));
  const html = readFileSync('dist/index.html', 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)![1];
  const h1 = html.match(/<h1[^>]*>([^<]*)<\/h1>/)![1];
  expect(title).toBe(`${profile.name} — ${profile.role}`);
  expect(h1.toLowerCase()).toContain(profile.role.toLowerCase());
});
