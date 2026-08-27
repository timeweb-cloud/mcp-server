import { catalogsApiClient } from "../api";
import { ServerPreset } from "../types/server-preset.type";

export const listServerPresetsAction = async (): Promise<ServerPreset[]> => {
  return await catalogsApiClient.listServerPresets();
};
