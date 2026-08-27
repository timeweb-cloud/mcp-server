import { ContainerRegistryRepository } from "../container-registry.type";

export type ListContainerRegistryRepositoriesResponseDto = {
  meta: { total: number };
  container_registries_repositories: ContainerRegistryRepository[];
};
