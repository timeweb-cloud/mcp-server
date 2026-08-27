import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDrive } from "../types/network-drive.type";

export const getNetworkDriveAction = async (
  networkDriveId: string
): Promise<NetworkDrive> => {
  return await networkDrivesApiClient.getNetworkDrive(networkDriveId);
};
