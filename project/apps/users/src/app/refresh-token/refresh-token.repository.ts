import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenModel } from './refresh-token.model';
import { Model } from 'mongoose';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Token } from '@project/shared/app-types';

export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshTokenModel.name) private readonly refreshTokenModel: Model<RefreshTokenModel>) {
  }

  public async create(item: RefreshTokenEntity): Promise<Token> {
    return new this.refreshTokenModel(item).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel
      .deleteOne({ tokenId })
      .exec();
  }

  public async findByTokenId(tokenId: string): Promise<Token | null> {
    return this.refreshTokenModel
      .findOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel
      .deleteMany({ expiresIn: { $lt: new Date()}})
  }
}
