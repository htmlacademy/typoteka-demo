import { Entity } from '@typoteka/core';
import { Token } from '@typoteka/shared-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
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
    return { ...this }
  }
}
