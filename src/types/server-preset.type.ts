export type ServerPreset = {
  id: number;
  location: string;
  price: number;
  cpu: number;
  cpu_frequency: string;
  ram: number;
  disk: number;
  disk_type: string;
  bandwidth: number;
  description: string;
  description_short: string;
  is_allowed_local_network: boolean;
  tags: string[];
};
