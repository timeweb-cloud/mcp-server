import { kubernetesApiClient } from "../api";
import { K8sAddonConfig } from "../types/k8s-addon.type";

export const listK8sAddonConfigsAction = async (
  clusterId: number
): Promise<K8sAddonConfig[]> => {
  return await kubernetesApiClient.listAddonConfigs(clusterId);
};
