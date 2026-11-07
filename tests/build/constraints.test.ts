import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk('dist');
// latin1 keeps every byte as one char, so ASCII needles are found in text and binary alike.
const contents = files.map((f) => ({ file: f, text: readFileSync(f).toString('latin1') }));

// Binary assets (fonts, images) can contain any short byte sequence by chance, so the
// word scan covers text-like files only. The phone-number scan covers every file.
const TEXT = /\.(html?|css|m?js|json|xml|txt|svg|webmanifest|md)$/i;

function leaks(pattern: RegExp, textOnly = false): string[] {
  return contents
    .filter((c) => (!textOnly || TEXT.test(c.file)) && pattern.test(c.text))
    .map((c) => c.file);
}

test('dist is non-empty, so the scans below are not vacuous', () => {
  expect(files.length).toBeGreaterThan(0);
  expect(files).toContain('dist/index.html');
});

test('the phone number never appears in build output, in any spacing or punctuation', () => {
  const digits = '9924475599'.split('');
  const sep = '[\\s.\\-()+/\\u00a0]*';
  const pattern = new RegExp(digits.join(sep), 'i');
  expect(leaks(pattern)).toEqual([]);
});

test('no description of the Relanto xDR / sales-automation work appears anywhere', () => {
  for (const term of ['xDR', 'Extended Detection', 'upsell recommendation', 'win-back']) {
    expect(leaks(new RegExp(term.replace(/[-\s]/g, '[-\\s]'), 'i'), true), `term "${term}"`).toEqual([]);
  }
});
