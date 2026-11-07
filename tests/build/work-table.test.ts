import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const html = readFileSync('dist/index.html', 'utf8');
const css = readdirSync('dist/_astro')
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(join('dist/_astro', f), 'utf8'))
  .join('');
// Markup only: styles and scripts also mention data-work-row.
const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
const text = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

type Src = { slug: string; title: string; year?: number; domain: string; stack: string[]; impact: string; featured: boolean };
const dir = join(process.cwd(), 'src/content/work');
const source: Src[] = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...parse(readFileSync(join(dir, f), 'utf8').split('---')[1]) }));

const rows = [...markup.matchAll(/<tr\b[^>]*data-work-row[^>]*>[\s\S]*?<\/tr>/g)].map((m) => m[0]);
const attr = (row: string, name: string) => row.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const cell = (row: string, name: string) => {
  const m = row.match(new RegExp(`<td\\b[^>]*data-cell="${name}"[^>]*>([\\s\\S]*?)</td>`));
  expect(m, `cell ${name} missing`).not.toBeNull();
  return m![1];
};
const rowFor = (slug: string) => {
  const r = rows.find((x) => attr(x, 'data-slug') === slug);
  expect(r, `row for ${slug}`).toBeDefined();
  return r!;
};

test('every project has a row, and the source has 21', () => {
  expect(source).toHaveLength(21);
  expect([...markup.matchAll(/data-work-row/g)]).toHaveLength(21);
  expect(rows).toHaveLength(21);
});

test('each row carries its own title, domain, stack and impact', () => {
  for (const s of source) {
    const r = rowFor(s.slug);
    expect(attr(r, 'data-domain'), `${s.slug} data-domain`).toBe(s.domain);
    expect(text(cell(r, 'name')), `${s.slug} name`).toBe(s.title);
    expect(text(cell(r, 'domain')), `${s.slug} domain`).toBe(s.domain);
    expect(text(cell(r, 'stack')), `${s.slug} stack`).toBe(s.stack.join(', '));
    expect(text(cell(r, 'impact')), `${s.slug} impact`).toBe(s.impact);
  }
});

test('year cell shows the year, or an em dash when undated', () => {
  for (const s of source) {
    const y = text(cell(rowFor(s.slug), 'year'));
    expect(y, s.slug).toBe(s.year ? String(s.year) : '—');
  }
  expect(text(cell(rowFor('hr-bot'), 'year'))).toBe('2023');
  expect(text(cell(rowFor('voice2insight'), 'year'))).toBe('—');
});

test('rows are in sorted order: dated newest-first, then undated A-Z', () => {
  const slugs = rows.map((r) => attr(r, 'data-slug')!);
  const bySlug = new Map(source.map((s) => [s.slug, s]));
  const dated = slugs.filter((s) => bySlug.get(s)!.year);
  const undated = slugs.filter((s) => !bySlug.get(s)!.year);
  expect(slugs).toEqual([...dated, ...undated]);
  expect(dated).toHaveLength(4);
  const titles = undated.map((s) => bySlug.get(s)!.title);
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  const datedTitles = dated.map((s) => bySlug.get(s)!.title);
  expect(datedTitles).toEqual([...datedTitles].sort((a, b) => a.localeCompare(b)));
});

test('exactly the six featured projects link to their own case study', () => {
  const featured = ['voice2insight', 'pharma-bot', 'airport-bot', 'vlm-finetuning', 'indian-speech-to-text', 'edaa'];
  expect(source.filter((s) => s.featured).map((s) => s.slug).sort()).toEqual([...featured].sort());
  for (const s of source) {
    const r = rowFor(s.slug);
    const hrefs = [...r.matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
    if (featured.includes(s.slug)) {
      expect(hrefs, s.slug).toEqual([`/work/${s.slug}`]);
      expect(cell(r, 'name'), s.slug).toMatch(/<a\b[^>]*href="\/work\//);
    } else {
      expect(hrefs, `${s.slug} must not link`).toEqual([]);
    }
  }
});

test('filter flags: all plus the four domains, exactly one active', () => {
  const m = markup.match(/<div\b[^>]*data-work-filters[^>]*>[\s\S]*?<\/div>/);
  expect(m, 'filter group missing').not.toBeNull();
  const buttons = [...m![0].matchAll(/<button\b[^>]*data-filter="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g)];
  expect(buttons.map((b) => b[1])).toEqual(['all', 'analytics', 'computer-vision', 'genai', 'ocr']);
  expect(buttons.map((b) => text(b[2]))).toEqual([
    '--filter=all',
    '--filter=analytics',
    '--filter=computer-vision',
    '--filter=genai',
    '--filter=ocr',
  ]);
  const active = buttons.filter((b) => /aria-pressed="true"/.test(b[0]));
  expect(active).toHaveLength(1);
  expect(active[0][1]).toBe('all');
});

test('JS-off: no row is hidden in the static HTML', () => {
  for (const r of rows) {
    const open = r.match(/^<tr\b[^>]*>/)![0];
    expect(open).not.toMatch(/\bhidden\b|display:\s*none/);
  }
});

test('the filter script only toggles existing rows, it never creates them', () => {
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).filter((s) => s.includes('data-work-row'));
  expect(scripts).toHaveLength(1);
  expect(scripts[0]).not.toMatch(/fetch\(|XMLHttpRequest|createElement|innerHTML|insertAdjacent/);
});

test('long cells are constrained so the table cannot force page scroll', () => {
  // The cell rule (selector contains `td`), not just the mobile row rule.
  expect(css).toMatch(/\[data-work-row\][^{,]*\std[^{]*\{[^}]*overflow-wrap:\s*anywhere/);
  // Minified CSS writes the query as (width<=40rem).
  expect(css).toMatch(/@media[^{]*(max-width:\s*|width\s*<=\s*)(40rem|640px)[^{]*\{[\s\S]*?\[data-work-row\]/);
});

test('the work section heading is an h2 with the ls -la prompt', () => {
  expect(markup).toMatch(/<h2[^>]*>[\s\S]*?ls -la work\/[\s\S]*?<\/h2>/);
});
