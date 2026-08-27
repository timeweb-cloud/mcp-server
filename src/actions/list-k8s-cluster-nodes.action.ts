import { kubernetesApiClient } from "../api";
import { K8sNode } from "../types/k8s-node.type";

export const listK8sClusterNodesAction = async (
  clusterId: number
): Promise<K8sNode[]> => {
  return await kubernetesApiClient.listClusterNodes(clusterId);
};
