import { IsNotEmpty, IsString } from 'class-validator';

export class SignupLocalRequestDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
