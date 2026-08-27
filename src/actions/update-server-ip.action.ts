import { serversApiClient } from "../api";
import { ServerIp } from "../types/server-ip.type";

export const updateServerIpAction = async (
  serverId: number,
  ip: string,
  ptr: string
): Promise<ServerIp> => {
  return await serversApiClient.updateServerIp(serverId, { ip, ptr });
};
