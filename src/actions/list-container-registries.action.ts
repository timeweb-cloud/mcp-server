import { containerRegistryApiClient } from "../api";
import { ContainerRegistry } from "../types/container-registry.type";

export const listContainerRegistriesAction = async (): Promise<
  ContainerRegistry[]
> => {
  return await containerRegistryApiClient.listContainerRegistries();
};
