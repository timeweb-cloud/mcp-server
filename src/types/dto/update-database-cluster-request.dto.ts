export type UpdateDatabaseClusterRequestDto = {
  name?: string;
  preset_id?: number;
  description?: string;
  is_enabled_public_network?: boolean;
};
