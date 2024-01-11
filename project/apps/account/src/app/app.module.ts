import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigAccountModule, getMongooseOptions } from '@project/shared/config/account';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigAccountModule,
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
