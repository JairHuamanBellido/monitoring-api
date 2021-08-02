/* eslint-disable prettier/prettier */
import { Account } from '@domain/entity/account/Account';
import { User } from '@domain/entity/user/User';
import { TypeormAccount } from '@infrastructure/database/entity/account/TypeOrmAccount';
import { TypeOrmUserMapper } from '../user/TypeOrmUserMapper';

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
    });

    return domainAccount;
  }

  public static toOrmEntity(domainAccount: Account, userDomain: User): TypeormAccount {
    const ormAccount: TypeormAccount = {
      password:     domainAccount.getPassword(),
      user:         TypeOrmUserMapper.toOrmEntity(userDomain),
      username:     domainAccount.getUsername(),
      id:           domainAccount.getId(),
      createdBy:    userDomain.getDni(),
      createdAt:    domainAccount.getCreatedAt(),
      updatedBy:    domainAccount.getUpdatedBy(),
      updatedAt:    domainAccount.getUpdatedAt(),
      deletedBy:    domainAccount.getDeletedBy(),
      deletedAt:    domainAccount.getDeletedAt(),
    };
    return ormAccount;
  }
}
