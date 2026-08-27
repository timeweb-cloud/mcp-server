import { serversApiClient, ServerLogsOrder } from "../api/servers";
import { ServerLog } from "../types/server-log.type";

export const getServerLogsAction = async (
  serverId: number,
  order: ServerLogsOrder = "desc"
): Promise<ServerLog[]> => {
  return await serversApiClient.getServerLogs(serverId, order);
};
