import { UseCase } from '@core/usecase/UseCase';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { UpdateUserPort } from '@domain/port/user/usecase/UpdateUserPort';

export type UpdateUserUseCase = UseCase<UpdateUserPort, WriteResourceUseCase>;
