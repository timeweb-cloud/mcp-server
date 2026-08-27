import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDrive } from "../types/network-drive.type";
import { UpdateNetworkDriveRequestDto } from "../types/dto/update-network-drive-request.dto";

export const updateNetworkDriveAction = async (
  networkDriveId: string,
  data: UpdateNetworkDriveRequestDto
): Promise<NetworkDrive> => {
  return await networkDrivesApiClient.updateNetworkDrive(networkDriveId, data);
};
