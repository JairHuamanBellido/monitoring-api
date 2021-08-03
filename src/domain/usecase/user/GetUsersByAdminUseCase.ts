import { UseCase } from '@core/usecase/UseCase';
import { GetUsersByAdminPort } from '@domain/port/user/usecase/GetUsersByAdminPort';
import { UserUseCaseDto } from './dto/UserUseCaseDto';

export type GetUsersByAdminUseCase = UseCase<GetUsersByAdminPort, UserUseCaseDto[]>;
