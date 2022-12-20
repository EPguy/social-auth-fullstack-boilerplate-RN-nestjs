import { IsNotEmpty, IsString } from 'class-validator';

export class SigninSocialRequestDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  platform: string;
}
