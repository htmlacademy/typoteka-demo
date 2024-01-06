import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogCategoryRepository } from './blog-category.repository';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogCategoryRepository, BlogCategoryService],
  controllers: [BlogCategoryController],
  exports: [BlogCategoryService],
})
export class BlogCategoryModule {}
