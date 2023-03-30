import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigUsersModule } from '@project/config/config-users';

@Module({
  imports: [AuthenticationModule, BlogUserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
