export type CreateDatabaseAdminRequestDto = {
  login: string;
  password: string;
  privileges: string[];
  host?: string;
  instance_id?: number;
  description?: string;
};
