import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PaginationResult, Post } from '@project/shared/app/types';
import { PrismaClientService } from '@project/shared/blog/models';
import { BasePostgresRepository } from '@project/shared/core';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostQuery } from './query/blog-post.query';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<BlogPostEntity, Post> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogPostEntity.fromObject);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        categories: {
          connect: pojoEntity.categories
            .map(({ id }) => ({ id }))
        },
        comments: {
          connect: []
        }
      }
    });

    entity.id = record.id;
    return entity;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id
      }
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        categories: true,
        comments: true,
      }
    });

    if (! document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }


}
