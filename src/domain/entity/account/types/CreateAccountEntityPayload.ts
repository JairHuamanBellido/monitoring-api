export type CreateAccountEntityPayload = {
  id?: number;
  username: string;
  userId: number;
  password: string;
  isBlocked: boolean;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  deletedBy?: string;
  deletedAt?: Date;
};
