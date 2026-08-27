import { DatabaseBackup } from "../database-cluster.type";

export type ListDatabaseBackupsResponseDto = {
  meta: { total: number };
  backups: DatabaseBackup[];
};
