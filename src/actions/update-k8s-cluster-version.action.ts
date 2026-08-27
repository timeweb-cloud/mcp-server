import { kubernetesApiClient } from "../api";

export const updateK8sClusterVersionAction = async (
  clusterId: number,
  k8sVersion?: string
): Promise<void> => {
  await kubernetesApiClient.updateClusterVersion(clusterId, {
    k8s_version: k8sVersion,
  });
};
