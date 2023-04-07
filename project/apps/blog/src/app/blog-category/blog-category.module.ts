import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryRepository } from './blog-category.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService, BlogCategoryRepository],
  exports: [BlogCategoryRepository]
})
export class BlogCategoryModule {}
