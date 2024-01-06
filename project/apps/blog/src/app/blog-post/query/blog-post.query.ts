import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { DEFAULT_PAGE_COUNT, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../blog-post.constant';
import { SortDirection } from '@project/shared/app/types';


export class BlogPostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsUUID('all', { each: true })
  @IsArray()
  @IsOptional()
  public categories?: string[];

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;
}
