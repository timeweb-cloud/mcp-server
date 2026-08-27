import { catalogsApiClient } from "../api";
import { ServerOs } from "../types/server-os.type";

export const listServerOsAction = async (): Promise<ServerOs[]> => {
  return await catalogsApiClient.listServerOs();
};
