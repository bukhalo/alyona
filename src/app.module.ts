import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GitLabModule } from './gitlab/gitlab.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    GitLabModule,
  ],
})
export class AppModule {}
