export enum ServerStatus {
  INSTALLING = "installing",
  SOFTWARE_INSTALL = "software_install",
  REINSTALLING = "reinstalling",
  ON = "on",
  OFF = "off",
  TURNING_ON = "turning_on",
  TURNING_OFF = "turning_off",
  HARD_TURNING_OFF = "hard_turning_off",
  REBOOTING = "rebooting",
  HARD_REBOOTING = "hard_rebooting",
  REMOVING = "removing",
  PERMANENT_BLOCKING = "permanent_blocking",
  BLOCK = "block",
  UNBLOCK = "unblock",
  RESIZE = "resize",
  BOOT_FROM_ISO = "boot_from_iso",
  TRANSFER = "transfer",
  CONFIGURING = "configuring",
  ERROR = "error",
  NO_PAID = "no_paid",
}

export type Server = {
  id: number;
  name: string;
  comment?: string;
  created_at: string;
  os: {
    id: number;
    name: string;
    version: string | null;
  };
  software?: { id: number; name: string } | null;
  preset_id: number | null;
  location: string;
  configurator_id: number | null;
  boot_mode: string;
  status: ServerStatus | string;
  cpu: number;
  cpu_frequency: string;
  ram: number;
  disk_stats?: unknown;
  main_ipv4?: string | null;
  main_ipv6?: string | null;
  [key: string]: unknown;
};
