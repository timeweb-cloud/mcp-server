import { serversApiClient } from "../api";
import { AutoBackupSettings } from "../types/auto-backup.type";

export const updateServerDiskAutoBackupsAction = async (
  serverId: number,
  diskId: number,
  settings: AutoBackupSettings
): Promise<AutoBackupSettings> => {
  return await serversApiClient.updateServerDiskAutoBackups(
    serverId,
    diskId,
    settings
  );
};
