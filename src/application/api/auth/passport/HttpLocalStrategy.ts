import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpAuthService } from '../HttpAuthService';

@Injectable()
export class HttpLocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: HttpAuthService) {
    super();
  }

  async validate(username: string, password?: string): Promise<any> {
    const user = await this.authService.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
