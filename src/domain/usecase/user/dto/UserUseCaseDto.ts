/* eslint-disable prettier/prettier */
import { Optional } from '@core/types/CommonTypes';
import { User } from '@domain/entity/user/User';
import { AccountUseCaseDto } from '@domain/usecase/account/dto/AccountUseCaseDto';
import { Exclude, Expose, plainToClass, Type } from 'class-transformer';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public lastname: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  @Type(() => AccountUseCaseDto)
  public account: AccountUseCaseDto;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToClass(UserUseCaseDto, user);    
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
