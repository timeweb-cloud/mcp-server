import { dedicatedServersApiClient } from "../api";
import { DedicatedServer } from "../types/dedicated-server.type";
import { CreateDedicatedServerRequestDto } from "../types/dto/create-dedicated-server-request.dto";

export const createDedicatedServerAction = async (
  data: CreateDedicatedServerRequestDto
): Promise<DedicatedServer> => {
  return await dedicatedServersApiClient.createDedicatedServer(data);
};
