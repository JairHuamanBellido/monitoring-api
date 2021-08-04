import { UserRole } from '@core/enums/UserRoleEnum';

export interface GetUsersForAdminPort {
  dni?: string;
  email?: string;
  id?: number;
  role?: UserRole;
}
