import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginSocialRequestDto } from './dto/login-social-request.dto';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { SocialAuth, SocialAuthDocument } from './schemas/social-auth.schema';
import { UserService } from '../user/user.service';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from '../user/schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenDoucment,
} from './schemas/refresh-token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SocialAuth.name)
    private readonly socialAuthModel: Model<SocialAuthDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDoucment>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async socialLogin(
    loginSocialRequest: LoginSocialRequestDto,
    res,
  ): Promise<{ accessToken: string }> {
    let userId;
    switch (loginSocialRequest.platform) {
      case 'kakao': {
        userId = await this.getUserByKakaoAccessToken(
          loginSocialRequest.accessToken,
        );
        break;
      }
      default: {
        throw new HttpException(
          '잘못된 소셜 로그인 플랫폼입니다.',
          HttpStatus.BAD_REQUEST,
        );
        break;
      }
    }

    const { accessToken, refreshToken } = await this.getTokens(userId);

    const user = await this.userService.findById({ _id: userId });
    await this.updateRefreshToken(user.refreshToken._id, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE) * 1000,
    });

    return {
      accessToken,
    };
  }

  async getUserByKakaoAccessToken(accessToken: string): Promise<string> {
    const kakaoInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!kakaoInfo) {
      throw new HttpException(
        '카카오 간편 로그인에 실패하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const socalAuth = await this.socialAuthModel.findOne({
      snsServiceId: kakaoInfo.data.id,
    });
    if (!socalAuth) {
      const refreshToken = await this.refreshTokenModel.create({});
      const user = await this.userService.create({
        refreshToken: refreshToken._id,
      });
      await this.socialAuthModel.create({
        user: user._id,
        snsServiceId: kakaoInfo.data.id,
        platform: 'kakao',
      });
      return user._id.toString();
    }
    return socalAuth.user._id.toString();
  }

  async logout(userId: string, res): Promise<RefreshToken> {
    res.clearCookie('refresh_token', {
      path: '/auth',
      httpOnly: true,
    });
    const user = await this.userService.findById({ _id: userId });
    return this.refreshTokenModel.findByIdAndUpdate(
      user.refreshToken._id,
      { refreshToken: null },
      { new: true },
    );
  }

  async refreshTokens(userId: string, res): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.getTokens(userId);
    const user = await this.userService.findById({ _id: userId });
    await this.updateRefreshToken(user.refreshToken._id, refreshToken);
    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE) * 1000,
    });
    return { accessToken };
  }

  protected async getTokens(userId: string): Promise<TokenResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id: userId },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}s`,
        },
      ),
      this.jwtService.signAsync(
        { _id: userId },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE}s`,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  protected async updateRefreshToken(
    refreshTokenId: string,
    refreshToken: string,
  ) {
    await this.refreshTokenModel.findByIdAndUpdate(refreshTokenId, {
      refreshToken,
    });
  }
}
