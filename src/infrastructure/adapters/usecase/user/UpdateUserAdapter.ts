import { UserRole } from '@core/enums/UserRoleEnum';
import { UpdateUserPort } from '@domain/port/user/usecase/UpdateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UpdateUserAdapter implements UpdateUserPort {
  @Expose()
  public age: number;

  @Expose()
  public avatar: string;

  @Expose()
  public dni: string;

  @Expose()
  public email: string;

  @Expose()
  public id: number;

  @Expose()
  public lastname: string;

  @Expose()
  public name: string;

  @Expose()
  public rol: UserRole;

  @Expose()
  public updatedBy: string;

  public static async new(payload: UpdateUserPort): Promise<UpdateUserAdapter> {
    const adapter: UpdateUserAdapter = plainToClass(UpdateUserAdapter, payload);

    return adapter;
  }
}
