/* eslint-disable prettier/prettier */
import { Account } from '@domain/entity/account/Account';
import { TypeormAccount } from '@infrastructure/database/entity/account/TypeOrmAccount';

export class TypeOrmAccountMapper {
  public static toDomainEntity(ormAccount: TypeormAccount): Account {
    const domainAccount: Account = new Account({
      id:           ormAccount.id,
      isBlocked:    ormAccount.isBlocked,
      password:     ormAccount.password,
      username:     ormAccount.username,
      createdBy:    ormAccount.createdBy,
      createdAt:    ormAccount.createdAt,
      updatedBy:    ormAccount.updatedBy,
      updatedAt:    ormAccount.updatedAt,
      deletedBy:    ormAccount.deletedBy,
      deletedAt:    ormAccount.deletedAt,
      userId:       ormAccount.user_id

    });

    return domainAccount;
  }

  public static toOrmEntity(domainAccount: Account): TypeormAccount {
    const ormAccount: TypeormAccount = {
      password:     domainAccount.getPassword(),
      username:     domainAccount.getUsername(),
      id:           domainAccount.getId(),
      isBlocked:    domainAccount.getIsBlocked(),
      createdBy:    domainAccount.getCreatedBy(),
      createdAt:    domainAccount.getCreatedAt(),
      updatedBy:    domainAccount.getUpdatedBy(),
      updatedAt:    domainAccount.getUpdatedAt(),
      deletedBy:    domainAccount.getDeletedBy(),
      deletedAt:    domainAccount.getDeletedAt(),
      user_id:       domainAccount.getUserId()
    };
    return ormAccount;
  }
}
