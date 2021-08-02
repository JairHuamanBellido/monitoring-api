/* eslint-disable prettier/prettier */
import { User } from '@domain/entity/user/User';
import { TypeOrmUser } from '@infrastructure/database/entity/user/TypeOrmUser';
import { TypeOrmAccountMapper } from '../account/TypeOrmAccountMapper';

export class TypeOrmUserMapper {
  public static toDomainEntity(ormUser: TypeOrmUser): User {
    const domainUser: User = new User({
      age:        ormUser.age,
      avatar:     ormUser.avatar,
      email:      ormUser.email,
      id:         ormUser.id,
      lastname:   ormUser.lastname,
      name:       ormUser.name,
      dni:        ormUser.dni,
      rol:        ormUser.rol,
      account:    ormUser.account !== undefined ?  TypeOrmAccountMapper.toDomainEntity(ormUser.account) : undefined,
      createdBy:  ormUser.createdBy,
      createdAt:  ormUser.createdAt,
      updatedBy:  ormUser.updatedBy,
      updatedAt:  ormUser.updatedAt,
      deletedBy:  ormUser.deletedBy,
      deletedAt:  ormUser.deletedAt
    });
    
    return domainUser;
  }

  public static toDomainEntities(ormUsers: TypeOrmUser[]): User[]{
    return ormUsers.map(ormUser => this.toDomainEntity(ormUser))
  }

  public static toOrmEntity(domainUser: User): TypeOrmUser {
    const ormUser: TypeOrmUser = {
      age:        domainUser.getAge(),
      avatar:     domainUser.getAvatar(),
      id:         domainUser.getId(),
      dni:        domainUser.getDni(),
      email:      domainUser.getEmail(),
      lastname:   domainUser.getLastname(),
      name:       domainUser.getName(),
      rol:        domainUser.getrol(),
      createdBy:  domainUser.getDni(),
      createdAt:  domainUser.getCreatedAt(),
      updatedBy:  domainUser.getUpdatedBy(),
      updatedAt:  domainUser.getUpdatedAt(),
      deletedBy:  domainUser.getDeletedBy(),
      deletedAt:  domainUser.getDeletedAt()
    };
    
    return ormUser;
  }
}
