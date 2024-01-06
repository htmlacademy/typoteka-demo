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
}
