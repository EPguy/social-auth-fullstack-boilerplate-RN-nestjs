import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SigninSocialRequestDto } from './dto/signin-social-request.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { IGetUserAuthInfoRequest } from '../common/interface/IGetUserAuthInfoRequest';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { RefreshToken } from './schemas/refresh-token.schema';
import { SignupLocalRequestDto } from './dto/signup-local-request.dto';
import { SigninLocalRequestDto } from './dto/signin-local-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signupRequestDto: SignupLocalRequestDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    return this.authService.localSingup(signupRequestDto, res);
  }
  @Post('signin')
  async signin(
    @Body() signinLocalRequestDto: SigninLocalRequestDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    return this.authService.localSignin(signinLocalRequestDto, res);
  }

  @Post('signin/social')
  async socialSignin(
    @Body() loginSocialRequest: SigninSocialRequestDto,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    return this.authService.socialLogin(loginSocialRequest, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Req() req: IGetUserAuthInfoRequest,
    @Res({ passthrough: true }) res,
  ): Promise<{ accessToken: string }> {
    const userId = req.user._id;
    return this.authService.refreshTokens(userId.toString(), res);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(
    @Req() req: IGetUserAuthInfoRequest,
    @Res({ passthrough: true }) res,
  ): Promise<boolean> {
    const userId = req.user._id;
    return this.authService.logout(userId.toString(), res);
  }
}
