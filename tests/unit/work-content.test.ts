// Loads src/content/work/*.md via fs + frontmatter parsing, NOT getCollection():
// under Vitest the astro:content store is empty outside an Astro build.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const dir = join(process.cwd(), 'src/content/work');

function loadWorkFixtures() {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8');
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!m) throw new Error(`${f} has no frontmatter block`);
      return { id: f.replace(/\.md$/, ''), data: parse(m[1]) as Record<string, any>, body: m[2], raw };
    });
}

const work = loadWorkFixtures();

test('every project is present', () => {
  expect(work.length).toBeGreaterThanOrEqual(21);
});
test('exactly six are featured', () => {
  expect(work.filter((w) => w.data.featured)).toHaveLength(6);
});
test('slugs are unique', () => {
  const ids = work.map((w) => w.id);
  expect(new Set(ids).size).toBe(ids.length);
});
test('every featured project has a body', () => {
  for (const w of work.filter((x) => x.data.featured)) {
    expect(w.body.trim().length, `${w.id} is featured but empty`).toBeGreaterThan(200);
  }
});
test('no project body mentions the excluded Relanto work', () => {
  for (const w of work) {
    expect(w.body).not.toMatch(/xDR|Extended Detection|upsell recommendation/i);
  }
});

// Additions beyond the brief
test('frontmatter matches the schema shape', () => {
  const domains = ['analytics', 'computer-vision', 'genai', 'ocr'];
  for (const w of work) {
    expect(typeof w.data.title, w.id).toBe('string');
    // year is optional: sources give no project dates, so it is omitted rather than guessed
    if (w.data.year !== undefined) expect(Number.isInteger(w.data.year), `${w.id} year`).toBe(true);
    expect(domains, `${w.id} domain`).toContain(w.data.domain);
    expect(Array.isArray(w.data.stack), `${w.id} stack`).toBe(true);
    expect(typeof w.data.impact, `${w.id} impact`).toBe('string');
    expect(w.data.impact.length, `${w.id} impact`).toBeGreaterThan(0);
    expect(typeof w.data.featured, `${w.id} featured`).toBe('boolean');
  }
});
test('the six featured slugs are the expected ones', () => {
  expect(
    work.filter((w) => w.data.featured).map((w) => w.id).sort(),
  ).toEqual(['airport-bot', 'edaa', 'indian-speech-to-text', 'pharma-bot', 's2p-feedback-intelligence', 'vlm-finetuning']);
});
test('featured bodies have the four sections in order and a diagram marker', () => {
  for (const w of work.filter((x) => x.data.featured)) {
    const headings = [...w.body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
    expect(headings, w.id).toEqual(['Problem', 'Approach', 'Architecture', 'Impact']);
    const arch = w.body.split(/^## Architecture$/m)[1].split(/^## Impact$/m)[0];
    expect(arch, `${w.id} architecture`).toContain('<!-- diagram -->');
  }
});
test('index-only projects have no body', () => {
  for (const w of work.filter((x) => !x.data.featured)) {
    expect(w.body.trim(), w.id).toBe('');
  }
});
test('FIFA project is named fifa-20', () => {
  expect(work.map((w) => w.id)).toContain('fifa-20');
});
test('S2P study carries its quantified figures', () => {
  const s = work.find((w) => w.id === 's2p-feedback-intelligence')!;
  expect(s.body).toMatch(/150K\+/);
  expect(s.body).toMatch(/5 months/);
  expect(s.body).toMatch(/under 5 minutes/);
  expect(s.body).toMatch(/99\.9%/);
});
test('no work file contains the phone number', () => {
  for (const w of work) expect(w.raw).not.toMatch(/9924\s*475\s*599/);
});
test('no work file mentions excluded Relanto work anywhere, frontmatter included', () => {
  for (const w of work) expect(w.raw).not.toMatch(/xDR|Extended Detection|upsell|win-back/i);
});
