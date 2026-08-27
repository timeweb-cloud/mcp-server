import { serversApiClient, DeleteServerParams } from "../api/servers";
import { DeleteServerResponseDto } from "../types/dto/delete-server-response.dto";

export const deleteServerAction = async (
  serverId: number,
  params: DeleteServerParams = {}
): Promise<DeleteServerResponseDto["server_delete"]> => {
  return await serversApiClient.deleteServer(serverId, params);
};
