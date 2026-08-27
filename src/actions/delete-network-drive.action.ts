import { networkDrivesApiClient } from "../api/network-drives";

export const deleteNetworkDriveAction = async (
  networkDriveId: string
): Promise<void> => {
  await networkDrivesApiClient.deleteNetworkDrive(networkDriveId);
};
