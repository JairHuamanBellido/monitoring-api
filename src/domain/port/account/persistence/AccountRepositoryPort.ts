import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { Account } from '@domain/entity/account/Account';
import { FindAccountOptionsRepositoryDto } from './dto/FindAccountOptionsRepositoryDto';

export interface AccountRepositoryPort {
  createAccount(account: Account): Promise<WriteResourceUseCase>;

  findAccount(options: FindAccountOptionsRepositoryDto): Promise<Account>;

  updateAccount(account: Account): Promise<void>;
}
