import type { UiKey } from '~/i18n/ui';

export const SUBJECTS = ['math', 'english', 'hebrew'] as const;
export type Subject = (typeof SUBJECTS)[number];

export const STAGES = ['elementary', 'middle', 'high'] as const;
export type Stage = (typeof STAGES)[number];

export const PRODUCT_TYPES = ['workbook', 'taskset', 'course', 'other'] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];

export function subjectNameKey(subject: Subject): UiKey {
  return `subject.${subject}.name` as UiKey;
}

export function stageNameKey(stage: Stage): UiKey {
  return `stage.${stage}.name` as UiKey;
}

export function stageGradesKey(stage: Stage): UiKey {
  return `stage.${stage}.grades` as UiKey;
}

/** Short grade range used as the typographic mark on stage tiles. */
export function stageRangeKey(stage: Stage): UiKey {
  return `stage.${stage}.range` as UiKey;
}

/** Condensed stage label for narrow tiles. */
export function stageShortKey(stage: Stage): UiKey {
  return `stage.${stage}.short` as UiKey;
}

export function productTypeKey(type: ProductType): UiKey {
  return `product.type.${type}` as UiKey;
}

/** One hue per subject: equal weight in the hierarchy, distinct identity. */
export const SUBJECT_THEME: Record<Subject, { accent: string; soft: string }> = {
  math: { accent: 'var(--math)', soft: 'var(--math-soft)' },
  english: { accent: 'var(--english)', soft: 'var(--english-soft)' },
  hebrew: { accent: 'var(--hebrew)', soft: 'var(--hebrew-soft)' },
};

/** Typographic mark used instead of stock illustration. */
export const SUBJECT_GLYPH: Record<Subject, string> = {
  math: '×',
  english: 'Aa',
  hebrew: 'א',
};

/** A second colour family, so age tiles never read as subject tiles. */
export const STAGE_THEME: Record<Stage, { accent: string; soft: string }> = {
  elementary: { accent: 'var(--honey)', soft: 'var(--honey-soft)' },
  middle: { accent: 'var(--sky)', soft: 'var(--sky-soft)' },
  high: { accent: 'var(--berry)', soft: 'var(--berry-soft)' },
};

export const SUBJECT_ICON: Record<Subject, 'calculator' | 'chat' | 'aleph'> = {
  math: 'calculator',
  english: 'chat',
  hebrew: 'aleph',
};

export const STAGE_ICON: Record<Stage, 'child' | 'teen' | 'graduate'> = {
  elementary: 'child',
  middle: 'teen',
  high: 'graduate',
};

export function isSubject(value: unknown): value is Subject {
  return typeof value === 'string' && (SUBJECTS as readonly string[]).includes(value);
}

export function isStage(value: unknown): value is Stage {
  return typeof value === 'string' && (STAGES as readonly string[]).includes(value);
}
