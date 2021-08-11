import { UserRole } from '@core/enums/UserRoleEnum';
import { Optional } from '@core/types/CommonTypes';
import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { Account } from '../account/Account';
import { CreateUserEntityPayload } from './types/CreateUserEntityPayload';
import { UpdateUserEntityPayload } from './types/UpdateUserEntityPayload';

export class User {
  @IsNumber()
  private id?: number;

  @IsString()
  private name: string;

  @IsNumber()
  private age: number;

  @IsString()
  private lastname: string;

  @IsString()
  private email: string;

  @IsString()
  private avatar: string;

  @IsString()
  private dni: string;

  @IsString()
  private rol: UserRole;

  @IsObject()
  private account: Optional<Account>;

  @IsString()
  private createdBy?: string;

  @IsDate()
  private createdAt?: Date;

  @IsString()
  private updatedBy?: string;

  @IsDate()
  private updatedAt?: Date;

  @IsString()
  private deletedBy?: string;

  @IsDate()
  private deletedAt?: Date;

  constructor(payload: CreateUserEntityPayload) {
    this.id = payload.id;
    this.name = payload.name;
    this.lastname = payload.lastname;
    this.age = payload.age;
    this.avatar = payload.avatar;
    this.email = payload.email;
    this.dni = payload.dni;
    this.rol = payload.rol;
    this.account = payload.account;
    this.createdAt = payload.createdAt;
    this.createdBy = payload.createdBy;
    this.updatedAt = payload.updatedAt;
    this.updatedBy = payload.updatedBy;
    this.deletedAt = payload.deletedAt;
    this.deletedBy = payload.deletedBy;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getAge(): number {
    return this.age;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public getEmail(): string {
    return this.email;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public getDni(): string {
    return this.dni;
  }

  public getrol(): UserRole {
    return this.rol;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedBy(): string {
    return this.updatedBy;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedBy(): string {
    return this.deletedBy;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public getAccount(): Account {
    return this.account;
  }

  public edit(payload: UpdateUserEntityPayload): void {
    const currentDate = new Date();

    this.updatedAt = currentDate;
    this.updatedBy = payload.updatedBy;

    if (payload.age) this.age = payload.age;
    if (payload.avatar) this.avatar = payload.avatar;
    if (payload.dni) this.dni = payload.dni;
    if (payload.email) this.email = payload.email;
    if (payload.lastname) this.lastname = payload.lastname;
    if (payload.name) this.name = payload.name;
    if (payload.rol) this.rol = payload.rol;
  }
}
