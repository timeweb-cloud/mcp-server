import { kubernetesApiClient } from "../api";

export const uninstallK8sAddonAction = async (
  clusterId: number,
  addonId: number
): Promise<void> => {
  await kubernetesApiClient.uninstallAddon(clusterId, addonId);
};
