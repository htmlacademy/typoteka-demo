import { Category } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogCategoryEntity implements Category, Entity<string> {
  public id?: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Category) {
    if (!data.title) {
      throw new Error('Category title is required');
    }

    this.populate(data);
  }

  public populate(data: Category): void {
    this.id = data.id ?? '';
    this.title = data.title;
    this.updatedAt = data.updatedAt ?? undefined;
    this.createdAt = data.createdAt ?? undefined;
  }

  public toPOJO(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
