import { WebhookPayloadDto } from './webhook-payload.dto';
import { Commit } from './parts/commit.part';
import { Project } from './parts/project.part';

export class PushHookDto extends WebhookPayloadDto {
  user_name: string;
  user_username: string;
  commits: Commit[];
  project: Project;
  total_commits_count: number;
}
