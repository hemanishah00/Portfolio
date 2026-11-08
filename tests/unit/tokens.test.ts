import { readFileSync } from 'node:fs';
import { contrast } from '../../src/lib/contrast';
const css = readFileSync('src/styles/tokens.css', 'utf8');
const tok = (n: string): string => {
  const m = css.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m) throw new Error(`Token --${n} not found as a 6-digit hex in tokens.css`);
  return m[1];
};

test('muted text passes WCAG AA on the page background', () => {
  expect(contrast(tok('muted'), tok('bg'))).toBeGreaterThanOrEqual(4.5);
});
test('primary text passes WCAG AAA on the page background', () => {
  expect(contrast(tok('text'), tok('bg'))).toBeGreaterThanOrEqual(7);
});
test('accent passes AA on the page background', () => {
  expect(contrast(tok('accent'), tok('bg'))).toBeGreaterThanOrEqual(4.5);
});
test('metric amber passes AA on the page background', () => {
  expect(contrast(tok('metric'), tok('bg'))).toBeGreaterThanOrEqual(4.5);
});

test('all seven color tokens hold their exact specified values', () => {
  const expected: Record<string, string> = {
    bg: '#0A0E0F',
    surface: '#12181A',
    hairline: '#1E2729',
    text: '#D6E0E0',
    muted: '#7A8A8A',
    accent: '#7EE787',
    metric: '#F0B429',
  };
  const actual = Object.fromEntries(Object.keys(expected).map((n) => [n, tok(n).toUpperCase()]));
  expect(actual).toEqual(expected);
});

test('contrast anchors: white on black is 21, identical colors is 1', () => {
  expect(contrast('#FFFFFF', '#000000')).toBeCloseTo(21, 5);
  expect(contrast('#0A0E0F', '#0A0E0F')).toBeCloseTo(1, 5);
});
test('contrast is symmetric', () => {
  expect(contrast('#7EE787', '#0A0E0F')).toBe(contrast('#0A0E0F', '#7EE787'));
});
