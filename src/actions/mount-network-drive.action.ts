import { networkDrivesApiClient } from "../api/network-drives";
import { MountNetworkDriveRequestDto } from "../types/dto/mount-network-drive-request.dto";

export const mountNetworkDriveAction = async (
  networkDriveId: string,
  data: MountNetworkDriveRequestDto
): Promise<void> => {
  await networkDrivesApiClient.mountNetworkDrive(networkDriveId, data);
};
