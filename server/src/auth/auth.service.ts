import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninSocialRequestDto } from './dto/signin-social-request.dto';
import axios from 'axios';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { SocialAuth, SocialAuthDocument } from './schemas/social-auth.schema';
import { UserService } from '../user/user.service';
import { TokenResponseDto } from './dto/token-response.dto';
import { hash, compare } from 'bcrypt';
import {
  RefreshToken,
  RefreshTokenDoucment,
} from './schemas/refresh-token.schema';
import { LocalAuth, LocalAuthDocument } from './schemas/local-auth.schema';
import { SignupLocalRequestDto } from './dto/signup-local-request.dto';
import { SigninLocalRequestDto } from './dto/signin-local-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SocialAuth.name)
    private readonly socialAuthModel: Model<SocialAuthDocument>,
    @InjectModel(LocalAuth.name)
    private readonly localAuthModel: Model<LocalAuthDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDoucment>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async localSingup(
    signupLocalRequestDto: SignupLocalRequestDto,
    res,
  ): Promise<{ accessToken: string }> {
    let localAuth: LocalAuth = await this.localAuthModel.findOne({
      id: signupLocalRequestDto.id,
    });

    if (localAuth) {
      throw new HttpException(
        '이미 존재하는 아이디입니다.',
        HttpStatus.CONFLICT,
      );
    }

    localAuth = await this.createLocalAuth(signupLocalRequestDto);

    const { accessToken, refreshToken } = await this.getTokens(
      localAuth.user._id.toString(),
    );

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE) * 1000,
    });

    return {
      accessToken,
    };
  }

  async localSignin(
    signinLocalRequestDto: SigninLocalRequestDto,
    res,
  ): Promise<{ accessToken: string }> {
    const localAuth: LocalAuth = await this.localAuthModel.findOne({
      id: signinLocalRequestDto.id,
    });

    if (!localAuth) {
      throw new HttpException(
        '아이디가 일치하지 않습니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!(await compare(signinLocalRequestDto.password, localAuth.password))) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { accessToken, refreshToken } = await this.getTokens(
      localAuth.user._id.toString(),
    );

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE) * 1000,
    });

    return {
      accessToken,
    };
  }

  async socialLogin(
    loginSocialRequest: SigninSocialRequestDto,
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

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_EXPIRE) * 1000,
    });

    return {
      accessToken,
    };
  }

  async logout(userId: string, res): Promise<boolean> {
    res.clearCookie('refresh_token', {
      path: '/auth',
      httpOnly: true,
    });
    const user = await this.userService.findById({ _id: userId });
    await this.refreshTokenModel.findByIdAndUpdate(
      user.refreshToken._id,
      { refreshToken: null },
      { new: true },
    );
    return true;
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

  protected async getUserByKakaoAccessToken(
    accessToken: string,
  ): Promise<string> {
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

  protected async createLocalAuth(
    signupLocalRequestDto: SignupLocalRequestDto,
  ): Promise<LocalAuth> {
    const hashedPassword = await hash(signupLocalRequestDto.password, 10);
    const refreshToken = await this.refreshTokenModel.create({});
    const user = await this.userService.create({
      refreshToken: refreshToken._id,
    });
    return this.localAuthModel.create({
      user: user._id,
      id: signupLocalRequestDto.id,
      password: hashedPassword,
    });
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

    const user = await this.userService.findById({ _id: userId });
    await this.updateRefreshToken(user.refreshToken._id, refreshToken);

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
