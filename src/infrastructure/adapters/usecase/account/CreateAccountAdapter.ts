import { User } from '@domain/entity/user/User';
import { CreateAccountPort } from '@domain/port/account/usecase/CreateAccountPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';

@Exclude()
export class CreateAccountAdapter implements CreateAccountPort {
  @Expose()
  public password: string;
  @Expose()
  public user: User;
  @Expose()
  public username: string;

  public static async new(payload: CreateAccountPort): Promise<CreateAccountAdapter> {
    const adapter: CreateAccountPort = plainToClass(CreateAccountAdapter, payload);

    return adapter;
  }
}
