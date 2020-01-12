import { registerAs } from '@nestjs/config';

interface Config {
  webhookToken: string;
  chatID: string;
}

export default registerAs(
  'gitLab',
  (): Config => ({
    webhookToken: process.env.GITLAB_WEBHOOK_TOKEN,
    chatID: process.env.TELEGRAM_CHAT_ID,
  }),
);
