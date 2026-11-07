import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync('dist/index.html', 'utf8');
const cssFiles = readdirSync('dist/_astro').filter((f) => f.endsWith('.css'));
const css = cssFiles.map((f) => readFileSync(join('dist/_astro', f), 'utf8')).join('');

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

test('caret blink exists only inside a no-preference media query', () => {
  const all = html + css;
  const m = all.match(/@media\s*\(prefers-reduced-motion:\s*no-preference\)/);
  expect(m).not.toBeNull();
  expect(all.slice(m!.index!)).toMatch(/animation/);
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
