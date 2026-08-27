import { serversApiClient } from "../api";
import { ServerDisk } from "../types/server-disk.type";

export const updateServerDiskAction = async (
  serverId: number,
  diskId: number,
  size: number
): Promise<ServerDisk> => {
  return await serversApiClient.updateServerDisk(serverId, diskId, size);
};
