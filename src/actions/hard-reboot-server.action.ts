import { serversApiClient } from "../api";

export const hardRebootServerAction = async (
  serverId: number
): Promise<void> => {
  await serversApiClient.hardRebootServer(serverId);
};
