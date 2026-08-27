import { NetworkDrive } from "../network-drive.type";

export type CreateNetworkDriveResponseDto = {
  network_drive: NetworkDrive;
  response_id?: string;
};
