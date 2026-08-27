import { serversApiClient, ServerBootMode } from "../api/servers";

export const setServerBootModeAction = async (
  serverId: number,
  bootMode: ServerBootMode
): Promise<void> => {
  await serversApiClient.setServerBootMode(serverId, bootMode);
};
