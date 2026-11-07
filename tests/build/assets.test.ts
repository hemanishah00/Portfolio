import { existsSync, readFileSync } from 'node:fs';

test('the resume is served', () => {
  expect(existsSync('dist/HN_Shah_Resume.pdf')).toBe(true);
});

test('the resume is a real PDF of plausible size', () => {
  const buf = readFileSync('dist/HN_Shah_Resume.pdf');
  expect(buf.subarray(0, 4).toString()).toBe('%PDF');
  expect(buf.length).toBeGreaterThan(50_000);
});

// The logos keep their original extensions; these are the exact files LogoWall.astro references.
test('all five logos are served', () => {
  for (const f of ['gsk.jpeg', 'cognizant.jpeg', 'arthink-ai.webp', 'univ-ai.png', 'relanto.png'])
    expect(existsSync(`dist/logos/${f}`), f).toBe(true);
});

test('duplicate asset directories are gone', () => {
  for (const d of ['Images', 'pdfs', 'ppts', 'client/public']) expect(existsSync(d), d).toBe(false);
});

test('the oversized FIFA deck and favicol image are gone', () => {
  expect(existsSync('FIFA-20.pptx')).toBe(false);
  expect(existsSync('favicol.png')).toBe(false);
});
