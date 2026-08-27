import { serversApiClient } from "../api";
import { CreateServerRequestDto } from "../types/dto/create-server-request.dto";
import { Server } from "../types/server.type";

export const createServerAction = async (
  data: CreateServerRequestDto
): Promise<Server> => {
  return await serversApiClient.createServer(data);
};
