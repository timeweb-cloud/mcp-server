import { dedicatedServersApiClient } from "../api";
import { DedicatedServer } from "../types/dedicated-server.type";
import { UpdateDedicatedServerRequestDto } from "../types/dto/update-dedicated-server-request.dto";

export const updateDedicatedServerAction = async (
  dedicatedId: number,
  data: UpdateDedicatedServerRequestDto
): Promise<DedicatedServer> => {
  return await dedicatedServersApiClient.updateDedicatedServer(
    dedicatedId,
    data
  );
};
