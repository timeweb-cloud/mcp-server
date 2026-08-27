import { serversApiClient } from "../api";
import { ServerBackup } from "../types/server-backup.type";

export const updateServerDiskBackupAction = async (
  serverId: number,
  diskId: number,
  backupId: number,
  comment: string
): Promise<ServerBackup> => {
  return await serversApiClient.updateServerDiskBackup(
    serverId,
    diskId,
    backupId,
    comment
  );
};
