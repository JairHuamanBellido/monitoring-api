import { UserRole } from '@core/enums/UserRoleEnum';

export interface GetUsersByAdminPort {
  dni?: string;
  email?: string;
  id?: number;
  role?: UserRole;
}
