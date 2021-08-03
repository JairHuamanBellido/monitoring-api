/* eslint-disable prettier/prettier */
import { User } from '@domain/entity/user/User';
import { FindUserOptionsRepositoryDto } from '@domain/port/user/persistence/dto/FindUserOptionsRepositoryDto';
import { UserRepositoryPort } from '@domain/port/user/persistence/UserRepositoryPort';
import { TypeOrmUser } from '@infrastructure/database/entity/user/TypeOrmUser';
import { TypeOrmUserMapper } from '@infrastructure/database/mappers/user/TypeOrmUserMapper';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

// Types
type UserQueryBuilder = SelectQueryBuilder<TypeOrmUser>;


@EntityRepository(TypeOrmUser)
export abstract class TypeOrmUserRepositoryAdapter extends Repository<TypeOrmUser> implements UserRepositoryPort {
  private readonly userAlias: string = 'user';

  public async findAllUsersByAdmin(by?: FindUserOptionsRepositoryDto): Promise<any> {
    const query: UserQueryBuilder = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEntities: TypeOrmUser[] = await query.leftJoinAndSelect("user.account","account").getMany()
    
    const domainsUsers: User[] = TypeOrmUserMapper.toDomainEntities(ormEntities);
    
    return domainsUsers;
  }

  public async findUser(by: FindUserOptionsRepositoryDto): Promise<User> {
    let domainEntity: User;

    const query: UserQueryBuilder = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    const ormEntity: TypeOrmUser = await query.leftJoinAndSelect('user.account', 'account').getOne();

    if (ormEntity) {
      domainEntity = TypeOrmUserMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  public async createUser(domainUser: User): Promise<User> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(domainUser);

    const insertQuery = await this.createQueryBuilder(this.userAlias)
      .insert()
      .into(TypeOrmUser)
      .values([ormUser])
      .execute();

    const query: UserQueryBuilder = this.buildUserQueryBuilder();
    
    this.extendQueryWithByProperties({ id: insertQuery.identifiers[0].id as number }, query);

    const ormEntity: TypeOrmUser = await query.getOne();

    return TypeOrmUserMapper.toDomainEntity(ormEntity);
  }

  public async updateUser(domainUser: User): Promise<void> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(domainUser);

    await this.createQueryBuilder(this.userAlias)
      .update(TypeOrmUser)
      .set(ormUser)
      .where('id = :id', { id: ormUser.id })
      .execute();
  }

  /** Private functions*/
  private buildUserQueryBuilder(): UserQueryBuilder {
    return this.createQueryBuilder(this.userAlias).select().where(`"${this.userAlias}".is_active = true`);
  }

  private extendQueryWithByProperties(by: FindUserOptionsRepositoryDto, query: UserQueryBuilder) {
    if (by.dni && by.email) {
      query.andWhere(`("${this.userAlias}".dni = :dni or "${this.userAlias}".email = :email)`, {
        dni: by.dni,
        email: by.email,
      });
    } else {
      if (by.id) {
        query.andWhere(`"${this.userAlias}".id = :id`, { id: by.id });
      }

      if (by.dni) {
        query.andWhere(`"${this.userAlias}".dni = :dni`, { dni: by.dni });
      }

      if (by.email) {
        query.andWhere(`"${this.userAlias}".email = :email`, { email: by.email });
      }

      if (by.role) {
        query.andWhere(`"${this.userAlias}".rol = :rol`, { rol: by.role });
      }
    }
  }
}
