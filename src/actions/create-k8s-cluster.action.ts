import { kubernetesApiClient } from "../api";
import { CreateK8sClusterRequestDto } from "../types/dto/create-k8s-cluster-request.dto";
import { K8sCluster } from "../types/k8s-cluster.type";

export const createK8sClusterAction = async (
  data: CreateK8sClusterRequestDto
): Promise<K8sCluster> => {
  return await kubernetesApiClient.createCluster(data);
};
