import type { Lang } from '~/i18n/config';
import { LANGS } from '~/i18n/config';
import { localePath } from '~/i18n/routes';

export const FALLBACK_ORIGIN = 'https://unschool.cool';

type Site = URL | string | undefined;
type Node = Record<string, unknown>;

export const originOf = (site: Site) => (site ? new URL(site).origin : FALLBACK_ORIGIN);

export const absolute = (path: string, site: Site) => new URL(path, originOf(site)).toString();

/**
 * Stable node identifiers let every page reference the same organisation and
 * site entities instead of redeclaring them, which is what search engines
 * reconcile into a single knowledge graph.
 */
export const orgId = (site: Site) => `${originOf(site)}/#organization`;
export const siteId = (site: Site) => `${originOf(site)}/#website`;
export const pageId = (url: URL) => `${url.origin}${url.pathname}#webpage`;

export const CONTACT_EMAIL = 'hello@unschool.cool';

/** Covers render as SVG on the page; crawlers and social cards need the raster twin. */
export const rasterCover = (cover: string) => cover.replace(/\.svg$/, '.png');

export function organization(site: Site, description: string): Node {
  return {
    '@type': 'EducationalOrganization',
    '@id': orgId(site),
    name: 'Unschool',
    alternateName: 'Unschool Online School',
    url: originOf(site),
    logo: {
      '@type': 'ImageObject',
      '@id': `${originOf(site)}/#logo`,
      url: absolute('/icon-512.png', site),
      width: 512,
      height: 512,
      caption: 'Unschool',
    },
    image: { '@id': `${originOf(site)}/#logo` },
    description,
    email: CONTACT_EMAIL,
    areaServed: { '@type': 'Country', name: 'Israel' },
    availableLanguage: [...LANGS],
    knowsLanguage: [...LANGS],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: [...LANGS],
      areaServed: 'IL',
    },
  };
}

export function website(lang: Lang, site: Site, name: string, description: string): Node {
  return {
    '@type': 'WebSite',
    '@id': siteId(site),
    url: originOf(site),
    name,
    description,
    inLanguage: lang,
    publisher: { '@id': orgId(site) },
  };
}

export function webPage(
  url: URL,
  lang: Lang,
  site: Site,
  { title, description, type = 'WebPage' }: { title: string; description: string; type?: string }
): Node {
  return {
    '@type': type,
    '@id': pageId(url),
    url: url.toString(),
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': siteId(site) },
    about: { '@id': orgId(site) },
  };
}

export function breadcrumbs(
  items: { href?: string; label: string }[],
  lang: Lang,
  site: Site,
  homeLabel: string
): Node {
  const trail = [{ href: localePath(lang), label: homeLabel }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absolute(item.href, site) } : {}),
    })),
  };
}

export function faqPage(items: { question: string; answer: string }[]): Node | undefined {
  if (items.length === 0) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

const EDUCATIONAL_LEVEL: Record<string, string> = {
  elementary: 'Primary school, grades 1-6',
  middle: 'Middle school, grades 7-9',
  high: 'High school, grades 10-12',
};

export function course(
  {
    title,
    description,
    subjects,
    stages,
    teachingLanguages,
    goals,
    priceFrom,
    format,
  }: {
    title: string;
    description: string;
    subjects: string[];
    stages: string[];
    teachingLanguages: string[];
    goals: string[];
    priceFrom: number | null;
    format: string;
  },
  url: URL,
  lang: Lang,
  site: Site
): Node {
  const offer =
    priceFrom === null
      ? undefined
      : {
          '@type': 'Offer',
          category: 'Paid',
          priceCurrency: 'ILS',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: priceFrom,
            priceCurrency: 'ILS',
            valueAddedTaxIncluded: true,
          },
          url: url.toString(),
          availability: 'https://schema.org/InStock',
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url.origin}${url.pathname}#course`,
    name: title,
    description,
    url: url.toString(),
    inLanguage: lang,
    teaches: goals.length > 0 ? goals : undefined,
    about: subjects,
    educationalLevel: stages.map((stage) => EDUCATIONAL_LEVEL[stage] ?? stage),
    provider: { '@id': orgId(site) },
    isAccessibleForFree: false,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: format,
      inLanguage: teachingLanguages.length > 0 ? teachingLanguages : [lang],
      location: { '@type': 'VirtualLocation', url: url.toString() },
    },
    ...(offer ? { offers: offer } : {}),
  };
}

export function digitalProduct(
  {
    title,
    summary,
    cover,
    price,
    currency,
    subject,
    grades,
    fileFormat,
    materialLanguage,
    purchasable,
  }: {
    title: string;
    summary: string;
    cover: string;
    price: number;
    currency: string;
    subject: string;
    grades: string;
    fileFormat: string;
    materialLanguage: string;
    purchasable: boolean;
  },
  url: URL,
  site: Site
): Node {
  // Demo materials are shown but cannot be bought, so they carry no Offer.
  const offers = purchasable
    ? {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        url: url.toString(),
        seller: { '@id': orgId(site) },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'IL',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        },
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'DigitalDocument'],
    '@id': `${url.origin}${url.pathname}#product`,
    name: title,
    description: summary,
    image: absolute(cover, site),
    url: url.toString(),
    brand: { '@id': orgId(site) },
    category: subject,
    inLanguage: materialLanguage,
    audience: { '@type': 'EducationalAudience', educationalRole: 'student', audienceType: grades },
    encodingFormat: fileFormat,
    ...(offers ? { offers } : {}),
  };
}

export function freeDiagnosticService(url: URL, lang: Lang, site: Site, name: string, description: string): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url.origin}${url.pathname}#service`,
    name,
    description,
    serviceType: 'Educational assessment',
    provider: { '@id': orgId(site) },
    areaServed: { '@type': 'Country', name: 'Israel' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url.toString(),
      availableLanguage: [...LANGS],
    },
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'ILS',
      availability: 'https://schema.org/InStock',
      url: url.toString(),
    },
    inLanguage: lang,
  };
}
