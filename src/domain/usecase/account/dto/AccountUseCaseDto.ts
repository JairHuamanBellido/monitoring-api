import { Account } from '@domain/entity/account/Account';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class AccountUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public username: string;

  public password: string;

  public isBlocked: boolean;

  public static newFromAccount(account: Account): AccountUseCaseDto {
    return plainToClass(AccountUseCaseDto, account);
  }
}
