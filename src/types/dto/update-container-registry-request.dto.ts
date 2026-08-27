export type UpdateContainerRegistryRequestDto = {
  description?: string;
  preset_id?: number;
  configuration?: {
    id: number;
    disk: number;
  };
};
