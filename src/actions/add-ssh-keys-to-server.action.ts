import { sshKeysApiClient } from "../api";

export const addSshKeysToServerAction = async (
  serverId: number,
  sshKeyIds: number[]
): Promise<void> => {
  await sshKeysApiClient.addSshKeysToServer(serverId, sshKeyIds);
};
