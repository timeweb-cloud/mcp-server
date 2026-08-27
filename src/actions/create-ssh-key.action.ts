import { sshKeysApiClient } from "../api";
import { SshKey } from "../types/ssh-key.type";

export const createSshKeyAction = async (
  name: string,
  body: string,
  isDefault: boolean
): Promise<SshKey> => {
  return await sshKeysApiClient.createSshKey({
    name,
    body,
    is_default: isDefault,
  });
};
