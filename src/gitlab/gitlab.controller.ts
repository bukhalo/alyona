import { Controller, Body, Headers, Post } from '@nestjs/common';
import { GitLabService } from './gitlab.service';

@Controller('gitlab')
export class GitLabController {
  constructor(private readonly gitLabService: GitLabService) {}

  @Post('webhook')
  webhook(@Body() body: any, @Headers('x-gitlab-token') webhookToken: string) {
    this.gitLabService.webhook(body, webhookToken);
  }
}
