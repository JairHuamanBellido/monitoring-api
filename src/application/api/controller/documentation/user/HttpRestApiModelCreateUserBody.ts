import { UserRole } from '@core/enums/UserRoleEnum';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class HttpRestApiModelCreateUserBody {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsInt()
  @IsNotEmpty()
  public age: number;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsString()
  @Length(9, 9)
  @IsNotEmpty()
  public dni: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  public rol: UserRole;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
