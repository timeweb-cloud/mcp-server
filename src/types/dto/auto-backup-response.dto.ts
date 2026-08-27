import { AutoBackupSettings } from "../auto-backup.type";

export type AutoBackupResponseDto = {
  auto_backups_settings: AutoBackupSettings;
  response_id?: string;
};
