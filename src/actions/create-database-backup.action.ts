import { dbaasApiClient } from "../api";
import { DatabaseBackup } from "../types/database-cluster.type";

export const createDatabaseBackupAction = async (
  dbId: number,
  comment?: string
): Promise<DatabaseBackup | null> => {
  return await dbaasApiClient.createDatabaseBackup(dbId, comment);
};
