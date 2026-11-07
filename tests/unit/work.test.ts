import { sortWork, filterByDomain, DOMAINS } from '../../src/lib/work';
import type { WorkItem } from '../../src/lib/work';

const w = (title: string, year?: number, domain = 'ocr') => ({ title, year, domain }) as WorkItem;

test('sorts newest first, then alphabetically within a year', () => {
  const out = sortWork([w('Zebra', 2023), w('Alpha', 2024), w('Beta', 2023)]);
  expect(out.map((x) => x.title)).toEqual(['Alpha', 'Beta', 'Zebra']);
});
test('undated-only input sorts A-Z by title', () => {
  const out = sortWork([w('Charlie'), w('alpha'), w('Bravo')]);
  expect(out.map((x) => x.title)).toEqual(['alpha', 'Bravo', 'Charlie']);
});
test('undated projects follow every dated one, even an old year', () => {
  const out = sortWork([w('Aardvark'), w('Zulu', 2019), w('Mike'), w('Yankee', 2023), w('Bravo', 2023)]);
  expect(out.map((x) => x.title)).toEqual(['Bravo', 'Yankee', 'Zulu', 'Aardvark', 'Mike']);
});
test('sortWork does not mutate its input', () => {
  const input = [w('B', 2020), w('A', 2021)];
  sortWork(input);
  expect(input.map((x) => x.title)).toEqual(['B', 'A']);
});
test('filters by domain', () => {
  const items = [{ domain: 'ocr' }, { domain: 'genai' }, { domain: 'ocr' }] as WorkItem[];
  const out = filterByDomain(items, 'ocr');
  expect(out).toHaveLength(2);
  expect(out.every((x) => x.domain === 'ocr')).toBe(true);
});
test('a domain with no projects returns an empty list', () => {
  expect(filterByDomain([{ domain: 'ocr' }] as WorkItem[], 'genai')).toEqual([]);
});
test('"all" returns everything', () => {
  const items = [{ domain: 'ocr' }, { domain: 'genai' }] as WorkItem[];
  expect(filterByDomain(items, 'all')).toHaveLength(2);
});
test('DOMAINS lists exactly the four domains in order', () => {
  expect([...DOMAINS]).toEqual(['analytics', 'computer-vision', 'genai', 'ocr']);
});
