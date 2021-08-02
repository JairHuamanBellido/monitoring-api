import { UserRole } from '@core/enums/UserRoleEnum';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class HttpRestApiModelUpdateUserBody {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsInt()
  public age: number;

  @IsOptional()
  @IsString()
  public lastname: string;

  @IsOptional()
  @IsString()
  public avatar: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsEnum(UserRole)
  public rol: UserRole;

  @IsOptional()
  @IsString()
  public dni: string;
}
