import { kubernetesApiClient } from "../api";
import { InstallK8sAddonRequestDto } from "../types/dto/install-k8s-addon-request.dto";

export const updateK8sAddonAction = async (
  clusterId: number,
  addonId: number,
  data: InstallK8sAddonRequestDto
): Promise<void> => {
  await kubernetesApiClient.updateAddon(clusterId, addonId, data);
};
