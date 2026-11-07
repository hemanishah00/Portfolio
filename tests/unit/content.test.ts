import experience from '../../src/content/experience.json';
import profile from '../../src/content/profile.json';

test('has all six roles', () => {
  expect(experience).toHaveLength(6);
});
test('is ordered newest first', () => {
  const starts = experience.map((e) => e.start);
  expect(starts).toEqual([...starts].sort().reverse());
});
test('current role is Relanto with no end date', () => {
  expect(experience[0]).toMatchObject({
    company: 'Relanto',
    role: 'Senior Data Scientist / Senior AI Engineer',
    location: 'Bengaluru',
    start: '2025-09',
    end: null,
  });
});
test('9Nexus records its consulting clients', () => {
  const n = experience.find((e) => e.company === '9Nexus');
  expect(n.client).toBe('Consulted for Cognizant and GSK');
  expect(n.end).toBe('2025-09');
});
test('only Relanto has a location; none are invented for the rest', () => {
  const located = experience.filter((e) => e.location !== '');
  expect(located.map((e) => e.company)).toEqual(['Relanto']);
});
test('profile carries no phone number', () => {
  expect(JSON.stringify(profile)).not.toMatch(/9924\s*475\s*599/);
});
test('profile role matches the spec', () => {
  expect(profile.role).toBe('Senior Data Scientist');
});
test('Relanto has exactly one generalized bullet; the excluded work stays off the site', () => {
  const r = experience.find((e) => e.company === 'Relanto');
  expect(r.bullets).toHaveLength(1);
  expect(r.bullets[0]).toBe('Multi-agent workflow systems and LLM observability for enterprise customer engagement.');
});
