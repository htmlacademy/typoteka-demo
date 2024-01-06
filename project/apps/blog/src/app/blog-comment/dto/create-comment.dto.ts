import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public message: string;

  @IsString()
  @IsMongoId()
  public userId: string;
}
