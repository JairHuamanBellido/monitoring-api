import { User } from '@domain/entity/user/User';
import { FindUserOptionsRepositoryDto } from './dto/FindUserOptionsRepositoryDto';

export interface UserRepositoryPort {
  findAllUsersForAdmin(by?: FindUserOptionsRepositoryDto): Promise<User[]>;

  findUser(by: FindUserOptionsRepositoryDto): Promise<User>;

  createUser(user: User): Promise<User>;

  updateUser(user: User): Promise<void>;
}
