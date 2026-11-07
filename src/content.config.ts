import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const profile = defineCollection({
  loader: file('src/content/profile.json', { parser: (text) => [{ id: 'profile', ...JSON.parse(text) }] }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    linkedin: z.url(),
    github: z.url(),
    location: z.string(),
    positioning: z.string(),
    resume: z.string(),
    education: z.object({
      institution: z.string(),
      degree: z.string(),
      start: z.number(),
      end: z.number(),
      cgpa: z.string(),
    }),
  }),
});

const experience = defineCollection({
  loader: file('src/content/experience.json', {
    parser: (text) => JSON.parse(text).map((e: { company: string }, i: number) => ({ id: String(i), ...e })),
  }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    start: z.string(),
    end: z.string().nullable(),
    client: z.string().nullable(),
    bullets: z.array(z.string()),
  }),
});

// `year` is optional: the sources give no project dates, and only the
// DeetsDigital projects (all within 2023) can be dated without guessing.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/work' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int().optional(),
    domain: z.enum(['analytics', 'computer-vision', 'genai', 'ocr']),
    stack: z.array(z.string()),
    impact: z.string(),
    featured: z.boolean(),
  }),
});

export const collections = { profile, experience, work };
