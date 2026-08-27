import { kubernetesApiClient } from "../api";
import { K8sNodeGroup } from "../types/k8s-node-group.type";

export const listK8sNodeGroupsAction = async (
  clusterId: number
): Promise<K8sNodeGroup[]> => {
  return await kubernetesApiClient.listNodeGroups(clusterId);
};
