import { kubernetesApiClient } from "../api";

export const deleteK8sNodeGroupAction = async (
  clusterId: number,
  groupId: number
): Promise<void> => {
  await kubernetesApiClient.deleteNodeGroup(clusterId, groupId);
};
