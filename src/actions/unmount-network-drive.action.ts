import { networkDrivesApiClient } from "../api/network-drives";

export const unmountNetworkDriveAction = async (
  networkDriveId: string
): Promise<void> => {
  await networkDrivesApiClient.unmountNetworkDrive(networkDriveId);
};
