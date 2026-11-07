import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync('dist/index.html', 'utf8');
const css = readdirSync('dist/_astro')
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(join('dist/_astro', f), 'utf8'))
  .join('');
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
  for (const [co, range] of [
    ['Relanto', 'Sep 2025 – Present'],
    ['9Nexus', 'Oct 2024 – Sep 2025'],
    ['ARThink AI', 'Aug 2023 – Jul 2024'],
    ['DeetsDigital', 'Feb 2023 – Jul 2023'],
    ['Univ.AI', 'Apr 2022 – Jan 2023'],
    ['Advanced Business', 'Jan 2022 – Jun 2022'],
  ]) {
    expect(html).toContain(co);
    expect(html).toContain(range);
  }
  expect(text(html)).toContain('Advanced Business & Healthcare Solutions');
});
test('the phone number is absent', () => {
  expect(html).not.toMatch(/9924\s*475\s*599/);
});
test('the Relanto xDR work is absent', () => {
  expect(html).not.toMatch(/xDR|Extended Detection|upsell recommendation|win-back/i);
});
test('education is present', () => {
  expect(html).toContain('Gujarat Technological University');
  expect(html).toContain('9.02');
});
test('contact routes are present and the resume path is relative', () => {
  expect(html).toContain('hemanishah00@gmail.com');
  expect(html).toContain('linkedin.com/in/hemanishah00');
  expect(html).toMatch(/href="\/HN_Shah_Resume\.pdf"/);
});
test('the document title agrees with the role shown on the page', () => {
  const title = html.match(/<title>([^<]+)<\/title>/)![1];
  expect(title).toBe('Hemani Shah — Senior Data Scientist');
  expect(title).not.toContain('Generative AI Engineer');
  const desc = html.match(/name="description" content="([^"]+)"/)![1];
  expect(desc).not.toContain('Generative AI Engineer');
});

test('en dash in date ranges; no em dash or hyphen ranges in the body', () => {
  expect(html).toContain('Sep 2025 – Present');
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
  expect(block).toContain('Senior Data Scientist');
  expect(block).toContain('Bengaluru, India');
  expect(markup).not.toMatch(/AVAILABILITY|open to work|available for/i);
});

test('9Nexus shows its client line', () => {
  expect(markup).toContain('Consulted for Cognizant and GSK');
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
  expect(css.match(/var\(--metric\)/g) ?? []).toHaveLength(1);
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

test('page has a side gutter wrapper', () => {
  expect(css).toMatch(/padding-inline\s*:\s*var\(--gutter\)|padding\s*:[^;}]*var\(--gutter\)/);
});

test('profile has no phone key', () => {
  const p = JSON.parse(readFileSync('src/content/profile.json', 'utf8'));
  expect(Object.keys(p).some((k) => /phone|tel|mobile/i.test(k))).toBe(false);
});
