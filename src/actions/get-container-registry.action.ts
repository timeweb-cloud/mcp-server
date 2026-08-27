import { containerRegistryApiClient } from "../api";
import { ContainerRegistry } from "../types/container-registry.type";

export const getContainerRegistryAction = async (
  registryId: number
): Promise<ContainerRegistry> => {
  return await containerRegistryApiClient.getContainerRegistry(registryId);
};
