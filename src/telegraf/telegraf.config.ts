import { registerAs } from '@nestjs/config';

interface Config {
  telegramBotToken: string;
  telegramChatID: string;
}

export default registerAs(
  'telegraf',
  (): Config => ({
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    telegramChatID: process.env.TELEGRAM_CHAT_ID,
  }),
);
