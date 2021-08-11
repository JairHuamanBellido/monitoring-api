import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { Account } from '@domain/entity/account/Account';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { UpdateAccountStatusPort } from '@domain/port/account/usecase/UpdateAccountStatusPort';
import { UpdateAccountStatusUseCase } from '@domain/usecase/account/UpdateAccountStatusUseCase';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateAccountStatusService implements UpdateAccountStatusUseCase {
  constructor(private readonly accountRepository: AccountRepositoryPort) {}
  public async execute(port: UpdateAccountStatusPort): Promise<WriteResourceUseCase> {
    const account: Account = await this.accountRepository.findAccount({ id: port.accountId });

    if (!account) {
      throw new HttpException({ message: 'Entity not found', code: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
    }

    account.edit({
      isBlocked: !account.getIsBlocked(),
      updatedBy: port.executeBy,
    });

    await this.accountRepository.updateAccount(account);

    return { message: 'actualizado' };
  }
}
