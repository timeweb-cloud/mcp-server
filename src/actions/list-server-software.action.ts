import { catalogsApiClient } from "../api";
import { ServerSoftware } from "../types/server-software.type";

export const listServerSoftwareAction = async (): Promise<ServerSoftware[]> => {
  return await catalogsApiClient.listServerSoftware();
};
