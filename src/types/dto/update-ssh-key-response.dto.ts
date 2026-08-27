import { SshKey } from "../ssh-key.type";

export interface UpdateSshKeyResponseDto {
  ssh_key: SshKey;
  meta: { total: number };
}
