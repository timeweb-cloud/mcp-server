import { kubernetesApiClient } from "../api";
import { CreateK8sNodeGroupRequestDto } from "../types/dto/create-k8s-node-group-request.dto";
import { K8sNodeGroup } from "../types/k8s-node-group.type";

export const createK8sNodeGroupAction = async (
  clusterId: number,
  data: CreateK8sNodeGroupRequestDto
): Promise<K8sNodeGroup> => {
  return await kubernetesApiClient.createNodeGroup(clusterId, data);
};
