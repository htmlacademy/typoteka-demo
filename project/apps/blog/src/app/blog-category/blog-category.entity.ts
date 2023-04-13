import { Entity } from '@project/util/util-types';
import { Category } from '@project/shared/app-types';

export class BlogCategoryEntity implements Entity<BlogCategoryEntity>, Category {
  public categoryId: number;
  public title: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Category) {
    this.title = entity.title;
    this.categoryId = entity.categoryId;
  }

  public toObject(): BlogCategoryEntity {
    return { ...this }
  }
}
