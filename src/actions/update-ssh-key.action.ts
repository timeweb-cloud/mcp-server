import { sshKeysApiClient } from "../api";
import { SshKey } from "../types/ssh-key.type";
import { UpdateSshKeyRequestDto } from "../types/dto/update-ssh-key-request.dto";

export const updateSshKeyAction = async (
  sshKeyId: number,
  data: UpdateSshKeyRequestDto
): Promise<SshKey> => {
  return await sshKeysApiClient.updateSshKey(sshKeyId, data);
};
