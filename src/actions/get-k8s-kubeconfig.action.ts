import { kubernetesApiClient } from "../api";

export const getK8sKubeconfigAction = async (
  clusterId: number
): Promise<string> => {
  return await kubernetesApiClient.getKubeconfig(clusterId);
};
