import { K8sNode } from "../k8s-node.type";

export type ListK8sNodesResponseDto = {
  meta: { total: number };
  nodes: K8sNode[];
  response_id?: string;
};
