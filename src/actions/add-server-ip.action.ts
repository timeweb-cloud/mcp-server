import { serversApiClient, AddServerIpParams } from "../api/servers";
import { ServerIp } from "../types/server-ip.type";

export const addServerIpAction = async (
  serverId: number,
  params: AddServerIpParams
): Promise<ServerIp> => {
  return await serversApiClient.addServerIp(serverId, params);
};
