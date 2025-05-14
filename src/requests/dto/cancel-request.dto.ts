import { IsString, IsNotEmpty } from 'class-validator';
import { ICancelRequest } from '../interfaces/request.interface';

export class CancelRequestDto implements ICancelRequest {
  @IsString()
  @IsNotEmpty()
  cancellationReason: string;
}
