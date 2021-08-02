import { UserRole } from '@core/enums/UserRoleEnum';

export interface UpdateUserEntityPayload {
  name?: string;
  age?: number;
  lastname?: string;
  avatar?: string;
  email?: string;
  rol?: UserRole;
  dni?: string;
  updatedBy: string;
}
