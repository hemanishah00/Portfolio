// Pure helpers for the work index. No Astro imports, so unit tests run without a build.

export const DOMAINS = ['analytics', 'computer-vision', 'genai', 'ocr'] as const;
export type Domain = (typeof DOMAINS)[number];

// Mirrors the `work` collection schema. `year` is optional: most projects have no sourceable date.
export interface WorkItem {
  title: string;
  year?: number;
  domain: Domain;
  stack: string[];
  impact: string;
  featured: boolean;
}

const byTitle = (a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title);

/** Dated projects first (newest year, then title A-Z); undated projects after, title A-Z. Returns a new array. */
export function sortWork<T extends WorkItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aDated = a.year != null;
    const bDated = b.year != null;
    if (aDated !== bDated) return aDated ? -1 : 1;
    if (aDated && bDated && a.year !== b.year) return b.year! - a.year!;
    return byTitle(a, b);
  });
}

export function filterByDomain<T extends WorkItem>(items: T[], domain: Domain | 'all'): T[] {
  return domain === 'all' ? [...items] : items.filter((i) => i.domain === domain);
}
