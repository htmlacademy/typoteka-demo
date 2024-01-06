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

  public toPOJO(): Post {
    return {
      id: this.id,
      title: this.title,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      content: this.content,
      description: this.description,
      comments: [],
      categories: this.categories.map((categoryEntity) => categoryEntity.toPOJO()),
    }
  }

  static fromObject(data: Post): BlogPostEntity {
    return new BlogPostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDto, categories: BlogCategoryEntity[]): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.categories = categories;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }
}
