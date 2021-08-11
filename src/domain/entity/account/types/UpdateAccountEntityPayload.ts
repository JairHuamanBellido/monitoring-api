export interface UpdateAccountEntityPayload {
  username?: string;
  password?: string;
  isBlocked?: boolean;
  updatedBy?: string;
  deletedBy?: string;
}
