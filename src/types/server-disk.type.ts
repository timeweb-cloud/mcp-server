export type ServerDisk = {
  id: number;
  size: number;
  used: number;
  type: string;
  is_mounted: boolean;
  is_system: boolean;
  system_name: string;
  status: string;
};
