import { NetworkDrive } from "../network-drive.type";

export type GetNetworkDriveResponseDto = {
  network_drive: NetworkDrive;
  response_id?: string;
};
