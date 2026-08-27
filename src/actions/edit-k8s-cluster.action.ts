import { kubernetesApiClient } from "../api";
import { EditK8sClusterRequestDto } from "../types/dto/edit-k8s-cluster-request.dto";
import { K8sCluster } from "../types/k8s-cluster.type";

export const editK8sClusterAction = async (
  clusterId: number,
  data: EditK8sClusterRequestDto
): Promise<K8sCluster> => {
  return await kubernetesApiClient.editCluster(clusterId, data);
};
