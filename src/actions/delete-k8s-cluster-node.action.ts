import { kubernetesApiClient } from "../api";

export const deleteK8sClusterNodeAction = async (
  clusterId: number,
  nodeId: number
): Promise<void> => {
  await kubernetesApiClient.deleteClusterNode(clusterId, nodeId);
};
