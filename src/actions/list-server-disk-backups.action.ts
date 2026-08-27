import { serversApiClient } from "../api";
import { ServerBackup } from "../types/server-backup.type";

export const listServerDiskBackupsAction = async (
  serverId: number,
  diskId: number
): Promise<ServerBackup[]> => {
  return await serversApiClient.listServerDiskBackups(serverId, diskId);
};
