import { UserRole } from '@core/enums/UserRoleEnum';
import { GetUserPort } from '@domain/port/user/usecase/GetUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetUserAdapter implements GetUserPort {
  @Expose()
  public dni?: string;

  @Expose()
  public email?: string;

  @Expose()
  public id?: number;

  @Expose()
  public role?: UserRole;

  public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToClass(GetUserAdapter, payload);

    return adapter;
  }
}
