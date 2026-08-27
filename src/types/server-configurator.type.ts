export type ServerConfiguratorRequirements = {
  cpu_min: number;
  cpu_step: number;
  cpu_max: number;
  ram_min: number;
  ram_step: number;
  ram_max: number;
  disk_min: number;
  disk_step: number;
  disk_max: number;
  network_bandwidth_min: number;
  network_bandwidth_step: number;
  network_bandwidth_max: number;
  gpu_min: number | null;
  gpu_max: number | null;
  gpu_step: number | null;
};

export type ServerConfigurator = {
  id: number;
  location: string;
  disk_type: string;
  is_allowed_local_network: boolean;
  cpu_frequency: string;
  requirements: ServerConfiguratorRequirements;
};
