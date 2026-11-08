import { existsSync, readFileSync } from 'node:fs';

// The live domain. deploy-github-pages.js once wrote www.hemanishah.com; that would take the site offline.
test('CNAME survives the build and names the right domain', () => {
  expect(readFileSync('dist/CNAME', 'utf8').trim()).toBe('hemanishah.in');
});

test('Jekyll processing is disabled', () => {
  expect(existsSync('dist/.nojekyll')).toBe(true);
});

test('404 page is emitted as a terminal command-not-found with a link home', () => {
  const html = readFileSync('dist/404.html', 'utf8');
  expect(html).toContain('command not found');
  expect(html).toMatch(/<a\b[^>]*href="\/"/);
});

test('404 page keeps the heading outline: one h1, no skipped levels', () => {
  const html = readFileSync('dist/404.html', 'utf8');
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  expect(levels.filter((l) => l === 1)).toHaveLength(1);
  levels.forEach((l, i) => {
    if (i > 0) expect(l - levels[i - 1]).toBeLessThanOrEqual(1);
  });
});

test('favicon is present and is SVG in the accent colour on the background colour', () => {
  expect(existsSync('dist/favicon.svg')).toBe(true);
  const svg = readFileSync('dist/favicon.svg', 'utf8');
  expect(svg).toContain('<svg');
  expect(svg.toLowerCase()).toContain('#7ee787');
  expect(svg.toLowerCase()).toContain('#0a0e0f');
});

test('pages link the favicon', () => {
  expect(readFileSync('dist/index.html', 'utf8')).toMatch(/<link[^>]+rel="icon"[^>]+href="\/favicon\.svg"/);
});

test('og.png is a real 1200x630 PNG and the pages point at it', () => {
  const buf = readFileSync('dist/og.png');
  expect(buf.subarray(1, 4).toString()).toBe('PNG');
  expect(buf.readUInt32BE(16)).toBe(1200);
  expect(buf.readUInt32BE(20)).toBe(630);
  expect(readFileSync('dist/index.html', 'utf8')).toContain('content="https://hemanishah.in/og.png"');
});

test('sitemap is generated', () => {
  expect(existsSync('dist/sitemap-index.xml')).toBe(true);
});

test('sitemap uses the custom domain', () => {
  expect(readFileSync('dist/sitemap-index.xml', 'utf8')).toContain('https://hemanishah.in');
});
