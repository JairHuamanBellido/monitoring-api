export type CreateAccountEntityPayload = {
  id?: number;
  username: string;
  password: string;
  isBlocked: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deletedBy?: string;
  deletedAt?: Date;
};
