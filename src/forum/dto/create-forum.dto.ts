import { IsString } from 'class-validator';

export class CreateForumDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}