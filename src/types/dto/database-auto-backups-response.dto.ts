import { DatabaseAutoBackupSettings } from "../database-cluster.type";

export type DatabaseAutoBackupsResponseDto = {
  meta: { total: number };
  auto_backups_settings: DatabaseAutoBackupSettings[];
};
