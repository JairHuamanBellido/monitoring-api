import { UseCase } from '@core/usecase/UseCase';
import { GetUsersForAdminPort } from '@domain/port/user/usecase/GetUsersForAdminPort';
import { UsersForAdminUseCaseDto } from './dto/UserForAdminUseCaseDto';

export type GetUsersForAdminUseCase = UseCase<GetUsersForAdminPort, UsersForAdminUseCaseDto[]>;
