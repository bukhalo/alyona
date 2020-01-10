import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pluralize from 'pluralize';
import { TelegrafService } from '../telegraf/telegraf.service';
import { PushHookDto } from './dto/push-hook.dto';
import { MergeRequestHookDto } from './dto/merge-request-hook.dto';
import { WebhookPayloadDto } from './dto/webhook-payload.dto';

@Injectable()
export class GitLabService {
  constructor(
    private readonly configService: ConfigService,
    private readonly telegrafService: TelegrafService,
  ) {}

  mergeRequest(body: MergeRequestHookDto) {
    const message = [];
    message.push(`🔥 <b>GitLab Event [${body.object_kind}]</b>\n\n`);
    message.push(
      `Pull request <a href="${body.object_attributes.url}">${body.object_attributes.title}</a> opened:\n\n`,
    );
    message.push(
      `${body.object_attributes.source_branch} => ${body.object_attributes.target_branch}`,
    );
    message.push(
      `\n\n🗳 <a href="${body.project.web_url}">${body.project.path_with_namespace}</a>\n`,
    );
    message.push(
      `🐼 <a href="https://gitlab.moduldev.ru/${body.user.username}">${body.user.name}</a>`,
    );

    /* Send message in chat */
    this.telegrafService.sendGitLabEventMessage(message.join(''));
  }

  pushEvent(body: PushHookDto) {
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

    /* Send message in chat */
    this.telegrafService.sendGitLabEventMessage(message.join(''));
  }

  validateWebhookToken(token: string) {
    if (token !== this.configService.get('gitlab.webhookToken')) {
      throw new HttpException('Invalid webhook token', HttpStatus.FORBIDDEN);
    }
  }

  webhook(body: WebhookPayloadDto, webhookToken: string) {
    this.validateWebhookToken(webhookToken);

    const { object_kind } = body;

    switch (object_kind) {
      case 'push':
        const pushDto = body as PushHookDto;
        /* Check commits exist in branch */
        if (pushDto.commits.length > 0) {
          this.pushEvent(pushDto);
        }
        break;
      case 'merge_request':
        const mergeDto = body as MergeRequestHookDto;
        /* Check pull request is opened */
        if (
          mergeDto.object_attributes.action === 'open' &&
          mergeDto.object_attributes.state === 'opened'
        ) {
          this.mergeRequest(mergeDto);
        }
        break;
    }
  }
}
