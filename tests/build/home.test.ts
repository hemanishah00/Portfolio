import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { allCss } from './css';

const html = readFileSync('dist/index.html', 'utf8');
const css = allCss();
const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
const text = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#38;/g, '&');

function logBlock(): string {
  const m = markup.match(/<ol[^>]*data-experience[\s\S]*?<\/ol>/);
  expect(m, 'experience <ol data-experience> is missing').not.toBeNull();
  return m![0];
}
function entries(): string[] {
  return logBlock().split(/<li\b[^>]*class="[^"]*\bentry\b/).slice(1);
}

test('every role appears with its dates', () => {
  const expected = [
    ['Relanto', 'Sep 2025 – Present'],
    ['9Nexus', 'Oct 2024 – Sep 2025'],
    ['ARThink AI', 'Aug 2023 – Jul 2024'],
    ['DeetsDigital', 'Feb 2023 – Jul 2023'],
    ['Univ.AI', 'Apr 2022 – Jan 2023'],
    ['Advanced Business & Healthcare Solutions', 'Jan 2022 – Jun 2022'],
  ];
  const es = entries();
  expect(es).toHaveLength(expected.length);
  expected.forEach(([co, range], i) => {
    // Scoped to entry i, so a right date on the wrong company fails.
    const t = text(es[i]);
    expect(t, `entry ${i} company`).toContain(co);
    expect(t, `entry ${i} range`).toContain(range);
    for (const [otherCo, otherRange] of expected) {
      if (otherCo !== co) expect(t).not.toContain(otherRange);
    }
  });
});
test('the phone number is absent', () => {
  expect(html).not.toMatch(/9924\s*475\s*599/);
});
test('the Relanto xDR work is absent', () => {
  expect(html).not.toMatch(/xDR|Extended Detection|upsell recommendation|win-back/i);
});
test('education row carries the university and CGPA', () => {
  const m = markup.match(/<div[^>]*class="edu"[\s\S]*?<\/div>/);
  expect(m, 'education row .edu is missing').not.toBeNull();
  const t = text(m![0]);
  expect(t).toContain('Gujarat Technological University');
  expect(t).toContain('9.02');
});
test('contact routes are present inside the contact list and the resume path is relative', () => {
  const m = markup.match(/<dl[^>]*class="contact"[\s\S]*?<\/dl>/);
  expect(m, 'contact <dl class="contact"> is missing').not.toBeNull();
  const block = m![0];
  expect(block).toContain('href="mailto:hemanishah00@gmail.com"');
  expect(block).toContain('linkedin.com/in/hemanishah00');
  expect(block).toMatch(/href="\/HN_Shah_Resume\.pdf"/);
  const resume = JSON.parse(readFileSync('src/content/profile.json', 'utf8')).resume as string;
  expect(text(block)).toContain(resume.replace(/^\//, ''));
});
test('the document title agrees with the role shown on the page', () => {
  const title = html.match(/<title>([^<]+)<\/title>/)![1];
  expect(title).toBe('Hemani Shah — Senior Data Scientist');
  expect(title).not.toContain('Generative AI Engineer');
  const desc = html.match(/name="description" content="([^"]+)"/)![1];
  expect(desc).not.toContain('Generative AI Engineer');
});

test('en dash in date ranges; no em dash or hyphen ranges in the body', () => {
  expect(entries()[0]).toContain('Sep 2025 – Present');
  expect(markup).not.toMatch(/\d{4} — /);
  expect(markup).not.toMatch(/\d{4} - (?:Present|[A-Z][a-z]{2})/);
});

test('sections appear in the specified order', () => {
  const order = ['whoami', 'cat status', 'cat experience.log', '/logos/', 'cat contact.txt'].map((s) => markup.indexOf(s));
  expect(order.every((i) => i >= 0)).toBe(true);
  expect([...order].sort((a, b) => a - b)).toEqual(order);
});

test('status readout: sourced rows only, no availability row', () => {
  const m = markup.match(/<dl[^>]*data-status[\s\S]*?<\/dl>/);
  expect(m, 'status <dl data-status> is missing').not.toBeNull();
  const block = m![0];
  const keys = [...block.matchAll(/<dt[^>]*>([^<]+)<\/dt>/g)].map((x) => x[1]);
  expect(keys).toEqual(['ROLE', 'LOCATION', 'FOCUS', 'STACK']);
  const vals = [...block.matchAll(/<dd[^>]*>([^<]*)<\/dd>/g)].map((x) => x[1]);
  expect(vals).toEqual([
    'Senior Data Scientist',
    'Bengaluru, India',
    'generative AI · computer vision · analytics · OCR',
    'RAG · ASR · LLM · Azure Document Intelligence · TTS · YOLO',
  ]);
  expect(markup).not.toMatch(/AVAILABILITY|open to work|available for/i);
});

test('9Nexus shows its client line', () => {
  expect(entries()[1]).toContain('Consulted for Cognizant and GSK');
});

test('exactly one h1 and no skipped heading levels', () => {
  const levels = [...markup.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  expect(levels[0]).toBe(1);
  for (let i = 1; i < levels.length; i++) {
    expect(levels[i] - levels[i - 1], `h${levels[i - 1]} -> h${levels[i]}`).toBeLessThanOrEqual(1);
  }
  expect(levels.filter((l) => l === 3)).toHaveLength(6);
  expect(levels.filter((l) => l === 2).length).toBeGreaterThanOrEqual(4);
  expect(text(markup.match(/<h1\b[\s\S]*?<\/h1>/)![0])).toContain('hemani shah');
});

test('empty locations render nothing: no empty span, no stray separator', () => {
  const log = logBlock();
  const es = entries();
  expect(es).toHaveLength(6);
  expect(log).not.toMatch(/<(\w+)[^>]*>\s*<\/\1>/);
  expect(log.match(/data-location/g) ?? []).toHaveLength(1);
  expect(es[0]).toContain('data-location');
  expect(es[0]).toContain('Bengaluru');
  expect(text(log)).not.toMatch(/·\s*·|,\s*,|\|\s*\||[·|,]\s*$/m);
});

test('entries with no bullets render no list at all', () => {
  const es = entries();
  expect(es.filter((e) => e.includes('<ul'))).toHaveLength(4);
  expect(markup).not.toMatch(/<ul[^>]*>\s*<\/ul>/);
  for (const e of es) {
    if (e.includes('Univ.AI') || e.includes('Advanced Business')) expect(e).not.toContain('<ul');
  }
});

test('timeline is newest first', () => {
  const log = logBlock();
  const idx = ['Relanto', '9Nexus', 'ARThink AI', 'DeetsDigital', 'Univ.AI', 'Advanced Business'].map((c) => log.indexOf(c));
  expect(idx.every((i) => i >= 0)).toBe(true);
  expect([...idx].sort((a, b) => a - b)).toEqual(idx);
});

test('--metric marks exactly the quantified 9Nexus outcomes', () => {
  const marked = [...markup.matchAll(/<span[^>]*class="[^"]*\bmetric\b[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1]);
  expect(marked).toEqual(['150K+', '5 months to under 5 minutes', '99.9%']);
  // Every use of the token, across every page's CSS, sits in the one `.metric` rule.
  const uses = [...css.matchAll(/([^{}]*)\{[^{}]*var\(--metric\)[^{}]*\}/g)].map((m) => m[1].trim());
  expect(uses.length).toBeGreaterThan(0);
  expect(new Set(uses)).toEqual(new Set(['.metric']));
  expect(css.match(/var\(--metric\)/g)!.length).toBe(uses.length);
});

test('--accent is never a fill', () => {
  // The caret is the one sanctioned accent block (Task 5); every other rule must not fill with it.
  const withoutCaret = css.replace(/[^{}]*\.caret[^{}]*\{[^}]*\}/g, '');
  expect(withoutCaret).not.toMatch(/background(?:-color)?\s*:[^;}]*var\(--accent\)/);
});

test('five logos exist, are referenced, and have alt text', () => {
  for (const f of ['gsk.jpeg', 'cognizant.jpeg', 'arthink-ai.webp', 'univ-ai.png', 'relanto.png']) {
    expect(existsSync(join('public/logos', f)), f).toBe(true);
    expect(existsSync(join('dist/logos', f)), `dist ${f}`).toBe(true);
    expect(html).toContain(`/logos/${f}`);
  }
  const imgs = markup.match(/<img\b[^>]*\/logos\/[^>]*>/g) ?? [];
  expect(imgs).toHaveLength(5);
  for (const i of imgs) expect(i).toMatch(/alt="[^"]+"/);
});

test('logos are grayscale by default and coloured on hover', () => {
  // The minifier writes grayscale(1) as grayscale(), which means the same thing.
  expect(css).toMatch(/filter:\s*grayscale\((?:1|100%)?\)/);
  expect(css).toMatch(/:hover[^{]*\{[^}]*grayscale\(0\)/);
});

test('logo wall has a prompt header, no white backing, inverted marks, dimmed at rest', () => {
  expect(markup).toContain('ls companies/');
  expect(css).toMatch(/filter:\s*grayscale\((?:1|100%)?\)\s*invert\((?:1|100%)?\)/);
  expect(css).toMatch(/opacity:\s*\.7/);
  const wallRules = (css.match(/[^{}]*\.wall[^{}]*\{[^}]*\}/g) ?? []).join('');
  expect(wallRules).not.toMatch(/background/);
  expect(css).toMatch(/repeat\(5,\s*minmax\(0,\s*1fr\)\)/);
});

test('logo wall stays one row of five at every width: no narrower-column override', () => {
  const wallRules = (css.match(/[^{}]*\.wall[^{}]*\{[^}]*\}/g) ?? []).join('');
  const columnDecls = wallRules.match(/grid-template-columns:[^;}]*/g) ?? [];
  expect(columnDecls).toHaveLength(1);
  expect(columnDecls[0]).toMatch(/repeat\(5,/);
  expect(wallRules).not.toMatch(/flex-wrap|grid-template-rows/);
});

test('page has a side gutter wrapper', () => {
  expect(css).toMatch(/padding-inline\s*:\s*var\(--gutter\)|padding\s*:[^;}]*var\(--gutter\)/);
});

test('profile has no phone key', () => {
  const p = JSON.parse(readFileSync('src/content/profile.json', 'utf8'));
  expect(Object.keys(p).some((k) => /phone|tel|mobile/i.test(k))).toBe(false);
});
