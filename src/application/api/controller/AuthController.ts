/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { HttpAuthService } from '../auth/HttpAuthService';
import { HttpRestApiModelAuthenticationRequest } from './documentation/auth/HttpRestApiModelAuthenticationRequest';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: HttpAuthService) {}

  @Post('/')
  public async Authentication(@Body() body: HttpRestApiModelAuthenticationRequest) {
    return await this.authService.login(body.username, body.password);
  }

  @Post('/admin')
  public async AuthenticationAdmin(@Body() body: HttpRestApiModelAuthenticationRequest) {
    return await this.authService.login(body.username, body.password, true);
  }
}
