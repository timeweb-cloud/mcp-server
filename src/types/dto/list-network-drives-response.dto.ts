import { NetworkDrive } from "../network-drive.type";

export type ListNetworkDrivesResponseDto = {
  meta: any;
  network_drives: NetworkDrive[];
  response_id?: string;
};
