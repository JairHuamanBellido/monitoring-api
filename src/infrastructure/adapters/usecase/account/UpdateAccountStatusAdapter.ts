import { UpdateAccountStatusPort } from '@domain/port/account/usecase/UpdateAccountStatusPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class UpdateAccountStatusAdapter implements UpdateAccountStatusPort {
  @Expose()
  public accountId: number;

  @Expose()
  public executeBy: string;

  public static async new(payload: UpdateAccountStatusPort): Promise<UpdateAccountStatusAdapter> {
    const adapter: UpdateAccountStatusPort = plainToClass(UpdateAccountStatusAdapter, payload);

    return adapter;
  }
}
