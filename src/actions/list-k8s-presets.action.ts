import { kubernetesApiClient } from "../api";
import { K8sPreset } from "../types/k8s-preset.type";

export const listK8sPresetsAction = async (): Promise<K8sPreset[]> => {
  return await kubernetesApiClient.listK8sPresets();
};
