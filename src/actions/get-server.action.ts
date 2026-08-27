import { serversApiClient } from "../api";
import { Server } from "../types/server.type";

export const getServerAction = async (serverId: number): Promise<Server> => {
  return await serversApiClient.getServer(serverId);
};
