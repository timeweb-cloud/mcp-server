import { serversApiClient } from "../api";
import { ServerDisk } from "../types/server-disk.type";

export const getServerDiskAction = async (
  serverId: number,
  diskId: number
): Promise<ServerDisk> => {
  return await serversApiClient.getServerDisk(serverId, diskId);
};
