import { dedicatedServersApiClient } from "../api";
import { DedicatedServer } from "../types/dedicated-server.type";

export const listDedicatedServersAction = async (): Promise<
  DedicatedServer[]
> => {
  return await dedicatedServersApiClient.listDedicatedServers();
};
