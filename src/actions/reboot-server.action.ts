import { serversApiClient } from "../api";

export const rebootServerAction = async (serverId: number): Promise<void> => {
  await serversApiClient.rebootServer(serverId);
};
