import { BaseMemoryRepository } from '@project/shared/core';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {}
