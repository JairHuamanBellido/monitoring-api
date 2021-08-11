import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';
import { CreateAccountEntityPayload } from './types/CreateAccountEntityPayload';
import { UpdateAccountEntityPayload } from './types/UpdateAccountEntityPayload';

export class Account {
  @IsInt()
  private id: number;

  @IsString()
  private username: string;

  @IsString()
  private password: string;

  @IsBoolean()
  private isBlocked: boolean;

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

  @IsInt()
  private userId: number;

  constructor(payload: CreateAccountEntityPayload) {
    this.id = payload.id;
    this.username = payload.username;
    this.password = payload.password;
    this.isBlocked = payload.isBlocked;
    this.createdAt = payload.createdAt;
    this.createdBy = payload.createdBy;
    this.updatedAt = payload.updatedAt;
    this.updatedBy = payload.updatedBy;
    this.deletedAt = payload.deletedAt;
    this.deletedBy = payload.deletedBy;
    this.userId = payload.userId;
  }

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getIsBlocked(): boolean {
    return this.isBlocked;
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

  public getUserId(): number {
    return this.userId;
  }
  public edit(payload: UpdateAccountEntityPayload): void {
    const currentDate = new Date();

    this.updatedBy = payload.updatedBy;
    this.updatedAt = currentDate;

    if (payload.username) this.username = payload.username;
    if (payload.password) this.password = payload.password;
    if (payload.isBlocked !== undefined) this.isBlocked = payload.isBlocked;
  }
}
