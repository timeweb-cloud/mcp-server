import { NetworkDriveType } from "./network-drive.type";

export type NetworkDrivePresetIops = {
  min?: number;
  max?: number;
};

export type NetworkDrivePreset = {
  id: number;
  cost_per_gb: number;
  min: number;
  max: number;
  step: number;
  type: NetworkDriveType;
  read: NetworkDrivePresetIops;
  write: NetworkDrivePresetIops;
};
