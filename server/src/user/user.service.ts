import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import {
  RefreshToken,
  RefreshTokenDoucment,
} from '../auth/schemas/refresh-token.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshTokenDoucment>,
  ) {}
  async create(userCreateDto: UserCreateDto): Promise<User> {
    return this.userModel.create(userCreateDto);
  }

  async update(_id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(_id, userUpdateDto, { new: true })
      .exec();
  }

  async findById(params: { _id: string }): Promise<User> {
    return this.userModel.findOne(params);
  }

  async findByIdWithRefreshToken(params: { _id: string }): Promise<User> {
    return this.userModel.findOne(params).populate('refreshToken');
  }
}
