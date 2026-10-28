import { escapeHtml } from './mail';
import type { TelegramButton } from './telegram';
import { isEmail, type Lang } from './validation';

export interface LeadDetails {
  lang: Lang;
  subjects: string[];
  childName: string;
  grade: string;
  goals: string[];
  teachingLanguage: string;
  parentName: string;
  contact: string;
  contactMethod: string;
  notes: string;
  promoCode: string;
}

const SUBJECTS: Record<string, string> = {
  math: 'Математика',
  english: 'Английский',
  hebrew: 'Иврит',
  undecided: 'Предмет пока не выбран',
};

const SUBJECT_TAGS: Record<string, string> = {
  math: '#математика',
  english: '#английский',
  hebrew: '#иврит',
};

const GOALS: Record<string, string> = {
  gaps: 'Закрыть пробелы',
  keepUp: 'Успевать по школьной программе',
  exam: 'Подготовка к экзамену или багруту',
  language: 'Свободнее говорить на языке',
  ahead: 'Заниматься с опережением',
  other: 'Другое',
};

const LANGUAGES: Record<string, string> = {
  ru: 'русский',
  he: 'иврит',
  en: 'английский',
};

/** Left-to-right mark: keeps a label line in reading order when the name in it is Hebrew. */
const LTR = '\u200E';

const CONTACT_METHODS: Record<string, { icon: string; ask: string }> = {
  phone: { icon: '📞', ask: 'просит позвонить' },
  whatsapp: { icon: '💬', ask: 'просит написать в WhatsApp' },
  telegram: { icon: '✈️', ask: 'просит написать в Telegram' },
  email: { icon: '✉️', ask: 'просит ответить на почту' },
};

/** Requests sent before the form submitted codes hold translated labels, which pass through. */
function label(labels: Record<string, string>, value: string): string {
  return Object.hasOwn(labels, value) ? labels[value] : value;
}

export function subjectLabel(value: string): string {
  return label(SUBJECTS, value);
}

export function goalLabel(value: string): string {
  return label(GOALS, value);
}

export function languageLabel(value: string): string {
  return label(LANGUAGES, value);
}

/** International digits for wa.me and t.me links; a number typed without a country code is Israeli. */
function phoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (!raw.startsWith('+')) {
    if (digits.startsWith('00')) digits = digits.slice(2);
    else if (digits.startsWith('0')) digits = `972${digits.slice(1)}`;
    else if (/^5\d{8}$/.test(digits)) digits = `972${digits}`;
  }
  return digits.replace(/^9720/, '972');
}

function formatPhone(digits: string): string {
  const israeli = digits.match(/^972([57]\d|[2-489])(\d{3})(\d{4})$/);
  return israeli ? `+972 ${israeli[1]}-${israeli[2]}-${israeli[3]}` : `+${digits}`;
}

/**
 * Team notification for a diagnostic request: what and who to call back first, the
 * child's details next, the parent's comment as a collapsible quote, then tags and
 * reference data.
 */
export function leadMessage(
  lead: LeadDetails,
  id: string
): { html: string; buttons: TelegramButton[] } {
  const method = CONTACT_METHODS[lead.contactMethod] ?? CONTACT_METHODS.phone;
  const email = isEmail(lead.contact);
  const digits = email ? '' : phoneDigits(lead.contact);
  const dialable = digits.length >= 7;
  const numericGrade = /^\d{1,2}$/.test(lead.grade);

  const headline = [
    lead.subjects.map(subjectLabel).join(', '),
    numericGrade ? `${lead.grade} класс` : lead.grade,
  ].join(' · ');

  const tags = [
    ...lead.subjects
      .filter((code) => Object.hasOwn(SUBJECT_TAGS, code))
      .map((code) => SUBJECT_TAGS[code]),
    numericGrade ? `#${lead.grade}класс` : '',
  ].filter(Boolean);

  const lines = [
    `🆕 <b>${escapeHtml(headline)}</b>`,
    '',
    `${LTR}👤 <b>${escapeHtml(lead.parentName)}</b>`,
    `${method.icon} ${escapeHtml(dialable ? formatPhone(digits) : lead.contact)} · <i>${method.ask}</i>`,
    '',
    `${LTR}🧒 ${escapeHtml(lead.childName)}`,
    `🎯 ${escapeHtml(lead.goals.map(goalLabel).join(', '))}`,
    `🗣 Язык занятий: ${escapeHtml(languageLabel(lead.teachingLanguage))}`,
  ];

  if (lead.promoCode) lines.push(`🎟 Промокод: <code>${escapeHtml(lead.promoCode)}</code>`);

  if (lead.notes) lines.push('', `<blockquote expandable>${escapeHtml(lead.notes)}</blockquote>`);

  lines.push('');
  if (tags.length > 0) lines.push(tags.join(' '));
  lines.push(`<i>Язык сайта: ${languageLabel(lead.lang)}</i> · <code>${escapeHtml(id)}</code>`);

  let buttons: TelegramButton[] = [];
  if (email) {
    buttons = [{ text: '📋 Скопировать почту', copy_text: { text: lead.contact } }];
  } else if (dialable) {
    buttons = [
      { text: '💬 WhatsApp', url: `https://wa.me/${digits}` },
      { text: '✈️ Telegram', url: `https://t.me/+${digits}` },
      { text: '📋 Номер', copy_text: { text: `+${digits}` } },
    ];
  }

  return { html: lines.join('\n'), buttons };
}
