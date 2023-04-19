import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@project/config/config-notify';
import { getMongooseOptions } from '@project/util/util-core';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
