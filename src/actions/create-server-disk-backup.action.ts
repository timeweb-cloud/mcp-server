import { serversApiClient } from "../api";
import { ServerBackup } from "../types/server-backup.type";

export const createServerDiskBackupAction = async (
  serverId: number,
  diskId: number,
  comment?: string
): Promise<ServerBackup> => {
  return await serversApiClient.createServerDiskBackup(
    serverId,
    diskId,
    comment
  );
};
