export type DedicatedServerStatus = "installing" | "installed" | "on" | "off";

export type DedicatedServer = {
  id: number;
  cpu_description: string;
  hdd_description: string;
  ram_description: string;
  created_at: string;
  ip: string | null;
  ipmi_ip: string | null;
  ipmi_login: string | null;
  ipmi_password: string | null;
  ipv6: string | null;
  node_id: number | null;
  name: string;
  comment: string;
  vnc_pass: string | null;
  status: DedicatedServerStatus | string;
  os_id: number | null;
  cp_id: number | null;
  bandwidth_id: number | null;
  network_drive_id: number | null;
  additional_ip_addr_id: number | null;
  plan_id: number | null;
  price: number;
  location: string;
  autoinstall_ready?: boolean;
  password?: string | null;
  avatar_link?: string | null;
  is_pre_installed?: boolean;
  preset_id: number;
  project_id?: number | null;
};

export type DedicatedServerPaymentPeriod = "P1M" | "P3M" | "P6M" | "P1Y";

export type DedicatedServerLocation = "ru-1" | "ru-2" | "kz-1" | "pl-1";

export type DedicatedServerPresetCpu = {
  description?: string;
  description_short?: string;
  count?: number;
  [key: string]: any;
};

export type DedicatedServerPreset = {
  id: number;
  description: string;
  is_ipmi_enabled?: boolean;
  is_pre_installed?: boolean;
  cpu?: DedicatedServerPresetCpu;
  [key: string]: any;
};

export type DedicatedServerAdditionalServicePeriod =
  | "P1D"
  | "P1M"
  | "P3M"
  | "P6M"
  | "P1Y"
  | "forever";

export type DedicatedServerAdditionalService = {
  id: number;
  price: number;
  period: DedicatedServerAdditionalServicePeriod | string;
  description: string;
  short_description: string;
  name: string;
};
