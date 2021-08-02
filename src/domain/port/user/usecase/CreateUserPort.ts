import { UserRole } from '@core/enums/UserRoleEnum';
import { FileStorage } from '@domain/entity/file/FileStorage';

export interface CreateUserPort {
  name: string;
  age: number;
  lastname: string;
  avatar: FileStorage;
  email: string;
  rol: UserRole;
  dni: string;
  username: string;
  password: string;
}
