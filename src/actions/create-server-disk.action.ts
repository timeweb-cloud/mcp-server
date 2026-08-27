import { serversApiClient } from "../api";
import { ServerDisk } from "../types/server-disk.type";

export const createServerDiskAction = async (
  serverId: number,
  size: number
): Promise<ServerDisk> => {
  return await serversApiClient.createServerDisk(serverId, size);
};
