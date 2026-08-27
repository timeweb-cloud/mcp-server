import { serversApiClient } from "../api";
import { ServerBackup } from "../types/server-backup.type";

export const getServerDiskBackupAction = async (
  serverId: number,
  diskId: number,
  backupId: number
): Promise<ServerBackup> => {
  return await serversApiClient.getServerDiskBackup(
    serverId,
    diskId,
    backupId
  );
};
