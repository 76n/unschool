import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { isEmulator } from './config';

export const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');
export const telegramChatId = defineSecret('TELEGRAM_CHAT_ID');

/** Bot API inline button: opens an http(s) or tg:// link, or copies text to the clipboard. */
export type TelegramButton =
  { text: string; url: string } | { text: string; copy_text: { text: string } };

/**
 * Posts an HTML-formatted message, with an optional row of inline buttons, to the
 * team chat. Resolves to false instead of throwing, so a Telegram outage never
 * loses a request that is already stored.
 */
export async function sendTelegram(html: string, buttons: TelegramButton[] = []): Promise<boolean> {
  const token = telegramBotToken.value();
  const chatId = telegramChatId.value();

  if (!token || !chatId) {
    if (isEmulator) logger.info(`[telegram]\n${html}`, { buttons });
    else
      logger.error('Telegram is not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is empty');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: 'HTML',
        link_preview_options: { is_disabled: true },
        ...(buttons.length > 0 && { reply_markup: { inline_keyboard: [buttons] } }),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      logger.error('Telegram rejected the message', {
        status: response.status,
        body: await response.text(),
      });
      return false;
    }
    return true;
  } catch (error) {
    logger.error('Telegram request failed', error);
    return false;
  }
}
