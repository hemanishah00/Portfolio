// Generates public/og.png (1200x630 social card) from an inline SVG using sharp.
//
// NOTE: public/og.png is a COMMITTED ARTEFACT, not a build step. Nothing in
// `npm run build` or CI runs this script. Re-run it by hand
// (`npm run make:og`) and commit the new PNG whenever the name, role or domain
// on the card changes.
//
// Run from anywhere; paths resolve relative to the repo root.
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = fileURLToPath(new URL('../public/og.png', import.meta.url));
const F = "Menlo, 'DejaVu Sans Mono', Courier, monospace";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0A0E0F"/>
<rect x="60" y="60" width="1080" height="510" fill="#12181A" stroke="#1E2729" stroke-width="2"/>
<line x1="60" y1="120" x2="1140" y2="120" stroke="#1E2729" stroke-width="2"/>
<circle cx="96" cy="90" r="7" fill="#1E2729"/><circle cx="124" cy="90" r="7" fill="#1E2729"/><circle cx="152" cy="90" r="7" fill="#1E2729"/>
<text x="1104" y="98" text-anchor="end" font-family="${F}" font-size="22" fill="#7A8A8A">hemanishah.in</text>
<text x="110" y="220" font-family="${F}" font-size="34" fill="#7A8A8A"><tspan fill="#7EE787">$</tspan> whoami</text>
<text x="110" y="330" font-family="${F}" font-size="84" font-weight="700" fill="#D6E0E0">Hemani Shah</text>
<text x="110" y="400" font-family="${F}" font-size="36" fill="#7A8A8A">Senior Data Scientist</text>
<text x="110" y="500" font-family="${F}" font-size="34" fill="#7A8A8A"><tspan fill="#7EE787">$</tspan> <tspan fill="#D6E0E0">cat projects.log</tspan></text>
<rect x="492" y="474" width="18" height="34" fill="#7EE787"/>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`wrote ${out}`);
