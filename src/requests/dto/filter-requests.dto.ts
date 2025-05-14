import { IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterRequestsDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
} 