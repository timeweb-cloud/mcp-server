export interface ApiKey {
  id: string;
  created_at: string;
  name: string;
  expired_at: string | null;
  is_able_to_delete: boolean;
}

export interface CreatedApiKey {
  token: string;
  id: string;
  created_at: string;
  name: string;
  expired_at: string | null;
}
