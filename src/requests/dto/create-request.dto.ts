import { IsString, IsNotEmpty } from 'class-validator';
import { ICreateRequest } from '../interfaces/request.interface';

export class CreateRequestDto implements ICreateRequest {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
