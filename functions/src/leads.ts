import { Router } from 'express';
import { logger } from 'firebase-functions/v2';
import { config } from './config';
import { FieldValue, collections } from './firebase';
import { LEAD_CONFIRMATION } from './emails';
import { queueMail } from './mail';
import { clientIp, withinRateLimit } from './rateLimit';
import { asString, asStringList, isEmail, isLang, isPhone } from './validation';

const CONTACT_METHODS = ['phone', 'whatsapp', 'email'];

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

  const errors: Record<string, string> = {};
  if (subjects.length === 0) errors.subjects = 'required';
  if (!childName) errors.childName = 'required';
  if (!grade) errors.grade = 'required';
  if (goals.length === 0) errors.goals = 'required';
  if (!teachingLanguage) errors.teachingLanguage = 'required';
  if (!parentName) errors.parentName = 'required';
  if (!contact) errors.contact = 'required';
  else if (!isEmail(contact) && !isPhone(contact)) errors.contact = 'invalid';

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
    handled: false,
    source: 'website',
    createdAt: FieldValue.serverTimestamp(),
  };

  try {
    const doc = await collections.leads.add(lead);

    const summary = [
      `Предметы: ${subjects.join(', ')}`,
      `Имя ребёнка: ${childName}`,
      `Класс: ${grade}`,
      `С чем нужна помощь: ${goals.join(', ')}`,
      `Язык преподавания: ${teachingLanguage}`,
      `Родитель: ${parentName}`,
      `Контакт: ${contact} (${lead.contactMethod})`,
      `Язык сайта: ${lang}`,
      `Комментарий: ${notes || '—'}`,
      '',
      `ID заявки: ${doc.id}`,
    ].join('\n');

    const schoolMailId = await queueMail({
      to: config.schoolEmail,
      subject: `Новая заявка на диагностику — ${subjects.join(', ')}, ${grade} класс`,
      text: summary,
      kind: 'lead',
      relatedId: doc.id,
    });

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

    await doc.update({ schoolMailId, parentMailId });

    res.json({ ok: true, id: doc.id });
  } catch (error) {
    logger.error('Failed to store lead', error);
    res.status(500).json({ ok: false, error: 'server_error' });
  }
});
