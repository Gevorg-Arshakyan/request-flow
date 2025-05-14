import { IsString, IsNotEmpty } from 'class-validator';

export class CompleteRequestDto {
  @IsString()
  @IsNotEmpty()
  solution: string;
}
