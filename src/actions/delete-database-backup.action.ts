import { dbaasApiClient } from "../api";

export const deleteDatabaseBackupAction = async (
  dbId: number,
  backupId: number
): Promise<void> => {
  await dbaasApiClient.deleteDatabaseBackup(dbId, backupId);
};
