import { readFileSync } from 'node:fs';
import { allCss } from './css';

const html = readFileSync('dist/index.html', 'utf8');
const css = allCss();

test('boot text is in static HTML, so it survives JS being off', () => {
  expect(html).toContain('senior data scientist @ relanto');
  expect(html).toContain('bengaluru, india');
  expect(html).toMatch(/production-grade AI systems/);
  expect(html).toContain('hemani shah');
});

test('whoami output is lowercased in markup, positioning keeps its capitalisation', () => {
  expect(html).not.toContain('Senior Data Scientist @ Relanto');
  expect(html).toContain('I build production-grade AI systems');
});

test('typing animation is gated behind prefers-reduced-motion', () => {
  const all = html + css;
  expect(all).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

// Returns the at-rule headers enclosing a character offset (e.g. "@media (...)").
function enclosingRules(source: string, offset: number): string[] {
  const stack: string[] = [];
  let header = '';
  for (let i = 0; i < offset; i++) {
    const ch = source[i];
    if (ch === '{') {
      stack.push(header.trim());
      header = '';
    } else if (ch === '}') {
      stack.pop();
      header = '';
    } else if (ch === ';') {
      header = '';
    } else {
      header += ch;
    }
  }
  return stack;
}

test('every running animation declaration sits inside a no-preference media query', () => {
  const decl = /animation(?:-name)?\s*:\s*([^;}]+)/g;
  const running: { value: string; rules: string[] }[] = [];
  for (const m of css.matchAll(decl)) {
    const value = m[1].trim();
    if (value === 'none') continue;
    running.push({ value, rules: enclosingRules(css, m.index!) });
  }
  expect(running.some((r) => r.value.includes('caret-blink'))).toBe(true);
  for (const r of running) {
    const gated = r.rules.some((h) => /^@media\s*\(prefers-reduced-motion:\s*no-preference\)$/.test(h));
    expect(gated, `animation "${r.value}" is outside a no-preference block (enclosed by: ${JSON.stringify(r.rules)})`).toBe(true);
  }
});

test('boot__pending is never emitted in static markup, so the hero is visible with JS off', () => {
  const markup = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  const offenders = markup.match(/<[^>]*\bclass\s*=\s*["'][^"']*\bboot__pending\b[^>]*>/g) ?? [];
  expect(offenders, `static element(s) carry boot__pending: ${offenders.join(' | ')}`).toEqual([]);
});

test('script checks matchMedia for reduced motion itself', () => {
  expect(html).toMatch(/matchMedia\(['"]\(prefers-reduced-motion:\s*reduce\)['"]\)/);
});

test('page title uses the home form (path is "/")', () => {
  expect(html).toContain('<title>Hemani Shah — Senior Data Scientist</title>');
});

test('no glows or decorative shadows, no box-drawing glyphs', () => {
  expect(css + html).not.toMatch(/box-shadow\s*:\s*[^;}]*\d/);
  expect(html).not.toMatch(/[─-╿▀-▟]/);
});
