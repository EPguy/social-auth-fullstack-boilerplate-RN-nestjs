import { IsNotEmpty, IsString } from 'class-validator';

export class SigninLocalRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
