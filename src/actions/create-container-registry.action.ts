import { containerRegistryApiClient } from "../api";
import { ContainerRegistry } from "../types/container-registry.type";
import { CreateContainerRegistryRequestDto } from "../types/dto/create-container-registry-request.dto";

export const createContainerRegistryAction = async (
  data: CreateContainerRegistryRequestDto
): Promise<ContainerRegistry> => {
  return await containerRegistryApiClient.createContainerRegistry(data);
};
