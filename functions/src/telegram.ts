import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { isEmulator } from './config';

export const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');
export const telegramChatId = defineSecret('TELEGRAM_CHAT_ID');

/**
 * Posts an HTML-formatted message to the team chat. Resolves to false instead
 * of throwing, so a Telegram outage never loses a request that is already stored.
 */
export async function sendTelegram(html: string): Promise<boolean> {
  const token = telegramBotToken.value();
  const chatId = telegramChatId.value();

  if (!token || !chatId) {
    if (isEmulator) logger.info(`[telegram]\n${html}`);
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
