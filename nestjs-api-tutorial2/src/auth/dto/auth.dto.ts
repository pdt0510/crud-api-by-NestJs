import {
  IsEmail,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsString,
} from 'class-validator';

//auth-2, 57ms40ss
export class authDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // 1h00ms33ss
  @IsString()
  id: number;
}
