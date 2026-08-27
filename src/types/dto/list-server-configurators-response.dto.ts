import { ServerConfigurator } from "../server-configurator.type";

export type ListServerConfiguratorsResponseDto = {
  server_configurators: ServerConfigurator[];
  meta: { total: number };
};
