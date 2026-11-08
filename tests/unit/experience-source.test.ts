import { readFileSync } from 'node:fs';
import experience from '../../src/content/experience.json';

// docs/sources/experience-bullets.md is the authoritative résumé source. Every "- " line in it is a bullet.
const source = readFileSync('docs/sources/experience-bullets.md', 'utf8')
  .split('\n')
  .filter((l) => l.startsWith('- '))
  .map((l) => l.slice(2).trim());
const site = experience.flatMap((e) => e.bullets);

test('the source defines 17 bullets', () => {
  expect(source).toHaveLength(17);
});
test('experience.json bullets are verbatim: set-equal to the source, nothing added or dropped', () => {
  expect([...site].sort()).toEqual([...source].sort());
});
test('Relanto keeps its single generalised bullet; Univ.AI and Advanced Business stay empty', () => {
  const bullets = (c: string) => experience.find((e) => e.company === c)!.bullets;
  expect(bullets('Relanto')).toEqual(['Multi-agent workflow systems and LLM observability for enterprise customer engagement.']);
  expect(bullets('Univ.AI')).toEqual([]);
  expect(bullets('Advanced Business & Healthcare Solutions')).toEqual([]);
});
