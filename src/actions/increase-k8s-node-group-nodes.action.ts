import { kubernetesApiClient } from "../api";
import { IncreaseK8sNodesRequestDto } from "../types/dto/increase-k8s-nodes-request.dto";
import { K8sNode } from "../types/k8s-node.type";

export const increaseK8sNodeGroupNodesAction = async (
  clusterId: number,
  groupId: number,
  data: IncreaseK8sNodesRequestDto
): Promise<K8sNode[]> => {
  return await kubernetesApiClient.increaseNodeGroupNodes(
    clusterId,
    groupId,
    data
  );
};
