# "Runtime" Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken Create React App portfolio at hemanishah.in with a static Astro site in a terminal/instrument-panel aesthetic, carrying accurate employment data and no profile photo.

**Architecture:** Astro static output. All content lives in three validated sources — `profile.json`, `experience.json`, and 21 markdown files in a `work` collection — consumed by two page templates (`index.astro`, `work/[slug].astro`). This replaces 30 near-identical React components whose duplication caused the content drift described in the spec. CI builds `main` and deploys to `gh-pages`, which no human edits again.

**Tech Stack:** Astro 7.4.x, TypeScript, Vitest 5.1.x, `@astrojs/sitemap` 3.7.x, `@fontsource/jetbrains-mono` + `@fontsource/ibm-plex-sans` 5.3.x, Node 24. No UI framework, no CSS framework.

**Spec:** `docs/superpowers/specs/2026-11-07-portfolio-redesign-design.md`

## Global Constraints

- Hosting is GitHub Pages, static only. No server, no SSR, no runtime data fetching.
- `astro.config.mjs` sets `output: 'static'` and `site: 'https://hemanishah.in'`.
- Dark theme only. No light mode, no theme toggle.
- Color tokens, verbatim: `--bg: #0A0E0F`, `--surface: #12181A`, `--hairline: #1E2729`, `--text: #D6E0E0`, `--muted: #7A8A8A`, `--accent: #7EE787`, `--metric: #F0B429`.
- `--accent` is used only for caret, active filters, link underlines and section markers — never large fills. `--metric` is used only for quantified outcomes.
- JetBrains Mono for all chrome, labels, nav, tables, headings. IBM Plex Sans for case-study body prose only. Both self-hosted via `@fontsource`; no Google Fonts request.
- Every animation is disabled under `prefers-reduced-motion`.
- The string `9924475599` (and any spaced variant) must not appear in build output.
- No description of the Relanto xDR / sales-automation work appears anywhere on the site.
- All 21 projects are retained. None are removed or merged.
- `public/CNAME` contains exactly `hemanishah.in`.
- Fonts, logos and the resume PDF live in `public/` only — no duplicate asset directories.

## Review Focus

1. **JavaScript disabled or failed to load** — the boot sequence must render its complete final text in static HTML. The current React site renders an empty `<div id="root">` without JS; the replacement must not inherit that. *Test in Task 5.*
2. **`CNAME` missing from build output** — `hemanishah.in` stops resolving and the site goes dark. The existing `deploy-github-pages.js` actively writes the *wrong* domain (`www.hemanishah.com`), so this failure is already latent in the repo. *Test in Task 9.*
3. **Relanto xDR detail leaking into rendered output** — the resume text is in the repo and will be in the implementer's context while they write `experience.json`. Easy to paste in by reflex. *Test in Task 6.*
4. **`prefers-reduced-motion` ignored** — a typing animation that cannot be stopped is an accessibility failure, not a flourish. *Test in Task 5.*
5. **Long project titles or stack lists overflowing the work table at 375px** — a monospace table is the layout most likely to force horizontal page scroll on a phone. *Test in Task 7, confirmed visually in Task 12.*

---

### Task 1: Checkpoint the recovered source

Before anything is replaced, today's live content must exist in version control. It currently exists only in `static/js/main.0eb5ddb5.js.map` on `gh-pages` and in a scratchpad copy.

**Files:**
- Create: `docs/recovered-2026-11-07/` (the recovered `src/` tree)

- [ ] **Step 1: Re-extract the live source from the deployed sourcemap**

```bash
git show gh-pages:static/js/main.0eb5ddb5.js.map > /tmp/live.map
python3 -I -c "
import json, os
m = json.load(open('/tmp/live.map'))
for s, c in zip(m['sources'], m['sourcesContent']):
    if 'node_modules' in s or 'webpack' in s: continue
    p = os.path.join('docs/recovered-2026-11-07', s)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(c or '')
"
```

- [ ] **Step 2: Verify the recovery captured the live content, not main's stale content**

Run: `grep -l "Senior Data Scientist" docs/recovered-2026-11-07/components/*.js`
Expected: matches `IntroPage.js` and `GenAISection.js`. If it matches nothing, the wrong bundle hash was used — list `git ls-tree gh-pages static/js/` and use the hash referenced by `gh-pages:index.html`.

- [ ] **Step 3: Verify Relanto is present**

Run: `grep -c "Relanto" docs/recovered-2026-11-07/components/ExperienceSection.js`
Expected: `1`

- [ ] **Step 4: Commit**

```bash
git add docs/recovered-2026-11-07
git commit -m "chore: checkpoint live site source recovered from gh-pages sourcemap"
```

---

### Task 2: Astro scaffold, profile and experience collections

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`
- Create: `src/content.config.ts`, `src/content/profile.json`, `src/content/experience.json`
- Create: `src/lib/dates.ts`
- Test: `tests/unit/content.test.ts`, `tests/unit/dates.test.ts`

**Interfaces:**
- Produces: `formatRange(start: string, end: string | null): string` in `src/lib/dates.ts` — takes `"2025-09"` / `null`, returns `"Sep 2025 – Present"`. Separator is an en dash with spaces.
- Produces: collections `profile` and `experience`, defined in `src/content.config.ts`.
- Produces: `experience.json` entries shaped `{ company, role, location, start, end, client, bullets }` where `end` is `null` for the current role and `client` is `null` except for 9Nexus.

- [ ] **Step 1: Write the failing tests**

```ts
// tests/unit/dates.test.ts
import { formatRange } from '../../src/lib/dates';
test('formats a closed range', () => {
  expect(formatRange('2024-10', '2025-09')).toBe('Oct 2024 – Sep 2025');
});
test('formats an open range as Present', () => {
  expect(formatRange('2025-09', null)).toBe('Sep 2025 – Present');
});
```

```ts
// tests/unit/content.test.ts
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
test('profile carries no phone number', () => {
  expect(JSON.stringify(profile)).not.toMatch(/9924\s*475\s*599/);
});
test('profile role matches the spec', () => {
  expect(profile.role).toBe('Senior Data Scientist');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit`
Expected: FAIL — modules not found.

- [ ] **Step 3: Scaffold the project**

`npm create astro@latest` is interactive; instead write `package.json`, `astro.config.mjs`, `tsconfig.json` (extending `astro/tsconfigs/strict`) and `vitest.config.ts` directly, then `npm install`. Dependencies: `astro@^7.4.7`, `@astrojs/sitemap@^3.7.4`, `@fontsource/jetbrains-mono@^5.3.0`, `@fontsource/ibm-plex-sans@^5.3.0`. Dev: `vitest@^5.1.0`. Scripts: `dev`, `build`, `preview`, `test` (`vitest run tests/unit`), `test:build` (`astro build && vitest run tests/build`).

- [ ] **Step 4: Implement `formatRange` in `src/lib/dates.ts`**

Format month names with `Intl.DateTimeFormat('en-GB', { month: 'short' })` against a UTC date so the output does not shift by timezone.

- [ ] **Step 5: Write `profile.json` and `experience.json`**

Content comes from spec §3.1 and §3.2 verbatim. Six entries, newest first. **Relanto's `bullets` is exactly one string:** `"Multi-agent workflow systems and LLM observability for enterprise customer engagement."` — no xDR detail, no sales-automation specifics. `profile.json` has no `phone` key.

- [ ] **Step 6: Define the schemas in `src/content.config.ts`**

Zod schemas for both files. `end` is `z.string().nullable()`, `client` is `z.string().nullable()`, `bullets` is `z.array(z.string()).min(1)`.

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run tests/unit`
Expected: PASS, 8 tests.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json vitest.config.ts src tests
git commit -m "feat: scaffold Astro project with profile and experience collections"
```

---

### Task 3: Work collection — all 21 projects

**Files:**
- Create: `src/content/work/*.md` (21 files)
- Modify: `src/content.config.ts`
- Test: `tests/unit/work-content.test.ts`

**Interfaces:**
- Produces: a `work` collection. Frontmatter: `title: string`, `year: number`, `domain: 'analytics' | 'computer-vision' | 'genai' | 'ocr'`, `stack: string[]`, `impact: string` (one line, shown in the index table), `featured: boolean`.
- Slug is the filename stem. Six files have a body; fifteen have frontmatter only.

The 21 projects, from the existing React components: FIFA-20, Deep Dive of Housing in India, NER (analytics); Attendance using Face Recognition, Vehicle Detection, Super Resolution, EDAA, FireBrands (computer-vision); Eye Prescription Bot, OCR on Multilingual Forms, Invoice Extraction and Automation (ocr); Airport Bot, Cycle GANs, Doc Bot, HR Bot, Indian Speech-to-text, Pharma Bot, VLM fine-tuning, IntelliExtract, SmartTable Extractor, Voice2Insight (genai).

Featured six: `s2p-feedback-intelligence`, `pharma-bot`, `airport-bot`, `vlm-finetuning`, `indian-speech-to-text`, `edaa`.

> **Note:** `s2p-feedback-intelligence` is new — it is the 9Nexus dashboard work from spec §3.1, which has no existing React component but is the strongest result in the history. Adding it brings the index to 22 entries. This adds a project rather than removing one, so it respects the "nothing removed" constraint. Confirm with the user if an exact count of 21 matters.

- [ ] **Step 1: Write the failing test**

`astro:content` is a virtual module and will not resolve under bare Vitest. Configure `vitest.config.ts` with `getViteConfig()` from `astro/config` so the import works. If Astro 7 does not support that, read `src/content/work/*.md` with `fs` and parse frontmatter directly — the assertions matter more than the access path.

```ts
// tests/unit/work-content.test.ts
import { getCollection } from 'astro:content';
const work = await getCollection('work');

test('every project is present', () => {
  expect(work.length).toBeGreaterThanOrEqual(21);
});
test('exactly six are featured', () => {
  expect(work.filter((w) => w.data.featured)).toHaveLength(6);
});
test('slugs are unique', () => {
  const ids = work.map((w) => w.id);
  expect(new Set(ids).size).toBe(ids.length);
});
test('every featured project has a body', () => {
  for (const w of work.filter((x) => x.data.featured)) {
    expect(w.body.trim().length, `${w.id} is featured but empty`).toBeGreaterThan(200);
  }
});
test('no project body mentions the excluded Relanto work', () => {
  for (const w of work) {
    expect(w.body).not.toMatch(/xDR|Extended Detection|upsell recommendation/i);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/work-content.test.ts`
Expected: FAIL — collection empty.

- [ ] **Step 3: Add the `work` schema to `src/content.config.ts`**

`glob` loader over `src/content/work/*.md`, with the frontmatter schema above.

- [ ] **Step 4: Write the 15 index-only files**

Frontmatter only. Source `title`, `domain` and `stack` from the corresponding component in `docs/recovered-2026-11-07/components/`. `impact` is one line describing the outcome, not the method.

- [ ] **Step 5: Write the 6 featured files**

Each body has four `##` sections in order: Problem, Approach, Architecture, Impact. Architecture sections leave a `<!-- diagram -->` marker for Task 8. Content comes from spec §3.1 bullets and the recovered components. The S2P study carries the quantified figures: 150K+ comments, five months reduced to under five minutes, ~99.9% effort reduction.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/unit/work-content.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 7: Commit**

```bash
git add src/content/work src/content.config.ts tests/unit/work-content.test.ts
git commit -m "feat: add work collection with 22 projects, 6 featured"
```

---

### Task 4: Design tokens and base layout

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`
- Test: `tests/unit/tokens.test.ts`

**Interfaces:**
- Produces: `BaseLayout.astro`, props `{ title: string; description: string; path: string }`. Renders `<head>` with meta, Open Graph, canonical URL, font imports and the scanline overlay element.
- Produces: the seven CSS custom properties from Global Constraints, on `:root`.

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/tokens.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/tokens.test.ts`
Expected: FAIL — `src/lib/contrast` not found.

- [ ] **Step 3: Implement `contrast(fg: string, bg: string): number` in `src/lib/contrast.ts`**

Standard WCAG 2.1 relative-luminance ratio: sRGB channel values divided by 255, linearised with the 0.03928 threshold, weighted 0.2126/0.7152/0.0722, then `(L1 + 0.05) / (L2 + 0.05)`.

- [ ] **Step 4: Write `src/styles/tokens.css` and `src/styles/global.css`**

`tokens.css` holds the seven colors plus type-scale and spacing variables. `global.css` holds the reset, `body` background and color, the `@font-face` imports, and the scanline overlay (`repeating-linear-gradient`, 2–3% opacity, `pointer-events: none`, fixed position).

- [ ] **Step 5: Implement `BaseLayout.astro`**

`<title>` is `` `${title} — ${profile.role}` `` for subpages and `` `${profile.name} — ${profile.role}` `` for the home page. Include `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/unit/tokens.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 7: Commit**

```bash
git add src/styles src/layouts/BaseLayout.astro src/lib/contrast.ts tests/unit/tokens.test.ts
git commit -m "feat: add design tokens with verified contrast and base layout"
```

---

### Task 5: Terminal primitives and boot sequence

**Files:**
- Create: `src/components/TerminalFrame.astro`, `src/components/Prompt.astro`, `src/components/BootSequence.astro`
- Create: `src/pages/index.astro` — minimal, rendering `BaseLayout` + `BootSequence` only. Task 6 extends this file; it exists here so this task's build tests have a page to assert against.
- Test: `tests/build/boot.test.ts`

**Interfaces:**
- Produces: `TerminalFrame.astro` — a bordered panel, `--hairline` border, no glow, `<slot />`.
- Produces: `Prompt.astro`, props `{ command: string }` — renders `$ <command>` as a section header with `--accent` on the `$`.
- Produces: `BootSequence.astro` — no props; reads `profile.json` directly.

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/boot.test.ts
import { readFileSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');

test('boot text is in static HTML, so it survives JS being off', () => {
  expect(html).toContain('senior data scientist @ relanto');
  expect(html).toContain('bengaluru, india');
  expect(html).toMatch(/production-grade AI systems/);
});
test('typing animation is gated behind prefers-reduced-motion', () => {
  const css = readFileSync('dist/index.html', 'utf8') +
    globSync('dist/_astro/*.css').map((f) => readFileSync(f, 'utf8')).join('');
  expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:build`
Expected: FAIL — `dist/index.html` missing or text absent.

- [ ] **Step 3: Implement the three components and the minimal `index.astro`**

`BootSequence` renders the complete final text in markup. The typing effect is a progressive enhancement: an inline script reveals characters over time from text already in the DOM. It must never inject the text itself. Under `prefers-reduced-motion: reduce`, the script does not run and the caret does not blink.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:build`
Expected: PASS, 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components tests/build/boot.test.ts
git commit -m "feat: add terminal primitives and progressive-enhancement boot sequence"
```

---

### Task 6: Home page sections

**Files:**
- Create: `src/components/StatusReadout.astro`, `src/components/ExperienceLog.astro`, `src/components/LogoWall.astro`, `src/components/ContactBlock.astro`
- Create: `public/logos/{gsk,cognizant,arthink-ai,univ-ai,relanto}.png` — sourced from `Images/` in the repo root. They belong here, not in Task 10, so no build between this task and that one carries broken image references.
- Modify: `src/pages/index.astro` (created minimally in Task 5)
- Test: `tests/build/home.test.ts`

**Interfaces:**
- Consumes: `BaseLayout`, `TerminalFrame`, `Prompt`, `BootSequence` (Tasks 4–5); `formatRange` (Task 2).
- Produces: `src/pages/index.astro` rendering, in order: BootSequence, StatusReadout, `$ cat experience.log`, LogoWall, `$ ls -la work/` (Task 7), `$ cat contact.txt`.

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/home.test.ts
const html = readFileSync('dist/index.html', 'utf8');

test('every role appears with its dates', () => {
  for (const [co, range] of [
    ['Relanto', 'Sep 2025 – Present'],
    ['9Nexus', 'Oct 2024 – Sep 2025'],
    ['ARThink AI', 'Aug 2023 – Jul 2024'],
    ['DeetsDigital', 'Feb 2023 – Jul 2023'],
    ['Univ.AI', 'Apr 2022 – Jan 2023'],
    ['Advanced Business & Healthcare Solutions', 'Jan 2022 – Jun 2022'],
  ]) {
    expect(html).toContain(co);
    expect(html).toContain(range);
  }
});
test('the phone number is absent', () => {
  expect(html).not.toMatch(/9924\s*475\s*599/);
});
test('the Relanto xDR work is absent', () => {
  expect(html).not.toMatch(/xDR|Extended Detection|upsell recommendation|win-back/i);
});
test('education is present', () => {
  expect(html).toContain('Gujarat Technological University');
  expect(html).toContain('9.02');
});
test('contact routes are present and the resume path is relative', () => {
  expect(html).toContain('hemanishah00@gmail.com');
  expect(html).toContain('linkedin.com/in/hemanishah00');
  expect(html).toMatch(/href="\/HN_Shah_Resume\.pdf"/);
});
test('the document title agrees with the role shown on the page', () => {
  const title = html.match(/<title>([^<]+)<\/title>/)![1];
  expect(title).toBe('Hemani Shah — Senior Data Scientist');
  expect(title).not.toContain('Generative AI Engineer');
  const desc = html.match(/name="description" content="([^"]+)"/)![1];
  expect(desc).not.toContain('Generative AI Engineer');
});
```

This closes the live site's `<title>` / body mismatch from spec §1.3, and pins it so it cannot drift back.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:build`
Expected: FAIL.

- [ ] **Step 3: Implement the four components and `index.astro`**

`ExperienceLog` renders each role as a log line: date range in `--muted`, company in `--text`, role beneath, bullets indented. 9Nexus shows its `client` string under the company name. `LogoWall` renders the five logos in one row, `filter: grayscale(1)` by default and `grayscale(0)` on hover. `ContactBlock` has no phone entry.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:build`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components src/pages/index.astro public/logos tests/build/home.test.ts
git commit -m "feat: build home page with experience timeline and contact block"
```

---

### Task 7: Work index table and domain filtering

**Files:**
- Create: `src/lib/work.ts`, `src/components/WorkTable.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/unit/work.test.ts`, `tests/build/work-table.test.ts`

**Interfaces:**
- Produces: `sortWork(items: WorkItem[]): WorkItem[]` — newest year first, then title A–Z within a year.
- Produces: `filterByDomain(items: WorkItem[], domain: Domain | 'all'): WorkItem[]`.
- Produces: `DOMAINS: readonly Domain[]` — `['analytics', 'computer-vision', 'genai', 'ocr']`.
- Produces: exported types `Domain` and `WorkItem` (`{ title: string; year: number; domain: Domain; stack: string[]; impact: string; featured: boolean }`), matching the Task 3 frontmatter schema. Later tasks import both from here.

- [ ] **Step 1: Write the failing tests**

```ts
// tests/unit/work.test.ts
test('sorts newest first, then alphabetically within a year', () => {
  const out = sortWork([
    { title: 'Zebra', year: 2023 }, { title: 'Alpha', year: 2024 }, { title: 'Beta', year: 2023 },
  ] as WorkItem[]);
  expect(out.map((w) => w.title)).toEqual(['Alpha', 'Beta', 'Zebra']);
});
test('filters by domain', () => {
  const items = [{ domain: 'ocr' }, { domain: 'genai' }] as WorkItem[];
  expect(filterByDomain(items, 'ocr')).toHaveLength(1);
});
test('"all" returns everything', () => {
  const items = [{ domain: 'ocr' }, { domain: 'genai' }] as WorkItem[];
  expect(filterByDomain(items, 'all')).toHaveLength(2);
});
```

```ts
// tests/build/work-table.test.ts
test('every project has a row', () => {
  expect([...html.matchAll(/data-work-row/g)]).toHaveLength(22);
});
test('long cells are constrained so the table cannot force page scroll', () => {
  const css = allBuiltCss();
  expect(css).toMatch(/\[data-work-row\][\s\S]*?(text-overflow|overflow-wrap|max-width)/);
});
test('featured projects link to their case study', () => {
  expect(html).toMatch(/href="\/work\/pharma-bot"/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/unit/work.test.ts`
Expected: FAIL — `src/lib/work` not found.

- [ ] **Step 3: Implement `src/lib/work.ts`**

Pure functions, no Astro imports, so the unit tests run without a build.

- [ ] **Step 4: Implement `WorkTable.astro` and mount it in `index.astro`**

Columns: year, domain, name, stack, impact. Filter controls render as `--filter=genai` flag buttons; the active one takes `--accent`. Filtering is client-side over rows already in the DOM — all rows must be present in static HTML. At ≤640px the table collapses to stacked cards; cells use `overflow-wrap: anywhere` so a long stack list wraps instead of widening the page.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run tests/unit/work.test.ts && npm run test:build`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add src/lib/work.ts src/components/WorkTable.astro src/pages/index.astro tests
git commit -m "feat: add filterable work index table"
```

---

### Task 8: Case study pages

**Files:**
- Create: `src/layouts/CaseStudyLayout.astro`, `src/pages/work/[slug].astro`
- Create: `src/components/diagrams/*.astro` (6 inline SVG diagrams)
- Test: `tests/build/case-studies.test.ts`

**Interfaces:**
- Consumes: the `work` collection (Task 3), `BaseLayout` (Task 4), `sortWork` (Task 7).
- Produces: `getStaticPaths()` emitting one route per `featured: true` entry.
- Produces: `prev` / `next` props from the `sortWork` ordering of featured items. The first has no `prev`; the last has no `next`. **No wrapping.**

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/case-studies.test.ts
const slugs = ['s2p-feedback-intelligence', 'pharma-bot', 'airport-bot',
               'vlm-finetuning', 'indian-speech-to-text', 'edaa'];

test('each featured project builds a page', () => {
  for (const s of slugs) expect(existsSync(`dist/work/${s}/index.html`)).toBe(true);
});
test('non-featured projects build no page', () => {
  expect(existsSync('dist/work/fifa-20/index.html')).toBe(false);
});
test('each page has all four sections', () => {
  for (const s of slugs) {
    const h = readFileSync(`dist/work/${s}/index.html`, 'utf8');
    for (const sec of ['Problem', 'Approach', 'Architecture', 'Impact']) expect(h).toContain(sec);
  }
});
test('architecture diagrams are inline SVG, not images', () => {
  for (const s of slugs) {
    const h = readFileSync(`dist/work/${s}/index.html`, 'utf8');
    expect(h).toContain('<svg');
  }
});
test('navigation does not wrap at the ends', () => {
  const first = readFileSync(`dist/work/${sortedFirst}/index.html`, 'utf8');
  expect(first).not.toContain('data-nav-prev');
});
test('the S2P study carries its quantified impact', () => {
  const h = readFileSync('dist/work/s2p-feedback-intelligence/index.html', 'utf8');
  expect(h).toMatch(/150K\+/);
  expect(h).toMatch(/99\.9%/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:build`
Expected: FAIL — no `dist/work/`.

- [ ] **Step 3: Implement `CaseStudyLayout.astro` and `work/[slug].astro`**

Header: title, year, domain tag, stack chips, the one-line impact. Body prose in IBM Plex Sans; all headings and chrome stay in JetBrains Mono. Quantified figures wrapped in a `<span class="metric">` using `--metric`.

- [ ] **Step 4: Author the six inline SVG diagrams**

Hand-authored SVG using `currentColor` and the CSS tokens so they theme with the page. Each replaces the `<!-- diagram -->` marker from Task 3. No raster images, no screenshots.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test:build`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/CaseStudyLayout.astro src/pages/work src/components/diagrams tests/build/case-studies.test.ts
git commit -m "feat: add six case study pages with inline SVG architecture diagrams"
```

---

### Task 9: 404, favicon, OG image, sitemap and CNAME

**Files:**
- Create: `src/pages/404.astro`, `public/favicon.svg`, `public/og.png`, `public/CNAME`, `public/.nojekyll`
- Modify: `astro.config.mjs`
- Test: `tests/build/static-assets.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/static-assets.test.ts
test('CNAME survives the build and names the right domain', () => {
  expect(readFileSync('dist/CNAME', 'utf8').trim()).toBe('hemanishah.in');
});
test('Jekyll processing is disabled', () => {
  expect(existsSync('dist/.nojekyll')).toBe(true);
});
test('404 page is emitted', () => {
  expect(readFileSync('dist/404.html', 'utf8')).toContain('command not found');
});
test('favicon is present and is SVG', () => {
  expect(existsSync('dist/favicon.svg')).toBe(true);
});
test('sitemap is generated', () => {
  expect(existsSync('dist/sitemap-index.xml')).toBe(true);
});
test('sitemap uses the custom domain', () => {
  expect(readFileSync('dist/sitemap-index.xml', 'utf8')).toContain('https://hemanishah.in');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:build`
Expected: FAIL — `dist/CNAME` missing.

- [ ] **Step 3: Add the static files and the sitemap integration**

`public/CNAME` contains exactly `hemanishah.in` — this is the live domain, and it is **not** the `www.hemanishah.com` that `deploy-github-pages.js` writes. `favicon.svg` is a caret glyph in `--accent` on `--bg`. `og.png` is 1200×630 in the terminal aesthetic. Register `@astrojs/sitemap` in `astro.config.mjs`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:build`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add public src/pages/404.astro astro.config.mjs tests/build/static-assets.test.ts
git commit -m "feat: add 404, favicon, OG image, sitemap and CNAME"
```

---

### Task 10: Asset consolidation and resume replacement

**Files:**
- Create: `public/HN_Shah_Resume.pdf`
- Delete: `Images/`, `pdfs/`, `ppts/`, root-level images, `client/public/`
- Test: `tests/build/assets.test.ts`

The logos were created in Task 6. This task deletes the directory they were sourced from, so the logo assertion below is a regression check that they survived the cleanup.

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/assets.test.ts
test('the resume is served', () => {
  expect(existsSync('dist/HN_Shah_Resume.pdf')).toBe(true);
});
test('the resume is a real PDF of plausible size', () => {
  const buf = readFileSync('dist/HN_Shah_Resume.pdf');
  expect(buf.subarray(0, 4).toString()).toBe('%PDF');
  expect(buf.length).toBeGreaterThan(50_000);
});
test('all five logos are served', () => {
  for (const l of ['gsk', 'cognizant', 'arthink-ai', 'univ-ai', 'relanto'])
    expect(existsSync(`dist/logos/${l}.png`)).toBe(true);
});
test('duplicate asset directories are gone', () => {
  for (const d of ['Images', 'pdfs', 'ppts', 'client/public']) expect(existsSync(d)).toBe(false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:build`
Expected: FAIL.

- [ ] **Step 3: Copy the current resume in**

```bash
cp "$HOME/Desktop/HN Shah Resume.pdf" public/HN_Shah_Resume.pdf
```

Its phone number stays — only the website drops the number.

- [ ] **Step 4: Delete the duplicate asset directories**

Delete `Images/`, `pdfs/`, `ppts/`, `client/public/`, the root-level images, and the 6.4 MB `FIFA-20.pptx` and 1.6 MB `favicol.png`. Do not touch `public/logos/` — Task 6 put those there and they are now the only copies.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test:build`
Expected: PASS, 4 tests. If the logo assertion fails here, Step 4 deleted the live copies rather than the duplicates — restore from git and narrow the deletion.

- [ ] **Step 6: Commit**

```bash
git add -A public Images pdfs ppts client
git commit -m "chore: consolidate assets into public/ and update resume PDF"
```

---

### Task 11: CI deploy workflow

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Delete: `deploy-github-pages.js`, `deploy.md`, `DEPLOYMENT_SUMMARY.md`
- Test: `tests/unit/workflow.test.ts`

The existing workflow uses `peaceiris/actions-gh-pages` with `publish_dir: client/build` and does not preserve `CNAME`. `deploy-github-pages.js` writes `CNAME` as `www.hemanishah.com`, which is the wrong domain. Both are replaced.

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/workflow.test.ts
const wf = readFileSync('.github/workflows/deploy.yml', 'utf8');

test('uses the official Pages deployment action', () => {
  expect(wf).toContain('actions/deploy-pages');
});
test('the superseded deploy paths are gone', () => {
  expect(wf).not.toContain('peaceiris');
  expect(wf).not.toContain('client/build');
  expect(existsSync('deploy-github-pages.js')).toBe(false);
});
test('deploys only from main', () => {
  expect(wf).toMatch(/branches:\s*\[\s*main\s*\]/);
});
test('tests gate the deploy', () => {
  expect(wf).toContain('npm run test:build');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/unit/workflow.test.ts`
Expected: FAIL.

- [ ] **Step 3: Rewrite the workflow**

Trigger on push to `main` only. Steps: checkout, `actions/setup-node@v4` with Node 24, `npm ci`, `npm run test:build`, `actions/upload-pages-artifact` with `path: dist`, `actions/deploy-pages`. Permissions `pages: write`, `id-token: write`. The build must fail the job before deploying if tests fail.

- [ ] **Step 4: Delete the superseded deploy files**

```bash
git rm deploy-github-pages.js deploy.md DEPLOYMENT_SUMMARY.md
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/unit/workflow.test.ts`
Expected: PASS, 4 tests.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml tests/unit/workflow.test.ts
git commit -m "ci: deploy via actions/deploy-pages, gated on tests"
```

---

### Task 12: Remove the React app and run full verification

**Files:**
- Delete: `client/`
- Create: `tests/build/links.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/build/links.test.ts
test('no internal link 404s', () => {
  const pages = globSync('dist/**/*.html');
  const targets = new Set(pages.map(toRoute));
  for (const p of pages) {
    for (const href of internalHrefs(readFileSync(p, 'utf8'))) {
      expect(targets.has(href) || existsSync(join('dist', href)), `${p} → ${href}`).toBe(true);
    }
  }
});
test('every project is reachable', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  expect([...html.matchAll(/data-work-row/g)].length).toBeGreaterThanOrEqual(21);
});
```

- [ ] **Step 2: Run test to verify it fails or passes**

Run: `npm run test:build`
Expected: either; if it passes immediately, confirm by introducing a broken href and re-running.

- [ ] **Step 3: Delete the React application**

```bash
git rm -r client
```

The recovered source from Task 1 remains in `docs/recovered-2026-11-07/`, so nothing is lost.

- [ ] **Step 4: Run the full suite**

Run: `npx astro check && npm run build && npm test && npm run test:build`
Expected: all green. `astro check` must report zero errors, zero warnings and zero hints.

- [ ] **Step 5: Verify in the browser pane at both widths**

Serve `dist/` and check at 375px and desktop. Confirm: no horizontal page scroll at 375px, the work table collapses to cards, the logo wall stays in one row, the boot sequence completes.

- [ ] **Step 6: Verify with JavaScript disabled and with reduced motion**

Load with JS off — the full boot text, all experience entries and all project rows must be visible. Load with `prefers-reduced-motion: reduce` emulated — no typing, no caret blink.

- [ ] **Step 7: Run Lighthouse**

Run: `npx lighthouse http://localhost:4321 --only-categories=performance,accessibility --chrome-flags="--headless"`
Expected: 100 performance, 100 accessibility. Record any shortfall and its cause.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: remove React app, complete Runtime redesign"
```

- [ ] **Step 9: Deploy and confirm the live domain**

Push `main`. After the workflow completes, confirm `https://hemanishah.in` serves the new site, `curl -I https://hemanishah.in/favicon.svg` returns 200, and the live HTML contains no match for `9924475599`.
