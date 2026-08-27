import { serversApiClient, ServerNatMode } from "../api/servers";

export const setServerNatModeAction = async (
  serverId: number,
  natMode: ServerNatMode
): Promise<void> => {
  await serversApiClient.setServerNatMode(serverId, natMode);
};
