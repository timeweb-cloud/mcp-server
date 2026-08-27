import { kubernetesApiClient } from "../api";
import { K8sNodeGroup } from "../types/k8s-node-group.type";

export const getK8sNodeGroupAction = async (
  clusterId: number,
  groupId: number
): Promise<K8sNodeGroup> => {
  return await kubernetesApiClient.getNodeGroup(clusterId, groupId);
};
