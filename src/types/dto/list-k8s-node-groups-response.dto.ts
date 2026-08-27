import { K8sNodeGroup } from "../k8s-node-group.type";

export type ListK8sNodeGroupsResponseDto = {
  meta: { total: number };
  node_groups: K8sNodeGroup[];
  response_id?: string;
};
