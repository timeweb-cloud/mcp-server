import { serversApiClient } from "../api";

export const hardShutdownServerAction = async (
  serverId: number
): Promise<void> => {
  await serversApiClient.hardShutdownServer(serverId);
};
