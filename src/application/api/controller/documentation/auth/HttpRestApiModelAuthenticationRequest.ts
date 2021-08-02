import { IsNotEmpty, IsString } from 'class-validator';

export class HttpRestApiModelAuthenticationRequest {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
