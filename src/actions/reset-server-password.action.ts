import { serversApiClient } from "../api";

export const resetServerPasswordAction = async (
  serverId: number
): Promise<void> => {
  await serversApiClient.resetServerPassword(serverId);
};
