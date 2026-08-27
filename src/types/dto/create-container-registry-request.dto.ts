export type CreateContainerRegistryRequestDto = {
  name: string;
  description?: string;
  preset_id?: number;
  configuration?: {
    id: number;
    disk: number;
  };
  project_id?: number;
};
