import {
  serversApiClient,
  ServerDiskBackupAction,
} from "../api/servers";

export const serverDiskBackupActionAction = async (
  serverId: number,
  diskId: number,
  backupId: number,
  action: ServerDiskBackupAction
): Promise<void> => {
  await serversApiClient.serverDiskBackupAction(
    serverId,
    diskId,
    backupId,
    action
  );
};
