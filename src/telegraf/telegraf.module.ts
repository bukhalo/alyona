import { Module } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';
import { ConfigModule } from '@nestjs/config';
import telegrafConfig from './telegraf.config';

@Module({
  imports: [ConfigModule.forFeature(telegrafConfig)],
  providers: [TelegrafService],
  exports: [TelegrafService],
})
export class TelegrafModule {}
