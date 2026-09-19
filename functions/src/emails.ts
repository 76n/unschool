import type { Lang } from './validation';

interface LeadCopy {
  subject: string;
  body: (name: string) => string;
}

export const LEAD_CONFIRMATION: Record<Lang, LeadCopy> = {
  ru: {
    subject: 'Unschool — заявка получена',
    body: (name) =>
      `${name ? `${name}, з` : 'З'}аявка на бесплатную диагностическую встречу получена.\n\n` +
      'Мы свяжемся с вами выбранным способом и предложим удобное время. ' +
      'Если ответа не будет, напишите нам на hello@unschool.cool — заявка не потеряется.',
  },
  he: {
    subject: 'Unschool — הפנייה התקבלה',
    body: (name) =>
      `${name ? `${name}, ה` : 'ה'}פנייה לפגישת אבחון חינם התקבלה.\n\n` +
      'ניצור קשר בדרך שבחרתם ונציע זמן שנוח לכם. ' +
      'אם לא קיבלתם מענה, כתבו לנו ל-hello@unschool.cool — הפנייה לא תיעלם.',
  },
  en: {
    subject: 'Unschool — request received',
    body: (name) =>
      `${name ? `${name}, y` : 'Y'}our request for a free assessment meeting has been received.\n\n` +
      'We will get in touch the way you chose and suggest a time that suits you. ' +
      'If you hear nothing, write to hello@unschool.cool — the request will not be lost.',
  },
};

interface DeliveryCopy {
  subject: (title: string) => string;
  body: (input: { title: string; price: string; link: string; orderId: string }) => string;
}

export const ORDER_DELIVERY: Record<Lang, DeliveryCopy> = {
  ru: {
    subject: (title) => `Unschool — ваш материал: ${title}`,
    body: ({ title, price, link, orderId }) =>
      `Спасибо за покупку.\n\nЗаказ: ${orderId}\nМатериал: ${title}\nСумма: ${price}\n\n` +
      `Ссылка на материал: ${link}\n\n` +
      'Ссылка действует ограниченное время. Если она истекла, откройте страницу заказа и ' +
      'запросите письмо повторно или напишите на hello@unschool.cool.',
  },
  he: {
    subject: (title) => `Unschool — החומר שלכם: ${title}`,
    body: ({ title, price, link, orderId }) =>
      `תודה על הרכישה.\n\nהזמנה: ${orderId}\nחומר: ${title}\nסכום: ${price}\n\n` +
      `קישור לחומר: ${link}\n\n` +
      'הקישור תקף לזמן מוגבל. אם פג התוקף, פתחו את דף ההזמנה ובקשו לשלוח את המייל שוב או ' +
      'כתבו ל-hello@unschool.cool.',
  },
  en: {
    subject: (title) => `Unschool — your material: ${title}`,
    body: ({ title, price, link, orderId }) =>
      `Thank you for your purchase.\n\nOrder: ${orderId}\nMaterial: ${title}\nAmount: ${price}\n\n` +
      `Link to the material: ${link}\n\n` +
      'The link works for a limited time. If it has expired, open the order page and ask us to ' +
      'resend the email, or write to hello@unschool.cool.',
  },
};

export function formatIls(amount: number): string {
  return `${amount.toLocaleString('he-IL')} ₪`;
}
