import { sshKeysApiClient } from "../api";

export const deleteSshKeyAction = async (sshKeyId: number): Promise<void> => {
  await sshKeysApiClient.deleteSshKey(sshKeyId);
};
