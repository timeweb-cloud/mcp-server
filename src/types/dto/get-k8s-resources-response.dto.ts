import { K8sResources } from "../k8s-resources.type";

export type GetK8sResourcesResponseDto = {
  resources: K8sResources;
  response_id?: string;
};
