import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSocialRequestDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  platform: string;
}
