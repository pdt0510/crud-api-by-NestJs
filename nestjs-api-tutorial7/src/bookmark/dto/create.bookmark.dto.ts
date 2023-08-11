import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// 3h16ms25ss
export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
