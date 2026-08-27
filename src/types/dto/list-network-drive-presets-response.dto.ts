import { NetworkDrivePreset } from "../network-drive-preset.type";

export type ListNetworkDrivePresetsResponseDto = {
  meta: any;
  network_drive_presets: NetworkDrivePreset[];
  response_id?: string;
};
