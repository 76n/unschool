import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { LANGS } from './i18n/config';
import { PRODUCT_TYPES, STAGES, SUBJECTS } from './data/taxonomy';

const lang = z.enum(LANGS);
const subject = z.enum(SUBJECTS);
const stage = z.enum(STAGES);

const seo = {
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
};

// The same slug exists once per language, so the id keeps the "{lang}/{slug}" path.
const mdLoader = (dir: string) =>
  glob({
    pattern: '**/*.md',
    base: `./src/content/${dir}`,
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

const subjects = defineCollection({
  loader: mdLoader('subjects'),
  schema: z.object({
    slug: subject,
    lang,
    title: z.string(),
    subtitle: z.string(),
    goals: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    ...seo,
  }),
});

const stages = defineCollection({
  loader: mdLoader('stages'),
  schema: z.object({
    slug: stage,
    lang,
    title: z.string(),
    subtitle: z.string(),
    published: z.boolean().default(true),
    ...seo,
  }),
});

const programs = defineCollection({
  loader: mdLoader('programs'),
  schema: z.object({
    slug: z.string(),
    lang,
    title: z.string(),
    subtitle: z.string(),
    subjects: z.array(subject).min(1),
    stages: z.array(stage).min(1),
    teachingLanguages: z.array(z.string()).default([]),
    audience: z.string(),
    goals: z.array(z.string()).default([]),
    format: z.string(),
    /** Price per lesson in ILS. Null means "confirmed after the assessment". */
    priceFrom: z.number().nullable().default(null),
    priceNote: z.string().optional(),
    teacher: z.string().optional(),
    order: z.number().default(100),
    published: z.boolean().default(true),
    ...seo,
  }),
});

const teachers = defineCollection({
  loader: mdLoader('teachers'),
  schema: z.object({
    slug: z.string(),
    lang,
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    subjects: z.array(subject).default([]),
    teachingLanguages: z.array(z.string()).default([]),
    order: z.number().default(100),
    published: z.boolean().default(true),
    ...seo,
  }),
});

const products = defineCollection({
  loader: mdLoader('products'),
  schema: z.object({
    slug: z.string(),
    lang,
    title: z.string(),
    summary: z.string(),
    type: z.enum(PRODUCT_TYPES),
    subject,
    stages: z.array(stage).default([]),
    grades: z.string(),
    materialLanguage: z.enum(LANGS),
    fileFormat: z.string(),
    contents: z.array(z.string()).default([]),
    level: z.string().optional(),
    outcome: z.string().optional(),
    price: z.number(),
    currency: z.literal('ILS').default('ILS'),
    cover: z.string(),
    previews: z.array(z.string()).default([]),
    /** "demo" products are visible but never purchasable. */
    status: z.enum(['demo', 'published']).default('demo'),
    storagePath: z.string().optional(),
    accessNote: z.string(),
    compatibilityNote: z.string(),
    usageNote: z.string(),
    refundNote: z.string(),
    supportContact: z.string(),
    modules: z.array(z.object({ title: z.string(), duration: z.string().optional() })).default([]),
    totalDuration: z.string().optional(),
    order: z.number().default(100),
    published: z.boolean().default(true),
    ...seo,
  }),
});

const pages = defineCollection({
  loader: mdLoader('pages'),
  schema: z.object({
    slug: z.string(),
    lang,
    title: z.string(),
    subtitle: z.string().optional(),
    updated: z.string().optional(),
    published: z.boolean().default(true),
    /** Used by the formats-and-prices page; empty elsewhere. */
    formats: z
      .array(
        z.object({
          name: z.string(),
          details: z.string(),
          price: z.string(),
        })
      )
      .default([]),
    contact: z
      .object({
        email: z.string().optional(),
        phone: z.string().optional(),
        hours: z.string().optional(),
      })
      .optional(),
    ...seo,
  }),
});

const faq = defineCollection({
  loader: file('./src/content/faq.yaml'),
  schema: z.object({
    id: z.string(),
    lang,
    question: z.string(),
    answer: z.string(),
    order: z.number().default(100),
  }),
});

export const collections = { subjects, stages, programs, teachers, products, pages, faq };
