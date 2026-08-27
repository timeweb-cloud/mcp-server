import { dedicatedServersApiClient } from "../api";
import {
  DedicatedServerPreset,
  DedicatedServerLocation,
} from "../types/dedicated-server.type";

export const listDedicatedServerPresetsAction = async (
  location?: DedicatedServerLocation
): Promise<DedicatedServerPreset[]> => {
  return await dedicatedServersApiClient.listDedicatedServerPresets(location);
};
