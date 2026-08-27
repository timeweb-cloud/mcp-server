import { kubernetesApiClient } from "../api";
import { K8sCluster } from "../types/k8s-cluster.type";

export const listK8sClustersAction = async (
  limit?: number,
  offset?: number
): Promise<K8sCluster[]> => {
  return await kubernetesApiClient.listClusters(limit, offset);
};
