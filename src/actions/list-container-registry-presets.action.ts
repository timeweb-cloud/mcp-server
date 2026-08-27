import { containerRegistryApiClient } from "../api";
import { ContainerRegistryPreset } from "../types/container-registry.type";

export const listContainerRegistryPresetsAction = async (): Promise<
  ContainerRegistryPreset[]
> => {
  return await containerRegistryApiClient.listContainerRegistryPresets();
};
