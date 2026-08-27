import { K8sAddonConfig } from "../k8s-addon.type";

export type ListK8sAddonConfigsResponseDto = {
  meta: { total: number };
  k8s_addons: K8sAddonConfig[];
  response_id?: string;
};
