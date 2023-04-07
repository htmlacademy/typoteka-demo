import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [PrismaModule, BlogCategoryModule, BlogPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
