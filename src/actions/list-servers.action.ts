import { serversApiClient } from "../api";
import { Server } from "../types/server.type";

export const listServersAction = async (): Promise<Server[]> => {
  return await serversApiClient.listServers();
};
