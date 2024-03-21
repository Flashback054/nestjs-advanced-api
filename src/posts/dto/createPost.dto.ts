import { IsNotEmpty } from 'class-validator';

export default class CreatePostDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;
}
