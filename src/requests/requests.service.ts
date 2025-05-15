import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Request } from './entities/request.entity';
import { RequestStatus } from './enums/request-status.enum';
import {
  ICreateRequest,
  ICompleteRequest,
  ICancelRequest,
  IFilterRequests,
  IRequest,
} from './interfaces/request.interface';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  async create(createRequest: ICreateRequest): Promise<IRequest> {
    const request = this.requestsRepository.create(createRequest);
    return await this.requestsRepository.save(request);
  }

  async takeInProgress(id: number): Promise<IRequest> {
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
    completeRequest: ICompleteRequest,
  ): Promise<IRequest> {
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
    request.solution = completeRequest.solution;
    return await this.requestsRepository.save(request);
  }

  async cancel(id: number, cancelRequest: ICancelRequest): Promise<IRequest> {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    if (request.status === RequestStatus.COMPLETED) {
      throw new BadRequestException('Completed requests cannot be cancelled');
    }
    request.status = RequestStatus.CANCELLED;
    request.cancellationReason = cancelRequest.cancellationReason;
    return await this.requestsRepository.save(request);
  }

  async findAll(filter: IFilterRequests): Promise<IRequest[]> {
    const { startDate, endDate } = filter;
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
