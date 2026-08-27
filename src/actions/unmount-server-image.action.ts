import { serversApiClient } from "../api";

export const unmountServerImageAction = async (
  serverId: number
): Promise<void> => {
  await serversApiClient.unmountServerImage(serverId);
};
