export interface SshKeyUsedBy {
  id: number;
  name: string;
}

export interface SshKey {
  id: number;
  name: string;
  body: string;
  created_at: string;
  used_by: SshKeyUsedBy[];
  is_default?: boolean;
}
