import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { sortWork } from '../../src/lib/work';

type Src = { slug: string; title: string; year?: number; domain: string; stack: string[]; impact: string; featured: boolean };
const dir = join(process.cwd(), 'src/content/work');
const source: Src[] = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...parse(readFileSync(join(dir, f), 'utf8').split('---')[1]) }));
const bySlug = (s: string) => source.find((p) => p.slug === s)!;

const slugs = ['voice2insight', 'pharma-bot', 'airport-bot', 'vlm-finetuning', 'indian-speech-to-text', 'edaa'];
const order = sortWork(source.filter((p) => p.featured)).map((p) => p.slug);

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
// Markdown smartypants turns straight quotes curly; fold them back so source and output compare.
const text = (s: string) =>
  decode(s.replace(/<[^>]+>/g, ''))
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const stripped = (html: string) => html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
const page = (slug: string) => stripped(readFileSync(`dist/work/${slug}/index.html`, 'utf8'));
const main = (slug: string) => {
  const m = page(slug).match(/<main\b[^>]*>([\s\S]*?)<\/main>/);
  expect(m, `${slug}: <main> missing`).not.toBeNull();
  return m![1];
};
const block = (html: string, re: RegExp, what: string) => {
  const m = html.match(re);
  expect(m, `${what} missing`).not.toBeNull();
  return m![0];
};
const header = (slug: string) => block(main(slug), /<header\b[^>]*data-case-header[\s\S]*?<\/header>/, `${slug}: case header`);
// The body div contains no nested div, so its first </div> closes it.
const body = (slug: string) => block(main(slug), /<div\b[^>]*data-case-body[\s\S]*?<\/div>/, `${slug}: case body`);
const figure = (slug: string) => block(body(slug), /<figure\b[^>]*data-diagram[\s\S]*?<\/figure>/, `${slug}: diagram figure`);
const svgLabels = (slug: string) => [...figure(slug).matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map((m) => text(m[1]));

// Component names each diagram must draw, taken from that project's Architecture paragraph.
const labels: Record<string, string[]> = {
  voice2insight: ['Employee comments', 'Agent call transcripts', 'Databricks ETL', 'LLM extraction', 'SQL', 'Vector store', 'Executive summary', 'Root-cause analysis', 'Dashboard'],
  'pharma-bot': ['Call', 'ASR', 'Interaction layer', 'RAG retrieval', 'LLM', 'TTS', 'Human agent'],
  'airport-bot': ['Passenger query', 'Structured agents', 'Parking', 'Transport', 'Function calling', 'RAG retrieval', 'Service data', 'Knowledge base', 'Response'],
  'vlm-finetuning': ['Image-text dataset', 'Preprocessing', 'Quantized base VLM', 'LoRA adapters', 'Train adapters only', 'Evaluation', 'Quantized model', 'LoRA adapter'],
  'indian-speech-to-text': ['Audio in', 'Language detection', 'Speech recognition', 'Clean and normalise', 'Neural machine translation', 'Text, source language', 'Text, target language'],
  edaa: ['React frontend', 'Preprocessor', 'ASR container', 'SBERT container', 'YOLO container', 'GCS bucket', 'Plotly.js'],
};

test('exactly the six featured projects get a page, and nothing else is under /work', () => {
  expect(source.filter((p) => p.featured).map((p) => p.slug).sort()).toEqual([...slugs].sort());
  expect(readdirSync('dist/work').sort()).toEqual([...slugs].sort());
  for (const s of slugs) expect(existsSync(`dist/work/${s}/index.html`), s).toBe(true);
  expect(existsSync('dist/work/fifa-20/index.html')).toBe(false);
});

test('<title> and canonical carry the project title and the real route', () => {
  for (const s of slugs) {
    const h = page(s);
    expect(h.match(/<title>([^<]*)<\/title>/)![1], s).toBe(`${bySlug(s).title} — Senior Data Scientist`);
    expect(h.match(/<link rel="canonical" href="([^"]*)"/)![1], s).toBe(`https://hemanishah.in/work/${s}`);
  }
});

test('the project title is the single h1, followed by the four h2 sections in order, with no other levels', () => {
  for (const s of slugs) {
    const m = main(s);
    const heads = [...m.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((x) => [Number(x[1]), text(x[2])] as const);
    expect(heads, s).toEqual([[1, bySlug(s).title], [2, 'Problem'], [2, 'Approach'], [2, 'Architecture'], [2, 'Impact']]);
    expect(header(s), s).toMatch(/<h1\b/);
  }
});

test('header shows domain, stack chips and impact line from that project', () => {
  for (const s of slugs) {
    const h = header(s);
    const p = bySlug(s);
    const dom = block(h, /<[a-z]+\b[^>]*data-case-domain[^>]*>[\s\S]*?<\/[a-z]+>/, `${s}: domain`);
    expect(text(dom), s).toBe(p.domain);
    const stack = block(h, /<ul\b[^>]*data-case-stack[\s\S]*?<\/ul>/, `${s}: stack`);
    expect([...stack.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1])), s).toEqual(p.stack);
    const impact = block(h, /<p\b[^>]*data-case-impact[^>]*>[\s\S]*?<\/p>/, `${s}: impact`);
    expect(text(impact), s).toBe(p.impact);
  }
});

test('year appears in the header only for dated projects', () => {
  for (const s of slugs) {
    const has = /data-case-year/.test(header(s));
    expect(has, s).toBe(bySlug(s).year != null);
  }
});

test("each of the four sections carries that project's own prose", () => {
  for (const s of slugs) {
    const md = readFileSync(join(dir, `${s}.md`), 'utf8');
    for (const sec of ['Problem', 'Approach', 'Architecture', 'Impact']) {
      const src = md.split(new RegExp(`^## ${sec}$`, 'm'))[1].split(/^## /m)[0].replace(/<!--[\s\S]*?-->/g, '').trim();
      const firstSentence = src.split(/(?<=\.)\s/)[0];
      const html = body(s);
      const start = html.search(new RegExp(`<h2\\b[^>]*>${sec}</h2>`));
      expect(start, `${s}: h2 ${sec}`).toBeGreaterThanOrEqual(0);
      const next = html.slice(start + 1).search(/<h2\b/);
      const section = html.slice(start, next < 0 ? undefined : start + 1 + next);
      expect(text(section), `${s} ${sec}`).toContain(text(firstSentence));
    }
  }
});

test('body prose uses the prose class, and the header does not', () => {
  for (const s of slugs) {
    expect(body(s), s).toMatch(/^<div\b[^>]*class="[^"]*\bprose\b/);
    expect(header(s), s).not.toMatch(/\bprose\b/);
  }
});

test('the diagram marker is replaced, and the diagram sits inside Architecture, before Impact', () => {
  for (const s of slugs) {
    const html = body(s);
    expect(page(s), s).not.toMatch(/<!--\s*diagram\s*-->/);
    const arch = html.search(/<h2\b[^>]*>Architecture<\/h2>/);
    const fig = html.search(/<figure\b[^>]*data-diagram/);
    const impact = html.search(/<h2\b[^>]*>Impact<\/h2>/);
    expect(arch, s).toBeGreaterThanOrEqual(0);
    expect(fig, s).toBeGreaterThan(arch);
    expect(fig, s).toBeLessThan(impact);
    expect(html.match(/<figure\b[^>]*data-diagram/g), s).toHaveLength(1);
  }
});

test('each diagram is one inline SVG with an accessible name, a viewBox, and no fixed size or raster content', () => {
  for (const s of slugs) {
    const f = figure(s);
    expect(f.match(/<svg\b/g), s).toHaveLength(1);
    const tag = f.match(/<svg\b[^>]*>/)![0];
    expect(tag, s).toMatch(/role="img"/);
    expect(tag, s).toMatch(/viewBox="0 0 \d+ \d+"/);
    expect(tag, s).not.toMatch(/\swidth=|\sheight=/);
    const labelledby = tag.match(/aria-labelledby="([^"]+)"/)?.[1];
    expect(labelledby, `${s}: aria-labelledby`).toBeTruthy();
    const titleId = labelledby!.split(' ')[0];
    const title = f.match(new RegExp(`<title\\b[^>]*id="${titleId}"[^>]*>([\\s\\S]*?)</title>`));
    expect(title, `${s}: <title id=${titleId}>`).not.toBeNull();
    expect(text(title![1]).length, s).toBeGreaterThan(15);
    expect(f, s).not.toMatch(/<image\b|<img\b|<foreignObject\b|href="data:/);
    expect(main(s), s).not.toMatch(/<img\b/);
  }
});

test('each diagram draws the components its own Architecture section names', () => {
  for (const s of slugs) {
    const got = svgLabels(s);
    for (const l of labels[s]) expect(got, `${s}: "${l}"`).toContain(l);
  }
});

test("diagrams stay in their own project: another project's signature component never appears", () => {
  const only: Record<string, string> = {
    voice2insight: 'Databricks ETL',
    'pharma-bot': 'Interaction layer',
    'airport-bot': 'Structured agents',
    'vlm-finetuning': 'LoRA adapters',
    'indian-speech-to-text': 'Language detection',
    edaa: 'GCS bucket',
  };
  for (const s of slugs)
    for (const [o, l] of Object.entries(only)) if (o !== s) expect(svgLabels(s), `${s} must not contain ${l}`).not.toContain(l);
});

test('diagram ids are unique per page so inline markers cannot collide', () => {
  for (const s of slugs) {
    const ids = [...figure(s).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size, s).toBe(ids.length);
    expect(ids.length, s).toBeGreaterThan(1);
  }
});

test('prev/next follow the sortWork order of the featured projects, without wrapping', () => {
  expect(order).toHaveLength(6);
  order.forEach((s, i) => {
    const nav = block(main(s), /<nav\b[^>]*data-case-nav[\s\S]*?<\/nav>/, `${s}: case nav`);
    const link = (name: string) => nav.match(new RegExp(`<a\\b[^>]*${name}[^>]*>[\\s\\S]*?</a>`))?.[0];
    const href = (a?: string) => a?.match(/href="([^"]*)"/)?.[1];
    const prev = link('data-nav-prev');
    const next = link('data-nav-next');
    if (i === 0) expect(prev, `${s} (first) has no prev`).toBeUndefined();
    else {
      expect(href(prev), `${s} prev`).toBe(`/work/${order[i - 1]}`);
      expect(text(prev!), `${s} prev text`).toContain(bySlug(order[i - 1]).title);
    }
    if (i === order.length - 1) expect(next, `${s} (last) has no next`).toBeUndefined();
    else {
      expect(href(next), `${s} next`).toBe(`/work/${order[i + 1]}`);
      expect(text(next!), `${s} next text`).toContain(bySlug(order[i + 1]).title);
    }
  });
});

test('every page links back to the index', () => {
  for (const s of slugs) {
    const a = block(main(s), /<a\b[^>]*data-back[^>]*>/, `${s}: back link`);
    expect(a.match(/href="([^"]*)"/)![1], s).toBe('/');
  }
});

test('--metric marks the Voice2Insight figures in header and body, and nothing on the other pages', () => {
  const spans = (h: string) => [...h.matchAll(/<span[^>]*class="[^"]*\bmetric\b[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1]);
  const impactLine = block(header('voice2insight'), /<p\b[^>]*data-case-impact[^>]*>[\s\S]*?<\/p>/, 'impact');
  expect(spans(impactLine)).toEqual(['under 5 minutes', '5 months', '99.9%']);
  const b = body('voice2insight');
  const probSec = b.slice(b.search(/<h2\b[^>]*>Problem/), b.search(/<h2\b[^>]*>Approach/));
  expect(spans(probSec)).toEqual(['150K+', '5 months']);
  const impSec = b.slice(b.search(/<h2\b[^>]*>Impact/));
  expect(spans(impSec)).toEqual(['5 months', 'under 5 minutes', '99.9%']);
  for (const s of slugs.filter((x) => x !== 'voice2insight')) expect(spans(main(s)), s).toEqual([]);
});

test('every page is listed in the sitemap', () => {
  const sm = readdirSync('dist')
    .filter((f) => /^sitemap.*\.xml$/.test(f) && f !== 'sitemap-index.xml')
    .map((f) => readFileSync(join('dist', f), 'utf8'))
    .join('');
  for (const s of slugs) expect(sm).toContain(`<loc>https://hemanishah.in/work/${s}/</loc>`);
});

test('unsourced claims stay out: no availability claim on Airport Bot, no hardware claim on VLM Fine-tuning', () => {
  expect(text(body('airport-bot'))).not.toMatch(/any hour|24\/7|around the clock/i);
  expect(text(header('airport-bot'))).not.toMatch(/any hour|24\/7/i);
  expect(text(body("vlm-finetuning"))).not.toMatch(/modest|hardware/i);
  expect(text(header('vlm-finetuning'))).not.toMatch(/modest|hardware|GPU memory/i);
});
