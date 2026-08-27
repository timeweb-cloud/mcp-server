import { kubernetesApiClient } from "../api";

export const listK8sVersionsAction = async (): Promise<string[]> => {
  return await kubernetesApiClient.listK8sVersions();
};
