import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Telegraf, { ContextMessageUpdate } from 'telegraf';

@Injectable()
export class TelegrafService implements OnApplicationBootstrap {
  public bot: Telegraf<ContextMessageUpdate>;

  constructor(private readonly configService: ConfigService) {
    this.bot = new Telegraf(configService.get('telegraf.telegramBotToken'));
    // this.bot.on('message', ctx => {
    //   Logger.log(JSON.stringify(ctx), 'Telegraf');
    // });
  }

  sendGitLabEventMessage(message: string) {
    this.bot.telegram.sendMessage(
      this.configService.get('telegraf.telegramChatID'),
      message,
      {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        disable_notification: true,
      },
    );
  }

  onApplicationBootstrap() {
    this.bot.launch();
  }
}
