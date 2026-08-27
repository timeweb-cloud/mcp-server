import { dbaasApiClient } from "../api";
import { DatabaseBackup } from "../types/database-cluster.type";

export const listDatabaseBackupsAction = async (
  dbId: number,
  limit?: number,
  offset?: number
): Promise<DatabaseBackup[]> => {
  return await dbaasApiClient.listDatabaseBackups(dbId, limit, offset);
};
