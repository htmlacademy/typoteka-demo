import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';

@Module({
  imports: [PrismaModule, BlogCategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
