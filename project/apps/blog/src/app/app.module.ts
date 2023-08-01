import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BlogCategoryModule } from './blog-category/blog-category.module';

@Module({
  imports: [PrismaModule, BlogCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
