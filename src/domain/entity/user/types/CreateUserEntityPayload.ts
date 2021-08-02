import { UserRole } from '@core/enums/UserRoleEnum';
import { Optional } from '@core/types/CommonTypes';
import { Account } from '@domain/entity/account/Account';

export type CreateUserEntityPayload = {
  id?: number;
  name: string;
  age: number;
  lastname: string;
  email: string;
  avatar: string;
  dni: string;
  rol: UserRole;
  account?: Optional<Account>;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deletedBy?: string;
  deletedAt?: Date;
};
