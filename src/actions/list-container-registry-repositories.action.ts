import { containerRegistryApiClient } from "../api";
import { ContainerRegistryRepository } from "../types/container-registry.type";

export const listContainerRegistryRepositoriesAction = async (
  registryId: number
): Promise<ContainerRegistryRepository[]> => {
  return await containerRegistryApiClient.listContainerRegistryRepositories(
    registryId
  );
};
