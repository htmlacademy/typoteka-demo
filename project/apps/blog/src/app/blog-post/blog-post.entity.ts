import { Post } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogCategoryEntity } from '../blog-category/blog-category.entity';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';
import { CreatePostDto } from './dto/create-post.dto';

export class BlogPostEntity implements Post, Entity<string, Post> {
  public id?: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public content: string;
  public userId: string;
  public comments: BlogCommentEntity[];
  public categories: BlogCategoryEntity[];
  public description: string;

  public populate(data: Post): BlogPostEntity {
    this.id = data.id ?? undefined;
    this.title = data.title;
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.description = data.description;
    this.content = data.content;
    this.comments = [];
    this.userId = data.userId;
    this.categories = data.categories.map((category) => BlogCategoryEntity.fromObject(category));

    return this;
  }
}
