import { BaseMemoryRepository } from '@project/shared/core';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  public findByEmail(email: string): Promise<BlogUserEntity | null> {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return Promise.resolve(user);
  }
}
