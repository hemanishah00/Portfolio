import { readFileSync, readdirSync } from 'node:fs';
import { allCss } from './css';

const html = readFileSync('dist/index.html', 'utf8');
const css = allCss();
const PRINCIPLE = 'Anyone can ship on Day 1. I build for Day 2.';

// The band element's opening tag, and the full band markup.
const bandTag = html.match(/<[a-z]+\b[^>]*\bdata-constellation\b[^>]*>/)?.[0] ?? '';
const bandStart = bandTag ? html.indexOf(bandTag) : -1;
const band = bandStart >= 0 ? html.slice(bandStart, html.indexOf('</div>', bandStart)) : '';
const attrs = (tag: string) => tag.replace(/^<[a-z]+/, '');

// The constellation's own script: the executable inline <script> that mentions data-constellation.
const script =
  [...html.matchAll(/<script\b(?![^>]*type="application\/json")[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .find((s) => s.includes('data-constellation')) ?? '';

test('the principle line is in the static HTML under a cat principles.txt prompt', () => {
  const at = html.indexOf('cat principles.txt');
  expect(at).toBeGreaterThan(-1);
  const after = html.slice(at, at + 400);
  expect(after).toMatch(new RegExp(`<p[^>]*data-type[^>]*>${PRINCIPLE.replace(/\./g, '\\.')}`));
});

test('the principle block comes after the positioning block', () => {
  expect(html.indexOf('cat principles.txt')).toBeGreaterThan(html.indexOf('cat positioning.txt'));
});

test('the principle line keeps normal capitalisation (only whoami is lowercased)', () => {
  expect(html).not.toContain(PRINCIPLE.toLowerCase());
});

test('the band exists and is hidden in static HTML, so JS-off shows nothing', () => {
  expect(bandTag, 'no element with data-constellation').not.toBe('');
  expect(attrs(bandTag)).toMatch(/\shidden(\s|=|>|\/|$)/);
});

test('hidden is not overridden by a display rule on the band', () => {
  expect(css).toMatch(/\[data-constellation\][^{]*\[hidden\][^{]*\{\s*display:\s*none/);
});

test('the band sits above the terminal frame', () => {
  expect(bandStart).toBeGreaterThan(-1);
  expect(bandStart).toBeLessThan(html.indexOf('data-boot'));
});

test('the canvas is aria-hidden and not focusable', () => {
  const canvas = band.match(/<canvas\b[^>]*>/)?.[0] ?? '';
  expect(canvas, 'no canvas in band').not.toBe('');
  expect(canvas).toMatch(/aria-hidden="true"/);
  expect(canvas).not.toMatch(/tabindex/i);
});

test('the band contains no focusable controls, so it cannot trap the keyboard', () => {
  expect(band).not.toBe('');
  expect(band).not.toMatch(/<(a|button|input|select|textarea)\b/i);
  expect(band).not.toMatch(/tabindex/i);
});

test('the data payload carries every project slug exactly once, with featured flags', () => {
  const tag = html.match(/<script\b[^>]*data-constellation-data[^>]*>([\s\S]*?)<\/script>/);
  expect(tag, 'no JSON payload').not.toBeNull();
  expect(tag![0]).toMatch(/type="application\/json"/);
  const nodes = JSON.parse(tag![1]) as { slug: string; title: string; domain: string; featured: boolean }[];
  const files = readdirSync('src/content/work')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
  expect(files).toHaveLength(21);
  expect(nodes.map((n) => n.slug).sort()).toEqual([...files].sort());
  expect(nodes.filter((n) => n.featured)).toHaveLength(6);
  for (const n of nodes) {
    expect(n.title).toBeTruthy();
    expect(['genai', 'computer-vision', 'analytics', 'ocr']).toContain(n.domain);
  }
});

test('the script checks reduced motion before it first requests an animation frame', () => {
  expect(script, 'constellation script not found').not.toBe('');
  const mm = script.search(/matchMedia\(['"]\(prefers-reduced-motion:\s*reduce\)['"]\)/);
  const raf = script.search(/requestAnimationFrame\(/);
  expect(mm).toBeGreaterThan(-1);
  expect(raf).toBeGreaterThan(-1);
  expect(mm).toBeLessThan(raf);
});

test('the script pauses off-screen with an IntersectionObserver and cancels the frame', () => {
  expect(script).toMatch(/new IntersectionObserver\(/);
  expect(script).toMatch(/cancelAnimationFrame\(/);
});

test('node positions are seeded from the slug, never Math.random', () => {
  expect(script).not.toBe('');
  expect(script).not.toMatch(/Math\.random/);
});

test('the script un-hides the band itself and sizes the backing store by devicePixelRatio', () => {
  expect(script).toMatch(/\.hidden\s*=\s*false/);
  expect(script).toMatch(/devicePixelRatio/);
});

test('colours come from the CSS custom properties, not hard-coded hex', () => {
  expect(script).toMatch(/getComputedStyle\(/);
  expect(script).not.toMatch(/#[0-9a-fA-F]{6}\b/);
});
