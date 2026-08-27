import { catalogsApiClient } from "../api";
import { ServerConfigurator } from "../types/server-configurator.type";

export const listServerConfiguratorsAction = async (): Promise<
  ServerConfigurator[]
> => {
  return await catalogsApiClient.listServerConfigurators();
};
