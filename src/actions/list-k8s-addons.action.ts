import { kubernetesApiClient } from "../api";
import { K8sAddon } from "../types/k8s-addon.type";

export const listK8sAddonsAction = async (
  clusterId: number
): Promise<K8sAddon[]> => {
  return await kubernetesApiClient.listInstalledAddons(clusterId);
};
