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

/** Featured projects first (they have a case study); within each group, dated projects (newest year, then title A-Z), then undated (title A-Z). Returns a new array. */
export function sortWork<T extends WorkItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    const aDated = a.year != null;
    const bDated = b.year != null;
    if (aDated !== bDated) return aDated ? -1 : 1;
    if (aDated && bDated && a.year !== b.year) return b.year! - a.year!;
    return byTitle(a, b);
  });
}
