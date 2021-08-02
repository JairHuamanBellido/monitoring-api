/* eslint-disable prettier/prettier */
import { SystemConfig } from '@infrastructure/config/SystemConfig';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpAuthService } from '../HttpAuthService';
import { HttpJwtPayload } from '../type/HttpAuthType';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService:HttpAuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SystemConfig.JWT_KEY,
    });
  }

  public async validate(payload: HttpJwtPayload): Promise<HttpJwtPayload> {
    const doesUserExist = await this.authService.getUser(payload.dni)
    if(!doesUserExist){
      throw new UnauthorizedException({message: "JWT Token was edit with malicious permissions, Your IP was reported to IT Department"})
    }
    return {
      id:       payload.id,
      dni:      payload.dni,
      username: payload.username,
      role:     payload.role
    };
  }
}
