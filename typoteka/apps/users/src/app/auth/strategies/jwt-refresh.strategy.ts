import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { jwtOptions } from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { RefreshTokenPayload } from '@typoteka/shared-types';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: RefreshTokenPayload) {
    if (! await this.refreshTokenService.isExists(payload.refreshTokenId)) {
      throw new TokenNotExistsException(payload.refreshTokenId);
    }

    return payload;
  }
}
