import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@project/shared/app/types';

import { BasePostgresRepository } from '@project/shared/core';
import { BlogCategoryEntity } from './blog-category.entity';
import { PrismaClientService } from '@project/shared/blog/models';
import { MAX_CATEGORY_LIMIT } from './blog-category.constant';
import { CategoryFilter, categoryFilterToPrismaFilter } from './blog-category.filter';

@Injectable()
export class BlogCategoryRepository extends BasePostgresRepository<BlogCategoryEntity, Category> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, BlogCategoryEntity.fromObject);
  }

  public async save(entity: BlogCategoryEntity): Promise<BlogCategoryEntity> {
    const record = await this.client.category.create({
      data: { ...entity.toPOJO() }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<BlogCategoryEntity> {
    const document = await this.client.category.findFirst({
      where: {
        id,
      },
    });

    if (! document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: CategoryFilter): Promise<BlogCategoryEntity[]> {
    const where = filter ?? categoryFilterToPrismaFilter(filter);

    const documents = await this.client.category.findMany({
      where,
      take: MAX_CATEGORY_LIMIT
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id,
      }
    });
  }

  public async update(id: string, entity: BlogCategoryEntity): Promise<BlogCategoryEntity> {
    const updatedCategory = await this.client.category.update({
      where: { id },
      data: {
        title: entity.title,
      }
    });

    return this.createEntityFromDocument(updatedCategory);
  }

  public async findByIds(ids: string[]): Promise<BlogCategoryEntity[]> {
    const records = await this.client.category.findMany({
      where: {
        id: {
          in: ids,
        }
      }
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}
