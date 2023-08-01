import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [PrismaModule, BlogCategoryModule, BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
