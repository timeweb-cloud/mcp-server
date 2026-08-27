import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDriveAvailableResource } from "../types/network-drive-available-resource.type";

export const listNetworkDriveAvailableResourcesAction = async (): Promise<
  NetworkDriveAvailableResource[]
> => {
  return await networkDrivesApiClient.listNetworkDriveAvailableResources();
};
