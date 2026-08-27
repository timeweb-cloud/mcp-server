import { kubernetesApiClient } from "../api";
import { K8sResources } from "../types/k8s-resources.type";

export const getK8sClusterResourcesAction = async (
  clusterId: number
): Promise<K8sResources> => {
  return await kubernetesApiClient.getClusterResources(clusterId);
};
