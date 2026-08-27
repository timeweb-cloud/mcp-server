import { networkDrivesApiClient } from "../api/network-drives";
import { NetworkDrive } from "../types/network-drive.type";
import { CreateNetworkDriveRequestDto } from "../types/dto/create-network-drive-request.dto";

export const createNetworkDriveAction = async (
  data: CreateNetworkDriveRequestDto
): Promise<NetworkDrive> => {
  return await networkDrivesApiClient.createNetworkDrive(data);
};
