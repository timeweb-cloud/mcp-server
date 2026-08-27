import { kubernetesApiClient } from "../api";
import { K8sNode } from "../types/k8s-node.type";

export const listK8sNodeGroupNodesAction = async (
  clusterId: number,
  groupId: number,
  limit?: number,
  offset?: number
): Promise<K8sNode[]> => {
  return await kubernetesApiClient.listNodeGroupNodes(
    clusterId,
    groupId,
    limit,
    offset
  );
};
