import { serversApiClient } from "../api";
import { AutoBackupSettings } from "../types/auto-backup.type";

export const getServerDiskAutoBackupsAction = async (
  serverId: number,
  diskId: number
): Promise<AutoBackupSettings> => {
  return await serversApiClient.getServerDiskAutoBackups(serverId, diskId);
};
