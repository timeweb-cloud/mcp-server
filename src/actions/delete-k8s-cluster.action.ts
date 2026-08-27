import { kubernetesApiClient, DeleteK8sClusterResult } from "../api/kubernetes";

export const deleteK8sClusterAction = async (
  clusterId: number,
  hash?: string,
  code?: string
): Promise<DeleteK8sClusterResult> => {
  return await kubernetesApiClient.deleteCluster(clusterId, hash, code);
};
