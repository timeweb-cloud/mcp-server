export type ServerSoftwareRequirements = {
  cpu_min?: number;
  disk_min?: number;
  ram_min?: number;
  bandwidth_min?: number;
};

export type ServerSoftware = {
  id: number;
  name: string;
  os_ids: number[];
  description?: string;
  installations?: number;
  requirements?: ServerSoftwareRequirements;
};
