import { sshKeysApiClient } from "../api";
import { SshKey } from "../types/ssh-key.type";

export const getSshKeyAction = async (sshKeyId: number): Promise<SshKey> => {
  return await sshKeysApiClient.getSshKey(sshKeyId);
};
