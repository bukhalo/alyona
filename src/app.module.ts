import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GitLabModule } from './gitlab/gitlab.module';
import { TelegrafModule } from './telegraf/telegraf.module';

@Module({
  imports: [ConfigModule.forRoot({}), GitLabModule, TelegrafModule],
})
export class AppModule {}
