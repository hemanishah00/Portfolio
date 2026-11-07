import { sortWork, DOMAINS } from '../../src/lib/work';
import type { WorkItem } from '../../src/lib/work';

const w = (title: string, year?: number, featured = false, domain = 'ocr') => ({ title, year, domain, featured }) as WorkItem;

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
test('featured projects come first, even over a newer dated project', () => {
  const out = sortWork([w('Dated', 2024), w('Zed', undefined, true), w('Alpha'), w('Mid', 2020, true)]);
  expect(out.map((x) => x.title)).toEqual(['Mid', 'Zed', 'Dated', 'Alpha']);
});
test('within featured, the dated-then-undated rule still applies', () => {
  const out = sortWork([w('B', undefined, true), w('Old', 2019, true), w('A', undefined, true), w('New', 2023, true)]);
  expect(out.map((x) => x.title)).toEqual(['New', 'Old', 'A', 'B']);
});
test('sortWork does not mutate its input', () => {
  const input = [w('B', 2020), w('A', 2021)];
  sortWork(input);
  expect(input.map((x) => x.title)).toEqual(['B', 'A']);
});
test('DOMAINS lists exactly the four domains in order', () => {
  expect([...DOMAINS]).toEqual(['analytics', 'computer-vision', 'genai', 'ocr']);
});
