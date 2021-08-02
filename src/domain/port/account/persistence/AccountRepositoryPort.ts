import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { Account } from '@domain/entity/account/Account';
import { User } from '@domain/entity/user/User';
import { FindAccountOptionsRepositoryDto } from './dto/FindAccountOptionsRepositoryDto';

export interface AccountRepositoryPort {
  createAccount(account: Account, user: User): Promise<WriteResourceUseCase>;

  findAccount(options: FindAccountOptionsRepositoryDto): Promise<Account>;
}
