import { GetUserPort } from '@domain/port/user/usecase/GetUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class GetUserAdapter implements GetUserPort {
  @Expose()
  public dni: string;

  public static async new(payload: GetUserPort): Promise<GetUserAdapter> {
    const adapter: GetUserAdapter = plainToClass(GetUserAdapter, payload);

    return adapter;
  }
}
