import { Comment } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { CreateCommentDto } from './dto/create-comment.dto';

export class BlogCommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public postId?: string;
  public message: string;
  public userId: string;

  public populate(data: Comment): BlogCommentEntity {
    this.id = data.id ?? undefined;
    this.createdAt = data.createdAt;
    this.message = data.message;
    this.postId = data.postId;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;

    return this;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId,
      message: this.message,
      userId: this.userId
    }
  }

  static fromObject(data: Comment): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate(data);
  }

  static fromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    return new BlogCommentEntity()
      .populate({
        ...dto,
        postId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
}
