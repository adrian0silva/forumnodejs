import { IsEnum, IsString } from 'class-validator';
import { Category } from '../category/category.enum';

export class CreateForumDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Category)
  category: Category;
}