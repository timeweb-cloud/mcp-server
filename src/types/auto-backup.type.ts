export type AutoBackupSettings = {
  is_enabled: boolean;
  copy_count?: number;
  creation_start_at?: string;
  interval?: "day" | "week" | "month" | string;
  day_of_week?: number;
};
