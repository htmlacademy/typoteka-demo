import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/config-users';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUsersModule,
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
  )],
  controllers: [],
  providers: [],
})
export class AppModule {}
