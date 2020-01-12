import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GitLabController } from './gitlab.controller';
import { GitLabService } from './gitlab.service';
import gitLabConfig from './gitlab.config';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [
    BotModule,
    ConfigModule.forFeature(gitLabConfig),
  ],
  controllers: [GitLabController],
  providers: [GitLabService],
})
export class GitLabModule {}
