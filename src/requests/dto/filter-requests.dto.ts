import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { IFilterRequests } from '../interfaces/request.interface';

export class FilterRequestsDto implements IFilterRequests {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
} 