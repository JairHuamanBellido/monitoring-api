/* eslint-disable prettier/prettier */
import { TypeormAccount } from '@infrastructure/database/entity/account/TypeOrmAccount';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { WriteResourceUseCase } from '@core/usecase/WriteResourceUseCase';
import { TypeOrmAccountMapper } from '@infrastructure/database/mappers/account/TypeOrmAccountMapper';
import { Account } from '@domain/entity/account/Account';
import { AccountRepositoryPort } from '@domain/port/account/persistence/AccountRepositoryPort';
import { FindAccountOptionsRepositoryDto } from '@domain/port/account/persistence/dto/FindAccountOptionsRepositoryDto';

type AccountQueryBuilder = SelectQueryBuilder<TypeormAccount>;

@EntityRepository(TypeormAccount)
export abstract class TypeormAccountRepositoryAdapter
  extends Repository<TypeormAccount>
  implements AccountRepositoryPort
{
  private readonly accountAlias: string = 'account';

  public async createAccount(domainAccount: Account): Promise<WriteResourceUseCase> {
    const ormAccount: TypeormAccount = TypeOrmAccountMapper.toOrmEntity(domainAccount);

    await this.createQueryBuilder(this.accountAlias).insert().into(TypeormAccount).values([ormAccount]).execute();

    return { message: 'Se ha creado con exito la cuenta' };
  }

  public async findAccount(payload: FindAccountOptionsRepositoryDto): Promise<Account> {
    let domainAccount: Account;

    const query: AccountQueryBuilder = this.buildAccountQueryBuilder();
    this.extendQueryWithByProperties(payload, query);

    const ormAccount: TypeormAccount = await query.getOne();

    if (ormAccount) {
      domainAccount = TypeOrmAccountMapper.toDomainEntity(ormAccount);
    }

    return domainAccount;
  }

  public async updateAccount(domainAccount: Account): Promise<void> {
    const ormAccount: TypeormAccount = TypeOrmAccountMapper.toOrmEntity(domainAccount);

    await this.createQueryBuilder(this.accountAlias)
      .update(TypeormAccount)
      .set(ormAccount)
      .where('id = :id', { id: domainAccount.getId() })
      .execute();
  }

  /** Private functions*/
  private buildAccountQueryBuilder(): AccountQueryBuilder {
    return this.createQueryBuilder(this.accountAlias).select().where(`"${this.accountAlias}".is_active = true`);
  }

  private extendQueryWithByProperties(by: FindAccountOptionsRepositoryDto, query: AccountQueryBuilder) {
    if (by.id) {
      query.andWhere(`"${this.accountAlias}".id = :id`, { id: by.id });
    }
    if (by.username) {
      query.andWhere(`"${this.accountAlias}".username = :username`, { username: by.username });
    }
    if (by.password) {
      query.andWhere(`"${this.accountAlias}".password = :password`, { password: by.password });
    }
  }
}
