import { serversApiClient } from "../api";

export const deleteServerIpAction = async (
  serverId: number,
  ip: string
): Promise<void> => {
  await serversApiClient.deleteServerIp(serverId, { ip });
};
