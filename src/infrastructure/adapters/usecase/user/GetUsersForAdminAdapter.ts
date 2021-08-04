import { UserRole } from '@core/enums/UserRoleEnum';
import { GetUsersForAdminPort } from '@domain/port/user/usecase/GetUsersForAdminPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetUsersForAdminAdapter implements GetUsersForAdminPort {
  @Expose()
  public dni?: string;

  @Expose()
  public email?: string;

  @Expose()
  public id?: number;

  @Expose()
  public role?: UserRole;

  public static async new(payload: GetUsersForAdminPort): Promise<GetUsersForAdminAdapter> {
    const adapter: GetUsersForAdminAdapter = plainToClass(GetUsersForAdminAdapter, payload);

    return adapter;
  }
}
