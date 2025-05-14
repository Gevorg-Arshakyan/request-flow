import { IsString, IsNotEmpty } from 'class-validator';
import { ICompleteRequest } from '../interfaces/request.interface';

export class CompleteRequestDto implements ICompleteRequest {
  @IsString()
  @IsNotEmpty()
  solution: string;
}
