import { kubernetesApiClient } from "../api";
import { K8sCluster } from "../types/k8s-cluster.type";

export const getK8sClusterAction = async (
  clusterId: number
): Promise<K8sCluster> => {
  return await kubernetesApiClient.getCluster(clusterId);
};
