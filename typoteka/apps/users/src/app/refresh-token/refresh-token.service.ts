import { Inject, Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenPayload } from '@typoteka/shared-types';
import { RefreshTokenEntity } from './refresh-token.entity';
import { jwtOptions } from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { ManipulateType } from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const count = +this.jwtConfig.refreshTokenExpiresIn.slice(0, -1);
    const unit  =  this.jwtConfig.refreshTokenExpiresIn.at(-1);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.refreshTokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(count, unit as ManipulateType).toDate()
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteByTokenId(tokenId)
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
