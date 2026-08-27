import { serversApiClient } from "../api";

export const startServerAction = async (serverId: number): Promise<void> => {
  await serversApiClient.startServer(serverId);
};
