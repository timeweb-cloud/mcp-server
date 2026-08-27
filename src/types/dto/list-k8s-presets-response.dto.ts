import { K8sPreset } from "../k8s-preset.type";

export type ListK8sPresetsResponseDto = {
  meta: { total: number };
  k8s_presets: K8sPreset[];
  response_id?: string;
};
