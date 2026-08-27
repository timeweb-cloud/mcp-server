import { serversApiClient } from "../api";

export const deleteServerDiskBackupAction = async (
  serverId: number,
  diskId: number,
  backupId: number
): Promise<void> => {
  await serversApiClient.deleteServerDiskBackup(serverId, diskId, backupId);
};
