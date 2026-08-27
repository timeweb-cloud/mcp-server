import { serversApiClient } from "../api";

export const deleteServerDiskAction = async (
  serverId: number,
  diskId: number
): Promise<void> => {
  await serversApiClient.deleteServerDisk(serverId, diskId);
};
