import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { IGetUserAuthInfoRequest } from '../common/interface/IGetUserAuthInfoRequest';
import { UserService } from './user.service';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUser(@Req() req: IGetUserAuthInfoRequest): Promise<User> {
    return req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Put('/nickname')
  async updateNickname(
    @Req() req: IGetUserAuthInfoRequest,
    @Body() params: { nickname: string },
  ): Promise<User> {
    const userId = req.user._id.toString();
    return this.userService.update(userId, {
      nickname: params.nickname,
    });
  }
}
