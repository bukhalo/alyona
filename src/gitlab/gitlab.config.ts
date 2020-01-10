import { registerAs } from '@nestjs/config';

interface Config {
  webhookToken: string;
}

export default registerAs(
  'gitlab',
  (): Config => ({
    webhookToken: process.env.GITLAB_WEBHOOK_TOKEN,
  }),
);
