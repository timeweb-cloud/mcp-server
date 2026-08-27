import { ServerBackup } from "../server-backup.type";

export type ListServerDiskBackupsResponseDto = {
  backups: ServerBackup[];
  meta: { total: number };
};
