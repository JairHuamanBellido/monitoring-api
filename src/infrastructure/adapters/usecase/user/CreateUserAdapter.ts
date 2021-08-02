import { UserRole } from '@core/enums/UserRoleEnum';
import { FileStorage } from '@domain/entity/file/FileStorage';
import { CreateUserPort } from '@domain/port/user/usecase/CreateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class CreateUserAdapter implements CreateUserPort {
  @Expose()
  public age: number;

  @Expose()
  public avatar: FileStorage;

  @Expose()
  public dni: string;

  @Expose()
  public email: string;

  @Expose()
  public lastname: string;

  @Expose()
  public name: string;

  @Expose()
  public rol: UserRole;

  @Expose()
  public password: string;

  @Expose()
  public username: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserPort = plainToClass(CreateUserAdapter, payload);

    return adapter;
  }
}
