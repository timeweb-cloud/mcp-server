import { containerRegistryApiClient } from "../api";

export const deleteContainerRegistryAction = async (
  registryId: number
): Promise<void> => {
  await containerRegistryApiClient.deleteContainerRegistry(registryId);
};
