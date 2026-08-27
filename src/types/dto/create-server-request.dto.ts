export type CreateServerConfigurator = {
  configurator_id: number;
  disk: number;
  cpu: number;
  ram: number;
  gpu?: number;
};

export type CreateServerNetwork = {
  id?: string;
  floating_ip?: string;
  local_ip?: string;
  network_drive_ids?: string[];
};

export type CreateServerRequestDto = {
  name: string;
  os_id?: number;
  image_id?: string;
  software_id?: number;
  preset_id?: number;
  configuration?: CreateServerConfigurator;
  bandwidth?: number;
  avatar_id?: string;
  comment?: string;
  ssh_keys_ids?: number[];
  is_ddos_guard?: boolean;
  network?: CreateServerNetwork;
  cloud_init?: string;
  availability_zone?: string;
  project_id?: number;
  hostname?: string;
};
