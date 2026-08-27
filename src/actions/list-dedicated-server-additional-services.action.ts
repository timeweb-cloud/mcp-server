import { dedicatedServersApiClient } from "../api";
import { DedicatedServerAdditionalService } from "../types/dedicated-server.type";

export const listDedicatedServerAdditionalServicesAction = async (
  presetId: number
): Promise<DedicatedServerAdditionalService[]> => {
  return await dedicatedServersApiClient.listDedicatedServerAdditionalServices(
    presetId
  );
};
