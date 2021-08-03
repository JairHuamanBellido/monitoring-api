import { UserRole } from '@core/enums/UserRoleEnum';

export interface FindUserOptionsRepositoryDto {
  id?: number;
  email?: string;
  dni?: string;
  role?: UserRole;
}
