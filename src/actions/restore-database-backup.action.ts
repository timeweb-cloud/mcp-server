import { dbaasApiClient } from "../api";

export const restoreDatabaseBackupAction = async (
  dbId: number,
  backupId: number
): Promise<void> => {
  await dbaasApiClient.restoreDatabaseBackup(dbId, backupId);
};
