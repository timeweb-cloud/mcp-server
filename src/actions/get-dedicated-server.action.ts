import { dedicatedServersApiClient } from "../api";
import { DedicatedServer } from "../types/dedicated-server.type";

export const getDedicatedServerAction = async (
  dedicatedId: number
): Promise<DedicatedServer> => {
  return await dedicatedServersApiClient.getDedicatedServer(dedicatedId);
};
