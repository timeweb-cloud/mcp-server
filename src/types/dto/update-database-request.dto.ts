export type UpdateDatabaseRequestDto = {
  password?: string;
  name?: string;
  preset_id?: number;
  config_parameters?: Record<string, any>;
  is_external_ip?: boolean;
};
