import { K8sCluster } from "../k8s-cluster.type";

export type ListK8sClustersResponseDto = {
  meta: { total: number };
  clusters: K8sCluster[];
  response_id?: string;
};
