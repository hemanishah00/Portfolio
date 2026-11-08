import { formatRange } from '../../src/lib/dates';
test('formats a closed range', () => {
  expect(formatRange('2024-10', '2025-09')).toBe('Oct 2024 – Sep 2025');
});
test('formats an open range as Present', () => {
  expect(formatRange('2025-09', null)).toBe('Sep 2025 – Present');
});
