import { UserRole } from '@core/enums/UserRoleEnum';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpRequestWithUser } from '../type/HttpAuthType';

@Injectable()
export class HttpRoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: UserRole[] =
      this.reflector.get<UserRole[]>('roles', context.getHandler()) || [];
    const request: HttpRequestWithUser = context.switchToHttp().getRequest();

    const user = request.user;

    const canActivate = roles.includes(user.role);

    if (!canActivate) {
      throw new HttpException(
        { message: 'No tiene permisos', code: HttpStatus.FORBIDDEN },
        HttpStatus.FORBIDDEN,
      );
    }

    return canActivate;
  }
}
