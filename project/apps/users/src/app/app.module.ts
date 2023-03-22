import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogUserModule } from './blog-user/blog-user.module';

@Module({
  imports: [AuthenticationModule, BlogUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
