import { serversApiClient } from "../api";
import { Server } from "../types/server.type";

export const cloneServerAction = async (serverId: number): Promise<Server> => {
  return await serversApiClient.cloneServer(serverId);
};
