import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GitLabController } from './gitlab.controller';
import { GitLabService } from './gitlab.service';
import gitLabConfig from './gitlab.config';
import { TelegrafModule } from '../telegraf/telegraf.module';

@Module({
  imports: [ConfigModule.forFeature(gitLabConfig), TelegrafModule],
  controllers: [GitLabController],
  providers: [GitLabService],
})
export class GitLabModule {}
