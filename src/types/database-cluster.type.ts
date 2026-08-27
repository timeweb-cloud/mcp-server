export interface DatabaseClusterNetworkIp {
  type: "ipv4" | "ipv6";
  ip: string;
}

export interface DatabaseClusterNetwork {
  type: "public" | "local";
  ips: DatabaseClusterNetworkIp[] | null;
}

export interface DatabaseCluster {
  id: number;
  created_at: string;
  location: string | null;
  name: string;
  networks: DatabaseClusterNetwork[];
  type: string;
  hash_type: "caching_sha2" | "mysql_native" | null;
  avatar_link: string | null;
  port: number | null;
  status: string;
  preset_id: number;
  disk: any | null;
  config_parameters: Record<string, any>;
  is_enabled_public_network?: boolean;
  availability_zone?: string;
  description?: string;
  project_id?: number;
  [key: string]: any;
}

export interface DatabaseAdminEntity {
  id: number;
  created_at: string;
  login: string;
  password: string;
  description: string;
  host: string | null;
  instances: Array<{
    instance_id: number;
    privileges: string[];
  }>;
}

export interface DatabaseInstanceEntity {
  id: number;
  created_at: string;
  name: string;
  description: string;
}

export interface DatabaseType {
  name: string;
  version: string;
  type: string;
  is_available_replication: boolean;
  is_deprecated: boolean;
  requirements?: {
    cpu_min?: number;
    ram_min?: number;
    disk_min?: number;
  };
}

export interface DatabaseBackup {
  id: number;
  name: string;
  comment: string | null;
  created_at: string;
  status: string;
  size: number;
  type: "manual" | "auto";
  progress: number;
}

export interface DatabaseAutoBackupSettings {
  copy_count?: number;
  creation_start_at?: string;
  is_enabled: boolean;
  interval?: "day" | "week" | "month";
  day_of_week?: number;
}

export interface DatabaseDeleteResponse {
  hash?: string;
  is_moved_in_quarantine?: boolean;
}
