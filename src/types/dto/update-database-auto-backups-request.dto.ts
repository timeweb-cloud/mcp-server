export type UpdateDatabaseAutoBackupsRequestDto = {
  is_enabled: boolean;
  copy_count?: number;
  creation_start_at?: string;
  interval?: "day" | "week" | "month";
  day_of_week?: number;
};
