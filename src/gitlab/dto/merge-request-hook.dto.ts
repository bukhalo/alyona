import { WebhookPayloadDto } from './webhook-payload.dto';
import { User } from './parts/user.part';
import { Project } from './parts/project.part';

export class MergeRequestHookDto extends WebhookPayloadDto {
  user: User;
  project: Project;
  object_attributes: {
    target_branch: string;
    source_branch: string;
  };
}
