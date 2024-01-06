import { Module } from "@nestjs/common";

import { BlogCategoryModule } from '../blog-category/blog-category.module';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService }    from './blog-post.service';
import { PrismaClientModule } from '@project/shared/blog/models';

@Module({
  imports: [BlogCategoryModule, PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
  exports: [BlogPostService],
})
export class BlogPostModule {}
