import { K8sCluster } from "../k8s-cluster.type";

export type GetK8sClusterResponseDto = {
  cluster: K8sCluster;
  response_id?: string;
};
