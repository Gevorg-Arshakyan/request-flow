import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { CompleteRequestDto } from './dto/complete-request.dto';
import { CancelRequestDto } from './dto/cancel-request.dto';
import { FilterRequestsDto } from './dto/filter-requests.dto';
import { Request } from './entities/request.entity';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestsService.create(createRequestDto);
  }

  @Put(':id/take-in-progress')
  takeInProgress(@Param('id') id: string): Promise<Request> {
    return this.requestsService.takeInProgress(+id);
  }

  @Put(':id/complete')
  complete(
    @Param('id') id: string,
    @Body() completeRequestDto: CompleteRequestDto,
  ): Promise<Request> {
    return this.requestsService.complete(+id, completeRequestDto);
  }

  @Put(':id/cancel')
  cancel(
    @Param('id') id: string,
    @Body() cancelRequestDto: CancelRequestDto,
  ): Promise<Request> {
    return this.requestsService.cancel(+id, cancelRequestDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterRequestsDto): Promise<Request[]> {
    return this.requestsService.findAll(filterDto);
  }

  @Post('cancel-all-in-progress')
  cancelAllInProgress(): Promise<void> {
    return this.requestsService.cancelAllInProgress();
  }
}
