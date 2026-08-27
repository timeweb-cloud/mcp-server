import { dbaasApiClient } from "../api";
import { DatabaseAutoBackupSettings } from "../types/database-cluster.type";

export const getDatabaseAutoBackupsAction = async (
  dbId: number
): Promise<DatabaseAutoBackupSettings[]> => {
  return await dbaasApiClient.getDatabaseAutoBackups(dbId);
};
