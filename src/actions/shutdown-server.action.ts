import { serversApiClient } from "../api";

export const shutdownServerAction = async (serverId: number): Promise<void> => {
  await serversApiClient.shutdownServer(serverId);
};
