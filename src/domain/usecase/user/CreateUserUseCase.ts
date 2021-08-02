import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { UseCase } from '@core/usecase/UseCase';
import { CreateUserPort } from '@domain/port/user/usecase/CreateUserPort';

export type CreateUserUseCase = UseCase<CreateUserPort, WriteResourceUseCase>;
