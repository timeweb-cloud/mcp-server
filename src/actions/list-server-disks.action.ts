import { serversApiClient } from "../api";
import { ServerDisk } from "../types/server-disk.type";

export const listServerDisksAction = async (
  serverId: number
): Promise<ServerDisk[]> => {
  return await serversApiClient.listServerDisks(serverId);
};
