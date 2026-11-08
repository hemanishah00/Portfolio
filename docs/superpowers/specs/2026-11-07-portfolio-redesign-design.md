# Portfolio Redesign — "Runtime"

**Date:** 2026-11-07
**Site:** https://hemanishah.in
**Hosting constraint:** GitHub Pages, static only. No server, no VM, ever.

---

## 1. Why this work exists

Three problems, in order of severity.

### 1.1 The source of truth was lost

Content edits made between June and November 2025 were committed directly to the
`gh-pages` branch — the build output. `main` was never updated. As of today:

- `main` says `GenAI Developer`, `Valsad, Gujarat`, and has no Relanto.
- The live site says `Senior Data Scientist`, `Bengaluru`, and lists Relanto.
- The only machine-readable copy of the live content is the `sourcesContent`
  field inside `static/js/main.0eb5ddb5.js.map` on `gh-pages`.

A single `npm run build` from `main` would have silently reverted the site by
five months. The source has been recovered from the sourcemap and must be
committed to `main` before anything else happens.

### 1.2 The live site is visibly broken

On a page load measured 2026-11-07, 11 of 13 `<img>` elements rendered with
`naturalWidth === 0`. The underlying files are valid and return HTTP 200; the
failures come from the layered `onError` fallback chains in the components,
which reassign `src` through a list of candidate paths and leave several images
empty. The visible result is glowing empty rectangles where the education
photo, four company logos, all four project cards and the contact image belong.

### 1.3 The content is inaccurate

| Problem | Detail |
|---|---|
| Title mismatch | `<title>` and meta description say "Generative AI Engineer"; the body says "Senior Data Scientist" |
| No employment data | No company, job title or date appears anywhere on the site |
| Logo wall without context | Five logos with no roles attached |
| Phone exposed | `+91 9924475599` published in plain text |
| Nothing linkable | All 21 projects are `useState` views, not URLs — unshareable, and one indexable page total |
| Dead favicon | `favicon.ico` returns 404 |
| Brittle resume link | Hardcoded to `hemanishah00.github.io/Portfolio/...` rather than a relative path |
| Stale resume PDF | The repo PDF predates the Relanto role and says Valsad |

---

## 2. Decisions taken

| Decision | Choice | Decided by |
|---|---|---|
| Visual direction | Runtime (terminal / instrument panel) | User |
| Stack | Rebuild on Astro | User |
| Profile photo | None — the boot sequence replaces it | User (original brief) |
| Phone on site | Removed. Retained in the resume PDF. | User |
| Company logos | Keep as a plain logo wall | User |
| Relanto xDR work | Excluded from the site. Resume only. | User |
| Projects section | Nothing removed. All 21 retained. | User |
| Featured case studies | S2P Feedback Intelligence, PharmaBot, Airport Bot, VLM Fine-tuning, Indian Speech-to-Text, EDAA | User |

---

## 3. Verified content

Source: `~/Desktop/HN Shah Resume.pdf` (Aug 2025), supplied by the user as
authoritative and superseding the repo's `HN_Shah_Resume.pdf`.

### 3.1 Experience

| Period | Company | Role |
|---|---|---|
| Sep 2025 – Present | Relanto, Bengaluru | Senior Data Scientist / Senior AI Engineer |
| Oct 2024 – Sep 2025 | 9Nexus (consulted for Cognizant and GSK) | GenAI Developer |
| Aug 2023 – Jul 2024 | ARThink AI | Data Scientist – Generative AI |
| Feb 2023 – Jul 2023 | DeetsDigital | Data Science Trainee |
| Apr 2022 – Jan 2023 | Univ.AI | Teaching Assistant |
| Jan 2022 – Jun 2022 | Advanced Business & Healthcare Solutions | Quality Analyst Trainee Intern |

**Education:** Gujarat Technological University, B.E. Computer Engineering,
2018–2022, CGPA 9.02/10.

**Relanto bullets.** The resume's Relanto bullets describe the xDR sales
automation work, which the user has excluded from the site. The role therefore
appears in the timeline with a single generalized line and no project detail:

> Multi-agent workflow systems and LLM observability for enterprise customer
> engagement.

If the user prefers no description at all, the line is dropped and the entry
shows company, title and dates only.

### 3.2 Contact

- Email: `hemanishah00@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/hemanishah00/`
- GitHub: `https://github.com/hemanishah00`
- Resume: served from a relative path, replaced with the Aug 2025 PDF
- **No phone number.**

---

## 4. Visual system

Dark only. This is intrinsic to the direction, not an unimplemented feature.

### 4.1 Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0E0F` | Page background, near-black with a faint blue-green cast |
| `--surface` | `#12181A` | Panels, table rows on hover |
| `--hairline` | `#1E2729` | All borders. No glows, no drop shadows. |
| `--text` | `#D6E0E0` | Primary text |
| `--muted` | `#7A8A8A` | Secondary text — 5.1:1 on `--bg`, passes WCAG AA |
| `--accent` | `#7EE787` | Caret, active filters, link underlines, section markers |
| `--metric` | `#F0B429` | Impact figures only — "99.9%", "150K+" |

`--accent` is a desaturated phosphor green rather than neon `#33FF66`. It reads
as a terminal without reading as a costume. It is never used for large fills —
only hairline-scale marks and single words.

`--metric` amber is reserved exclusively for quantified outcomes. Because it
appears perhaps six times across the whole site, each occurrence carries weight.

### 4.2 Type

- **JetBrains Mono** — all chrome, labels, navigation, tables, the boot
  sequence, every heading.
- **IBM Plex Sans** — case-study body prose only.

The one deliberate break from the direction: 800 words of monospace prose is
tiring to read, and the case studies are where a reader must actually
concentrate. Everything that frames the content stays mono.

Both self-hosted via `@fontsource` so there is no Google Fonts request and no
layout shift.

### 4.3 Texture and motion

- Static scanline overlay — `repeating-linear-gradient` at 2–3% opacity, plus
  faint noise. `pointer-events: none`.
- Boot-sequence typing animation, blinking block caret, subtle row-hover scan.
- **Every animation is disabled under `prefers-reduced-motion`**, where the boot
  sequence renders instantly in its final state.
- No scroll-jacking, no parallax, no scroll-triggered reveals.

---

## 5. Pages

### 5.1 `/` — home

**Boot sequence.** A terminal frame that types out:

```
$ whoami
hemani shah — senior data scientist @ relanto
bengaluru, india

$ cat positioning.txt
I build production-grade AI systems: multi-agent
workflows, RAG pipelines, document intelligence,
and computer vision.
```

This is what replaces the profile photo. Unlike a photo, it demonstrates
something.

**Status readout.** A fixed-width key/value panel: `ROLE`, `LOCATION`, `FOCUS`,
`STACK`, `AVAILABILITY`.

**`$ cat experience.log`.** The timeline, rendered as log lines — date range,
company, role, indented bullets. Monospace alignment is what makes this work
visually, and it is where dates and titles finally appear on the site. The logo
wall sits below it: grayscale by default, full color on hover.

**`$ ls -la work/`.** All 21 projects in one sortable table — `date`, `domain`,
`name`, `stack`, `impact`. Domain filters render as command flags
(`--filter=genai`). Rows link to case studies where one exists.

**`$ cat contact.txt`.** Email, LinkedIn, GitHub, resume.

### 5.2 `/work/[slug]` — case studies

Six deep studies, structured Problem → Approach → Architecture → Impact.
Fifteen remaining projects appear in the index table with frontmatter only and
no detail page.

Architecture diagrams are **inline SVG, authored by hand — never screenshots**.
They theme correctly, scale to any viewport, cost nothing to load, and
structurally cannot reproduce the blank-box failure the current site exhibits.

Previous/next navigation between case studies.

### 5.3 `/404`

A terminal error — `command not found` — with a `cd ~` link home. Emitted as
`404.html`, which GitHub Pages serves automatically.

---

## 6. Content architecture

```
src/content/profile.json      name, role, location, positioning, links
src/content/experience.json   roles, dates, clients, bullets
src/content/work/*.md         21 files — frontmatter + optional body
```

Astro content collections validate all three against Zod schemas. A mistyped
domain tag or a missing date fails the build rather than shipping.

**This replaces 30 near-identical React components with two templates.** The
current `client/src/components/` holds 21 project components and 4 category
components that differ only in their string literals — that duplication is the
reason the content drifted out of sync in the first place.

Work item frontmatter:

```yaml
title: string
slug: string
year: number
domain: 'analytics' | 'computer-vision' | 'genai' | 'ocr'
stack: string[]
impact: string          # one line, shown in the index table
featured: boolean       # true → renders a /work/[slug] page
```

---

## 7. Build and deploy

- Astro, `output: 'static'`, `site: 'https://hemanishah.in'`.
- GitHub Actions on push to `main`: `astro build` → `actions/deploy-pages`.
- **`gh-pages` becomes CI-only output that no human edits.** This is the
  permanent fix for §1.1 and the single most important structural change in
  this document.
- `CNAME` (`hemanishah.in`) and `.nojekyll` preserved.
- `favicon.svg` added — a caret glyph, fixing the current 404.
- `sitemap.xml`, per-page `<meta>` and Open Graph tags, and a `<title>` that
  matches the actual role.
- A static OG image in the terminal aesthetic.

---

## 8. Asset cleanup

The repo currently carries roughly 24 MB of images across four overlapping
locations — the repo root, `Images/`, `client/public/` and
`client/public/Images/` — with several files duplicated all four times.
Included are a 6.4 MB `FIFA-20.pptx` and a 1.6 MB `favicol.png`.

The new design needs five company logos plus whatever images genuinely serve a
case study. Everything else is deleted, and surviving assets live in exactly one
place: `public/`.

The stale `HN_Shah_Resume.pdf` is replaced with `~/Desktop/HN Shah Resume.pdf`.
The phone number inside that PDF is left as-is per the user's decision — only
the website drops it.

---

## 9. Migration safety

**Step zero, before any other work:** commit the source recovered from
`static/js/main.0eb5ddb5.js.map` to `main`. Today's live content must exist in
version control before anything replaces it.

The old React application is removed only after the Astro build renders every
one of the 21 projects at a reachable URL.

---

## 10. Verification

Done means all of the following, each confirmed by running it:

1. `astro check` passes with zero errors.
2. A link crawl over the built output reports zero broken internal links.
3. All 21 projects resolve at a URL; the 6 featured ones render full case
   studies.
4. Lighthouse scores 100 performance and 100 accessibility on `/`.
5. Rendering verified in the browser pane at 375 px and at desktop width.
6. All motion confirmed disabled under `prefers-reduced-motion`.
7. No string matching `9924475599` appears anywhere in the built output.
8. `<title>` and the visible role agree.
9. A push to `main` deploys, and `hemanishah.in` serves the new site over the
   existing custom domain.

---

## 11. Out of scope

- Any public description of the Relanto xDR work.
- A blog, CMS, analytics, or contact form.
- Light mode.
- Removing or reorganising the 21 projects.
