import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDrivePreset } from "../types/network-drive-preset.type";

export const listNetworkDrivePresetsAction = async (): Promise<
  NetworkDrivePreset[]
> => {
  return await networkDrivesApiClient.listNetworkDrivePresets();
};
