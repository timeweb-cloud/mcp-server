export type UpdateDatabaseAdminRequestDto = {
  password?: string;
  privileges?: string[];
  description?: string;
  instance_id?: number;
};
