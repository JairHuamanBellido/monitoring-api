import { User } from '@domain/entity/user/User';

export interface CreateAccountPort {
  username: string;
  password: string;
  user: User;
}
