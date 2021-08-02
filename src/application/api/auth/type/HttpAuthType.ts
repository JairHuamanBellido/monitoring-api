import { UserRole } from '@core/enums/UserRoleEnum';
import { Request } from 'express';

/**
 * Payload del JWT
 */
export type HttpJwtPayload = {
  id: number;
  dni: string;
  username: string;
  role: UserRole;
};

/**
 * Respuesta del servicio API REST para el usuario autenticado
 */
export type HttpLoggedUser = {
  id: number;
  accessToken: string;
};

/**
 * Cabecera del servicio de Bearer, parseando el JWT TOKEN
 */
export type HttpRequestWithUser = Request & { user: HttpJwtPayload };
