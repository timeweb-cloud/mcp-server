import { kubernetesApiClient } from "../api";

export const reduceK8sNodeGroupNodesAction = async (
  clusterId: number,
  groupId: number,
  count: number
): Promise<void> => {
  await kubernetesApiClient.reduceNodeGroupNodes(clusterId, groupId, { count });
};
