import { kubernetesApiClient } from "../api";
import { InstallK8sAddonRequestDto } from "../types/dto/install-k8s-addon-request.dto";

export const installK8sAddonAction = async (
  clusterId: number,
  data: InstallK8sAddonRequestDto
): Promise<void> => {
  await kubernetesApiClient.installAddon(clusterId, data);
};
