import { K8sNodeGroup } from "../k8s-node-group.type";

export type GetK8sNodeGroupResponseDto = {
  node_group: K8sNodeGroup;
  response_id?: string;
};
