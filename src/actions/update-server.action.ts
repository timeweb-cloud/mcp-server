import { serversApiClient } from "../api";
import { UpdateServerRequestDto } from "../types/dto/update-server-request.dto";
import { Server } from "../types/server.type";

export const updateServerAction = async (
  serverId: number,
  data: UpdateServerRequestDto
): Promise<Server> => {
  return await serversApiClient.updateServer(serverId, data);
};
