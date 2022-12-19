import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SocialAuth, SocialAuthSchema } from './schemas/social-auth.schema';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schemas/user.schema';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { AccessTokenStrategy } from './strategy/accessToken.strategy';
import { LocalAuth, LocalAuthSchema } from './schemas/local-auth.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SocialAuth.name, schema: SocialAuthSchema },
      { name: LocalAuth.name, schema: LocalAuthSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.ACCESS_TOKEN_SECRET,
        signOptions: {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
