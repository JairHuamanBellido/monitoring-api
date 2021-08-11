import { UseCase } from '@core/usecase/UseCase';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { UpdateAccountStatusPort } from '@domain/port/account/usecase/UpdateAccountStatusPort';

export type UpdateAccountStatusUseCase = UseCase<UpdateAccountStatusPort, WriteResourceUseCase>;
