import { randomUUID } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CommandEvent, RefreshTokenPayload, TokenPayload, User, UserRole } from '@typoteka/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { RABBITMQ_SERVICE } from './auth.constant';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigType } from '@nestjs/config';
import { jwtOptions } from '../../config/jwt.config';
import {
  UserNotFoundException,
  UserExistsException,
  UserNotRegisteredException,
  UserPasswordWrongException
} from './exceptions';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
    @Inject (jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {}

  async register(dto: CreateUserDto) {
    const {email, firstname, lastname, password, dateBirth} = dto;
    const blogUser = {
      email, firstname, lastname, role: UserRole.User,
      avatar: '', dateBirth: dayjs(dateBirth).toDate(),
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new UserExistsException(email);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password);

    const createdUser = await this.blogUserRepository
      .create(userEntity);


    this.rabbitClient.emit(
      { cmd: CommandEvent.AddSubscriber },
      {
        email: createdUser.email,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        userId: createdUser._id.toString(),
      }
    );

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const blogUserEntity = new BlogUserEntity(existUser);
    if (! await blogUserEntity.comparePassword(password)) {
      throw new UserPasswordWrongException();
    }

    return blogUserEntity.toObject();
  }

  async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    if (! existUser) {
      throw new UserNotFoundException(id);
    }

    return existUser;
  }

   async loginUser(user: Pick<User, '_id' | 'email' | 'role' | 'lastname' | 'firstname'>, refreshTokenId?: string) {
    const payload: TokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      lastname: user.lastname,
      firstname: user.firstname
    };

    await this.refreshTokenService
       .deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
        ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService
        .createRefreshSession(refreshTokenPayload);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      })
    };
  }
}
