export type ContainerRegistryDiskStats = {
  size: number;
  used: number;
};

export type ContainerRegistry = {
  id: number;
  name: string;
  description: string;
  preset_id: number;
  configurator_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  disk_stats: ContainerRegistryDiskStats;
};

export type ContainerRegistryPreset = {
  id: number;
  description: string;
  description_short: string;
  disk: number;
  price: number;
  location?: string;
};

export type ContainerRegistryRepositoryTag = {
  tag: string;
  digest: string;
  size: number;
};

export type ContainerRegistryRepository = {
  name: string;
  tags: ContainerRegistryRepositoryTag;
};
