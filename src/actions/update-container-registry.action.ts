import { containerRegistryApiClient } from "../api";
import { ContainerRegistry } from "../types/container-registry.type";
import { UpdateContainerRegistryRequestDto } from "../types/dto/update-container-registry-request.dto";

export const updateContainerRegistryAction = async (
  registryId: number,
  data: UpdateContainerRegistryRequestDto
): Promise<ContainerRegistry> => {
  return await containerRegistryApiClient.updateContainerRegistry(
    registryId,
    data
  );
};
