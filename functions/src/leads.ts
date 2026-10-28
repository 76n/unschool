import { Router } from 'express';
import { logger } from 'firebase-functions/v2';
import { forwardToCrm } from './crm';
import { FieldValue, collections } from './firebase';
import { LEAD_CONFIRMATION } from './emails';
import { goalLabel, languageLabel, leadMessage } from './leadMessage';
import { queueMail } from './mail';
import { clientIp, withinRateLimit } from './rateLimit';
import { sendTelegram } from './telegram';
import { asString, asStringList, isEmail, isLang, isPhone } from './validation';

const CONTACT_METHODS = ['phone', 'whatsapp', 'telegram', 'email'];
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;

export const leadsRouter: Router = Router();

leadsRouter.post('/', async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  // Hidden field: only bots fill it in.
  if (asString(body.company)) {
    res.status(200).json({ ok: true });
    return;
  }

  const ip = clientIp(req);
  if (!(await withinRateLimit(`lead:${ip}`, 5, 600))) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const lang = isLang(body.lang) ? body.lang : 'ru';
  const subjects = asStringList(body.subjects, 6, 60);
  const childName = asString(body.childName, 120);
  const grade = asString(body.grade, 80);
  const goals = asStringList(body.goals, 8, 120);
  const teachingLanguage = asString(body.teachingLanguage, 40);
  const parentName = asString(body.parentName, 120);
  const contact = asString(body.contact, 160);
  const contactMethod = asString(body.contactMethod, 20);
  const notes = asString(body.notes, 1500);
  const promoCode = asString(body.promoCode, 40);
  const rawUtm = (body.utm ?? {}) as Record<string, unknown>;
  const utm = Object.fromEntries(
    UTM_KEYS.map((key) => [key, asString(rawUtm[key], 120)]).filter(([, value]) => value)
  );
  const rawConsents = (body.consents ?? {}) as Record<string, unknown>;
  const consents = { terms: rawConsents.terms === true, marketing: rawConsents.marketing === true };

  const errors: Record<string, string> = {};
  if (subjects.length === 0) errors.subjects = 'required';
  if (!childName) errors.childName = 'required';
  if (!grade) errors.grade = 'required';
  if (goals.length === 0) errors.goals = 'required';
  if (!teachingLanguage) errors.teachingLanguage = 'required';
  if (!parentName) errors.parentName = 'required';
  if (!contact) errors.contact = 'required';
  else if (!isEmail(contact) && !isPhone(contact)) errors.contact = 'invalid';
  if (!consents.terms) errors.consentTerms = 'required';

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }

  const lead = {
    lang,
    subjects,
    childName,
    grade,
    goals,
    teachingLanguage,
    parentName,
    contact,
    contactMethod: CONTACT_METHODS.includes(contactMethod) ? contactMethod : 'phone',
    notes,
    promoCode,
    utm,
    consents,
    handled: false,
    source: 'website',
    createdAt: FieldValue.serverTimestamp(),
  };

  try {
    const doc = await collections.leads.add(lead);

    const { html, buttons } = leadMessage(lead, doc.id);
    const telegramSent = await sendTelegram(html, buttons);

    let parentMailId: string | null = null;
    if (isEmail(contact)) {
      const copy = LEAD_CONFIRMATION[lang];
      parentMailId = await queueMail({
        to: contact,
        subject: copy.subject,
        text: copy.body(parentName),
        kind: 'lead',
        relatedId: doc.id,
      });
    }

    const crmSent = await forwardToCrm({
      parentName,
      contact,
      contactMethod: lead.contactMethod,
      lang,
      childName,
      grade,
      subjects: subjects.filter((subject) => subject !== 'undecided'),
      goals: goals.map(goalLabel),
      teachingLanguage: languageLabel(teachingLanguage),
      ...(notes && { notes }),
      ...(promoCode && { promoCode }),
      source: 'site',
      utm,
      consents,
    });

    await doc.update({ telegramSent, parentMailId, crmSent });

    res.json({ ok: true, id: doc.id });
  } catch (error) {
    logger.error('Failed to store lead', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});
