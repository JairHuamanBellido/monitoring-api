/* eslint-disable prettier/prettier */
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { Account } from '@domain/entity/account/Account';
import { CreateAccountPort } from '@domain/port/account/usecase/CreateAccountPort';
import { AccountRepositoryPort } from '../../port/account/persistence/AccountRepositoryPort';
import { CreateAccountUserCase } from '../../usecase/account/CreateAccountUseCase';

export class CreateAccountService implements CreateAccountUserCase {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}

  public async execute(payload: CreateAccountPort): Promise<WriteResourceUseCase> {
    const account: Account = new Account({
      isBlocked : false,
      password  : payload.password,
      username  : payload.username,
      createdAt : new Date(),
      createdBy : payload.user.getDni(),
    });

    return await this.accountRepository.createAccount(account, payload.user);
  }
}
