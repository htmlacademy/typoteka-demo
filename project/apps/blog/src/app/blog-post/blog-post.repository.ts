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

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
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

  public async update(id: string, entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const updatedPost = await this.client.post.update({
      where: { id },
      data: {
        title: pojoEntity.title,
        content: pojoEntity.content,
        description: pojoEntity.description,
        categories: {
          set: pojoEntity.categories.map((category) => ({ id: category.id })),
        }
      },
      include: {
        categories: true,
        comments: true,
      }
    });

    return this.createEntityFromDocument(updatedPost);
  }

  public async find(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.categories) {
      where.categories = {
        some: {
          id: {
            in: query.categories
          }
        }
      }
    }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({ where, orderBy, skip, take,
        include: {
          categories: true,
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    }
  }
}
