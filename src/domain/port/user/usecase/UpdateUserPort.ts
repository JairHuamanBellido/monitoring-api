import { UserRole } from '@core/enums/UserRoleEnum';

export interface UpdateUserPort {
  id: number;
  updatedBy: string;
  name?: string;
  age?: number;
  lastname?: string;
  avatar?: string;
  email?: string;
  rol?: UserRole;
  dni?: string;
}
