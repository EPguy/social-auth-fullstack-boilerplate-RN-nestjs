import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginSocialRequestDto } from './dto/login-social-request.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { IGetUserAuthInfoRequest } from '../common/interface/IGetUserAuthInfoRequest';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { User } from '../user/schemas/user.schema';
import { RefreshToken } from './schemas/refresh-token.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/social')
  async socialLogin(
    @Body() loginSocialRequest: LoginSocialRequestDto,
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
  ): Promise<RefreshToken> {
    const userId = req.user._id;
    return this.authService.logout(userId.toString(), res);
  }
}
