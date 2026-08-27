import { K8sAddon } from "../k8s-addon.type";

export type ListK8sAddonsResponseDto = {
  meta: { total: number };
  addons: K8sAddon[];
  response_id?: string;
};
