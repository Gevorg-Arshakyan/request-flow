import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Request, RequestStatus } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { CompleteRequestDto } from './dto/complete-request.dto';
import { CancelRequestDto } from './dto/cancel-request.dto';
import { FilterRequestsDto } from './dto/filter-requests.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestsRepository.create(createRequestDto);
    return await this.requestsRepository.save(request);
  }

  async takeInProgress(id: number): Promise<Request> {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    if (request.status !== RequestStatus.NEW) {
      throw new BadRequestException(
        'Only new requests can be taken in progress',
      );
    }
    request.status = RequestStatus.IN_PROGRESS;
    return await this.requestsRepository.save(request);
  }

  async complete(
    id: number,
    completeRequestDto: CompleteRequestDto,
  ): Promise<Request> {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    if (request.status !== RequestStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Only in-progress requests can be completed',
      );
    }
    request.status = RequestStatus.COMPLETED;
    request.solution = completeRequestDto.solution;
    return await this.requestsRepository.save(request);
  }

  async cancel(
    id: number,
    cancelRequestDto: CancelRequestDto,
  ): Promise<Request> {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    if (request.status === RequestStatus.COMPLETED) {
      throw new BadRequestException('Completed requests cannot be cancelled');
    }
    request.status = RequestStatus.CANCELLED;
    request.cancellationReason = cancelRequestDto.cancellationReason;
    return await this.requestsRepository.save(request);
  }

  async findAll(filterDto: FilterRequestsDto): Promise<Request[]> {
    const { startDate, endDate } = filterDto;
    const where: any = {};

    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = Between(new Date(startDate), new Date());
    }

    return await this.requestsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async cancelAllInProgress(): Promise<void> {
    await this.requestsRepository.update(
      { status: RequestStatus.IN_PROGRESS },
      {
        status: RequestStatus.CANCELLED,
        cancellationReason: 'Cancelled by system',
      },
    );
  }
}
