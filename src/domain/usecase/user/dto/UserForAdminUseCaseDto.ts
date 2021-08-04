import { User } from '@domain/entity/user/User';
import { AccountUseCaseDto } from '@domain/usecase/account/dto/AccountUseCaseDto';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';

@Exclude()
export class UsersForAdminUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public lastname: string;

  @Expose()
  public dni: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  @Type(() => AccountUseCaseDto)
  public account: AccountUseCaseDto;

  public static newFromUserForAdmin(user: User): UsersForAdminUseCaseDto {
    return plainToClass(UsersForAdminUseCaseDto, user);
  }

  public static newListFromUsersForAdmin(users: User[]): UsersForAdminUseCaseDto[] {
    return users.map((user) => this.newFromUserForAdmin(user));
  }
}
