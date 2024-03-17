import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export default class UpdatePostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsString()
  title: string;
}
