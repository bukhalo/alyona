import { WebhookPayloadDto } from './webhook-payload.dto';
import { User } from './parts/user.part';
import { Project } from './parts/project.part';

export class MergeRequestHookDto extends WebhookPayloadDto {
  user: User;
  project: Project;
  object_attributes: {
    title: string;
    url: string;
    target_branch: string;
    source_branch: string;
    work_in_progress: boolean;
    state: 'opened' | 'merged';
    action: 'open' | 'update' | 'merge';
  };
}
