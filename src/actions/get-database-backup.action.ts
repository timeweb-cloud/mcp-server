import { dbaasApiClient } from "../api";
import { DatabaseBackup } from "../types/database-cluster.type";

export const getDatabaseBackupAction = async (
  dbId: number,
  backupId: number
): Promise<DatabaseBackup> => {
  return await dbaasApiClient.getDatabaseBackup(dbId, backupId);
};
