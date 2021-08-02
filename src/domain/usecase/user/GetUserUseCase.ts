import { UseCase } from '@core/usecase/UseCase';
import { GetUserPort } from '@domain/port/user/usecase/GetUserPort';
import { UserUseCaseDto } from './dto/UserUseCaseDto';

export type GetUserUseCase = UseCase<GetUserPort, UserUseCaseDto>;
