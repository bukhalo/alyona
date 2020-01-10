type ObjectKind = 'push' | 'merge_request';

export class WebhookPayloadDto {
  object_kind: ObjectKind;
}
