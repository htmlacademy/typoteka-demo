import { Entity } from '@project/util/util-types';
import { Category, Post, Comment} from '@project/shared/app-types';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public id: number;
  public title: string;
  public description: string;
  public content: string;
  public publishAt: Date;
  public userId: string;
  public comments: Comment[];
  public categories: Category[];
  public createdAt: Date;

  constructor(post: Post) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Post): void {
    this.title = entity.title;
    this.description = entity.description;
    this.content = entity.content;
    this.publishAt = new Date();
    this.userId = entity.userId;
    this.comments = [];
    this.categories = [...entity.categories];
    this.createdAt = new Date();
  }

  public toObject(): BlogPostEntity {
    return {
      ...this,
      categories: [...this.categories],
      comments: [...this.comments],
    };
  }

}
