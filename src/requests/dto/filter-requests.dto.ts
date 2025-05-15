import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { IFilterRequests } from '../interfaces/request.interface';

export class FilterRequestsDto implements IFilterRequests {
  // ISO date string   -- 2025-05-14T21:06:09%2B00:00

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
