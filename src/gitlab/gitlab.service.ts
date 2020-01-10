import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pluralize from 'pluralize';
import { TelegrafService } from '../telegraf/telegraf.service';

@Injectable()
export class GitLabService {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegrafService: TelegrafService,
  ) {}

  pushEvent(body: any) {
    const message = [];
    message.push(`🔥 <b>GitLab Event [${body.object_kind}]</b>\n\n`);
    message.push(
      `${body.total_commits_count} new ${pluralize(
        'commit',
        body.total_commits_count,
      )} pushed:\n\n`,
    );
    body.commits.forEach(commit => {
      message.push(`<a href="${commit.url}">${commit.id}</a>\n`);
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
