import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const profile = defineCollection({
  loader: file('src/content/profile.json', { parser: (text) => [{ id: 'profile', ...JSON.parse(text) }] }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    linkedin: z.string().url(),
    github: z.string().url(),
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

export const collections = { profile, experience };
