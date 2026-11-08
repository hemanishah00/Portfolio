import { readFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';

const raw = readFileSync('.github/workflows/deploy.yml', 'utf8');
const wf = parse(raw);
const jobs = Object.values(wf.jobs) as any[];
const steps: any[] = jobs.flatMap((j) => j.steps ?? []);
const idx = (pred: (s: any) => boolean) => steps.findIndex(pred);
const uses = (name: string) => (s: any) => typeof s.uses === 'string' && s.uses.startsWith(name);
const runs = (cmd: string) => (s: any) => typeof s.run === 'string' && s.run.trim() === cmd;

test('Pages actions are pinned to current majors (upload v5, deploy v5)', () => {
  expect(idx(uses('actions/upload-pages-artifact@v5'))).toBeGreaterThanOrEqual(0);
  expect(idx(uses('actions/deploy-pages@v5'))).toBeGreaterThanOrEqual(0);
  expect(raw).not.toMatch(/upload-pages-artifact@v[0-4]\b/);
  expect(raw).not.toMatch(/deploy-pages@v[0-4]\b/);
});
test('workflow documents the CNAME and Pages-source requirements', () => {
  const head = raw.split('\n\non:')[0];
  expect(head).toMatch(/GitHub Actions/);
  expect(head).toMatch(/Settings/);
  expect(head).toContain('hemanishah.in');
  expect(head).toMatch(/CNAME/);
  expect(head).toMatch(/ignored/i);
});
test('uses the official Pages deployment action', () => {
  expect(idx(uses('actions/deploy-pages@'))).toBeGreaterThanOrEqual(0);
  expect(idx(uses('actions/upload-pages-artifact@'))).toBeGreaterThanOrEqual(0);
});
test('the superseded deploy paths are gone', () => {
  expect(raw).not.toContain('peaceiris');
  expect(raw).not.toContain('client/build');
  expect(existsSync('deploy-github-pages.js')).toBe(false);
  expect(existsSync('deploy.md')).toBe(false);
  expect(existsSync('DEPLOYMENT_SUMMARY.md')).toBe(false);
});
test('nothing writes the wrong custom domain', () => {
  expect(raw).not.toContain('hemanishah.com');
});
test('verify runs on pull requests as well as pushes to main', () => {
  expect(Object.keys(wf.on).sort()).toEqual(['pull_request', 'push']);
  expect(wf.on.push.branches).toEqual(['main']);
  expect(wf.on.pull_request.branches).toEqual(['main']);
});

test('only a push to main can publish: the deploy job is gated and needs verify', () => {
  const deploy = wf.jobs.deploy;
  expect(deploy).toBeDefined();
  // Without both halves of this condition a pull request could publish.
  expect(deploy.if).toContain("github.event_name == 'push'");
  expect(deploy.if).toContain("github.ref == 'refs/heads/main'");
  // Without `needs`, deploy would run even when verify failed.
  expect([].concat(deploy.needs)).toContain('verify');
  // deploy-pages must live in the gated job, never in the one PRs run.
  const uses = (j: any) => (j?.steps ?? []).map((s: any) => s.uses ?? '').join(' ');
  expect(uses(deploy)).toContain('actions/deploy-pages@');
  expect(uses(wf.jobs.verify)).not.toContain('actions/deploy-pages@');
});
test('permissions are pages and id-token write', () => {
  const perms = wf.permissions ?? jobs[0].permissions;
  expect(perms['pages']).toBe('write');
  expect(perms['id-token']).toBe('write');
});
test('runs on Node 24 via setup-node@v4', () => {
  const s = steps.find(uses('actions/setup-node@v7'));
  expect(s).toBeDefined();
  expect(String(s.with['node-version'])).toBe('24');
});
test('checks out the repository', () => {
  expect(idx(uses('actions/checkout@'))).toBe(0);
});
test('tests gate the deploy: test:build runs before upload and deploy', () => {
  const ci = idx(runs('npm ci'));
  const gate = idx(runs('npm run test:build'));
  const upload = idx(uses('actions/upload-pages-artifact@'));
  const deploy = idx(uses('actions/deploy-pages@'));
  expect(ci).toBeGreaterThanOrEqual(0);
  expect(gate).toBeGreaterThan(ci);
  expect(upload).toBeGreaterThan(gate);
  expect(deploy).toBeGreaterThan(upload);
});
test('type checking gates the deploy: npm run check runs after install and before test:build', () => {
  const ci = idx(runs('npm ci'));
  const check = idx(runs('npm run check'));
  const gate = idx(runs('npm run test:build'));
  expect(check).toBeGreaterThan(ci);
  expect(gate).toBeGreaterThan(check);
  expect(steps[check]['continue-on-error']).toBeUndefined();
  expect(steps[check].if).toBeUndefined();
});
test('the check script is astro check', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  expect(pkg.scripts.check).toBe('astro check');
});
test('the gate cannot be bypassed', () => {
  const gate = steps[idx(runs('npm run test:build'))];
  expect(gate['continue-on-error']).toBeUndefined();
  expect(gate.if).toBeUndefined();
  for (const j of jobs) expect(j['continue-on-error']).toBeUndefined();
  expect(raw).not.toMatch(/\|\|\s*true/);
});
test('publishes the dist directory', () => {
  const s = steps.find(uses('actions/upload-pages-artifact@'));
  expect(s.with.path).toBe('dist');
});
test('all four actions are pinned to current majors (checkout v7, setup-node v7)', () => {
  expect(idx(uses('actions/checkout@v7'))).toBeGreaterThanOrEqual(0);
  expect(idx(uses('actions/setup-node@v7'))).toBeGreaterThanOrEqual(0);
  expect(raw).not.toMatch(/actions\/checkout@v[0-6]\b/);
  expect(raw).not.toMatch(/actions\/setup-node@v[0-6]\b/);
});
test('unit tests gate the deploy: npm test runs after check and before the build', () => {
  const check = idx(runs('npm run check'));
  const unit = idx(runs('npm test'));
  const gate = idx(runs('npm run test:build'));
  expect(unit).toBeGreaterThan(check);
  expect(gate).toBeGreaterThan(unit);
  expect(steps[unit]['continue-on-error']).toBeUndefined();
  expect(steps[unit].if).toBeUndefined();
});
test('test:build runs the build and then the build tests', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  expect(pkg.scripts['test:build']).toMatch(/^astro build && vitest run tests\/build$/);
});
