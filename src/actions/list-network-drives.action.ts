import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDrive } from "../types/network-drive.type";

export const listNetworkDrivesAction = async (): Promise<NetworkDrive[]> => {
  return await networkDrivesApiClient.listNetworkDrives();
};
