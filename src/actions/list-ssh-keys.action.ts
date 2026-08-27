import { sshKeysApiClient } from "../api";
import { SshKey } from "../types/ssh-key.type";

export const listSshKeysAction = async (): Promise<SshKey[]> => {
  return await sshKeysApiClient.listSshKeys();
};
