import { serversApiClient, ResizeServerParams } from "../api/servers";
import { Server } from "../types/server.type";

export const resizeServerAction = async (
  serverId: number,
  params: ResizeServerParams
): Promise<Server> => {
  return await serversApiClient.resizeServer(serverId, params);
};
