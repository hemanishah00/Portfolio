import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

/**
 * Every stylesheet the site ships: the linked files in dist/_astro plus the `<style>` blocks Astro
 * inlines into individual pages (the case studies are under its inline threshold, so their CSS
 * lives in the HTML, not in a file). Scanning only the files leaves most pages unchecked.
 */
export function allCss(): string {
  const files = walk('dist');
  const linked = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(f, 'utf8'));
  const inline = files
    .filter((f) => f.endsWith('.html'))
    .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]));
  return [...linked, ...inline].join('\n');
}
