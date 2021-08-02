/* eslint-disable prettier/prettier */
import { TypeormAccount } from '@infrastructure/database/entity/account/TypeOrmAccount';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { TypeOrmAccountMapper } from '@infrastructure/database/mappers/account/TypeOrmAccountMapper';
import { Account } from '@domain/entity/account/Account';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { User } from '@domain/entity/user/User';
import { FindAccountOptionsRepositoryDto } from '@domain/port/account/persistence/dto/FindAccountOptionsRepositoryDto';

type AccountQueryBuilder = SelectQueryBuilder<TypeormAccount>;


@EntityRepository(TypeormAccount)
export abstract class TypeormAccountRepositoryAdapter
  extends Repository<TypeormAccount>
  implements AccountRepositoryPort
{
  private readonly accountAlias: string = 'account';

  public async createAccount(domainAccount: Account, domainUser: User): Promise<WriteResourceUseCase> {
    const ormAccount: TypeormAccount = TypeOrmAccountMapper.toOrmEntity(domainAccount,domainUser);

    await this.createQueryBuilder(this.accountAlias)
      .insert()
      .into(TypeormAccount)
      .values([ormAccount])
      .execute();

    return { message: 'Se ha creado con exito la cuenta' };
  }

  public async findAccount(payload: FindAccountOptionsRepositoryDto): Promise<Account> {

    let domainAccount:Account;

    const query: AccountQueryBuilder = this.buildAccountQueryBuilder();
    
    const ormAccount: TypeormAccount = await query
      .andWhere(`"${this.accountAlias}".username = :username`, {username: payload.username})
      .getOne();

    if (ormAccount) {
      domainAccount = TypeOrmAccountMapper.toDomainEntity(ormAccount)
    }

    return domainAccount
  }

  /** Private functions*/
  private buildAccountQueryBuilder(): AccountQueryBuilder {
    return this.createQueryBuilder(this.accountAlias).select().where(`"${this.accountAlias}".is_active = true`);
  }
}
