import { UseCase } from '@core/usecase/UseCase';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { CreateAccountPort } from '@domain/port/account/usecase/CreateAccountPort';

export type CreateAccountUserCase = UseCase<CreateAccountPort, WriteResourceUseCase>;
