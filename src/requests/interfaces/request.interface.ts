import { RequestStatus } from '../enums/request-status.enum';

export interface ICreateRequest {
  topic: string;
  content: string;
}

export interface ICompleteRequest {
  solution: string;
}

export interface ICancelRequest {
  cancellationReason: string;
}

export interface IFilterRequests {
  startDate?: string;
  endDate?: string;
}

export interface IRequest {
  id: number;
  topic: string;
  content: string;
  status: RequestStatus;
  solution?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
