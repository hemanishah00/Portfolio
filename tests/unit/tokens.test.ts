import { readFileSync } from 'node:fs';
import { contrast } from '../../src/lib/contrast';
const css = readFileSync('src/styles/tokens.css', 'utf8');
const tok = (n: string) => css.match(new RegExp(`--${n}:\\s*(#[0-9A-Fa-f]{6})`))![1];

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
