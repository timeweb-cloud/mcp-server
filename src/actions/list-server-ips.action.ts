import { serversApiClient } from "../api";
import { ServerIp } from "../types/server-ip.type";

export const listServerIpsAction = async (
  serverId: number
): Promise<ServerIp[]> => {
  return await serversApiClient.listServerIps(serverId);
};
