import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// 3h16ms25ss
export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
