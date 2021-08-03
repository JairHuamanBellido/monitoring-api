import { UserRole } from '@core/enums/UserRoleEnum';
import { GetUsersByAdminPort } from '@domain/port/user/usecase/GetUsersByAdminPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetUsersByAdminAdapter implements GetUsersByAdminPort {
  @Expose()
  public dni?: string;

  @Expose()
  public email?: string;

  @Expose()
  public id?: number;

  @Expose()
  public role?: UserRole;

  public static async new(payload: GetUsersByAdminPort): Promise<GetUsersByAdminAdapter> {
    const adapter: GetUsersByAdminAdapter = plainToClass(GetUsersByAdminAdapter, payload);

    return adapter;
  }
}
