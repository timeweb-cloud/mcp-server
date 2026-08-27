import { sshKeysApiClient } from "../api";

export const removeSshKeyFromServerAction = async (
  serverId: number,
  sshKeyId: number
): Promise<void> => {
  await sshKeysApiClient.removeSshKeyFromServer(serverId, sshKeyId);
};
