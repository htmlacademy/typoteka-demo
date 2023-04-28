import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { BlogController } from './blog.controller';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UsersController,
    BlogController,
  ],
})
export class AppModule {}
