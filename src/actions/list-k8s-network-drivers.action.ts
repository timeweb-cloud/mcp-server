import { kubernetesApiClient } from "../api";

export const listK8sNetworkDriversAction = async (): Promise<string[]> => {
  return await kubernetesApiClient.listNetworkDrivers();
};
