import { Entity } from '@project/util/util-types';
import { Token } from '@project/shared/app-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public id: string;
  public tokenId: string;
  public userId: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.createdAt = new Date;
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }

}
