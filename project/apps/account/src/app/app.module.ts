import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';
import { ConfigAccountModule } from '@project/shared/config/account';

@Module({
  imports: [AuthenticationModule, BlogUserModule, ConfigAccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
