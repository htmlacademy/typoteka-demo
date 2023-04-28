import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    })
  ],
  controllers: [
    UsersController,
    BlogController,
  ],
  providers: [],
})
export class AppModule {}
