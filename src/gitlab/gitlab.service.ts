import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafService } from '../telegraf/telegraf.service';

@Injectable()
export class GitLabService {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegrafService: TelegrafService,
  ) {}

  private declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  pushEvent(body: any) {
    const message = [];
    message.push(
      `🔥 <b>GitLab Event [${body.object_kind}]</b>\n\n`,
    );
    message.push(
      `${
        body.total_commits_count
      } new ${this.declOfNum(body.total_commits_count, [
        'commit',
        'commits',
        'commits',
      ])} pushed:\n\n`,
    );
    body.commits.forEach(commit => {
      message.push(
        `<a href="${commit.url}">${commit.id}</a>\n`,
      );
    });
    message.push(
      `\n🗳 <a href="${body.project.web_url}">${body.project.path_with_namespace}</a>\n`,
    );
    message.push(
      `🐼 <a href="https://gitlab.moduldev.ru/${body.user_username}">${body.user_name}</a>`,
    );
    this.telegrafService.sendGitLabEventMessage(message.join(''));
  }

  validateWebhookToken(token: string) {
    if (token !== this.configService.get('gitlab.webhookToken')) {
      throw new HttpException('Invalid webhook token', HttpStatus.FORBIDDEN);
    }
  }

  webhook(body: any, webhookToken: string) {
    this.validateWebhookToken(webhookToken);

    const { object_kind } = body;

    switch (object_kind) {
      case 'push':
        this.pushEvent(body);
        break;
    }
  }
}
