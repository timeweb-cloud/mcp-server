export type ServerOsRequirements = {
  cpu_min?: number;
  disk_min?: number;
  ram_min?: number;
  bandwidth_min?: number;
};

export type ServerOs = {
  id: number;
  family: string;
  name: string;
  version: string;
  version_codename?: string;
  description?: string;
  requirements?: ServerOsRequirements;
};
