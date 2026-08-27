import { SshKey } from "../ssh-key.type";

export interface ListSshKeysResponseDto {
  ssh_keys: SshKey[];
  meta: { total: number };
}
