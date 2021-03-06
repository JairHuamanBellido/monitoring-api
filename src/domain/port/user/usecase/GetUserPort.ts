import { UserRole } from '@core/enums/UserRoleEnum';

export interface GetUserPort {
  dni?: string;
  email?: string;
  id?: number;
  role?: UserRole;
}
