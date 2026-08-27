import { NetworkDrive } from "../network-drive.type";

export type UpdateNetworkDriveResponseDto = {
  network_drive: NetworkDrive;
  response_id?: string;
};
